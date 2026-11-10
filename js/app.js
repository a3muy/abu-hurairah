// =====================================================================
//  حلقات أبي هريرة — التطبيق
// =====================================================================
import { firebaseConfig } from "./firebase-config.js";
import * as F from "./fb.js";

/* ------------------------------------------------------------------ */
/*  أدوات عامة                                                          */
/* ------------------------------------------------------------------ */
const I={
 home:'<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/>',
 users:'<circle cx="9" cy="8" r="3.5"/><path d="M3 20a6 6 0 0 1 12 0M16 4.5a3.5 3.5 0 0 1 0 7M18 14a6 6 0 0 1 3 6"/>',
 shield:'<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
 book:'<path d="M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3z"/><path d="M5 17a3 3 0 0 1 3-3h11"/>',
 report:'<path d="M6 3h9l4 4v14H6z"/><path d="M14 3v5h5M9 13h7M9 17h5"/>',
 alert:'<path d="M12 3l9.5 17h-19z"/><path d="M12 10v4M12 17.5v.01"/>',
 trophy:'<path d="M8 4h8v5a4 4 0 0 1-8 0zM8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M9 17h6v4H9z"/>',
 mail:'<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>',
 cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>',
 family:'<circle cx="7" cy="6" r="2.5"/><circle cx="17" cy="6" r="2.5"/><circle cx="12" cy="11" r="2"/><path d="M3 20v-4a4 4 0 0 1 8 0M13 20v-4a4 4 0 0 1 8 0M9.5 20v-2a2.5 2.5 0 0 1 5 0v2"/>',
 save:'<path d="M5 3h11l3 3v15H5z"/><path d="M8 3v5h7M8 21v-7h8v7"/>',
 gear:'<circle cx="12" cy="12" r="3"/><path d="M12 2v3M12 19v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M2 12h3M19 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1"/>',
 list:'<path d="M9 6h11M9 12h11M9 18h11M4 6h.01M4 12h.01M4 18h.01"/>',
 chat:'<path d="M4 5h16v11H9l-5 4z"/>',
 bell:'<path d="M6 16V11a6 6 0 0 1 12 0v5l2 2H4z"/><path d="M10 20a2 2 0 0 0 4 0"/>',
 out:'<path d="M15 4h4v16h-4M10 8l-4 4 4 4M6 12h10"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8v.01"/>',
 plus:'<path d="M12 5v14M5 12h14"/>',
 copy:'<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V5a1 1 0 0 0-1-1H5a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h3"/>',
 dl:'<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>',
 up:'<path d="M12 20V9M7 14l5-5 5 5M5 4h14"/>',
 print:'<path d="M7 9V3h10v6M7 17H4v-7h16v7h-3M7 14h10v7H7z"/>',
 dots:'<circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/>',
 check:'<path d="M5 12l5 5 9-10"/>',
 menu:'<path d="M4 7h16M4 12h16M4 17h16"/>',
 pages:'<path d="M4 5a2 2 0 0 1 2-2h5v18H6a2 2 0 0 1-2-2zM13 3h5a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-5z"/>',
 repeat:'<path d="M17 2l3 3-3 3M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3M20 13v2a4 4 0 0 1-4 4H4"/>',
 clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
 x:'<path d="M6 6l12 12M18 6L6 18"/>'
};
const ic=(n,a='')=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" ${a}>${I[n]}</svg>`;
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const ar=n=>Number(n||0).toLocaleString('ar-SA',{maximumFractionDigits:1});
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const DAYN=['الأحد','الاثنين','الثلاثاء','الأربعاء','الخميس','الجمعة','السبت'];
const iso=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const P=s=>{const[y,m,d]=String(s).split('-').map(Number);return new Date(y,m-1,d)};
const add=(d,n)=>{const x=new Date(d);x.setDate(x.getDate()+n);return x};
const gd=s=>P(s).toLocaleDateString('ar-SA-u-ca-gregory',{day:'numeric',month:'short'});
const gdy=s=>P(s).toLocaleDateString('ar-SA-u-ca-gregory',{day:'numeric',month:'long',year:'numeric'});
const hj=(d,o={day:'numeric',month:'long',year:'numeric'})=>{try{return d.toLocaleDateString('ar-SA-u-ca-islamic-umalqura',o)}catch(e){return ''}};
const today=()=>{const t=new Date();t.setHours(0,0,0,0);return t};
const TD=()=>iso(today());
const wkStart=s=>{const d=P(s||TD());return iso(add(d,-d.getDay()))};
const pct=(a,b)=>b?Math.round(a/b*100):0;
const nowIso=()=>new Date().toISOString();
const first=s=>String(s||'؟').replace(/^أ\.\s*/,'').trim()[0]||'؟';

const SURAHS=[['الفاتحة',1],['البقرة',2],['آل عمران',50],['النساء',77],['المائدة',106],['الأنعام',128],['الأعراف',151],['الأنفال',177],['التوبة',187],['يونس',208],['هود',221],['يوسف',235],['الرعد',249],['إبراهيم',255],['الحجر',262],['النحل',267],['الإسراء',282],['الكهف',293],['مريم',305],['طه',312],['الأنبياء',322],['الحج',332],['المؤمنون',342],['النور',350],['الفرقان',359],['الشعراء',367],['النمل',377],['القصص',385],['العنكبوت',396],['الروم',404],['لقمان',411],['السجدة',415],['الأحزاب',418],['سبأ',428],['فاطر',434],['يس',440],['الصافات',446],['ص',453],['الزمر',458],['غافر',467],['فصلت',477],['الشورى',483],['الزخرف',489],['الدخان',496],['الجاثية',499],['الأحقاف',502],['محمد',507],['الفتح',511],['الحجرات',515],['ق',518],['الذاريات',520],['الطور',523],['النجم',526],['القمر',528],['الرحمن',531],['الواقعة',534],['الحديد',537],['المجادلة',542],['الحشر',545],['الممتحنة',549],['الصف',551],['الجمعة',553],['المنافقون',554],['التغابن',556],['الطلاق',558],['التحريم',560],['الملك',562],['القلم',564],['الحاقة',566],['المعارج',568],['نوح',570],['الجن',572],['المزمل',574],['المدثر',575],['القيامة',577],['الإنسان',578],['المرسلات',580],['النبأ',582],['النازعات',583],['عبس',585],['التكوير',586],['الانفطار',587],['المطففين',587],['الانشقاق',589],['البروج',590],['الطارق',591],['الأعلى',591],['الغاشية',592],['الفجر',593],['البلد',594],['الشمس',595],['الليل',595],['الضحى',596],['الشرح',596],['التين',597],['العلق',597],['القدر',598],['البينة',598],['الزلزلة',599],['العاديات',599],['القارعة',600],['التكاثر',600],['العصر',601],['الهمزة',601],['الفيل',601],['قريش',602],['الماعون',602],['الكوثر',602],['الكافرون',603],['النصر',603],['المسد',603],['الإخلاص',604],['الفلق',604],['الناس',604]];
const surahOf=p=>{let s=SURAHS[0][0];for(const[n,st]of SURAHS){if(st<=p)s=n;else break}return s};
const BATCHES=['أول ثانوي','ثاني ثانوي','ثالث ثانوي'];
const EVENTS=[['halaqa','حلقة'],['family','أسري'],['lesson','درس'],['trip','رحلة']];
const EVN=Object.fromEntries(EVENTS);
const STATUS={present:'حاضر',absent:'غايب',excused:'اعتذار'};
const TRACK={normal:'مسار عادي',itqan:'مسار اتقان'};
const MSGR=['مشكلة تقنية','استفسارات','اقتراحات','أخرى'];
const LOGIN_DOMAIN='abuhurairah.local';
const ABSENCE_TEXT='وراك غبت اليوم؟ عسى ما شر إن شاء الله، ما تعودها وما تشوف إلا الخير 🌿';
const DEFAULT_SETTINGS=()=>{const t=today();return{semStart:iso(new Date(t.getFullYear(),t.getMonth(),1)),semEnd:iso(add(t,120)),days:[0,1,2,3],goalNormalNew:3,goalNormalRev:6,goalItqanNew:4,repsNormal:3,repsItqan:5}};
const emptyStats=()=>({pages:0,newPages:0,revPages:0,newCount:0,revCount:0,present:0,absent:0,excused:0});

/* ------------------------------------------------------------------ */
/*  تهيئة Firebase                                                      */
/* ------------------------------------------------------------------ */
const configured=!Object.values(firebaseConfig).some(v=>String(v).includes('ضع_هنا'));
let app,auth,db;
if(configured){app=F.initializeApp(firebaseConfig);auth=F.getAuth(app);db=F.getFirestore(app)}
const col=(...p)=>F.collection(db,...p);
const dref=(...p)=>F.doc(db,...p);
const newId=c=>F.doc(col(c)).id;
const docs=snap=>snap.docs.map(d=>({id:d.id,...d.data()}));
const getAll=async(c,...w)=>docs(await F.getDocs(w.length?F.query(col(c),...w):col(c)));
const W=(f,op,v)=>F.where(f,op,v);
async function commitAll(ops){ // ops: [type, ref, data]
  for(let i=0;i<ops.length;i+=400){const b=F.writeBatch(db);ops.slice(i,i+400).forEach(([t,r,d])=>t==='set'?b.set(r,d):t==='merge'?b.set(r,d,{merge:true}):t==='update'?b.update(r,d):b.delete(r));await b.commit()}
}
async function countOf(c,...w){try{const s=await F.getCountFromServer(F.query(col(c),...w));return s.data().count}catch(e){console.warn(e);return null}}

/* ------------------------------------------------------------------ */
/*  الحالة                                                              */
/* ------------------------------------------------------------------ */
const ST={user:null,role:null,me:null,sups:[],students:[],bookings:{},settings:DEFAULT_SETTINGS(),msgs:[],notes:[]};
let page=null,PD={},bellOpen=false,navOpen=false,setupBusy=false;
const isMain=()=>ST.role==='sup'&&ST.me?.role==='main';
const S=id=>ST.students.find(s=>s.id===id);
const SUP=id=>ST.sups.find(s=>s.id===id);
const supName=id=>SUP(id)?.name||'—';
const myStudents=()=>ST.role!=='sup'||isMain()?ST.students:ST.students.filter(s=>s.supId===ST.user.uid);
const activeStudents=()=>myStudents().filter(s=>s.active);
const HDAYS=()=>ST.settings.days?.length?ST.settings.days:[0,1,2,3];
const repsFor=s=>s.track==='itqan'?(+ST.settings.repsItqan||5):(+ST.settings.repsNormal||3);
const weekGoal=s=>s.track==='itqan'?{nw:+ST.settings.goalItqanNew||4,rv:0}:{nw:+ST.settings.goalNormalNew||3,rv:+ST.settings.goalNormalRev||6};
function semDays(){const out=[];let d=P(ST.settings.semStart);const end=ST.settings.semEnd;let guard=0;while(iso(d)<=end&&guard++<800){if(HDAYS().includes(d.getDay()))out.push(iso(d));d=add(d,1)}return out}

const PREF={theme:null,accent:'green'};
try{Object.assign(PREF,JSON.parse(localStorage.getItem('ah-pref'))||{})}catch(e){}
function applyPref(){const r=document.documentElement;PREF.theme?r.setAttribute('data-theme',PREF.theme):r.removeAttribute('data-theme');PREF.accent==='gold'?r.setAttribute('data-accent','gold'):r.removeAttribute('data-accent');try{localStorage.setItem('ah-pref',JSON.stringify(PREF))}catch(e){}}
applyPref();

/* ------------------------------------------------------------------ */
/*  رسائل الأخطاء                                                       */
/* ------------------------------------------------------------------ */
function errMsg(e){
  const c=e?.code||'';
  if(c.includes('invalid-credential')||c.includes('wrong-password')||c.includes('user-not-found')||c.includes('invalid-email'))return 'بيانات الدخول غير صحيحة';
  if(c.includes('too-many-requests'))return 'محاولات كثيرة، انتظر قليلًا ثم حاول مرة ثانية';
  if(c.includes('email-already-in-use'))return 'هذا البريد مستخدم لحساب آخر';
  if(c.includes('weak-password'))return 'كلمة المرور لازم تكون ٦ أحرف أو أكثر';
  if(c.includes('requires-recent-login'))return 'لأمان حسابك: سجّل خروج وادخل مرة ثانية، ثم غيّر كلمة المرور';
  if(c.includes('permission-denied'))return 'ما عندك صلاحية لهذا الإجراء';
  if(c.includes('unavailable')||c.includes('network'))return 'تعذر الاتصال، تأكد من الإنترنت وحاول مرة ثانية';
  if(c.includes('operation-not-allowed'))return 'فعّل تسجيل الدخول بالبريد وكلمة المرور من Firebase Console';
  return e?.message&&!c?e.message:'حدث خطأ، حاول مرة ثانية';
}
async function run(fn,okMsg){
  document.body.classList.add('busy');
  try{const r=await fn();if(okMsg)toast(okMsg);return r}
  catch(e){console.error(e);toast(errMsg(e),true);throw e}
  finally{document.body.classList.remove('busy')}
}
const quiet=p=>p.catch(()=>{});

