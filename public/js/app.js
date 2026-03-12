// ══════════════════════════════════════════
// CRÉNEAUX 7h00 → 22h30, pas 15 min
// ══════════════════════════════════════════
const TIME_SLOTS=(()=>{
  const s=[];
  for(let h=7;h<=22;h++){
    const mx=h===22?30:45;
    for(let m=0;m<=mx;m+=15)s.push(`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`);
  }
  return s;
})();
function tmin(t){const[h,m]=t.split(':').map(Number);return h*60+m;}

// ══════════════════════════════════════════
// DONNÉES
// ══════════════════════════════════════════
const DEFAULT_INFRAS=[
  {id:1, name:"Piscine - Petit Bassin",            type:"Piscine",          color:"#0077b6",capacity:0,group:"Piscine",address:""},
  {id:2, name:"Piscine - Grand Bassin",             type:"Piscine",          color:"#0096c7",capacity:0,group:"Piscine",address:""},
  {id:3, name:"Piscine - Salle musculation",        type:"Musculation",      color:"#00b4d8",capacity:0,group:"Piscine",address:""},
  {id:4, name:"Piscine - Fosse de plongée",         type:"Piscine",          color:"#48cae4",capacity:0,group:"Piscine",address:""},
  {id:5, name:"Palais des Sports - Omnisports",     type:"Gymnase",          color:"#c0392b",capacity:0,group:"Palais des Sports",address:""},
  {id:6, name:"Palais des Sports - RPM",            type:"Salle de sport",   color:"#e74c3c",capacity:0,group:"Palais des Sports",address:""},
  {id:7, name:"Palais des Sports - Gymnastique",    type:"Gymnase",          color:"#ff6b6b",capacity:0,group:"Palais des Sports",address:""},
  {id:8, name:"Nelson Paillou - Omnisports",        type:"Gymnase",          color:"#1e8449",capacity:0,group:"Nelson Paillou",address:""},
  {id:9, name:"Nelson Paillou - Tennis de Table",   type:"Salle polyvalente",color:"#27ae60",capacity:0,group:"Nelson Paillou",address:""},
  {id:10,name:"Nelson Paillou - Salle Polyvalente", type:"Salle polyvalente",color:"#52be80",capacity:0,group:"Nelson Paillou",address:""},
  {id:11,name:"Nelson Paillou - Gymnastique",       type:"Gymnase",          color:"#82e0aa",capacity:0,group:"Nelson Paillou",address:""},
  {id:12,name:"Tony Parker - Marne",                type:"Terrain extérieur",color:"#7d3c98",capacity:0,group:"Tony Parker",address:""},
  {id:13,name:"Tony Parker - Rue",                  type:"Terrain extérieur",color:"#9b59b6",capacity:0,group:"Tony Parker",address:""},
  {id:14,name:"Tony Parker - Escalade",             type:"Escalade",         color:"#af7ac5",capacity:0,group:"Tony Parker",address:""},
  {id:15,name:"Tony Parker - Salle musculation",    type:"Musculation",      color:"#c39bd3",capacity:0,group:"Tony Parker",address:""},
  {id:16,name:"Maurice Herzog - Omnisport",         type:"Gymnase",          color:"#d35400",capacity:0,group:"Maurice Herzog",address:""},
  {id:17,name:"Maurice Herzog - Dojo",              type:"Dojo",             color:"#e67e22",capacity:0,group:"Maurice Herzog",address:""},
  {id:18,name:"Maurice Herzog - Boxe",              type:"Salle de boxe",    color:"#f39c12",capacity:0,group:"Maurice Herzog",address:""},
  {id:19,name:"Claude Bessy - Danse",               type:"Salle de danse",   color:"#e91e8c",capacity:0,group:"Claude Bessy",address:""},
  {id:20,name:"Jean Mermoz - Danse",                type:"Salle de danse",   color:"#c2185b",capacity:0,group:"Jean Mermoz",address:""},
  {id:21,name:"Dojo Victor Hugo",                   type:"Dojo",             color:"#5d4037",capacity:0,group:"Dojo Victor Hugo",address:""},
];
let infrastructures=DEFAULT_INFRAS;

// ══════════════════════════════════════════
// ASSOCIATIONS
// ══════════════════════════════════════════
const DEFAULT_ASSOCS=[
  {id:1,  name:"BASKET",                      cat:"Sports collectifs",      color:"#e74c3c", contact:"",phone:"",email:"",notes:""},
  {id:2,  name:"VOLLEY",                      cat:"Sports collectifs",      color:"#e67e22", contact:"",phone:"",email:"",notes:""},
  {id:3,  name:"CAP Football",                cat:"Sports collectifs",      color:"#27ae60", contact:"",phone:"",email:"",notes:""},
  {id:4,  name:"RUGBY",                       cat:"Sports collectifs",      color:"#8e44ad", contact:"",phone:"",email:"",notes:""},
  {id:5,  name:"AZUR Athlétisme",             cat:"Athlétisme / Plein air", color:"#2980b9", contact:"",phone:"",email:"",notes:""},
  {id:6,  name:"VERTICAL GRIMPE Escalade",    cat:"Athlétisme / Plein air", color:"#16a085", contact:"",phone:"",email:"",notes:""},
  {id:7,  name:"TENNIS DE TABLE",             cat:"Sports collectifs",      color:"#d35400", contact:"",phone:"",email:"",notes:""},
  {id:8,  name:"CERCLE D'ESCRIME HENRI IV",   cat:"Sports de combat",       color:"#c0392b", contact:"",phone:"",email:"",notes:""},
  {id:9,  name:"TENNIS CLUB",                 cat:"Athlétisme / Plein air", color:"#f39c12", contact:"",phone:"",email:"",notes:""},
  {id:10, name:"ENERGIE DANSE CHARENTON",     cat:"Danse",                  color:"#e91e8c", contact:"",phone:"",email:"",notes:""},
  {id:11, name:"DANSEREV",                    cat:"Danse",                  color:"#c2185b", contact:"",phone:"",email:"",notes:""},
  {id:12, name:"SUN & DANCE",                 cat:"Danse",                  color:"#ad1457", contact:"",phone:"",email:"",notes:""},
  {id:13, name:"ACADEMIE DE DANSE DE CHARENTON",cat:"Danse",                color:"#880e4f", contact:"",phone:"",email:"",notes:""},
  {id:14, name:"ADPS",                        cat:"Autre",                  color:"#607d8b", contact:"",phone:"",email:"",notes:""},
  {id:15, name:"COULEUR D'ORIENT",            cat:"Danse",                  color:"#ff6f00", contact:"",phone:"",email:"",notes:""},
  {id:16, name:"URBAN COUNTRY",               cat:"Danse",                  color:"#ef6c00", contact:"",phone:"",email:"",notes:""},
  {id:17, name:"KARATE",                      cat:"Sports de combat",       color:"#b71c1c", contact:"",phone:"",email:"",notes:""},
  {id:18, name:"AÏKIDO",                      cat:"Sports de combat",       color:"#880000", contact:"",phone:"",email:"",notes:""},
  {id:19, name:"TAEKWONDO",                   cat:"Sports de combat",       color:"#1a237e", contact:"",phone:"",email:"",notes:""},
  {id:20, name:"ABC Boxe",                    cat:"Sports de combat",       color:"#4a148c", contact:"",phone:"",email:"",notes:""},
  {id:21, name:"CAPOEIRA",                    cat:"Sports de combat",       color:"#006064", contact:"",phone:"",email:"",notes:""},
  {id:22, name:"LOTUS Viet Vo Dao",           cat:"Sports de combat",       color:"#004d40", contact:"",phone:"",email:"",notes:""},
  {id:23, name:"JUDO CLUB",                   cat:"Sports de combat",       color:"#33691e", contact:"",phone:"",email:"",notes:""},
  {id:24, name:"ATTITUDE GR",                 cat:"Gymnastique",            color:"#f06292", contact:"",phone:"",email:"",notes:""},
  {id:25, name:"ENVOL-GYM",                   cat:"Gymnastique",            color:"#ec407a", contact:"",phone:"",email:"",notes:""},
  {id:26, name:"GYM-DETENTE",                 cat:"Gymnastique",            color:"#e91e63", contact:"",phone:"",email:"",notes:""},
  {id:27, name:"CHEER EXCESS",                cat:"Gymnastique",            color:"#ff4081", contact:"",phone:"",email:"",notes:""},
  {id:28, name:"CLUB AMITIE",                 cat:"Autre",                  color:"#78909c", contact:"",phone:"",email:"",notes:""},
  {id:29, name:"YOGA",                        cat:"Autre",                  color:"#26a69a", contact:"",phone:"",email:"",notes:""},
  {id:30, name:"CNMC Natation",               cat:"Natation / Aquatique",   color:"#0288d1", contact:"",phone:"",email:"",notes:""},
  {id:31, name:"Triathlon",                   cat:"Natation / Aquatique",   color:"#0277bd", contact:"",phone:"",email:"",notes:""},
  {id:32, name:"CPVMC Plongée",               cat:"Natation / Aquatique",   color:"#01579b", contact:"",phone:"",email:"",notes:""},
  {id:33, name:"CS Plongée",                  cat:"Natation / Aquatique",   color:"#006064", contact:"",phone:"",email:"",notes:""},
  {id:34, name:"NATIXIS",                     cat:"Autre",                  color:"#455a64", contact:"",phone:"",email:"",notes:""},
  {id:35, name:"HOPITAUX DE ST-MAURICE",      cat:"Service municipal",      color:"#37474f", contact:"",phone:"",email:"",notes:""},
  {id:36, name:"LYCEE R-SCHUMAN",             cat:"Établissement scolaire", color:"#5d4037", contact:"",phone:"",email:"",notes:""},
  {id:37, name:"COLLEGE LA CERISAIE",         cat:"Établissement scolaire", color:"#6d4c41", contact:"",phone:"",email:"",notes:""},
  {id:38, name:"ECOLE NDM",                   cat:"Établissement scolaire", color:"#795548", contact:"",phone:"",email:"",notes:""},
  {id:39, name:"POLICE MUNICIPALE",           cat:"Service municipal",      color:"#1565c0", contact:"",phone:"",email:"",notes:""},
  {id:40, name:"CENTRE DE LOISIRS Charenton", cat:"Service municipal",      color:"#1976d2", contact:"",phone:"",email:"",notes:""},
  {id:41, name:"SERVICE JEUNESSE",            cat:"Service municipal",      color:"#1e88e5", contact:"",phone:"",email:"",notes:""},
  {id:42, name:"SERVICE EDUCATION",           cat:"Service municipal",      color:"#2196f3", contact:"",phone:"",email:"",notes:""},
  {id:43, name:"SERVICE RETRAITE (CCAS)",     cat:"Service municipal",      color:"#42a5f5", contact:"",phone:"",email:"",notes:""},
  {id:44, name:"SERVICE POLE FAMILLES",       cat:"Service municipal",      color:"#64b5f6", contact:"",phone:"",email:"",notes:""},
  {id:45, name:"ECOLE Charenton",             cat:"Établissement scolaire", color:"#8d6e63", contact:"",phone:"",email:"",notes:""},
  {id:46, name:"ECOLE Saint-Maurice",         cat:"Établissement scolaire", color:"#a1887f", contact:"",phone:"",email:"",notes:""},
];
let associations=DEFAULT_ASSOCS;
let nextAssocId=Math.max(...associations.map(a=>a.id),0)+1;
let editAssoc=null;

