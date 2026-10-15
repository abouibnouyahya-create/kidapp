// 🏅 Définition des badges de KidApp

export const BADGES = {
  premiere_lettre: {
    id: 'premiere_lettre',
    emoji: '🌱',
    nom: 'Première lettre',
    description: 'Trouve ta première bonne réponse',
  },
  serie_5: {
    id: 'serie_5',
    emoji: '🔥',
    nom: 'En feu !',
    description: '5 bonnes réponses d\'affilée',
  },
  expert_lettres: {
    id: 'expert_lettres',
    emoji: '📗',
    nom: 'Expert des lettres',
    description: '10 bonnes réponses en Lettres',
  },
  expert_minuscules: {
    id: 'expert_minuscules',
    emoji: '📗',
    nom: 'Expert des minuscules',
    description: '10 bonnes réponses en Minuscules',
  },
  roi_syllabes: {
    id: 'roi_syllabes',
    emoji: '📘',
    nom: 'Roi des syllabes',
    description: '10 bonnes réponses en Syllabes',
  },
  champion_mots: {
    id: 'champion_mots',
    emoji: '📙',
    nom: 'Champion des mots',
    description: '10 bonnes réponses en Petits mots',
  },
  roi_chiffres: {
    id: 'roi_chiffres',
    emoji: '🔢',
    nom: 'Roi des chiffres',
    description: '10 bonnes réponses en Chiffres',
  },
  maitre_formes: {
    id: 'maitre_formes',
    emoji: '🔷',
    nom: 'Maître des formes',
    description: '10 bonnes réponses en Formes',
  },
  artiste_couleurs: {
    id: 'artiste_couleurs',
    emoji: '🎨',
    nom: 'Artiste des couleurs',
    description: '10 bonnes réponses en Couleurs',
  },
};

// 💾 Fonctions de sauvegarde des badges (localStorage)

const CLE_BADGES = 'kidapp_badges';

export function chargerBadges() {
  try {
    const sauvegarde = localStorage.getItem(CLE_BADGES);
    if (!sauvegarde) return [];
    return JSON.parse(sauvegarde);
  } catch (e) {
    return [];
  }
}

export function sauvegarderBadges(badges) {
  try {
    localStorage.setItem(CLE_BADGES, JSON.stringify(badges));
  } catch (e) {
    console.warn('Impossible de sauvegarder les badges');
  }
}