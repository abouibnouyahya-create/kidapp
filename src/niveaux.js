// 📚 Contenu des niveaux de KidApp

// 🔤 Lettres MAJUSCULES
const MAJUSCULES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];

// 🔡 Lettres minuscules
const MINUSCULES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];

// 📘 Syllabes
const SYLLABES = ['MA', 'PA', 'LA', 'TA', 'SA', 'RA', 'NA', 'MI', 'PI', 'LI', 'MO', 'PO', 'LO', 'ME', 'PE', 'LE'];

// 📙 Petits mots
const MOTS = ['CHAT', 'LUNE', 'PAPA', 'MAMAN', 'BÉBÉ', 'LOUP', 'ROI', 'AMI', 'ÉCOLE', 'LIT', 'EAU', 'PAIN'];

// 🔢 Chiffres
const CHIFFRES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'];

// ⬛ Formes (en majuscules)
const FORMES = ['ROND', 'CARRÉ', 'TRIANGLE', 'ÉTOILE', 'CŒUR', 'LOSANGE', 'RECTANGLE'];

// 🌈 Couleurs
const COULEURS = ['ROUGE', 'BLEU', 'JAUNE', 'VERT', 'ROSE', 'VIOLET', 'ORANGE', 'NOIR', 'BLANC'];

export const NIVEAUX = {
  lettres: {
    nom: 'Lettres',
    emoji: '📗',
    description: 'A, B, C...',
    couleur: '#4CAF50',
    items: MAJUSCULES,
    consigne: (item) => `Trouve la lettre ${item} !`,
  },
  minuscules: {
    nom: 'Minuscules',
    emoji: '📗',
    description: 'a, b, c...',
    couleur: '#66BB6A',
    items: MINUSCULES,
    consigne: (item) => `Trouve la lettre ${item} !`,
  },
  syllabes: {
    nom: 'Syllabes',
    emoji: '📘',
    description: 'MA, PA, LA...',
    couleur: '#2196F3',
    items: SYLLABES,
    consigne: (item) => `Trouve la syllabe ${item} !`,
  },
  mots: {
    nom: 'Petits mots',
    emoji: '📙',
    description: 'CHAT, LUNE...',
    couleur: '#FF9800',
    items: MOTS,
    consigne: (item) => `Trouve le mot ${item} !`,
  },
  chiffres: {
    nom: 'Chiffres',
    emoji: '🔢',
    description: '1, 2, 3...',
    couleur: '#9C27B0',
    items: CHIFFRES,
    consigne: (item) => `Trouve le chiffre ${item} !`,
  },
  formes: {
    nom: 'Formes',
    emoji: '🔷',
    description: 'rond, carré...',
    couleur: '#E91E63',
    items: FORMES,
    consigne: (item) => `Trouve la forme ${item} !`,
  },
  couleurs: {
    nom: 'Couleurs',
    emoji: '🎨',
    description: 'rouge, bleu...',
    couleur: '#FF5722',
    items: COULEURS,
    consigne: (item) => `Trouve la couleur ${item} !`,
  },
};