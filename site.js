/* ============ EDITA SOLO ESTA SECCIÓN ============ */
const WHATSAPP = "573016103030"; // Joven Búho — confirma que este es tu número actual
const MENSAJE  = "Hola Joven Búho, vi tu portafolio y quiero cotizar edición de video.";

const PROYECTOS = [
  {titulo:"Mente Humana", cat:"Dinámicos", desc:"", cliente:"", servicio:"Edición dinámica", video:"https://vimeo.com/1044362907", cover:"https://i.vimeocdn.com/video/1967745909-03a827b3b9d240c5d5143bb31c34709b034624ccabd5e4d17ecf9b1dc93855ea-d_640?region=us"},
  {titulo:"Video Dinámico x2", cat:"Dinámicos", desc:"Cortes rápidos y efectos de sonido que le dan ritmo al video de principio a fin.", cliente:"", servicio:"Edición dinámica", video:"https://www.youtube.com/shorts/ZSgqDi63uH4", cover:""},
  {titulo:"Video Recap", cat:"Marketing", desc:"Junto lo mejor en un video corto y con ritmo, para que se entienda de un vistazo.", cliente:"", servicio:"Video marketing", video:"https://www.youtube.com/shorts/VudrWDQW3kE", cover:""},
  {titulo:"Video SPÁ", cat:"Storytelling", desc:"", cliente:"", servicio:"Storytelling", video:"https://vimeo.com/1233510938", cover:"https://i.vimeocdn.com/video/2209196917-f8885a026a40d17c6afa17a2775598a2edd61e9c0193cae32d9ac53dbe8fe126-d_640?region=us"},
  {titulo:"Video Top 3", cat:"Marketing", desc:"", cliente:"", servicio:"Marketing", video:"https://vimeo.com/1233512210", cover:"https://i.vimeocdn.com/video/2209199491-314cc0ff7171ecfae7ffeac001e16930d3a1fa1700972ffd434bfb0fb075f882-d_640?region=us"},
  {titulo:"Video Storytelling", cat:"Storytelling", desc:"Una historia con inicio, desarrollo y cierre, apoyada en música y efectos para que se sienta.", cliente:"", servicio:"Storytelling", video:"https://www.youtube.com/shorts/x7cQK1WceZc", cover:""},
  {titulo:"Video Institucional", cat:"Institucionales", desc:"Ritmo constante y cuidado en el tono, para un mensaje que representa a una organización.", cliente:"", servicio:"Video institucional", video:"https://www.youtube.com/shorts/ML2F9F2Jk4s", cover:""},
  {titulo:"Video Político", cat:"Institucionales", desc:"Un mensaje directo a cámara, con una edición limpia que mantiene el tono serio y deja hablar a la persona.", cliente:"", servicio:"Video institucional", video:"https://www.youtube.com/shorts/8mVFNdI8nTw", cover:""}
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
  function puff(pos,delay){
    const s=document.createElement("span");
    Object.assign(s.style,pos);
    if(delay) s.style.animationDelay=delay+"s";
    s.addEventListener("animationend",()=>s.remove());
    box.appendChild(s);
  }
  /* humo constante por el borde del círculo; con el cursor encima sale más seguido */
  if(matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  let hover=false;
  function ambient(){
    const a=Math.random()*Math.PI*2;
    puff({left:(50+50*Math.cos(a))+"%",top:(50+50*Math.sin(a))+"%",marginLeft:"-35px",marginTop:"-35px"});
    if(hover) puff({left:(50+50*Math.cos(a+Math.PI))+"%",top:(50+50*Math.sin(a+Math.PI))+"%",marginLeft:"-35px",marginTop:"-35px"});
    setTimeout(ambient,hover?120:550);
  }
  ambient();
  vis.addEventListener("mouseenter",()=>{
    hover=true;
    positions.forEach((pos,i)=>puff(pos,i*0.16));
  });
  vis.addEventListener("mouseleave",()=>{hover=false;});
})();

