// ⚙️ Gestion des préférences de l'enfant (sauvegardées dans le navigateur)

const CLE_STOCKAGE = 'kidapp_preferences';

const PREFERENCES_PAR_DEFAUT = {
  couleur: 'orange',       // 'orange' | 'rose' | 'vert' | 'bleu' | 'violet'
  personnage: 'renard',    // 'renard' | 'panda' | 'hibou' | 'pieuvre'
  musiqueActive: true,
  voixActive: true,
};

// 🎨 Les thèmes de couleur disponibles
export const THEMES = {
  orange: {
    nom: 'Orange',
    couleurPrincipale: '#FF6B35',
    couleurSecondaire: '#FFD93D',
    couleurFonce: '#CC8400',
    emoji: '🧡',
    fond: 'linear-gradient(180deg, #87CEEB 0%, #B0E0E6 50%, #FFE4B5 100%)',
  },
  rose: {
    nom: 'Rose',
    couleurPrincipale: '#E91E63',
    couleurSecondaire: '#F8BBD0',
    couleurFonce: '#AD1457',
    emoji: '💗',
    fond: 'linear-gradient(180deg, #B3E5FC 0%, #F8BBD0 50%, #FFF3E0 100%)',
  },
  vert: {
    nom: 'Vert',
    couleurPrincipale: '#4CAF50',
    couleurSecondaire: '#C8E6C9',
    couleurFonce: '#2E7D32',
    emoji: '💚',
    fond: 'linear-gradient(180deg, #B2EBF2 0%, #C8E6C9 50%, #FFF9C4 100%)',
  },
  bleu: {
    nom: 'Bleu',
    couleurPrincipale: '#2196F3',
    couleurSecondaire: '#BBDEFB',
    couleurFonce: '#1565C0',
    emoji: '💙',
    fond: 'linear-gradient(180deg, #81D4FA 0%, #B3E5FC 50%, #E1F5FE 100%)',
  },
  violet: {
    nom: 'Violet',
    couleurPrincipale: '#9C27B0',
    couleurSecondaire: '#E1BEE7',
    couleurFonce: '#6A1B9A',
    emoji: '💜',
    fond: 'linear-gradient(180deg, #CE93D8 0%, #E1BEE7 50%, #F3E5F5 100%)',
  },
};

// 🦊 Les personnages disponibles
export const PERSONNAGES = {
  renard: { nom: 'Rex le renard', emoji: '🦊', fichier: 'renard.png' },
  panda:  { nom: 'Bao le panda',   emoji: '🐼', fichier: null },
  hibou:  { nom: 'Hugo le hibou',  emoji: '🦉', fichier: null },
  pieuvre: { nom: 'Octave',        emoji: '🐙', fichier: null },
};

// 📖 Charge les préférences depuis le navigateur
export function chargerPreferences() {
  try {
    const sauvegarde = localStorage.getItem(CLE_STOCKAGE);
    if (!sauvegarde) return PREFERENCES_PAR_DEFAUT;
    return { ...PREFERENCES_PAR_DEFAUT, ...JSON.parse(sauvegarde) };
  } catch (e) {
    return PREFERENCES_PAR_DEFAUT;
  }
}

// 💾 Sauvegarde les préférences dans le navigateur
export function sauvegarderPreferences(prefs) {
  try {
    localStorage.setItem(CLE_STOCKAGE, JSON.stringify(prefs));
  } catch (e) {
    console.warn('Impossible de sauvegarder les préférences');
  }
}