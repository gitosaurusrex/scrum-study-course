/* Scenario lab: eight decision scenarios set in the Launchpad example.
   quality: 'strong' | 'mixed' | 'weak'. Each step separates the framework rule
   (rule) from situational judgment (judgment). Real situations can have more
   than one reasonable response; "strong" marks the best fit here. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var sg = SSS.sg, S = SSS.SRC;

  SSS.SCENARIOS = [
    {
      "id": "s1",
      "num": 1,
      "track": "shared",
      "modules": [
        "m05"
      ],
      "minutes": 12,
      "title": "An urgent request halfway through a Sprint",
      "setup": "<p>It is day 6 of a 10-day Sprint. The Sprint Goal is \"Invited colleagues can join a workspace without contacting support.\" Dana, VP of Customer Success, messages Kenji directly: Brightfield Logistics needs a bulk-import tool for 400 historical invoices by Friday, or they may delay their rollout.</p>",
      "steps": [
        {
          "prompt": "Kenji is asked to start on the import tool today. What should he do?",
          "options": [
            {
              "text": "Start immediately; the customer relationship is at risk.",
              "quality": "weak",
              "consequence": "Kenji spends two days on the tool. The invitation work stalls and Priya learns about it at the Daily Scrum.",
              "explanation": "Accepting new work outside the Product Owner's ordering bypasses the person accountable for value and quietly endangers the Sprint Goal."
            },
            {
              "text": "Make the request visible to the other Developers and Priya, and let Priya decide how it fits against the Product Backlog.",
              "quality": "strong",
              "consequence": "Priya hears about it within the hour and calls Dana to understand the deadline.",
              "explanation": "Those who want to change what the team works on do so through the Product Owner. Transparency lets the right person decide quickly."
            },
            {
              "text": "Tell Dana that Scrum does not allow changes during a Sprint.",
              "quality": "mixed",
              "consequence": "Dana is frustrated and escalates to the CTO.",
              "explanation": "Scope can change during a Sprint as long as the Sprint Goal is not endangered. The refusal is inaccurate and leaves the real question — is this more valuable? — unanswered."
            }
          ],
          "rule": "Rule: the Product Owner is accountable for ordering the Product Backlog; no changes are made that endanger the Sprint Goal.",
          "judgment": "Judgment: how quickly and through which channel to raise it depends on the team's working agreements."
        },
        {
          "prompt": "Priya learns that a simple spreadsheet template would let Brightfield import invoices with a one-time script run by support. Building the full tool would take most of the remaining Sprint. What should Priya do?",
          "options": [
            {
              "text": "Cancel the Sprint and start a new one focused on the import tool.",
              "quality": "weak",
              "consequence": "The team loses four days of planning context and the invitation work is shelved.",
              "explanation": "Cancellation is for an obsolete Sprint Goal. The invitation goal is still valuable, and a cheaper option exists."
            },
            {
              "text": "Keep the Sprint Goal, have a Developer help support write the one-off script if the Developers agree it does not endanger the goal, and add the full tool to the Product Backlog for ordering.",
              "quality": "strong",
              "consequence": "Brightfield gets its invoices on Thursday. The invitation work ships, and the full tool is discussed at the Sprint Review.",
              "explanation": "This meets the customer need at low cost, protects the Sprint Goal, and leaves the larger investment to be ordered with evidence."
            },
            {
              "text": "Ask the Developers to work weekends to do both.",
              "quality": "weak",
              "consequence": "Both are delivered, but quality checks are rushed and two Developers are exhausted.",
              "explanation": "Unsustainable pace usually hides a quality cost. The Guide emphasizes a sustainable pace."
            }
          ],
          "rule": "Rule: only the Product Owner can cancel a Sprint, and only if the Sprint Goal becomes obsolete.",
          "judgment": "Judgment: whether a small piece of help fits without endangering the goal is for the Developers to assess with the Product Owner."
        }
      ],
      "wrap": "<p>Urgent requests are normal. Scrum handles them through the Product Owner's ordering and a Sprint Goal that allows flexible scope. The Scrum Master's part here is helping Dana understand how to reach Priya quickly next time.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Product Cost",
          "url": "https://www.scrum.org/resources/product-cost",
          "section": "What is Product Cost?; Understanding Product Cost",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Direct and indirect lifetime costs include development, maintenance, support, employee wages, tools and overhead. Cost can be balanced with learning, risk and expected benefit.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "s2",
      "num": 2,
      "track": "shared",
      "modules": [
        "m07"
      ],
      "minutes": 12,
      "title": "Testing unfinished as the Sprint ends",
      "setup": "<p>It is the penultimate afternoon of the Sprint. The guided bank-feed setup works on the developers' machines, but end-to-end tests against two partner banks — part of the Definition of Done — have not run. The Sprint Review is tomorrow morning and Dana has invited Helen from Brightfield.</p>",
      "steps": [
        {
          "prompt": "What should the Developers do about the bank-feed item?",
          "options": [
            {
              "text": "Show it at the Sprint Review with a note that testing is pending.",
              "quality": "weak",
              "consequence": "Helen sees it working and asks for access next week. The partner-bank tests later reveal a failure.",
              "explanation": "Work that does not meet the Definition of Done cannot be presented at the Sprint Review. Showing it creates false expectations."
            },
            {
              "text": "Treat it as not Done: leave it out of the Increment, tell Priya, and return the remaining work to the Product Backlog.",
              "quality": "strong",
              "consequence": "Priya explains at the Review that the item is close but not yet Done, and orders the remainder at the top of the backlog.",
              "explanation": "This keeps the Increment transparent and lets the Product Owner decide what happens next."
            },
            {
              "text": "Skip the partner-bank tests this once; they rarely fail.",
              "quality": "weak",
              "consequence": "The item is shown as Done. A week later a bank-feed outage hits three customers.",
              "explanation": "Quality does not decrease during the Sprint, and the Developers are required to conform to the Definition of Done."
            }
          ],
          "rule": "Rule: an item that does not meet the Definition of Done cannot be released or presented at the Sprint Review; it returns to the Product Backlog.",
          "judgment": "Judgment: how to describe the near-finished work to stakeholders without demonstrating it."
        },
        {
          "prompt": "At the Retrospective, the team notices that end-to-end tests are always left to the final day. What is the most useful outcome?",
          "options": [
            {
              "text": "Agree to try harder next time.",
              "quality": "weak",
              "consequence": "The same thing happens two Sprints later.",
              "explanation": "Good intentions without a concrete change rarely alter a pattern."
            },
            {
              "text": "Agree on a concrete change — for example, running partner-bank tests as each slice is built — and add it to the next Sprint Backlog.",
              "quality": "strong",
              "consequence": "The next Sprint, two items reach Done mid-Sprint and are released early.",
              "explanation": "The most impactful improvements are addressed as soon as possible and may be added to the next Sprint Backlog."
            },
            {
              "text": "Remove the partner-bank tests from the Definition of Done.",
              "quality": "weak",
              "consequence": "Items reach \"Done\" faster, but customer-facing failures increase.",
              "explanation": "Weakening Done to fit the schedule hides risk. A team can adapt its Definition of Done, but to meet the quality the product needs, not to look faster."
            }
          ],
          "rule": "Rule: the Retrospective inspects processes, tools and the Definition of Done; improvements can enter the next Sprint Backlog.",
          "judgment": "Judgment: which specific practice change will work best for this team."
        }
      ],
      "wrap": "<p>\"Almost Done\" does not qualify as Done or belong to the Increment. Being transparent about undone work keeps the Increment trustworthy and turns the problem into an improvement opportunity.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
          "section": "Commitment: Definition of Done"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#sprint-retrospective",
          "section": "Sprint Retrospective"
        }
      ]
    },

    {
      "id": "s3",
      "num": 3,
      "track": "psm",
      "modules": [
        "m06",
        "m10"
      ],
      "minutes": 12,
      "title": "A Daily Scrum becomes a report to management",
      "setup": "<p>Dana has started attending Launchpad's Daily Scrum. Each Developer now gives a status update to Dana, who asks follow-up questions and occasionally reassigns work. The event runs 25 minutes and the Developers rarely adjust their plan afterward.</p>",
      "steps": [
        {
          "prompt": "Marcus notices the pattern. What should he do first?",
          "options": [
            {
              "text": "Ban Dana from the Daily Scrum.",
              "quality": "mixed",
              "consequence": "Dana feels excluded and starts requesting separate status meetings.",
              "explanation": "The Daily Scrum is for the Developers, but banning someone without addressing their need just moves the problem."
            },
            {
              "text": "Talk with Dana privately about the event's purpose, understand what information Dana needs, and offer better ways to get it.",
              "quality": "strong",
              "consequence": "Dana explains a customer escalation created anxiety. Marcus shows Dana the Sprint Backlog and invites Dana to the Sprint Review.",
              "explanation": "Teaching and understanding the underlying concern serves the organization and protects the event's purpose."
            },
            {
              "text": "Let it continue; Dana is senior.",
              "quality": "weak",
              "consequence": "The Developers stop raising problems in front of Dana.",
              "explanation": "A Daily Scrum that has become a status report loses its value for inspection and adaptation and can reduce openness."
            }
          ],
          "rule": "Rule: the Daily Scrum is a 15-minute event for the Developers to inspect progress toward the Sprint Goal.",
          "judgment": "Judgment: whether a private conversation, a team discussion, or teaching at the event itself works best."
        },
        {
          "prompt": "The Developers ask Marcus to \"run\" the Daily Scrum so it stays on track. What should he do?",
          "options": [
            {
              "text": "Agree and run it each day using an optional three-question format.",
              "quality": "mixed",
              "consequence": "The meeting is shorter, but the Developers start looking at Marcus instead of each other.",
              "explanation": "Structure helps, but the Developers own the event. Running it indefinitely can create dependence."
            },
            {
              "text": "Help them design a format they own — for example, walking the board toward the Sprint Goal — and step back once it works.",
              "quality": "strong",
              "consequence": "Within two Sprints the Developers run a 12-minute event and adjust their plan most days.",
              "explanation": "Coaching self-management: the Developers can choose whatever structure helps them focus on the Sprint Goal."
            },
            {
              "text": "Replace the Daily Scrum with a written update.",
              "quality": "weak",
              "consequence": "Coordination problems surface late.",
              "explanation": "Replacing an event changes the framework and loses daily inspection and adaptation."
            }
          ],
          "rule": "Rule: the Developers can select whatever structure and techniques they want for the Daily Scrum.",
          "judgment": "Judgment: how much facilitation to offer at first, and when to step back."
        }
      ],
      "wrap": "<p>When an event drifts, the Scrum Master teaches its purpose, addresses the needs that caused the drift, and coaches the owners of the event to run it well themselves.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#daily-scrum",
          "section": "Daily Scrum"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
          "section": "Scrum Master"
        },
        {
          "label": "Comparing Facilitation, Coaching, Mentoring and Teaching",
          "url": "https://www.scrum.org/resources/comparing-facilitation-coaching-mentoring-and-teaching",
          "section": "The Situation and Needs of the People Needing Help; Facilitation; Coaching; Teaching",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Selection depends on situation, recipient needs and helper expertise. Neutral facilitation/coaching are distinguished from advice-sharing teaching/mentoring. Stepping back is course guidance, not a named required stance.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "s4",
      "num": 4,
      "track": "psm",
      "modules": [
        "m11",
        "m12"
      ],
      "minutes": 15,
      "title": "An impediment outside the team's authority",
      "setup": "<p>Every Launchpad production release requires sign-off from a change-advisory board that meets once a month. Done Increments now wait three to four weeks to reach customers. The Developers have raised it at three Retrospectives.</p>",
      "steps": [
        {
          "prompt": "Who should take the lead on this impediment?",
          "options": [
            {
              "text": "The Developers, since it affects their work.",
              "quality": "mixed",
              "consequence": "Ana emails the board chair and receives no reply.",
              "explanation": "Developers can contribute, but the barrier sits outside their authority. Leaving it entirely with them after three Retrospectives is not working."
            },
            {
              "text": "Marcus, working with the organization to remove the barrier between the team and its customers.",
              "quality": "strong",
              "consequence": "Marcus books a meeting with the operations director and the board chair.",
              "explanation": "Causing the removal of impediments and removing barriers between stakeholders and Scrum Teams are Scrum Master services."
            },
            {
              "text": "Priya, by lowering the priority of anything that needs a release.",
              "quality": "weak",
              "consequence": "Value delivery slows further.",
              "explanation": "Avoiding releases treats the symptom and reduces value."
            }
          ],
          "rule": "Rule: the Scrum Master causes the removal of impediments and removes barriers between stakeholders and Scrum Teams.",
          "judgment": "Judgment: who in the organization to approach first."
        },
        {
          "prompt": "The board chair worries that faster releases will increase incidents. What approach is most likely to help?",
          "options": [
            {
              "text": "Insist that Scrum requires immediate releases.",
              "quality": "weak",
              "consequence": "The chair becomes defensive and refuses.",
              "explanation": "Scrum does not mandate release timing, and the claim damages trust."
            },
            {
              "text": "Acknowledge the risk concern, show the team's Definition of Done and test evidence, and propose a time-boxed experiment with a lighter route for small, low-risk changes.",
              "quality": "strong",
              "consequence": "The chair agrees to a two-month pilot with incident tracking.",
              "explanation": "Empiricism applied to the organization: make the evidence transparent, run an experiment, inspect, adapt."
            },
            {
              "text": "Release without approval and apologize later.",
              "quality": "weak",
              "consequence": "The team is barred from production access.",
              "explanation": "Bypassing governance destroys trust and creates a bigger impediment."
            }
          ],
          "rule": "Rule: the Scrum Master helps employees and stakeholders understand and enact an empirical approach.",
          "judgment": "Judgment: how large an experiment to propose and which evidence will persuade."
        },
        {
          "prompt": "During the pilot, should the Developers keep raising release delays at Retrospectives?",
          "options": [
            {
              "text": "Yes; the Retrospective inspects processes and tools, including how releases work.",
              "quality": "strong",
              "consequence": "The team tracks the pilot's effect and adjusts its own deployment checks.",
              "explanation": "Continued inspection is how the team learns whether the change helped."
            },
            {
              "text": "No; the matter is closed now that Marcus is handling it.",
              "quality": "weak",
              "consequence": "Problems with the pilot go unnoticed for weeks.",
              "explanation": "Handing an impediment to the Scrum Master does not end the team's inspection."
            },
            {
              "text": "Only if the Scrum Master asks them to.",
              "quality": "mixed",
              "consequence": "Discussion depends on Marcus remembering.",
              "explanation": "The team owns its Retrospective topics."
            }
          ],
          "rule": "Rule: the Retrospective inspects individuals, interactions, processes, tools and the Definition of Done.",
          "judgment": "Judgment: how much Retrospective time to give the topic."
        }
      ],
      "wrap": "<p>Impediments outside the team's authority are where the Scrum Master's organizational work matters most. The approach is still empirical: make evidence visible, propose experiments, and inspect the results.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
          "section": "Scrum Master"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#sprint-retrospective",
          "section": "Sprint Retrospective"
        },
        {
          "label": "Navigating Impediments",
          "url": "https://www.scrum.org/resources/navigating-impediments",
          "section": "Who should remove impediments for the Scrum Team?",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Direct removal of every impediment can create dependency; the Scrum Master enables self-management and may intervene in organizational obstacles.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "Making Progress Toward Goals in a Series of Small Steps",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Explicit hypothesis, experiment, result inspection and adaptation form the loop; goals may be changed when learning warrants it.",
          "authorityType": "separate-ebm-framework"
        }
      ]
    },

    {
      "id": "s5",
      "num": 5,
      "track": "pspo",
      "modules": [
        "m14"
      ],
      "minutes": 12,
      "title": "A stakeholder tries to dictate the next backlog item",
      "setup": "<p>At the Sprint Review, the head of Sales announces that multi-currency invoicing \"must be next,\" because a prospect has made it a condition of signing. Priya's current order puts account-mapping improvements next, based on data showing most new customers stall there.</p>",
      "steps": [
        {
          "prompt": "How should Priya respond in the Review?",
          "options": [
            {
              "text": "Move multi-currency to the top; Sales is senior.",
              "quality": "weak",
              "consequence": "Account-mapping work is delayed and onboarding times remain flat.",
              "explanation": "The organization must respect the Product Owner's decisions. Seniority alone is not a reason to reorder."
            },
            {
              "text": "Acknowledge the request, ask for the evidence behind it, share the account-mapping data, and say she will make an ordering decision after comparing the two.",
              "quality": "strong",
              "consequence": "Sales shares the deal size; stakeholders see both sides of the trade-off.",
              "explanation": "The Review is a working session where the backlog may be adjusted. Transparent reasoning helps stakeholders accept the decision."
            },
            {
              "text": "Refuse to discuss it at the Review and ask Sales to submit a ticket.",
              "quality": "mixed",
              "consequence": "Sales feels dismissed and escalates.",
              "explanation": "Stakeholder input is valuable at the Review; deferring the decision is fine, but refusing the conversation is not."
            }
          ],
          "rule": "Rule: those wanting to change the Product Backlog do so by convincing the Product Owner.",
          "judgment": "Judgment: whether to decide on the spot or after analysis."
        },
        {
          "prompt": "After analysis, Priya finds multi-currency would take four Sprints and serve 3% of customers; a lightweight currency-conversion export would satisfy the prospect's main need in one Sprint. What should she do?",
          "options": [
            {
              "text": "Order the lightweight export after account mapping, explain why, and keep full multi-currency lower in the backlog pending evidence.",
              "quality": "strong",
              "consequence": "The prospect signs with the export as a bridge; onboarding times begin improving.",
              "explanation": "This balances value, cost and evidence, and communicates the decision openly."
            },
            {
              "text": "Do full multi-currency now to avoid conflict.",
              "quality": "weak",
              "consequence": "Four Sprints go to a feature few customers use.",
              "explanation": "Avoiding conflict is not a value criterion."
            },
            {
              "text": "Ask the Developers to vote.",
              "quality": "mixed",
              "consequence": "The vote is split and the decision drags on.",
              "explanation": "Developers inform the decision with sizes and risks, but ordering is the Product Owner's accountability."
            }
          ],
          "rule": "Rule: the Product Owner orders the Product Backlog and remains accountable for it.",
          "judgment": "Judgment: which smaller option best captures the value."
        }
      ],
      "wrap": "<p>Product Owner authority is exercised through transparent, evidence-informed decisions — not by ignoring stakeholders or by giving in to the loudest voice.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#sprint-review",
          "section": "Sprint Review"
        },
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
        }
      ]
    },

    {
      "id": "s6",
      "num": 6,
      "track": "pspo",
      "modules": [
        "m16"
      ],
      "minutes": 12,
      "title": "A feature is released but adoption is weak",
      "setup": "<p>Launchpad released email-domain auto-join a month ago. Only 12% of new workspaces have enabled it. Dana calls it a failure and wants it removed; Kenji thinks customers just have not found it.</p>",
      "steps": [
        {
          "prompt": "What should Priya do first?",
          "options": [
            {
              "text": "Remove the feature immediately.",
              "quality": "mixed",
              "consequence": "The few customers relying on it complain.",
              "explanation": "Removal may be right eventually, but deciding before understanding why adoption is low skips inspection."
            },
            {
              "text": "Form a testable hypothesis about the low adoption and a measure to check it.",
              "quality": "strong",
              "consequence": "Priya hypothesizes that a prompt during setup will lift adoption to 40% within a month.",
              "explanation": "EBM's experiment loop starts with a hypothesis and a measure."
            },
            {
              "text": "Ask Marketing to promote it more heavily.",
              "quality": "mixed",
              "consequence": "Adoption rises slightly, and nobody knows why.",
              "explanation": "Acting without a hypothesis or measure makes it hard to learn from the result."
            }
          ],
          "rule": "Framework: EBM's loop is hypothesis → experiment → inspect → adapt (EBM Guide, not the Scrum Guide).",
          "judgment": "Judgment: which hypothesis is most worth testing first."
        },
        {
          "prompt": "After the prompt ships, adoption reaches 35%, but time to first month-end close does not improve. What now?",
          "options": [
            {
              "text": "Celebrate; adoption nearly tripled.",
              "quality": "weak",
              "consequence": "The team keeps polishing auto-join while onboarding times stay flat.",
              "explanation": "Adoption was a means to an outcome that did not move."
            },
            {
              "text": "Keep the prompt only if evidence supports its usefulness, investigate other causes of delay, and adapt the next experiment and backlog toward them.",
              "quality": "strong",
              "consequence": "Data shows customers stall on account mapping; Priya reorders the backlog.",
              "explanation": "Inspecting results against the real goal and adapting is the point of the experiment."
            },
            {
              "text": "Abandon the Product Goal.",
              "quality": "weak",
              "consequence": "The team loses direction while the goal is still valid.",
              "explanation": "One experiment's result is a reason to change approach, not necessarily to abandon the goal."
            }
          ],
          "rule": "Rule: inspection without adaptation is pointless; adapt as soon as possible.",
          "judgment": "Judgment: whether to keep, change or remove the feature."
        }
      ],
      "wrap": "<p>Release is the start of learning, not the end of the work. Distinguish intermediate signals such as adoption from the outcomes they are meant to drive.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#adaptation",
          "section": "Adaptation"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "Making Progress Toward Goals in a Series of Small Steps",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Explicit hypothesis, experiment, result inspection and adaptation form the loop; goals may be changed when learning warrants it.",
          "authorityType": "separate-ebm-framework"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "Inspecting and Adapting Based on Experiment Results",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Inspect results against goals. Failed experiments guide new experiments; goals may change if obsolete or needing refinement, not merely because one tactic failed.",
          "authorityType": "separate-ebm-framework"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "Understanding What is Valuable",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "The guide distinguishes inputs, activities, outputs, customer outcomes and organizational impacts; more features do not necessarily improve customer experiences.",
          "authorityType": "separate-ebm-framework"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#inspection",
          "section": "Inspection"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#adaptation",
          "section": "Adaptation"
        }
      ]
    },

    {
      "id": "s7",
      "num": 7,
      "track": "pspo",
      "modules": [
        "m15"
      ],
      "minutes": 12,
      "title": "An attractive feature with large ongoing costs",
      "setup": "<p>Sales proposes fully custom-branded onboarding portals for each enterprise customer. It would probably win two large deals. The Developers estimate it would double the number of portal variants to test and support for as long as those customers stay.</p>",
      "steps": [
        {
          "prompt": "What information matters most to Priya before ordering this item?",
          "options": [
            {
              "text": "Only the revenue from the two deals.",
              "quality": "weak",
              "consequence": "Priya commits; support costs climb for years.",
              "explanation": "Revenue without ongoing cost gives a distorted picture of value."
            },
            {
              "text": "Expected benefit and the total cost of ownership — testing, support and the drag on future changes — plus whether a smaller option meets the core need.",
              "quality": "strong",
              "consequence": "Support data shows custom features generate four times the tickets of standard ones.",
              "explanation": "Value decisions consider benefit against cost over the product's life."
            },
            {
              "text": "How exciting the Developers find the work.",
              "quality": "weak",
              "consequence": "The decision is made on enthusiasm.",
              "explanation": "Team motivation can inform capability, but enthusiasm alone does not establish expected customer benefit or justify the lifetime cost."
            }
          ],
          "rule": "Rule: the Product Owner is accountable for maximizing the value of the product.",
          "judgment": "Judgment: how to estimate long-term cost credibly."
        },
        {
          "prompt": "A logo-and-color theme option would meet most of Sales' need at a fraction of the cost. It is Done on day 4 of the Sprint. When can it be released?",
          "options": [
            {
              "text": "Only after the Sprint Review approves it.",
              "quality": "weak",
              "consequence": "The deals wait an extra week.",
              "explanation": "The Sprint Review is never a gate to releasing value."
            },
            {
              "text": "As soon as releasing it is the right product decision, even before the Sprint ends.",
              "quality": "strong",
              "consequence": "It ships on day 5; both prospects see it in their trials.",
              "explanation": "An Increment may be delivered to stakeholders before the end of the Sprint."
            },
            {
              "text": "Only at the end of the Product Goal.",
              "quality": "weak",
              "consequence": "Value is delayed for months.",
              "explanation": "Scrum does not tie releases to Product Goal completion."
            }
          ],
          "rule": "Rule: an Increment may be delivered before the end of the Sprint; the Review is not a release gate.",
          "judgment": "Judgment: whether market timing favors releasing now."
        }
      ],
      "wrap": "<p>A feature's price tag continues long after it ships. Look for the smallest option that captures most of the value, and release it as soon as it makes sense.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#increment",
          "section": "Increment"
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
          "section": "Ability to Innovate (A2I); Appendix: Example Key Value Measures — Ability to Innovate (A2I)",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Poor quality, low-value feature maintenance and systemic impediments can reduce innovation capacity. Appendix examples include technical debt, defect trends and active product/code branches.",
          "authorityType": "separate-ebm-framework"
        }
      ]
    },

    {
      "id": "s8",
      "num": 8,
      "track": "shared",
      "modules": [
        "m08",
        "m15"
      ],
      "minutes": 12,
      "title": "A stakeholder wants certainty from an uncertain forecast",
      "setup": "<p>The Tallyworks board wants to announce at a conference that \"all of Launchpad's new onboarding\" will be available on March 1. Over the last six Sprints, the team has finished 7–11 backlog items per Sprint; about 60 items remain and the backlog is still growing as customer research continues.</p>",
      "steps": [
        {
          "prompt": "Dana asks Priya to confirm March 1 for the announcement. What should Priya say?",
          "options": [
            {
              "text": "\"Yes, March 1 is guaranteed.\"",
              "quality": "weak",
              "consequence": "The date slips and the public announcement damages credibility.",
              "explanation": "In complex work, what will happen is unknown. A guarantee hides real uncertainty."
            },
            {
              "text": "\"I cannot support a guaranteed date from throughput alone. We will build a forecast using comparable remaining work, observed delivery and explicit scope-growth assumptions, and identify valuable scope to target for March 1.\"",
              "quality": "strong",
              "consequence": "The board agrees to inspect a scoped forecast and its assumptions before choosing the announcement.",
              "explanation": "This requests the missing inputs, makes uncertainty visible and focuses on valuable scope without inventing a likely calendar range."
            },
            {
              "text": "\"Scrum does not allow forecasts.\"",
              "quality": "weak",
              "consequence": "The board makes up its own date.",
              "explanation": "Empiricism does not forbid forecasting; it requires forecasts to use what has happened and to be revised."
            }
          ],
          "rule": "Rule: only what has already happened may be used for forward-looking decision making.",
          "judgment": "Judgment: how to phrase ranges for a non-technical audience."
        },
        {
          "prompt": "The board insists on the full scope by March 1. Someone suggests skipping accessibility testing to go faster. What is the right position?",
          "options": [
            {
              "text": "Agree, and restore testing after the launch.",
              "quality": "weak",
              "consequence": "Accessibility defects block a public-sector customer.",
              "explanation": "Quality does not decrease during the Sprint; undone work becomes hidden risk."
            },
            {
              "text": "Keep the Definition of Done; trade scope, not quality, and keep the forecast transparent as each Sprint provides new data.",
              "quality": "strong",
              "consequence": "Updated forecasts after each Review let the board adjust messaging early.",
              "explanation": "Scope is the flexible element. Re-forecasting after each Sprint keeps decisions grounded in evidence."
            },
            {
              "text": "Add three new Developers this week.",
              "quality": "mixed",
              "consequence": "Onboarding the new Developers slows the team for two Sprints.",
              "explanation": "Adding people changes capacity and brings onboarding costs. Its near-term effect needs evidence; it cannot establish a delivery guarantee."
            }
          ],
          "rule": "Rule: quality does not decrease; scope may be renegotiated with the Product Owner.",
          "judgment": "Judgment: which scope to protect for the announcement."
        }
      ],
      "wrap": "<p>Forecasts are useful when they are honest about uncertainty. Protect quality, negotiate scope, and update the forecast as each Sprint adds evidence.</p>",
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint (forecasting)"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
          "section": "Commitment: Definition of Done"
        },
        {
          "label": "Introduction to Forecasting and Release Planning",
          "url": "https://www.scrum.org/resources/introduction-forecasting-and-release-planning",
          "section": "Forecasting",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "The Forecasting section supports using known information and delivery trends/history, and explicitly says a forecast is not a commitment or guarantee. It does not derive the course scenario's calendar range.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    }
  ];
})(typeof window !== 'undefined' ? window : globalThis);
