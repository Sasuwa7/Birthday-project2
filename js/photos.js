/* Charge les photos du dossier photos/.
   Si un fichier est introuvable, une image de remplacement s'affiche à la place. */
const BONS = PHOTOS.map(p => p.bon);

const PLACEHOLDERS = [["🎮","#e63946"],["🕹️","#118ab2"],["🎲","#06d6a0"],["🏆","#ffb703"],["📸","#8338ec"],["🍕","#ef476f"],["❤️","#d00070"],["🎁","#2a9d8f"]];
const placeholder = i => {
  const [e, c] = PLACEHOLDERS[i % PLACEHOLDERS.length];
  return "data:image/svg+xml," + encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><rect width='300' height='300' fill='${c}'/><text x='150' y='190' font-size='120' text-anchor='middle'>${e}</text></svg>`);
};

let photos = PHOTOS.map(p => p.src);
(list => list.forEach((src, i) => {
  const im = new Image();
  im.onerror = () => { list[i] = placeholder(i); };
  im.src = src;
}))(photos);
