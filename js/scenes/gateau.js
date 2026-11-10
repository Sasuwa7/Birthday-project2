/* ---------- Animation 3 : le gâteau (il monte étage par étage, flammes vivantes, bougies à souffler) ---------- */
function sCake(){
  const FL = `<svg class="fl" viewBox="0 0 22 46"><path d="M11 0C13 9 21 17 21 29C21 39 16.5 45 11 45C5.5 45 1 39 1 29C1 17 9 9 11 0Z" fill="url(#fo)"/><path d="M11 18C13 24 16 28 16 34C16 39 13.5 42 11 42C8.5 42 6 39 6 34C6 28 9 24 11 18Z" fill="url(#fi)"/></svg>`;
  stage.innerHTML = `<svg width="0" height="0" style="position:absolute"><defs>
      <linearGradient id="fo" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffd166"/><stop offset=".55" stop-color="#ff9d1c"/><stop offset="1" stop-color="#e85d04" stop-opacity=".1"/></linearGradient>
      <linearGradient id="fi" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#7cc4ff"/><stop offset=".5" stop-color="#fff"/><stop offset="1" stop-color="#fff3b0"/></linearGradient></defs></svg>
    <div id="ct" class="bgtxt">Fais un vœu ✨</div>
    <div class="kk" id="ck">
      <div class="tier t1" style="--dl:.2s"></div><div class="tier t2" style="--dl:.75s"></div><div class="tier t3" style="--dl:1.3s"></div><div class="plate"></div>
      ${[78,103,128,153,178].map((x, i) => `<div class="candle" style="left:${x}px;--dl:${2 + i*.15}s"><div class="wick"></div><div class="gl"></div>${FL}</div>`).join("")}
      ${Array.from({length: 10}, () => `<i class="sp" style="left:${-10 + Math.random()*120}%;top:${-20 + Math.random()*100}%;--s:${.6 + Math.random()*1.4}s"></i>`).join("")}
    </div>
    <p id="ch" class="hint abs" style="bottom:15%">Touche les bougies une à une… ou</p>
    <button id="bl" style="position:absolute;bottom:6%">Souffler 💨</button>`;
  const T0 = performance.now(), clock = () => (performance.now() - T0)/1000;
  const cd = [...stage.querySelectorAll(".candle")].map((el, i) => ({el, fl: el.querySelector(".fl"), gl: el.querySelector(".gl"),
    ph: Math.random()*6.28, start: 2.4 + i*.25, blow: 0, dead: false}));
  let left = cd.length, t, raf;
  function blow(o){ if (!o.blow) o.blow = clock(); }
  function snuff(o){                                      // la flamme s'éteint : mèche rougeoyante + volutes de fumée
    o.dead = true; o.fl.style.opacity = 0; o.gl.style.opacity = 0; o.el.classList.add("off");
    for (let k = 0; k < 4; k++){
      const f = document.createElement("i"); f.className = "sg";
      f.style.cssText = `--a:${Math.random()*24 - 12}px;--b:${Math.random()*50 - 25}px;animation-delay:${k*.25}s`;
      o.el.append(f); setTimeout(() => f.remove(), 3000);
    }
    if (--left === 0) finish();
  }
  function loop(){                                        // vacillement fluide = somme de sinus, plus allumage progressif
    const tt = clock();
    for (const o of cd){
      if (o.dead) continue;
      const ign = Math.min(1, Math.max(0, (tt - o.start)/.7));
      const w = Math.sin(tt*6.1 + o.ph)*.5 + Math.sin(tt*11.3 + o.ph*1.7)*.3 + Math.sin(tt*3.1 + o.ph*.6)*.4;
      const h = Math.sin(tt*9 + o.ph*2)*.5 + Math.sin(tt*17 + o.ph)*.25;
      const b = o.blow ? Math.min(1, (tt - o.blow)/.55) : 0;   // souffle : la flamme se couche et rétrécit
      o.fl.style.transform = `translateX(${w*1.3 + b*4}px) skewX(${w*5 + b*40}deg) scale(${(1 - b*.55)*ign}, ${ign*(1 + h*.1)*(1 - b*.4)})`;
      o.gl.style.opacity = Math.max(0, ign*(.75 + h*.25 + w*.08)*(1 - b));
      if (b >= 1) snuff(o);
    }
    if (left > 0) raf = requestAnimationFrame(loop);
  }
  loop();
  function finish(){
    $("#ck").classList.add("done");
    const ct = $("#ct"); ct.textContent = "🎉 " + titre; ct.classList.add("on");
    $("#bl").remove(); $("#ch").remove();
    const r = $("#ck").getBoundingClientRect();
    confetti(r.left + r.width/2, r.top + 40, 130); flash();
    setTimeout(() => confetti(r.left + r.width/2, r.top, 90), 300);
    t = setTimeout(() => go(cur + 1), 3400);               // la suite logique : le vœu s'envole
  }
  cd.forEach(o => o.el.onclick = () => blow(o));
  $("#bl").onclick = () => { $("#bl").disabled = true; cd.forEach((o, i) => setTimeout(() => blow(o), 250 + i*170)); };
  return () => { clearTimeout(t); cancelAnimationFrame(raf); };
}
