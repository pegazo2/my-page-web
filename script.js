const video = document.getElementById('video');
const subtitleOriginal = document.getElementById('subtitle-original');
const subtitleTranslation = document.getElementById('subtitle-translation');
const phrasesList = document.getElementById('phrases-list');

// Lista de frases con tiempos (en segundos), texto original y traducción
const phrases = [
  { start: 0, end: 5, original: "Look at these beautiful flowers.", translation: "Mira estas hermosas flores." },
  { start: 5, end: 10, original: "They bloom in the spring.", translation: "Florecen en la primavera." },
  { start: 10, end: 15, original: "The colors are so vibrant.", translation: "Los colores son tan vibrantes." },
  { start: 15, end: 20, original: "Nature is truly amazing.", translation: "La naturaleza es realmente increíble." }
];

// Crear lista de frases en la página
phrases.forEach((phrase, index) => {
  const div = document.createElement('div');
  div.classList.add('phrase');
  div.textContent = phrase.original;
  div.addEventListener('click', () => {
    video.currentTime = phrase.start;
    video.play();
  });
  phrasesList.appendChild(div);
});

function updateSubtitles() {
  const currentTime = video.currentTime;
  let activeIndex = -1;

  phrases.forEach((phrase, i) => {
    if (currentTime >= phrase.start && currentTime < phrase.end) {
      subtitleOriginal.textContent = phrase.original;
      subtitleTranslation.textContent = phrase.translation;
      activeIndex = i;
    }
  });

  // Resaltar la frase activa en la lista
  const phraseDivs = document.querySelectorAll('.phrase');
  phraseDivs.forEach((div, i) => {
    if (i === activeIndex) {
      div.classList.add('active');
      div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      div.classList.remove('active');
    }
  });

  if (activeIndex === -1) {
    subtitleOriginal.textContent = '';
    subtitleTranslation.textContent = '';
  }
}

// Actualizar subtítulos cada 100ms
video.addEventListener('timeupdate', updateSubtitles);
