/*
 * Wires the verb lookup to the conjugation table.
 * Depends on conjugate.js (conjugate) and verbs.js (VERBS).
 */
(function () {
  'use strict';

  const INITIAL_VERB = 'speak';
  const PERSONS = ['yo', 'tú', 'él / ella / usted', 'nosotros', 'vosotros', 'ellos / ellas / ustedes'];
  // The imperative has no "yo" form, so that choice falls back to tú.
  const IMPERATIVE_LABELS = ['tú', 'tú', 'usted', 'nosotros', 'vosotros', 'ustedes'];
  const IMPERATIVE_TENSES = new Set(['impAff', 'impNeg']);
  // Rows shown by default; every other tense appears when the button is pressed.
  const CORE_TENSES = new Set(['pres', 'pret', 'fut']);

  const input = document.getElementById('verb-input');
  const datalist = document.getElementById('verb-list');
  const message = document.getElementById('message');
  const result = document.getElementById('result');
  const exampleHead = document.getElementById('example-head');
  const exampleCells = document.querySelectorAll('td[data-tense]');
  const personRadios = document.querySelectorAll('input[name="person"]');
  const toggle = document.getElementById('toggle-tenses');
  const extraRows = [...exampleCells]
    .filter(cell => !CORE_TENSES.has(cell.dataset.tense))
    .map(cell => cell.closest('tr'));

  const englishVerbs = Object.keys(VERBS).sort();
  const state = { english: INITIAL_VERB, choice: 0, person: 0, expanded: false };

  function el(tag, className, text) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function fillDatalist() {
    for (const english of englishVerbs) {
      const option = el('option');
      option.value = english;
      option.label = VERBS[english].map(({ es }) => es).join(', ');
      datalist.append(option);
    }
  }

  function renderResult(options, conjugated) {
    const title = el('p', 'translation');
    const spanish = el('strong', '', options[state.choice].es);
    spanish.lang = 'es';
    title.append(`to ${state.english}`, el('span', 'arrow', '→'), spanish);

    const chips = el('div', 'chips');
    options.forEach(({ es }, i) => {
      const chip = el('button', 'chip', es);
      chip.type = 'button';
      chip.lang = 'es';
      chip.setAttribute('aria-pressed', String(i === state.choice));
      chip.addEventListener('click', () => { state.choice = i; render(); });
      chips.append(chip);
    });

    const forms = el('p', 'forms', `Gerund: ${conjugated.gerund} · Past participle: ${conjugated.participle}`);
    forms.lang = 'es';

    result.replaceChildren(title);
    if (options.length > 1) result.append(chips);
    if (options[state.choice].note) result.append(el('p', 'note', options[state.choice].note));
    result.append(forms);
  }

  function renderTable(conjugated) {
    const { person } = state;
    const verb = conjugated.inf[0].toUpperCase() + conjugated.inf.slice(1);
    exampleHead.textContent = `Example (${verb} · ${PERSONS[person]})`;
    exampleHead.lang = 'es';

    for (const cell of exampleCells) {
      const tense = cell.dataset.tense;
      const label = IMPERATIVE_TENSES.has(tense) ? ` (${IMPERATIVE_LABELS[person]})` : '';
      cell.textContent = conjugated.forms[tense][person] + label;
    }
  }

  function renderTenseVisibility() {
    extraRows.forEach(row => { row.hidden = !state.expanded; });
    toggle.textContent = state.expanded ? 'Show fewer tenses' : `Show ${extraRows.length} more tenses`;
    toggle.setAttribute('aria-expanded', String(state.expanded));
  }

  function render() {
    const options = VERBS[state.english];
    const conjugated = conjugate(options[state.choice].es);
    renderResult(options, conjugated);
    renderTable(conjugated);
  }

  function lookUp() {
    const query = input.value.trim().toLowerCase().replace(/^to\s+/, '');
    if (!query) { message.textContent = ''; return; }
    if (Object.hasOwn(VERBS, query)) {
      message.textContent = '';
      state.english = query;
      state.choice = 0;
      render();
    } else if (!englishVerbs.some(verb => verb.startsWith(query))) {
      message.textContent = `"${input.value.trim()}" isn't in the verb list yet. Showing "${state.english}" instead.`;
    } else {
      message.textContent = '';
    }
  }

  fillDatalist();
  input.addEventListener('input', lookUp);
  personRadios.forEach(radio => radio.addEventListener('change', () => {
    state.person = Number(radio.value);
    render();
  }));
  toggle.addEventListener('click', () => {
    state.expanded = !state.expanded;
    renderTenseVisibility();
  });
  renderTenseVisibility();
  render();
})();
