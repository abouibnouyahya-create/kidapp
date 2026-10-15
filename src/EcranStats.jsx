import { BADGES } from './badges';
import { NIVEAUX } from './niveaux';
import { formaterTemps } from './stats';
import renard from './assets/renard.png';

function EcranStats({ stats, badgesDebloques, onRetour }) {
  const totalReponses = stats.bonnesReponses + stats.mauvaisesReponses;
  const tauxReussite = totalReponses > 0
    ? Math.round((stats.bonnesReponses / totalReponses) * 100)
    : 0;

  return (
    <div className="app">
      <h1 className="titre-stats">📊 Mes stats</h1>

      {/* 🎯 Résumé global */}
      <div className="grille-stats">
        <div className="stat-carte">
          <span className="stat-emoji">🎮</span>
          <span className="stat-valeur">{stats.partiesJouees}</span>
          <span className="stat-label">Parties jouées</span>
        </div>

        <div className="stat-carte">
          <span className="stat-emoji">✅</span>
          <span className="stat-valeur">{stats.bonnesReponses}</span>
          <span className="stat-label">Bonnes réponses</span>
        </div>

        <div className="stat-carte">
          <span className="stat-emoji">🎯</span>
          <span className="stat-valeur">{tauxReussite}%</span>
          <span className="stat-label">Taux de réussite</span>
        </div>

        <div className="stat-carte">
          <span className="stat-emoji">⏱️</span>
          <span className="stat-valeur">{formaterTemps(stats.tempsTotal)}</span>
          <span className="stat-label">Temps de jeu</span>
        </div>
      </div>

      {/* 📈 Progression par niveau */}
      <div className="section-stats">
        <h2 className="stats-sous-titre">📈 Progression par niveau</h2>
        <div className="liste-progression">
          {Object.entries(NIVEAUX).map(([cle, niveau]) => {
            const nb = stats.parNiveau[cle] || 0;
            const max = Math.max(...Object.values(stats.parNiveau), 1);
            const pourcentage = (nb / max) * 100;
            return (
              <div key={cle} className="ligne-progression">
                <span className="prog-emoji">{niveau.emoji}</span>
                <span className="prog-nom">{niveau.nom}</span>
                <div className="barre-prog">
                  <div
                    className="barre-prog-remplie"
                    style={{
                      width: `${pourcentage}%`,
                      background: niveau.couleur,
                    }}
                  />
                </div>
                <span className="prog-valeur">{nb}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🏅 Badges gagnés */}
      <div className="section-stats">
        <h2 className="stats-sous-titre">
          🏅 Badges gagnés ({badgesDebloques.length} / {Object.keys(BADGES).length})
        </h2>
        {badgesDebloques.length === 0 ? (
          <p className="stats-vide">Aucun badge pour l'instant. Joue pour en gagner !</p>
        ) : (
          <div className="grille-badges">
            {badgesDebloques.map((id) => {
              const badge = BADGES[id];
              if (!badge) return null;
              return (
                <div key={id} className="badge-stats">
                  <span className="badge-stats-emoji">{badge.emoji}</span>
                  <span className="badge-stats-nom">{badge.nom}</span>
                  <span className="badge-stats-desc">{badge.description}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <button className="bouton-jouer" style={{ marginTop: '30px' }} onClick={onRetour}>
        ⬅️ RETOUR
      </button>
    </div>
  );
}

export default EcranStats;