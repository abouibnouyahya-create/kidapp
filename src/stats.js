// 📊 Gestion des statistiques de KidApp (sauvegardées)

const CLE_STATS = 'kidapp_stats';

const STATS_PAR_DEFAUT = {
  tempsTotal: 0,       // en secondes
  partiesJouees: 0,
  bonnesReponses: 0,
  mauvaisesReponses: 0,
  parNiveau: {
    lettres: 0,
    minuscules: 0,
    syllabes: 0,
    mots: 0,
    chiffres: 0,
    formes: 0,
    couleurs: 0,
  },
};

// 📖 Charge les stats
export function chargerStats() {
  try {
    const sauvegarde = localStorage.getItem(CLE_STATS);
    if (!sauvegarde) return STATS_PAR_DEFAUT;
    const stats = JSON.parse(sauvegarde);
    // Fusion pour ajouter les clés manquantes (si on ajoute un niveau plus tard)
    return {
      ...STATS_PAR_DEFAUT,
      ...stats,
      parNiveau: { ...STATS_PAR_DEFAUT.parNiveau, ...(stats.parNiveau || {}) },
    };
  } catch (e) {
    return STATS_PAR_DEFAUT;
  }
}

// 💾 Sauvegarde les stats
export function sauvegarderStats(stats) {
  try {
    localStorage.setItem(CLE_STATS, JSON.stringify(stats));
  } catch (e) {
    console.warn('Impossible de sauvegarder les stats');
  }
}

// ➕ Incrémente une bonne réponse
export function ajouterBonneReponse(stats, niveau) {
  return {
    ...stats,
    bonnesReponses: stats.bonnesReponses + 1,
    parNiveau: {
      ...stats.parNiveau,
      [niveau]: (stats.parNiveau[niveau] || 0) + 1,
    },
  };
}

// ➕ Incrémente une mauvaise réponse
export function ajouterMauvaiseReponse(stats) {
  return {
    ...stats,
    mauvaisesReponses: stats.mauvaisesReponses + 1,
  };
}

// ➕ Nouvelle partie
export function ajouterPartie(stats) {
  return {
    ...stats,
    partiesJouees: stats.partiesJouees + 1,
  };
}

// ⏱️ Ajoute du temps de jeu
export function ajouterTemps(stats, secondes) {
  return {
    ...stats,
    tempsTotal: stats.tempsTotal + secondes,
  };
}

// 🕐 Formate le temps en "X min" ou "Xh YY"
export function formaterTemps(secondes) {
  if (secondes < 60) return `${secondes} sec`;
  const minutes = Math.floor(secondes / 60);
  if (minutes < 60) return `${minutes} min`;
  const heures = Math.floor(minutes / 60);
  const minRestantes = minutes % 60;
  return `${heures}h ${minRestantes}min`;
}