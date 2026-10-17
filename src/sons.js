// 🔊 Fichier qui gère tous les sons de KidApp

// 📖 Prononciation des lettres en français
const PRONONCIATION = {
  'A': 'A', 'B': 'Bé', 'C': 'Cé', 'D': 'Dé', 'E': 'E',
  'F': 'Èf', 'G': 'Jé', 'H': 'Ash', 'I': 'I', 'J': 'Ji',
  'K': 'Ka', 'L': 'Èl', 'M': 'Èm', 'N': 'Èn', 'O': 'O',
  'P': 'Pé', 'Q': 'Ku', 'R': 'Èr', 'S': 'Ès', 'T': 'Té',
  'U': 'U', 'V': 'Vé', 'W': 'Double vé', 'X': 'Iks',
  'Y': 'I grèque', 'Z': 'Zèd',
};

// 🔍 Vérifie une préférence dans le localStorage
function prefActive(cle) {
  try {
    const prefs = JSON.parse(localStorage.getItem('kidapp_preferences') || '{}');
    return prefs[cle] !== false;
  } catch (e) {
    return true;
  }
}

// 🎵 Récupère le contexte audio
function getAudioCtx() {
  return new (window.AudioContext || window.webkitAudioContext)();
}

// 🗣️ Voix française
export function dire(texte, options = {}) {
  if (!('speechSynthesis' in window)) return;
  if (!prefActive('voixActive')) return;

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(texte);
  utterance.lang = 'fr-FR';
  utterance.rate = options.rate || 0.95;
  utterance.pitch = options.pitch || 1.2;
  utterance.volume = options.volume || 1;

  window.speechSynthesis.speak(utterance);
}

// 🔤 Dit le nom d'une lettre en français
export function direLettre(lettre) {
  const texte = PRONONCIATION[lettre.toUpperCase()] || lettre;
  dire(texte);
}

// 🎉 Félicitations variées (au lieu de toujours "Bravo !")
const FELICITATIONS = [
  'Bravo !',
  'Super !',
  'Génial !',
  'Waouh !',
  'Excellent !',
  'Trop fort !',
  'Tu gères !',
  'Fantastique !',
  'Magnifique !',
  'Champion !',
];

export function feliciter() {
  const phrase = FELICITATIONS[Math.floor(Math.random() * FELICITATIONS.length)];
  dire(phrase);
}

// 🎊 Rire joyeux
export function rire() {
  if (!prefActive('voixActive')) return;
  const audioCtx = getAudioCtx();
  const notes = [880, 990, 880];

  notes.forEach((freq, i) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    const debut = audioCtx.currentTime + i * 0.15;
    gainNode.gain.setValueAtTime(0, debut);
    gainNode.gain.linearRampToValueAtTime(0.12, debut + 0.03);
    gainNode.gain.exponentialRampToValueAtTime(0.001, debut + 0.18);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(debut);
    oscillator.stop(debut + 0.2);
  });
}

// 👏 Applaudissements
export function applaudissements() {
  if (!prefActive('voixActive')) return;
  const audioCtx = getAudioCtx();
  const duree = 0.8;

  const sampleRate = audioCtx.sampleRate;
  const buffer = audioCtx.createBuffer(1, sampleRate * duree, sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / data.length, 2);
  }

  const source = audioCtx.createBufferSource();
  source.buffer = buffer;

  const gainNode = audioCtx.createGain();
  gainNode.gain.value = 0.15;

  source.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  source.start();
}

// 🖱️ Petit "pop" au clic
export function pop() {
  const audioCtx = getAudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(880, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.1);

  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.15);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.15);
}

// ❌ Petit son "doux raté"
export function rate() {
  const audioCtx = getAudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'triangle';
  oscillator.frequency.setValueAtTime(220, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(150, audioCtx.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0.12, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.25);
}

// 🎉 Fanfare de victoire longue
export function fanfareLongue() {
  const audioCtx = getAudioCtx();
  const notes = [523, 587, 659, 698, 784, 880, 988, 1046];

  notes.forEach((freq, i) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    const debut = audioCtx.currentTime + i * 0.08;
    gainNode.gain.setValueAtTime(0, debut);
    gainNode.gain.linearRampToValueAtTime(0.12, debut + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, debut + 0.4);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(debut);
    oscillator.stop(debut + 0.4);
  });
}

// 🎉 Fanfare standard (plus courte)
export function fanfare() {
  const audioCtx = getAudioCtx();
  const notes = [523, 659, 784, 1046];

  notes.forEach((freq, i) => {
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    const debut = audioCtx.currentTime + i * 0.1;
    gainNode.gain.setValueAtTime(0, debut);
    gainNode.gain.linearRampToValueAtTime(0.15, debut + 0.02);
    gainNode.gain.exponentialRampToValueAtTime(0.001, debut + 0.3);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    oscillator.start(debut);
    oscillator.stop(debut + 0.3);
  });
}

// 🎼 Son de transition entre écrans
export function transition() {
  const audioCtx = getAudioCtx();
  const oscillator = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(400, audioCtx.currentTime);
  oscillator.frequency.exponentialRampToValueAtTime(1200, audioCtx.currentTime + 0.2);

  gainNode.gain.setValueAtTime(0.08, audioCtx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + 0.25);

  oscillator.connect(gainNode);
  gainNode.connect(audioCtx.destination);

  oscillator.start();
  oscillator.stop(audioCtx.currentTime + 0.25);
}

// 🎵 Mélodies différentes par ambiance
const MELODIES = {
  calme: [392, 440, 494, 523, 494, 440, 392, 349],
  joyeuse: [523, 587, 659, 587, 523, 659, 784, 659],
  rythmee: [440, 440, 523, 523, 440, 587, 587, 523],
};

// 🎵 Musique d'ambiance
let musiqueInterval = null;
let audioCtxMusique = null;

export function demarrerMusique(style = 'joyeuse') {
  if (!prefActive('musiqueActive')) return;
  if (musiqueInterval) return;

  if (!audioCtxMusique) {
    audioCtxMusique = new (window.AudioContext || window.webkitAudioContext)();
  }

  const melodie = MELODIES[style] || MELODIES.joyeuse;
  let index = 0;

  const jouerNote = () => {
    const freq = melodie[index];
    const oscillator = audioCtxMusique.createOscillator();
    const gainNode = audioCtxMusique.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, audioCtxMusique.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.025, audioCtxMusique.currentTime + 0.1);
    gainNode.gain.exponentialRampToValueAtTime(0.001, audioCtxMusique.currentTime + 0.8);

    oscillator.connect(gainNode);
    gainNode.connect(audioCtxMusique.destination);

    oscillator.start();
    oscillator.stop(audioCtxMusique.currentTime + 0.9);

    index = (index + 1) % melodie.length;
  };

  jouerNote();
  musiqueInterval = setInterval(jouerNote, 900);
}

export function arreterMusique() {
  if (musiqueInterval) {
    clearInterval(musiqueInterval);
    musiqueInterval = null;
  }
}