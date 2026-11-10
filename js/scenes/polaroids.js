/* ---------- Animation 5 : pluie de polaroïds ---------- */
function sPol(){
  stage.innerHTML = `<div class="title abs" style="top:5%">Nos souvenirs 📸</div>`;
  const sx = Math.min(stage.clientWidth * .3, 200);
  photos.slice(0, 8).forEach((p, i) => {
    const d = document.createElement("div");
    d.className = "pol";
    d.style.cssText = `--r:${Math.random()*24 - 12}deg;--tx:${(Math.random()*2 - 1)*sx}px;--ty:${(Math.random()*2 - 1)*90 + 30}px;--dl:${i*.25}s`;
    d.innerHTML = `<img src="${p}">`;
    d.onclick = () => {
      const was = d.classList.contains("top");
      stage.querySelectorAll(".pol").forEach(x => x.classList.remove("top"));
      if (!was) d.classList.add("top");
    };
    stage.append(d);
  });
}
