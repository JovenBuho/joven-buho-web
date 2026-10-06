/* ============ EDITA SOLO ESTA SECCIÓN ============ */
const WHATSAPP = "573016103030"; // Joven Búho — confirma que este es tu número actual
const MENSAJE  = "Hola Joven Búho, vi tu portafolio y quiero cotizar edición de video.";

const PROYECTOS = [
  {titulo:"Reel para @cristian_barbosa201", cat:"Dinámicos", desc:"Cortes rápidos y precisos, con efectos de sonido que le dan ritmo al video de principio a fin.", cliente:"@cristian_barbosa201", servicio:"Edición dinámica", video:"", cover:""},
  {titulo:"Campaña para @bleiderbotero", cat:"Marketing", desc:"Transiciones suaves y gráficos animados que acompañan el mensaje de marca sin robarle protagonismo.", cliente:"@bleiderbotero", servicio:"Video marketing", video:"", cover:""},
  {titulo:"Historia para @jajajairoramirez", cat:"Storytelling", desc:"Una historia con inicio, desarrollo y cierre, apoyada en música y efectos que la hacen fácil de seguir.", cliente:"@jajajairoramirez", servicio:"Storytelling", video:"", cover:""},
  {titulo:"Institucional — Envigado Joven", cat:"Institucionales", desc:"Ritmo constante y cuidado en el tono, manteniendo la formalidad que pide un mensaje institucional.", cliente:"@envigadojovenoficial", servicio:"Video institucional", video:"", cover:""}
];
/* =================================================== */

const $=s=>document.querySelector(s);
const wa="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(MENSAJE);
document.querySelectorAll("#waBtn,[data-wa]").forEach(a=>a.href=wa);
if($("#y")) $("#y").textContent=new Date().getFullYear();

(function hoverVapor(){
  const vis=document.getElementById("heroVisual");
  const box=document.getElementById("hoverVapor");
  if(!vis || !box) return;
  const positions=[
    {top:"-8%",left:"44%"},
    {top:"6%",right:"-8%"},
    {top:"42%",right:"-10%"},
    {bottom:"6%",right:"-8%"},
    {bottom:"-8%",left:"44%"},
    {bottom:"6%",left:"-8%"},
    {top:"42%",left:"-10%"},
    {top:"6%",left:"-8%"}
  ];
  vis.addEventListener("mouseenter",()=>{
    positions.forEach((pos,i)=>{
      const s=document.createElement("span");
      Object.assign(s.style,pos);
      s.style.animationDelay=(i*0.16)+"s";
      s.addEventListener("animationend",()=>s.remove());
      box.appendChild(s);
    });
  });
})();

