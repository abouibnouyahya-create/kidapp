// 📚 Contenu des niveaux de KidApp

// 🔤 Toutes les lettres MAJUSCULES (A à V, alphabet français courant)
const MAJUSCULES = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V'];

// 🔡 Toutes les lettres minuscules (a à v)
const MINUSCULES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];

// 📘 Syllabes simples
const SYLLABES = ['MA', 'PA', 'LA', 'TA', 'SA', 'RA', 'NA', 'MI', 'PI', 'LI', 'MO', 'PO', 'LO', 'ME', 'PE', 'LE'];

// 📙 Petits mots
const MOTS = ['CHAT', 'LUNE', 'PAPA', 'MAMAN', 'BÉBÉ', 'LOUP', 'ROI', 'AMI', 'ÉCOLE', 'LIT', 'EAU', 'PAIN'];

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
};