'use strict';
const crypto=require('crypto');
function digest(item){return crypto.createHash('sha256').update(JSON.stringify(item)).digest('hex');}
function inventory(S){return [['module',S.MODULES],['question',S.QUESTIONS],['scenario',S.SCENARIOS],['card',S.CARDS]].flatMap(([kind,items])=>items.map(item=>({kind,id:item.id,item})));}
function validateAudit(S,audit,matrix){
 const errors=[],expected=inventory(S),rows=new Map((audit.items||[]).map(r=>[r.kind+':'+r.id,r]));
 if(audit.contentVersion!==S.CONTENT_VERSION)errors.push('Audit content version is stale');
 if(matrix.contentVersion!==S.CONTENT_VERSION || matrix.matrix.length!==25)errors.push('Competency mapping is stale or has the wrong focus-area count');
 if(rows.size!==expected.length || (audit.items||[]).length!==expected.length)errors.push('Audit inventory does not match the course');
 for(const {kind,id,item}of expected){const r=rows.get(kind+':'+id);if(!r||r.status!=='reviewed'||!r.reviewedOn||r.sha256!==digest(item))errors.push(kind+' '+id+': missing or stale source review');}
 for(const q of S.QUESTIONS){if(!q.source?.section)errors.push(q.id+': source section missing');if(/resources-product-owners$|resources-growing-scrum-master$/.test(q.source?.url||''))errors.push(q.id+': a collection is not a precise question authority');}
 const official={psm:['Empiricism','Scrum Values','Scrum Team','Events','Artifacts','Done','Self-Managing Teams','Facilitation','Coaching','Forecasting & Release Planning','Product Value','Product Backlog Management','Stakeholders & Customers'],pspo:['Empiricism','Scrum Team','Events','Artifacts','Done','Self-Managing Teams','Forecasting & Release Planning','Product Vision','Product Value','Product Backlog Management','Business Strategy','Stakeholders & Customers']};
 for(const [exam,areas]of Object.entries(official))for(const focus of areas){const found=matrix.matrix.filter(r=>r.exam===exam&&r.focus===focus);if(found.length!==1){errors.push(exam+' '+focus+': competency row missing or duplicated');continue;}const row=found[0];if(!row.directQuestions?.length)errors.push(exam+' '+focus+': no direct practice');for(const id of [...row.directQuestions,...(row.supportingQuestions||[])]){const q=S.QUESTIONS.find(q=>q.id===id);if(!q||!['shared',exam].includes(q.track))errors.push(exam+' '+focus+': invalid/ineligible question '+id);}for(const id of row.lessons||[])if(!S.MODULES.some(m=>m.id===id))errors.push('Unknown mapped lesson '+id);for(const id of row.scenarios||[])if(!S.SCENARIOS.some(s=>s.id===id))errors.push('Unknown mapped scenario '+id);}
 return errors;
}
module.exports={digest,inventory,validateAudit};
