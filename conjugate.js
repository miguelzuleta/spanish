/*
 * Spanish verb conjugation engine.
 *
 *   conjugate('hablar') -> { inf, gerund, participle, forms }
 *
 * Every entry in `forms` is an array of six strings, one per person:
 * yo, tú, él/ella/usted, nosotros, vosotros, ellos/ellas/ustedes.
 * Returns null when the input is not an infinitive. Reflexive verbs
 * (-se) are not supported.
 */
(function (global) {
  'use strict';

  const list = text => text.trim().split(/\s+/);

  // ---- Irregularity data ---------------------------------------------------

  // Verbs whose stressed stem vowel changes (pensar -> pienso).
  const STEM_CHANGES = {
    'e>ie': list(`
      alentar apretar atender atravesar calentar cerrar comenzar confesar convertir
      defender despertar diferir divertir empezar encender enterrar entender extender
      gobernar helar herir hervir invertir mentir negar nevar pensar perder plegar
      preferir quebrar recomendar referir regar requerir sembrar sentir sugerir
      tender advertir verter ascender asentir consentir descender desconcertar
      desplegar digerir reventar serrar temblar tentar transferir tropezar adherir
      contender enmendar fregar inferir ingerir interferir precalentar remendar
      restregar revertir trascender desenterrar`),
    'o>ue': list(`
      absolver aprobar apostar almorzar colgar comprobar contar costar demostrar
      devolver disolver doler dormir encontrar envolver forzar llover moler morder
      morir mostrar mover probar recordar renovar resolver revolver rodar rogar
      soltar sonar soñar torcer volar volver acordar consolar demoler desenvolver
      poblar promover reforzar remover resonar retorcer soldar tostar volcar colar tronar`),
    'e>i': list(`
      competir conseguir corregir derretir despedir elegir impedir medir pedir
      perseguir rendir repetir seguir servir vestir desvestir gemir ceñir concebir
      embestir regir reñir teñir`),
    'e>ye': ['errar'],
    'u>ue': ['jugar'],
    'i>ie': ['adquirir'],
    'o>hue': ['oler'],
  };

  const CHANGE_OF = {};
  for (const [change, verbs] of Object.entries(STEM_CHANGES)) {
    verbs.forEach(verb => { CHANGE_OF[verb] = change; });
  }

  // In -ir verbs the stem change weakens in the 3rd-person preterite, the
  // gerund and the nosotros/vosotros present subjunctive (sentir -> sintió).
  const WEAK = { 'e>ie': 'i', 'e>i': 'i', 'o>ue': 'u' };

  // Verbs that write an accent on the stressed stem vowel (enviar -> envío).
  const STRESSED_ACCENT = {
    i: list(`
      enviar ampliar guiar variar confiar criar prohibir desafiar vaciar espiar rociar
      enfriar aislar desviar extraviar fotografiar esquiar radiografiar`),
    u: list(`
      actuar continuar evaluar reunir graduar atenuar interactuar aullar insinuar
      maullar perpetuar puntuar tatuar`),
  };
  const ACCENT_OF = {};
  for (const [vowel, verbs] of Object.entries(STRESSED_ACCENT)) {
    verbs.forEach(verb => { ACCENT_OF[verb] = vowel; });
  }
  const ACUTE = { a: 'á', e: 'é', i: 'í', o: 'ó', u: 'ú' };

  // Irregular past participles, matched on the end of the infinitive so that
  // derived verbs follow (describir -> descrito, devolver -> devuelto).
  const PARTICIPLE_ENDINGS = [
    ['abrir', 'abierto'], ['cubrir', 'cubierto'], ['scribir', 'scrito'],
    ['volver', 'vuelto'], ['solver', 'suelto'], ['morir', 'muerto'],
  ];

  // Spec fields (all optional):
  //   change  stem change, e.g. 'e>ie'
  //   yo      1st-person-singular present
  //   strong  irregular preterite stem (tuv- -> tuve, tuviste, tuvo ...)
  //   fut     future/conditional stem
  //   subj    present-subjunctive stem used for every person
  //   gerund, part, impTu, impNos   direct overrides
  //   over    full six-form overrides for pres / pret / imperf / subj
  const IRREGULAR = {
    ser: {
      over: {
        pres: ['soy', 'eres', 'es', 'somos', 'sois', 'son'],
        pret: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
        imperf: ['era', 'eras', 'era', 'éramos', 'erais', 'eran'],
        subj: ['sea', 'seas', 'sea', 'seamos', 'seáis', 'sean'],
      },
      impTu: 'sé', gerund: 'siendo', part: 'sido',
    },
    ir: {
      over: {
        pres: ['voy', 'vas', 'va', 'vamos', 'vais', 'van'],
        pret: ['fui', 'fuiste', 'fue', 'fuimos', 'fuisteis', 'fueron'],
        imperf: ['iba', 'ibas', 'iba', 'íbamos', 'ibais', 'iban'],
        subj: ['vaya', 'vayas', 'vaya', 'vayamos', 'vayáis', 'vayan'],
      },
      impTu: 've', impNos: 'vamos', gerund: 'yendo', part: 'ido',
    },
    estar: {
      over: {
        pres: ['estoy', 'estás', 'está', 'estamos', 'estáis', 'están'],
        subj: ['esté', 'estés', 'esté', 'estemos', 'estéis', 'estén'],
      },
      strong: 'estuv', impTu: 'está',
    },
    dar: {
      over: {
        pres: ['doy', 'das', 'da', 'damos', 'dais', 'dan'],
        pret: ['di', 'diste', 'dio', 'dimos', 'disteis', 'dieron'],
        subj: ['dé', 'des', 'dé', 'demos', 'deis', 'den'],
      },
    },
    haber: {
      over: {
        pres: ['he', 'has', 'ha', 'hemos', 'habéis', 'han'],
        subj: ['haya', 'hayas', 'haya', 'hayamos', 'hayáis', 'hayan'],
      },
      strong: 'hub', fut: 'habr', impTu: 'he',
    },
    saber: { yo: 'sé', strong: 'sup', fut: 'sabr', subj: 'sep' },
    caber: { yo: 'quepo', strong: 'cup', fut: 'cabr', subj: 'quep' },
    poder: { change: 'o>ue', strong: 'pud', fut: 'podr', gerund: 'pudiendo' },
    querer: { change: 'e>ie', strong: 'quis', fut: 'querr' },
    andar: { strong: 'anduv' },
    romper: { part: 'roto' },
    satisfacer: {
      yo: 'satisfago', strong: 'satisfic', fut: 'satisfar', subj: 'satisfag',
      impTu: 'satisface', part: 'satisfecho',
    },
  };

  // Irregular verbs that pass their pattern on to prefixed relatives
  // (tener -> mantener, poner -> componer). The spec is written for the bare
  // verb; the prefix is added to every irregular form. Any prefix is accepted
  // unless `prefixes` lists the allowed ones (ver, since volver ends in -ver).
  const FAMILIES = {
    tener: {
      spec: { change: 'e>ie', yo: 'tengo', strong: 'tuv', fut: 'tendr', subj: 'teng', impTu: 'ten' },
    },
    venir: {
      spec: { change: 'e>ie', yo: 'vengo', strong: 'vin', fut: 'vendr', subj: 'veng', impTu: 'ven' },
    },
    poner: {
      spec: { yo: 'pongo', strong: 'pus', fut: 'pondr', subj: 'pong', impTu: 'pon', part: 'puesto' },
    },
    hacer: {
      spec: { yo: 'hago', strong: 'hic', fut: 'har', subj: 'hag', impTu: 'haz', part: 'hecho' },
    },
    decir: {
      spec: { change: 'e>i', yo: 'digo', strong: 'dij', fut: 'dir', subj: 'dig', impTu: 'di', part: 'dicho' },
      // Only the bare verb has the short future and imperative; bendecir and
      // maldecir also keep the regular participle.
      adjust(spec, prefix) {
        if (prefix) { delete spec.fut; delete spec.impTu; }
        if (prefix === 'ben' || prefix === 'mal') delete spec.part;
      },
    },
    traer: {
      spec: { yo: 'traigo', strong: 'traj', subj: 'traig' },
    },
    caer: {
      spec: { yo: 'caigo', subj: 'caig' },
    },
    salir: {
      spec: { yo: 'salgo', fut: 'saldr', subj: 'salg', impTu: 'sal' },
    },
    valer: {
      spec: { yo: 'valgo', fut: 'valdr', subj: 'valg' },
    },
    ver: {
      prefixes: ['', 'pre', 'entre', 're'],
      spec: {
        over: {
          pres: ['veo', 'ves', 've', 'vemos', 'veis', 'ven'],
          pret: ['vi', 'viste', 'vio', 'vimos', 'visteis', 'vieron'],
          imperf: ['veía', 'veías', 'veía', 'veíamos', 'veíais', 'veían'],
        },
        subj: 've', part: 'visto', impTu: 've',
      },
    },
    'oír': {
      spec: {
        over: { pres: ['oigo', 'oyes', 'oye', 'oímos', 'oís', 'oyen'] },
        subj: 'oig', impTu: 'oye',
      },
    },
    'reír': {
      spec: {
        over: {
          pres: ['río', 'ríes', 'ríe', 'reímos', 'reís', 'ríen'],
          pret: ['reí', 'reíste', 'rió', 'reímos', 'reísteis', 'rieron'],
          subj: ['ría', 'rías', 'ría', 'riamos', 'riáis', 'rían'],
        },
        gerund: 'riendo', impTu: 'ríe',
      },
      adjust(spec, prefix) {
        if (prefix === 'f') spec.part = 'rito'; // freír -> frito
      },
    },
  };

  // ---- Endings -------------------------------------------------------------

  const ENDINGS = {
    pres: {
      ar: ['o', 'as', 'a', 'amos', 'áis', 'an'],
      er: ['o', 'es', 'e', 'emos', 'éis', 'en'],
      ir: ['o', 'es', 'e', 'imos', 'ís', 'en'],
    },
    pret: {
      ar: ['é', 'aste', 'ó', 'amos', 'asteis', 'aron'],
      er: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
      ir: ['í', 'iste', 'ió', 'imos', 'isteis', 'ieron'],
    },
    imperf: {
      ar: ['aba', 'abas', 'aba', 'ábamos', 'abais', 'aban'],
      er: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
      ir: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    },
    fut: ['é', 'ás', 'á', 'emos', 'éis', 'án'],
    cond: ['ía', 'ías', 'ía', 'íamos', 'íais', 'ían'],
    subj: {
      ar: ['e', 'es', 'e', 'emos', 'éis', 'en'],
      er: ['a', 'as', 'a', 'amos', 'áis', 'an'],
      ir: ['a', 'as', 'a', 'amos', 'áis', 'an'],
    },
  };

  // ---- Helpers -------------------------------------------------------------

  const replaceLast = (text, from, to) => {
    const i = text.lastIndexOf(from);
    return text.slice(0, i) + to + text.slice(i + from.length);
  };

  // hablá -> habláramos: stress the last vowel of the stem.
  const accentLast = text => text.replace(/[aeiou](?=[^aeiou]*$)/, v => ACUTE[v]);

  // Single-syllable forms gain a written accent once a prefix is attached
  // (ve -> prevé, ten -> mantén, vio -> previó) unless they end in z/l/etc.
  const isMonosyllable = text =>
    /^[^aeiouáéíóú]*[aeiou]+[^aeiouáéíóú]*$/.test(text) &&
    !/[aeo][aeo]/.test(text) && /[aeiouns]$/.test(text);

  const accentMonosyllable = text => {
    const strong = text.search(/[aeo]/);
    const i = strong >= 0 ? strong : Math.max(text.lastIndexOf('i'), text.lastIndexOf('u'));
    return text.slice(0, i) + ACUTE[text[i]] + text.slice(i + 1);
  };

  // Whole forms (imperatives and the `over` tables) may need that accent;
  // bare stems such as 'vin' or 'pus' never do.
  const prefixedForm = (prefix, form) =>
    prefix + (isMonosyllable(form) ? accentMonosyllable(form) : form);

  function withPrefix(family, prefix) {
    const spec = { ...family.spec };
    if (family.adjust) family.adjust(spec, prefix);
    if (!prefix) return spec;
    for (const key of ['yo', 'strong', 'fut', 'subj', 'gerund', 'part']) {
      if (spec[key]) spec[key] = prefix + spec[key];
    }
    if (spec.impTu) spec.impTu = prefixedForm(prefix, spec.impTu);
    if (spec.over) {
      const over = {};
      for (const [tense, forms] of Object.entries(spec.over)) {
        over[tense] = forms.map(form => prefixedForm(prefix, form));
      }
      spec.over = over;
    }
    return spec;
  }

  function specFor(inf) {
    if (IRREGULAR[inf]) return IRREGULAR[inf];
    for (const [base, family] of Object.entries(FAMILIES)) {
      if (!inf.endsWith(base)) continue;
      const prefix = inf.slice(0, inf.length - base.length);
      if (!family.prefixes || family.prefixes.includes(prefix)) return withPrefix(family, prefix);
    }
    return {};
  }

  // Attach an ending to a stem, applying the spelling changes that keep the
  // sound of the stem (buscar -> busqué, coger -> cojo, leer -> leyó).
  function join(stem, ending, type) {
    const first = ending[0].normalize('NFD')[0]; // áis -> a
    if (type === 'ar') {
      if (first === 'e') {
        if (stem.endsWith('gu')) stem = stem.slice(0, -1) + 'ü';
        else if (stem.endsWith('c')) stem = stem.slice(0, -1) + 'qu';
        else if (stem.endsWith('g')) stem += 'u';
        else if (stem.endsWith('z')) stem = stem.slice(0, -1) + 'c';
      }
    } else if (first === 'o' || first === 'a') {
      if (stem.endsWith('gu')) stem = stem.slice(0, -1);
      else if (stem.endsWith('g')) stem = stem.slice(0, -1) + 'j';
      else if (/[aeiou]c$/.test(stem)) stem = stem.slice(0, -1) + 'zc';
      else if (stem.endsWith('c')) stem = stem.slice(0, -1) + 'z';
    } else if (ending === 'ió' || ending === 'ieron' || ending === 'iendo') {
      if (/[aeo]$|[^gq]u$/.test(stem)) ending = 'y' + ending.slice(1);
      else if (/(ñ|ll)$/.test(stem)) ending = ending.slice(1);
    } else if (ending === 'iste' || ending === 'imos' || ending === 'isteis') {
      if (/[aeo]$/.test(stem)) ending = 'í' + ending.slice(1);
    }
    return stem + ending;
  }

  function strongPreterite(stem) {
    const third = stem.endsWith('c') ? stem.slice(0, -1) + 'zo' : stem + 'o';
    return [
      stem + 'e', stem + 'iste', third, stem + 'imos', stem + 'isteis',
      stem + (stem.endsWith('j') ? 'eron' : 'ieron'),
    ];
  }

  // ---- Conjugation ---------------------------------------------------------

  function simpleForms(inf) {
    const type = inf.endsWith('ar') ? 'ar' : inf.endsWith('er') ? 'er' : 'ir';
    const root = inf.slice(0, -2);
    const spec = specFor(inf);
    if (inf.endsWith('ducir') && !spec.strong) spec.strong = root.slice(0, -1) + 'j'; // conducir -> conduj-
    const over = spec.over || {};

    // boot: stem for yo/tú/él/ellos. weak: stem for the -ir weakening.
    let boot = root;
    let weak = root;
    const change = spec.change || CHANGE_OF[inf];
    if (change) {
      const [from, to] = change.split('>');
      boot = replaceLast(root, from, to);
      if (type === 'ir' && WEAK[change]) weak = replaceLast(root, from, WEAK[change]);
    }
    if (ACCENT_OF[inf]) boot = replaceLast(boot, ACCENT_OF[inf], ACUTE[ACCENT_OF[inf]]);
    const uir = type === 'ir' && /[^gq]u$/.test(root);
    if (uir) boot = root + 'y';

    const isNosVos = i => i === 3 || i === 4;
    const pres = over.pres || ENDINGS.pres[type].map((end, i) =>
      i === 0 && spec.yo ? spec.yo : join(isNosVos(i) ? root : boot, end, type));

    const pret = over.pret || (spec.strong
      ? strongPreterite(spec.strong)
      : ENDINGS.pret[type].map((end, i) => join(i === 2 || i === 5 ? weak : root, end, type)));

    const imperf = over.imperf || ENDINGS.imperf[type].map(end => root + end);

    const futStem = spec.fut || inf.replace('ír', 'ir');
    const fut = ENDINGS.fut.map(end => futStem + end);
    const cond = ENDINGS.cond.map(end => futStem + end);

    const subjPres = over.subj || (spec.subj
      ? ENDINGS.subj[type].map(end => spec.subj + end)
      : ENDINGS.subj[type].map((end, i) => join(isNosVos(i) ? (uir ? boot : weak) : boot, end, type)));

    // The imperfect and future subjunctive are built on the 3rd-person plural preterite.
    const stem3 = pret[5].slice(0, -3);
    const onStem = ends => ends.map((end, i) => (i === 3 ? accentLast(stem3) : stem3) + end);
    const subjImperfRa = onStem(['ra', 'ras', 'ra', 'ramos', 'rais', 'ran']);
    const subjImperfSe = onStem(['se', 'ses', 'se', 'semos', 'seis', 'sen']);
    const subjFut = onStem(['re', 'res', 're', 'remos', 'reis', 'ren']);

    // Imperatives are indexed by person; index 0 (yo) repeats tú, which has no
    // imperative of its own.
    const tu = spec.impTu || pres[2];
    const impAff = [tu, tu, subjPres[2], spec.impNos || subjPres[3], inf.slice(0, -1) + 'd', subjPres[5]];
    const impNeg = [1, 1, 2, 3, 4, 5].map(i => 'no ' + subjPres[i]);

    const gerund = spec.gerund || (type === 'ar'
      ? root + 'ando'
      : join(weak, 'iendo', type));

    let participle = spec.part;
    if (!participle) {
      const irregular = PARTICIPLE_ENDINGS.find(([ending]) => inf.endsWith(ending));
      participle = irregular
        ? inf.slice(0, -irregular[0].length) + irregular[1]
        : root + (type === 'ar' ? 'ado' : /[aeo]$/.test(root) ? 'ído' : 'ido');
    }

    return {
      pres, pret, imperf, fut, cond, subjPres, subjImperfRa, subjImperfSe, subjFut,
      impAff, impNeg, gerund, participle,
    };
  }

  const HABER = simpleForms('haber');

  function conjugate(input) {
    const inf = String(input).trim().toLowerCase();
    if (!/[a-záéíóúñü]+(ar|er|ir|ír)$/.test(inf) && inf !== 'ir') return null;
    if (inf.endsWith('se')) return null;

    const s = simpleForms(inf);
    const compound = haberForms => haberForms.map(form => `${form} ${s.participle}`);

    return {
      inf,
      gerund: s.gerund,
      participle: s.participle,
      forms: {
        pres: s.pres,
        pret: s.pret,
        imperf: s.imperf,
        fut: s.fut,
        cond: s.cond,
        presPerf: compound(HABER.pres),
        pastPerf: compound(HABER.imperf),
        pretAnt: compound(HABER.pret),
        futPerf: compound(HABER.fut),
        condPerf: compound(HABER.cond),
        subjPres: s.subjPres,
        subjImperf: s.subjImperfRa.map((ra, i) => `${ra} / ${s.subjImperfSe[i]}`),
        subjFut: s.subjFut,
        subjPresPerf: compound(HABER.subjPres),
        subjPluperf: compound(HABER.subjImperfRa),
        subjFutPerf: compound(HABER.subjFut),
        impAff: s.impAff,
        impNeg: s.impNeg,
      },
    };
  }

  if (typeof module !== 'undefined' && module.exports) module.exports = { conjugate };
  else global.conjugate = conjugate;
})(typeof window !== 'undefined' ? window : globalThis);
