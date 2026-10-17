import { useState } from 'react';
import { dire, direLettre, pop } from './sons';

// Liste des lettres/chiffres pour la découverte
const CONTENU_DECOUVERTE = {
  alphabet: {
    titre: '🔤 Découvre les lettres',
    items: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
    estLettre: true,
  },
  minuscules: {
    titre: '🔤 Découvre les minuscules',
    items: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
    estLettre: true,
  },
  chiffres: {
    titre: '🔢 Découvre les chiffres',
    items: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    estLettre: false,
  },
};

function EcranDecouverte({ type, onTerminer, onRetour, theme }) {
  const [itemActif, setItemActif] = useState(null);
  const contenu = CONTENU_DECOUVERTE[type] || CONTENU_DECOUVERTE.alphabet;

  const cliquerItem = (item) => {
    pop();
    setItemActif(item);
    
    // Prononciation
    if (contenu.estLettre) {
      direLettre(item); // Dit "Bé", "Cé", etc.
    } else {
      dire(item); // Dit "1", "2", etc.
    }

    // Retire l'effet visuel après 1 seconde
    setTimeout(() => setItemActif(null), 1000);
  };

  return (
    <div className="app">
      <h1 className="titre-decouverte" style={{ color: theme.couleurPrincipale }}>
        {contenu.titre}
      </h1>
      
      <p className="consigne-decouverte">
        Touche chaque élément pour l'écouter !
      </p>

      <div className="grille-decouverte">
        {contenu.items.map((item) => (
          <button
            key={item}
            className={`carte-decouverte ${itemActif === item ? 'active' : ''}`}
            onClick={() => cliquerItem(item)}
            style={{
              borderColor: itemActif === item ? theme.couleurPrincipale : '#FFD93D',
              color: itemActif === item ? theme.couleurPrincipale : '#FF6B35'
            }}
          >
            {item}
          </button>
        ))}
      </div>

      <div className="actions-decouverte">
        <button
          className="bouton-jouer bouton-secondaire"
          onClick={onRetour}
          style={{ fontSize: '24px', padding: '15px 30px' }}
        >
          ⬅️ RETOUR
        </button>
        <button
          className="bouton-jouer"
          onClick={onTerminer}
          style={{ background: theme.couleurPrincipale, fontSize: '28px', padding: '15px 40px' }}
        >
          ✅ JE SUIS PRÊT !
        </button>
      </div>
    </div>
  );
}

export default EcranDecouverte;