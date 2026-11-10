/* Navigation entre les scènes */
const scenes = [sIntro, sGift, sCake, sWish, sBalloons, sFire, sPol, sFinal];
scenes.forEach(() => dots.append(document.createElement("span")));
const nav = $("nav");
let cur = 0, stop = null;
function go(i){
  if (stop) stop();
  cur = i;
  stage.innerHTML = "";
  nav.style.visibility = cur === 0 ? "hidden" : "visible";   // intro : impossible à passer
  stop = scenes[cur]() || null;
  [...dots.children].forEach((d, k) => d.classList.toggle("on", k === cur));
}
function move(d){
  if (cur === 0) return;                  // pendant l'intro, rien ne bouge
  let n = cur + d;
  if (n >= scenes.length) n = 1;          // on ne revient jamais à l'intro
  if (n < 1) n = scenes.length - 1;
  go(n);
}
$("#prev").onclick = () => move(-1);
$("#next").onclick = () => move(1);
addEventListener("keydown", e => { if (e.key === "ArrowRight") move(1); if (e.key === "ArrowLeft") move(-1); });

/* Bouton « 📷 Mes photos » (facultatif, voir AFFICHER_BOUTON_PHOTOS dans config.js) */
if (!AFFICHER_BOUTON_PHOTOS) $(".add").remove();
else $("#file").onchange = e => {
  const f = [...e.target.files];
  if (!f.length) return;
  photos = f.map(x => URL.createObjectURL(x));
  go(cur);
};

go(0);
