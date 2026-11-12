// 1. Maak het canvas-element aan via pure JavaScript
const canvas = document.createElement("canvas");
canvas.width = 680;
canvas.height = 560;
canvas.style.backgroundColor = "#f5e6c8";
canvas.style.border = "4px solid #8b5a2b";
document.body.appendChild(canvas);

const ctx = canvas.getContext("2d");
const VAK_GROOTTE = 40;

// 2. Het raster van het speelbord (17 kolommen breed, 14 rijen hoog)
// 0 = leeg | 1 = loopvak | 2 = barricade | 3 = finish | 4 = startvak
const bordData = [, // Rij 0: Finish, // Rij 1, // Rij 2, // Rij 3, // Rij 4, // Rij 5, // Rij 6, // Rij 7, // Rij 8, // Rij 9, // Rij 10, // Rij 11, // Rij 12: Starthuizen, // Rij 13: Starthuizen
];

// 3. Teken de verbindingslijnen tussen de vakjes
function tekenLijnen() {
  ctx.strokeStyle = "#8b5a2b";
  ctx.lineWidth = 3;

  for (let rij = 0; rij < bordData.length; rij++) {
    for (let kol = 0; kol < bordData[rij].length; kol++) {
      if (bordData[rij][kol] === 0) continue;

      const x = kol * VAK_GROOTTE + VAK_GROOTTE / 2;
      const y = rij * VAK_GROOTTE + VAK_GROOTTE / 2;

      // Horizontale lijn naar rechts
      if (kol + 1 < bordData[rij].length && bordData[rij][kol + 1] !== 0 && rij < 12) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x + VAK_GROOTTE, y);
        ctx.stroke();
      }

      // Verticale lijn naar beneden
      if (rij + 1 < 12 && bordData[rij + 1][kol] !== 0) {
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(x, y + VAK_GROOTTE);
        ctx.stroke();
      }
    }
  }
}

// 4. Teken de cirkels (vakjes, barricades en finish)
function tekenVakjes() {
  for (let rij = 0; rij < bordData.length; rij++) {
    for (let kol = 0; kol < bordData[rij].length; kol++) {
      const vakType = bordData[rij][kol];
      if (vakType === 0) continue;

      const x = kol * VAK_GROOTTE + VAK_GROOTTE / 2;
      const y = rij * VAK_GROOTTE + VAK_GROOTTE / 2;

      ctx.beginPath();
      ctx.arc(x, y, 12, 0, Math.PI * 2);

      if (vakType === 1) ctx.fillStyle = "#ffffff"; // Normaal vakje
      if (vakType === 2) ctx.fillStyle = "#333333"; // Barricade
      if (vakType === 3) ctx.fillStyle = "#e74c3c"; // Finish
      if (vakType === 4) ctx.fillStyle = "#d4ac0d"; // Startvak

      ctx.fill();
      ctx.strokeStyle = "#2c3e50";
      ctx.lineWidth = 2;
      ctx.stroke();
    }
  }
}

// 5. Voer de tekenfuncties uit
tekenLijnen();
tekenVakjes();
