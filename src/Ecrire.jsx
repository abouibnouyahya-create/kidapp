import { useRef, useState, useEffect } from 'react';
import { dire, pop, fanfare } from './sons';
import confetti from 'canvas-confetti';
import renard from './assets/renard.png';

const LETTRES_A_ECRIRE = ['A', 'B', 'C', 'D', 'E', 'L', 'M', 'P', 'T'];
const SEUIL_COUVERTURE = 0.4; // 40% : tracer tout le contour de la lettre
// ⚠️ Police qui marche SANS Internet (essentiel pour le canvas)
const POLICE_CANVAS = 'bold 340px Arial, sans-serif';

function Ecrire({ onRetour }) {
  const canvasRef = useRef(null);
  const fondRef = useRef(null);
  const [lettreIndex, setLettreIndex] = useState(0);
  const [enDessin, setEnDessin] = useState(false);
  const [progression, setProgression] = useState(0);
  const [valide, setValide] = useState(false);

  const lettreActuelle = LETTRES_A_ECRIRE[lettreIndex];

  // 🎨 Initialise les canvas
  useEffect(() => {
    const fond = fondRef.current;
    const canvas = canvasRef.current;
    if (!fond || !canvas) return;

    const ctxFond = fond.getContext('2d');
    const ctx = canvas.getContext('2d');

    // === Canvas de FOND : lettre de référence (blanc sur noir) ===
    ctxFond.fillStyle = 'black';
    ctxFond.fillRect(0, 0, fond.width, fond.height);
    ctxFond.font = POLICE_CANVAS;
    ctxFond.textAlign = 'center';
    ctxFond.textBaseline = 'middle';
    ctxFond.fillStyle = 'white';
    ctxFond.fillText(lettreActuelle, fond.width / 2, fond.height / 2 + 20);

    // === Canvas VISIBLE ===
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = POLICE_CANVAS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#E0E0E0';
    ctx.fillText(lettreActuelle, canvas.width / 2, canvas.height / 2 + 20);

    ctx.strokeStyle = '#FF6B35';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setProgression(0);
    setValide(false);
  }, [lettreActuelle]);

  const getPosition = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height),
    };
  };

  const commencerDessin = (e) => {
    if (valide) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
    setEnDessin(true);
  };

  const dessiner = (e) => {
    if (!enDessin || valide) return;
    e.preventDefault();
    const ctx = canvasRef.current.getContext('2d');
    const { x, y } = getPosition(e);
    ctx.lineTo(x, y);
    ctx.stroke();

    analyserCouverture();
  };

  // 🔍 Analyse : % de la lettre recouvert par le tracé
  const analyserCouverture = () => {
    const canvas = canvasRef.current;
    const fond = fondRef.current;
    if (!canvas || !fond) return;

    const ctx = canvas.getContext('2d');
    const ctxFond = fond.getContext('2d');

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const dataFond = ctxFond.getImageData(0, 0, fond.width, fond.height);
    const pixels = imageData.data;
    const pixelsFond = dataFond.data;
    const largeur = canvas.width;

    let pixelsLettreTotal = 0;
    let pixelsLettreCouverts = 0;

    // 🔍 On parcourt uniquement les pixels de la lettre
    for (let y = 0; y < canvas.height; y++) {
      for (let x = 0; x < largeur; x++) {
        const i = (y * largeur + x) * 4;

        // Ce pixel fait-il partie de la lettre ? (blanc dans le canvas de fond)
        const estLettre = pixelsFond[i] > 200;
        if (!estLettre) continue;

        pixelsLettreTotal++;

        // Le pixel correspondant dans le canvas visible est-il orange ?
        const r = pixels[i];
        const g = pixels[i + 1];
        const b = pixels[i + 2];
        const estOrange = r > 200 && g > 50 && g < 180 && b < 120;

        if (estOrange) {
          pixelsLettreCouverts++;
        }
      }
    }

    const taux = pixelsLettreTotal > 0 ? pixelsLettreCouverts / pixelsLettreTotal : 0;
    console.log('📊 Lettre :', pixelsLettreTotal, '| Couverts :', pixelsLettreCouverts, '| Taux :', (taux * 100).toFixed(1) + '%');

    setProgression(taux);

    // 🎉 Validation automatique
    if (taux >= SEUIL_COUVERTURE && !valide) {
      setValide(true);
      setEnDessin(false);

      fanfare();
      dire('Bravo !');

      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 },
        colors: ['#FF6B35', '#FFD93D', '#4CAF50', '#2196F3', '#E91E63'],
      });

      setTimeout(() => {
        if (lettreIndex < LETTRES_A_ECRIRE.length - 1) {
          setLettreIndex(lettreIndex + 1);
        } else {
          dire('Tu as tout écrit !');
          setLettreIndex(0);
        }
      }, 1500);
    }
  };

  const arreterDessin = () => {
    setEnDessin(false);
  };

  const effacer = () => {
    pop();
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = POLICE_CANVAS;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = '#E0E0E0';
    ctx.fillText(lettreActuelle, canvas.width / 2, canvas.height / 2 + 20);

    ctx.strokeStyle = '#FF6B35';
    ctx.lineWidth = 18;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setProgression(0);
    setValide(false);
  };

  return (
    <div className="app ecrire">
      <div className="score ecrire">✏️ Écris la lettre {lettreActuelle}</div>

      <img src={renard} alt="Rex" className="mascotte-ecrire" />

      <canvas
        ref={fondRef}
        width={500}
        height={500}
        style={{ display: 'none' }}
      />

      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        className="canvas-ecriture"
        onMouseDown={commencerDessin}
        onMouseMove={dessiner}
        onMouseUp={arreterDessin}
        onMouseLeave={arreterDessin}
        onTouchStart={commencerDessin}
        onTouchMove={dessiner}
        onTouchEnd={arreterDessin}
      />

      <div className="barre-progression">
        <div
          className="barre-remplie"
          style={{ width: `${progression * 100}%` }}
        />
      </div>

      <div className="boutons-ecriture">
        <button className="bouton-action effacer" onClick={effacer}>
          🧽 Effacer
        </button>
        <button
          className="bouton-jouer bouton-retour-ecrire"
          onClick={onRetour}
        >
          RETOUR
        </button>
      </div>
    </div>
  );
}

export default Ecrire;