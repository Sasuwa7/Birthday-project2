/* ---------- Animation 0 : intro automatique avec message de bienvenue ---------- */
function sIntro(){
  const stars = Array.from({length: 60}, () =>
    `<i class="star" style="left:${Math.random()*100}%;top:${Math.random()*100}%;--s:${.8 + Math.random()*2}s"></i>`).join("");
  stage.innerHTML = `<div class="intro">${stars}
    <div class="line" style="--dl:.4s">Bienvenue ${NOM} 👋</div>
    <div class="line" style="--dl:3s">Quelqu'un t'a préparé une surprise…</div>
    <div class="line last" style="--dl:5.6s">🎁</div></div>`;
  const t = setTimeout(() => go(1), 8500);   // passe tout seul au cadeau
  const sh = shooting($(".intro"));
  return () => { clearTimeout(t); clearInterval(sh); };
}
