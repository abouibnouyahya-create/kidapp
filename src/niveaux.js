// 📚 Contenu des niveaux de KidApp

// 🔤 Lettres MAJUSCULES
const MAJUSCULES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];

// 🔡 Lettres minuscules
const MINUSCULES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];

// 📘 Syllabes
const SYLLABES = ['MA', 'PA', 'LA', 'TA', 'SA', 'RA', 'NA', 'MI', 'PI', 'LI', 'MO', 'PO', 'LO', 'ME', 'PE', 'LE'];

// 📙 Petits mots avec emoji associé
const MOTS = [
  { texte: 'CHAT', emoji: '🐱' },
  { texte: 'LUNE', emoji: '🌙' },
  { texte: 'PAPA', emoji: '👨' },
  { texte: 'MAMAN', emoji: '👩' },
  { texte: 'BÉBÉ', emoji: '👶' },
  { texte: 'LOUP', emoji: '🐺' },
  { texte: 'ROI', emoji: '👑' },
  { texte: 'AMI', emoji: '👫' },
  { texte: 'ÉCOLE', emoji: '🏫' },
  { texte: 'LIT', emoji: '🛏️' },
  { texte: 'EAU', emoji: '💧' },
  { texte: 'PAIN', emoji: '🥖' },
  { texte: 'SOLEIL', emoji: '☀️' },
  { texte: 'FLEUR', emoji: '🌸' },
  { texte: 'OISEAU', emoji: '🐦' },
];

// 🔢 Chiffres avec points
const CHIFFRES = [
  { texte: '1', emoji: '●' },
  { texte: '2', emoji: '●●' },
  { texte: '3', emoji: '●●●' },
  { texte: '4', emoji: '●●●●' },
  { texte: '5', emoji: '●●●●●' },
  { texte: '6', emoji: '●●●●●●' },
  { texte: '7', emoji: '●●●●●●●' },
  { texte: '8', emoji: '●●●●●●●●' },
  { texte: '9', emoji: '●●●●●●●●●' },
  { texte: '10', emoji: '●●●●●●●●●●' },
];

// ⬛ Formes avec leur emoji
const FORMES = [
  { texte: 'ROND', emoji: '⚫' },
  { texte: 'CARRÉ', emoji: '⬛' },
  { texte: 'TRIANGLE', emoji: '🔺' },
  { texte: 'ÉTOILE', emoji: '⭐' },
  { texte: 'CŒUR', emoji: '❤️' },
  { texte: 'LOSANGE', emoji: '🔷' },
  { texte: 'RECTANGLE', emoji: '▬' },
];

// 🌈 Couleurs avec pastille de couleur
const COULEURS = [
  { texte: 'ROUGE', emoji: '🔴' },
  { texte: 'BLEU', emoji: '🔵' },
  { texte: 'JAUNE', emoji: '🟡' },
  { texte: 'VERT', emoji: '🟢' },
  { texte: 'VIOLET', emoji: '🟣' },
  { texte: 'ORANGE', emoji: '🟠' },
  { texte: 'NOIR', emoji: '⚫' },
  { texte: 'BLANC', emoji: '⚪' },
  { texte: 'MARRON', emoji: '🟤' },
];

// ✏️ Fonction qui transforme un item en texte + emoji (pour uniformiser)
function normaliser(items) {
  return items.map(item => {
    if (typeof item === 'string') return { texte: item, emoji: null };
    return item;
  });
}

export const NIVEAUX = {
  lettres: {
    nom: 'Lettres',
    emoji: '📗',
    description: 'A, B, C...',
    couleur: '#4CAF50',
    items: normaliser(MAJUSCULES),
    consigne: (item) => `Trouve la lettre ${item.texte} !`,
  },
  minuscules: {
    nom: 'Minuscules',
    emoji: '📗',
    description: 'a, b, c...',
    couleur: '#66BB6A',
    items: normaliser(MINUSCULES),
    consigne: (item) => `Trouve la lettre ${item.texte} !`,
  },
  syllabes: {
    nom: 'Syllabes',
    emoji: '📘',
    description: 'MA, PA, LA...',
    couleur: '#2196F3',
    items: normaliser(SYLLABES),
    consigne: (item) => `Trouve la syllabe ${item.texte} !`,
  },
  mots: {
    nom: 'Petits mots',
    emoji: '📙',
    description: 'CHAT, LUNE...',
    couleur: '#FF9800',
    items: MOTS,
    consigne: (item) => `Trouve le mot ${item.texte} !`,
  },
  chiffres: {
    nom: 'Chiffres',
    emoji: '🔢',
    description: '1, 2, 3...',
    couleur: '#9C27B0',
    items: CHIFFRES,
    consigne: (item) => `Trouve le chiffre ${item.texte} !`,
  },
  formes: {
    nom: 'Formes',
    emoji: '🔷',
    description: 'rond, carré...',
    couleur: '#E91E63',
    items: FORMES,
    consigne: (item) => `Trouve la forme ${item.texte} !`,
  },
  couleurs: {
    nom: 'Couleurs',
    emoji: '🎨',
    description: 'rouge, bleu...',
    couleur: '#FF5722',
    items: COULEURS,
    consigne: (item) => `Trouve la couleur ${item.texte} !`,
  },
};