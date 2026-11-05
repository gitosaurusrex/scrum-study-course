/* Modules 1–8: shared foundation for PSM I and PSPO I.
   Original course prose. Framework rules are paraphrased from the 2020 Scrum
   Guide; tactics in the recurring example are illustrations, not rules. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var sg = SSS.sg, S = SSS.SRC;

  SSS.EXAMPLE_INTRO =
    '<p><strong>Launchpad</strong> is the customer-onboarding portal for <strong>Tallyworks</strong>, a fictional enterprise accounting platform. ' +
    'New customers use it to connect their bank feeds, import a chart of accounts, invite colleagues and close their first month. ' +
    'The team wants customers to reach a useful first outcome faster.</p>' +
    '<ul><li><strong>Priya</strong> — Product Owner</li><li><strong>Marcus</strong> — Scrum Master</li>' +
    '<li><strong>Ana, Kenji, Sofia, Tom and Wei</strong> — Developers (engineering, testing, UX and data skills between them)</li>' +
    '<li><strong>Helen</strong> — operations lead at Brightfield Logistics, a new customer</li>' +
    '<li><strong>Dana</strong> — VP of Customer Success at Tallyworks, a key stakeholder</li></ul>' +
    '<p>The team\'s specific tactics (their board, their estimation habits, their meeting formats) are examples. They are not Scrum requirements.</p>';

  SSS.MODULES = (SSS.MODULES || []).concat([
    {
      "id": "m01",
      "num": 1,
      "track": "shared",
      "minutes": 30,
      "title": "Scrum, complexity, and empiricism",
      "objective": "Explain why frequent inspection and adaptation matter when work is uncertain, and identify evidence that should change a team's next decision.",
      "explanation": "<p>Scrum is a lightweight framework for generating value through adaptive solutions to <em>complex</em> problems. In complex work, interactions and changing conditions make outcomes difficult to predict: customer needs shift, technology behaves unexpectedly, and people learn through experience. In that kind of work, a detailed up-front plan gives a false sense of control, because the information needed to make good decisions only appears once work is underway.</p><p>Scrum is founded on <strong>empiricism</strong> and <strong>lean thinking</strong>. Empiricism means knowledge comes from experience and decisions are based on what is actually observed. Lean thinking means reducing waste and focusing on the essentials. Together they explain why Scrum works in short cycles: each cycle produces something real to look at, which reduces the cost of being wrong.</p><h3>The three pillars</h3><ul><li><strong>Transparency</strong> — the work and the emerging process are visible to the people doing the work and the people receiving it. Without transparency, inspection is misleading.</li><li><strong>Inspection</strong> — the artifacts and progress toward agreed goals are examined frequently and diligently to detect problems. Scrum's events provide the cadence.</li><li><strong>Adaptation</strong> — when something is outside acceptable limits, the process or product is adjusted as soon as possible. Inspection without adaptation is pointless.</li></ul><p>The pillars depend on each other in order: transparency enables inspection, and inspection enables adaptation. Adaptation also depends on the people involved being empowered and self-managing; a team that must wait for permission to change cannot adapt quickly.</p><h3>Iterative and incremental</h3><p>Scrum uses an iterative, incremental approach to <em>optimize predictability and control risk</em>. Notice the wording: predictability comes from frequent, evidence-based correction, not from forecasting everything at the start. Short Sprints limit how much time and money can be spent before the next real check.</p><h3>Purposefully incomplete</h3><p>The framework defines only the parts needed to implement this theory. Practices such as user stories, story points, burn-down charts and Kanban boards may be used inside Scrum, but they are not part of it. Scrum also makes the effectiveness of existing practices visible so they can be improved. Implementing only some of Scrum's parts is possible, but the result is not Scrum.</p>",
      "example": "<p>Priya's original roadmap assumed customers struggled most with importing their chart of accounts, so the team planned three Sprints of import improvements. After the first Sprint the team released a simpler import screen and watched what happened. Import time dropped — but the share of customers completing onboarding barely moved. Session data and calls with Helen showed that most customers stalled later, while waiting for colleagues to accept invitations.</p><p>Empiricism says the observation should change the next decision. At the Sprint Review, Priya and the stakeholders discussed the evidence, and Priya reordered the Product Backlog to address the invitation problem. The roadmap was a reasonable starting hypothesis; it was not a commitment to ignore what they learned.</p>",
      "misconception": {
        "myth": "Scrum makes delivery predictable by locking the plan at the start and tracking deviation from it.",
        "reality": "Scrum optimizes predictability through frequent inspection and adaptation. Plans are expected to change as evidence appears; what stays fixed is the short cycle that produces that evidence."
      },
      "activity": {
        "type": "decision",
        "prompt": "Launchpad's new import screen cut import time by 40%, but onboarding completion stayed flat. Which piece of evidence should most influence what the team works on next?",
        "options": [
          {
            "text": "The 40% reduction in import time, because it proves the Sprint was successful.",
            "best": false,
            "feedback": "The team did deliver what it planned, but output is not the same as outcome. The goal was faster time to a useful first outcome, and that did not improve."
          },
          {
            "text": "The observation that most customers stall while waiting for invited colleagues.",
            "best": true,
            "feedback": "This is direct evidence about where value is being lost. Empiricism means letting observed results — especially surprising ones — shape the next decision."
          },
          {
            "text": "The original roadmap, because changing direction after one Sprint looks indecisive.",
            "best": false,
            "feedback": "Sticking with a plan that evidence contradicts is the opposite of empiricism. Adaptation should happen as soon as possible once a deviation is detected."
          },
          {
            "text": "The team's velocity, because it shows how much more import work they can finish.",
            "best": false,
            "feedback": "Velocity (an optional practice) describes how much work was done, not whether it created value. It cannot tell the team what to do next."
          }
        ]
      },
      "teachBack": {
        "prompt": "In your own words, explain to a colleague why Scrum works in short cycles, using the three pillars. Then give one example from your own past work where evidence should have changed a plan.",
        "rubric": [
          "Named transparency, inspection and adaptation, and showed how each depends on the previous one.",
          "Connected short cycles to reducing risk and learning sooner, not to working faster.",
          "Distinguished evidence of output (work done) from evidence of outcome (value or learning).",
          "Avoided claiming that Scrum guarantees predictability or that a plan must never change."
        ],
        "model": "<p>When work is complex, we cannot know enough up front to plan it all. Scrum uses short cycles so we produce something real, look at it honestly, and adjust. Transparency makes the real state visible; inspection examines it against our goals; adaptation changes what we do when something is off. Each step needs the one before it: you cannot inspect what is hidden, and inspecting without adjusting wastes the effort. Short cycles limit how much we can spend before learning whether we were right.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-definition",
          "section": "Scrum Definition"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-theory",
          "section": "Scrum Theory: transparency, inspection, adaptation"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#end-note",
          "section": "End Note"
        }
      ]
    },

    {
      "id": "m02",
      "num": 2,
      "track": "shared",
      "minutes": 25,
      "title": "Values and transparency",
      "objective": "Recognize behavior that supports or undermines the Scrum values and the transparency that inspection depends on.",
      "explanation": "<p>Scrum's rules alone do not make it work. The Scrum Guide says successful use depends on people becoming more proficient in five values: <strong>Commitment, Focus, Openness, Respect, and Courage</strong>.</p><ul><li><strong>Commitment</strong> — the Scrum Team commits to achieving its goals and to supporting each other. This is commitment to goals and to one another, not a promise that every selected item will be finished.</li><li><strong>Focus</strong> — the primary focus is the work of the Sprint, to make the best possible progress toward the goals.</li><li><strong>Openness</strong> — the Scrum Team and its stakeholders are open about the work and the challenges.</li><li><strong>Respect</strong> — team members respect each other as capable, independent people and are respected as such by those they work with.</li><li><strong>Courage</strong> — team members have the courage to do the right thing and to work on tough problems.</li></ul><p>The values connect directly to empiricism. When people are open and courageous, problems become visible early. When they are not, artifacts look healthier than reality, and every decision made from them is distorted. The Guide describes how embodying the values brings transparency, inspection and adaptation to life and builds trust.</p><h3>What low transparency looks like</h3><p>Decisions in Scrum are based on the perceived state of the three artifacts. If an artifact misrepresents reality, decisions can reduce value and increase risk. Common signs include: work reported as finished that does not meet the Definition of Done; a Sprint Backlog that is updated only for show; a Product Backlog that hides important items in side spreadsheets; and stakeholders who learn about problems only at the end.</p><p>Improving transparency is a recurring part of the Scrum Master's work, but it is not something one person can impose. It grows when the environment makes it safe to share bad news and when the organization responds to problems by helping rather than punishing.</p>",
      "example": "<p>Late in a Sprint, Kenji discovered that the bank-feed connector failed for one regional bank. The team's status board still showed the item in a \"Done\" column because the main path worked. Dana had told her team that the feature would be ready for a customer call the following week.</p><p>Kenji raised the issue at the next Daily Scrum, and the Developers moved the item back out of Done because it did not meet their Definition of Done. Priya then told Dana directly, before the customer call. Raising it took courage and openness; hiding it would have made the board look better and the decisions worse.</p>",
      "misconception": {
        "myth": "Commitment means the Developers promise to deliver every Product Backlog item they selected.",
        "reality": "The Developers commit to the Sprint Goal and the team commits to supporting each other. The selected items are a forecast; scope can be renegotiated with the Product Owner as long as the Sprint Goal is not endangered."
      },
      "activity": {
        "type": "decision",
        "prompt": "A weekly status report to executives shows Launchpad as \"green.\" Which detail represents the most serious transparency problem?",
        "options": [
          {
            "text": "The report uses a traffic-light format instead of a burn-up chart.",
            "best": false,
            "feedback": "The format is a tactic. Any format can be transparent or misleading; the problem lies in whether it reflects reality."
          },
          {
            "text": "Two items shown as complete have not been tested to the Definition of Done standard.",
            "best": true,
            "feedback": "This misrepresents the Increment. Stakeholders will make decisions believing work is usable when it is not, which increases risk."
          },
          {
            "text": "The report is produced weekly rather than daily.",
            "best": false,
            "feedback": "Frequency matters less than accuracy. A daily report with false information would be worse."
          },
          {
            "text": "The Developers did not write the report themselves.",
            "best": false,
            "feedback": "Who formats a report is not the core problem; misrepresenting completed work is."
          }
        ]
      },
      "teachBack": {
        "prompt": "Pick two Scrum values. For each, describe one specific behavior that strengthens transparency and one that weakens it.",
        "rubric": [
          "Used the values accurately (for example, commitment to goals and each other, not to fixed scope).",
          "Linked each behavior to whether inspection would see reality.",
          "Included stakeholders, not only the Scrum Team, where relevant.",
          "Gave concrete behaviors rather than slogans."
        ],
        "model": "<p>Openness strengthens transparency when a Developer raises a defect the moment it is found; it weakens when the team keeps two versions of status, one for itself and a nicer one for management. Courage strengthens transparency when the Product Owner tells a stakeholder that a forecast date is at risk; it weakens when the team quietly lowers quality to make a date look achievable. In both cases, the question is whether the people inspecting the work see what is really there.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-values",
          "section": "Scrum Values"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#transparency",
          "section": "Transparency"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-artifacts",
          "section": "Scrum Artifacts"
        }
      ]
    },

    {
      "id": "m03",
      "num": 3,
      "track": "shared",
      "minutes": 35,
      "title": "The Scrum Team and accountabilities",
      "objective": "Distinguish the Product Owner, Scrum Master, Developers and whole-team accountabilities, and decide who makes a given decision.",
      "explanation": "<p>A Scrum Team consists of <strong>one Scrum Master, one Product Owner, and Developers</strong>. There are no sub-teams or hierarchies inside it. It is a cohesive unit focused on one objective at a time: the Product Goal. Teams are typically 10 or fewer people; smaller teams tend to communicate better. If a team grows too large, it should consider reorganizing into several cohesive Scrum Teams focused on the same product — and those teams share the same Product Goal, Product Backlog, and Product Owner.</p><p>Scrum Teams are <strong>cross-functional</strong> (members have all the skills needed to create value each Sprint) and <strong>self-managing</strong> (they decide internally who does what, when, and how). The whole team is responsible for all product-related activities — stakeholder collaboration, verification, maintenance, operation, experimentation and research — and the <strong>entire Scrum Team is accountable for creating a valuable, useful Increment every Sprint</strong>.</p><h3>Three accountabilities</h3><p><strong>Developers</strong> are the people committed to creating any aspect of a usable Increment each Sprint. They are always accountable for creating the Sprint Backlog, instilling quality by adhering to the Definition of Done, adapting their plan each day toward the Sprint Goal, and holding each other accountable as professionals. \"Developer\" is not a job title for programmers only; testers, designers, analysts and others who do the work are Developers.</p><p>The <strong>Product Owner</strong> is accountable for maximizing the value of the product resulting from the team's work, and for effective Product Backlog management: developing and communicating the Product Goal, creating and communicating backlog items, ordering them, and keeping the backlog transparent and understood. The Product Owner may delegate this work but remains accountable. The Product Owner is one person, not a committee. Others who want to change the backlog do so by convincing the Product Owner, and the whole organization must respect the Product Owner's decisions.</p><p>The <strong>Scrum Master</strong> is accountable for establishing Scrum as defined in the Scrum Guide and for the Scrum Team's effectiveness. Scrum Masters are true leaders who serve the Scrum Team and the larger organization. Module 9 covers this in depth.</p><h3>Accountability is not the same as doing every task</h3><p>Accountability means answering for an outcome. It does not mean being the only person who does the related work. A Developer can help write backlog items; a Product Owner can help test. But the decision about backlog order belongs to the Product Owner, and the decision about how to turn items into an Increment belongs to the Developers.</p>",
      "example": "<p>Dana asked Marcus, the Scrum Master, to \"decide which onboarding features ship next quarter\" because Priya was traveling. Marcus explained that ordering the Product Backlog is Priya's accountability and offered to set up a conversation between Dana and Priya. Meanwhile, Wei, a Developer, asked Priya whether the team should pair on the invitation feature or split it. Priya pointed out that how the work gets done is the Developers' call.</p><p>Neither Marcus nor Priya was being unhelpful. Each kept the decision with the accountability that owns it, while helping the conversation happen.</p>",
      "misconception": {
        "myth": "The Scrum Master is the team's manager, and the Product Owner is the Developers' boss.",
        "reality": "There are no hierarchies within a Scrum Team. The Product Owner decides what is most valuable to work on; the Developers decide how to do it; the Scrum Master serves both and the organization."
      },
      "activity": {
        "type": "sort",
        "prompt": "Choose the accountability that owns each decision or responsibility. Use the menus; then check your answers.",
        "categories": [
          "Product Owner",
          "Scrum Master",
          "Developers",
          "Entire Scrum Team"
        ],
        "items": [
          {
            "text": "Ordering the Product Backlog",
            "answer": "Product Owner",
            "why": "Ordering backlog items is part of the Product Owner's accountability for effective Product Backlog management."
          },
          {
            "text": "Deciding how to turn selected items into a Done Increment",
            "answer": "Developers",
            "why": "How the chosen work gets done is at the sole discretion of the Developers."
          },
          {
            "text": "Creating a valuable, useful Increment every Sprint",
            "answer": "Entire Scrum Team",
            "why": "The Guide makes the whole Scrum Team accountable for this."
          },
          {
            "text": "Establishing Scrum as defined in the Scrum Guide",
            "answer": "Scrum Master",
            "why": "This is the Scrum Master's accountability, achieved by helping everyone understand Scrum theory and practice."
          },
          {
            "text": "Instilling quality by adhering to the Definition of Done",
            "answer": "Developers",
            "why": "Adhering to the Definition of Done is a Developer accountability."
          },
          {
            "text": "Cancelling a Sprint whose goal has become obsolete",
            "answer": "Product Owner",
            "why": "Only the Product Owner has the authority to cancel a Sprint."
          },
          {
            "text": "The Scrum Team's effectiveness",
            "answer": "Scrum Master",
            "why": "The Scrum Master is accountable for the team's effectiveness, by enabling it to improve its practices within the framework."
          },
          {
            "text": "Sizing Product Backlog items",
            "answer": "Developers",
            "why": "The Developers who will do the work are responsible for sizing; the Product Owner may help them understand trade-offs."
          }
        ]
      },
      "teachBack": {
        "prompt": "Without looking, list each accountability and what it is accountable for. Then explain the difference between delegating work and delegating accountability.",
        "rubric": [
          "Product Owner: value of the product and Product Backlog management (goal, items, ordering, transparency).",
          "Developers: Sprint Backlog, quality via Definition of Done, daily adaptation toward the Sprint Goal, mutual professional accountability.",
          "Scrum Master: establishing Scrum and the team's effectiveness.",
          "Explained that work can be delegated while the accountability stays with the original owner."
        ],
        "model": "<p>The Product Owner answers for the product's value and for the Product Backlog. The Developers answer for their Sprint plan, for quality against the Definition of Done, for adapting daily toward the Sprint Goal, and for holding each other to professional standards. The Scrum Master answers for Scrum being understood and enacted, and for the team's effectiveness. The whole team answers for a valuable, useful Increment every Sprint. A Product Owner can ask a Developer to draft backlog items, but if the backlog is unclear or badly ordered, the Product Owner is still the one accountable.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
          "section": "Scrum Team"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#developers",
          "section": "Developers"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
          "section": "Scrum Master"
        }
      ]
    },

    {
      "id": "m04",
      "num": 4,
      "track": "shared",
      "minutes": 30,
      "title": "Artifacts and commitments",
      "objective": "Connect each Scrum artifact to its commitment and explain how the commitment adds transparency and focus.",
      "explanation": "<p>Scrum has three artifacts. They represent work or value and are designed to maximize transparency of key information, so everyone inspecting them has the same basis for adaptation. Each artifact contains a <strong>commitment</strong> that provides a target against which progress can be measured.</p><table class=\"ref-table\"><thead><tr><th scope=\"col\">Artifact</th><th scope=\"col\">Commitment</th><th scope=\"col\">Purpose in brief</th></tr></thead><tbody><tr><td>Product Backlog</td><td>Product Goal</td><td>Emergent, ordered list of what is needed to improve the product; the single source of work for the Scrum Team.</td></tr><tr><td>Sprint Backlog</td><td>Sprint Goal</td><td>The Sprint Goal (why), the selected items (what), and an actionable plan (how); a plan by and for the Developers.</td></tr><tr><td>Increment</td><td>Definition of Done</td><td>A concrete, usable, verified stepping stone toward the Product Goal.</td></tr></tbody></table><h3>Product Backlog and Product Goal</h3><p>The Product Goal describes a future state of the product that the team can plan against. It sits within the Product Backlog; the rest of the backlog emerges to define what will fulfill it. It is the team's long-term objective, and the team must fulfill or abandon one Product Goal before taking on the next. A product, in the Guide's sense, is a vehicle to deliver value with a clear boundary, known stakeholders and well-defined users or customers.</p><h3>Sprint Backlog and Sprint Goal</h3><p>The Sprint Goal is the single objective for the Sprint. It is a commitment by the Developers, but it allows flexibility in the exact work needed to reach it, and it encourages the team to work together rather than on separate initiatives. The Sprint Backlog is updated throughout the Sprint as more is learned, with enough detail for the Developers to inspect progress at the Daily Scrum.</p><h3>Increment and Definition of Done</h3><p>An Increment is additive to all prior Increments and thoroughly verified so they work together. It must be usable to provide value. The moment an item meets the Definition of Done, an Increment is born. Several Increments can be created in one Sprint, and an Increment can be delivered to stakeholders before the Sprint ends. Module 7 covers quality and Done in depth.</p>",
      "example": "<p>Launchpad's Product Goal is: \"New customers complete their first month-end close in Tallyworks within 14 days of signing.\" The Product Backlog contains items that might help — simpler invitations, guided bank-feed setup, a close checklist. This Sprint's goal is: \"Invited colleagues can join a workspace without contacting support.\" The Developers' plan breaks the selected items into tasks they adjust daily. When an invitation improvement meets the team's Definition of Done on day four, it is an Increment, even though the Sprint is not over.</p>",
      "misconception": {
        "myth": "The Definition of Done is the acceptance criteria of a single backlog item.",
        "reality": "The Definition of Done is a formal description of the quality state required for the Increment and applies to all work. Item-specific acceptance criteria, if a team uses them, are an optional practice and do not replace it."
      },
      "activity": {
        "type": "sort",
        "prompt": "Match each description to the artifact it belongs to.",
        "categories": [
          "Product Backlog",
          "Sprint Backlog",
          "Increment"
        ],
        "items": [
          {
            "text": "Its commitment is the Product Goal",
            "answer": "Product Backlog",
            "why": "The Product Goal is the commitment for the Product Backlog."
          },
          {
            "text": "Its commitment is the Sprint Goal",
            "answer": "Sprint Backlog",
            "why": "The Sprint Goal is created in Sprint Planning and added to the Sprint Backlog."
          },
          {
            "text": "Its commitment is the Definition of Done",
            "answer": "Increment",
            "why": "Work becomes part of an Increment only when it meets the Definition of Done."
          },
          {
            "text": "An emergent, ordered list and the single source of work",
            "answer": "Product Backlog",
            "why": "This is how the Guide characterizes the Product Backlog."
          },
          {
            "text": "A plan by and for the Developers, updated throughout the Sprint",
            "answer": "Sprint Backlog",
            "why": "The Developers own and update the Sprint Backlog as they learn."
          },
          {
            "text": "Must be usable and work with everything delivered before",
            "answer": "Increment",
            "why": "Each Increment is additive, verified and usable."
          }
        ]
      },
      "teachBack": {
        "prompt": "Draw or write the framework map from memory: three artifacts, their commitments, who is primarily accountable for each, and when each is inspected.",
        "rubric": [
          "Paired each artifact with the correct commitment.",
          "Named who is primarily accountable: Product Owner for the Product Backlog; Developers for the Sprint Backlog and adherence to Done.",
          "Connected inspection points: Daily Scrum (progress toward Sprint Goal), Sprint Review (Increment and Product Goal progress).",
          "Stated that the commitments exist to add transparency and focus."
        ],
        "model": "<p>Product Backlog → Product Goal, managed by the Product Owner and inspected and adjusted at the Sprint Review and during refinement. Sprint Backlog → Sprint Goal, owned by the Developers and inspected every day at the Daily Scrum. Increment → Definition of Done, created by the Developers and inspected with stakeholders at the Sprint Review. Each commitment gives the team something to measure progress against, which makes the artifact more transparent and keeps everyone focused.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-artifacts",
          "section": "Scrum Artifacts"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-product-goal",
          "section": "Commitment: Product Goal"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-sprint-goal",
          "section": "Commitment: Sprint Goal"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
          "section": "Commitment: Definition of Done"
        }
      ]
    },

    {
      "id": "m05",
      "num": 5,
      "track": "shared",
      "minutes": 35,
      "title": "The Sprint and Sprint Planning",
      "objective": "Explain how the Sprint Goal, selection and planning work, and respond to change during a Sprint without confusing scope with the goal.",
      "explanation": "<p>The <strong>Sprint</strong> is the container for all other events. Sprints are fixed-length events of <strong>one month or less</strong>, and a new Sprint starts immediately after the previous one ends. All the work needed to achieve the Product Goal — including Sprint Planning, Daily Scrums, the Sprint Review and the Sprint Retrospective — happens within Sprints.</p><p>During the Sprint: no changes are made that would endanger the Sprint Goal; quality does not decrease; the Product Backlog is refined as needed; and scope may be clarified and renegotiated with the Product Owner as more is learned. Shorter Sprints create more learning cycles and limit risk of cost and effort to a smaller time frame.</p><p>A Sprint can be cancelled if its Sprint Goal becomes obsolete, and <strong>only the Product Owner</strong> has the authority to do so. Cancellation should be rare; it is a response to a goal that no longer makes sense, not to a team that is behind.</p><h3>Sprint Planning: three topics</h3><p>Sprint Planning starts the Sprint and is created by the collaborative work of the entire Scrum Team. The Product Owner ensures attendees are prepared to discuss the most important items and how they relate to the Product Goal. The team may invite others to provide advice. It is timeboxed to a maximum of eight hours for a one-month Sprint and is usually shorter for shorter Sprints.</p><ol><li><strong>Why is this Sprint valuable?</strong> The Product Owner proposes how the product could increase its value this Sprint. The whole team collaborates to define a Sprint Goal, which must be finalized before Planning ends.</li><li><strong>What can be Done this Sprint?</strong> Through discussion with the Product Owner, the Developers select items from the Product Backlog. Knowing their past performance, upcoming capacity and Definition of Done helps their forecast.</li><li><strong>How will the chosen work get done?</strong> The Developers plan the work needed to create an Increment that meets the Definition of Done — often breaking items into pieces of a day or less. How this is done is at the sole discretion of the Developers.</li></ol><p>The Sprint Goal, the selected items and the plan together form the Sprint Backlog.</p><h3>Goal versus scope</h3><p>The Sprint Goal is the commitment; the selected items are a forecast of what will achieve it. When the work turns out to be different than expected, the Developers collaborate with the Product Owner to renegotiate scope within the Sprint without affecting the Sprint Goal. This distinction is one of the most frequently misunderstood ideas in Scrum.</p>",
      "example": "<p>In Sprint Planning, Priya explained that customers were abandoning onboarding when colleagues did not accept invitations. The team agreed on the Sprint Goal \"Invited colleagues can join a workspace without contacting support.\" The Developers selected three items: a resend-invitation button, single sign-on invitation links, and clearer expired-link messages. Midway through, Sofia found that single sign-on needed a security review that would take three weeks. The Developers and Priya agreed to replace that item with an email-domain auto-join option that served the same goal. Scope changed; the goal did not.</p>",
      "misconception": {
        "myth": "Once Sprint Planning ends, nothing in the Sprint Backlog can change until the next Sprint.",
        "reality": "The Sprint Backlog is updated throughout the Sprint. What must not happen is change that endangers the Sprint Goal or decreases quality."
      },
      "activity": {
        "type": "decision",
        "prompt": "Halfway through the Sprint, Dana asks the team to add a new reporting export for a big customer. It is unrelated to the Sprint Goal and would require most of the team's remaining time. What is the most appropriate response?",
        "options": [
          {
            "text": "The Developers add it immediately because the customer is important.",
            "best": false,
            "feedback": "Adding unrelated work that consumes most remaining capacity would endanger the Sprint Goal, which the Guide says should not happen. It also bypasses the Product Owner."
          },
          {
            "text": "Refer the request to Priya, who can weigh it against the Product Backlog; if it is truly urgent and makes the Sprint Goal obsolete, she can decide to cancel the Sprint.",
            "best": true,
            "feedback": "The Product Owner decides how new work is ordered. Usually the request goes into the Product Backlog for a future Sprint. Cancelling is possible only if the Sprint Goal itself becomes obsolete, and only Priya can do it."
          },
          {
            "text": "Marcus, as Scrum Master, rejects the request because Sprints cannot change.",
            "best": false,
            "feedback": "The Scrum Master does not own the backlog decision, and Sprint scope can change if the goal is protected. Marcus can help Dana reach Priya and explain how Scrum handles new requests."
          },
          {
            "text": "Extend the Sprint by a week so both the goal and the export can be completed.",
            "best": false,
            "feedback": "Sprints are fixed length. Extending them undermines the cadence that makes inspection regular."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain the three Sprint Planning topics and who leads each. Then explain how a team should respond when, mid-Sprint, an item turns out to be much bigger than expected.",
        "rubric": [
          "Why: Product Owner proposes value; whole team defines the Sprint Goal before Planning ends.",
          "What: Developers select items in discussion with the Product Owner.",
          "How: Developers plan the work; no one else tells them how.",
          "Mid-Sprint: Developers and Product Owner renegotiate scope while protecting the Sprint Goal and quality."
        ],
        "model": "<p>First, the Product Owner explains how the product could become more valuable, and the whole team settles on a single Sprint Goal. Second, the Developers decide what they can take on, talking it through with the Product Owner. Third, the Developers work out how they will do it. If an item proves much larger, the Developers raise it with the Product Owner and they adjust scope — perhaps splitting the item or swapping in something smaller — so the Sprint Goal can still be met without cutting quality.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#sprint-planning",
          "section": "Sprint Planning"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-sprint-goal",
          "section": "Commitment: Sprint Goal"
        }
      ]
    },

    {
      "id": "m06",
      "num": 6,
      "track": "shared",
      "minutes": 35,
      "title": "Daily Scrum, Sprint Review, and Sprint Retrospective",
      "objective": "Distinguish the purpose, participants and timebox of each inspection event, and diagnose an event that has drifted from its purpose.",
      "explanation": "<p>Each event in Scrum is a formal opportunity to inspect and adapt. Events create regularity and minimize the need for meetings not defined in Scrum. Failing to operate an event as intended loses an opportunity to inspect and adapt.</p><table class=\"ref-table\"><thead><tr><th scope=\"col\">Event</th><th scope=\"col\">Purpose</th><th scope=\"col\">Who</th><th scope=\"col\">Timebox (one-month Sprint)</th></tr></thead><tbody><tr><td>Sprint Planning</td><td>Lay out the work for the Sprint</td><td>Entire Scrum Team (others may be invited for advice)</td><td>8 hours max</td></tr><tr><td>Daily Scrum</td><td>Inspect progress toward the Sprint Goal and adapt the Sprint Backlog</td><td>Developers</td><td>15 minutes (every working day)</td></tr><tr><td>Sprint Review</td><td>Inspect the outcome of the Sprint and determine future adaptations</td><td>Scrum Team and key stakeholders</td><td>4 hours max</td></tr><tr><td>Sprint Retrospective</td><td>Plan ways to increase quality and effectiveness</td><td>Scrum Team</td><td>3 hours max</td></tr></tbody></table><p>For Sprints shorter than a month, the Planning, Review and Retrospective are usually shorter. The Daily Scrum is 15 minutes regardless of Sprint length.</p><h3>Daily Scrum</h3><p>The Daily Scrum is for the Developers. It is held at the same time and place every working day to reduce complexity. If the Product Owner or Scrum Master are actively working on Sprint Backlog items, they participate as Developers. The Developers can choose any structure and techniques, as long as the event focuses on progress toward the Sprint Goal and produces an actionable plan for the next day. It is not the only time the Developers may adjust their plan.</p><h3>Sprint Review</h3><p>The Scrum Team presents the results of its work to key stakeholders, and progress toward the Product Goal is discussed. Attendees review what was accomplished and what has changed in the environment, then collaborate on what to do next. The Product Backlog may be adjusted. The Review is a <strong>working session</strong>; the team should avoid limiting it to a presentation. It is the second-to-last event of the Sprint.</p><h3>Sprint Retrospective</h3><p>The Scrum Team inspects how the last Sprint went regarding individuals, interactions, processes, tools and its Definition of Done. It identifies assumptions that led it astray and the most helpful changes to improve effectiveness. The most impactful improvements are addressed as soon as possible and may even be added to the next Sprint Backlog. The Retrospective concludes the Sprint.</p>",
      "example": "<p>Launchpad's Daily Scrum had drifted. Each Developer stood up and told Marcus what they did yesterday, and Dana often joined to ask for dates. The meeting took 25 minutes and nobody changed their plan afterward. Marcus asked the Developers what they needed from the event. They decided to walk their board right-to-left, ask \"what is stopping us from meeting the Sprint Goal?\", and leave detailed problem-solving for a follow-up. Marcus stopped standing at the front, and Priya offered to give Dana a separate update after the Sprint Review.</p>",
      "misconception": {
        "myth": "The Daily Scrum is a status report to the Scrum Master, who keeps it to three standard questions.",
        "reality": "The Daily Scrum is for the Developers to inspect progress toward the Sprint Goal and plan the next day. They choose its structure; the three questions are an optional technique, not a rule."
      },
      "activity": {
        "type": "decision",
        "prompt": "At Launchpad's Sprint Review, Priya plans a 30-minute slide presentation followed by sign-off from Dana. What would most improve this event?",
        "options": [
          {
            "text": "Keep the format but invite more executives so sign-off is faster.",
            "best": false,
            "feedback": "More attendees do not turn a presentation into a working session, and the Review is not an approval gate."
          },
          {
            "text": "Show the working Increment, discuss what changed in the market and customer usage, and collaborate on what to do next, adjusting the Product Backlog if needed.",
            "best": true,
            "feedback": "This matches the purpose: inspect the outcome and determine future adaptations together. The Product Backlog may change as a result."
          },
          {
            "text": "Cancel the Review and send stakeholders a release note instead.",
            "best": false,
            "feedback": "Skipping the event loses an opportunity to inspect and adapt with stakeholders."
          },
          {
            "text": "Have Marcus run the demo so Priya can focus on stakeholder questions.",
            "best": false,
            "feedback": "Who presents is a tactic. The problem is that the event is a one-way presentation and approval rather than a working session."
          }
        ]
      },
      "teachBack": {
        "prompt": "For each of the four events inside the Sprint, give its purpose in one sentence, who takes part, and one sign that it has drifted from its purpose.",
        "rubric": [
          "Stated purposes accurately (not \"status meeting\" or \"demo\").",
          "Identified Developers as the Daily Scrum participants, and key stakeholders at the Review.",
          "Recalled the timeboxes for a one-month Sprint: 8h, 15m, 4h, 3h.",
          "Named a realistic drift sign for each event."
        ],
        "model": "<p>Sprint Planning: the whole team defines why the Sprint matters; Developers select work through discussion with the Product Owner and decide how to perform it — drifting when the Product Owner hands down a fixed list. Daily Scrum: Developers check progress toward the Sprint Goal and plan the next day — drifting when it becomes a report to a manager. Sprint Review: the team and key stakeholders inspect the result and decide what next — drifting when it is a slide show with sign-off. Retrospective: the team finds ways to improve quality and effectiveness — drifting when no improvement is ever acted on.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-events",
          "section": "Scrum Events"
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
      ]
    },

    {
      "id": "m07",
      "num": 7,
      "track": "shared",
      "minutes": 30,
      "title": "Quality, Done, and Increments",
      "objective": "Apply the Definition of Done to unfinished work and distinguish a completed Increment from proven customer value.",
      "explanation": "<p>The <strong>Definition of Done</strong> is a formal description of the state of the Increment when it meets the quality measures required for the product. It creates transparency: everyone shares the same understanding of what \"complete\" means.</p><ul><li>If a Product Backlog item does not meet the Definition of Done, it cannot be released or even presented at the Sprint Review. It returns to the Product Backlog for future consideration.</li><li>If the organization has a Definition of Done as a standard, all Scrum Teams must follow it as a minimum. Otherwise, the Scrum Team must create one appropriate for the product.</li><li>The Developers are required to conform to the Definition of Done.</li><li>If several Scrum Teams work on the same product, they must mutually define and comply with the same Definition of Done.</li></ul><p>During the Sprint, quality does not decrease. The Retrospective is one place where the team can inspect and strengthen its Definition of Done.</p><h3>Increments and release</h3><p>An Increment is usable, thoroughly verified, and additive to all previous Increments. The moment an item meets the Definition of Done, an Increment is born, and several can be created within a Sprint. An Increment may be delivered to stakeholders before the Sprint ends: <strong>the Sprint Review is never a gate to releasing value</strong>. Equally, being Done does not oblige a team to release immediately; Done describes quality, while releasing is a separate product decision.</p><h3>Done is not the same as valuable</h3><p>A Done Increment meets the quality bar. Whether it actually helps customers is a separate question that only evidence can answer. A team can build exactly the right quality of the wrong thing. That is why the Sprint Review inspects outcomes with stakeholders and why later modules on value and evidence matter.</p><h3>Undone work is not \"nearly done\"</h3><p>Teams sometimes label items \"done except testing\" or move them into a hardening Sprint. This hides risk: the remaining work is unknown in size, and the Increment cannot be used. The transparent response is to treat the item as not Done, return the unfinished item to the Product Backlog with remaining work made visible, and inspect why it happened.</p>",
      "example": "<p>On the last day of a Sprint, the auto-join feature worked, but accessibility testing — part of Launchpad's Definition of Done — was unfinished. Kenji suggested demonstrating it at the Review \"with a caveat.\" The Developers instead left it out of the Increment and told Priya, who returned the unfinished item to the Product Backlog with remaining work made visible and ordered it near the top. At the Retrospective, the team found that accessibility testing was always left to the last day and agreed to start it alongside development.</p>",
      "misconception": {
        "myth": "If an item is almost finished at the end of the Sprint, the team should demonstrate it and finish the testing next Sprint.",
        "reality": "An item that does not meet the Definition of Done is not part of the Increment and cannot be presented at the Sprint Review. It returns to the Product Backlog."
      },
      "activity": {
        "type": "decision",
        "prompt": "Launchpad's guided bank-feed setup meets the Definition of Done on day 6 of a 10-day Sprint. Helen's company is waiting for it. What can happen?",
        "options": [
          {
            "text": "Nothing until the Sprint Review approves it.",
            "best": false,
            "feedback": "The Sprint Review is never a gate to releasing value."
          },
          {
            "text": "It can be delivered to stakeholders before the Sprint ends if releasing it is the right product decision.",
            "best": true,
            "feedback": "An Increment may be delivered before the Sprint ends. Being Done makes release possible; whether to release is still a product decision."
          },
          {
            "text": "It must be released immediately because it is Done.",
            "best": false,
            "feedback": "Done establishes quality; it does not mandate an immediate release."
          },
          {
            "text": "It cannot be released until all items in the Sprint are finished.",
            "best": false,
            "feedback": "Several Increments can be created in a Sprint. The integrated Increment must be usable; an individual item need not be independently releasable."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain what happens to an item that is not Done at the end of a Sprint, and why \"Done\" does not prove an Increment is valuable.",
        "rubric": [
          "Undone work cannot be released or presented and returns to the Product Backlog.",
          "Explained who decides what happens to it next (the Product Owner orders the backlog).",
          "Distinguished quality (Done) from value (evidence of customer outcomes).",
          "Mentioned inspecting the cause, for example at the Retrospective."
        ],
        "model": "<p>If an item misses the Definition of Done, it is not part of the Increment. The team does not show it at the Sprint Review or release it; it goes back to the Product Backlog, where the Product Owner decides where it fits. The team should look at why it happened, often at the Retrospective. Done tells us the work meets our quality standard; it says nothing about whether customers benefit. Customer evidence and experiments, including usage after release, help us assess the intended outcomes.</p>"
      },
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
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint"
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
      ]
    },

    {
      "id": "m08",
      "num": 8,
      "track": "shared",
      "minutes": 30,
      "title": "Backlog refinement and forecasting",
      "objective": "Distinguish required framework elements from optional techniques, and evaluate a forecast and the assumptions behind it.",
      "explanation": "<p><strong>Product Backlog refinement</strong> is the act of breaking down and further defining backlog items into smaller, more precise items. It is an <em>ongoing activity</em>, not a Scrum event, and adds details such as a description, order and size. Attributes vary with the domain of work. Items that can be Done by the Scrum Team within one Sprint are considered ready for selection at Sprint Planning.</p><p>The <strong>Developers who will do the work are responsible for sizing</strong>. The Product Owner may influence them by helping them understand and select trade-offs. The Guide does not prescribe a sizing technique, a \"definition of ready,\" or a fixed share of time for refinement.</p><h3>Optional techniques</h3><p>Many familiar practices are compatible with Scrum but not required by it: user stories, story points, planning poker, velocity, burn-down and burn-up charts, cumulative flow diagrams, task boards, and three-question Daily Scrums. These techniques must not be treated as mandatory framework elements. In practice, a team should use them when they help and drop them when they do not.</p><h3>Forecasting under uncertainty</h3><p>The Guide notes that practices such as burn-downs, burn-ups and cumulative flows can be useful for forecasting progress, but they do not replace empiricism. In complex environments, what will happen is unknown; only what has already happened can be used for forward-looking decisions. A forecast is therefore a statement based on evidence and assumptions, not a promise.</p><p>Good forecasts are updated as new information arrives, expressed as ranges or probabilities when uncertainty is significant, and accompanied by the assumptions they rely on — for example, that the backlog will not grow, that the team's composition will stay stable, or that the past rate of delivery will continue.</p><h3>Multiple teams, one product</h3><p>When several Scrum Teams work on the same product, they share one Product Goal, one Product Backlog and one Product Owner, and they mutually define and comply with the same Definition of Done. Scaling frameworks add practices for integration, but these core rules come from the Scrum Guide itself.</p>",
      "example": "<p>Dana asked when \"all of onboarding\" would be finished. Kenji pulled the team's burn-up chart: over the last six Sprints, the team had finished between 7 and 11 backlog items per Sprint, while the onboarding backlog grew by about 3 items each Sprint. Priya explained that a completion range also needs a current scope baseline, comparable item sizes and assumptions about further scope growth. She would use those inputs with observed delivery data rather than invent a date from throughput alone. She agreed to update the forecast after every Sprint Review.</p>",
      "misconception": {
        "myth": "Scrum requires user stories, story points and a velocity chart.",
        "reality": "None of these is part of the Scrum framework. They are optional techniques. Scrum requires that the Developers size the work; it does not say how."
      },
      "activity": {
        "type": "decision",
        "prompt": "Which forecast statement best reflects empirical thinking?",
        "options": [
          {
            "text": "\"We will deliver all 60 items by March 1. Our velocity is 10 points per Sprint, so it is guaranteed.\"",
            "best": false,
            "feedback": "Past performance informs a forecast but cannot guarantee a complex future. The statement also hides its assumptions."
          },
          {
            "text": "\"We will use observed delivery data and remaining scope to build a forecast, state assumptions about scope growth and capacity, and update it when new evidence arrives.\"",
            "best": true,
            "feedback": "This proposes an evidence-based forecast and makes assumptions visible; it does not claim a calendar range without the inputs to support it."
          },
          {
            "text": "\"We cannot forecast because Scrum is empirical.\"",
            "best": false,
            "feedback": "Empiricism does not forbid forecasting. It requires forecasts to be based on what has happened and to be revised as more is learned."
          },
          {
            "text": "\"The Scrum Master has set a target velocity of 15 points, so we will finish by February.\"",
            "best": false,
            "feedback": "Setting a target velocity confuses an optional measure with a goal, and the Scrum Master does not set the Developers' pace."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain refinement to someone who thinks it is a required weekly meeting. Then explain why a forecast is not a commitment.",
        "rubric": [
          "Refinement is an ongoing activity, not an event; the Guide prescribes no meeting or time allocation.",
          "Developers are responsible for sizing; the Product Owner helps with trade-offs.",
          "Named at least two optional techniques and identified them as optional.",
          "Explained forecasts as evidence-based, assumption-dependent and regularly revised."
        ],
        "model": "<p>Refinement is ongoing work to break down and clarify backlog items until they are small and clear enough to be Done in a Sprint. A team may choose to hold a regular session, but Scrum only requires that refinement happens as needed. The Developers size the items because they do the work. A forecast uses what has already happened — such as how much the team has finished in recent Sprints — to estimate a likely range. Because the future is uncertain, it depends on assumptions and should be updated whenever new evidence appears.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-backlog",
          "section": "Product Backlog"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint (forecasting)"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
          "section": "Scrum Team (multiple teams)"
        }
      ]
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