/* ------------------------------------------------------------------ */
/*  الدخول والإعداد الأول                                               */
/* ------------------------------------------------------------------ */
let loginRole='sup',loginErr='',setupMode=false,setupAvailable=false;
async function resolveUser(user){
  ST.user=user;
  const sd=await F.getDoc(dref('supervisors',user.uid));
  if(sd.exists()){
    const me={id:sd.id,...sd.data()};
    if(!me.active)throw Object.assign(new Error('حسابك موقوف، تواصل مع المشرف الرئيسي'),{code:'x-blocked'});
    ST.role='sup';ST.me=me;
  }else{
    const td=await F.getDoc(dref('students',user.uid));
    if(!td.exists())throw Object.assign(new Error('هذا الحساب غير مسجل في الحلقة'),{code:'x-none'});
    const me={id:td.id,...td.data()};
    if(!me.active)throw Object.assign(new Error('حسابك موقوف، تواصل مع مشرفك'),{code:'x-blocked'});
    ST.role='student';ST.me=me;
  }
  await loadBase();
}
async function loadBase(){
  const [sups,students,bookings,sett]=await Promise.all([getAll('supervisors'),getAll('students'),getAll('bookings'),F.getDoc(dref('settings','main'))]);
  ST.sups=sups;ST.students=students.map(s=>({...s,stats:{...emptyStats(),...(s.stats||{})}}));
  ST.bookings=Object.fromEntries(bookings.map(b=>[b.id,b]));
  ST.settings={...DEFAULT_SETTINGS(),...(sett.exists()?sett.data():{})};
  if(ST.role==='student')ST.me=S(ST.user.uid)||ST.me;
  await loadInbox();
}
async function loadInbox(){
  if(ST.role==='sup')ST.msgs=await getAll('messages');
  else ST.notes=await getAll('notifications',W('sid','==',ST.user.uid));
}
async function reloadStudents(){ST.students=(await getAll('students')).map(s=>({...s,stats:{...emptyStats(),...(s.stats||{})}}));if(ST.role==='student')ST.me=S(ST.user.uid)||ST.me}

function renderConfigMissing(){
  $('#root').innerHTML=`<div class="auth"><div class="auth-art"><div class="plaque"><img src="assets/logo.png" alt="حلقات أبي هريرة"></div><p>منصة إدارة حلقات أبي هريرة</p></div>
  <div class="auth-form"><div class="lcard"><h1>باقي خطوة الربط</h1><p class="lead">الموقع جاهز، لكنه غير مربوط بمشروع Firebase بعد.</p>
  <div class="note" style="margin:0">افتح الملف <span class="code">js/firebase-config.js</span> والصق فيه إعدادات مشروعك من Firebase Console، ثم ارفع الملف من جديد. الخطوات كاملة في ملف <span class="code">README.md</span>.</div></div></div></div>`;
}
async function renderLogin(){
  if(setupMode)return renderSetup();
  $('#root').innerHTML=`<div class="auth">
   <div class="auth-art"><div class="plaque"><img src="assets/logo.png" alt="حلقات أبي هريرة رضي الله عنه"></div><p>منصة إدارة حلقات أبي هريرة</p><small>تسجيل الحفظ والمراجعة والتكرار، ومتابعة الحضور، والحجز الأسري.</small></div>
   <div class="auth-form"><div class="lcard">
    <h1>تسجيل الدخول</h1><p class="lead">حيّاك الله، اختر نوع حسابك وادخل.</p>
    <div class="seg" role="group" aria-label="نوع الحساب"><button type="button" data-r="sup" aria-pressed="${loginRole==='sup'}">مشرف</button><button type="button" data-r="student" aria-pressed="${loginRole==='student'}">طالب</button></div>
    ${loginErr?`<div class="err">${esc(loginErr)}</div>`:''}
    <form id="lf"><label>${loginRole==='sup'?'البريد الإلكتروني':'اسم المستخدم / البريد / رقم الهوية'}<input id="l-u" dir="ltr" autocomplete="username" required></label>
    <label>كلمة المرور<input id="l-p" type="password" autocomplete="current-password" required></label>
    <button class="btn b-pri" type="submit" id="l-b">تسجيل الدخول</button></form>
    ${setupAvailable?`<div class="note" style="margin:0">أول مرة تفتح الموقع؟ <button class="link" id="goSetup">أنشئ حساب المشرف الرئيسي</button></div>`:''}
   </div></div></div>`;
  $$('[data-r]').forEach(b=>b.onclick=()=>{loginRole=b.dataset.r;loginErr='';renderLogin()});
  const gs=$('#goSetup');if(gs)gs.onclick=()=>{setupMode=true;renderSetup()};
  $('#lf').onsubmit=async e=>{
    e.preventDefault();const btn=$('#l-b');btn.disabled=true;btn.textContent='جاري الدخول...';loginErr='';
    try{
      let id=$('#l-u').value.trim(),email=id;
      if(!id.includes('@')){
        const k=await F.getDoc(dref('logins',id.toLowerCase()));
        if(!k.exists())throw {code:'auth/invalid-credential'};
        email=k.data().email;
      }
      await F.signInWithEmailAndPassword(auth,email,$('#l-p').value);
    }catch(err){console.error(err);loginErr=errMsg(err);renderLogin()}
  };
  try{const m=await F.getDoc(dref('meta','setup'));const was=setupAvailable;setupAvailable=!m.exists();if(was!==setupAvailable&&!ST.user)renderLogin()}catch(e){}
}
function renderSetup(){
  $('#root').innerHTML=`<div class="auth">
   <div class="auth-art"><div class="plaque"><img src="assets/logo.png" alt="حلقات أبي هريرة"></div><p>الإعداد الأول</p><small>هذا الحساب هو المشرف الرئيسي، ومنه تضيف بقية المشرفين والطلاب. يظهر هذا النموذج مرة واحدة فقط.</small></div>
   <div class="auth-form"><div class="lcard"><h1>حساب المشرف الرئيسي</h1>
    ${loginErr?`<div class="err">${esc(loginErr)}</div>`:''}
    <form id="sf"><label>الاسم<input id="s-n" required placeholder="أ. "></label>
    <label>البريد الإلكتروني<input id="s-e" type="email" dir="ltr" required></label>
    <label>رقم الجوال<input id="s-p" dir="ltr" inputmode="tel"></label>
    <label>كلمة المرور<input id="s-w" type="password" minlength="6" required></label>
    <button class="btn b-pri" type="submit" id="s-b">إنشاء الحساب والدخول</button></form>
    <button class="link" id="back">رجوع لتسجيل الدخول</button></div></div></div>`;
  $('#back').onclick=()=>{setupMode=false;loginErr='';renderLogin()};
  $('#sf').onsubmit=async e=>{
    e.preventDefault();const b=$('#s-b');b.disabled=true;b.textContent='جاري الإنشاء...';loginErr='';setupBusy=true;
    try{
      const cred=await F.createUserWithEmailAndPassword(auth,$('#s-e').value.trim(),$('#s-w').value);
      const uid=cred.user.uid,bt=F.writeBatch(db);
      bt.set(dref('meta','setup'),{by:uid,at:nowIso()});
      bt.set(dref('supervisors',uid),{name:$('#s-n').value.trim(),email:$('#s-e').value.trim(),phone:$('#s-p').value.trim(),role:'main',active:true,createdAt:nowIso()});
      await bt.commit();
      setupMode=false;setupBusy=false;
      await resolveUser(cred.user);page=null;render();toast('تم إنشاء حساب المشرف الرئيسي، حدّد تاريخ الفصل من الإعدادات');
    }catch(err){console.error(err);setupBusy=false;loginErr=errMsg(err);quiet(F.signOut(auth));renderSetup()}
  };
}

/* ------------------------------------------------------------------ */
/*  التنقل                                                              */
/* ------------------------------------------------------------------ */
const SUP_NAV=()=>[
 ['الإدارة',[['dashboard','home','لوحة التحكم'],['students','users','الطلاب'],...(isMain()?[['supervisors','shield','المشرفين']]:[]),['records','book','تسجيل الحفظ']]],
 ['المتابعة',[['reports','report','التقارير'],['struggling','alert','المتعثرين'],['achievements','trophy','الإنجازات']]],
 ['التواصل',[['messages','mail','رسائل الطلاب']]],
 ['الحجز الأسري',[['bookings','cal','إدارة الحجوزات'],['mybookings','family','حجوزاتي']]],
 ['النظام',[...(isMain()?[['backup','save','النسخ الاحتياطي']]:[]),['settings','gear','الإعدادات']]]];
const STU_NAV=()=>[['',[['me','home','لوحتي'],['myrecords','list','سجلاتي'],['family','family','الحجز الأسري'],['achievements','trophy','الإنجازات'],['contact','chat','تواصل معنا'],['settings','gear','الإعدادات']]]];
const navOf=()=>ST.role==='student'?STU_NAV():SUP_NAV();
const allKeys=()=>navOf().flatMap(g=>g[1].map(x=>x[0]));
const titleOf=k=>navOf().flatMap(g=>g[1]).find(x=>x[0]===k)?.[2]||'';
function go(p){page=p;PD={};bellOpen=false;navOpen=false;try{history.replaceState(null,'','#'+p)}catch(e){}render();window.scrollTo(0,0)}
addEventListener('hashchange',()=>{const p=location.hash.slice(1);if(ST.role&&allKeys().includes(p)&&p!==page)go(p)});

