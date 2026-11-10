/* ---------- Animation 4 : feu d'artifice (fusées + gerbes en étoile, anneau ou explosion) ---------- */
function sFire(){
  stage.innerHTML = `<canvas id="cv" style="position:absolute;inset:0"></canvas>
    <div class="title" style="position:relative;pointer-events:none;color:#fff;text-shadow:0 0 20px #f0f">🎆 Touche l'écran 🎆</div>`;
  const cv = $("#cv"), c = cv.getContext("2d"); let P = [], R = [], raf;
  const fit = () => { cv.width = stage.clientWidth; cv.height = stage.clientHeight; c.fillStyle = "#0b0718"; c.fillRect(0, 0, cv.width, cv.height); };
  fit();
  const launch = (x, y) => R.push({x, y: cv.height, ty: y, h: Math.random()*360});
  function boom(x, y, h){
    const type = Math.floor(Math.random()*3);
    for (let i = 0; i < 90; i++){
      const a = type === 1 ? i/90*6.283 : Math.random()*6.283;
      const sp = type === 2 ? 1.2 + 3*Math.abs(Math.cos(2.5*a)) : type === 1 ? 3.6 : 1 + Math.random()*4;
      P.push({x, y, vx: Math.cos(a)*sp, vy: Math.sin(a)*sp, l: 60 + Math.random()*35, h: h + Math.random()*40});
    }
    shake();
  }
  function loop(){
    c.globalCompositeOperation = "source-over";
    c.fillStyle = "rgba(11,7,24,.2)"; c.fillRect(0, 0, cv.width, cv.height);
    c.globalCompositeOperation = "lighter"; c.lineCap = "butt";
    R = R.filter(r => {                                   // fusées qui montent
      r.y -= 11;
      c.strokeStyle = `hsl(${r.h},100%,80%)`; c.lineWidth = 3;
      c.beginPath(); c.moveTo(r.x, r.y + 22); c.lineTo(r.x, r.y); c.stroke();
      if (r.y <= r.ty){ boom(r.x, r.y, r.h); return false; }
      return true;
    });
    P = P.filter(p => p.l > 0);
    P.forEach(p => {                                      // étincelles = traits pointus
      p.x += p.vx; p.y += p.vy; p.vy += .045; p.vx *= .988; p.vy *= .988; p.l--;
      c.strokeStyle = `hsla(${p.h},100%,65%,${Math.min(1, p.l/40)})`; c.lineWidth = 2;
      c.beginPath(); c.moveTo(p.x - p.vx*3, p.y - p.vy*3); c.lineTo(p.x, p.y); c.stroke();
    });
    raf = requestAnimationFrame(loop);
  }
  const t = setInterval(() => launch(rndX(), Math.random()*cv.height*.5 + 40), 650);
  const rndX = () => 40 + Math.random()*(cv.width - 80);
  cv.onclick = e => { const r = cv.getBoundingClientRect(); launch(e.clientX - r.left, e.clientY - r.top); };
  loop(); addEventListener("resize", fit);
  return () => { cancelAnimationFrame(raf); clearInterval(t); removeEventListener("resize", fit); };
}
