/* ---------- Animation 2 : ballons « utiles » (chaque ballon cache un bon cadeau) ---------- */
function sBalloons(){
  const N = Math.min(photos.length, BONS.length, 8);
  let found = 0, t;
  stage.innerHTML = `<div class="title" style="position:relative;z-index:1;pointer-events:none">Éclate les ballons 🎈<br><small id="cnt" style="font-size:.45em;opacity:.7">0 / ${N} cadeaux trouvés</small></div>`;
  for (let i = 0; i < N; i++){
    const b = document.createElement("div");
    b.className = "balloon";
    b.style.cssText = `left:${4 + i*(88/N)}%;--d:${9 + Math.random()*5}s;--dl:${-i*1.6}s;--col:${colors[i % 6]}`;
    b.innerHTML = `<div class="b"><img src="${photos[i]}"></div><i></i>`;
    b.onclick = e => {
      confetti(e.clientX, e.clientY, 40);
      b.remove(); found++;
      $("#cnt").textContent = found + " / " + N + " cadeaux trouvés";
      const card = document.createElement("div");
      card.className = "card";
      card.innerHTML = `<div><img src="${photos[i]}"><p>${BONS[i]}</p><button>${found === N ? "Super ! 🎉" : "Merci 💝"}</button></div>`;
      card.querySelector("button").onclick = () => {
        card.remove();
        if (found === N) t = setTimeout(() => go(cur + 1), 1200);   // tous trouvés : on enchaîne
      };
      stage.append(card);
    };
    stage.append(b);
  }
  return () => clearTimeout(t);
}
