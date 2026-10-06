/* ============ EDITA SOLO ESTA SECCIÓN ============ */
const WHATSAPP = "573016103030"; // Joven Búho — confirma que este es tu número actual
const MENSAJE  = "Hola Joven Búho, vi tu portafolio y quiero cotizar edición de video.";

const PROYECTOS = [
  {titulo:"Reel para @cristian_barbosa201", cat:"Dinámicos", desc:"Cortes rápidos y precisos, con efectos de sonido que le dan ritmo al video de principio a fin.", cliente:"@cristian_barbosa201", servicio:"Edición dinámica", video:"", cover:""},
  {titulo:"Campaña para @bleiderbotero", cat:"Marketing", desc:"Transiciones suaves y gráficos animados que acompañan el mensaje de marca sin robarle protagonismo.", cliente:"@bleiderbotero", servicio:"Video marketing", video:"", cover:""},
  {titulo:"Historia para @jajajairoramirez", cat:"Storytelling", desc:"Una historia con inicio, desarrollo y cierre, apoyada en música y efectos que la hacen fácil de seguir.", cliente:"@jajajairoramirez", servicio:"Storytelling", video:"", cover:""},
  {titulo:"Institucional — Envigado Joven", cat:"Institucionales", desc:"Ritmo constante y cuidado en el tono, manteniendo la formalidad que pide un mensaje institucional.", cliente:"@envigadojovenoficial", servicio:"Video institucional", video:"", cover:""},
  {titulo:"Proyecto 5", cat:"Dinámicos", desc:"Descripción breve del proyecto.", cliente:"Cliente", servicio:"Edición", video:"", cover:""},
  {titulo:"Proyecto 6", cat:"Marketing", desc:"Descripción breve del proyecto.", cliente:"Cliente", servicio:"Edición", video:"", cover:""}
];
/* =================================================== */

const $=s=>document.querySelector(s);
const wa="https://wa.me/"+WHATSAPP+"?text="+encodeURIComponent(MENSAJE);
document.querySelectorAll("#waBtn").forEach(a=>a.href=wa);
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

(function guideCursor(){
  const btn=document.querySelector(".hero .cta.ghost");
  const circle=document.getElementById("heroVisual");
  if(!btn || !circle) return;
  let playing=false;
  let currentIdx=0;
  document.addEventListener("screenchange",e=>{ currentIdx=e.detail.idx; });

  function play(){
    if(playing || currentIdx!==0) return;
    playing=true;
    const cur=document.createElement("div");
    cur.className="guide-cursor";
    cur.innerHTML='<svg viewBox="0 0 24 24"><path d="M4 2l14 6-5.5 2L15 16l-3 1.5-2.5-6L4 15z" fill="#fff" stroke="#000" stroke-width="1"/></svg><span class="guide-click"></span>';
    document.body.appendChild(cur);

    const b=btn.getBoundingClientRect();
    const c=circle.getBoundingClientRect();
    const endX=b.left+b.width*0.45, endY=b.top+b.height*0.45;
    const p0=[window.innerWidth-30, c.top+c.height*0.35];
    const p1=[c.left+c.width*0.88, c.top-10];
    const p2=[c.left-40, c.bottom+15];
    const p3=[endX, endY];

    const styleTag=document.createElement("style");
    styleTag.textContent=`
      @keyframes guidePathAnim{
        0%{transform:translate(${p0[0]}px,${p0[1]}px);animation-timing-function:cubic-bezier(.25,.1,.25,1)}
        32%{transform:translate(${p1[0]}px,${p1[1]}px);animation-timing-function:cubic-bezier(.6,0,.15,1)}
        58%{transform:translate(${p2[0]}px,${p2[1]}px);animation-timing-function:cubic-bezier(.25,.1,.25,1)}
        100%{transform:translate(${p3[0]}px,${p3[1]}px)}
      }`;
    document.head.appendChild(styleTag);

    cur.style.transform=`translate(${p0[0]}px,${p0[1]}px)`;
    cur.classList.add("show");
    void cur.offsetHeight;
    cur.style.animation="guidePathAnim 10s forwards";

    let left=false;
    const leaveHero=()=>{
      if(left) return;
      left=true;
      playing=false;
      cur.remove();
      styleTag.remove();
      document.removeEventListener("screenchange",onScreenChange);
    };
    const onScreenChange=e=>{ if(e.detail.idx!==0) leaveHero(); };
    document.addEventListener("screenchange",onScreenChange);

    cur.addEventListener("animationend",()=>{
      if(left) return;
      cur.classList.add("clicking");
      cur.querySelector(".guide-click").classList.add("pulse");
      btn.classList.add("guide-press","guide-ripple");
      setTimeout(()=>cur.classList.remove("clicking"),900);
      setTimeout(()=>cur.classList.remove("show"),1650);
      setTimeout(()=>{if(!left){cur.remove();styleTag.remove();playing=false;}document.removeEventListener("screenchange",onScreenChange);},3150);
      setTimeout(()=>btn.classList.remove("guide-press"),900);
      setTimeout(()=>btn.classList.remove("guide-ripple"),2100);
    },{once:true});
  }

  setTimeout(play,2800);
  document.addEventListener("screenchange",e=>{ if(e.detail.idx===0) setTimeout(play,900); });
})();

(function typewriter(){
  const el=document.getElementById("typeTitle");
  if(!el) return;
  const segments=[
    {text:"Soy ",cls:"white-neon"},
    {text:"Joven Búho",cls:"accent"},
    {text:"\n",cls:null},
    {text:"Editor de video.",cls:"white-neon"}
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
    setTimeout(tick, 55+Math.random()*40);
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
  document.addEventListener("keydown",e=>{
    if(e.key==="ArrowDown"||e.key==="ArrowRight") show(idx+1);
    if(e.key==="ArrowUp"||e.key==="ArrowLeft") show(idx-1);
  });

  if(location.hash) history.replaceState(null,"",location.pathname);
  show(0);
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
function initGrid(fixedCat){
  if(!$("#grid")) return;
  const cats=["Todos",...new Set(PROYECTOS.map(p=>p.cat))];
  let activa="Todos";
  function pintar(){
    if($("#filters") && !fixedCat){
      $("#filters").innerHTML=cats.map(c=>`<button class="${c===activa?'on':''}" data-c="${c}" aria-pressed="${c===activa}">${c}</button>`).join("");
    }
    const lista=PROYECTOS.map((p,i)=>({p,i})).filter(({p})=>fixedCat?p.cat===fixedCat:(activa==="Todos"||p.cat===activa));
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
