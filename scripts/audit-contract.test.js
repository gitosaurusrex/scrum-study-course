'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const {load}=require('./load'),{validateAudit}=require('./audit-contract');
const audit=require('../source-audit.json'),matrix=require('../competency-map.json');
test('review records reject changed content that has not been re-reviewed',()=>{
 const S=load();assert.deepEqual(validateAudit(S,audit,matrix),[]);
 S.QUESTIONS[0].explain+=' An unreviewed assertion.';
 assert.ok(validateAudit(S,audit,matrix).some(e=>e.includes('q01-01')&&e.includes('stale')));
});
test('coverage records reject omitted focus areas and cross-track practice',()=>{
 const S=load(),broken=JSON.parse(JSON.stringify(matrix));
 broken.matrix.find(r=>r.exam==='pspo'&&r.focus==='Product Vision').directQuestions=[];
 broken.matrix.find(r=>r.exam==='psm'&&r.focus==='Product Value').directQuestions=['q13-10'];
 const errors=validateAudit(S,audit,broken);
 assert.ok(errors.some(e=>e.includes('Product Vision')&&e.includes('no direct')));
 assert.ok(errors.some(e=>e.includes('ineligible question q13-10')));
});
