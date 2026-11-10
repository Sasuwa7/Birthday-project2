/* ---------- Animation 7 (dernière) : l'arbre mystique ---------- */
function sFinal(){
  stage.innerHTML = `<canvas id="tr" style="position:absolute;inset:0"></canvas>
    <div id="tt" class="title abs" style="top:5%;color:#fff;text-shadow:0 0 18px #9fe8ff;opacity:0;transition:opacity 2.5s">${titre}<br><small style="font-size:.4em;opacity:.8">${MESSAGE_FINAL}</small></div>`;
  const cv = $("#tr"), c = cv.getContext("2d");
  const W = stage.clientWidth, H = stage.clientHeight, dpr = Math.min(2, window.devicePixelRatio || 1);
  cv.width = W*dpr; cv.height = H*dpr; cv.style.width = W + "px"; cv.style.height = H + "px"; c.scale(dpr, dpr);
  const rnd = (a, b) => a + Math.random()*(b - a), maxD = 7, N = 9, baseY = H*.9, sp = Math.min(1, W/H*1.25);   // sp : resserre l'arbre sur un écran étroit
  const segs = [], tips = [], leaves = [];

  /* Chaque branche = un faisceau de brins fins qui s'entrelacent (6 sur le tronc, puis de moins en moins) */
  function branch(x, y, ang, len, d, t0){
    const dur = .3 + len*.005;
    const x2 = x + Math.cos(ang)*len, y2 = y + Math.sin(ang)*len;
    const bend = d === 0 ? 0 : d === 1 ? rnd(-.1, .1)*len : rnd(-.3, .3)*len, nx = -Math.sin(ang), ny = Math.cos(ang);
    const cx = (x + x2)/2 + nx*bend, cy = (y + y2)/2 + ny*bend;
    const m = d < 5 ? 7 - d : 1, strands = [];
    for (let k = 0; k < m; k++){
      const ph = rnd(0, 6.28), amp = m > 1 ? (5 - d)*2.2 : 0, pts = [];
      for (let i = 0; i <= N; i++){
        const u = i/N, e = (1 - u)*(1 - u), f = 2*(1 - u)*u, g = u*u;
        const o = amp*Math.sin(u*9 + ph)*Math.sin(Math.PI*u);
        pts.push([e*x + f*cx + g*x2 + nx*o, e*y + f*cy + g*y2 + ny*o]);
      }
      strands.push(pts);
    }
    segs.push({strands, t0, dur, d, hue: 275 - d/maxD*95});
    if (d === 0){                                       // le bas : branches latérales sur le tronc + racines qui s'étalent
      const sc = Math.min(1, W*.42/(len*3.3));
      [].forEach(u => {
        const e = (1 - u)*(1 - u), f = 2*(1 - u)*u, g = u*u, px = e*x + f*cx + g*x2, py = e*y + f*cy + g*y2;
        [-1, 1].forEach(sd => branch(px, py, -Math.PI/2 + sd*rnd(.6, .95), len*rnd(.6, .9)*sc, 4, t0 + dur*u));
      });
      
    }
    if (d >= 1 && d <= 3) [.4, .7].forEach(u => {         // rameaux sur les grosses branches : remplit le milieu
      const e = (1 - u)*(1 - u), f = 2*(1 - u)*u, g = u*u, px = e*x + f*cx + g*x2, py = e*y + f*cy + g*y2;
      branch(px, py, ang + (Math.random() < .5 ? -1 : 1)*rnd(.5, .9)*sp, len*rnd(.45, .65), d + 3, t0 + dur*u);
    });
    if (d >= 5) for (let k = 0; k < (d >= maxD ? 2 : 1); k++) leaves.push({x: x2, y: y2, t: t0 + dur + k*.2, s: rnd(8, 16), r: rnd(0, 6.28), hue: rnd(165, 320), ph: rnd(0, 6.28)});
    if (d >= maxD){ tips.push({x: x2, y: y2, t: t0 + dur, ph: rnd(0, 6.28), sp: rnd(.8, 1.8)}); return; }
    const n = Math.random() < .5 ? 3 : 2, end = t0 + dur + rnd(0, .12);
    for (let k = 0; k < n; k++){
      const spread = (n === 3 ? (k - 1)*.6 : (k - .5)*rnd(.7, 1.1))*sp;
      let a2 = ang + spread + rnd(-.15, .15);
      a2 = a2*.9 - Math.PI/2*.1;                        // les branches tendent vers le ciel
      branch(x2, y2, a2, len*rnd(.72, .84), d + 1, end);
    }
  }
  branch(W/2, baseY, -Math.PI/2, Math.min(H*.18, W*.28), 0, .5);
  /* L'arbre est ajusté à l'écran : jamais plus large que l'écran, jamais sur le titre */
  (() => {
    let mx = 1, mn = baseY;
    segs.forEach(g => g.strands.forEach(pts => pts.forEach(q => { mx = Math.max(mx, Math.abs(q[0] - W/2)); mn = Math.min(mn, q[1]); })));
    const k = Math.min(1, W*.46/mx, (baseY - H*.22)/(baseY - mn));
    if (k >= 1) return;
    const fx = o => { o.x = W/2 + (o.x - W/2)*k; o.y = baseY + (o.y - baseY)*k; };
    segs.forEach(g => g.strands.forEach(pts => pts.forEach(q => { q[0] = W/2 + (q[0] - W/2)*k; q[1] = baseY + (q[1] - baseY)*k; })));
    tips.forEach(fx); leaves.forEach(fx);
  })();
  const T = Math.max(...tips.map(t => t.t));

  /* Décor */
  const bg = c.createLinearGradient(0, 0, 0, H);
  bg.addColorStop(0, "#241a5c"); bg.addColorStop(.55, "#4b2a86"); bg.addColorStop(1, "#8a3fa0");
  const glow = c.createRadialGradient(W/2, baseY, 0, W/2, baseY, W*.5);
  glow.addColorStop(0, "rgba(190,150,255,.65)"); glow.addColorStop(1, "rgba(150,120,255,0)");
  const stars = Array.from({length: 70}, () => ({x: rnd(0, W), y: rnd(0, H*.8), r: rnd(.6, 1.5), ph: rnd(0, 6.28)}));
  const crown = c.createRadialGradient(W/2, H*.42, 0, W/2, H*.42, W*.65);
  crown.addColorStop(0, "rgba(150,215,255,.32)"); crown.addColorStop(1, "rgba(150,215,255,0)");
  const orbs = Array.from({length: 30}, () => ({x: rnd(W*.1, W*.9), y: rnd(H*.3, H), vy: rnd(.25, .7), ph: rnd(0, 6.28)}));
  const fruits = [];
  let dust = [];

  function drawTree(g, tt, thick){
    g.lineCap = "round"; g.lineJoin = "round";
    for (const s of segs){
      const p = Math.min(1, (tt - s.t0)/s.dur);
      if (p <= 0) continue;
      const n = p*N, full = Math.floor(n), fr = n - full, bundle = s.strands.length > 1;
      const w = bundle ? 1.4 + thick*1 : 1 + thick*(8 - s.d)*.8;
      for (const pts of s.strands){
        g.beginPath(); g.moveTo(pts[0][0], pts[0][1]);
        for (let i = 1; i <= full && i <= N; i++) g.lineTo(pts[i][0], pts[i][1]);
        if (full < N){ const a = pts[full], b = pts[full + 1]; g.lineTo(a[0] + (b[0] - a[0])*fr, a[1] + (b[1] - a[1])*fr); }
        g.strokeStyle = `hsla(${s.hue},90%,75%,.22)`; g.lineWidth = w*5; g.stroke();
        g.strokeStyle = `hsl(${s.hue},90%,${bundle ? 82 : 76}%)`; g.lineWidth = w; g.stroke();
      }
    }
  }

  /* Cercle de runes anguleux au pied de l'arbre */
  function drawRunes(tt){
    const a = Math.min(1, tt/2.5), rx = Math.min(W*.42, 240);
    c.globalCompositeOperation = "lighter"; c.lineWidth = 1.2;
    for (let ring = 0; ring < 2; ring++){
      const R = rx*(1 - ring*.3), dir = ring ? -1 : 1;
      c.strokeStyle = `rgba(160,235,255,${.4*a})`; c.beginPath();
      for (let i = 0; i <= 8; i++){ const an = tt*.15*dir + i*Math.PI/4; c.lineTo(W/2 + Math.cos(an)*R, baseY + 8 + Math.sin(an)*R*.22); }
      c.stroke();
      for (let i = 0; i < 12; i++){
        const an = tt*.25*dir + i*Math.PI/6, px = W/2 + Math.cos(an)*R, py = baseY + 8 + Math.sin(an)*R*.22, r = 4 + 2*Math.sin(tt*2 + i);
        c.fillStyle = `rgba(255,220,150,${.7*a})`; c.beginPath();
        c.moveTo(px, py - r); c.lineTo(px + r*.6, py); c.lineTo(px, py + r); c.lineTo(px - r*.6, py); c.closePath(); c.fill();
      }
    }
    c.globalCompositeOperation = "source-over";
  }

  /* Feuilles en éclats de cristal + scintillement léger des pointes */
  function drawGlow(tt){
    c.globalCompositeOperation = "lighter";
    for (const l of leaves){
      const a = Math.min(1, (tt - l.t)/1.6);
      if (a <= 0) continue;
      const tw = .8 + .2*Math.sin(tt*1.3 + l.ph), sw = l.r + Math.sin(tt*.9 + l.ph)*.35, s = l.s*a;
      const cs = Math.cos(sw)*s, sn = Math.sin(sw)*s;
      c.fillStyle = `hsla(${l.hue},90%,70%,${.85*a*tw})`; c.beginPath();
      c.moveTo(l.x + cs, l.y + sn); c.lineTo(l.x - sn*.45, l.y + cs*.45); c.lineTo(l.x - cs*.6, l.y - sn*.6); c.lineTo(l.x + sn*.45, l.y - cs*.45); c.closePath(); c.fill();
    }
    for (const t of tips){
      const a = Math.min(1, (tt - t.t)/1.5);
      if (a <= 0) continue;
      const tw = .7 + .3*Math.sin(tt*t.sp + t.ph), r = 3 + 2*tw;
      c.fillStyle = `rgba(255,255,255,${.85*a*tw})`; c.beginPath();
      c.moveTo(t.x, t.y - r*1.8); c.lineTo(t.x + r*.35, t.y - r*.35); c.lineTo(t.x + r*1.8, t.y); c.lineTo(t.x + r*.35, t.y + r*.35);
      c.lineTo(t.x, t.y + r*1.8); c.lineTo(t.x - r*.35, t.y + r*.35); c.lineTo(t.x - r*1.8, t.y); c.lineTo(t.x - r*.35, t.y - r*.35); c.closePath(); c.fill();
    }
    if (tt > T && Math.random() < .15){ const t = tips[Math.floor(Math.random()*tips.length)]; dust.push({x: t.x, y: t.y, vx: rnd(-.3, .3), vy: rnd(.3, .8), a: 1, ph: rnd(0, 6.28)}); }
    dust = dust.filter(d => d.a > 0 && d.y < baseY);
    for (const d of dust){
      d.x += d.vx + Math.sin(tt*2 + d.ph)*.3; d.y += d.vy; d.a -= .004;
      c.fillStyle = `rgba(190,240,255,${d.a*.8})`; c.beginPath(); c.moveTo(d.x, d.y - 3); c.lineTo(d.x + 2, d.y); c.lineTo(d.x, d.y + 3); c.lineTo(d.x - 2, d.y); c.closePath(); c.fill();
    }
    if (tt > 2) for (const o of orbs){                  // lucioles anguleuses qui montent du sol
      o.y -= o.vy; if (o.y < H*.15) o.y = H;
      const al = (.35 + .35*Math.sin(tt*2 + o.ph)), x = o.x + Math.sin(tt*.8 + o.ph)*14;
      c.fillStyle = `rgba(255,225,150,${al})`; c.beginPath(); c.moveTo(x, o.y - 4); c.lineTo(x + 2.5, o.y); c.lineTo(x, o.y + 4); c.lineTo(x - 2.5, o.y); c.closePath(); c.fill();
    }
    fruits.forEach((f, i) => {                          // halo derrière les photos
      const al = .16 + .07*Math.sin(tt*2 + i), R = 40;
      c.fillStyle = `rgba(160,235,255,${al})`; c.beginPath();
      c.moveTo(f.x, f.y - R); c.lineTo(f.x + R, f.y); c.lineTo(f.x, f.y + R); c.lineTo(f.x - R, f.y); c.closePath(); c.fill();
    });
    c.globalCompositeOperation = "source-over";
  }

  let raf, off = null;
  const start = performance.now();
  function loop(){
    const tt = (performance.now() - start)/1000;
    c.fillStyle = bg; c.fillRect(0, 0, W, H);
    stars.forEach(s => { c.fillStyle = `rgba(255,255,255,${.5 + .3*Math.sin(tt*.8 + s.ph)})`; c.fillRect(s.x, s.y, s.r, s.r); });
    c.fillStyle = glow; c.fillRect(0, 0, W, H);
    c.fillStyle = crown; c.fillRect(0, 0, W, H);
    drawRunes(tt);
    if (tt < T + 2.05){
      const x = Math.min(1, tt/(T + 2));
      drawTree(c, tt, 1 - (1 - x)*(1 - x));
    } else {
      if (!off){
        off = document.createElement("canvas"); off.width = W*dpr; off.height = H*dpr;
        const g = off.getContext("2d"); g.scale(dpr, dpr); drawTree(g, 1e9, 1);
      }
      c.drawImage(off, 0, 0, W, H);
    }
    drawGlow(tt);
    raf = requestAnimationFrame(loop);
  }
  loop();

  const t1 = setTimeout(() => { $("#tt").style.opacity = 1; }, (T + 1)*1000);
  const t2 = setTimeout(() => {
    const k = Math.min(photos.length, 8), sorted = tips.filter(t => t.y < H*.72).sort((a, b) => a.x - b.x);
    for (let j = 0; j < k; j++){
      const p = sorted[Math.floor((j + .5)*sorted.length/k)];
      const f = document.createElement("div");
      f.className = "fruit";
      f.style.cssText = `left:${p.x - 24}px;top:${p.y - 24}px;animation-delay:${-j}s`;
      f.innerHTML = `<img src="${photos[j]}">`;
      f.onclick = () => f.classList.toggle("big");
      stage.append(f);
      setTimeout(() => { f.style.opacity = 1; fruits.push({x: p.x, y: p.y}); }, 100 + j*250);
    }
  }, (T + 1.5)*1000);
  return () => { cancelAnimationFrame(raf); clearTimeout(t1); clearTimeout(t2); };
}