(function typewriter(){
  const el=document.getElementById("typeTitle");
  if(!el || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  const segments=[
    {text:"Soy ",cls:"white-neon"},
    {text:"Joven Búho,",cls:"accent"},
    {text:"\n",cls:null},
    {text:"tu próximo",cls:"white-neon"},
    {text:"\n",cls:null},
    {text:"editor de video.",cls:"white-neon",underline:true}
  ];
  el.classList.remove("done");
  el.innerHTML='<span class="type-cursor typing"></span>';
  const cursor=el.querySelector(".type-cursor");
  let si=0,ci=0;
  function tick(){
    if(si>=segments.length){ cursor.classList.remove("typing"); el.classList.add("done"); return; }
    const seg=segments[si];
    if(seg.text==="\n"){
      el.insertBefore(document.createElement("br"),cursor);
      si++; ci=0;
      return setTimeout(tick,120);
    }
    let host=el.querySelector(`span[data-seg="${si}"]`);
    let textTarget=host;
    if(!host){
      if(seg.underline){
        host=document.createElement("span");
        host.className="accent-line";
        host.dataset.seg=si;
        textTarget=document.createElement("span");
        textTarget.className=seg.cls;
        host.appendChild(textTarget);
        const underline=document.createElement("span");
        underline.className="hero-underline";
        underline.setAttribute("aria-hidden","true");
        host.appendChild(underline);
      } else {
        host=document.createElement("span");
        host.className=seg.cls;
        host.dataset.seg=si;
        textTarget=host;
      }
      el.insertBefore(host,cursor);
    } else if(seg.underline){
      textTarget=host.firstChild;
    }
    textTarget.textContent+=seg.text[ci];
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
    try{ sessionStorage.setItem("screenIdx",idx); }catch(e){}
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
  let saved=-1;
  try{ saved=parseInt(sessionStorage.getItem("screenIdx"),10); }catch(e){}
  const start=window.__hash==="#sobre"?sobre:(Number.isInteger(saved)&&saved>=0&&saved<screens.length?saved:0);
  show(start);
  window.addEventListener("pageshow",e=>{ if(e.persisted) show(idx); });
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
  if(p.cover) return "url('"+p.cover+"')";
  const m=(p.video||"").match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return m?"url('https://i.ytimg.com/vi/"+m[1]+"/maxresdefault.jpg'),url('https://i.ytimg.com/vi/"+m[1]+"/hqdefault.jpg')":"";
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
      $("#filters").hidden=PROYECTOS.length<=6; /* con pocos proyectos, filtrar solo agrega fricción */
      $("#filters").innerHTML=cats.map(c=>`<button class="${c===activa?'on':''}" data-c="${c}" aria-pressed="${c===activa}">${c}</button>`).join("");
    }
    const lista=PROYECTOS.map((p,i)=>({p,i})).filter(({p})=>fixedCat?p.cat===fixedCat:(activa==="Todos"||p.cat===activa)).slice(0,limit||undefined);
    $("#grid").innerHTML=lista.map(({p,i},n)=>`<article class="card reveal" tabindex="0" role="button" aria-label="Ver proyecto: ${p.titulo}" style="transition-delay:${Math.min(n,6)*70}ms" data-i="${i}"><div class="thumb" style="${thumb(p)?`background-image:${thumb(p)}`:''}"></div><div class="info"><h3>${p.titulo}</h3>${p.cliente?`<p>${p.cliente}</p>`:""}<span class="tag">${p.cat}</span></div></article>`).join("");
    $("#grid").dataset.n=lista.length;
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
    $("#mTitle").textContent=p.titulo; $("#mDesc").textContent=p.desc; $("#mDesc").hidden=!p.desc;
    $("#mMeta").innerHTML=(p.cliente?`<div><b>Cliente</b>${p.cliente}</div>`:"")+`<div><b>Servicio</b>${p.servicio}</div><div><b>Categoría</b>${p.cat}</div>`;
    if($("#mCta")) $("#mCta").href=wa+encodeURIComponent(" Me interesó: "+p.titulo);
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
  const t=["dinamicos.html","marketing.html","storytelling.html","institucionales.html"].includes(f)?"index.html#s-trabajos":f==="contacto.html"?"contacto.html":null;
  if(t) document.querySelectorAll(".navlinks a").forEach(a=>{if(a.getAttribute("href")===t)a.setAttribute("aria-current","page")});})();

/* Células de fondo en Trabajos: nacen en un borde al azar y viajan a puntos al azar, nunca en la zona central (para que no se "reúnan" todas en el medio) */
(function cellsDrift(){
  const spans=[...document.querySelectorAll(".cells span")];
  if(!spans.length || matchMedia("(prefers-reduced-motion:reduce)").matches) return;
  function edgePoint(){
    const side=Math.floor(Math.random()*4);
    const along=Math.random()*100;
    if(side===0) return {top:-2, left:along};
    if(side===1) return {top:along, left:102};
    if(side===2) return {top:102, left:along};
    return {top:along, left:-2};
  }
  function offCenterPoint(){
    let top,left;
    do{ top=6+Math.random()*88; left=6+Math.random()*88; }
    while(Math.abs(top-50)<22 && Math.abs(left-50)<22);
    return {top,left};
  }
  spans.forEach(s=>{
    const start=edgePoint();
    s.style.top=start.top+"%"; s.style.left=start.left+"%";
    let entered=false;
    function next(){
      const p=offCenterPoint();
      const op=.15+Math.random()*.4, scale=.55+Math.random()*.6;
      const dur=entered?(7+Math.random()*9):(1.4+Math.random()*1.2);
      const ease=entered?"linear":"cubic-bezier(.08,.75,.15,1)";
      entered=true;
      s.style.transition=`top ${dur}s ${ease},left ${dur}s ${ease},opacity ${dur}s ${ease},transform ${dur}s ${ease}`;
      s.style.top=p.top+"%"; s.style.left=p.left+"%"; s.style.opacity=op; s.style.transform=`scale(${scale})`;
      setTimeout(next, dur*1000*(.9+Math.random()*.3));
    }
    setTimeout(next, Math.random()*400);
  });
})();
