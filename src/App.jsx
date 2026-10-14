import { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  dire, pop, rate, fanfare, direLettre,
  demarrerMusique, arreterMusique
} from './sons';
import { NIVEAUX } from './niveaux';
import { BADGES } from './badges';
import renard from './assets/renard.png';
import './App.css';

const OBJECTIF = 10; // 10 bonnes réponses = victoire

function melanger(tableau) {
  return [...tableau].sort(() => Math.random() - 0.5);
}

function nouvelleManche(niveauActuel) {
  const items = NIVEAUX[niveauActuel].items;
  const bonne = melanger(items)[0];
  const autres = melanger(items.filter(i => i !== bonne)).slice(0, 2);
  const choix = melanger([bonne, ...autres]);
  return { cible: bonne, choix };
}

function lancerConfettis(intensite = 150) {
  confetti({
    particleCount: intensite,
    spread: 90,
    origin: { y: 0.6 },
    colors: ['#FF6B35', '#FFD93D', '#4CAF50', '#2196F3', '#E91E63'],
  });
}

function Decor() {
  return (
    <div className="decor">
      <div className="soleil" />
      <div className="nuage nuage-1" />
      <div className="nuage nuage-2" />
      <div className="nuage nuage-3" />
    </div>
  );
}

function App() {
  const [ecran, setEcran] = useState('accueil');
  const [niveauActuel, setNiveauActuel] = useState('lettres');
  const [manche, setManche] = useState(() => nouvelleManche('lettres'));
  const [feedback, setFeedback] = useState('');
  const [score, setScore] = useState(0);
  const [serie, setSerie] = useState(0);
  const [itemClique, setItemClique] = useState(null);
  const [badgesDebloques, setBadgesDebloques] = useState([]);
  const [badgeAffiche, setBadgeAffiche] = useState(null);

  // 🎵 Musique
  useEffect(() => {
    if (ecran === 'jeu') {
      demarrerMusique();
    } else {
      arreterMusique();
    }
    return () => arreterMusique();
  }, [ecran]);

  // 🏅 Débloque un badge
  const debloquerBadge = (badgeId) => {
    if (badgesDebloques.includes(badgeId)) return;
    setBadgesDebloques([...badgesDebloques, badgeId]);
    setBadgeAffiche(badgeId);
    dire('Nouveau badge !');
    setTimeout(() => setBadgeAffiche(null), 2500);
  };

  const choisirNiveau = (niveau) => {
    pop();
    setNiveauActuel(niveau);
    setManche(nouvelleManche(niveau));
    setScore(0);
    setSerie(0);
    setFeedback('');
    setItemClique(null);
    setEcran('jeu');
  };

  const cliquerItem = (item) => {
    if (feedback !== '') return;
    setItemClique(item);

    if (item === manche.cible) {
      const nouveauScore = score + 1;
      const nouvelleSerie = serie + 1;

      setFeedback('bravo');
      setScore(nouveauScore);
      setSerie(nouvelleSerie);
      lancerConfettis();
      fanfare();
      dire(item);
      setTimeout(() => dire('Bravo !'), 700);

      // 🌱 Badge première lettre
      if (nouveauScore === 1) {
        debloquerBadge('premiere_lettre');
      }

      // 🔥 Badge série de 5
      if (nouvelleSerie === 5) {
        debloquerBadge('serie_5');
      }

      // 🏅 Badges experts (10 bonnes réponses dans un niveau)
      if (nouveauScore === OBJECTIF) {
        if (niveauActuel === 'lettres') debloquerBadge('expert_lettres');
        if (niveauActuel === 'minuscules') debloquerBadge('expert_minuscules');
        if (niveauActuel === 'syllabes') debloquerBadge('roi_syllabes');
        if (niveauActuel === 'mots') debloquerBadge('champion_mots');
      }

      // 🎉 Écran de victoire à 10 bonnes réponses
      if (nouveauScore >= OBJECTIF) {
        setTimeout(() => {
          lancerConfettis(400);
          setEcran('victoire');
        }, 1500);
        return;
      }

      setTimeout(() => {
        setManche(nouvelleManche(niveauActuel));
        setFeedback('');
        setItemClique(null);
      }, 1800);
    } else {
      pop();
      setFeedback('essaie');
      setSerie(0); // reset la série
      rate();
      dire('Essaie encore');

      setTimeout(() => {
        setFeedback('');
        setItemClique(null);
      }, 1200);
    }
  };

  const rejouerMemeNiveau = () => {
    setScore(0);
    setSerie(0);
    setManche(nouvelleManche(niveauActuel));
    setEcran('jeu');
  };

  const retourAccueil = () => {
    window.speechSynthesis?.cancel();
    arreterMusique();
    setEcran('accueil');
    setFeedback('');
    setScore(0);
    setSerie(0);
    setItemClique(null);
  };

  const retourNiveaux = () => {
    window.speechSynthesis?.cancel();
    arreterMusique();
    setEcran('niveaux');
    setFeedback('');
    setScore(0);
    setSerie(0);
    setItemClique(null);
  };

  // =============== ÉCRAN ACCUEIL ===============
  if (ecran === 'accueil') {
    return (
      <>
        <Decor />
        <div className="app">
          <h1 className="titre">KidApp</h1>
          <img src={renard} alt="Rex le renard" className="mascotte" />
          <p className="message">
            Salut ! Je suis Rex. Prêt à apprendre à lire en t'amusant ?
          </p>
          <button className="bouton-jouer" onClick={() => setEcran('niveaux')}>
            📖 JOUER
          </button>
          {badgesDebloques.length > 0 && (
            <p className="compteur-badges">
              🏅 {badgesDebloques.length} badge{badgesDebloques.length > 1 ? 's' : ''} gagné{badgesDebloques.length > 1 ? 's' : ''} !
            </p>
          )}
        </div>
      </>
    );
  }

  // =============== ÉCRAN CHOIX DE NIVEAU ===============
  if (ecran === 'niveaux') {
    return (
      <>
        <Decor />
        <div className="app">
          <h1 className="titre-niveaux">🦊 Choisis ton niveau !</h1>

          <div className="liste-niveaux">
            {Object.entries(NIVEAUX).map(([cle, niveau]) => (
              <button
                key={cle}
                className="carte-niveau"
                style={{ background: `linear-gradient(180deg, ${niveau.couleur} 0%, ${niveau.couleur}DD 100%)` }}
                onClick={() => choisirNiveau(cle)}
              >
                <span className="niveau-emoji">{niveau.emoji}</span>
                <span className="niveau-nom">{niveau.nom}</span>
                <span className="niveau-desc">{niveau.description}</span>
              </button>
            ))}
          </div>

          <button
            className="bouton-jouer"
            style={{ marginTop: '30px', fontSize: '22px', padding: '12px 35px' }}
            onClick={retourAccueil}
          >
            ⬅️ RETOUR
          </button>
        </div>
      </>
    );
  }

  // =============== ÉCRAN JEU ===============
  if (ecran === 'jeu') {
    const niveau = NIVEAUX[niveauActuel];

    return (
      <>
        <Decor />
        <div className="app">
          <div className="barre-haut">
            <button className="bouton-menu" onClick={retourNiveaux}>☰ Menu</button>
            <div className="score">⭐ {score} / {OBJECTIF}</div>
          </div>

          {/* 🔥 Indicateur de série */}
          {serie >= 2 && (
            <div className="serie">🔥 Série : {serie}</div>
          )}

          <img src={renard} alt="Rex le renard" className="mascotte-jeu" />
          <p className="consigne">{niveau.consigne(manche.cible)}</p>

          <div className="zone-lettres">
            {manche.choix.map((item) => {
              let classe = 'carte-lettre';
              if (item.length >= 3) classe += ' carte-mot';
              else if (item.length === 2) classe += ' carte-syllabe';

              if (feedback === 'bravo' && item === manche.cible) classe += ' correcte';
              if (feedback === 'essaie' && item === itemClique) classe += ' incorrecte';

              return (
                <div key={item} className={classe} onClick={() => cliquerItem(item)}>
                  {item}
                </div>
              );
            })}
          </div>

          <p className="feedback">
            {feedback === 'bravo' && <span className="bravo">🎉 Bravo !</span>}
            {feedback === 'essaie' && <span className="essaie">😅 Essaie encore !</span>}
          </p>

          {/* 🏅 Toast de badge */}
          {badgeAffiche && (
            <div className="toast-badge">
              <span className="toast-emoji">{BADGES[badgeAffiche].emoji}</span>
              <div>
                <div className="toast-titre">Nouveau badge !</div>
                <div className="toast-nom">{BADGES[badgeAffiche].nom}</div>
              </div>
            </div>
          )}
        </div>
      </>
    );
  }

  // =============== ÉCRAN VICTOIRE ===============
  if (ecran === 'victoire') {
    return (
      <>
        <Decor />
        <div className="app">
          <h1 className="titre-victoire">🎉 BRAVO ! 🎉</h1>
          <img src={renard} alt="Rex" className="mascotte-victoire" />
          <p className="message-victoire">
            Tu as trouvé {OBJECTIF} {NIVEAUX[niveauActuel].nom.toLowerCase()} d'affilée !
          </p>

          <div className="badges-gagnes">
            {badgesDebloques.slice(-3).map((id) => (
              <div key={id} className="badge-carte">
                <span className="badge-emoji">{BADGES[id].emoji}</span>
                <span className="badge-nom">{BADGES[id].nom}</span>
              </div>
            ))}
          </div>

          <button className="bouton-jouer" onClick={rejouerMemeNiveau} style={{ marginTop: '20px' }}>
            🔄 REJOUER
          </button>
          <button
            className="bouton-jouer"
            style={{
              marginTop: '15px',
              fontSize: '22px',
              padding: '12px 35px',
              background: 'linear-gradient(180deg, #2196F3 0%, #1565C0 100%)',
              boxShadow: '0 8px 0 #0D47A1, 0 12px 20px rgba(0,0,0,0.2)'
            }}
            onClick={retourNiveaux}
          >
            📚 AUTRE NIVEAU
          </button>
        </div>
      </>
    );
  }
}

export default App;