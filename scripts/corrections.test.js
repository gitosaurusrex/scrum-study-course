'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {load,memoryStorage}=require('./load');
function fresh(){const A=load();A.store.load();return A;}

test('stale tabs cannot overwrite progress, imports, or resets',()=>{
 const ls=memoryStorage(),A=load({localStorage:ls}),B=load({localStorage:ls});A.store.load();B.store.load();
 A.store.update(s=>s.notes.m01='first tab');
 let called=false;assert.equal(B.store.update(s=>{called=true;s.notes.m02='second tab';}),false);assert.equal(called,false);
 assert.equal(B.store.status.stale,true);assert.equal(B.store.reset(),false);
 assert.equal(B.store.replaceWith(JSON.parse(B.store.exportJSON())),false);
 const C=load({localStorage:ls});C.store.load();assert.equal(C.store.state.notes.m01,'first tab');
 C.store.update(s=>s.notes.m02='after reload');const D=load({localStorage:ls});D.store.load();
 assert.equal(D.store.state.notes.m01,'first tab');assert.equal(D.store.state.notes.m02,'after reload');
});

test('malformed nested records reject without changing current progress',()=>{
 const A=fresh();A.store.update(s=>s.notes.m01='keep me');const base=JSON.parse(A.store.exportJSON());
 const mutations=[
  s=>s.cards.f01={due:1,box:1,history:'corrupt'},
  s=>s.activeRehearsal={qids:['q01-01'],deadline:Date.now()+3600000},
  s=>s.modules.m01=null,
  s=>s.notes.m01={html:'unexpected'},
  s=>s.flags['q01-01']={note:4,at:1},
  s=>s.attempts.push({qid:'q01-01',v:1,selected:[999],correct:true,at:1}),
  s=>s.rehearsals.push({id:'r1',track:'psm',pct:100,items:[]}),
  s=>s.official.push({id:'bad-id',assessment:'scrum-open',score:100,date:'2026-10-13'}),
  s=>s.cards.f01={due:1,box:1,last:1,reviews:1,history:[{at:1,rating:'unknown',gapDays:null}]}
 ];
 for(const mutate of mutations){const data=JSON.parse(JSON.stringify(base));mutate(data);assert.equal(A.store.parseImport(JSON.stringify(data)).ok,false);assert.equal(A.store.replaceWith(data),false);assert.equal(A.store.state.notes.m01,'keep me');}
 const nested=JSON.parse(JSON.stringify(base));let o=nested;for(let i=0;i<100;i++){o.extra={};o=o.extra;}assert.equal(A.store.parseImport(JSON.stringify(nested)).ok,false);
 const proto=JSON.parse(JSON.stringify(base));proto.notes=JSON.parse('{"__proto__":{}}');assert.equal(A.store.parseImport(JSON.stringify(proto)).ok,false);
});

test('old four-day exports migrate to 12 days while preserving completed work',()=>{
 const A=fresh();A.store.update(s=>{s.notes.m01='old note';s.modules.m01={complete:true};});
 const data=JSON.parse(A.store.exportJSON());data.settings.schedule='4';data.contentVersion='1.0.0';
 const parsed=A.store.parseImport(JSON.stringify(data));assert.equal(parsed.ok,true);assert.ok(parsed.warnings.length);
 assert.equal(A.store.replaceWith(parsed.data),true);assert.equal(A.store.state.settings.schedule,'12');assert.equal(A.store.state.notes.m01,'old note');assert.equal(A.store.isModuleComplete('m01'),true);
 const ls=memoryStorage();ls.setItem('scrum-study-studio:v1',JSON.stringify(data));const B=load({localStorage:ls});B.store.load();assert.equal(B.store.state.settings.schedule,'12');assert.equal(B.store.isModuleComplete('m01'),true);
});

test('complete rehearsals and flashcard history survive strict export/import validation',()=>{
 const A=fresh(),byId=A.store.questionsById(),start=Date.now();const qids=A.core.sampleRehearsal(A.QUESTIONS,'psm',{});
 const ar={id:'r'+start,track:'psm',contentVersion:A.CONTENT_VERSION,startedAt:start,deadline:start+3600000,qids,orders:{},answers:{},bookmarks:{},current:0,seenBefore:{}};
 qids.forEach(id=>{ar.orders[id]=A.core.optionOrder(byId[id]);ar.answers[id]=byId[id].correct.slice();});
 A.store.update(s=>{s.activeRehearsal=ar;s.cards.f01=A.core.reviewCard(undefined,'recalled',start);});
 assert.equal(A.store.parseImport(A.store.exportJSON()).ok,true);
 const grade=A.core.gradeRehearsal(ar,byId),rec=Object.assign({id:ar.id,track:ar.track,contentVersion:A.CONTENT_VERSION,startedAt:start,submittedAt:start+1000,timedOut:false,bookmarks:[],orders:ar.orders},grade);
 A.store.update(s=>{s.activeRehearsal=null;s.rehearsals.push(rec);});assert.equal(A.store.parseImport(A.store.exportJSON()).ok,true);
 assert.equal(A.core.isCurrentRehearsal(rec,byId),true);rec.items.find(x=>x.qid===qids[0]).v=999;assert.equal(A.core.isCurrentRehearsal(rec,byId),false);assert.equal(A.core.strongRehearsals([rec],'psm',90,byId).list.length,0);
});

test('schedule covers the current curriculum with two rehearsals on separate days per track',()=>{
 const A=fresh(),p=A.ui.planProgress();assert.equal(Object.keys(A.PLANS).join(','),'12');
 for(const track of ['psm','pspo']){const days=p.days.filter(d=>d.tasks.some(t=>t.key.startsWith('rehearsal:'+track+':')));assert.equal(days.length,2);assert.notEqual(days[0].num,days[1].num);}
 const revised=A.QUESTIONS.find(q=>q.id==='q09-02');assert.equal(revised.v,2);assert.match(revised.options[1],/without.*agreement/);
});