(function typewriter(){
  const el=document.getElementById("typeTitle");
  if(!el || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const segments=[
    {text:"Edito videos",cls:"white-neon"},
    {text:"\n",cls:null},
    {text:"que enganchan",cls:"accent"},
    {text:"\n",cls:null},
    {text:"desde el primer segundo.",cls:"white-neon"}
  ];
  el.innerHTML='<span class="type-cursor typing"></span>';
  const cursor=el.querySelector(".type-cursor");
  let si=0,ci=0;
  function tick(){
    if(si>=segments.length){ cursor.classList.remove("typing"); return; }
    const seg=segments[si];
    if(seg.text==="\n"){
      el.insertBefore(document.createElement("br"),cursor);
      si++; ci=0;
      return setTimeout(tick,120);
    }
    let span=el.querySelector(`span[data-seg="${si}"]`);
    if(!span){
      span=document.createElement("span");
      span.className=seg.cls;
      span.dataset.seg=si;
      el.insertBefore(span,cursor);
    }
    span.textContent+=seg.text[ci];
    ci++;
    if(ci>=seg.text.length){ si++; ci=0; }
    setTimeout(tick, 22+Math.random()*18);
  }
  setTimeout(tick,300);
})();


(function paginate(){
  const wrap=document.getElementById("screens");
  if(!wrap) return;
  const screens=[...wrap.querySelectorAll(".screen")];
  const dotsBox=document.getElementById("screenDots");
  const nextBtn=document.getElementById("screenNext");
  const nextWrap=document.getElementById("screenNextWrap")||nextBtn;
  const header=document.querySelector("header");
  if(header) document.documentElement.style.setProperty("--header-h", header.offsetHeight+"px");

  dotsBox.innerHTML=screens.map((_,n)=>`<button aria-label="Ir a sección ${n+1}"></button>`).join("");
  const dots=[...dotsBox.querySelectorAll("button")];
  let idx=0;

  function show(n){
    idx=Math.max(0,Math.min(screens.length-1,n));
    screens.forEach((s,i)=>s.classList.toggle("active",i===idx));
    dots.forEach((d,i)=>d.classList.toggle("on",i===idx));
    nextWrap.classList.toggle("hide",idx===screens.length-1);
    document.dispatchEvent(new CustomEvent("screenchange",{detail:{idx}}));
  }
  dots.forEach((d,n)=>d.addEventListener("click",()=>show(n)));
  nextBtn.addEventListener("click",()=>show(idx+1));
  const modalOpen=()=>document.querySelector(".modal.open");
  document.addEventListener("keydown",e=>{
    if(modalOpen()) return;
    if(e.key==="ArrowDown"||e.key==="ArrowRight") show(idx+1);
    if(e.key==="ArrowUp"||e.key==="ArrowLeft") show(idx-1);
  });

  /* Rueda y deslizamiento: cambian de pantalla solo si la pantalla activa ya no tiene más contenido que recorrer */
  let lock=0;
  function step(dir){
    const sc=screens[idx], now=Date.now();
    if(modalOpen() || now<lock) return;
    const atEnd=sc.scrollTop+sc.clientHeight>=sc.scrollHeight-2, atTop=sc.scrollTop<=0;
    if((dir>0&&!atEnd)||(dir<0&&!atTop)) return;
    lock=now+700; show(idx+dir);
  }
  wrap.addEventListener("wheel",e=>{ if(Math.abs(e.deltaY)>30) step(e.deltaY>0?1:-1); },{passive:true});
  let ty=null;
  wrap.addEventListener("touchstart",e=>{ ty=e.touches[0].clientY; },{passive:true});
  wrap.addEventListener("touchend",e=>{ if(ty===null) return; const dy=ty-e.changedTouches[0].clientY; ty=null; if(Math.abs(dy)>60) step(dy>0?1:-1); },{passive:true});

  const sobre=screens.findIndex(s=>s.querySelector("#sobre"));
  document.querySelectorAll('.navlinks a[href="index.html#sobre"]').forEach(a=>a.addEventListener("click",e=>{ e.preventDefault(); show(sobre); }));
  document.querySelectorAll('a.logo').forEach(a=>a.addEventListener("click",e=>{ e.preventDefault(); show(0); }));

  if(location.hash) history.replaceState(null,"",location.pathname);
  show(window.__hash==="#sobre"?sobre:0);
  window.addEventListener("pageshow",e=>{ if(e.persisted) show(0); });
})();

function embed(url){
  if(!url) return "";
  let m=url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  if(m) return "https://www.youtube.com/embed/"+m[1]+"?autoplay=1&rel=0";
  m=url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if(m) return "https://player.vimeo.com/video/"+m[1]+"?autoplay=1";
  return "";
}
function thumb(p){
  if(p.cover) return p.cover;
  const m=(p.video||"").match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m?"https://img.youtube.com/vi/"+m[1]+"/hqdefault.jpg":"";
}

const revealIO=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");revealIO.unobserve(e.target)}}),{threshold:.15});
function revealObserve(){document.querySelectorAll(".reveal:not(.in)").forEach(el=>revealIO.observe(el))}
document.querySelectorAll(".reveal").forEach(el=>revealIO.observe(el));

/* Grid de proyectos: fixedCat="Dinámicos" fija la categoría (sin botones de filtro), null muestra todo con filtros */
function initGrid(fixedCat,limit){
  if(!$("#grid")) return;
  const cats=["Todos",...new Set(PROYECTOS.map(p=>p.cat))];
  let activa="Todos";
  function pintar(){
    if($("#filters") && !fixedCat){
      $("#filters").innerHTML=cats.map(c=>`<button class="${c===activa?'on':''}" data-c="${c}" aria-pressed="${c===activa}">${c}</button>`).join("");
    }
    const lista=PROYECTOS.map((p,i)=>({p,i})).filter(({p})=>fixedCat?p.cat===fixedCat:(activa==="Todos"||p.cat===activa)).slice(0,limit||undefined);
    $("#grid").innerHTML=lista.map(({p,i},n)=>`<article class="card reveal" tabindex="0" role="button" aria-label="Ver proyecto: ${p.titulo}" style="transition-delay:${Math.min(n,6)*70}ms" data-i="${i}"><div class="thumb" style="${thumb(p)?`background-image:url('${thumb(p)}')`:''}"></div><div class="info"><h3>${p.titulo}</h3><p>${p.cliente}</p><span class="tag">${p.cat}</span></div></article>`).join("");
    revealObserve();
  }
  if($("#filters") && !fixedCat){
    $("#filters").addEventListener("click",e=>{const b=e.target.closest("button");if(b){activa=b.dataset.c;pintar();}});
  }
  let opener=null;
  $("#grid").addEventListener("keydown",e=>{if((e.key==="Enter"||e.key===" ")&&e.target.classList.contains("card")){e.preventDefault();e.target.click();}});
  $("#grid").addEventListener("click",e=>{
    const c=e.target.closest(".card"); if(!c) return; opener=c;
    const p=PROYECTOS[c.dataset.i], src=embed(p.video);
    $("#player").innerHTML=src?`<iframe src="${src}" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe>`:`<div style="height:100%;display:grid;place-items:center;color:#666">Video próximamente</div>`;
    $("#mTitle").textContent=p.titulo; $("#mDesc").textContent=p.desc;
    $("#mMeta").innerHTML=`<div><b>Cliente</b>${p.cliente}</div><div><b>Servicio</b>${p.servicio}</div><div><b>Categoría</b>${p.cat}</div>`;
    $("#modal").classList.add("open"); document.body.style.overflow="hidden"; $("#close").focus();
  });
  function cerrar(){$("#modal").classList.remove("open");$("#player").innerHTML="";document.body.style.overflow=""; if(opener) opener.focus();}
  $("#modal").setAttribute("role","dialog"); $("#modal").setAttribute("aria-modal","true"); $("#modal").setAttribute("aria-labelledby","mTitle");
  $("#close").onclick=cerrar;
  $("#modal").addEventListener("click",e=>{if(e.target.id==="modal")cerrar();});
  document.addEventListener("keydown",e=>{if(e.key==="Escape")cerrar();});
  pintar();
}

/* Página activa en el menú */
(()=>{const f=location.pathname.split("/").pop()||"index.html";
  const t=["trabajos.html","dinamicos.html","marketing.html","storytelling.html","institucionales.html"].includes(f)?"trabajos.html":f==="contacto.html"?"contacto.html":null;
  if(t) document.querySelectorAll(".navlinks a").forEach(a=>{if(a.getAttribute("href")===t)a.setAttribute("aria-current","page")});})();
