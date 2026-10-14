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
    return prefs[cle] !== false; // true par défaut
  } catch (e) {
    return true;
  }
}

// 🗣️ Fait parler le navigateur avec une voix française
export function dire(texte, options = {}) {
  if (!('speechSynthesis' in window)) return;

  // Respecte la préférence "voix activée"
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

// 🖱️ Petit "pop" au clic
export function pop() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

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

// 🎉 Fanfare de victoire
export function fanfare() {
  const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
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

// 🎵 Musique d'ambiance
let musiqueInterval = null;
let audioCtxMusique = null;

export function demarrerMusique() {
  // Respecte la préférence "musique activée"
  if (!prefActive('musiqueActive')) return;

  if (musiqueInterval) return;

  if (!audioCtxMusique) {
    audioCtxMusique = new (window.AudioContext || window.webkitAudioContext)();
  }

  const melodie = [523, 587, 659, 698, 784, 698, 659, 587];
  let index = 0;

  const jouerNote = () => {
    const freq = melodie[index];
    const oscillator = audioCtxMusique.createOscillator();
    const gainNode = audioCtxMusique.createGain();

    oscillator.type = 'sine';
    oscillator.frequency.value = freq;

    gainNode.gain.setValueAtTime(0, audioCtxMusique.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.03, audioCtxMusique.currentTime + 0.1);
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