/* Authoritative sources referenced by lessons and questions. Links are for
   study; the course paraphrases rather than copying official text. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var SG = 'https://scrumguides.org/scrum-guide.html';

  SSS.CONTENT_VERSION = '1.2.0';
  SSS.CHECKED_ON = 'October 14, 2026';

  // Scrum Guide section helper: SSS.sg('daily-scrum', 'Daily Scrum')
  SSS.sg = function (anchor, section) {
    return { label: 'Scrum Guide', url: SG + '#' + anchor, section: section };
  };

  SSS.SRC = {
    impediments: { label: 'Navigating Impediments', url: 'https://www.scrum.org/resources/navigating-impediments' },
    guide: { label: 'The 2020 Scrum Guide', url: SG },
    ebm: { label: 'Evidence-Based Management Guide', url: 'https://www.scrum.org/resources/online-evidence-based-management-guide' },
    psmScope: { label: 'PSM I certification and focus areas', url: 'https://www.scrum.org/assessments/professional-scrum-master-i-certification' },
    pspoScope: { label: 'PSPO I certification and focus areas', url: 'https://www.scrum.org/assessments/professional-scrum-product-owner-i-certification' },
    psmReading: { label: 'PSM I suggested reading', url: 'https://www.scrum.org/resources/suggested-reading-professional-scrum-master' },
    pspoReading: { label: 'PSPO I suggested reading', url: 'https://www.scrum.org/resources/suggested-reading-professional-scrum-product-owner' },
    smResources: { label: 'Resources for Growing as a Scrum Master', url: 'https://www.scrum.org/resources/resources-growing-scrum-master' },
    poResources: { label: 'Resources for Product Owners', url: 'https://www.scrum.org/resources-product-owners' },
    prepare: { label: 'How do I prepare for a Scrum.org assessment?', url: 'https://www.scrum.org/support/how-do-i-prepare-scrumorg-assessment' },
    conduct: { label: 'Standard conduct for assessments', url: 'https://www.scrum.org/support/standard-conduct-assessments' },
    tech: { label: 'System requirements and technical recommendations', url: 'https://www.scrum.org/support/what-are-system-requirements-and-technical-recommendations-attempting-professional-level' },
    results: { label: 'Questions and answers after an assessment', url: 'https://www.scrum.org/support/can-i-get-questions-and-answers-my-professional-level-assessment' },
    scrumOpen: { label: 'Scrum Open (free, official)', url: 'https://www.scrum.org/open-assessments/scrum-open' },
    poOpen: { label: 'Product Owner Open (free, official)', url: 'https://www.scrum.org/open-assessments/product-owner-open' },
    tsmPsm: { label: 'TheScrumMaster.co.uk PSM I practice (independent)', url: 'https://www.thescrummaster.co.uk/assessments/professional-scrum-master-i-psm-i-practice-assessment/' },
    tsmPspo: { label: 'TheScrumMaster.co.uk PSPO I practice (independent)', url: 'https://www.thescrummaster.co.uk/assessments/professional-scrum-product-owner-i-pspo-i-practice-assessment/' }
  };
})(typeof window !== 'undefined' ? window : globalThis);
