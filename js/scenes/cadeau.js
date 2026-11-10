/* ---------- Animation 1 : le cadeau ---------- */
function sGift(){
  stage.innerHTML = `<div class="title abs" id="t" style="top:10%;opacity:0;transform:scale(.5);transition:.6s .3s">${titre}</div>
    <div class="gift" id="g"><div class="lid"></div><div class="box"></div></div>
    <p class="hint abs" style="bottom:6%">Clique sur le cadeau 🎁</p>`;
  const g = $("#g");
  g.onclick = () => {
    if (g.classList.contains("open")) return;
    g.classList.add("open");
    const t = $("#t"); t.style.opacity = 1; t.style.transform = "scale(1)";
    const r = g.getBoundingClientRect();
    confetti(r.left + r.width/2, r.top + 30, 130); shake(); flash(); setTimeout(() => confetti(r.left + r.width/2, r.top, 90), 300);
  };
}
