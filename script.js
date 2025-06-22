// Solo renderiza el teclado hebreo

const HEBREW_LETTERS = [
  'פ','ו','ט','א','ר','ק','ש','ד',
  'ג','כ','ע','י','ח','ל','ז','ס',
  'ב','ה','נ','מ','צ','ת','ץ','שׂ','ם','ן','ף','ך'
];

const keyboard = document.getElementById('keyboard');

let selectedKeys = [];
let lastSelectedKey = null;

function updateLastLetterBanner() {
  const banner = document.getElementById('last-letter-banner');
  if (lastSelectedKey && lastSelectedKey.dataset.letter) {
    banner.textContent = `${lastSelectedKey.dataset.letter}`;
    banner.style.visibility = 'visible';
  } else {
    banner.textContent = '';
    banner.style.visibility = 'hidden';
  }
}

// Modifica handleKeyClick para actualizar el cartel:
function handleKeyClick(e) {
  const key = e.currentTarget;
  const letter = key.dataset.letter;
  if (!letter) return;

  // Si ya está seleccionada, deselecciona
  if (selectedKeys.includes(key)) {
    key.classList.remove('key-selected', 'key-last-selected');
    selectedKeys = selectedKeys.filter(k => k !== key);
    // Actualiza la última seleccionada
    if (lastSelectedKey === key) {
      lastSelectedKey = selectedKeys[selectedKeys.length - 1] || null;
      if (lastSelectedKey) {
        lastSelectedKey.classList.remove('key-selected');
        lastSelectedKey.classList.add('key-last-selected');
      }
    }
    updateLastLetterBanner();
    return;
  }

  // Selecciona la tecla
  key.classList.add('key-selected');
  selectedKeys.push(key);

  // Quita el color especial a la anterior última
  if (lastSelectedKey) {
    lastSelectedKey.classList.remove('key-last-selected');
    lastSelectedKey.classList.add('key-selected');
  }

  // Marca esta como la última seleccionada
  key.classList.remove('key-selected');
  key.classList.add('key-last-selected');
  lastSelectedKey = key;

  updateLastLetterBanner();
}

// Añade listeners después de renderizar el teclado
function enableKeySelection() {
  document.querySelectorAll('.key[data-letter]').forEach(key => {
    key.addEventListener('click', handleKeyClick);
  });
}

// Modifica renderKeyboard para llamar a enableKeySelection
function renderKeyboard() {
  keyboard.innerHTML = '';
  const rows = [
    ['פ','ם','ן','ו','ט','א','ר','ק','שׂ'],
    ['ף','ך','ל','ח','י','ע','כ','ג','ד','ש'],
    ['⌫','ץ','ת','צ','מ','נ','ה','ב','ס','ז'],
    ['↵',',','.',' ','?123']
  ];

  rows.forEach((rowLetters) => {
    const row = document.createElement('div');
    row.className = 'keyboard-row';

    rowLetters.forEach(letter => {
      const key = document.createElement('div');
      key.className = 'key';

      if (letter === '⌫') {
        key.classList.add('backspace');
        key.innerHTML = '⌫';
      } else if (letter === '↵') {
        key.classList.add('enter');
        key.innerHTML = '↵';
      } else if (letter === ' ') {
        key.classList.add('space');
        key.innerHTML = '';
      } else if (letter === '?123') {
        key.classList.add('alt');
        key.innerHTML = '?123';
      } else {
        key.textContent = letter;
        key.dataset.letter = letter;
      }

      row.appendChild(key);
    });

    keyboard.appendChild(row);
  });

  enableKeySelection();
}

window.onload = function() {
  renderKeyboard();
  updateLastLetterBanner();
};