/* ------------------------------------------------------------------ */
/*  الإطار والعرض                                                       */
/* ------------------------------------------------------------------ */
function bellItems(){
  if(ST.role==='sup'){const m=ST.msgs.filter(x=>!x.read).length;return m?[{t:`عندك ${ar(m)} ${m>2?'رسائل':'رسالة'} جديدة من الطلاب`,s:'رسائل الطلاب',n:true,go:'messages'}]:[]}
  const out=[...ST.notes].sort((a,b)=>String(b.at).localeCompare(String(a.at))).slice(0,15).map(n=>({t:n.text,s:gd(String(n.at).slice(0,10)),n:!n.read}));
  return out;
}
let renderSeq=0;
async function render(){
  if(!configured)return renderConfigMissing();
  if(!ST.role)return renderLogin();
  if(!allKeys().includes(page)){const h=location.hash.slice(1);page=allKeys().includes(h)?h:allKeys()[0]}
  const isS=ST.role==='student',me=ST.me;
  const badges={messages:ST.msgs.filter(m=>!m.read).length};
  const B=bellItems(),unread=B.some(x=>x.n);
  $('#root').innerHTML=`<div class="app ${navOpen?'open':''}">
   <aside class="rail" aria-label="القائمة"><div class="rail-top"><div class="plaque"><img src="assets/logo.png" alt="حلقات أبي هريرة"></div></div>
    <nav>${navOf().map(([g,items])=>`${g?`<div class="grp">${g}</div>`:''}${items.map(([k,i,t])=>`<button class="nav ${k===page?'on':''}" data-k="${k}">${ic(i)}<span>${t}</span>${badges[k]?`<span class="cnt">${ar(badges[k])}</span>`:''}</button>`).join('')}`).join('')}</nav>
    <div class="rail-foot">حلقات أبي هريرة رضي الله عنه</div></aside>
   <div class="scrim" id="scrim"></div>
   <div class="work">
    <div class="top">
      <button class="iconbtn burger" id="burger" aria-label="القائمة">${ic('menu')}</button>
      <span class="crumb">${esc(titleOf(page))}</span><span class="sp"></span>
      <div class="bellwrap"><button class="iconbtn" id="bell" aria-label="الإشعارات" aria-expanded="${bellOpen}">${ic('bell')}${unread?'<span class="dot"></span>':''}</button>
       ${bellOpen?`<div class="bellpanel"><h4>آخر الإشعارات</h4><div class="list">${B.map(n=>`<div class="it ${n.n?'new':''}" ${n.go?`data-go="${n.go}" style="cursor:pointer"`:''}>${esc(n.t)}<small>${esc(n.s)}</small></div>`).join('')||'<div class="empty">لا توجد إشعارات</div>'}</div></div>`:''}</div>
      <div class="who"><span class="av">${esc(first(me.name))}</span><span>${esc(me.name)}<small>${isS?'طالب':me.role==='main'?'مشرف رئيسي':'مشرف'}</small></span></div>
      <button class="iconbtn" id="logout" aria-label="تسجيل الخروج" title="تسجيل الخروج">${ic('out')}</button>
    </div>
    <main id="page"><div class="loading"><div class="spin"></div></div></main>
   </div></div>`;
  $$('.nav').forEach(b=>b.onclick=()=>go(b.dataset.k));
  $('#burger').onclick=()=>{navOpen=true;$('.app').classList.add('open')};
  $('#scrim').onclick=()=>{navOpen=false;$('.app').classList.remove('open')};
  $('#bell').onclick=e=>{e.stopPropagation();bellOpen=!bellOpen;if(bellOpen&&ST.role==='student')markNotesRead();render()};
  $('#logout').onclick=()=>run(()=>F.signOut(auth));
  $$('.bellpanel [data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
  await renderPage();
}
async function renderPage(){
  const seq=++renderSeq,pg=PAGES[page];
  try{
    if(PD.__page!==page)PD={__page:page};
    if(pg.load&&!PD.__loaded){const d=(await pg.load())||{};if(seq!==renderSeq)return;PD={...d,__page:page,__loaded:true}}
    if(seq!==renderSeq)return;
    $('#page').innerHTML=pg.view();
    pg.bind&&pg.bind();
    $$('#page [data-go]').forEach(b=>b.onclick=()=>go(b.dataset.go));
    $$('#page [data-stu]').forEach(b=>b.onclick=()=>studentDetail(b.dataset.stu));
    bindReps();
  }catch(e){
    console.error(e);if(seq!==renderSeq)return;
    $('#page').innerHTML=`<div class="panel"><div class="empty">${esc(errMsg(e))}<br><br><button class="btn b-sec" id="retry">إعادة المحاولة</button></div></div>`;
    $('#retry').onclick=()=>{PD={};renderPage()};
  }
}
const refresh=()=>{PD={};return renderPage()};
const repaint=()=>renderPage();
function markNotesRead(){const un=ST.notes.filter(n=>!n.read);if(!un.length)return;un.forEach(n=>n.read=true);quiet(commitAll(un.map(n=>['update',dref('notifications',n.id),{read:true}])))}
document.addEventListener('click',e=>{
  if(bellOpen&&!e.target.closest('.bellwrap')){bellOpen=false;const p=$('.bellpanel');if(p)p.remove();const b=$('#bell');if(b)b.setAttribute('aria-expanded','false')}
  if(!e.target.closest('.menu'))$$('.menu-l').forEach(m=>m.remove());
});

const head=(t,sub='',acts='')=>`<div class="ph"><div><h1>${t}</h1>${sub?`<div class="sub">${sub}</div>`:''}</div>${acts?`<div class="acts">${acts}</div>`:''}</div>`;
const kpi=(icon,l,v,h='',c='')=>`<div class="kpi ${c}"><span class="ki">${ic(icon)}</span><div><small>${l}</small><b>${v}</b>${h?`<span class="hint">${h}</span>`:''}</div></div>`;
const pages=r=>(+r.to)-(+r.from)+1;
const sumPages=(rs,type)=>rs.filter(r=>!type||r.type===type).reduce((x,r)=>x+pages(r),0);
const sortRecs=rs=>[...rs].sort((a,b)=>String(b.date).localeCompare(String(a.date))||String(b.createdAt||'').localeCompare(String(a.createdAt||'')));

/* ---------- التكرار ---------- */
const repCell=r=>r.type!=='new'?'<span class="cell-sub">لا يوجد تكرار للمراجعة</span>':
  r.reps>=r.need?`<span class="pill ok">✓ تم التكرار</span> <button class="btn sm b-sec" data-undo="${r.id}">تراجع</button>`:
  `<span class="rep"><span class="repbar">${Array.from({length:r.need},(_,i)=>`<i class="${i<r.reps?'f':''}"></i>`).join('')}</span><button class="btn sm b-gold" data-rep="${r.id}">كرر (${ar(r.reps)}/${ar(r.need)})</button></span>`;
function findRec(id){for(const k of ['recs','week','all']){const a=PD[k];if(Array.isArray(a)){const r=a.find(x=>x.id===id);if(r)return r}}return null}
function bindReps(){
  const set=async(id,d)=>{const r=findRec(id);if(!r)return;const n=Math.max(0,Math.min(r.need,r.reps+d));
    await run(()=>F.updateDoc(dref('records',id),{reps:n,done:n>=r.need}),n>=r.need&&d>0?'✓ تم التكرار':'');r.reps=n;r.done=n>=r.need;repaint()};
  $$('[data-rep]').forEach(b=>b.onclick=()=>quiet(set(b.dataset.rep,1)));
  $$('[data-undo]').forEach(b=>b.onclick=()=>quiet(set(b.dataset.undo,-1)));
}
function weekBars(recs,n=8){
  const cur=wkStart();const ws=[];for(let i=n-1;i>=0;i--)ws.push(iso(add(P(cur),-7*i)));
  const vals=ws.map(w=>{const we=iso(add(P(w),6));return recs.filter(r=>r.date>=w&&r.date<=we).reduce((x,r)=>x+pages(r),0)});
  const mx=Math.max(1,...vals);
  return `<div class="bars">${ws.map((w,i)=>`<div class="b ${i===n-1?'cur':''}"><em>${ar(vals[i])}</em><i style="height:${Math.round(vals[i]/mx*100)}%"></i><span>${gd(w)}</span></div>`).join('')}</div>`;
}
function weekStats(s,recs,atts,ws=wkStart()){
  const we=iso(add(P(ws),6));const rs=recs.filter(r=>r.sid===s.id&&r.date>=ws&&r.date<=we),as=atts.filter(a=>a.sid===s.id&&a.date>=ws&&a.date<=we);
  const nw=sumPages(rs,'new'),rv=sumPages(rs,'review'),g=weekGoal(s);
  return {nw,rv,nwShort:Math.max(0,g.nw-nw),rvShort:Math.max(0,g.rv-rv),abs:as.filter(a=>a.status==='absent').length,exc:as.filter(a=>a.status==='excused').length,norep:rs.filter(r=>r.type==='new'&&r.reps<r.need).length};
}
const isStruggling=w=>w.nwShort+w.rvShort>0||w.abs>0||w.norep>0;

/* ------------------------------------------------------------------ */
/*  عمليات البيانات                                                     */
/* ------------------------------------------------------------------ */
const statInc=(o)=>Object.fromEntries(Object.entries(o).map(([k,v])=>['stats.'+k,F.increment(v)]));
async function addRecord(s,r){
  const id=newId('records'),p=pages(r),isNew=r.type==='new';
  const data={sid:s.id,supId:s.supId||'',date:r.date,surah:r.surah,from:r.from,to:r.to,pages:p,type:r.type,notes:r.notes||'',need:isNew?repsFor(s):0,reps:0,done:!isNew,createdBy:ST.user.uid,createdAt:nowIso()};
  const upd=statInc(isNew?{pages:p,newPages:p,newCount:1}:{pages:p,revPages:p,revCount:1});
  if(isNew&&(!s.lastNew||r.date>=s.lastNew.date))upd.lastNew={surah:r.surah,to:r.to,date:r.date};
  await commitAll([['set',dref('records',id),data],['update',dref('students',s.id),upd]]);
  return {id,...data};
}
async function deleteRecord(r){
  const p=pages(r),isNew=r.type==='new';
  await commitAll([['delete',dref('records',r.id)],['update',dref('students',r.sid),statInc(isNew?{pages:-p,newPages:-p,newCount:-1}:{pages:-p,revPages:-p,revCount:-1})]]);
  if(isNew){const rest=sortRecs((await getAll('records',W('sid','==',r.sid))).filter(x=>x.type==='new'));
    await F.updateDoc(dref('students',r.sid),{lastNew:rest[0]?{surah:rest[0].surah,to:rest[0].to,date:rest[0].date}:F.deleteField()})}
}
async function saveAttendance(s,a){
  const id=`${s.id}_${a.date}_${a.event}`,ref=dref('attendance',id);
  const old=await F.getDoc(ref);const inc={};
  if(old.exists()){const o=old.data().status;inc[o]=(inc[o]||0)-1}
  inc[a.status]=(inc[a.status]||0)+1;
  const ops=[['set',ref,{sid:s.id,supId:s.supId||'',date:a.date,event:a.event,status:a.status,reason:a.reason||'',by:ST.user.uid,at:nowIso()}],['update',dref('students',s.id),statInc(inc)]];
  if(a.status==='absent'&&!(old.exists()&&old.data().status==='absent'))ops.push(['set',dref('notifications',newId('notifications')),{sid:s.id,text:ABSENCE_TEXT,kind:'absence',at:nowIso(),read:false}]);
  await commitAll(ops);
}
async function deleteAttendance(a){await commitAll([['delete',dref('attendance',a.id)],['update',dref('students',a.sid),statInc({[a.status]:-1})]])}
async function createAuthUser(email,pw){
  const sec=F.initializeApp(firebaseConfig,'sec-'+Date.now());const a=F.getAuth(sec);
  try{const c=await F.createUserWithEmailAndPassword(a,email,pw);return c.user.uid}
  finally{quiet(F.signOut(a));quiet(F.deleteApp(sec))}
}
function csvDownload(name,rows){
  const csv='﻿'+rows.map(r=>r.map(v=>{const s=String(v??'');return /[",\n]/.test(s)?'"'+s.replace(/"/g,'""')+'"':s}).join(',')).join('\r\n');
  const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},500);
}

/* ================================================================== */
/*  صفحات المشرف                                                        */
/* ================================================================== */
const pDashboard={
  async load(){
    const from=iso(add(P(wkStart()),-49));
    const [recent,done]=await Promise.all([getAll('records',W('date','>=',from)),countOf('records',W('type','==','new'),W('done','==',true))]);
    const mine=new Set(myStudents().map(s=>s.id)),events={};
    await Promise.all(['family','lesson','trip'].map(async e=>{events[e]=await countOf('attendance',W('event','==',e),W('status','==','present'))}));
    return {recent:recent.filter(r=>mine.has(r.sid)),done,events};
  },
  view(){
    const st=activeStudents(),T=k=>st.reduce((x,s)=>x+(s.stats[k]||0),0);
    const nc=T('newCount'),att=T('present')+T('absent')+T('excused');
    const wk=wkStart(),late=st.filter(s=>isStruggling(weekStats(s,PD.recent,[],wk))).length;
    const mastery=PD.done==null||!isMain()?null:pct(PD.done,nc);
    return head('لوحة التحكم',`${hj(today(),{weekday:'long',day:'numeric',month:'long',year:'numeric'})} · ${gdy(TD())}`)+`
    <div class="kpis">${kpi('users','عدد الطلاب',ar(st.length),`${ar(st.filter(s=>s.track==='itqan').length)} اتقان · ${ar(st.filter(s=>s.track!=='itqan').length)} عادي`)}${kpi('book','عدد الحفظات',ar(nc),ar(T('newPages'))+' وجه')}${kpi('repeat','عدد المراجعات',ar(T('revCount')),ar(T('revPages'))+' وجه')}${mastery!=null?kpi('check','نسبة الإتقان',ar(mastery)+'٪','سجلات مكتملة التكرار','g'):kpi('pages','إجمالي الأوجه',ar(T('pages')),'','g')}</div>
    <div class="kpis">${kpi('alert','طلاب متأخرون هذا الأسبوع',ar(late),'حسب الهدف الأسبوعي',late?'r':'')}${kpi('report','إجمالي السجلات',ar(nc+T('revCount')))}${kpi('clock','نسبة الحضور',ar(pct(T('present'),att))+'٪',`${ar(T('present'))} حضور`)}${kpi('x','مرات الغياب',ar(T('absent')),`${ar(T('excused'))} اعتذار`,T('absent')?'r':'')}</div>
    <div class="grid2">
     <section class="panel"><div class="panel-h"><h2>الأوجه المسمّعة أسبوعيًا</h2><span class="pill gold">الأسبوع الحالي بالذهبي</span></div><div class="panel-b">${weekBars(PD.recent)}</div></section>
     <section class="panel"><div class="panel-h"><h2>الحضور والغياب</h2></div>
      <div class="row"><span class="nm">مرات الحضور</span><b>${ar(T('present'))}</b></div><div class="row"><span class="nm">مرات الغياب</span><b style="color:var(--red)">${ar(T('absent'))}</b></div>
      <div class="row"><span class="nm">مرات الاعتذار</span><b>${ar(T('excused'))}</b></div>
      ${['family','lesson','trip'].map(e=>PD.events[e]==null?'':`<div class="row"><span class="nm">حضور ${EVN[e]}</span><b>${ar(PD.events[e])}</b></div>`).join('')}</section>
    </div>`;
  }
};

let sQ='',sSup='',sBatch='';
const pStudents={
  view(){
    const list=myStudents().filter(s=>(!sQ||s.name.includes(sQ)||String(s.username).includes(sQ.toLowerCase()))&&(!sSup||s.supId===sSup)&&(!sBatch||s.batch===sBatch)).sort((a,b)=>a.name.localeCompare(b.name,'ar'));
    return head('إدارة الطلاب',`${ar(myStudents().length)} طالب`,`<button class="btn b-pri" id="addS">${ic('plus')}إضافة طالب</button>`)+`
    <section class="panel"><div class="filters"><input id="sq" placeholder="بحث بالاسم أو اسم المستخدم..." value="${esc(sQ)}">${isMain()?`<select id="ssup"><option value="">كل المشرفين</option>${ST.sups.map(s=>`<option value="${s.id}" ${sSup===s.id?'selected':''}>${esc(s.name)}</option>`).join('')}</select>`:''}<select id="sbat"><option value="">كل الدفعات</option>${BATCHES.map(b=>`<option ${sBatch===b?'selected':''}>${b}</option>`).join('')}</select></div>
    <div class="tbl-wrap"><table><thead><tr><th>الاسم</th><th>المشرف</th><th>المسار</th><th>آخر حفظ</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>
    ${list.map(s=>`<tr><td><b style="font-weight:500">${esc(s.name)}</b><div class="cell-sub">${esc(s.batch)} · <span dir="ltr">${esc(s.username)}</span></div></td><td class="n">${esc(supName(s.supId))}</td><td><span class="pill ${s.track==='itqan'?'gold':'mute'}">${TRACK[s.track]||''}</span></td><td class="n">${s.lastNew?`${esc(s.lastNew.surah)} ${ar(s.lastNew.to)}<div class="cell-sub">${gd(s.lastNew.date)}</div>`:'—'}</td><td><span class="pill ${s.active?'ok':'bad'}">${s.active?'مفعل':'موقوف'}</span></td>
     <td><div class="menu"><button class="btn sm b-sec" data-menu="${s.id}" aria-label="إجراءات ${esc(s.name)}">${ic('dots')}</button></div></td></tr>`).join('')||'<tr><td colspan="6" class="empty">لا يوجد طلاب. أضف أول طالب من الزر فوق.</td></tr>'}
    </tbody></table></div></section>`;
  },
  bind(){
    const sq=$('#sq');let t;sq.oninput=()=>{clearTimeout(t);t=setTimeout(()=>{sQ=sq.value.trim();repaint().then(()=>{const n=$('#sq');n.focus();n.setSelectionRange(n.value.length,n.value.length)})},250)};
    const ss=$('#ssup');if(ss)ss.onchange=e=>{sSup=e.target.value;repaint()};
    $('#sbat').onchange=e=>{sBatch=e.target.value;repaint()};
    $('#addS').onclick=()=>studentForm();
    $$('[data-menu]').forEach(b=>b.onclick=e=>{e.stopPropagation();$$('.menu-l').forEach(m=>m.remove());const s=S(b.dataset.menu);
      const m=document.createElement('div');m.className='menu-l';
      m.innerHTML=`<button data-a="d">التفاصيل والإحصائيات</button><button data-a="e">تعديل</button>${isMain()?'<button data-a="m">نقل لمشرف آخر</button>':''}<button data-a="t">${s.active?'إيقاف':'تفعيل'}</button><button data-a="p">إعادة تعيين كلمة المرور</button><button data-a="x" class="d">حذف الطالب</button>`;
      b.parentNode.appendChild(m);
      m.onclick=ev=>{const a=ev.target.dataset.a;if(!a)return;m.remove();
        if(a==='d')studentDetail(s.id);if(a==='e')studentForm(s);if(a==='m')moveForm(s);
        if(a==='t')quiet(run(async()=>{await F.updateDoc(dref('students',s.id),{active:!s.active});s.active=!s.active;repaint()},s.active?'تم تفعيل الطالب':'تم إيقاف الطالب'));
        if(a==='p')resetPassword(s);
        if(a==='x')confirmBox(`حذف الطالب ${esc(s.name)}؟`,'تُحذف سجلات حفظه وحضوره معه، ولا يمكن التراجع.','حذف',()=>run(()=>deleteStudent(s),'تم حذف الطالب').then(repaint))}});
  }
};
async function deleteStudent(s){
  const [recs,atts,notes]=await Promise.all([getAll('records',W('sid','==',s.id)),getAll('attendance',W('sid','==',s.id)),getAll('notifications',W('sid','==',s.id))]);
  const priv=await F.getDoc(dref('students',s.id,'private','info'));const pv=priv.exists()?priv.data():{};
  const ops=[...recs.map(r=>['delete',dref('records',r.id)]),...atts.map(r=>['delete',dref('attendance',r.id)]),...notes.map(r=>['delete',dref('notifications',r.id)])];
  Object.entries(ST.bookings).forEach(([d,b])=>{if(b.sid===s.id&&d>=TD())ops.push(['update',dref('bookings',d),{sid:F.deleteField(),name:F.deleteField()}])});
  ops.push(['delete',dref('logins',String(s.username).toLowerCase())]);if(pv.nid)ops.push(['delete',dref('logins',pv.nid)]);
  ops.push(['delete',dref('students',s.id,'private','info')],['delete',dref('students',s.id)]);
  await commitAll(ops);
  ST.students=ST.students.filter(x=>x.id!==s.id);
  Object.entries(ST.bookings).forEach(([d,b])=>{if(b.sid===s.id&&d>=TD()){delete b.sid;delete b.name}});
}
async function resetPassword(s){
  let pv={};try{const p=await F.getDoc(dref('students',s.id,'private','info'));pv=p.exists()?p.data():{}}catch(e){}
  if(pv.email){confirmBox('إعادة تعيين كلمة المرور؟',`يصل رابط تغيير كلمة المرور إلى بريد الطالب: <span class="code">${esc(pv.email)}</span>`,'إرسال الرابط',()=>run(()=>F.sendPasswordResetEmail(auth,pv.email),'تم إرسال الرابط لبريد الطالب'));return}
  modal(`<div class="mh"><h3>إعادة تعيين كلمة المرور</h3><button class="x" data-close aria-label="إغلاق">×</button></div>
  <div class="mb" style="line-height:1.9">الطالب ما عنده بريد حقيقي، فغيّر كلمة المرور من Firebase:<br>
  ١. افتح Firebase Console ← Authentication ← Users<br>٢. ابحث عن: <span class="code">${esc(pv.loginEmail||s.username+'@'+LOGIN_DOMAIN)}</span><br>٣. من القائمة ⋮ اختر Reset password أو احذف الحساب وأنشئ الطالب من جديد.<br><br>
  وتقدر تضيف بريد حقيقي للطالب من «تعديل» عشان يوصله رابط التغيير مستقبلًا.</div>
  <div class="mf"><button class="btn b-sec" data-close>تم</button></div>`);
}
async function studentForm(s){
  const e=!!s;let pv={};
  if(e){try{const p=await F.getDoc(dref('students',s.id,'private','info'));pv=p.exists()?p.data():{}}catch(err){}}
  s=s||{name:'',username:'',batch:BATCHES[0],supId:ST.user.uid,track:'normal'};
  const sups=ST.sups.filter(x=>x.active||x.id===s.supId);
  modal(`<div class="mh"><h3>${e?'تعديل طالب':'إضافة طالب'}</h3><button class="x" data-close aria-label="إغلاق">×</button></div>
  <form class="mb" id="f"><label>الاسم الكامل<input id="f-n" required value="${esc(s.name)}"></label>
  <div class="fr"><label>اسم المستخدم (إنجليزي)<input id="f-u" dir="ltr" required pattern="[A-Za-z0-9._\\-]{3,30}" title="حروف إنجليزية وأرقام فقط" value="${esc(s.username)}"></label><label>رقم الهوية<input id="f-id" dir="ltr" inputmode="numeric" pattern="[0-9]{10}" title="١٠ أرقام" value="${esc(pv.nid||'')}"></label></div>
  <div class="fr"><label>البريد الإلكتروني (اختياري)<input id="f-em" dir="ltr" type="email" value="${esc(pv.email||'')}" ${e?'':''}></label>${e?'':'<label>كلمة المرور<input id="f-pw" type="password" minlength="6" required></label>'}</div>
  <div class="fr3"><label>الدفعة<select id="f-b">${BATCHES.map(b=>`<option ${s.batch===b?'selected':''}>${b}</option>`).join('')}</select></label>
  <label>المشرف المسؤول<select id="f-s" ${isMain()?'':'disabled'}>${sups.map(x=>`<option value="${x.id}" ${s.supId===x.id?'selected':''}>${esc(x.name)}</option>`).join('')}</select></label>
  <label>المسار<select id="f-t"><option value="normal" ${s.track!=='itqan'?'selected':''}>مسار عادي</option><option value="itqan" ${s.track==='itqan'?'selected':''}>مسار اتقان</option></select></label></div>
  ${e?'<div class="note" style="margin:0">البريد الجديد يُستخدم لرابط تغيير كلمة المرور فقط، أما الدخول فيبقى باسم المستخدم أو رقم الهوية.</div>':'<div class="note" style="margin:0">يدخل الطالب باسم المستخدم أو رقم الهوية (أو البريد إن وُجد) مع كلمة المرور.</div>'}
  <div class="mf" style="padding:8px 0 0;border:0"><button class="btn b-pri" type="submit" id="f-ok">حفظ</button><button class="btn b-sec" type="button" data-close>إلغاء</button></div></form>`);
  $('#f').onsubmit=ev=>{ev.preventDefault();const ok=$('#f-ok');ok.disabled=true;
    const v={name:$('#f-n').value.trim(),username:$('#f-u').value.trim().toLowerCase(),batch:$('#f-b').value,supId:$('#f-s').value,track:$('#f-t').value};
    const nidv=$('#f-id').value.trim(),em=$('#f-em').value.trim().toLowerCase();
    run(async()=>{
      if(!e||v.username!==s.username){const k=await F.getDoc(dref('logins',v.username));if(k.exists())throw new Error('اسم المستخدم مستخدم لطالب آخر')}
      if(nidv&&nidv!==(pv.nid||'')){const k=await F.getDoc(dref('logins',nidv));if(k.exists())throw new Error('رقم الهوية مسجل لطالب آخر')}
      if(e){
        const loginEmail=pv.loginEmail||(s.username+'@'+LOGIN_DOMAIN);
        const ops=[['update',dref('students',s.id),v],['merge',dref('students',s.id,'private','info'),{nid:nidv,email:em,loginEmail}]];
        if(v.username!==s.username){ops.push(['delete',dref('logins',s.username)],['set',dref('logins',v.username),{email:loginEmail}])}
        if(nidv!==(pv.nid||'')){if(pv.nid)ops.push(['delete',dref('logins',pv.nid)]);if(nidv)ops.push(['set',dref('logins',nidv),{email:loginEmail}])}
        await commitAll(ops);Object.assign(s,v);
      }else{
        const loginEmail=em||(v.username+'@'+LOGIN_DOMAIN);
        const uid=await createAuthUser(loginEmail,$('#f-pw').value);
        const data={...v,active:true,stats:emptyStats(),createdAt:nowIso()};
        const ops=[['set',dref('students',uid),data],['set',dref('students',uid,'private','info'),{nid:nidv,email:em,loginEmail}],['set',dref('logins',v.username),{email:loginEmail}]];
        if(nidv)ops.push(['set',dref('logins',nidv),{email:loginEmail}]);
        await commitAll(ops);ST.students.push({id:uid,...data});
      }
      hide();repaint();
    },e?'تم حفظ التعديل':'تمت إضافة الطالب').catch(()=>{ok.disabled=false});
  };
}
function moveForm(s){
  modal(`<div class="mh"><div><h3>نقل الطالب لمشرف آخر</h3><span class="cell-sub">الطالب: ${esc(s.name)}</span></div><button class="x" data-close aria-label="إغلاق">×</button></div>
  <div class="mb"><label>المشرف الجديد<select id="mv">${ST.sups.filter(x=>x.id!==s.supId&&x.active).map(x=>`<option value="${x.id}">${esc(x.name)}</option>`).join('')}</select></label></div>
  <div class="mf"><button class="btn b-pri" id="ok">تأكيد النقل</button><button class="btn b-sec" data-close>إغلاق</button></div>`);
  $('#ok').onclick=()=>{const v=$('#mv').value;if(!v)return;run(async()=>{await F.updateDoc(dref('students',s.id),{supId:v});s.supId=v;hide();repaint()},'تم نقل الطالب')};
}
async function studentDetail(id){
  const s=S(id);if(!s)return;
  modal(`<div class="mh"><h3>${esc(s.name)}</h3><button class="x" data-close aria-label="إغلاق">×</button></div><div class="loading"><div class="spin"></div></div>`);
  try{
    const [rs,as]=await Promise.all([getAll('records',W('sid','==',id)),getAll('attendance',W('sid','==',id))]);
    const nw=rs.filter(r=>r.type==='new'),reasons={};as.filter(a=>a.status==='present').forEach(a=>reasons[a.event]=(reasons[a.event]||0)+1);
    modal(`<div class="mh"><div><h3>${esc(s.name)}</h3><span class="cell-sub">الدفعة: ${esc(s.batch)} · ${TRACK[s.track]} · ${esc(supName(s.supId))}</span></div><button class="x" data-close aria-label="إغلاق">×</button></div>
    <div class="mb"><div class="stat"><div><b>${ar(sumPages(rs))}</b><small>إجمالي الأوجه المسمّعة</small></div><div><b>${ar(rs.length)}</b><small>إجمالي عدد السجلات</small></div><div><b>${ar(nw.filter(r=>r.reps>=r.need).length)}</b><small>سجلات مكتملة التكرار</small></div><div><b>${ar(nw.filter(r=>r.reps<r.need).length)}</b><small>سجلات قيد التكرار</small></div></div>
    <div class="lbl">الحضور والغياب</div><div class="stat"><div><b>${ar(as.filter(a=>a.status==='present').length)}</b><small>عدد مرات الحضور</small></div><div><b style="color:var(--red)">${ar(as.filter(a=>a.status==='absent').length)}</b><small>عدد مرات الغياب</small></div></div>
    <div class="lbl">تفصيل أسباب الحضور</div><div style="display:flex;gap:6px;flex-wrap:wrap">${Object.entries(reasons).map(([k,v])=>`<span class="pill mute">${EVN[k]||k}: ${ar(v)}</span>`).join('')||'<span class="cell-sub">لا توجد بيانات بعد</span>'}</div>
    <div class="lbl">التسميع الأسبوعي (عدد الأوجه)</div>${rs.length?weekBars(rs):'<div class="cell-sub">لا توجد بيانات بعد</div>'}</div>`);
  }catch(e){toast(errMsg(e),true);hide()}
}

const pSupervisors={
  view(){
    return head('إدارة المشرفين','المشرف الرئيسي يرى كل الطلاب ويدير المشرفين، والمشرف العادي يرى طلابه فقط.',`<button class="btn b-pri" id="addSup">${ic('plus')}إضافة مشرف</button>`)+`
    <section class="panel"><div class="tbl-wrap"><table><thead><tr><th>الاسم</th><th>البريد</th><th>الجوال</th><th>الصلاحية</th><th>عدد الطلاب</th><th>الحالة</th><th>إجراءات</th></tr></thead><tbody>
    ${ST.sups.map(s=>`<tr><td class="n">${esc(s.name)}</td><td dir="ltr" style="text-align:right">${esc(s.email)}</td><td dir="ltr" style="text-align:right">${esc(s.phone)}</td><td><span class="pill ${s.role==='main'?'gold':'mute'}">${s.role==='main'?'مشرف رئيسي':'مشرف عادي'}</span></td><td>${ar(ST.students.filter(x=>x.supId===s.id).length)}</td><td><span class="pill ${s.active?'ok':'bad'}">${s.active?'مفعل':'موقوف'}</span></td>
    <td class="n">${s.id===ST.user.uid?'<span class="cell-sub">أنت</span>':`<button class="btn sm b-sec" data-role="${s.id}">${s.role==='main'?'جعله عاديًا':'جعله رئيسيًا'}</button> <button class="btn sm b-sec" data-tg="${s.id}">${s.active?'إيقاف':'تفعيل'}</button> <button class="btn sm b-dan" data-dl="${s.id}">حذف</button>`}</td></tr>`).join('')}
    </tbody></table></div></section>`;
  },
  bind(){
    $('#addSup').onclick=()=>{modal(`<div class="mh"><h3>إضافة مشرف جديد</h3><button class="x" data-close aria-label="إغلاق">×</button></div>
     <form class="mb" id="f"><label>الاسم<input id="f-n" required placeholder="أ. "></label><div class="fr"><label>البريد الإلكتروني<input id="f-e" type="email" dir="ltr" required></label><label>رقم الجوال<input id="f-p" dir="ltr" inputmode="tel"></label></div>
     <div class="fr"><label>كلمة المرور<input id="f-w" type="password" minlength="6" required></label><label>الصلاحيات<select id="f-r"><option value="normal">مشرف عادي</option><option value="main">مشرف رئيسي</option></select></label></div>
     <div class="mf" style="padding:8px 0 0;border:0"><button class="btn b-pri" type="submit" id="f-ok">حفظ</button><button class="btn b-sec" type="button" data-close>إلغاء</button></div></form>`);
     $('#f').onsubmit=e=>{e.preventDefault();$('#f-ok').disabled=true;run(async()=>{
       const email=$('#f-e').value.trim().toLowerCase();const uid=await createAuthUser(email,$('#f-w').value);
       const d={name:$('#f-n').value.trim(),email,phone:$('#f-p').value.trim(),role:$('#f-r').value,active:true,createdAt:nowIso()};
       await F.setDoc(dref('supervisors',uid),d);ST.sups.push({id:uid,...d});hide();repaint()},'تمت إضافة المشرف').catch(()=>{const b=$('#f-ok');if(b)b.disabled=false})}};
    $$('[data-tg]').forEach(b=>b.onclick=()=>{const s=SUP(b.dataset.tg);run(async()=>{await F.updateDoc(dref('supervisors',s.id),{active:!s.active});s.active=!s.active;repaint()})});
    $$('[data-role]').forEach(b=>b.onclick=()=>{const s=SUP(b.dataset.role);const r=s.role==='main'?'normal':'main';run(async()=>{await F.updateDoc(dref('supervisors',s.id),{role:r});s.role=r;repaint()},'تم تغيير الصلاحية')});
    $$('[data-dl]').forEach(b=>b.onclick=()=>{const s=SUP(b.dataset.dl);if(ST.students.some(x=>x.supId===s.id)){toast('انقل طلابه لمشرف آخر قبل الحذف',true);return}
      confirmBox(`حذف ملف ${esc(s.name)}؟`,'لن يستطيع الدخول للمنصة. (حسابه في Firebase Authentication يبقى، وتقدر تحذفه من هناك.)','حذف',()=>run(async()=>{await F.deleteDoc(dref('supervisors',s.id));ST.sups=ST.sups.filter(x=>x.id!==s.id);repaint()},'تم الحذف'))});
  }
};

/* ---------- تسجيل الحفظ والحضور ---------- */
let rSid=null,rTab='hifz';
const pRecords={
  async load(){
    const act=activeStudents().sort((a,b)=>a.name.localeCompare(b.name,'ar'));
    if(!rSid||!act.some(s=>s.id===rSid))rSid=act[0]?.id||null;
    const [todayAtt,recs,atts]=await Promise.all([getAll('attendance',W('date','==',TD())),rSid?getAll('records',W('sid','==',rSid)):[],rSid?getAll('attendance',W('sid','==',rSid)):[]]);
    return {todayAtt,recs:sortRecs(recs),atts:[...atts].sort((a,b)=>b.date.localeCompare(a.date))};
  },
  view(){
    const act=activeStudents().sort((a,b)=>a.name.localeCompare(b.name,'ar'));
    const isH=HDAYS().includes(today().getDay());
    const done=new Set(PD.todayAtt.map(a=>a.sid));const missing=isH?act.filter(s=>!done.has(s.id)):[];
    const s=S(rSid);
    return head('تسجيل الحفظ والحضور',`اليوم: ${DAYN[today().getDay()]} ${gd(TD())}${isH?'':' · 🌙 لا حلقة اليوم'}`)+
    (missing.length?`<div class="banner warn">${ic('alert')}<span>لم يسجل لهم حضور اليوم (${ar(missing.length)}): ${missing.slice(0,8).map(m=>esc(m.name.split(' ')[0])).join('، ')}${missing.length>8?'…':''}</span></div>`:'')+`
    <section class="panel"><div class="filters"><label>اختر طالب<select id="rs">${act.map(x=>`<option value="${x.id}" ${x.id===rSid?'selected':''}>${esc(x.name)}${done.has(x.id)?' ✓':''}</option>`).join('')||'<option>لا يوجد طلاب</option>'}</select></label></div>
    ${s?`<div class="row"><span class="av">${esc(first(s.name))}</span><span class="nm">الطالب: ${esc(s.name)}<small>الدفعة: ${esc(s.batch)} · ${TRACK[s.track]} · ${esc(supName(s.supId))}</small></span></div>
    <div class="tabs"><button class="tab ${rTab==='hifz'?'on':''}" data-t="hifz">📖 الحفظ</button><button class="tab ${rTab==='att'?'on':''}" data-t="att">🗓️ الحضور والغياب</button>
     <span style="margin-inline-start:auto"></span>${rTab==='hifz'?`<button class="btn b-pri" id="addR">${ic('plus')}إضافة حفظ جديد</button>`:`<button class="btn b-pri" id="addA">${ic('plus')}تسجيل حضور</button>`}</div>
    ${rTab==='hifz'?`<div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>السورة</th><th>الأوجه</th><th>النوع</th><th>التكرار</th><th></th></tr></thead><tbody>
     ${PD.recs.map(r=>`<tr><td class="n">${gd(r.date)}</td><td class="n">${esc(r.surah)}</td><td class="n">${ar(r.from)}–${ar(r.to)} <span class="cell-sub">(${ar(pages(r))})</span></td><td><span class="pill ${r.type==='new'?'info':'mute'}">${r.type==='new'?'حفظ جديد':'مراجعة'}</span>${r.notes?`<div class="cell-sub">${esc(r.notes)}</div>`:''}</td><td class="n">${repCell(r)}</td><td><button class="btn sm b-dan" data-delr="${r.id}">حذف</button></td></tr>`).join('')||'<tr><td colspan="6" class="empty">لا توجد سجلات</td></tr>'}</tbody></table></div>`
    :`<div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>اليوم</th><th>النوع</th><th>الحالة</th><th>السبب</th><th></th></tr></thead><tbody>
     ${PD.atts.map(a=>`<tr><td class="n">${gd(a.date)}</td><td>${DAYN[P(a.date).getDay()]}</td><td>${EVN[a.event]||a.event}</td><td><span class="pill ${a.status==='present'?'ok':a.status==='absent'?'bad':'warn'}">${STATUS[a.status]}</span></td><td>${esc(a.reason)||'—'}</td><td><button class="btn sm b-dan" data-dela="${a.id}">حذف</button></td></tr>`).join('')||'<tr><td colspan="6" class="empty">لا توجد سجلات حضور</td></tr>'}</tbody></table></div>`}`:'<div class="empty">لا يوجد طلاب مفعّلون. أضف الطلاب من صفحة الطلاب.</div>'}
    </section>`;
  },
  bind(){
    const sel=$('#rs');if(sel)sel.onchange=()=>{rSid=sel.value;refresh()};
    $$('.tab').forEach(b=>b.onclick=()=>{rTab=b.dataset.t;repaint()});
    const s=S(rSid);if(!s)return;
    const ab=$('#addR');if(ab)ab.onclick=()=>recordForm(s);
    const aa=$('#addA');if(aa)aa.onclick=()=>attendanceForm(s);
    $$('[data-delr]').forEach(b=>b.onclick=()=>confirmBox('حذف هذا السجل؟','','حذف',()=>run(async()=>{const r=findRec(b.dataset.delr);await deleteRecord(r);await reloadStudents();refresh()},'تم حذف السجل')));
    $$('[data-dela]').forEach(b=>b.onclick=()=>confirmBox('حذف سجل الحضور؟','','حذف',()=>run(async()=>{const a=PD.atts.find(x=>x.id===b.dataset.dela);await deleteAttendance(a);a&&(S(a.sid).stats[a.status]--);refresh()},'تم الحذف')));
  }
};
function recordForm(s){
  const st=s.lastNew?Math.min(604,(+s.lastNew.to)+1):2;
  modal(`<div class="mh"><h3>إضافة حفظ جديد</h3><button class="x" data-close aria-label="إغلاق">×</button></div>
  <form class="mb" id="f"><div class="fr"><label>التاريخ<input type="date" id="f-d" value="${TD()}" required></label><label>نوع الحفظ<select id="f-t"><option value="new">حفظ جديد</option><option value="review">مراجعة</option></select></label></div>
  <label>السورة<select id="f-s">${SURAHS.map(([n,p])=>`<option value="${p}" ${n===surahOf(st)?'selected':''}>${n}</option>`).join('')}</select></label>
  <div class="fr"><label>من وجه (١–٦٠٤)<input type="number" id="f-a" min="1" max="604" value="${st}" required></label><label>إلى وجه (١–٦٠٤)<input type="number" id="f-b" min="1" max="604" value="${st}" required></label></div>
  <label>ملاحظات<textarea id="f-n" style="min-height:60px"></textarea></label><div id="f-info" class="note" style="margin:0"></div>
  <div class="mf" style="padding:8px 0 0;border:0"><button class="btn b-pri" type="submit" id="f-ok">حفظ السجل</button><button class="btn b-sec" type="button" data-close>إلغاء</button></div></form>`);
  const info=()=>{const a=+$('#f-a').value,b=+$('#f-b').value,n=Math.max(0,b-a+1),t=$('#f-t').value;$('#f-info').textContent=`عدد الأوجه المحدد: ${ar(n)}`+(t==='new'?` — الطالب على ${TRACK[s.track]}، سيتطلب هذا السجل ${ar(repsFor(s))} مرات تكرار.`:' — لا يوجد تكرار للمراجعة.')};
  $('#f-s').onchange=()=>{$('#f-a').value=$('#f-s').value;$('#f-b').value=$('#f-s').value;info()};['#f-a','#f-b','#f-t'].forEach(x=>$(x).oninput=info);info();
  $('#f').onsubmit=e=>{e.preventDefault();const a=+$('#f-a').value,b=+$('#f-b').value;if(b<a){toast('«إلى وجه» لازم يكون بعد «من وجه» أو يساويه',true);return}
    $('#f-ok').disabled=true;
    run(async()=>{await addRecord(s,{date:$('#f-d').value,surah:surahOf(a),from:a,to:b,type:$('#f-t').value,notes:$('#f-n').value.trim()});await reloadStudents();hide();rTab='hifz';refresh()},`تم التسميع: من وجه ${ar(a)} إلى وجه ${ar(b)}`).catch(()=>{const k=$('#f-ok');if(k)k.disabled=false})};
}
function attendanceForm(s){
  modal(`<div class="mh"><h3>تسجيل الحضور</h3><button class="x" data-close aria-label="إغلاق">×</button></div>
  <form class="mb" id="f"><div class="fr"><label>التاريخ<input type="date" id="f-d" value="${TD()}" required></label><label>النوع<select id="f-e">${EVENTS.map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select></label></div>
  <label>هل حضر ${esc(s.name.split(' ')[0])}؟<select id="f-s"><option value="present">حاضر</option><option value="absent">غايب</option><option value="excused">اعتذار</option></select></label>
  <label id="f-rw" hidden>السبب<input id="f-r" placeholder="سبب الاعتذار أو الغياب"></label><div class="note" id="f-w" style="margin:0" hidden></div>
  <div class="mf" style="padding:8px 0 0;border:0"><button class="btn b-pri" type="submit" id="f-ok">حفظ</button><button class="btn b-sec" type="button" data-close>إلغاء</button></div></form>`);
  const dw=()=>{const d=P($('#f-d').value||TD());const w=$('#f-w');if(!HDAYS().includes(d.getDay())){w.hidden=false;w.textContent=`يوم ${DAYN[d.getDay()]} ليس من أيام الحلقة.`}else w.hidden=true};
  $('#f-d').oninput=dw;dw();$('#f-s').onchange=()=>{$('#f-rw').hidden=$('#f-s').value==='present'};
  $('#f').onsubmit=e=>{e.preventDefault();$('#f-ok').disabled=true;const st=$('#f-s').value;
    run(async()=>{await saveAttendance(s,{date:$('#f-d').value,event:$('#f-e').value,status:st,reason:st==='present'?'':$('#f-r').value.trim()});await reloadStudents();hide();rTab='att';refresh()},
      st==='absent'?'تم التسجيل، ووصل الطالب تنبيه الغياب':'تم تسجيل الحضور').catch(()=>{const k=$('#f-ok');if(k)k.disabled=false})};
}

/* ---------- التقارير ---------- */
const pReports={
  view(){
    const list=[...myStudents()].sort((a,b)=>a.name.localeCompare(b.name,'ar'));
    return head('التقارير','كشف الطلاب وسجلات الحفظ — التصدير بملف يفتح في Excel',`<button class="btn b-sec" id="xS">${ic('dl')}تصدير كشف الطلاب</button><button class="btn b-sec" id="xR">${ic('dl')}تصدير سجلات الحفظ</button><button class="btn b-sec" id="pr">${ic('print')}طباعة</button>`)+`
    <section class="panel"><div class="panel-h"><h2>كشف الطلاب</h2><span class="cell-sub">${ar(list.length)} طالب</span></div><div class="tbl-wrap"><table><thead><tr><th>الاسم</th><th>اسم المستخدم</th><th>الدفعة</th><th>المشرف</th><th>المسار</th><th>الأوجه</th><th>الغياب</th><th>الحالة</th></tr></thead><tbody>
    ${list.map(s=>`<tr><td class="n">${esc(s.name)}</td><td dir="ltr" style="text-align:right">${esc(s.username)}</td><td class="n">${esc(s.batch)}</td><td class="n">${esc(supName(s.supId))}</td><td class="n">${TRACK[s.track]}</td><td>${ar(s.stats.pages)}</td><td>${ar(s.stats.absent)}</td><td><span class="pill ${s.active?'ok':'bad'}">${s.active?'مفعل':'موقوف'}</span></td></tr>`).join('')||'<tr><td colspan="8" class="empty">لا يوجد طلاب</td></tr>'}</tbody></table></div></section>`;
  },
  bind(){
    $('#pr').onclick=()=>window.print();
    $('#xS').onclick=()=>csvDownload('كشف_الطلاب.csv',[['الاسم','اسم المستخدم','الدفعة','المشرف','المسار','إجمالي الأوجه','حفظ جديد','مراجعة','الحضور','الغياب','الاعتذار','الحالة'],...myStudents().map(s=>[s.name,s.username,s.batch,supName(s.supId),TRACK[s.track],s.stats.pages,s.stats.newPages,s.stats.revPages,s.stats.present,s.stats.absent,s.stats.excused,s.active?'مفعل':'موقوف'])]);
    $('#xR').onclick=()=>run(async()=>{const mine=new Set(myStudents().map(s=>s.id));const rs=(await getAll('records',W('date','>=',ST.settings.semStart))).filter(r=>mine.has(r.sid)).sort((a,b)=>a.date.localeCompare(b.date));
      csvDownload('سجلات_الحفظ.csv',[['الطالب','المسار','التاريخ','السورة','من وجه','إلى وجه','عدد الأوجه','النوع','التكرار','ملاحظات'],...rs.map(r=>{const s=S(r.sid);return[s?.name||'',TRACK[s?.track]||'',r.date,r.surah,r.from,r.to,pages(r),r.type==='new'?'حفظ جديد':'مراجعة',r.type==='new'?`${r.reps}/${r.need}`:'',r.notes||'']})])},'تم تنزيل الملف');
  }
};

/* ---------- المتعثرين ---------- */
const pStruggling={
  async load(){
    const ws=wkStart();
    const [recs,atts,sent]=await Promise.all([getAll('records',W('date','>=',ws)),getAll('attendance',W('date','>=',ws)),getAll('notifications',W('kind','==','struggle'),W('week','==',ws))]);
    return {week:recs,watt:atts,sent:new Set(sent.map(n=>n.sid))};
  },
  rows(){return activeStudents().map(s=>({s,w:weekStats(s,PD.week,PD.watt)})).filter(x=>isStruggling(x.w)).sort((a,b)=>(b.w.nwShort+b.w.rvShort+b.w.abs)-(a.w.nwShort+a.w.rvShort+a.w.abs))},
  view(){
    const ws=wkStart(),days=HDAYS(),list=this.rows();
    const g=ST.settings;
    return head('المتعثرين',`قائمة المتعثرين — هذا الأسبوع (${gd(ws)} – ${gd(iso(add(P(ws),Math.max(...days))))})`,`<button class="btn b-sec" id="cpS">${ic('copy')}نسخ التقرير</button>`)+`
    <div class="banner info">${ic('info')}<span>الهدف الأسبوعي: ${ar(g.goalNormalNew)} أوجه حفظ + ${ar(g.goalNormalRev)} مراجعة (مسار عادي) — ${ar(g.goalItqanNew)} أوجه حفظ (مسار اتقان). القائمة تتحدث كل أسبوع.</span></div>
    ${list.length?`<section class="panel"><div class="tbl-wrap"><table><thead><tr><th>الاسم</th><th>المشرف</th><th>أوجه الحفظ</th><th>أوجه المراجعة</th><th>نقص الأوجه</th><th>الغياب</th><th>الاعتذار</th><th>عدم التكرار</th><th></th></tr></thead><tbody>
    ${list.map(({s,w})=>`<tr><td class="n">${esc(s.name)}</td><td class="n">${esc(supName(s.supId))}</td><td>${ar(w.nw)}</td><td>${s.track==='itqan'?'<span class="cell-sub">غير مطلوب</span>':ar(w.rv)}</td><td>${w.nwShort+w.rvShort?`<span class="pill bad">${ar(w.nwShort+w.rvShort)}</span>`:'—'}</td><td>${w.abs?`<span class="pill bad">${ar(w.abs)}</span>`:'—'}</td><td>${ar(w.exc)}</td><td>${w.norep?`<span class="pill warn">${ar(w.norep)}</span>`:'—'}</td>
     <td>${PD.sent.has(s.id)?'<span class="pill ok">تم الإرسال ✓</span>':`<button class="btn sm b-sec" data-alert="${s.id}">إرسال تنبيه</button>`}</td></tr>`).join('')}</tbody></table></div></section>`
    :'<section class="panel"><div class="empty">ما شاء الله، ما فيه متعثرين هالأسبوع 🎉</div></section>'}`;
  },
  bind(){
    const ws=wkStart();
    $$('[data-alert]').forEach(b=>b.onclick=()=>{const s=S(b.dataset.alert),w=weekStats(s,PD.week,PD.watt);
      const parts=[];if(w.nwShort+w.rvShort)parts.push(`ناقصك ${ar(w.nwShort+w.rvShort)} ${w.nwShort+w.rvShort>2?'أوجه':'وجه'} عن هدف الأسبوع`);if(w.abs)parts.push(`عندك ${ar(w.abs)} ${w.abs>1?'غيابات':'غياب'}`);if(w.norep)parts.push(`عندك ${ar(w.norep)} ${w.norep>1?'سجلات':'سجل'} ما كررتها`);
      run(async()=>{await F.setDoc(dref('notifications',`struggle_${ws}_${s.id}`),{sid:s.id,kind:'struggle',week:ws,text:'⚠️ تنبيه: '+parts.join('، ')+'. اجتهد وتداركها 💪',at:nowIso(),read:false});PD.sent.add(s.id);repaint()},'وصل الطالب التنبيه')});
    $('#cpS').onclick=()=>{const L=this.rows();const sec=(t,f)=>t+'\n'+(L.filter(f).map(x=>'- '+x.s.name).join('\n')||'لا يوجد')+'\n';
      copy(`تقرير الأسبوع الحالي (${gd(ws)})\n\n`+sec('عدد نقص الأوجه لدى المتعثرين بالحفظ:',x=>x.w.nwShort)+'\n'+sec('عدد نقص الأوجه لدى المتعثرين بالمراجعة:',x=>x.w.rvShort)+'\n'+sec('عدد الغياب:',x=>x.w.abs)+'\n'+sec('عدد الاعتذارات:',x=>x.w.exc)+'\n'+sec('عدد مرات عدم التكرار:',x=>x.w.norep))};
  }
};

/* ---------- الإنجازات ---------- */
const pAchievements={
  view(){
    const me=ST.role==='student'?ST.user.uid:null;
    const act=ST.students.filter(s=>s.active);
    if(!act.length)return head('لوحة الإنجازات')+'<section class="panel"><div class="empty">لا توجد بيانات كافية بعد</div></section>';
    const top=act.map(s=>({s,v:s.stats.pages})).sort((a,b)=>b.v-a.v);
    const low=act.map(s=>({s,v:s.stats.absent})).sort((a,b)=>a.v-b.v||b.s.stats.pages-a.s.stats.pages);
    const board=(t,arr,unit)=>{const shown=arr.slice(0,10);const mi=arr.findIndex(x=>x.s.id===me);
      return `<section class="panel"><div class="panel-h"><h2>${t}</h2></div>${shown.map((x,i)=>`<div class="rank ${i<3?'r'+(i+1):''} ${x.s.id===me?'me':''}"><span class="rn">${ar(i+1)}</span><span class="nm">${esc(x.s.name)} ${x.s.id===me?'(أنت)':''}</span><b style="font-variant-numeric:tabular-nums">${ar(x.v)} <small class="cell-sub" style="font-weight:400">${unit}</small></b></div>`).join('')}
      ${me&&mi>=10?`<div class="rank me"><span class="rn">${ar(mi+1)}</span><span class="nm">(ترتيبك أنت)</span><b>${ar(arr[mi].v)}</b></div>`:''}</section>`};
    return head('لوحة الإنجازات','ترتيب طلاب الحلقة')+`<div class="gridauto">${board('📖 أكثر الأوجه',top,'وجه')}${board('✅ أقل الغياب',low,'غياب')}</div>`;
  }
};

/* ---------- رسائل الطلاب ---------- */
let mTab='new';
const pMessages={
  async load(){await loadInbox()},
  view(){
    const L=ST.msgs.filter(m=>mTab==='new'?!m.read:m.read).sort((a,b)=>String(b.at).localeCompare(String(a.at)));
    const nN=ST.msgs.filter(m=>!m.read).length,nO=ST.msgs.length-nN;
    return head('رسائل الطلاب','',mTab==='old'&&nO?`<button class="btn b-dan" id="delOld">حذف الرسائل القديمة</button>`:'')+`
    <section class="panel"><div class="tabs"><button class="tab ${mTab==='new'?'on':''}" data-m="new">🆕 الجديدة (${ar(nN)})</button><button class="tab ${mTab==='old'?'on':''}" data-m="old">📁 القديمة (${ar(nO)})</button></div>
    ${L.map(m=>`<div class="row" style="align-items:flex-start;flex-direction:column;gap:6px"><div style="display:flex;gap:8px;align-items:center;flex-wrap:wrap;width:100%"><b style="font-weight:500">${esc(m.name||S(m.sid)?.name||'طالب')}</b><span class="pill ${m.reason==='مشكلة تقنية'?'bad':m.reason==='اقتراحات'?'gold':'info'}">${esc(m.reason)}</span><span class="cell-sub">${gd(String(m.at).slice(0,10))}</span>
     <span style="margin-inline-start:auto;display:flex;gap:6px">${m.read?'':`<button class="btn sm b-sec" data-rd="${m.id}">${ic('check')}تمت القراءة</button>`}<button class="btn sm b-dan" data-dm="${m.id}">حذف</button></span></div><div style="white-space:pre-wrap;max-width:72ch">${esc(m.text)}</div></div>`).join('')||`<div class="empty">${mTab==='new'?'لا توجد رسائل جديدة':'لا توجد رسائل قديمة'}</div>`}</section>`;
  },
  bind(){
    $$('[data-m]').forEach(b=>b.onclick=()=>{mTab=b.dataset.m;repaint()});
    $$('[data-rd]').forEach(b=>b.onclick=()=>run(async()=>{await F.updateDoc(dref('messages',b.dataset.rd),{read:true});ST.msgs.find(m=>m.id===b.dataset.rd).read=true;render()}));
    $$('[data-dm]').forEach(b=>b.onclick=()=>confirmBox('حذف هذه الرسالة؟','','حذف',()=>run(async()=>{await F.deleteDoc(dref('messages',b.dataset.dm));ST.msgs=ST.msgs.filter(m=>m.id!==b.dataset.dm);render()})));
    const d=$('#delOld');if(d)d.onclick=()=>confirmBox('حذف الرسائل القديمة؟','تُحذف كل الرسائل المقروءة.','حذف',()=>run(async()=>{const o=ST.msgs.filter(m=>m.read);await commitAll(o.map(m=>['delete',dref('messages',m.id)]));ST.msgs=ST.msgs.filter(m=>!m.read);repaint()},'تم الحذف'));
  }
};

/* ---------- الحجز الأسري ---------- */
const bookerName=b=>b?.name||(b?.sid?S(b.sid)?.name:b?.supId?supName(b.supId):'')||'';
const booked=b=>!!(b&&(b.sid||b.supId)&&!b.movedTo);
const dbox=(d,cls='')=>{const x=P(d);return `<div class="dbox ${cls}"><b>${ar(x.getDate())}</b><small>${DAYN[x.getDay()]}</small></div>`};
async function reloadBookings(){ST.bookings=Object.fromEntries((await getAll('bookings')).map(b=>[b.id,b]))}
let bShowPast=false;
const pBookings={
  async load(){await reloadBookings()},
  view(){
    const days=semDays().filter(d=>bShowPast||d>=TD());
    return head('إدارة الحجوزات','الحجز الأسري: أسرة تستضيف الحلقة في يوم من أيام الحلقة، حجز واحد لكل يوم.',`<label class="chk" style="font-size:13px"><input type="checkbox" id="past" ${bShowPast?'checked':''}>إظهار الأيام الماضية</label>`)+`
    <section class="panel">${days.map(d=>{const b=ST.bookings[d]||{};
     const st=b.holiday?'<span class="pill mute">🌙 إجازة</span>':b.movedTo?`<span class="pill info">منقول إلى ${gd(b.movedTo)}</span>`:booked(b)?'<span class="pill ok">محجوز</span>':'<span class="pill warn">غير محجوز</span>';
     return `<div class="dayrow">${dbox(d,b.holiday?'hol':'')}<div class="nm">${booked(b)&&!b.holiday?`${esc(bookerName(b))} <span class="cell-sub">— ${b.sid?'الله يجزاه خير':'الله يكرمه'}</span>`:`<span class="cell-sub" style="font-size:14px">${b.holiday?'لا حلقة في هذا اليوم':'لا يوجد حجز'}</span>`}<small>${gd(d)} · ${hj(P(d),{day:'numeric',month:'long'})}${b.note?' · 📝 '+esc(b.note):''}</small></div>${st}
     <div class="menu"><button class="btn sm b-sec" data-day="${d}">تعديل اليوم</button></div></div>`}).join('')||'<div class="empty">لا توجد أيام بالفصل الدراسي. حدّد تاريخ الفصل من الإعدادات.</div>'}</section>`;
  },
  bind(){
    $('#past').onchange=e=>{bShowPast=e.target.checked;repaint()};
    $$('[data-day]').forEach(btn=>btn.onclick=e=>{e.stopPropagation();$$('.menu-l').forEach(m=>m.remove());const d=btn.dataset.day;const b=ST.bookings[d]||{};
      const m=document.createElement('div');m.className='menu-l';
      m.innerHTML=`<button data-a="h">${b.holiday?'إلغاء الإجازة':'اعتبارها إجازة'}</button>${booked(b)?'<button data-a="m">نقل ليوم آخر</button><button data-a="c" class="d">إلغاء الحجز</button>':''}${!booked(b)&&!b.holiday?'<button data-a="a">حجز باسم طالب</button>':''}<button data-a="n">ملاحظة</button>`;
      btn.parentNode.appendChild(m);
      const ref=dref('bookings',d),done=()=>reloadBookings().then(repaint);
      m.onclick=ev=>{const a=ev.target.dataset.a;if(!a)return;m.remove();
        if(a==='h')confirmBox(b.holiday?'إلغاء الإجازة؟':`اعتبار يوم ${DAYN[P(d).getDay()]} ${gd(d)} إجازة؟`,booked(b)?'يبقى الحجز مسجلًا، وتقدر تنقله ليوم آخر.':'','تأكيد',()=>run(()=>F.setDoc(ref,{holiday:!b.holiday},{merge:true})).then(done));
        if(a==='c')confirmBox('إلغاء هذا الحجز؟','','إلغاء الحجز',()=>run(()=>F.updateDoc(ref,{sid:F.deleteField(),supId:F.deleteField(),name:F.deleteField()}),'تم إلغاء الحجز').then(done));
        if(a==='n'){modal(`<div class="mh"><h3>ملاحظة ليوم ${gd(d)}</h3><button class="x" data-close aria-label="إغلاق">×</button></div><div class="mb"><textarea id="nt">${esc(b.note||'')}</textarea></div><div class="mf"><button class="btn b-pri" id="ok">حفظ</button><button class="btn b-sec" data-close>إلغاء</button></div>`);
          $('#ok').onclick=()=>run(()=>F.setDoc(ref,{note:$('#nt').value.trim()},{merge:true})).then(()=>{hide();done()})}
        if(a==='a'){const taken=new Set(Object.entries(ST.bookings).filter(([x,v])=>x>=TD()&&booked(v)&&v.sid).map(([,v])=>v.sid));
          modal(`<div class="mh"><h3>حجز ${DAYN[P(d).getDay()]} ${gd(d)} باسم طالب</h3><button class="x" data-close aria-label="إغلاق">×</button></div><div class="mb"><label>الطالب<select id="bs">${activeStudents().filter(s=>!taken.has(s.id)).sort((x,y)=>x.name.localeCompare(y.name,'ar')).map(s=>`<option value="${s.id}">${esc(s.name)}</option>`).join('')}</select></label></div><div class="mf"><button class="btn b-pri" id="ok">حجز</button><button class="btn b-sec" data-close>إلغاء</button></div>`);
          $('#ok').onclick=()=>{const s=S($('#bs').value);if(!s)return;run(()=>F.setDoc(ref,{sid:s.id,name:s.name},{merge:true}),'تم الحجز').then(()=>{hide();done()})}}
        if(a==='m'){const free=semDays().filter(x=>x>=TD()&&x!==d&&!booked(ST.bookings[x])&&!ST.bookings[x]?.holiday);
          modal(`<div class="mh"><h3>انقل حجز ${gd(d)} إلى أي يوم؟</h3><button class="x" data-close aria-label="إغلاق">×</button></div><div class="mb"><label>اليوم الجديد<select id="mv">${free.map(x=>`<option value="${x}">${DAYN[P(x).getDay()]} ${gd(x)}</option>`).join('')}</select></label></div><div class="mf"><button class="btn b-pri" id="ok" ${free.length?'':'disabled'}>نقل</button><button class="btn b-sec" data-close>إلغاء</button></div>`);
          $('#ok').onclick=()=>{const to=$('#mv').value;const who=b.sid?{sid:b.sid,name:bookerName(b)}:{supId:b.supId,name:bookerName(b)};
            run(()=>commitAll([['merge',dref('bookings',to),who],['update',ref,{sid:F.deleteField(),supId:F.deleteField(),name:F.deleteField(),movedTo:to}]]),'تم نقل الحجز').then(()=>{hide();done()})}}
      }});
  }
};
function bookingList(who){
  const days=semDays().filter(d=>d>=TD());
  const isMine=b=>b&&!b.movedTo&&((who.sid&&b.sid===who.sid)||(who.supId&&b.supId===who.supId));
  const mine=Object.entries(ST.bookings).find(([d,b])=>d>=TD()&&isMine(b));
  const tmr=iso(add(today(),1));
  return (mine&&mine[0]===tmr?`<div class="banner gold">${ic('bell')}<span>🔔 تذكير: بكرا موعد حجزك! لا تنسى.</span></div>`:'')+
  (mine?`<div class="banner info">${ic('info')}<span>عندك حجز حالي بتاريخ ${DAYN[P(mine[0]).getDay()]} ${gd(mine[0])} — لازم تلغيه لو تبي تحجز موعد ثاني.</span></div>`:'')+
  `<section class="panel">${days.map(d=>{const b=ST.bookings[d]||{};const own=isMine(b);const tk=booked(b);
   return `<div class="dayrow">${dbox(d,b.holiday?'hol':own?'mine':'')}<div class="nm">${b.holiday?'<span class="cell-sub" style="font-size:14px">🌙 إجازة</span>':b.movedTo?`<span class="cell-sub" style="font-size:14px">منقول إلى ${gd(b.movedTo)}</span>`:own?'<b style="font-weight:600;color:var(--gold-ink)">حجزك أنت</b>':tk?`محجوز باسم: ${esc(bookerName(b))} <span class="cell-sub">— الله يجزاه خير 🌹</span>`:'<span class="cell-sub" style="font-size:14px">متاح</span>'}<small>${gd(d)}${d===tmr?' (بكرا)':''}${b.note?' · 📝 '+esc(b.note):''}</small></div>
   ${own?`<button class="btn sm b-dan" data-bc="${d}">إلغاء</button>`:(!tk&&!b.holiday&&!b.movedTo)?`<button class="btn sm b-pri" data-bk="${d}" ${mine?'disabled':''}>حجز</button>`:''}</div>`}).join('')||'<div class="empty">لا توجد أيام متاحة بالفصل الدراسي</div>'}</section>`;
}
function bindBookingList(who){
  const name=ST.me.name;
  $$('[data-bk]').forEach(b=>b.onclick=()=>{const d=b.dataset.bk;confirmBox(`حجز يوم ${DAYN[P(d).getDay()]} ${gd(d)} للأسري؟`,'تستضيف أسرتك الحلقة في هذا اليوم.','حجز',()=>run(async()=>{
    const cur=await F.getDoc(dref('bookings',d));if(cur.exists()&&booked(cur.data()))throw new Error('هذا الموعد محجوز مسبقًا.');
    await F.setDoc(dref('bookings',d),{...who,name},{merge:true});await reloadBookings();repaint()},'تم الحجز، الله يكرمكم').catch(()=>reloadBookings().then(repaint)))});
  $$('[data-bc]').forEach(b=>b.onclick=()=>confirmBox('إلغاء حجزك؟','','إلغاء الحجز',()=>run(async()=>{const k=who.sid?'sid':'supId';await F.updateDoc(dref('bookings',b.dataset.bc),{[k]:F.deleteField(),name:F.deleteField()});await reloadBookings();repaint()},'تم إلغاء الحجز')));
}
const pMyBookings={async load(){await reloadBookings()},view(){return head('حجوزاتي','احجز يوم الأسري باسمك كمشرف')+bookingList({supId:ST.user.uid})},bind(){bindBookingList({supId:ST.user.uid})}};

/* ---------- النسخ الاحتياطي ---------- */
const BK_COLS=['supervisors','students','records','attendance','bookings','messages','notifications','settings'];
const pBackup={
  view(){
    return head('النسخ الاحتياطي')+`<div class="gridauto">
     <section class="panel"><div class="panel-h"><h2>نسخ احتياطي</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px"><p style="margin:0;color:var(--muted);font-size:14px">يصدّر جميع البيانات (طلاب، مشرفين، سجلات، حضور، حجوزات، رسائل) إلى ملف JSON على جهازك. سوّها كل فترة.</p><button class="btn b-pri" id="bk">${ic('dl')}تنزيل نسخة احتياطية</button></div></section>
     <section class="panel"><div class="panel-h"><h2>استعادة نسخة احتياطية</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:12px"><p style="margin:0;color:var(--muted);font-size:14px">يعيد كتابة الطلاب والسجلات والحضور والحجوزات والإعدادات من ملف سابق. لا يعيد حسابات الدخول نفسها لأنها في Firebase Authentication.</p><label class="btn b-sec" style="flex-direction:row;cursor:pointer;color:var(--ink)">${ic('up')}استعادة من ملف<input type="file" id="rf" accept="application/json,.json" hidden></label></div></section></div>`;
  },
  bind(){
    $('#bk').onclick=()=>run(async()=>{const out={app:'abu-hurairah',at:nowIso()};
      for(const c of BK_COLS)out[c]=await getAll(c);
      out.studentsPrivate={};await Promise.all(out.students.map(async s=>{const p=await F.getDoc(dref('students',s.id,'private','info'));if(p.exists())out.studentsPrivate[s.id]=p.data()}));
      out.logins={};for(const s of out.students){const k=String(s.username||'').toLowerCase();const pv=out.studentsPrivate[s.id]||{};if(k)out.logins[k]={email:pv.loginEmail||k+'@'+LOGIN_DOMAIN};if(pv.nid)out.logins[pv.nid]={email:pv.loginEmail||k+'@'+LOGIN_DOMAIN}}
      const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([JSON.stringify(out,null,1)],{type:'application/json'}));a.download=`نسخة_احتياطية_حلقات_أبي_هريرة_${TD()}.json`;document.body.appendChild(a);a.click();setTimeout(()=>a.remove(),500)},'تم إنشاء النسخة الاحتياطية وتنزيلها.');
    $('#rf').onchange=e=>{const f=e.target.files[0];if(!f)return;const rd=new FileReader();rd.onload=()=>{let d;try{d=JSON.parse(rd.result);if(d.app!=='abu-hurairah')throw 0}catch(x){toast('ملف النسخة الاحتياطية غير صالح.',true);return}
      confirmBox('استعادة النسخة الاحتياطية؟',`نسخة بتاريخ ${esc(String(d.at).slice(0,10))}. تُكتب البيانات فوق الموجودة بنفس المعرّفات.`,'استعادة',()=>run(async()=>{
        const ops=[];['students','records','attendance','bookings','messages','notifications','settings'].forEach(c=>(d[c]||[]).forEach(({id,...v})=>ops.push(['set',dref(c,id),v])));
        Object.entries(d.studentsPrivate||{}).forEach(([id,v])=>ops.push(['set',dref('students',id,'private','info'),v]));
        Object.entries(d.logins||{}).forEach(([k,v])=>ops.push(['set',dref('logins',k),v]));
        await commitAll(ops);await loadBase();},'تمت استعادة النسخة الاحتياطية بنجاح.').then(()=>render()))};rd.readAsText(f)};
  }
};

/* ---------- الإعدادات ---------- */
const pSettings={
  view(){
    const isS=ST.role==='student',g=ST.settings;
    const dark=PREF.theme==='dark'||(!PREF.theme&&matchMedia('(prefers-color-scheme: dark)').matches);
    return head('الإعدادات')+`<div class="gridauto">
    <section class="panel"><div class="panel-h"><h2>المظهر</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
     <label class="chk"><input type="checkbox" id="dk" ${dark?'checked':''}> الوضع الليلي</label>
     <div><div style="font-size:13px;color:var(--muted);margin-bottom:6px">لون الموقع</div><div class="seg"><button data-ac="green" aria-pressed="${PREF.accent!=='gold'}">أخضر</button><button data-ac="gold" aria-pressed="${PREF.accent==='gold'}">ذهبي</button></div></div></div></section>
    ${isMain()?`<section class="panel"><div class="panel-h"><h2>الفصل الدراسي وأيام الحلقة</h2></div><form class="panel-b" id="semF"><p style="margin:0;color:var(--muted);font-size:13.5px">يُستخدم لحساب أيام الحجز الأسري. حدده مرة وحدة بدقة.</p>
      <div class="fr"><label>تاريخ البداية<input type="date" id="s1" value="${g.semStart}" required></label><label>تاريخ النهاية<input type="date" id="s2" value="${g.semEnd}" required></label></div>
      <div><div style="font-size:13px;color:var(--muted);margin-bottom:6px">أيام الحلقة</div><div class="days-pick">${DAYN.map((n,i)=>`<label><input type="checkbox" name="hd" value="${i}" ${HDAYS().includes(i)?'checked':''}>${n}</label>`).join('')}</div></div>
      <button class="btn b-pri" type="submit">حفظ</button></form></section>
    <section class="panel"><div class="panel-h"><h2>الهدف الأسبوعي والتكرار</h2></div><form class="panel-b" id="gF"><p style="margin:0;color:var(--muted);font-size:13.5px">يُستخدم لقائمة المتعثرين وتذكيرات الطلاب، وعدد مرات تكرار كل حفظ جديد.</p>
      <div class="fr3"><label>حفظ أسبوعي (عادي)<input type="number" min="0" id="g1" value="${g.goalNormalNew}"></label><label>مراجعة أسبوعية (عادي)<input type="number" min="0" id="g2" value="${g.goalNormalRev}"></label><label>حفظ أسبوعي (اتقان)<input type="number" min="0" id="g3" value="${g.goalItqanNew}"></label></div>
      <div class="fr"><label>مرات التكرار (عادي)<input type="number" min="1" max="20" id="g4" value="${g.repsNormal}"></label><label>مرات التكرار (اتقان)<input type="number" min="1" max="20" id="g5" value="${g.repsItqan}"></label></div>
      <button class="btn b-pri" type="submit">حفظ</button></form></section>`:''}
    <section class="panel"><div class="panel-h"><h2>تغيير كلمة المرور</h2></div><form class="panel-b" id="pwF"><label>كلمة المرور الجديدة<input type="password" id="pw" minlength="6" required autocomplete="new-password"></label><button class="btn b-pri" type="submit">حفظ كلمة المرور</button></form></section></div>
    <div class="note">نظام حلقات أبي هريرة — متصل بقاعدة بيانات Firebase الخاصة بالحلقة.</div>`;
  },
  bind(){
    $('#dk').onchange=e=>{PREF.theme=e.target.checked?'dark':'light';applyPref()};
    $$('[data-ac]').forEach(b=>b.onclick=()=>{PREF.accent=b.dataset.ac;applyPref();repaint()});
    const sf=$('#semF');if(sf)sf.onsubmit=e=>{e.preventDefault();if($('#s2').value<=$('#s1').value){toast('تاريخ النهاية لازم يكون بعد البداية',true);return}
      const days=$$('[name=hd]:checked').map(x=>+x.value);if(!days.length){toast('اختر يوم واحد على الأقل',true);return}
      const v={semStart:$('#s1').value,semEnd:$('#s2').value,days};run(async()=>{await F.setDoc(dref('settings','main'),v,{merge:true});Object.assign(ST.settings,v)},'تم حفظ الفصل الدراسي وأيام الحلقة ✅')};
    const gf=$('#gF');if(gf)gf.onsubmit=e=>{e.preventDefault();const v={goalNormalNew:+$('#g1').value,goalNormalRev:+$('#g2').value,goalItqanNew:+$('#g3').value,repsNormal:Math.max(1,+$('#g4').value),repsItqan:Math.max(1,+$('#g5').value)};
      run(async()=>{await F.setDoc(dref('settings','main'),v,{merge:true});Object.assign(ST.settings,v)},'تم الحفظ ✅')};
    $('#pwF').onsubmit=e=>{e.preventDefault();run(async()=>{await F.updatePassword(auth.currentUser,$('#pw').value);$('#pw').value=''},'تم تحديث كلمة المرور بنجاح ✅')};
  }
};

/* ================================================================== */
/*  صفحات الطالب                                                        */
/* ================================================================== */
const pMe={
  async load(){const [r,a]=await Promise.all([getAll('records',W('sid','==',ST.user.uid)),getAll('attendance',W('sid','==',ST.user.uid))]);return {recs:sortRecs(r),atts:a}},
  view(){
    const s=ST.me,rs=PD.recs,w=weekStats(s,rs,PD.atts),nw=rs.filter(r=>r.type==='new');
    const pend=nw.filter(r=>r.reps<r.need),done=nw.length-pend.length;
    const rem=[];if(w.norep)rem.push(`⚠️ عندك ${ar(w.norep)} ${w.norep>1?'سجلات':'سجل'} ما كررتها، اجتهد بإكمالها.`);if(w.nwShort+w.rvShort)rem.push(`📖 ناقصك ${ar(w.nwShort+w.rvShort)} ${w.nwShort+w.rvShort>2?'أوجه':'وجه'} عن هدف الأسبوع، اجتهد.`);if(w.abs)rem.push(`🚫 عندك ${ar(w.abs)} ${w.abs>1?'غيابات':'غياب'} هالأسبوع، قلل منها.`);
    const l=nw[0];
    return head('لوحتي',`الدفعة: ${esc(s.batch)} — المشرف: ${esc(supName(s.supId))} · <span class="pill ${s.track==='itqan'?'gold':'mute'}">${TRACK[s.track]}</span>`)+
    (rem.length?rem.map(r=>`<div class="banner warn">${ic('alert')}<span>${r}</span></div>`).join(''):`<div class="banner ok">${ic('trophy')}<span>ما شاء الله، أنت ماشي على هدف الأسبوع! استمر 🌟</span></div>`)+
    `<div class="kpis">${kpi('pages','إجمالي الأوجه المسمّعة',ar(sumPages(rs)))}${kpi('book','آخر حفظ',l?`<span style="font-size:21px">${esc(l.surah)} ${ar(l.to)}</span>`:'—',l?gd(l.date):'','g')}${kpi('repeat','قيد التكرار',ar(pend.length),'سجل',pend.length?'r':'')}${kpi('x','عدد مرات الغياب',ar(PD.atts.filter(a=>a.status==='absent').length))}</div>
    <div class="grid2"><section class="panel"><div class="panel-h"><h2>تسميعك الأسبوعي</h2><span class="cell-sub">هذا الأسبوع: ${ar(w.nw)} حفظ · ${ar(w.rv)} مراجعة</span></div><div class="panel-b">${weekBars(rs)}</div></section>
    <section class="panel"><div class="panel-h"><h2>نسبة إنجاز التكرار (الحفظ الجديد)</h2></div><div class="panel-b"><div style="display:flex;justify-content:space-between;font-size:13px;color:var(--muted);margin-bottom:6px"><span>${ar(done)} من ${ar(nw.length)}</span><b style="color:var(--ink)">${ar(pct(done,nw.length))}٪</b></div><div class="meter"><i style="width:${pct(done,nw.length)}%"></i></div>
     ${pend.length?`<div class="lbl">سجلات تنتظر تكرارك</div>${pend.slice(0,5).map(r=>`<div style="display:flex;justify-content:space-between;align-items:center;gap:8px;padding:7px 0;border-bottom:1px solid var(--line);flex-wrap:wrap"><span>${esc(r.surah)} ${ar(r.from)}–${ar(r.to)}</span>${repCell(r)}</div>`).join('')}`:'<div class="cell-sub" style="margin-top:12px">🌹 لا تنسَ تسجيل التكرار بعد كل حفظ</div>'}</div></section></div>
    <div class="note">🔔 التنبيهات وتنبيه الغياب تجدها بالضغط على أيقونة الجرس فوق.</div>`;
  }
};
const pMyRecords={
  async load(){return {recs:sortRecs(await getAll('records',W('sid','==',ST.user.uid)))}},
  view(){
    return head('سجلاتي',`المسار: ${TRACK[ST.me.track]}`)+`<section class="panel"><div class="tbl-wrap"><table><thead><tr><th>التاريخ</th><th>السورة</th><th>الأوجه</th><th>النوع</th><th>التكرار</th></tr></thead><tbody>
    ${PD.recs.map(r=>`<tr><td class="n">${gd(r.date)}</td><td class="n">${esc(r.surah)}</td><td class="n">${ar(r.from)}–${ar(r.to)}</td><td><span class="pill ${r.type==='new'?'info':'mute'}">${r.type==='new'?'حفظ جديد':'مراجعة'}</span></td><td class="n">${repCell(r)}</td></tr>`).join('')||'<tr><td colspan="5" class="empty">لا توجد سجلات بعد</td></tr>'}</tbody></table></div></section>`;
  }
};
const pFamily={async load(){await reloadBookings()},view(){return head('الحجز الأسري','احجز يوم تستضيف فيه أسرتك الحلقة. حجز واحد فقط في نفس الوقت.')+bookingList({sid:ST.user.uid})},bind(){bindBookingList({sid:ST.user.uid})}};
const pContact={
  view(){
    return head('تواصل معنا','أرسل رسالتك للإدارة')+`<section class="panel" style="max-width:580px" id="cbox"><form class="panel-b" id="cf">
    <label>سبب التواصل<select id="c-r" required><option value="">حدد السبب</option>${MSGR.map(r=>`<option>${r}</option>`).join('')}</select></label>
    <label id="c-ow" hidden>السبب<input id="c-o" placeholder="اكتب السبب هنا..."></label>
    <label>الرسالة<textarea id="c-t" required placeholder="اكتب رسالتك بالتفصيل..."></textarea></label>
    <button class="btn b-pri" type="submit" id="c-b">إرسال</button></form></section>`;
  },
  bind(){
    $('#c-r').onchange=e=>{$('#c-ow').hidden=e.target.value!=='أخرى'};
    $('#cf').onsubmit=e=>{e.preventDefault();$('#c-b').disabled=true;const r=$('#c-r').value;
      run(async()=>{await F.setDoc(dref('messages',newId('messages')),{sid:ST.user.uid,name:ST.me.name,reason:r==='أخرى'&&$('#c-o').value.trim()?$('#c-o').value.trim():r,text:$('#c-t').value.trim(),at:nowIso(),read:false});
        $('#cbox').innerHTML='<div class="empty" style="color:var(--acc);font-size:15px">✅ تم إرسال رسالتك بنجاح، وسيتم التواصل معك قريبًا إن شاء الله.</div>'}).catch(()=>{$('#c-b').disabled=false})};
  }
};

const PAGES={dashboard:pDashboard,students:pStudents,supervisors:pSupervisors,records:pRecords,reports:pReports,struggling:pStruggling,achievements:pAchievements,messages:pMessages,bookings:pBookings,mybookings:pMyBookings,backup:pBackup,settings:pSettings,me:pMe,myrecords:pMyRecords,family:pFamily,contact:pContact};

/* ------------------------------------------------------------------ */
/*  نوافذ وأدوات                                                         */
/* ------------------------------------------------------------------ */
function modal(h){$('#modal').innerHTML=h;$('#ov').hidden=false;$$('#modal [data-close]').forEach(b=>b.onclick=hide);const f=$('#modal').querySelector('input:not([type=hidden]),select,textarea');if(f)f.focus()}
function hide(){$('#ov').hidden=true;$('#modal').innerHTML=''}
function confirmBox(t,msg,label,fn){modal(`<div class="mh"><h3>${t}</h3><button class="x" data-close aria-label="إغلاق">×</button></div>${msg?`<div class="mb" style="color:var(--muted)">${msg}</div>`:''}<div class="mf"><button class="btn ${/حذف|إلغاء/.test(label)?'b-dan':'b-pri'}" id="ok">${label}</button><button class="btn b-sec" data-close>تراجع</button></div>`);$('#ok').onclick=()=>{hide();quiet(Promise.resolve(fn()))}}
$('#ov').onclick=e=>{if(e.target.id==='ov')hide()};
addEventListener('keydown',e=>{if(e.key==='Escape')hide()});
function copy(t){const ok=()=>toast('تم النسخ ✓');try{navigator.clipboard.writeText(t).then(ok,()=>fallback(t))}catch(e){fallback(t)}}
function fallback(t){modal(`<div class="mh"><h3>تعذر النسخ، انسخ يدويًا</h3><button class="x" data-close aria-label="إغلاق">×</button></div><div class="mb"><textarea id="cpt" style="min-height:220px">${esc(t)}</textarea></div>`);$('#cpt').select()}
let tt;function toast(m,err){if(!m)return;const t=$('#toast');t.textContent=m;t.classList.toggle('err',!!err);t.classList.add('show');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('show'),err?4000:2600)}

/* ------------------------------------------------------------------ */
/*  التشغيل                                                             */
/* ------------------------------------------------------------------ */
if(!configured)renderConfigMissing();
else F.onAuthStateChanged(auth,async user=>{
  if(setupBusy)return;
  PD={};bellOpen=false;navOpen=false;
  if(!user){ST.user=null;ST.role=null;ST.me=null;page=null;hide();renderLogin();return}
  try{await resolveUser(user);render()}
  catch(e){console.error(e);loginErr=e.code?.startsWith('x-')?e.message:errMsg(e);ST.role=null;quiet(F.signOut(auth))}
});
