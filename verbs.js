/*
 * English -> Spanish verb database.
 *
 * One line per English verb: `english: spanish, spanish (usage note)`.
 * The first Spanish verb is the default translation. To add a verb, add a
 * line here; conjugate.js works out the conjugation from the infinitive.
 * Reflexive verbs (-se) are not supported, so those are left out.
 */
(function (global) {
  'use strict';

  const TABLE = `
    abandon: abandonar
    absorb: absorber
    abuse: abusar
    accept: aceptar
    accompany: acompañar
    accomplish: realizar, lograr
    accuse: acusar
    achieve: lograr, alcanzar
    acknowledge: reconocer
    acquire: adquirir
    act: actuar
    adapt: adaptar
    add: añadir, agregar, sumar (in math)
    adjust: ajustar
    administer: administrar
    admire: admirar
    admit: admitir
    adopt: adoptar
    adore: adorar
    advance: avanzar
    advertise: anunciar
    advise: aconsejar
    affect: afectar
    age: envejecer
    agree: acordar (agree on), convenir
    aim: apuntar
    alert: alertar
    align: alinear
    allow: permitir, dejar
    alter: alterar
    amaze: asombrar
    amuse: divertir, entretener
    analyze: analizar
    anger: enojar, enfurecer
    announce: anunciar
    annoy: molestar, fastidiar
    answer: responder, contestar
    appear: aparecer
    applaud: aplaudir
    apply: aplicar, solicitar (apply for)
    appoint: nombrar
    appreciate: apreciar, agradecer (be grateful for)
    approach: abordar
    approve: aprobar
    argue: discutir, argumentar
    arise: surgir
    arrange: arreglar, organizar
    arrest: arrestar, detener
    arrive: llegar
    ascend: ascender
    ask: preguntar (a question), pedir (for something)
    ask for: pedir
    assemble: ensamblar, montar
    assess: evaluar
    assign: asignar
    assist: ayudar
    associate: asociar
    assume: suponer, asumir
    assure: asegurar
    astonish: asombrar
    attach: adjuntar
    attack: atacar
    attempt: intentar
    attend: asistir (an event), atender (take care of)
    attract: atraer
    attribute: atribuir
    audit: auditar
    authorize: autorizar
    avoid: evitar
    award: otorgar
    bake: hornear
    balance: equilibrar
    ban: prohibir
    bang: golpear
    bargain: regatear
    base: basar
    bathe: bañar
    battle: luchar
    be: ser (identity, traits), estar (state, location)
    bear: soportar, aguantar
    beat: vencer, golpear, batir
    beautify: embellecer
    beg: rogar, suplicar
    begin: empezar, comenzar, iniciar
    believe: creer
    belong: pertenecer
    bend: doblar
    bet: apostar
    bid: pujar
    bill: facturar
    bind: atar
    bite: morder
    blame: culpar
    bleed: sangrar
    blend: mezclar
    bless: bendecir
    blink: parpadear
    block: bloquear
    blow: soplar
    blur: difuminar
    board: abordar
    boast: presumir
    boil: hervir
    book: reservar
    boost: impulsar
    bore: aburrir
    bother: molestar
    bounce: rebotar
    bow: inclinar
    brake: frenar
    break: romper, quebrar
    breathe: respirar
    brew: elaborar
    bring: traer (bring here), llevar (take there)
    bring up: criar (children), mencionar (a topic)
    broadcast: transmitir
    browse: navegar
    brush: cepillar
    build: construir
    burn: quemar, arder
    burst: reventar
    bury: enterrar
    buy: comprar
    calculate: calcular
    call: llamar
    calm: calmar, tranquilizar
    camp: acampar
    can: poder (be able to)
    cancel: cancelar
    capture: capturar
    care: cuidar
    carry: llevar, cargar
    carry out: realizar
    catch: atrapar, coger
    categorize: clasificar
    cause: causar
    cease: cesar
    celebrate: celebrar
    challenge: desafiar
    change: cambiar
    charge: cobrar
    charm: encantar
    chase: perseguir
    chat: charlar, conversar
    cheat: engañar
    check: revisar, comprobar
    cheer: animar
    chew: masticar
    choose: elegir, escoger
    chop: picar, cortar
    circulate: circular
    claim: reclamar, afirmar
    clap: aplaudir
    clarify: aclarar
    classify: clasificar
    clean: limpiar
    clean up: limpiar, ordenar
    clear: despejar, aclarar
    climb: subir, escalar, trepar
    clip: recortar
    clone: clonar
    close: cerrar
    coach: entrenar
    code: programar, codificar
    collapse: colapsar, derrumbar
    collect: coleccionar, recoger
    comb: peinar
    combine: combinar
    come: venir
    come back: volver, regresar
    come in: entrar
    comfort: consolar
    command: ordenar, mandar
    comment: comentar
    commit: cometer
    communicate: comunicar
    compare: comparar
    compensate: compensar
    compete: competir
    complete: completar
    comply: cumplir
    compose: componer
    conclude: concluir
    condemn: condenar
    conduct: conducir
    confess: confesar
    confirm: confirmar
    confront: enfrentar
    confuse: confundir
    congratulate: felicitar
    connect: conectar
    consent: consentir
    conserve: conservar
    consider: considerar
    consist: consistir
    constitute: constituir
    construct: construir
    consult: consultar
    consume: consumir
    contact: contactar
    contain: contener
    continue: continuar, seguir
    contradict: contradecir
    contribute: contribuir
    control: controlar
    convert: convertir
    convey: transmitir, expresar
    convince: convencer
    cook: cocinar
    cool: enfriar
    cooperate: cooperar
    coordinate: coordinar
    cope: afrontar
    copy: copiar
    correct: corregir
    cost: costar
    cough: toser
    count: contar
    court: cortejar
    cover: cubrir
    crack: agrietar
    crash: chocar
    crave: anhelar
    crawl: gatear, arrastrar
    create: crear
    criticize: criticar
    cross: cruzar, atravesar
    crush: aplastar
    cry: llorar (weep), gritar (shout)
    cure: curar
    curl: rizar
    curse: maldecir
    customize: personalizar
    cut: cortar
    cut off: cortar
    damage: dañar
    dance: bailar
    dare: osar
    darken: oscurecer
    deal: tratar (deal with)
    debug: depurar
    deceive: engañar
    decide: decidir
    declare: declarar
    decline: declinar, rechazar
    decorate: decorar
    decrease: disminuir
    dedicate: dedicar
    defeat: derrotar
    defend: defender
    define: definir
    delay: retrasar, demorar
    delete: borrar, eliminar
    delight: encantar
    deliver: entregar, repartir
    demand: exigir
    demolish: demoler
    demonstrate: demostrar
    deny: negar
    depend: depender
    deport: deportar
    deposit: depositar
    derive: derivar
    descend: descender
    describe: describir
    deserve: merecer
    design: diseñar
    designate: designar
    desire: desear
    despise: despreciar
    destroy: destruir
    detect: detectar
    determine: determinar
    develop: desarrollar
    diagnose: diagnosticar
    dictate: dictar
    die: morir
    differ: diferir
    dig: cavar
    digest: digerir
    dim: atenuar
    diminish: disminuir
    dine: cenar
    direct: dirigir
    disagree: discrepar
    disappear: desaparecer
    disappoint: decepcionar
    discard: descartar
    discourage: desanimar
    discover: descubrir
    discuss: discutir
    dismiss: despedir, descartar
    display: exhibir, mostrar
    dispute: disputar
    distinguish: distinguir
    distract: distraer
    distribute: distribuir
    disturb: molestar, perturbar
    dive: bucear
    divide: dividir
    do: hacer
    dominate: dominar
    donate: donar
    double: duplicar
    download: descargar
    drag: arrastrar
    drain: drenar
    draw: dibujar
    dream: soñar
    dress: vestir
    drift: derivar
    drill: perforar
    drink: beber, tomar
    drive: conducir, manejar
    drop: soltar
    drown: ahogar
    dry: secar
    duplicate: duplicar
    dwell: habitar
    earn: ganar
    eat: comer
    echo: resonar
    edit: editar
    educate: educar
    elaborate: elaborar
    elect: elegir
    eliminate: eliminar
    embrace: abrazar
    emerge: surgir
    emphasize: enfatizar, destacar
    employ: emplear
    empty: vaciar
    enable: permitir, habilitar
    encounter: encontrar
    encourage: animar, alentar
    end: terminar, acabar
    endure: soportar, aguantar
    enforce: aplicar
    engage: involucrar, contratar (hire)
    enhance: mejorar
    enjoy: disfrutar
    enlarge: agrandar
    enrich: enriquecer
    ensure: asegurar
    enter: entrar
    entertain: entretener, divertir
    equip: equipar
    erase: borrar
    escape: escapar, huir
    establish: establecer
    estimate: estimar
    evaluate: evaluar
    evolve: evolucionar
    exaggerate: exagerar
    examine: examinar
    exceed: exceder
    exchange: intercambiar, cambiar
    exclude: excluir
    excuse: disculpar
    execute: ejecutar
    exercise: ejercitar
    exhaust: agotar
    exhibit: exhibir
    exist: existir
    expand: expandir, ampliar
    expect: esperar
    expel: expulsar
    experience: experimentar
    explain: explicar
    explode: explotar
    exploit: explotar
    explore: explorar
    export: exportar
    expose: exponer
    express: expresar
    extend: extender
    extract: extraer
    face: enfrentar
    fade: desvanecer
    fail: fallar, fracasar, suspender (a test)
    fall: caer
    fall down: caer
    fascinate: fascinar
    fasten: sujetar, abrochar
    favor: favorecer
    fear: temer
    feed: alimentar
    feel: sentir
    fetch: traer, buscar
    fight: luchar, pelear
    file: archivar
    fill: llenar, rellenar
    fill in: rellenar
    film: filmar
    filter: filtrar
    finance: financiar
    find: encontrar, hallar
    find out: averiguar, descubrir
    finish: terminar, acabar
    fire: despedir (from a job), disparar (a weapon)
    fish: pescar
    fit: caber, encajar
    fix: arreglar, reparar
    flash: destellar
    flatter: halagar
    flee: huir
    flip: voltear
    flirt: coquetear
    float: flotar
    flood: inundar
    flourish: florecer
    flow: fluir, correr
    fly: volar
    focus: enfocar
    fold: doblar, plegar
    follow: seguir
    fool: engañar
    forbid: prohibir
    force: forzar
    forecast: pronosticar
    foresee: prever
    forget: olvidar
    forgive: perdonar
    form: formar
    formulate: formular
    found: fundar
    frame: enmarcar
    free: liberar
    freeze: congelar, helar
    frighten: asustar
    frown: fruncir
    fry: freír
    fulfill: cumplir
    function: funcionar
    gain: ganar
    gamble: apostar
    gather: reunir, recoger
    generate: generar
    get: conseguir (obtain), obtener, recibir (receive)
    give: dar
    give up: abandonar, renunciar
    glow: brillar
    glue: pegar
    go: ir
    go back: volver, regresar
    go on: continuar, seguir
    go out: salir
    govern: gobernar
    grab: agarrar
    graduate: graduar
    grant: conceder
    greet: saludar
    grill: asar
    grind: moler
    groan: gemir
    grow: crecer, cultivar (crops)
    grow up: crecer
    guarantee: garantizar
    guard: guardar, vigilar
    guess: adivinar, suponer
    guide: guiar
    hang: colgar
    hang up: colgar
    happen: ocurrir, suceder, pasar
    harm: dañar
    harvest: cosechar
    hate: odiar
    have: tener, haber (auxiliary)
    heal: curar, sanar
    hear: oír
    heat: calentar
    help: ayudar
    hesitate: dudar, vacilar
    hide: esconder, ocultar
    highlight: resaltar, destacar
    hire: contratar
    hit: golpear, pegar
    hold: sostener, agarrar
    hold on: aguantar, esperar
    honor: honrar
    hope: esperar
    host: alojar
    howl: aullar
    hug: abrazar
    hum: tararear
    humiliate: humillar
    hunt: cazar
    hurt: doler (to ache), herir (to wound), lastimar
    identify: identificar
    ignore: ignorar
    illustrate: ilustrar
    imagine: imaginar
    imitate: imitar
    imply: implicar
    impose: imponer
    impress: impresionar
    improve: mejorar
    include: incluir
    incorporate: incorporar
    increase: aumentar
    indicate: indicar
    infect: infectar
    influence: influir
    inform: informar
    inhale: inhalar
    inherit: heredar
    initiate: iniciar
    inject: inyectar
    injure: herir, lesionar
    inquire: preguntar, indagar
    insist: insistir
    inspect: inspeccionar
    inspire: inspirar
    install: instalar
    instruct: instruir
    integrate: integrar
    intend: pretender
    interact: interactuar
    interest: interesar
    interpret: interpretar
    interrupt: interrumpir
    intervene: intervenir
    interview: entrevistar
    introduce: presentar (a person), introducir
    invent: inventar
    invest: invertir
    invite: invitar
    involve: involucrar
    iron: planchar
    isolate: aislar
    issue: emitir
    itch: picar
    jog: trotar
    join: unir, juntar
    joke: bromear
    judge: juzgar
    jump: saltar
    justify: justificar
    keep: guardar, mantener
    keep on: seguir, continuar
    kick: patear
    kill: matar
    kiss: besar
    knit: tejer
    knock: golpear, llamar (at a door)
    know: saber (facts, how to), conocer (people, places)
    label: etiquetar
    lack: carecer
    land: aterrizar
    last: durar
    laugh: reír
    launch: lanzar
    lay: poner, colocar
    lead: dirigir, guiar, liderar
    leak: filtrar
    lean: inclinar, apoyar
    leap: saltar
    learn: aprender
    leave: salir (depart), dejar (leave behind), abandonar
    lend: prestar
    let: dejar, permitir
    let down: decepcionar
    level: nivelar
    lick: lamer
    lie: mentir
    lift: levantar, elevar
    light: encender, iluminar
    lighten: aligerar
    like: gustar
    limit: limitar
    liquidate: liquidar
    listen: escuchar
    listen to: escuchar
    live: vivir
    load: cargar
    locate: ubicar, localizar
    lock: bloquear
    log: registrar
    long: anhelar
    look: mirar
    look after: cuidar
    look at: mirar
    look for: buscar
    look up: buscar
    lose: perder
    love: amar, querer
    lower: bajar
    magnify: ampliar
    maintain: mantener
    make: hacer, fabricar
    make up: inventar
    manage: gestionar, administrar, manejar
    manipulate: manipular
    manufacture: fabricar
    map: mapear
    march: marchar
    mark: marcar
    master: dominar
    match: igualar, emparejar
    matter: importar
    mean: significar
    measure: medir
    mediate: mediar
    meet: conocer (for the first time), encontrar (run into)
    melt: derretir, fundir
    memorize: memorizar
    mention: mencionar
    merge: fusionar
    migrate: migrar
    mimic: imitar
    mislead: engañar
    miss: extrañar (feel the absence of), perder (a bus, a chance)
    mix: mezclar
    mock: ridiculizar
    modify: modificar
    monitor: monitorear
    motivate: motivar
    mount: montar
    move: mover, mudar
    multiply: multiplicar
    murder: asesinar
    must: deber (obligation)
    nail: clavar
    name: nombrar
    navigate: navegar
    need: necesitar
    neglect: descuidar
    negotiate: negociar
    nod: asentir
    nominate: nominar
    notice: notar
    nourish: nutrir
    obey: obedecer
    object: objetar
    oblige: obligar
    observe: observar
    obstruct: obstruir
    obtain: obtener
    occupy: ocupar
    occur: ocurrir
    offend: ofender
    offer: ofrecer
    omit: omitir
    open: abrir
    operate: operar
    oppose: oponer
    oppress: oprimir
    order: ordenar (arrange, command), pedir (a meal)
    organize: organizar
    outline: esbozar
    overcome: superar
    oversee: supervisar
    overtake: adelantar
    overturn: volcar
    owe: deber
    own: poseer
    pack: empacar
    paddle: remar
    paint: pintar
    park: estacionar, aparcar
    participate: participar
    pass: pasar
    pause: pausar
    pay: pagar
    pay back: devolver, reembolsar
    peek: espiar
    peel: pelar
    perceive: percibir
    perfect: perfeccionar
    perform: realizar, actuar
    permit: permitir
    persuade: persuadir
    pick: escoger, recoger (pick up)
    pick out: escoger, elegir
    pick up: recoger
    pierce: perforar, atravesar
    pinch: pellizcar
    pitch: lanzar
    place: colocar
    plan: planear, planificar
    plant: plantar
    play: jugar (games, sports), tocar (an instrument)
    plead: suplicar, alegar
    please: complacer, agradar
    plot: tramar
    plug: enchufar
    plunge: sumergir
    point: señalar, apuntar
    point out: señalar
    poison: envenenar
    polish: pulir
    pollute: contaminar
    ponder: reflexionar
    populate: poblar
    pose: posar
    possess: poseer
    postpone: posponer, aplazar
    pound: golpear
    pour: verter, servir
    practice: practicar
    praise: elogiar, alabar
    pray: rezar, orar
    preach: predicar
    precede: preceder
    predict: predecir
    prefer: preferir
    prepare: preparar
    prescribe: prescribir
    present: presentar
    preserve: conservar
    preside: presidir
    press: presionar, apretar
    pretend: fingir
    prevail: prevalecer
    prevent: prevenir, impedir
    prick: pinchar
    print: imprimir
    proceed: proceder
    process: procesar
    proclaim: proclamar
    produce: producir
    program: programar
    progress: progresar
    project: proyectar
    promise: prometer
    promote: promover
    prompt: incitar
    pronounce: pronunciar
    propel: impulsar
    propose: proponer
    prosper: prosperar
    protect: proteger
    protest: protestar
    prove: probar, demostrar
    provide: proveer, proporcionar
    provoke: provocar
    prune: podar
    publish: publicar
    pull: tirar, jalar
    pump: bombear
    punch: golpear
    punish: castigar
    purchase: adquirir, comprar
    pursue: perseguir
    push: empujar
    put: poner
    put off: aplazar, posponer
    puzzle: desconcertar
    qualify: calificar
    question: cuestionar
    quit: dejar, renunciar
    quote: citar
    rain: llover
    raise: levantar, criar (children)
    rank: clasificar
    rate: calificar
    reach: alcanzar, llegar
    react: reaccionar
    read: leer
    reassure: tranquilizar
    rebuild: reconstruir
    recall: recordar
    receive: recibir
    recite: recitar
    reckon: calcular
    recognize: reconocer
    recommend: recomendar
    record: grabar
    recover: recuperar
    recreate: recrear
    recruit: reclutar
    recycle: reciclar
    redo: rehacer
    reduce: reducir
    refer: referir
    refine: refinar
    reflect: reflejar
    reform: reformar
    refresh: refrescar
    refund: reembolsar
    refuse: rechazar, negar
    register: registrar
    regret: lamentar
    rehearse: ensayar
    reinforce: reforzar
    reject: rechazar
    relate: relacionar
    relax: relajar
    release: liberar, soltar
    relieve: aliviar
    rely: confiar
    remain: permanecer
    remedy: remediar
    remember: recordar
    remind: recordar
    remodel: remodelar
    remove: quitar, eliminar
    renew: renovar
    rent: alquilar
    repair: reparar
    repay: reembolsar, devolver
    repeat: repetir
    replace: reemplazar, sustituir
    reply: responder, contestar
    report: informar
    represent: representar
    repress: reprimir
    reproduce: reproducir
    request: solicitar, pedir
    require: requerir, exigir
    rescue: rescatar
    research: investigar
    reserve: reservar
    reside: residir
    resign: renunciar
    resist: resistir
    resolve: resolver
    respect: respetar
    respond: responder
    rest: descansar
    restore: restaurar
    restrict: restringir
    result: resultar
    retain: retener
    retreat: retroceder
    retrieve: recuperar
    return: regresar, volver, devolver (give back)
    reunite: reunir
    reveal: revelar
    review: repasar, revisar
    revise: revisar
    revive: revivir
    reward: recompensar
    rhyme: rimar
    ride: montar
    ring: sonar
    rinse: enjuagar
    rip: rasgar
    rise: subir, levantar
    risk: arriesgar
    roar: rugir
    roast: asar
    rob: robar
    roll: rodar
    rotate: rotar
    row: remar
    rub: frotar
    ruin: arruinar
    rule: gobernar
    run: correr
    run away: huir, escapar
    rush: apresurar
    sacrifice: sacrificar
    sail: navegar
    salute: saludar
    sanction: sancionar
    satisfy: satisfacer
    saturate: saturar
    save: ahorrar (money), salvar (rescue), guardar (keep)
    saw: serrar
    say: decir
    scale: escalar
    scan: escanear
    scare: asustar
    scatter: esparcir
    scold: regañar
    score: anotar
    scratch: rascar
    scream: gritar, chillar
    screw: atornillar
    seal: sellar
    search: buscar
    season: sazonar
    secure: asegurar
    seduce: seducir
    see: ver
    seek: buscar
    seem: parecer
    select: seleccionar
    sell: vender
    send: enviar, mandar
    send back: devolver
    sentence: sentenciar
    separate: separar
    serve: servir
    set: poner, colocar
    set off: partir
    set up: configurar, establecer
    settle: resolver, establecer
    sew: coser
    shade: sombrear
    shake: sacudir
    shape: moldear
    share: compartir
    shatter: destrozar, romper
    shave: afeitar
    shelter: refugiar
    shift: cambiar, mover
    shine: brillar
    shiver: temblar
    shock: impactar
    shoot: disparar
    shorten: acortar
    should: deber (advice, obligation)
    shout: gritar
    show: mostrar, enseñar
    show off: presumir
    show up: aparecer
    shrink: encoger
    shuffle: barajar
    shut: cerrar
    sigh: suspirar
    sign: firmar
    signal: señalar
    simplify: simplificar
    simulate: simular
    sing: cantar
    sink: hundir
    sip: sorber
    sketch: bosquejar
    skip: saltar
    slap: abofetear
    sleep: dormir
    slice: rebanar
    slide: deslizar
    slip: resbalar
    smash: aplastar
    smell: oler
    smile: sonreír
    smoke: fumar
    snatch: arrebatar
    sneeze: estornudar
    snore: roncar
    snow: nevar
    soak: empapar
    soften: suavizar
    solve: resolver
    soothe: calmar
    sort: ordenar, clasificar
    sound: sonar
    sow: sembrar
    speak: hablar
    specify: especificar
    speculate: especular
    speed: acelerar
    spell: deletrear
    spend: gastar (money), pasar (time)
    spill: derramar
    spin: girar
    spit: escupir
    split: dividir, partir
    spoil: estropear
    spray: rociar
    spread: extender, difundir
    sprinkle: espolvorear
    squeeze: exprimir, apretar
    stab: apuñalar
    stabilize: estabilizar
    stain: manchar
    stamp: sellar
    start: empezar, comenzar, iniciar
    state: afirmar, declarar
    stay: permanecer
    steal: robar
    steer: dirigir
    stew: guisar
    stick: pegar
    stimulate: estimular
    sting: picar
    stir: remover
    stitch: coser
    stop: parar, detener
    store: almacenar
    strengthen: fortalecer
    stretch: estirar
    stroll: pasear
    struggle: luchar
    study: estudiar
    stumble: tropezar
    subdue: someter
    submit: presentar, someter
    subscribe: suscribir
    substitute: sustituir
    subtract: restar
    succeed: triunfar
    suck: chupar
    sue: demandar
    suffer: sufrir
    suggest: sugerir
    sum: sumar
    summarize: resumir
    summon: convocar
    supervise: supervisar
    supply: suministrar, proveer
    support: apoyar
    suppose: suponer
    surf: surfear
    surprise: sorprender
    surround: rodear
    survive: sobrevivir
    suspect: sospechar
    suspend: suspender
    sustain: sostener, mantener
    swallow: tragar
    swap: intercambiar
    sway: balancear
    swear: jurar
    sweat: sudar
    sweep: barrer
    swell: hinchar
    swim: nadar
    swing: columpiar
    switch: cambiar
    tackle: abordar
    tag: etiquetar
    take: tomar, llevar (take along)
    take care of: cuidar
    take off: despegar (a plane), quitar (clothes)
    take part: participar
    talk: hablar, charlar
    tame: domar
    tap: tocar
    target: apuntar
    taste: probar, saborear
    tax: gravar
    teach: enseñar
    tear: rasgar, romper
    tease: molestar, bromear
    telephone: telefonear
    tell: decir, contar (a story)
    tempt: tentar
    tend: tender
    terrify: aterrorizar
    test: probar, examinar
    thank: agradecer
    thaw: descongelar
    think: pensar (ponder), creer (believe)
    think about: pensar
    threaten: amenazar
    thrill: emocionar
    thrive: prosperar
    throw: lanzar, tirar
    throw away: tirar
    tidy: ordenar
    tie: atar
    tighten: apretar
    tilt: inclinar
    tire: cansar
    toast: tostar
    tolerate: tolerar
    torture: torturar
    toss: lanzar
    touch: tocar
    tour: recorrer
    tow: remolcar
    trace: trazar
    track: rastrear
    trade: comerciar
    train: entrenar
    transfer: transferir
    transform: transformar
    translate: traducir
    transmit: transmitir
    transplant: trasplantar
    transport: transportar
    trap: atrapar
    travel: viajar
    treat: tratar
    tremble: temblar
    trick: engañar
    trim: recortar
    trot: trotar
    trust: confiar
    try: intentar, probar (try out)
    try on: probar
    tune: afinar
    turn: girar, doblar
    turn around: girar
    turn down: rechazar, bajar (volume)
    turn off: apagar
    turn on: encender
    turn up: subir
    type: teclear
    undermine: socavar
    understand: entender, comprender
    undo: deshacer
    undress: desvestir
    unfold: desplegar
    unify: unificar
    unite: unir
    unload: descargar
    unwrap: desenvolver
    update: actualizar
    upgrade: mejorar, actualizar
    uphold: sostener
    upload: subir
    urge: instar
    use: usar, utilizar
    utilize: utilizar
    validate: validar
    value: valorar
    vanish: desaparecer
    vary: variar
    verify: verificar
    vibrate: vibrar
    view: ver, observar
    violate: violar
    visit: visitar
    vomit: vomitar
    vote: votar
    wait: esperar
    wait for: esperar
    wake: despertar
    wake up: despertar
    walk: caminar, andar
    wander: vagar
    want: querer, desear
    warm: calentar
    warm up: calentar
    warn: advertir, avisar
    warrant: justificar
    wash: lavar
    waste: desperdiciar
    watch: mirar (look at), vigilar (keep watch), ver (TV, movies)
    water: regar
    wave: saludar
    weaken: debilitar
    wear: llevar, vestir
    weave: tejer
    wed: casar
    weep: llorar
    weigh: pesar
    welcome: acoger
    weld: soldar
    whip: azotar
    whisper: susurrar
    whistle: silbar
    widen: ensanchar
    win: ganar
    wink: guiñar
    wipe: limpiar
    wish: desear
    withdraw: retirar
    withstand: resistir
    wobble: tambalear
    work: trabajar, funcionar (machines)
    work out: resolver, entrenar
    worship: adorar
    wound: herir
    wrap: envolver
    wreck: destruir
    wrestle: luchar
    wring: retorcer
    write: escribir
    write down: anotar, apuntar
    yawn: bostezar
    yearn: anhelar
    yell: gritar
    yield: ceder
  `;

  // "know: saber (facts), conocer (people)" -> { know: [{ es, note }, ...] }
  // Commas inside parentheses belong to the note, not the list.
  function parse(table) {
    const verbs = {};
    for (const line of table.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed) continue;
      const colon = trimmed.indexOf(':');
      const english = trimmed.slice(0, colon).trim();
      if (english in verbs) throw new Error(`verbs.js: duplicate English verb "${english}"`);
      verbs[english] = trimmed
        .slice(colon + 1)
        .split(/,\s*(?![^()]*\))/)
        .map(entry => {
          const [, es, note] = entry.trim().match(/^([^(]+?)\s*(?:\((.*)\))?$/);
          return note ? { es, note } : { es };
        });
    }
    return verbs;
  }

  const VERBS = parse(TABLE);

  if (typeof module !== 'undefined' && module.exports) module.exports = { VERBS };
  else global.VERBS = VERBS;
})(typeof window !== 'undefined' ? window : globalThis);
