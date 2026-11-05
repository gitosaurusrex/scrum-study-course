/* Source-reviewed flashcards, with direct reading references. */
(function(root){
  "use strict";
  var SSS=root.SSS=root.SSS||{};
  SSS.CARDS=[
  {
    "id": "f01",
    "module": "m01",
    "front": "What are the three pillars of empiricism, and how do they depend on each other?",
    "back": "Transparency enables inspection; inspection enables adaptation. Inspecting what is hidden misleads; inspecting without adapting is pointless.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#transparency",
        "section": "Transparency"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#inspection",
        "section": "inspection"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f02",
    "module": "m01",
    "front": "Why does Scrum use an iterative, incremental approach?",
    "back": "To optimize predictability and control risk — by getting real evidence frequently, not by planning everything up front.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-theory",
        "section": "Scrum Theory: transparency, inspection, adaptation"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f03",
    "module": "m01",
    "front": "Is a team that uses only some of Scrum's elements \"doing Scrum\"?",
    "back": "No. Implementing parts is possible, but the result is not Scrum. Scrum is purposefully incomplete, yet each defined element is required.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#end-note",
        "section": "End Note"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f04",
    "module": "m02",
    "front": "Name the five Scrum values.",
    "back": "Commitment, Focus, Openness, Respect, Courage.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-values",
        "section": "Scrum Values"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f05",
    "module": "m02",
    "front": "What is the Scrum Team committed to (the commitment value)?",
    "back": "Achieving its goals and supporting each other — not delivering every forecast item.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-values",
        "section": "Scrum Values"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f06",
    "module": "m02",
    "front": "Why does artifact transparency matter so much?",
    "back": "Important decisions are based on the perceived state of the artifacts. Low transparency leads to decisions that diminish value and increase risk.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#transparency",
        "section": "Transparency"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f07",
    "module": "m03",
    "front": "Who is accountable for creating a valuable, useful Increment every Sprint?",
    "back": "The entire Scrum Team.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
        "section": "Scrum Team"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f08",
    "module": "m03",
    "front": "List the Developers' four accountabilities.",
    "back": "Create the Sprint Backlog; instill quality by adhering to the Definition of Done; adapt the plan daily toward the Sprint Goal; hold each other accountable as professionals.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#developers",
        "section": "Developers"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f09",
    "module": "m03",
    "front": "Delegating work vs delegating accountability?",
    "back": "The Product Owner may delegate backlog work to others, but remains accountable. Accountability does not transfer.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#product-owner",
        "section": "Product Owner"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f10",
    "module": "m04",
    "front": "Artifact → commitment pairs?",
    "back": "Product Backlog → Product Goal. Sprint Backlog → Sprint Goal. Increment → Definition of Done.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-artifacts",
        "section": "Scrum Artifacts"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f11",
    "module": "m04",
    "front": "What three parts make up the Sprint Backlog?",
    "back": "Sprint Goal (why), selected Product Backlog items (what), actionable plan (how).",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-backlog",
        "section": "sprint backlog"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f12",
    "module": "m04",
    "front": "How many Product Goals can a team pursue at once?",
    "back": "One. The team must fulfill or abandon one Product Goal before taking on the next.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-product-goal",
        "section": "Commitment: Product Goal"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f13",
    "module": "m05",
    "front": "What may and may not change during a Sprint?",
    "back": "Scope may be clarified and renegotiated with the Product Owner. No changes that endanger the Sprint Goal; quality does not decrease.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
        "section": "The Sprint"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f14",
    "module": "m05",
    "front": "Who can cancel a Sprint, and when?",
    "back": "Only the Product Owner, if the Sprint Goal becomes obsolete.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
        "section": "The Sprint"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f15",
    "module": "m05",
    "front": "The three Sprint Planning topics and who leads them?",
    "back": "Why (PO proposes value; whole team sets the Sprint Goal). What (Developers select items with the PO). How (Developers plan, at their sole discretion).",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-planning",
        "section": "Sprint Planning"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f16",
    "module": "m06",
    "front": "Timeboxes for a one-month Sprint?",
    "back": "Maximums for a one-month Sprint: Planning 8h, Review 4h, Retrospective 3h. Those events are usually shorter for shorter Sprints. The Daily Scrum is always 15 minutes.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-planning",
        "section": "Sprint Planning"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#daily-scrum",
        "section": "Daily Scrum"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-review",
        "section": "Sprint Review"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-retrospective",
        "section": "Sprint Retrospective"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f17",
    "module": "m06",
    "front": "Who is the Daily Scrum for, and what must it produce?",
    "back": "The Developers. It focuses on progress toward the Sprint Goal and produces an actionable plan for the next day.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#daily-scrum",
        "section": "Daily Scrum"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f18",
    "module": "m06",
    "front": "What is the Sprint Review — and what is it not?",
    "back": "A working session with key stakeholders to inspect the outcome and decide future adaptations. Not a presentation-only demo and not a release gate.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#sprint-review",
        "section": "Sprint Review"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#increment",
        "section": "Increment"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f19",
    "module": "m07",
    "front": "What happens to an item that does not meet the Definition of Done?",
    "back": "It cannot be released or presented at the Sprint Review. It returns to the Product Backlog for future consideration.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
        "section": "Commitment: Definition of Done"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f20",
    "module": "m07",
    "front": "When is an Increment born?",
    "back": "The moment a Product Backlog item meets the Definition of Done.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#increment",
        "section": "Increment"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
        "section": "Commitment: Definition of Done"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f21",
    "module": "m07",
    "front": "Done vs valuable?",
    "back": "Done establishes quality, not proof of desired customer outcomes. Inspect customer evidence and experiments, including usage after release. A Done Increment can still be the wrong thing.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
        "section": "Commitment: Definition of Done"
      },
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "Hypotheses, Experiments, Features, and Requirements",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "A whole feature need not be built to test critical value assumptions. Customer evidence can come from small experiments.",
        "authorityType": "separate-ebm-framework"
      },
      {
        "label": "Customer Outcomes",
        "url": "https://www.scrum.org/resources/customer-outcomes",
        "section": "What are customer outcomes?",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Customer results are distinguished from tangible outputs. Outcome-oriented goals enable measuring benefit and leave solution choices open.",
        "authorityType": "scrum-org-learning-practice"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f22",
    "module": "m08",
    "front": "Who sizes Product Backlog items?",
    "back": "The Developers who will do the work. The Product Owner may help them understand and select trade-offs.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#product-backlog",
        "section": "Product Backlog"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f23",
    "module": "m08",
    "front": "Name four optional techniques often mistaken for Scrum rules.",
    "back": "User stories, story points, velocity, burn-down charts (also planning poker, task boards, the three Daily Scrum questions, Definition of Ready).",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-definition",
        "section": "Scrum Definition"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
        "section": "The Sprint"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f24",
    "module": "m08",
    "front": "What may be used for forward-looking decisions in complex work?",
    "back": "Only what has already happened. Forecasting charts help but do not replace empiricism.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
        "section": "The Sprint"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f25",
    "module": "m09",
    "front": "The Scrum Master's two accountabilities?",
    "back": "Establishing Scrum as defined in the Scrum Guide, and the Scrum Team's effectiveness.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f26",
    "module": "m09",
    "front": "Three groups the Scrum Master serves?",
    "back": "The Scrum Team, the Product Owner and the organization.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f27",
    "module": "m09",
    "front": "Teach, coach, facilitate or step back — a quick decision rule?",
    "back": "Course heuristic: knowledge gap → consider teaching; help people reason → coaching; group needs structure → facilitation. Support capable teams without taking over, and choose the stance to fit the context.",
    "sources": [
      {
        "label": "Comparing Facilitation, Coaching, Mentoring and Teaching",
        "url": "https://www.scrum.org/resources/comparing-facilitation-coaching-mentoring-and-teaching",
        "section": "The Situation and Needs of the People Needing Help; Facilitation; Coaching; Teaching",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Selection depends on situation, recipient needs and helper expertise. Neutral facilitation/coaching are distinguished from advice-sharing teaching/mentoring. Stepping back is course guidance, not a named required stance.",
        "authorityType": "scrum-org-learning-practice"
      },
      {
        "label": "Navigating Impediments",
        "url": "https://www.scrum.org/resources/navigating-impediments",
        "section": "Who should remove impediments for the Scrum Team?",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Direct removal of every impediment can create dependency; the Scrum Master enables self-management and may intervene in organizational obstacles.",
        "authorityType": "scrum-org-learning-practice"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f28",
    "module": "m10",
    "front": "What does self-managing mean in Scrum?",
    "back": "The team internally decides who does what, when and how — within the framework, goals and Definition of Done.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
        "section": "Scrum Team"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f29",
    "module": "m10",
    "front": "Does cross-functional mean everyone can do everything?",
    "back": "No. The team collectively has all the skills needed to create value each Sprint.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
        "section": "Scrum Team"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f30",
    "module": "m10",
    "front": "A manager wants to assign tasks. Scrum Master response?",
    "back": "Understand the underlying need, show how artifacts and events provide transparency, and redirect the manager toward supporting the team.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
        "section": "Scrum Team"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f31",
    "module": "m11",
    "front": "What does \"causing the removal of impediments\" mean?",
    "back": "Ensuring impediments get removed — often by enabling the team — not personally fixing everything.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f32",
    "module": "m11",
    "front": "Which impediments usually need the Scrum Master to work with the organization?",
    "back": "Those outside the team's authority: approval processes, policies, cross-department barriers.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      },
      {
        "label": "Navigating Impediments",
        "url": "https://www.scrum.org/resources/navigating-impediments",
        "section": "Who should remove impediments for the Scrum Team?",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Direct removal of every impediment can create dependency; the Scrum Master enables self-management and may intervene in organizational obstacles.",
        "authorityType": "scrum-org-learning-practice"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f33",
    "module": "m11",
    "front": "How does the Scrum Master facilitate stakeholder collaboration?",
    "back": "As requested or needed — not mandatorily at every event.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f34",
    "module": "m12",
    "front": "Four ways the Scrum Master serves the organization?",
    "back": "Leading, training and coaching Scrum adoption; planning and advising implementations; helping people enact empiricism; removing barriers between stakeholders and Scrum Teams.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
        "section": "Scrum Master"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f35",
    "module": "m12",
    "front": "Several teams, one product: what do they share?",
    "back": "One Product Goal, one Product Backlog, one Product Owner, and a mutually defined Definition of Done.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
        "section": "Scrum Team"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
        "section": "Commitment: Definition of Done"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f36",
    "module": "m12",
    "front": "Improving practices vs changing Scrum?",
    "back": "Changing techniques can improve an event while preserving its purpose, accountabilities and timebox. Removing an event, splitting Product Owner accountability or dropping a commitment changes Scrum.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#purpose-of-the-scrum-guide",
        "section": "Purpose of the Scrum Guide"
      },
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#end-note",
        "section": "End Note"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f37",
    "module": "m13",
    "front": "What is the Product Owner accountable for?",
    "back": "Maximizing the value of the product resulting from the Scrum Team's work, and effective Product Backlog management.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#product-owner",
        "section": "Product Owner"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f38",
    "module": "m13",
    "front": "How does the Guide describe a product?",
    "back": "A vehicle to deliver value with a clear boundary, known stakeholders and well-defined users or customers.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#commitment-product-goal",
        "section": "Commitment: Product Goal"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f39",
    "module": "m13",
    "front": "Output goal vs outcome goal?",
    "back": "Output names things to build. Outcome names a change in customer results. Outcome goals keep solutions open and make value inspectable.",
    "sources": [
      {
        "label": "Customer Outcomes",
        "url": "https://www.scrum.org/resources/customer-outcomes",
        "section": "What are customer outcomes?",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Customer results are distinguished from tangible outputs. Outcome-oriented goals enable measuring benefit and leave solution choices open.",
        "authorityType": "scrum-org-learning-practice"
      }
    ],
    "basis": "concept"
  },
  {
    "id": "f40",
    "module": "m14",
    "front": "Four parts of Product Backlog management?",
    "back": "Develop and communicate the Product Goal; create and communicate items; order items; ensure the backlog is transparent, visible and understood.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#product-owner",
        "section": "Product Owner"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f41",
    "module": "m14",
    "front": "How do stakeholders change the Product Backlog?",
    "back": "By convincing the Product Owner. The whole organization must respect the Product Owner's decisions.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#product-owner",
        "section": "Product Owner"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f42",
    "module": "m14",
    "front": "Is the Product Backlog ordered purely by value?",
    "back": "Not necessarily. Value, risk, cost, dependencies and learning can all shape the order.",
    "sources": [
      {
        "label": "Ordering the Product Backlog",
        "url": "https://www.scrum.org/resources/ordering-product-backlog",
        "section": "Opening explanation",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Ordering may consider business value, risk, ROI, dependencies and impact; no single required ordering formula is prescribed.",
        "authorityType": "scrum-org-learning-practice"
      },
      {
        "label": "Product Cost",
        "url": "https://www.scrum.org/resources/product-cost",
        "section": "What is Product Cost?; Understanding Product Cost",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Direct and indirect lifetime costs include development, maintenance, support, employee wages, tools and overhead. Cost can be balanced with learning, risk and expected benefit.",
        "authorityType": "scrum-org-learning-practice"
      },
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "Hypotheses, Experiments, Features, and Requirements",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "A whole feature need not be built to test critical value assumptions. Customer evidence can come from small experiments.",
        "authorityType": "separate-ebm-framework"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f43",
    "module": "m15",
    "front": "What is total cost of ownership for a feature?",
    "back": "All costs over its life: build, maintenance, testing, support and the complexity it adds to future change.",
    "sources": [
      {
        "label": "Product Cost",
        "url": "https://www.scrum.org/resources/product-cost",
        "section": "What is Product Cost?; Understanding Product Cost",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Direct and indirect lifetime costs include development, maintenance, support, employee wages, tools and overhead. Cost can be balanced with learning, risk and expected benefit.",
        "authorityType": "scrum-org-learning-practice"
      },
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "Ability to Innovate (A2I); Appendix: Example Key Value Measures — Ability to Innovate (A2I)",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Poor quality, low-value feature maintenance and systemic impediments can reduce innovation capacity. Appendix examples include technical debt, defect trends and active product/code branches.",
        "authorityType": "separate-ebm-framework"
      }
    ],
    "basis": "concept"
  },
  {
    "id": "f44",
    "module": "m15",
    "front": "Can an Increment be released before the Sprint Review?",
    "back": "Yes. The Sprint Review is never a gate to releasing value.",
    "sources": [
      {
        "label": "Scrum Guide",
        "url": "https://scrumguides.org/scrum-guide.html#increment",
        "section": "Increment"
      }
    ],
    "basis": "rule"
  },
  {
    "id": "f45",
    "module": "m15",
    "front": "Why release frequently?",
    "back": "Shorter feedback loops, earlier value, and lower risk of building the wrong thing.",
    "sources": [
      {
        "label": "Introduction to Forecasting and Release Planning",
        "url": "https://www.scrum.org/resources/introduction-forecasting-and-release-planning",
        "section": "Release Planning",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Frequent small releases support faster user feedback, learning and course correction and earlier risk discovery. These are potential benefits, not guaranteed customer satisfaction.",
        "authorityType": "scrum-org-learning-practice"
      }
    ],
    "basis": "judgment"
  },
  {
    "id": "f46",
    "module": "m16",
    "front": "EBM's four Key Value Areas?",
    "back": "Current Value, Unrealized Value (product value) · Ability to Innovate, Time to Market (organizational capability).",
    "sources": [
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "EBM Uses Key Value Areas to Examine Improvement Opportunities",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "CV and UV examine market value; A2I and T2M examine the organization's capability to deliver valuable outcomes.",
        "authorityType": "separate-ebm-framework"
      }
    ],
    "basis": "concept"
  },
  {
    "id": "f47",
    "module": "m16",
    "front": "EBM experiment loop?",
    "back": "Form a hypothesis → run the experiment → inspect the results → adapt goals or approach.",
    "sources": [
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "Making Progress Toward Goals in a Series of Small Steps",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Explicit hypothesis, experiment, result inspection and adaptation form the loop; goals may be changed when learning warrants it.",
        "authorityType": "separate-ebm-framework"
      }
    ],
    "basis": "concept"
  },
  {
    "id": "f48",
    "module": "m16",
    "front": "EBM goal levels?",
    "back": "Strategic Goal (long-term) → Intermediate Goals (milestones) → Immediate Tactical Goals (near-term work).",
    "sources": [
      {
        "label": "Evidence-Based Management Guide (May 2024)",
        "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
        "section": "EBM Helps Organizations Achieve Their Goals in a Complex World",
        "verifiedOn": "2026-10-14",
        "sourceSupport": "Strategic, Intermediate and Immediate Tactical Goals are separate levels. Relevance and progress should be examined; levels are not individual task lists.",
        "authorityType": "separate-ebm-framework"
      }
    ],
    "basis": "concept"
  }
];
})(typeof window!=="undefined"?window:globalThis);