// ══════════════════════════════════════════
// VACANCES SCOLAIRES (Zone C — 2024-2026)
// ══════════════════════════════════════════
const VAC_TYPES={toussaint:'🍂 Toussaint',noel:'🎄 Noël',hiver:'⛷️ Hiver',printemps:'🌸 Printemps',ete:'☀️ Été',autre:'📅 Autre'};
const DEFAULT_VACANCES=[
  {id:1, name:"Toussaint 2024",   from:"2024-10-19", to:"2024-11-03", type:"toussaint", year:"2024-2025"},
  {id:2, name:"Noël 2024",        from:"2024-12-21", to:"2025-01-05", type:"noel",      year:"2024-2025"},
  {id:3, name:"Hiver 2025",       from:"2025-02-15", to:"2025-03-02", type:"hiver",     year:"2024-2025"},
  {id:4, name:"Printemps 2025",   from:"2025-04-12", to:"2025-04-27", type:"printemps", year:"2024-2025"},
  {id:5, name:"Été 2025",         from:"2025-07-05", to:"2025-08-31", type:"ete",       year:"2024-2025"},
  {id:6, name:"Toussaint 2025",   from:"2025-10-18", to:"2025-11-02", type:"toussaint", year:"2025-2026"},
  {id:7, name:"Noël 2025",        from:"2025-12-20", to:"2026-01-04", type:"noel",      year:"2025-2026"},
  {id:8, name:"Hiver 2026",       from:"2026-02-14", to:"2026-03-01", type:"hiver",     year:"2025-2026"},
  {id:9, name:"Printemps 2026",   from:"2026-04-20", to:"2026-05-03", type:"printemps", year:"2025-2026"},
  {id:10,name:"Été 2026",         from:"2026-07-04", to:"2026-08-31", type:"ete",       year:"2025-2026"},
];
let vacances=DEFAULT_VACANCES;
let nextVacId=Math.max(...vacances.map(v=>v.id),0)+1;
let editVac=null;
let events=[];
let nextEventId=1;
let nextInfraId=Math.max(...infrastructures.map(i=>i.id),0)+1;
let currentView='week',currentDate=new Date();
let activeFilters=new Set(); // empty = all sites shown
let weekOrientation='normal'; // 'normal' = jours en colonnes, heures en lignes. 'transposed' = inverse
let editEv=null,editInfra=null;

function save(){
  fetch('/api/data',{method:'POST',headers:{'Content-Type':'application/json'},
    body:JSON.stringify({events,infras:infrastructures,assocs:associations,vacances})
  }).catch(err=>console.error('Save error:',err));
}

