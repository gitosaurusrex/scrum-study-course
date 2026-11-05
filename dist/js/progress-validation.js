/* Validate every imported structure before replacing browser progress. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  SSS.progressValidation = function (data, catalog) {
    var errors = [], warnings = [], own = Object.prototype.hasOwnProperty;
    function err(s) { if (errors.length < 25) errors.push(s); }
    function obj(v) { return v !== null && typeof v === 'object' && !Array.isArray(v); }
    function has(o, k) { return own.call(o, k); }
    function num(v) { return typeof v === 'number' && Number.isFinite(v); }
    function time(v) { return num(v) && v >= 0 && v <= 8640000000000000; }
    function integer(v, min, max) { return num(v) && Number.isInteger(v) && v >= min && v <= max; }
    function text(v, max) { return typeof v === 'string' && v.length <= (max || 200000); }
    function opt(o, k, check, label) { if (has(o, k) && !check(o[k])) err(label + ': invalid ' + k + '.'); }
    function record(v, label) { if (!obj(v)) { err(label + ' must be an object.'); return false; } return true; }
    function reserved(v, depth) {
      depth = depth || 0;
      if (depth > 20) { err('Progress data is nested too deeply.'); return; }
      if (!v || typeof v !== 'object') return;
      Object.keys(v).forEach(function (k) {
        if (k === '__proto__' || k === 'constructor' || k === 'prototype') err('Reserved field name: ' + k + '.');
        else reserved(v[k], depth + 1);
      });
    }
    if (!record(data, 'Progress')) return { ok: false, errors: errors, warnings: warnings };
    reserved(data);
    if (data.schema !== SSS.core.SCHEMA_VERSION) err('Unsupported schema version.');
    if (!text(data.contentVersion, 100) || !time(data.created) || !time(data.updated)) err('Invalid progress version or timestamps.');
    opt(data, 'revision', function (v) { return integer(v, 0, Number.MAX_SAFE_INTEGER); }, 'Progress');
    ['settings','modules','notes','scenarios','mistakes','flags','cards','checklist','planTasks'].forEach(function (k) { record(data[k], k); });
    ['attempts','rehearsals','official'].forEach(function (k) { if (!Array.isArray(data[k])) err(k + ' must be a list.'); });
    if (errors.length) return { ok: false, errors: errors, warnings: warnings };
    if (data.settings.schedule !== '12' && data.settings.schedule !== '4') err('Unknown study schedule.');
    if (data.settings.schedule === '4') warnings.push('The retired four-day schedule will be changed to the 12-day plan. Your completed work will be kept.');
    if (!SSS.core.isValidISODate(data.settings.startDate)) err('Invalid start date.');

    function entries(map, lookup, label, fn) {
      Object.keys(map).forEach(function (id) {
        if (!has(lookup, id)) { err('Unknown ' + label + ' ID "' + id + '".'); return; }
        fn(map[id], label + ' ' + id, lookup[id]);
      });
    }
    function selected(v, q) {
      return Array.isArray(v) && new Set(v).size === v.length && v.every(function (i) { return integer(i, 0, q.options.length - 1); });
    }
    function order(v, q) { return selected(v, q) && v.length === q.options.length; }
    function questionItem(a, label) {
      if (!record(a, label)) return false;
      var q = catalog.questions[a.qid];
      if (!has(catalog.questions, a.qid)) { err(label + ': unknown question "' + a.qid + '".'); return false; }
      if (!selected(a.selected, q) || typeof a.correct !== 'boolean') err(label + ': invalid answer.');
      opt(a, 'v', function (v) { return integer(v, 1, 100000); }, label);
      return true;
    }
    entries(data.modules, catalog.modules, 'module', function (v, label) {
      if (!record(v, label)) return;
      ['complete','activityDone','activityBest','checkDone'].forEach(function (k) { opt(v, k, function (x) { return typeof x === 'boolean'; }, label); });
      ['completedAt','teachRatedAt','checkAt'].forEach(function (k) { opt(v, k, time, label); });
      opt(v, 'teachRating', function (x) { return ['notyet','partly','clearly'].indexOf(x) >= 0; }, label);
      opt(v, 'teachText', text, label);
      opt(v, 'activityScore', function (x) { return text(x, 30) && /^\d+\/\d+$/.test(x); }, label);
      opt(v, 'checkScore', function (x) { return integer(x, 0, 5); }, label);
    });
    entries(data.notes, catalog.modules, 'note', function (v, label) { if (!text(v)) err(label + ': expected text.'); });
    entries(data.scenarios, catalog.scenarios, 'scenario', function (v, label, sc) {
      if (!record(v, label)) return;
      opt(v, 'done', function (x) { return typeof x === 'boolean'; }, label);
      opt(v, 'at', time, label);
      opt(v, 'strong', function (x) { return integer(x, 0, sc.steps.length); }, label);
      opt(v, 'choices', function (x) { return Array.isArray(x) && x.length <= sc.steps.length && x.every(function (c,i) { return integer(c,0,sc.steps[i].options.length-1); }); }, label);
    });
    data.attempts.forEach(function (a, i) {
      var label = 'Attempt ' + (i+1);
      if (!questionItem(a, label)) return;
      if (!time(a.at)) err(label + ': invalid timestamp.');
      opt(a, 'mode', function (x) { return ['practice','check','missed','rehearsal'].indexOf(x) >= 0; }, label);
      opt(a, 'confidence', function (x) { return x === null || x === 'unsure'; }, label);
      opt(a, 'ref', function (x) { return x === null || text(x,100); }, label);
    });
    entries(data.mistakes, catalog.questions, 'mistake', function (v, label, q) {
      if (!record(v,label)) return;
      if (!integer(v.v,1,100000) || !time(v.addedAt) || typeof v.resolved !== 'boolean' || !selected(v.lastSelected,q) || !integer(v.count,1,1000000) || ['incorrect','uncertain'].indexOf(v.reason)<0) err(label + ': invalid mistake record.');
      opt(v,'resolvedAt',time,label);
      opt(v,'resolvedBy',function(x){return ['manual','confident-correct'].indexOf(x)>=0;},label);
    });
    entries(data.flags, catalog.questions, 'flag', function(v,label) {
      if (record(v,label) && (!text(v.note) || !time(v.at))) err(label + ': invalid flag.');
    });
    entries(data.cards, catalog.cards, 'flashcard', function(v,label) {
      if (!record(v,label)) return;
      if (!time(v.due) || !integer(v.box,0,3) || !time(v.last) || !integer(v.reviews,1,1000000) || !Array.isArray(v.history)) { err(label + ': invalid review history or schedule.'); return; }
      v.history.forEach(function(h) {
        if (!obj(h) || !time(h.at) || ['missed','partial','recalled'].indexOf(h.rating)<0 || !(h.gapDays===null || integer(h.gapDays,0,1000000))) err(label + ': invalid history entry.');
      });
    });
    Object.keys(data.checklist).forEach(function(k){if (['psm-rules','pspo-rules'].indexOf(k)<0 || !time(data.checklist[k])) err('Invalid checklist record.');});
    entries(data.planTasks,catalog.tasks,'plan task',function(v,label){if (!time(v)) err(label + ': invalid timestamp.');});
    data.official.forEach(function(o,i){
      var label='Official result '+(i+1);
      if (!record(o,label)) return;
      if (!/^o\d+$/.test(o.id) || ['scrum-open','po-open','other'].indexOf(o.assessment)<0 || !num(o.score) || o.score<0 || o.score>100 || !SSS.core.isValidISODate(o.date)) err(label + ': invalid result.');
      opt(o,'note',function(x){return text(x,200);},label);opt(o,'at',time,label);
    });
    function groups(v, lookup, label) {
      if (!record(v,label)) return;
      Object.keys(v).forEach(function(k){var b=v[k];if (!has(lookup,k) || !obj(b) || !integer(b.total,1,80) || !integer(b.correct,0,b.total)) err(label + ': invalid totals.');});
    }
    var moduleNums={};Object.keys(catalog.modules).forEach(function(id){moduleNums[catalog.modules[id].num]=true;});
    data.rehearsals.forEach(function(r,i){
      var label='Rehearsal '+(i+1);
      if (!record(r,label)) return;
      if (!/^r\d+$/.test(r.id) || ['psm','pspo'].indexOf(r.track)<0 || !time(r.startedAt) || !time(r.submittedAt) || typeof r.timedOut!=='boolean' || r.total!==80 || !integer(r.correct,0,80) || !integer(r.answered,0,80) || !num(r.pct) || r.pct<0 || r.pct>100) err(label + ': invalid result metadata.');
      ['seenCount','unseenCount','seenCorrect','unseenCorrect'].forEach(function(k){if(!integer(r[k],0,80))err(label+': invalid '+k+'.');});
      if (!Array.isArray(r.items) || r.items.length!==80) {err(label+': expected 80 question records.');return;}
      var ids={};r.items.forEach(function(a){if(questionItem(a,label)){if(has(ids,a.qid))err(label+': duplicate question.');ids[a.qid]=true;if(typeof a.seenBefore!=='boolean')err(label+': invalid exposure flag.');}});
      if (!Array.isArray(r.bookmarks) || !r.bookmarks.every(function(id){return has(ids,id);})) err(label+': invalid bookmarks.');
      groups(r.byModule,moduleNums,label+' module totals');groups(r.byType,{single:true,multi:true,tf:true},label+' format totals');
      if (!record(r.orders,label+' orders')) return;
      Object.keys(ids).forEach(function(id){if(!order(r.orders[id],catalog.questions[id]))err(label+': invalid option order.');});
    });
    if (data.activeRehearsal !== null) {
      var ar=data.activeRehearsal;
      if (record(ar,'Active rehearsal')) {
        opt(ar, 'contentVersion', function (x) { return text(x,100); }, 'Active rehearsal');
        if (!/^r\d+$/.test(ar.id) || ['psm','pspo'].indexOf(ar.track)<0 || !time(ar.startedAt) || !time(ar.deadline) || ar.deadline<=ar.startedAt || !integer(ar.current,0,79) || !Array.isArray(ar.qids) || ar.qids.length!==80 || new Set(ar.qids).size!==80) err('Invalid active rehearsal metadata.');
        var ids={};if(Array.isArray(ar.qids))ar.qids.forEach(function(id){if(!has(catalog.questions,id))err('Unknown active question.');else{ids[id]=true;var q=catalog.questions[id];if(q.track!=='shared'&&q.track!==ar.track)err('Ineligible active question.');}});
        ['orders','answers','bookmarks','seenBefore'].forEach(function(k){record(ar[k],'Active '+k);});
        if (obj(ar.orders))Object.keys(ids).forEach(function(id){if(!order(ar.orders[id],catalog.questions[id]))err('Invalid active option order.');});
        if(obj(ar.answers))Object.keys(ar.answers).forEach(function(id){if(!has(ids,id)||!selected(ar.answers[id],catalog.questions[id]))err('Invalid active answer.');});
        ['bookmarks','seenBefore'].forEach(function(k){if(obj(ar[k]))Object.keys(ar[k]).forEach(function(id){if(!has(ids,id)||ar[k][id]!==true)err('Invalid active '+k+'.');});});
      }
    }
    if(data.contentVersion!==catalog.contentVersion)warnings.push('Earlier content version: revised questions and rehearsals are retained as historical evidence.');
    return {ok:errors.length===0,errors:errors,warnings:warnings};
  };
})(typeof window !== 'undefined' ? window : globalThis);
