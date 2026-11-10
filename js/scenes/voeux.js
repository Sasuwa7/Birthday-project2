/* ---------- Animation 3b : le vœu s'envole (fumée + lanternes) ---------- */
function sWish(){
  const stars = Array.from({length: 60}, () =>
    `<i class="star" style="left:${Math.random()*100}%;top:${Math.random()*100}%;--s:${.8 + Math.random()*2}s"></i>`).join("");
  stage.innerHTML = `<div class="intro">${stars}
    <div class="title" style="position:relative;z-index:2;color:#fff;text-shadow:0 0 18px #ffd166;opacity:0;animation:lineStay 1.2s 2s both">Ton vœu s'envole… ✨</div></div>`;
  const box = stage.firstChild, sh = shooting(box);
  for (let i = 0; i < 7; i++){                       // fumée des bougies
    const s = document.createElement("div");
    s.className = "smoke";
    s.style.cssText = `--sx:${Math.random()*80 - 40}px;animation-delay:${i*.25}s`;
    box.append(s);
  }
  let n = 0, t;
  function lantern(){
    const l = document.createElement("div");
    l.className = "lantern";
    l.style.cssText = `left:${5 + Math.random()*78}%;--d:${9 + Math.random()*4}s`;
    l.textContent = VOEUX[n++ % VOEUX.length];
    l.onclick = e => confetti(e.clientX, e.clientY, 25);
    box.append(l);
    setTimeout(() => l.remove(), 14000);
  }
  const first = setTimeout(() => { lantern(); t = setInterval(lantern, 1400); }, 1500);
  return () => { clearTimeout(first); clearInterval(t); clearInterval(sh); };
}