// ══════════════════════════════════════════
// NAVIGATION
// ══════════════════════════════════════════
function showPage(p){
  document.querySelectorAll('.page').forEach(x=>x.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(x=>x.classList.remove('active'));
  const pageEl=document.getElementById('page-'+p);
  const navEl=document.getElementById('nav-'+p);
  if(pageEl)pageEl.classList.add('active');
  if(navEl)navEl.classList.add('active');
  if(p==='planning')renderCalendar();
  if(p==='stats')renderStats();
  if(p==='infrastructures')renderInfraAdmin();
  if(p==='extraction')initExtractionPage();
  if(p==='associations')renderAssocAdmin();
  if(p==='vacances')renderVacAdmin();
  if(p==='users')renderUsers();
}

// ══════════════════════════════════════════
// CALENDRIER
// ══════════════════════════════════════════
const DAYS=['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
const MONTHS=['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre'];
function weekStart(d){const r=new Date(d);const day=r.getDay();r.setDate(r.getDate()+(day===0?-6:1-day));r.setHours(0,0,0,0);return r;}
function setView(v){currentView=v;document.querySelectorAll('.view-tab').forEach(t=>t.classList.remove('active'));document.getElementById('tab-'+v).classList.add('active');renderCalendar();}
function prevPeriod(){if(currentView==='month')currentDate.setMonth(currentDate.getMonth()-1);else currentDate.setDate(currentDate.getDate()-7);renderCalendar();}
function nextPeriod(){if(currentView==='month')currentDate.setMonth(currentDate.getMonth()+1);else currentDate.setDate(currentDate.getDate()+7);renderCalendar();}
function goToToday(){currentDate=new Date();renderCalendar();}
function renderCalendar(){if(currentView==='week')renderWeek();else if(currentView==='month')renderMonth();else renderList();}
function filteredEvents(){return activeFilters.size===0?events:events.filter(e=>activeFilters.has(e.infraId));}
function getSelectedInfraIds(){return activeFilters.size===0?infrastructures.map(i=>i.id):[...activeFilters];}
function isAllSelected(){return activeFilters.size===0;}

// ── VUE SEMAINE ── avec plage horaire dans les blocs ──
function renderWeek(){
  const ws=weekStart(currentDate);
  const days=Array.from({length:7},(_,i)=>{const d=new Date(ws);d.setDate(ws.getDate()+i);return d;});
  const today=new Date();today.setHours(0,0,0,0);

  // Badge vacances si la semaine est en vacances
  const anyVac=days.some(d=>isInVacances(fmt(d)));
  const vacName=anyVac?vacances.find(v=>days.some(d=>{const ds=fmt(d);return ds>=v.from&&ds<=v.to;})):null;
  const weekLabelSuffix=vacName?` <span style="background:#fff8e1;color:#c47a00;border:1px solid #f9c934;border-radius:20px;padding:1px 9px;font-size:.72rem;font-weight:600;margin-left:.5rem">🏖️ ${esc(vacName.name)}</span>`:'';
  document.getElementById('weekLabel').innerHTML=
    `${days[0].getDate()} ${MONTHS[days[0].getMonth()].slice(0,3)} — ${days[6].getDate()} ${MONTHS[days[6].getMonth()].slice(0,3)} ${days[6].getFullYear()}${weekLabelSuffix}`;

  const evts=filteredEvents();
  const selIds=getSelectedInfraIds();
  const multiSite=!isAllSelected()&&selIds.length>1&&selIds.length<=6;

  if(multiSite){
    renderWeekMultiSite(days,today,evts,selIds);
  } else if(weekOrientation==='transposed'){
    renderWeekTransposed(days,today,evts);
  } else {
    renderWeekNormal(days,today,evts);
  }
}

function toggleOrientation(){
  weekOrientation=weekOrientation==='normal'?'transposed':'normal';
  const btn=document.getElementById('btnOrientation');
  if(btn) btn.textContent=weekOrientation==='normal'?'↻ Jours en lignes':'↻ Heures en colonnes';
  renderCalendar();
}

function renderWeekNormal(days,today,evts){
  const cols='62px repeat(7,1fr)';
  let html=`<div class="calendar-grid">`;
  html+=`<div class="cal-header-row" style="grid-template-columns:${cols}"><div style="width:62px"></div>`;
  days.forEach(d=>{
    const isT=d.getTime()===today.getTime();
    const isV=isInVacances(fmt(d));
    html+=`<div class="cal-day-header ${isT?'today':''}" style="${isV?'background:rgba(249,201,52,.22);':''}">
      ${DAYS[d.getDay()===0?6:d.getDay()-1]}
      <span class="day-num" style="${isV?'color:#c47a00':''}">${d.getDate()}</span>
      ${isV?'<span style="display:block;font-size:.56rem;color:#c47a00;font-weight:600;margin-top:1px">VACANCES</span>':''}
    </div>`;
  });
  html+=`</div><div class="cal-body">`;
  TIME_SLOTS.forEach(slot=>{
    const[h,m]=slot.split(':').map(Number);const q=m/15;
    html+=`<div class="cal-row q${q}" style="grid-template-columns:${cols}">`;
    html+=`<div class="cal-time ${m===0?'hmark':''}">${m===0?slot:(m===30?'·30':'·')}</div>`;
    days.forEach(d=>{
      const ds=fmt(d);
      const isV=isInVacances(ds);
      const ce=evts.filter(e=>e.date===ds&&e.startTime===slot);
      html+=`<div class="cal-cell" style="${isV?'background:rgba(249,201,52,.06);':''}" onclick="openNewEventModalOnCell('${ds}','${slot}')">`;
      ce.forEach(ev=>{
        const inf=infrastructures.find(i=>i.id==ev.infraId);
        const bg=inf?inf.color:'#1b4f8a';const fg=isLight(bg)?'#222':'#fff';
        const sn=inf?(inf.name.includes(' - ')?inf.name.split(' - ').slice(1).join(' - '):inf.name):'?';
        html+=`<div class="event-block" style="background:${bg};color:${fg}" onclick="event.stopPropagation();editEvent(${ev.id})">
          <div class="ev-time">⏱ ${ev.startTime} – ${ev.endTime}</div>
          <div class="ev-title">${esc(ev.title)}</div>
          <div class="ev-meta">${esc(sn)}${ev.assocId?(' · '+esc((associations.find(a=>a.id==ev.assocId)||{name:''}).name)):(ev.responsable?' · '+esc(ev.responsable):'')}</div>
        </div>`;
      });
      html+=`</div>`;
    });
    html+=`</div>`;
  });
  html+=`</div></div>`;
  document.getElementById('calendarContainer').innerHTML=html;
}

function renderWeekMultiSite(days,today,evts,siteIds){
  const sites=siteIds.map(id=>infrastructures.find(i=>i.id===id)).filter(Boolean);
  const nSites=sites.length;
  const cols=`62px repeat(7,1fr)`;
  let html=`<div class="calendar-grid">`;
  // Header row: jour names
  html+=`<div class="cal-header-row" style="grid-template-columns:${cols}"><div style="width:62px"></div>`;
  days.forEach(d=>{
    const isT=d.getTime()===today.getTime();
    const isV=isInVacances(fmt(d));
    html+=`<div class="cal-day-header ${isT?'today':''}" style="${isV?'background:rgba(249,201,52,.22);':''}">
      ${DAYS[d.getDay()===0?6:d.getDay()-1]}
      <span class="day-num" style="${isV?'color:#c47a00':''}">${d.getDate()}</span>
      <div class="multi-site-header">
        ${sites.map(s=>{const sn=s.name.includes(' - ')?s.name.split(' - ').slice(1).join(' - '):s.name;return `<div class="multi-site-col-header" style="background:${s.color};color:${isLight(s.color)?'#222':'#fff'};border-radius:3px;margin:1px;padding:1px 2px;" title="${esc(s.name)}">${esc(sn)}</div>`;}).join('')}
      </div>
    </div>`;
  });
  html+=`</div><div class="cal-body">`;
  TIME_SLOTS.forEach(slot=>{
    const[h,m]=slot.split(':').map(Number);const q=m/15;
    html+=`<div class="cal-row q${q}" style="grid-template-columns:${cols}">`;
    html+=`<div class="cal-time ${m===0?'hmark':''}">${m===0?slot:(m===30?'·30':'·')}</div>`;
    days.forEach(d=>{
      const ds=fmt(d);
      const isV=isInVacances(ds);
      html+=`<div class="cal-cell cal-cell-multi" style="${isV?'background:rgba(249,201,52,.06);':''}padding:0;">`;
      sites.forEach(s=>{
        const ce=evts.filter(e=>e.date===ds&&e.startTime===slot&&e.infraId===s.id);
        html+=`<div class="cal-sub-col" onclick="openNewEventModalOnCell('${ds}','${slot}')">`;
        ce.forEach(ev=>{
          const bg=s.color;const fg=isLight(bg)?'#222':'#fff';
          html+=`<div class="event-block" style="background:${bg};color:${fg};font-size:.6rem;padding:2px 3px" onclick="event.stopPropagation();editEvent(${ev.id})">
            <div class="ev-time" style="font-size:.58rem">⏱ ${ev.startTime}–${ev.endTime}</div>
            <div class="ev-title" style="font-size:.6rem">${esc(ev.title)}</div>
          </div>`;
        });
        html+=`</div>`;
      });
      html+=`</div>`;
    });
    html+=`</div>`;
  });
  html+=`</div></div>`;
  document.getElementById('calendarContainer').innerHTML=html;
}

// ── VUE SEMAINE TRANSPOSÉE (jours en lignes, heures en colonnes) ──
function renderWeekTransposed(days,today,evts){
  // Only show full hours for column headers (too many otherwise)
  const hours=[];
  for(let h=7;h<=22;h++) hours.push(h);

  let html=`<div class="calendar-grid" style="overflow-x:auto">`;
  // Header: empty cell + hour columns
  html+=`<table style="width:100%;border-collapse:collapse;min-width:${hours.length*70+100}px">`;
  html+=`<thead><tr style="background:var(--navy);color:white">`;
  html+=`<th style="padding:.5rem .6rem;text-align:left;font-family:'Syne',sans-serif;font-size:.72rem;min-width:100px;position:sticky;left:0;background:var(--navy);z-index:1">Jour</th>`;
  hours.forEach(h=>{
    html+=`<th style="padding:.4rem .2rem;text-align:center;font-size:.7rem;font-family:'Syne',sans-serif;min-width:70px">${String(h).padStart(2,'0')}:00</th>`;
  });
  html+=`</tr></thead><tbody>`;

  days.forEach(d=>{
    const ds=fmt(d);
    const isT=d.getTime()===today.getTime();
    const isV=isInVacances(ds);
    const bg=isT?'background:#eef4fb;':isV?'background:#fffbee;':'';
    html+=`<tr style="${bg}border-bottom:1px solid var(--border)">`;
    html+=`<td style="padding:.4rem .6rem;font-weight:600;font-size:.8rem;border-right:1px solid var(--border);position:sticky;left:0;${isT?'background:#eef4fb;color:var(--blue)':isV?'background:#fffbee;color:#c47a00':'background:white'};z-index:1">
      ${DAYS[d.getDay()===0?6:d.getDay()-1]} ${d.getDate()} ${MONTHS[d.getMonth()].slice(0,3)}
      ${isV?'<span style="font-size:.6rem;display:block;color:#c47a00">VACANCES</span>':''}
    </td>`;
    hours.forEach(h=>{
      // Gather events that start in this hour (any quarter)
      const hourEvts=evts.filter(e=>e.date===ds&&parseInt(e.startTime.split(':')[0])===h);
      html+=`<td style="padding:2px 2px;border-right:1px solid var(--border);vertical-align:top;cursor:pointer" onclick="openNewEventModalOnCell('${ds}','${String(h).padStart(2,'0')}:00')">`;
      hourEvts.forEach(ev=>{
        const inf=infrastructures.find(i=>i.id==ev.infraId);
        const bg2=inf?inf.color:'#1b4f8a';const fg=isLight(bg2)?'#222':'#fff';
        const sn=inf?(inf.name.includes(' - ')?inf.name.split(' - ').slice(1).join(' - '):inf.name):'?';
        html+=`<div class="event-block" style="background:${bg2};color:${fg};font-size:.6rem;padding:2px 4px" onclick="event.stopPropagation();editEvent(${ev.id})">
          <div style="font-size:.58rem;font-weight:700">${ev.startTime}–${ev.endTime}</div>
          <div style="font-weight:600;font-size:.6rem">${esc(ev.title)}</div>
          <div style="opacity:.8;font-size:.55rem">${esc(sn)}</div>
        </div>`;
      });
      html+=`</td>`;
    });
    html+=`</tr>`;
  });
  html+=`</tbody></table></div>`;
  document.getElementById('calendarContainer').innerHTML=html;
}

// ── VUE MOIS ──
function renderMonth(){
  const yr=currentDate.getFullYear(),mo=currentDate.getMonth();
  document.getElementById('weekLabel').textContent=`${MONTHS[mo]} ${yr}`;
  const sd=weekStart(new Date(yr,mo,1));
  const evts=filteredEvents();const today=new Date();today.setHours(0,0,0,0);
  let html=`<div class="month-grid"><div class="month-header-row">`;
  DAYS.forEach(d=>html+=`<div class="month-day-name">${d}</div>`);
  html+=`</div><div class="month-body">`;
  for(let i=0;i<42;i++){
    const d=new Date(sd);d.setDate(sd.getDate()+i);
    const ds=fmt(d),other=d.getMonth()!==mo,isT=d.getTime()===today.getTime();
    const isV=isInVacances(ds);
    const de=evts.filter(e=>e.date===ds).sort((a,b)=>a.startTime.localeCompare(b.startTime));
    const cellBg=isV?'background:#fffbee;':other?'background:#fafafa;':'';
    html+=`<div class="month-cell" style="${cellBg}" onclick="openNewEventModalOnCell('${ds}','09:00')">`;
    html+=`<div class="day-label" style="${isT?'background:var(--blue);color:white;border-radius:50%':isV?'color:#c47a00;font-weight:700':''}">${d.getDate()}</div>`;
    if(isV&&de.length===0){
      // Nom de la période si pas d'events
      const vn=vacances.find(v=>ds>=v.from&&ds<=v.to);
      if(vn) html+=`<div style="font-size:.6rem;color:#c47a00;font-style:italic;margin-bottom:1px">🏖️ ${esc(vn.name)}</div>`;
    }
    de.slice(0,3).forEach(ev=>{
      const inf=infrastructures.find(i=>i.id==ev.infraId);
      const bg=inf?inf.color:'#1b4f8a';const fg=isLight(bg)?'#222':'#fff';
      html+=`<div class="month-event" style="background:${bg};color:${fg}" onclick="event.stopPropagation();editEvent(${ev.id})">${ev.startTime}–${ev.endTime} ${esc(ev.title)}</div>`;
    });
    if(de.length>3)html+=`<div style="font-size:.62rem;color:var(--muted)">+${de.length-3} autre(s)</div>`;
    html+=`</div>`;
  }
  html+=`</div></div>`;
  document.getElementById('calendarContainer').innerHTML=html;
}

// ── VUE LISTE ──
function renderList(){
  const ws=weekStart(currentDate),we=new Date(ws);we.setDate(ws.getDate()+6);
  document.getElementById('weekLabel').textContent=
    `${ws.getDate()} ${MONTHS[ws.getMonth()].slice(0,3)} — ${we.getDate()} ${MONTHS[we.getMonth()].slice(0,3)}`;
  const evts=filteredEvents().filter(e=>e.date>=fmt(ws)&&e.date<=fmt(we))
    .sort((a,b)=>a.date.localeCompare(b.date)||a.startTime.localeCompare(b.startTime));
  let html=`<div style="background:white;border-radius:14px;box-shadow:var(--shadow);overflow:hidden">
    <table class="list-table"><thead><tr>
      <th>Date</th><th>Horaire</th><th>Durée</th><th>Activité</th><th>Association</th><th>Site</th><th>Responsable</th><th></th>
    </tr></thead><tbody>`;
  if(!evts.length)html+=`<tr><td colspan="8" style="text-align:center;padding:2rem;color:var(--muted)">Aucun créneau cette semaine</td></tr>`;
  evts.forEach(ev=>{
    const inf=infrastructures.find(i=>i.id==ev.infraId);
    const bg=inf?inf.color:'#1b4f8a';const fg=isLight(bg)?'#222':'#fff';
    const dd=new Date(ev.date+'T00:00:00');
    const dur=tmin(ev.endTime)-tmin(ev.startTime);
    const ds=dur>=60?`${Math.floor(dur/60)}h${dur%60?String(dur%60).padStart(2,'0'):''}`:dur+'min';
    const assoc=ev.assocId?associations.find(a=>a.id==ev.assocId):null;
    html+=`<tr>
      <td>${DAYS[dd.getDay()===0?6:dd.getDay()-1]} ${dd.getDate()} ${MONTHS[dd.getMonth()].slice(0,3)}</td>
      <td><strong>${ev.startTime} – ${ev.endTime}</strong></td>
      <td style="color:var(--muted)">${ds}</td>
      <td><strong>${esc(ev.title)}</strong></td>
      <td>${assoc?`<span style="background:${assoc.color};color:${isLight(assoc.color)?'#111':'#fff'};padding:2px 6px;border-radius:12px;font-size:.7rem;white-space:nowrap">${esc(assoc.name)}</span>`:'<span style="color:var(--muted)">—</span>'}</td>
      <td><span style="background:${bg};color:${fg};padding:2px 6px;border-radius:12px;font-size:.7rem;white-space:nowrap">${inf?esc(inf.name):'?'}</span></td>
      <td>${esc(ev.responsable||'')}</td>
      <td><button class="btn" style="font-size:.7rem;padding:3px 6px;background:#eef4fb;color:#1b4f8a;border:none" onclick="editEvent(${ev.id})">✏️</button></td>
    </tr>`;
  });
  html+=`</tbody></table></div>`;
  document.getElementById('calendarContainer').innerHTML=html;
}

// ══════════════════════════════════════════
// EXTRACTION / IMPRESSION
// ══════════════════════════════════════════
function initExtractionPage(){
  // Remplir le select des sites avec groupes parents cliquables
  const sel=document.getElementById('extSite');
  const groups={};
  infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
  let opts=`<option value="all">— Tous les sites —</option>`;
  Object.entries(groups).forEach(([g,arr])=>{
    // Groupe parent sélectionnable (préfixé group: pour le distinguer)
    if(arr.length>1) opts+=`<option value="group:${esc(g)}" style="font-weight:bold;background:#f0f4fa">🏢 ${esc(g)} (${arr.length} sites)</option>`;
    arr.forEach(i=>opts+=`<option value="${i.id}">&nbsp;&nbsp;&nbsp;${esc(i.name)}</option>`);
  });
  sel.innerHTML=opts;
  // Dates par défaut : semaine en cours
  const ws=weekStart(new Date()),we=new Date(ws);we.setDate(ws.getDate()+6);
  document.getElementById('extSiteFrom').value=fmt(ws);
  document.getElementById('extSiteTo').value=fmt(we);
  // Week picker
  document.getElementById('extWeekPicker').value=toWeekValue(new Date());
  // Month picker
  const now=new Date();
  document.getElementById('extMonthPicker').value=`${now.getFullYear()}-${String(now.getMonth()+1).padStart(2,'0')}`;
}

function toWeekValue(d){
  const ws=weekStart(d);
  const yr=ws.getFullYear();
  const wn=getWeekNumber(ws);
  return `${yr}-W${String(wn).padStart(2,'0')}`;
}
function getWeekNumber(d){
  const date=new Date(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate()));
  const dayNum=date.getUTCDay()||7;
  date.setUTCDate(date.getUTCDate()+4-dayNum);
  const yearStart=new Date(Date.UTC(date.getUTCFullYear(),0,1));
  return Math.ceil((((date-yearStart)/86400000)+1)/7);
}

function extractThisWeek(){
  const ws=weekStart(new Date()),we=new Date(ws);we.setDate(ws.getDate()+6);
  buildAndShowExtract(null,fmt(ws),fmt(we),'bysite','Semaine en cours');
}
function extractNextWeek(){
  const ws=weekStart(new Date());ws.setDate(ws.getDate()+7);
  const we=new Date(ws);we.setDate(ws.getDate()+6);
  buildAndShowExtract(null,fmt(ws),fmt(we),'bysite','Semaine prochaine');
}
function extractWeekend(){
  const ws=weekStart(new Date());
  const sat=new Date(ws);sat.setDate(ws.getDate()+5);
  const sun=new Date(ws);sun.setDate(ws.getDate()+6);
  buildAndShowExtract(null,fmt(sat),fmt(sun),'bysite','Week-end en cours');
}
function extractMonth(){
  const val=document.getElementById('extMonthPicker').value;
  if(!val){showToast('Choisissez un mois','error');return;}
  const[yr,mo]=val.split('-').map(Number);
  const from=`${yr}-${String(mo).padStart(2,'0')}-01`;
  const lastDay=new Date(yr,mo,0).getDate();
  const to=`${yr}-${String(mo).padStart(2,'0')}-${lastDay}`;
  buildAndShowExtract(null,from,to,'bysite',`${MONTHS[mo-1]} ${yr}`);
}

function generateExtract(type){
  const from=document.getElementById('extSiteFrom').value;
  const to=document.getElementById('extSiteTo').value;
  const org=document.getElementById('extSiteOrg').value;
  const format=document.getElementById('extFormat').value;
  if(!from||!to){showToast('Choisissez une plage de dates','error');return;}
  if(from>to){showToast('La date de début doit être avant la date de fin','error');return;}
  // Lire sites sélectionnés (avec support groupes parents)
  const sel=document.getElementById('extSite');
  const chosen=[...sel.options].filter(o=>o.selected).map(o=>o.value);
  let infraIds=null;
  if(!chosen.includes('all')){
    const idSet=new Set();
    const groups={};
    infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
    chosen.forEach(v=>{
      if(v.startsWith('group:')){
        const gName=v.slice(6);
        (groups[gName]||[]).forEach(i=>idSet.add(i.id));
      } else {
        idSet.add(Number(v));
      }
    });
    infraIds=[...idSet];
  }
  buildAndShowExtract(infraIds,from,to,org,null,format);
}

function buildAndShowExtract(infraIds,from,to,org,label,format){
  format=format||'table';
  // Filtrer les événements
  let evts=events.filter(e=>e.date>=from&&e.date<=to);
  if(infraIds)evts=evts.filter(e=>infraIds.includes(e.infraId));
  evts.sort((a,b)=>a.date.localeCompare(b.date)||a.startTime.localeCompare(b.startTime));

  const fromD=new Date(from+'T00:00:00'),toD=new Date(to+'T00:00:00');
  const dateStr=from===to
    ?fmtLong(fromD)
    :`du ${fmtLong(fromD)} au ${fmtLong(toD)}`;
  const title=label?`${label} — ${dateStr}`:dateStr;
  document.getElementById('previewTitle').textContent='Aperçu : '+title;

  let html;
  if(format==='graphical'){
    html=buildPrintGraphicalHTML(evts,infraIds,from,to,title);
  } else {
    html=buildPrintHTML(evts,infraIds,from,to,org,title);
  }
  document.getElementById('previewContent').innerHTML=html;
  const prev=document.getElementById('extractPreview');
  prev.classList.add('visible');
  setTimeout(()=>prev.scrollIntoView({behavior:'smooth',block:'start'}),100);
}

function buildPrintHTML(evts,infraIds,from,to,org,title){
  const now=new Date();
  const printedAt=`${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`;

  let html=`<div class="print-header">
    <div class="print-header-left">
      <h1>SportPlan <span>Charenton-le-Pont</span></h1>
      <p>Direction des Sports — Planning des équipements sportifs</p>
    </div>
    <div class="print-header-right">
      <strong>${esc(title)}</strong><br>
      Imprimé le ${printedAt}
    </div>
  </div>`;

  if(!evts.length){
    html+=`<p style="color:var(--muted);font-style:italic;padding:1rem 0">Aucun créneau sur la période sélectionnée.</p>`;
    return html;
  }

  if(org==='bysite'){
    // Grouper par site
    const siteIds=infraIds||[...new Set(evts.map(e=>e.infraId))];
    infrastructures.filter(i=>siteIds.includes(i.id)||evts.some(e=>e.infraId==i.id)).forEach(inf=>{
      const siteEvts=evts.filter(e=>e.infraId==inf.id).sort((a,b)=>a.date.localeCompare(b.date)||a.startTime.localeCompare(b.startTime));
      if(!siteEvts.length)return;
      html+=`<div class="print-site-block">
        <div class="print-site-title" style="background:${inf.color};${isLight(inf.color)?'color:#111':'color:#fff'}">
          ${esc(inf.name)}
          <span style="font-size:.75em;opacity:.85;margin-left:.5em">(${siteEvts.length} créneau${siteEvts.length>1?'x':''})</span>
        </div>
        <table class="print-site-table">
          <thead><tr><th>Date</th><th>Jour</th><th>Horaire</th><th>Durée</th><th>Association</th><th>Activité</th><th>Responsable</th><th>Public</th><th>Notes</th></tr></thead>
          <tbody>`;
      let lastDate='';
      siteEvts.forEach(ev=>{
        const dd=new Date(ev.date+'T00:00:00');
        const dur=tmin(ev.endTime)-tmin(ev.startTime);
        const durs=dur>=60?`${Math.floor(dur/60)}h${dur%60?String(dur%60).padStart(2,'0'):''}`:dur+'min';
        const assocName=ev.assocId?(associations.find(a=>a.id==ev.assocId)||{name:'—'}).name:'—';
        if(ev.date!==lastDate&&siteEvts.length>4){
          html+=`<tr><td colspan="9" class="print-date-separator">📅 ${fmtLong(dd)}</td></tr>`;
          lastDate=ev.date;
        }
        html+=`<tr>
          <td>${ev.date.split('-').reverse().join('/')}</td>
          <td>${DAYS[dd.getDay()===0?6:dd.getDay()-1]}</td>
          <td><strong>${ev.startTime} – ${ev.endTime}</strong></td>
          <td>${durs}</td>
          <td>${esc(assocName)}</td>
          <td><strong>${esc(ev.title)}</strong></td>
          <td>${esc(ev.responsable||'—')}</td>
          <td>${esc(ev.public||'—')}</td>
          <td style="font-size:.75rem;color:#666">${esc(ev.notes||'')}</td>
        </tr>`;
      });
      html+=`</tbody></table></div>`;
    });
  } else {
    // Grouper par date
    const dates=[...new Set(evts.map(e=>e.date))].sort();
    dates.forEach(date=>{
      const dd=new Date(date+'T00:00:00');
      const dayEvts=evts.filter(e=>e.date===date).sort((a,b)=>a.startTime.localeCompare(b.startTime));
      html+=`<div class="print-site-block">
        <div class="print-site-title" style="background:#0d1b2a;color:white">
          📅 ${fmtLong(dd)}
          <span style="font-size:.75em;opacity:.85;margin-left:.5em">(${dayEvts.length} créneau${dayEvts.length>1?'x':''})</span>
        </div>
        <table class="print-site-table">
          <thead><tr><th>Horaire</th><th>Durée</th><th>Association</th><th>Site</th><th>Activité</th><th>Responsable</th><th>Public</th><th>Notes</th></tr></thead>
          <tbody>`;
      let lastSite='';
      dayEvts.forEach(ev=>{
        const inf=infrastructures.find(i=>i.id==ev.infraId);
        const bg=inf?inf.color:'#ccc';
        const dur=tmin(ev.endTime)-tmin(ev.startTime);
        const durs=dur>=60?`${Math.floor(dur/60)}h${dur%60?String(dur%60).padStart(2,'0'):''}`:dur+'min';
        const assocName=ev.assocId?(associations.find(a=>a.id==ev.assocId)||{name:'—'}).name:'—';
        html+=`<tr>
          <td><strong>${ev.startTime} – ${ev.endTime}</strong></td>
          <td>${durs}</td>
          <td>${esc(assocName)}</td>
          <td><span class="print-color-dot" style="background:${bg}"></span>${inf?esc(inf.name):'?'}</td>
          <td><strong>${esc(ev.title)}</strong></td>
          <td>${esc(ev.responsable||'—')}</td>
          <td>${esc(ev.public||'—')}</td>
          <td style="font-size:.75rem;color:#666">${esc(ev.notes||'')}</td>
        </tr>`;
      });
      html+=`</tbody></table></div>`;
    });
  }
  return html;
}

function buildPrintGraphicalHTML(evts,infraIds,from,to,title){
  const now=new Date();
  const printedAt=`${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}`;
  let html=`<div class="print-header">
    <div class="print-header-left">
      <h1>SportPlan <span>Charenton-le-Pont</span></h1>
      <p>Direction des Sports — Planning des équipements sportifs</p>
    </div>
    <div class="print-header-right">
      <strong>${esc(title)}</strong><br>
      Imprimé le ${printedAt}
    </div>
  </div>`;

  if(!evts.length){
    html+=`<p style="color:var(--muted);font-style:italic;padding:1rem 0">Aucun créneau sur la période sélectionnée.</p>`;
    return html;
  }

  // Group events by week
  const fromD=new Date(from+'T00:00:00');
  const toD=new Date(to+'T00:00:00');
  let weekStartDate=weekStart(fromD);
  const siteIds=infraIds||[...new Set(evts.map(e=>e.infraId))];
  const sites=siteIds.map(id=>infrastructures.find(i=>i.id===id)).filter(Boolean);

  while(weekStartDate<=toD){
    const days=Array.from({length:7},(_,i)=>{const d=new Date(weekStartDate);d.setDate(weekStartDate.getDate()+i);return d;});
    const weekEvts=evts.filter(e=>{const ds=e.date;return ds>=fmt(days[0])&&ds<=fmt(days[6]);});
    if(weekEvts.length>0){
      html+=`<div class="print-site-block">`;
      html+=`<div class="print-site-title" style="background:var(--navy);color:white">📅 Semaine du ${days[0].getDate()} ${MONTHS[days[0].getMonth()]} au ${days[6].getDate()} ${MONTHS[days[6].getMonth()]} ${days[6].getFullYear()}</div>`;

      // Find min/max hours for this week
      let minH=22,maxH=7;
      weekEvts.forEach(e=>{
        const sh=parseInt(e.startTime.split(':')[0]);
        const eh=parseInt(e.endTime.split(':')[0]);
        if(sh<minH)minH=sh;
        if(eh>maxH)maxH=eh;
      });
      if(minH>maxH){minH=7;maxH=22;}

      html+=`<table class="print-planning-grid"><thead><tr><th style="width:45px">Heure</th>`;
      days.forEach(d=>{
        const isV=isInVacances(fmt(d));
        html+=`<th style="${isV?'background:#c47a00;':''}">
          ${DAYS[d.getDay()===0?6:d.getDay()-1]} ${d.getDate()}/${d.getMonth()+1}
          ${isV?'<br><span style="font-size:.55rem">VACANCES</span>':''}
        </th>`;
      });
      html+=`</tr></thead><tbody>`;

      for(let h=minH;h<=maxH;h++){
        for(let m=0;m<60;m+=30){
          const slot=`${String(h).padStart(2,'0')}:${String(m).padStart(2,'0')}`;
          html+=`<tr><td class="time-col">${m===0?slot:''}</td>`;
          days.forEach(d=>{
            const ds=fmt(d);
            // Events starting at this slot or overlapping 30-min slots
            const slotMin=h*60+m;
            const ce=weekEvts.filter(e=>e.date===ds&&tmin(e.startTime)>=slotMin&&tmin(e.startTime)<slotMin+30);
            html+=`<td>`;
            ce.forEach(ev=>{
              const inf=sites.find(s=>s.id===ev.infraId)||infrastructures.find(i=>i.id===ev.infraId);
              const bg=inf?inf.color:'#1b4f8a';const fg=isLight(bg)?'#222':'#fff';
              const sn=inf?(inf.name.includes(' - ')?inf.name.split(' - ').slice(1).join(' - '):inf.name):'';
              const assoc=ev.assocId?associations.find(a=>a.id===ev.assocId):null;
              html+=`<div class="print-ev-block" style="background:${bg};color:${fg}">
                <strong>${ev.startTime}–${ev.endTime}</strong> ${esc(ev.title)}
                ${sn?`<br>${esc(sn)}`:''}${assoc?` · ${esc(assoc.name)}`:''}
              </div>`;
            });
            html+=`</td>`;
          });
          html+=`</tr>`;
        }
      }
      html+=`</tbody></table></div>`;
    }
    weekStartDate.setDate(weekStartDate.getDate()+7);
  }
  return html;
}

function printExtract(){
  const content=document.getElementById('previewContent').innerHTML;
  document.getElementById('printArea').innerHTML=content;
  document.getElementById('printArea').style.display='block';
  window.print();
  setTimeout(()=>{
    document.getElementById('printArea').style.display='none';
    document.getElementById('printArea').innerHTML='';
  },1000);
}

// ══════════════════════════════════════════
// CRUD ÉVÉNEMENTS
// ══════════════════════════════════════════
function fillTimeSelects(sv,ev2){
  const ss=document.getElementById('evStart'),se=document.getElementById('evEnd');
  ss.innerHTML=TIME_SLOTS.map(t=>`<option value="${t}" ${t===sv?'selected':''}>${t}</option>`).join('');
  se.innerHTML=TIME_SLOTS.map(t=>`<option value="${t}" ${t===ev2?'selected':''}>${t}</option>`).join('');
}
function fillAssocSelect(selId){
  const cats={};
  associations.sort((a,b)=>a.name.localeCompare(b.name,'fr')).forEach(a=>{
    if(!cats[a.cat])cats[a.cat]=[];cats[a.cat].push(a);
  });
  let html=`<option value="">— Aucune / Libre —</option>`;
  Object.entries(cats).sort((a,b)=>a[0].localeCompare(b[0],'fr')).forEach(([cat,arr])=>{
    html+=`<optgroup label="${esc(cat)}">`;
    arr.forEach(a=>html+=`<option value="${a.id}" ${a.id==selId?'selected':''}>${esc(a.name)}</option>`);
    html+=`</optgroup>`;
  });
  document.getElementById('evAssoc').innerHTML=html;
}
function fillInfraSelect(sel){
  const groups={};
  infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
  document.getElementById('evInfra').innerHTML=Object.entries(groups).map(([g,arr])=>
    `<optgroup label="${esc(g)}">${arr.map(i=>`<option value="${i.id}" ${i.id==sel?'selected':''}>${esc(i.name)}</option>`).join('')}</optgroup>`
  ).join('');
}
function openNewEventModal(){
  if(!canEdit())return;
  editEv=null;
  document.getElementById('modalTitle').textContent='Nouveau créneau';
  document.getElementById('btnDelEv').style.display='none';
  document.getElementById('evModalFooterNormal').style.display='flex';
  document.getElementById('evModalFooterConfirm').style.display='none';
  ['evTitle','evResponsable','evPublic','evNotes'].forEach(id=>document.getElementById(id).value='');
  document.getElementById('evDate').value=fmt(new Date());
  document.getElementById('evRecurrence').value='none';
  document.getElementById('recEndGroup').style.display='none';
  document.getElementById('recMultidayGroup').style.display='none';
  fillTimeSelects('09:00','10:00');
  fillInfraSelect(infrastructures[0]?.id);
  fillAssocSelect('');
  openModal('eventModal');
}
function openNewEventModalOnCell(date,time){
  openNewEventModal();
  document.getElementById('evDate').value=date;
  const snap=TIME_SLOTS.includes(time)?time:TIME_SLOTS[0];
  const ei=Math.min(TIME_SLOTS.indexOf(snap)+4,TIME_SLOTS.length-1);
  fillTimeSelects(snap,TIME_SLOTS[ei]);
}
function editEvent(id){
  if(!canEdit())return;
  const ev=events.find(e=>e.id==id);if(!ev)return;
  editEv=id;
  document.getElementById('modalTitle').textContent='Modifier le créneau';
  document.getElementById('btnDelEv').style.display='block';
  document.getElementById('evTitle').value=ev.title;
  document.getElementById('evDate').value=ev.date;
  document.getElementById('evResponsable').value=ev.responsable||'';
  document.getElementById('evPublic').value=ev.public||'';
  document.getElementById('evNotes').value=ev.notes||'';
  document.getElementById('evRecurrence').value='none';
  document.getElementById('recEndGroup').style.display='none';
  document.getElementById('recMultidayGroup').style.display='none';
  fillTimeSelects(ev.startTime,ev.endTime);
  fillInfraSelect(ev.infraId);
  fillAssocSelect(ev.assocId||'');
  openModal('eventModal');
}
function saveEvent(){
  const title=document.getElementById('evTitle').value.trim();
  const infraId=parseInt(document.getElementById('evInfra').value);
  const date=document.getElementById('evDate').value;
  const startTime=document.getElementById('evStart').value;
  const endTime=document.getElementById('evEnd').value;
  if(!title||!date||!startTime||!endTime){showToast('Champs obligatoires manquants','error');return;}
  if(tmin(startTime)>=tmin(endTime)){showToast("L'heure de fin doit être après l'heure de début",'error');return;}

  const rec=document.getElementById('evRecurrence').value;
  const baseFields={infraId,title,
    assocId:parseInt(document.getElementById('evAssoc').value)||null,
    responsable:document.getElementById('evResponsable').value.trim(),
    public:document.getElementById('evPublic').value.trim(),
    notes:document.getElementById('evNotes').value.trim()};

  if(editEv){
    // Edition simple : on ne touche pas à la récurrence
    events[events.findIndex(e=>e.id==editEv)]={...baseFields,date,startTime,endTime,id:editEv};
    save();updateSidebar();renderCalendar();closeModal('eventModal');showToast('Créneau enregistré ✓','success');
    return;
  }

  const toCreate=[];

  if(rec==='none'){
    toCreate.push({...baseFields,date,startTime,endTime});

  } else if(rec==='weekly'||rec==='biweekly'){
    const recEnd=document.getElementById('evRecEnd').value;
    if(!recEnd){
      // Pas de date de fin → on crée au moins le créneau unique et on prévient
      toCreate.push({...baseFields,date,startTime,endTime});
      showToast('⚠️ Date de fin manquante : seul le premier créneau a été créé','error');
      events.push({...toCreate[0],id:nextEventId++});
      save();updateSidebar();renderCalendar();closeModal('eventModal');
      return;
    }
    if(recEnd<date){showToast('La date de fin doit être après la date de début','error');return;}
    const vacMode=document.getElementById('evVacMode').value;
    const step=rec==='weekly'?7:14;
    let d=new Date(date+'T00:00:00');
    const ed=new Date(recEnd+'T00:00:00');
    while(d<=ed){
      const ds=fmt(d);
      const inVac=isInVacances(ds);
      const keep=(vacMode==='ignore')||(vacMode==='exclude'&&!inVac)||(vacMode==='only'&&inVac);
      if(keep) toCreate.push({...baseFields,date:ds,startTime,endTime});
      d.setDate(d.getDate()+step);
    }

  } else if(rec==='multiday'){
    const recEnd=document.getElementById('evRecEndMulti').value;
    const selDays=getRecDaysSelection();
    const vacMode=document.getElementById('evVacModeMulti').value;
    if(!recEnd){showToast('Veuillez saisir une date de fin','error');return;}
    if(recEnd<date){showToast('La date de fin doit être après la date de début','error');return;}
    if(!selDays.length){showToast('Cochez au moins un jour','error');return;}
    for(const sd of selDays){
      if(tmin(sd.start)>=tmin(sd.end)){
        const DN=['','Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
        showToast(`Horaires invalides pour ${DN[sd.day]}`,'error');return;
      }
    }
    function jsDay(d){const x=d.getDay();return x===0?7:x;}
    let cur=new Date(date+'T00:00:00');
    const endD=new Date(recEnd+'T00:00:00');
    while(cur<=endD){
      const jd=jsDay(cur);

      const ds=fmt(cur);
      const match=selDays.find(s=>s.day===jd);
      if(match){
        const inVac=isInVacances(ds);
        const keep=(vacMode==='ignore')||(vacMode==='exclude'&&!inVac)||(vacMode==='only'&&inVac);
        if(keep) toCreate.push({...baseFields,date:ds,startTime:match.start,endTime:match.end});
      }
      cur.setDate(cur.getDate()+1);
    }
  }

  if(!toCreate.length){showToast('Aucun créneau à créer avec ces paramètres','error');return;}
  toCreate.forEach(ev=>{events.push({...ev,id:nextEventId++});});
  save();updateSidebar();renderCalendar();closeModal('eventModal');
  showToast(toCreate.length>1?`${toCreate.length} créneaux créés ✓`:'Créneau enregistré ✓','success');
}
function askDeleteEvent(){
  document.getElementById('evModalFooterNormal').style.display='none';
  document.getElementById('evModalFooterConfirm').style.display='flex';
}
function cancelDeleteEvent(){
  document.getElementById('evModalFooterNormal').style.display='flex';
  document.getElementById('evModalFooterConfirm').style.display='none';
}
function deleteCurrentEvent(){
  if(!editEv)return;
  events=events.filter(e=>e.id!=editEv);
  save();updateSidebar();renderCalendar();closeModal('eventModal');
  showToast('Créneau supprimé','error');
}
document.getElementById('evRecurrence').addEventListener('change',function(){
  const v=this.value;
  document.getElementById('recEndGroup').style.display=(v==='weekly'||v==='biweekly')?'block':'none';
  document.getElementById('recMultidayGroup').style.display=(v==='multiday')?'block':'none';
  if(v==='multiday') buildRecDaysUI();
});

function buildRecDaysUI(selectedDays){
  // selectedDays: [{day:1, start:'09:00', end:'10:00'}, ...]  (1=Lun…7=Dim)
  const DAY_NAMES=[{n:'Lun',d:1},{n:'Mar',d:2},{n:'Mer',d:3},{n:'Jeu',d:4},{n:'Ven',d:5},{n:'Sam',d:6},{n:'Dim',d:7}];
  const curStart=document.getElementById('evStart').value||'09:00';
  const curEnd=document.getElementById('evEnd').value||'10:00';
  let html='';
  DAY_NAMES.forEach(({n,d})=>{
    const sel=selectedDays?selectedDays.find(x=>x.day===d):null;
    const checked=sel?'checked':'';
    const s=sel?sel.start:curStart;
    const e=sel?sel.end:curEnd;
    const timeOpts=TIME_SLOTS.map(t=>`<option value="${t}">${t}</option>`).join('');
    html+=`<div class="rec-day-row" id="recrow-${d}">
      <label class="rec-day-check">
        <input type="checkbox" id="recday-${d}" value="${d}" ${checked} onchange="toggleRecDay(${d})">
        <span class="day-label-text">${n}</span>
      </label>
      <select class="rec-day-selects" id="recstart-${d}" ${!checked?'disabled':''} style="opacity:${checked?1:.4}">${TIME_SLOTS.map(t=>`<option value="${t}" ${t===s?'selected':''}>${t}</option>`).join('')}</select>
      <select class="rec-day-selects" id="recend-${d}" ${!checked?'disabled':''} style="opacity:${checked?1:.4}">${TIME_SLOTS.map(t=>`<option value="${t}" ${t===e?'selected':''}>${t}</option>`).join('')}</select>
    </div>`;
  });
  document.getElementById('recDaysContainer').innerHTML=html;
}

function toggleRecDay(d){
  const cb=document.getElementById('recday-'+d);
  const ss=document.getElementById('recstart-'+d);
  const se=document.getElementById('recend-'+d);
  ss.disabled=!cb.checked; ss.style.opacity=cb.checked?1:.4;
  se.disabled=!cb.checked; se.style.opacity=cb.checked?1:.4;
}

function getRecDaysSelection(){
  const rows=[1,2,3,4,5,6,7];
  return rows.filter(d=>document.getElementById('recday-'+d)?.checked).map(d=>({
    day:d,
    start:document.getElementById('recstart-'+d).value,
    end:document.getElementById('recend-'+d).value
  }));
}

// ══════════════════════════════════════════
// CRUD INFRASTRUCTURES
// ══════════════════════════════════════════
function openInfraModal(id){
  if(!canEdit())return;
  editInfra=id||null;
  const inf=id?infrastructures.find(i=>i.id==id):null;
  document.getElementById('infraModalTitle').textContent=inf?'Modifier le site':'Nouveau site';
  document.getElementById('btnDelInfra').style.display=inf?'block':'none';
  document.getElementById('infraName').value=inf?inf.name:'';
  document.getElementById('infraType').value=inf?inf.type:'Gymnase';
  document.getElementById('infraColor').value=inf?inf.color:'#1b4f8a';
  document.getElementById('infraCapacity').value=inf?inf.capacity:'';
  document.getElementById('infraGroup').value=inf?(inf.group||''):'';
  document.getElementById('infraAddress').value=inf?inf.address:'';
  openModal('infraModal');
}
function saveInfra(){
  if(!canEdit())return;
  const name=document.getElementById('infraName').value.trim();
  if(!name){showToast('Nom requis','error');return;}
  const data={name,type:document.getElementById('infraType').value,
    color:document.getElementById('infraColor').value,
    capacity:parseInt(document.getElementById('infraCapacity').value)||0,
    group:document.getElementById('infraGroup').value.trim()||name,
    address:document.getElementById('infraAddress').value.trim()};
  if(editInfra){infrastructures[infrastructures.findIndex(i=>i.id==editInfra)]={...data,id:editInfra};}
  else infrastructures.push({...data,id:nextInfraId++});
  save();updateSidebar();renderInfraAdmin();closeModal('infraModal');showToast('Site enregistré ✓','success');
}
function deleteCurrentInfra(){
  if(!editInfra)return;
  const has=events.some(e=>e.infraId==editInfra);
  if(!confirm(has?'Des créneaux sont associés. Supprimer quand même ?':'Supprimer ce site ?'))return;
  infrastructures=infrastructures.filter(i=>i.id!=editInfra);
  if(has)events=events.filter(e=>e.infraId!=editInfra);
  save();updateSidebar();renderInfraAdmin();closeModal('infraModal');showToast('Site supprimé','error');
}
function renderInfraAdmin(){
  const groups={};
  infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
  let html='';
  Object.entries(groups).forEach(([g,arr])=>{
    arr.forEach(i=>{
      const cnt=events.filter(e=>e.infraId==i.id).length;
      html+=`<div class="infra-card" style="border-top-color:${i.color}">
        <h3>${esc(i.name)}</h3>
        <p>${i.type}${i.capacity?' · '+i.capacity+' pers.':''}</p>
        <p style="font-size:.72rem;color:#999;margin-top:2px">${esc(i.group||'')}</p>
        <p style="margin-top:5px;color:var(--blue);font-weight:500">${cnt} créneau(x)</p>
        <div class="infra-actions">
          <button class="btn" style="font-size:.76rem;background:#eef4fb;color:#1b4f8a;border:none" onclick="openInfraModal(${i.id})">✏️ Modifier</button>
        </div>
      </div>`;
    });
  });
  html+=`<div class="infra-card" style="border-top-color:#dde3ec;cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:120px" onclick="openInfraModal()">
    <div style="text-align:center;color:var(--muted)"><div style="font-size:1.75rem">＋</div><div style="font-size:.79rem;margin-top:3px">Ajouter un site</div></div>
  </div>`;
  document.getElementById('infraAdminGrid').innerHTML=html;
}

// ══════════════════════════════════════════
// HELPERS VACANCES
// ══════════════════════════════════════════
function isInVacances(dateStr){
  return vacances.some(v=>dateStr>=v.from&&dateStr<=v.to);
}
function filterByVacMode(dates, vacMode){
  if(vacMode==='exclude') return dates.filter(d=>!isInVacances(d));
  if(vacMode==='only')    return dates.filter(d=>isInVacances(d));
  return dates;
}
function dateRange(from, to){
  const dates=[];
  let d=new Date(from+'T00:00:00');
  const ed=new Date(to+'T00:00:00');
  while(d<=ed){dates.push(fmt(d));d.setDate(d.getDate()+1);}
  return dates;
}

// ── CRUD VACANCES ──
function openVacModal(id){
  if(!canEdit())return;
  editVac=id||null;
  const v=id?vacances.find(x=>x.id==id):null;
  document.getElementById('vacModalTitle').textContent=v?'Modifier la période':'Nouvelle période de vacances';
  document.getElementById('btnDelVac').style.display=v?'block':'none';
  document.getElementById('vacName').value=v?v.name:'';
  document.getElementById('vacFrom').value=v?v.from:'';
  document.getElementById('vacTo').value=v?v.to:'';
  document.getElementById('vacType').value=v?v.type:'toussaint';
  document.getElementById('vacYear').value=v?v.year:'';
  openModal('vacModal');
}
function resetVacances(){
  if(!confirm('Réinitialiser toutes les vacances avec les dates Zone C par défaut ? Vos modifications seront perdues.'))return;
  vacances=JSON.parse(JSON.stringify(DEFAULT_VACANCES));
  nextVacId=Math.max(...vacances.map(v=>v.id),0)+1;
  save();renderVacAdmin();renderCalendar();
  showToast('Vacances réinitialisées ✓','success');
}
function diagVacances(){
  let msg='Dates stockées en mémoire :\n\n';
  vacances.forEach(v=>{
    msg+=`[id:${v.id}] ${v.name}\n  from: "${v.from}"  to: "${v.to}"\n\n`;
  });
  // Test spécifique 4 mai 2026
  msg+=`\n--- TEST ---\n`;
  msg+=`isInVacances("2026-05-03") = ${isInVacances("2026-05-03")}\n`;
  msg+=`isInVacances("2026-05-04") = ${isInVacances("2026-05-04")}\n`;
  msg+=`isInVacances("2026-04-20") = ${isInVacances("2026-04-20")}`;
  alert(msg);
}
function normalizeDate(d){
  if(!d)return '';
  // Accepte YYYY-MM-DD, DD/MM/YYYY, DD/MM/YY
  if(/^\d{4}-\d{2}-\d{2}$/.test(d))return d;
  const parts=d.split('/');
  if(parts.length===3){
    let[day,month,year]=parts;
    if(year.length===2)year='20'+year;
    return `${year}-${month.padStart(2,'0')}-${day.padStart(2,'0')}`;
  }
  return d;
}
function saveVac(){
  if(!canEdit())return;
  const name=document.getElementById('vacName').value.trim();
  const from=normalizeDate(document.getElementById('vacFrom').value);
  const to=normalizeDate(document.getElementById('vacTo').value);
  if(!name||!from||!to){showToast('Nom et dates obligatoires','error');return;}
  if(from>to){showToast('La date de début doit être avant la date de fin','error');return;}
  const data={name,from,to,type:document.getElementById('vacType').value,year:document.getElementById('vacYear').value.trim()};
  if(editVac){vacances[vacances.findIndex(v=>v.id==editVac)]={...data,id:editVac};}
  else vacances.push({...data,id:nextVacId++});
  save();renderVacAdmin();renderCalendar();closeModal('vacModal');showToast('Période enregistrée ✓','success');
}
function deleteCurrentVac(){
  if(!editVac)return;
  if(!confirm('Supprimer cette période de vacances ?'))return;
  vacances=vacances.filter(v=>v.id!=editVac);
  save();renderVacAdmin();renderCalendar();closeModal('vacModal');showToast('Période supprimée','error');
}
function renderVacAdmin(){
  const sorted=[...vacances].sort((a,b)=>a.from.localeCompare(b.from));
  const byYear={};
  sorted.forEach(v=>{const y=v.year||'Sans année';if(!byYear[y])byYear[y]=[];byYear[y].push(v);});

  let html='';
  Object.entries(byYear).sort((a,b)=>b[0].localeCompare(a[0])).forEach(([yr,arr])=>{
    html+=`<div style="grid-column:1/-1;font-family:'Syne',sans-serif;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);padding:.2rem 0 .4rem;border-bottom:1px solid var(--border);margin-bottom:-.2rem">Année scolaire ${esc(yr)}</div>`;
    arr.forEach(v=>{
      const fd=new Date(v.from+'T00:00:00'),td=new Date(v.to+'T00:00:00');
      const days=Math.round((td-fd)/86400000)+1;
      const label=VAC_TYPES[v.type]||'📅 Autre';
      html+=`<div class="vac-card">
        <div class="vac-badge">${label}</div>
        <h3>${esc(v.name)}</h3>
        <div class="vac-dates">
          Du <strong>${fd.getDate()} ${MONTHS[fd.getMonth()]} ${fd.getFullYear()}</strong>
          au <strong>${td.getDate()} ${MONTHS[td.getMonth()]} ${td.getFullYear()}</strong>
        </div>
        <div style="font-size:.78rem;color:var(--blue);margin-top:4px">${days} jour(s)</div>
        <div class="infra-actions" style="margin-top:.65rem">
          <button class="btn" style="font-size:.76rem;background:#fffbee;color:#7a5500;border:1px solid #f9c934" onclick="openVacModal(${v.id})">✏️ Modifier</button>
        </div>
      </div>`;
    });
  });
  html+=`<div class="vac-card" style="border-top-color:#dde3ec;cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:110px" onclick="openVacModal()">
    <div style="text-align:center;color:var(--muted)"><div style="font-size:1.75rem">＋</div><div style="font-size:.79rem;margin-top:3px">Ajouter une période</div></div>
  </div>`;
  document.getElementById('vacAdminGrid').innerHTML=html;
}

// ══════════════════════════════════════════
// CRUD ASSOCIATIONS
// ══════════════════════════════════════════
function openAssocModal(id){
  if(!canEdit())return;
  editAssoc=id||null;
  const a=id?associations.find(x=>x.id==id):null;
  document.getElementById('assocModalTitle').textContent=a?'Modifier l\'association':'Nouvelle association';
  document.getElementById('btnDelAssoc').style.display=a?'block':'none';
  document.getElementById('assocName').value=a?a.name:'';
  document.getElementById('assocCat').value=a?a.cat:'Sports collectifs';
  document.getElementById('assocColor').value=a?a.color:'#1b4f8a';
  document.getElementById('assocContact').value=a?a.contact:'';
  document.getElementById('assocPhone').value=a?a.phone:'';
  document.getElementById('assocEmail').value=a?a.email:'';
  document.getElementById('assocNotes').value=a?a.notes:'';
  openModal('assocModal');
}
function saveAssoc(){
  if(!canEdit())return;
  const name=document.getElementById('assocName').value.trim();
  if(!name){showToast('Nom requis','error');return;}
  const data={name,
    cat:document.getElementById('assocCat').value,
    color:document.getElementById('assocColor').value,
    contact:document.getElementById('assocContact').value.trim(),
    phone:document.getElementById('assocPhone').value.trim(),
    email:document.getElementById('assocEmail').value.trim(),
    notes:document.getElementById('assocNotes').value.trim()};
  if(editAssoc){associations[associations.findIndex(a=>a.id==editAssoc)]={...data,id:editAssoc};}
  else associations.push({...data,id:nextAssocId++});
  save();renderAssocAdmin();closeModal('assocModal');showToast('Association enregistrée ✓','success');
}
function deleteCurrentAssoc(){
  if(!editAssoc)return;
  const has=events.some(e=>e.assocId==editAssoc);
  if(!confirm(has?'Des créneaux utilisent cette association. Supprimer quand même ?':'Supprimer cette association ?'))return;
  associations=associations.filter(a=>a.id!=editAssoc);
  if(has)events.forEach(e=>{if(e.assocId==editAssoc)e.assocId=null;});
  save();renderAssocAdmin();closeModal('assocModal');showToast('Association supprimée','error');
}
function renderAssocAdmin(){
  const q=(document.getElementById('assocSearch')?.value||'').toLowerCase();
  const cats={};
  const sorted=[...associations].sort((a,b)=>a.name.localeCompare(b.name,'fr'));
  sorted.filter(a=>!q||a.name.toLowerCase().includes(q)||a.cat.toLowerCase().includes(q)).forEach(a=>{
    if(!cats[a.cat])cats[a.cat]=[];cats[a.cat].push(a);
  });
  const total=associations.length;
  const filtered=Object.values(cats).flat().length;
  document.getElementById('assocSummary').textContent=q
    ?`${filtered} résultat(s) sur ${total} associations`
    :`${total} associations réparties en ${Object.keys(cats).length} catégories`;

  let html='';
  if(!Object.keys(cats).length){
    html=`<div style="grid-column:1/-1;text-align:center;padding:3rem;color:var(--muted)">Aucune association trouvée</div>`;
  }
  Object.entries(cats).sort((a,b)=>a[0].localeCompare(b[0],'fr')).forEach(([cat,arr])=>{
    html+=`<div style="grid-column:1/-1;font-family:'Syne',sans-serif;font-size:.75rem;font-weight:700;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);padding:.2rem 0 .4rem;border-bottom:1px solid var(--border);margin-bottom:-.2rem">${esc(cat)}</div>`;
    arr.forEach(a=>{
      const cnt=events.filter(e=>e.assocId==a.id).length;
      const fg=isLight(a.color)?'#111':'#fff';
      html+=`<div class="infra-card" style="border-top-color:${a.color}">
        <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:4px">
          <span style="background:${a.color};color:${fg};border-radius:6px;padding:2px 8px;font-size:.72rem;font-weight:700">${esc(a.cat.split('/')[0].trim())}</span>
        </div>
        <h3>${esc(a.name)}</h3>
        ${a.contact?`<p>👤 ${esc(a.contact)}</p>`:''}
        ${a.phone?`<p>📞 ${esc(a.phone)}</p>`:''}
        ${a.email?`<p style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">✉️ ${esc(a.email)}</p>`:''}
        <p style="margin-top:5px;color:var(--blue);font-weight:500">${cnt} créneau(x)</p>
        <div class="infra-actions">
          <button class="btn" style="font-size:.76rem;background:#eef4fb;color:#1b4f8a;border:none" onclick="openAssocModal(${a.id})">✏️ Modifier</button>
        </div>
      </div>`;
    });
  });
  html+=`<div class="infra-card" style="border-top-color:#dde3ec;cursor:pointer;display:flex;align-items:center;justify-content:center;min-height:120px" onclick="openAssocModal()">
    <div style="text-align:center;color:var(--muted)"><div style="font-size:1.75rem">＋</div><div style="font-size:.79rem;margin-top:3px">Ajouter une association</div></div>
  </div>`;
  document.getElementById('assocAdminGrid').innerHTML=html;
}

// ══════════════════════════════════════════
// STATS
// ══════════════════════════════════════════
function renderStats(){
  let totalH=0;events.forEach(e=>{totalH+=(tmin(e.endTime)-tmin(e.startTime))/60;});
  const ws=weekStart(new Date()),we=new Date(ws);we.setDate(ws.getDate()+6);
  const tw=events.filter(e=>e.date>=fmt(ws)&&e.date<=fmt(we)).length;
  document.getElementById('statsGrid').innerHTML=`
    <div class="stat-card" style="border-left-color:#1b4f8a"><div class="stat-label">Total créneaux</div><div class="stat-value">${events.length}</div><div class="stat-sub">Tous temps confondus</div></div>
    <div class="stat-card" style="border-left-color:#e8a020"><div class="stat-label">Cette semaine</div><div class="stat-value">${tw}</div><div class="stat-sub">Créneaux planifiés</div></div>
    <div class="stat-card" style="border-left-color:#2e8b57"><div class="stat-label">Heures planifiées</div><div class="stat-value">${Math.round(totalH)}</div><div class="stat-sub">Total cumulé</div></div>
    <div class="stat-card" style="border-left-color:#8e44ad"><div class="stat-label">Sites actifs</div><div class="stat-value">${infrastructures.length}</div><div class="stat-sub">Infrastructures</div></div>`;
  const maxC=Math.max(...infrastructures.map(i=>events.filter(e=>e.infraId==i.id).length),1);
  document.getElementById('infraStatsBody').innerHTML=infrastructures.map(i=>{
    const cnt=events.filter(e=>e.infraId==i.id).length;
    let h=0;events.filter(e=>e.infraId==i.id).forEach(e=>{h+=(tmin(e.endTime)-tmin(e.startTime))/60;});
    return `<tr>
      <td><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:${i.color};margin-right:7px"></span>${esc(i.name)}</td>
      <td>${cnt}</td><td>${h.toFixed(1)} h</td>
      <td style="min-width:130px"><div class="bar-wrap"><div class="bar-fill" style="width:${Math.round(cnt/maxC*100)}%;background:${i.color}"></div></div></td>
    </tr>`;
  }).join('');
}

// ══════════════════════════════════════════
// SIDEBAR
// ══════════════════════════════════════════
function updateSidebar(){
  document.getElementById('infraCount').textContent=infrastructures.length+' sites';
  document.getElementById('cnt-all').textContent=events.length;
  const allChecked=isAllSelected();
  document.getElementById('check-all').checked=allChecked;
  const groups={};
  infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
  let html='';
  Object.entries(groups).forEach(([g,arr])=>{
    const groupIds=arr.map(i=>i.id);
    const allGroupChecked=allChecked||groupIds.every(id=>activeFilters.has(id));
    const someGroupChecked=!allChecked&&groupIds.some(id=>activeFilters.has(id));
    html+=`<div class="infra-group-header" onclick="toggleGroup('${esc(g).replace(/'/g,"\\'")}')">
      <input type="checkbox" class="group-check" ${allGroupChecked?'checked':''} ${someGroupChecked&&!allGroupChecked?'data-indeterminate="true"':''} onclick="event.stopPropagation();toggleGroup('${esc(g).replace(/'/g,"\\'")}')">
      ${esc(g)}
      <span style="margin-left:auto;font-size:.62rem;color:var(--muted)">${arr.length}</span>
    </div>`;
    arr.forEach(i=>{
      const cnt=events.filter(e=>e.infraId==i.id).length;
      const sn=i.name.includes(' - ')?i.name.split(' - ').slice(1).join(' - '):i.name;
      const checked=allChecked||activeFilters.has(i.id);
      html+=`<div class="infra-item ${checked&&!allChecked?'active':''}" onclick="toggleSite(${i.id})" id="filter-${i.id}">
        <input type="checkbox" class="site-check" ${checked?'checked':''} onclick="event.stopPropagation();toggleSite(${i.id})">
        <span class="infra-dot" style="background:${i.color}"></span>
        <span style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1">${esc(sn)}</span>
        <span class="infra-count">${cnt}</span>
      </div>`;
    });
  });
  document.getElementById('infraFilterList').innerHTML=html;
  // Set indeterminate state on group checkboxes
  document.querySelectorAll('.group-check[data-indeterminate]').forEach(cb=>{cb.indeterminate=true;});
}

function toggleAllSites(){
  if(isAllSelected()){
    activeFilters=new Set([-1]); // nothing matches = empty view
  } else {
    activeFilters=new Set(); // empty = all
  }
  updateSidebar();renderCalendar();
}
function isNoneSelected(){return activeFilters.size===1&&activeFilters.has(-1);}
function toggleSite(id){
  if(isNoneSelected()){
    // Nothing selected → select just this one
    activeFilters=new Set([id]);
  } else if(isAllSelected()){
    // All selected → deselect this one = select all except this
    const allExcept=infrastructures.filter(i=>i.id!==id).map(i=>i.id);
    activeFilters=new Set(allExcept);
  } else if(activeFilters.has(id)){
    activeFilters.delete(id);
    if(activeFilters.size===0) activeFilters=new Set([-1]); // none selected
  } else {
    activeFilters.add(id);
    if(activeFilters.size===infrastructures.length) activeFilters=new Set(); // all selected = reset
  }
  updateSidebar();renderCalendar();
}
function toggleGroup(groupName){
  const groups={};
  infrastructures.forEach(i=>{const g=i.group||i.name;if(!groups[g])groups[g]=[];groups[g].push(i);});
  const arr=groups[groupName]||[];
  const groupIds=arr.map(i=>i.id);
  if(isNoneSelected()){
    activeFilters=new Set(groupIds);
  } else if(isAllSelected()){
    activeFilters=new Set(groupIds);
  } else {
    const allInGroup=groupIds.every(id=>activeFilters.has(id));
    if(allInGroup){
      groupIds.forEach(id=>activeFilters.delete(id));
      if(activeFilters.size===0) activeFilters=new Set([-1]); // none
    } else {
      activeFilters.delete(-1); // remove none marker if present
      groupIds.forEach(id=>activeFilters.add(id));
      if(activeFilters.size===infrastructures.length) activeFilters=new Set();
    }
  }
  updateSidebar();renderCalendar();
}
function filterByInfra(id){
  // Legacy compat
  if(id==='all'){activeFilters=new Set();}
  else{activeFilters=new Set([id]);}
  updateSidebar();renderCalendar();
}

// ══════════════════════════════════════════
// UTILS
// ══════════════════════════════════════════
function openModal(id){document.getElementById(id).classList.add('open');}
function closeModal(id){document.getElementById(id).classList.remove('open');}
document.querySelectorAll('.modal-overlay').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)el.classList.remove('open');}));
function showToast(msg,type='success'){
  const t=document.getElementById('toast');t.textContent=msg;t.className='toast '+type+' show';
  setTimeout(()=>t.classList.remove('show'),2800);
}
function fmt(d){return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;}
function fmtLong(d){return `${DAYS[d.getDay()===0?6:d.getDay()-1]} ${d.getDate()} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;}
function esc(s){return String(s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');}
function isLight(hex){
  if(!hex||hex.length<7)return false;
  const r=parseInt(hex.slice(1,3),16),g=parseInt(hex.slice(3,5),16),b=parseInt(hex.slice(5,7),16);
  return(r*299+g*587+b*114)/1000>155;
}

// ══════════════════════════════════════════
// LOGOUT
// ══════════════════════════════════════════
async function doLogout(){
  await fetch('/api/logout',{method:'POST'});
  window.location.href='/login.html';
}

// ══════════════════════════════════════════
// USER MANAGEMENT (admin)
// ══════════════════════════════════════════
let currentUser=null;
let editUserId=null;

function canEdit(){return currentUser&&currentUser.role!=='consultation';}

async function loadCurrentUser(){
  try{
    const res=await fetch('/api/me');
    if(res.ok){
      currentUser=await res.json();
      document.getElementById('headerUser').textContent=currentUser.name||currentUser.username;
      if(currentUser.role==='admin'){
        document.getElementById('nav-users').style.display='';
      }
      // Hide edit buttons for consultation users
      if(!canEdit()){
        document.querySelectorAll('.edit-only').forEach(el=>el.style.display='none');
        document.body.classList.add('readonly-mode');
      }
    }
  }catch(e){}
}

async function renderUsers(){
  try{
    const res=await fetch('/api/users');
    if(!res.ok)return;
    const users=await res.json();
    let html='';
    if(!users.length){
      html='<tr><td colspan="4" style="text-align:center;padding:2rem;color:var(--muted)">Aucun utilisateur</td></tr>';
    }
    users.forEach(u=>{
      html+=`<tr>
        <td><strong>${esc(u.name)}</strong></td>
        <td>${esc(u.username)}</td>
        <td><span style="background:${u.role==='admin'?'#e74c3c':u.role==='consultation'?'#95a5a6':'#3498db'};color:white;padding:2px 8px;border-radius:12px;font-size:.72rem;font-weight:600">${u.role==='admin'?'Admin':u.role==='consultation'?'Consultation':'Utilisateur'}</span></td>
        <td><button class="btn" style="font-size:.7rem;padding:3px 6px;background:#eef4fb;color:#1b4f8a;border:none" onclick="openUserModal(${u.id},'${esc(u.name)}','${esc(u.username)}','${u.role}')">✏️</button></td>
      </tr>`;
    });
    document.getElementById('usersTableBody').innerHTML=html;
  }catch(e){console.error(e);}
}

function openUserModal(id,name,username,role){
  editUserId=id||null;
  document.getElementById('userModalTitle').textContent=id?'Modifier l\'utilisateur':'Nouvel utilisateur';
  document.getElementById('btnDelUser').style.display=id?'block':'none';
  document.getElementById('userName').value=name||'';
  document.getElementById('userUsername').value=username||'';
  document.getElementById('userPassword').value='';
  document.getElementById('userRole').value=role||'user';
  document.getElementById('userPwdLabel').textContent=id?'Mot de passe (laisser vide pour ne pas changer)':'Mot de passe *';
  openModal('userModal');
}

async function saveUser(){
  const name=document.getElementById('userName').value.trim();
  const username=document.getElementById('userUsername').value.trim();
  const password=document.getElementById('userPassword').value;
  const role=document.getElementById('userRole').value;
  if(!name||!username){showToast('Nom et identifiant requis','error');return;}
  if(!editUserId&&!password){showToast('Mot de passe requis','error');return;}
  try{
    const body={name,username,role};
    if(password)body.password=password;
    const url=editUserId?`/api/users/${editUserId}`:'/api/users';
    const method=editUserId?'PUT':'POST';
    const res=await fetch(url,{method,headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    const data=await res.json();
    if(!res.ok){showToast(data.error||'Erreur','error');return;}
    closeModal('userModal');showToast('Utilisateur enregistre ✓','success');renderUsers();
  }catch(e){showToast('Erreur serveur','error');}
}

async function deleteCurrentUser(){
  if(!editUserId)return;
  if(!confirm('Supprimer cet utilisateur ?'))return;
  try{
    const res=await fetch(`/api/users/${editUserId}`,{method:'DELETE'});
    const data=await res.json();
    if(!res.ok){showToast(data.error||'Erreur','error');return;}
    closeModal('userModal');showToast('Utilisateur supprime','error');renderUsers();
  }catch(e){showToast('Erreur serveur','error');}
}

// ══════════════════════════════════════════
// GROUP / CATEGORY MANAGEMENT (associations)
// ══════════════════════════════════════════
function getAssocCategories(){
  return [...new Set(associations.map(a=>a.cat))].sort((a,b)=>a.localeCompare(b,'fr'));
}

function openGroupModal(){
  renderGroupList();
  openModal('groupModal');
}

function renderGroupList(){
  const cats=getAssocCategories();
  let html='';
  cats.forEach(cat=>{
    const cnt=associations.filter(a=>a.cat===cat).length;
    html+=`<div style="display:flex;align-items:center;gap:.5rem;padding:.55rem .6rem;border-bottom:1px solid var(--border)">
      <span style="flex:1;font-size:.85rem;font-weight:500">${esc(cat)}</span>
      <span style="font-size:.72rem;color:var(--muted)">${cnt} assoc.</span>
      <button class="btn" style="font-size:.7rem;padding:3px 8px;background:#eef4fb;color:#1b4f8a;border:none" onclick="renameGroup('${esc(cat).replace(/'/g,"\\'")}')">✏️</button>
      ${cnt===0?`<button class="btn" style="font-size:.7rem;padding:3px 8px;background:#fff3f3;color:#c0392b;border:none" onclick="deleteGroup('${esc(cat).replace(/'/g,"\\'")}')">🗑</button>`:''}
    </div>`;
  });
  if(!cats.length) html='<p style="color:var(--muted);padding:1rem;text-align:center">Aucun groupe</p>';
  document.getElementById('groupList').innerHTML=html;
}

function addGroup(){
  const name=document.getElementById('newGroupName').value.trim();
  if(!name){showToast('Nom requis','error');return;}
  const cats=getAssocCategories();
  if(cats.includes(name)){showToast('Ce groupe existe deja','error');return;}
  // Add to the assocCat select options - the group will appear when an association uses it
  // For now we create a placeholder association category by adding it to the select
  const sel=document.getElementById('assocCat');
  const opt=document.createElement('option');
  opt.value=name;opt.textContent=name;
  sel.appendChild(opt);
  document.getElementById('newGroupName').value='';
  showToast('Groupe ajoute ✓','success');
  renderGroupList();
}

function renameGroup(oldName){
  const newName=prompt('Nouveau nom pour le groupe "'+oldName+'" :',oldName);
  if(!newName||newName.trim()===oldName)return;
  const n=newName.trim();
  associations.forEach(a=>{if(a.cat===oldName)a.cat=n;});
  save();renderGroupList();renderAssocAdmin();
  showToast('Groupe renomme ✓','success');
}

function deleteGroup(name){
  const cnt=associations.filter(a=>a.cat===name).length;
  if(cnt>0){showToast('Impossible : des associations utilisent ce groupe','error');return;}
  showToast('Groupe supprime','success');
  renderGroupList();
}

// ══════════════════════════════════════════
// INIT - Load from server API
// ══════════════════════════════════════════
async function initApp(){
  await loadCurrentUser();
  try{
    const res=await fetch('/api/data');
    if(res.ok){
      const data=await res.json();
      if(data.infras&&data.infras.length) infrastructures=data.infras;
      if(data.assocs&&data.assocs.length) associations=data.assocs;
      if(data.vacances&&data.vacances.length) vacances=data.vacances;
      if(data.events) events=data.events;
      nextEventId=Math.max(...events.map(e=>e.id||0),0)+1;
      nextInfraId=Math.max(...infrastructures.map(i=>i.id),0)+1;
      nextAssocId=Math.max(...associations.map(a=>a.id),0)+1;
      nextVacId=Math.max(...vacances.map(v=>v.id),0)+1;
    }
  }catch(e){console.log('Using defaults - no server data yet');}
  updateSidebar();
  renderCalendar();
}
initApp();