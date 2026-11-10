/* Outils communs : sélecteur, couleurs, confettis, flash, étoiles filantes */
const $ = s => document.querySelector(s);
addEventListener("contextmenu", e => e.preventDefault());
addEventListener("dragstart", e => e.preventDefault());
const stage = $("#stage"), dots = $("#dots");

const colors = ["#e63946","#ffd166","#06d6a0","#118ab2","#ef476f","#8338ec"];

const SHAPES = ["polygon(50% 0,100% 100%,0 100%)","polygon(50% 0,100% 50%,50% 100%,0 50%)","none","polygon(0 0,100% 0,60% 100%,40% 100%)",
  "polygon(50% 0,62% 38%,100% 38%,70% 60%,82% 100%,50% 75%,18% 100%,30% 60%,0 38%,38% 38%)"];
function shake(){}   // secousse désactivée
function flash(){
  const f = document.createElement("div");
  f.style.cssText = "position:fixed;inset:0;background:#fff;opacity:.85;pointer-events:none;z-index:98;transition:opacity .5s";
  document.body.append(f); requestAnimationFrame(() => f.style.opacity = 0); setTimeout(() => f.remove(), 600);
}
function shooting(box){
  return setInterval(() => {
    const e = document.createElement("i"); e.className = "shoot";
    e.style.cssText = `left:${Math.random()*70}%;top:${Math.random()*40}%`;
    box.append(e); setTimeout(() => e.remove(), 1100);
  }, 1300);
}
function confetti(x, y, n = 80){
  for (let i = 0; i < n; i++){
    const c = document.createElement("div"), z = 8 + Math.random()*10;
    c.className = "confetti";
    c.style.cssText = `left:${x}px;top:${y}px;width:${z}px;height:${z*(.6 + Math.random()*.9)}px;background:${colors[i % colors.length]};clip-path:${SHAPES[i % SHAPES.length]};animation-duration:${1.2 + Math.random()*1.3}s`;
    c.style.setProperty("--x", (Math.random()*640 - 320) + "px");
    c.style.setProperty("--up", -(120 + Math.random()*320) + "px");
    c.style.setProperty("--y", (80 + Math.random()*320) + "px");
    c.style.setProperty("--r", (Math.random()*900 - 450) + "deg");
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 2600);
  }
}
