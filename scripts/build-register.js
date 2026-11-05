#!/usr/bin/env node
'use strict';
const fs=require('fs'),path=require('path');
const {load}=require('./load'),{validateAudit}=require('./audit-contract');
const S=load(),audit=require('../source-audit.json'),matrix=require('../competency-map.json');
const errors=validateAudit(S,audit,matrix);if(errors.length)throw Error(errors.join('\n'));
const bySource=new Map();
function add(src,kind,id){
 const key=src.url+'|'+(src.section||'');
 if(!bySource.has(key))bySource.set(key,{source:src,module:new Set(),question:new Set(),scenario:new Set(),card:new Set(),reference:new Set()});
 bySource.get(key)[kind].add(id);
}
for(const row of audit.items)for(const src of row.sources)add(src,row.kind,row.id);
for(const [key,src]of Object.entries(S.SRC))add(src,'reference','resources.'+key);
const list=set=>[...set].join(', ')||'—';
const link=s=>'['+s.label+']('+s.url+')'+(s.section?' — '+s.section:'');
const safe=text=>String(text).replaceAll('|','/').replaceAll('\n',' ');
let md='# Scrum Study Studio: source-to-content register\n\n';
md+='Content version '+S.CONTENT_VERSION+'. Source audit completed '+audit.reviewedOn+'. '+audit.items.length+' dated learning-item reviews.\n\n';
md+='## Authority and verification\n\n'+audit.authorityPolicy+'\n\n';
md+='The per-item record is [source-audit.json](source-audit.json). It ties review status and reading evidence to a digest of each item, so subsequent edits cannot silently inherit a completed review. The exact competency mapping is [competency-map.json](competency-map.json). Automatic checks validate those records; they do not independently judge content accuracy.\n\n';
md+='Counts: 16 modules, 160 original questions (80 shared / 40 PSM / 40 PSPO), eight scenarios / 17 decisions, 48 flashcards.\n\n';
md+='## Sources and their uses\n\nSource sections are distinct rows even when they share a URL. Reference-page links are study resources; their presence does not mean every linked publication was reproduced or used as a question authority.\n\n';
md+='| Source / section | Lessons | Questions | Scenarios | Cards | Resource references |\n|---|---|---|---|---|---|\n';
for(const e of [...bySource.values()].sort((a,b)=>(a.source.url+'|'+a.source.section).localeCompare(b.source.url+'|'+b.source.section)))md+='| '+safe(link(e.source))+' | '+list(e.module)+' | '+list(e.question)+' | '+list(e.scenario)+' | '+list(e.card)+' | '+list(e.reference)+' |\n';
md+='\n## Published exam-focus coverage\n\nOfficial lists: [PSM I]('+matrix.officialLists.psm+'), [PSPO I]('+matrix.officialLists.pspo+'). Coverage is introductory, with depth limits stated below. Direct practice means a question tests that area; supporting questions are recorded in the JSON companion. Eligible questions belong to the shared bank or the named track. Module-balanced random rehearsals do not guarantee every focus area on each attempt.\n\n';
md+='| Exam | Published focus area | Lessons | Direct eligible questions | Scenarios | Depth / limit |\n|---|---|---|---|---|\n';
for(const r of matrix.matrix)md+='| '+r.exam.toUpperCase()+' I | '+r.focus+' | '+r.lessons.join(', ')+' | '+r.directQuestions.join(', ')+' | '+(r.scenarios.join(', ')||'—')+' | '+safe(r.depth)+' |\n';
md+='\n## Required source families\n\n| Source family | Use | Status |\n|---|---|---|\n';
for(const r of matrix.sourceFamilies)md+='| '+r.family+' | '+safe(r.use)+' | '+safe(r.status)+' |\n';
md+='\n## Item-level review ledger\n\nQuestion versions change when wording or meaning changes materially. Existing results are retained; historical rehearsals do not count as evidence for revised content. Original scenario consequences illustrate possible outcomes, not verified predictions.\n\n';
md+='| Kind / ID | Reviewed | Basis | Question version | Closed findings | Reading evidence |\n|---|---|---|---|---|---|\n';
for(const r of audit.items)md+='| '+r.kind+' '+r.id+' | '+r.reviewedOn+' | '+safe(r.basis)+' | '+(r.questionVersion||'—')+' | '+(r.closedFindings.join(', ')||'—')+' | '+r.sources.map(s=>safe(link(s))).join('<br>')+' |\n';
md+='\n## Findings and resolutions\n\n| ID | Classification | Items | Status | Resolution |\n|---|---|---|---|---|\n';
for(const f of audit.findings)md+='| '+f.id+' | '+f.classification+' | '+f.itemIds.join(', ')+' | '+f.status+' | '+safe(f.resolution)+' |\n';
md+='\n## Verification limits\n\n'+audit.limits.map(x=>'- '+x).join('\n')+'\n';
fs.writeFileSync(path.join(__dirname,'../content-register.md'),md,'utf8');
console.log('Register generated: '+bySource.size+' source-section entries, '+audit.items.length+' learning-item records, '+matrix.matrix.length+' exam-focus rows.');
