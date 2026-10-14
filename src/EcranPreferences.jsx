import { THEMES, PERSONNAGES } from './preferences';
import { pop } from './sons';
import renard from './assets/renard.png';

function Preferences({ prefs, setPrefs, onRetour }) {
  const changer = (cle, valeur) => {
    pop();
    setPrefs({ ...prefs, [cle]: valeur });
  };

  const basculer = (cle) => {
    pop();
    setPrefs({ ...prefs, [cle]: !prefs[cle] });
  };

  return (
    <div className="app">
      <h1 className="titre-preferences">⚙️ Mes préférences</h1>

      {/* 🎨 Choix de la couleur */}
      <div className="section-pref">
        <h2 className="section-titre">Ma couleur préférée</h2>
        <div className="grille-couleurs">
          {Object.entries(THEMES).map(([cle, theme]) => (
            <button
              key={cle}
              className={`bouton-couleur ${prefs.couleur === cle ? 'actif' : ''}`}
              style={{ background: theme.couleurPrincipale }}
              onClick={() => changer('couleur', cle)}
              title={theme.nom}
            >
              <span className="emoji-couleur">{theme.emoji}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🦊 Choix du personnage */}
      <div className="section-pref">
        <h2 className="section-titre">Mon personnage</h2>
        <div className="grille-personnages">
          {Object.entries(PERSONNAGES).map(([cle, perso]) => (
            <button
              key={cle}
              className={`bouton-personnage ${prefs.personnage === cle ? 'actif' : ''}`}
              onClick={() => changer('personnage', cle)}
            >
              {perso.fichier === 'renard.png' ? (
                <img src={renard} alt={perso.nom} className="mini-perso" />
              ) : (
                <span className="emoji-perso">{perso.emoji}</span>
              )}
              <span className="nom-perso">{perso.nom}</span>
            </button>
          ))}
        </div>
      </div>

      {/* 🔊 Réglages audio */}
      <div className="section-pref">
        <h2 className="section-titre">Sons</h2>
        <div className="rangee-bascules">
          <button
            className={`bouton-bascule ${prefs.musiqueActive ? 'on' : 'off'}`}
            onClick={() => basculer('musiqueActive')}
          >
            {prefs.musiqueActive ? '🎵 Musique ON' : '🔇 Musique OFF'}
          </button>
          <button
            className={`bouton-bascule ${prefs.voixActive ? 'on' : 'off'}`}
            onClick={() => basculer('voixActive')}
          >
            {prefs.voixActive ? '🗣️ Voix ON' : '🤐 Voix OFF'}
          </button>
        </div>
      </div>

      <button className="bouton-jouer" style={{ marginTop: '30px', fontSize: '24px', padding: '15px 50px' }} onClick={onRetour}>
        ✅ VALIDER
      </button>
    </div>
  );
}

export default Preferences;