/* Modules 9–12 (PSM I track) and 13–16 (PSPO I track).
   Topic placement is for study sequencing only: PSM I also covers product
   value, and PSPO I also relies on the whole framework. */
(function (root) {
  'use strict';
  var SSS = root.SSS = root.SSS || {};
  var sg = SSS.sg, S = SSS.SRC;

  SSS.MODULES = (SSS.MODULES || []).concat([
    {
      "id": "m09",
      "num": 9,
      "track": "psm",
      "minutes": 30,
      "title": "Scrum Master effectiveness",
      "objective": "Select actions that help establish Scrum and improve the team's effectiveness, choosing between teaching, coaching, facilitating, intervening and stepping back.",
      "explanation": "<p>The Scrum Master has two accountabilities: <strong>establishing Scrum as defined in the Scrum Guide</strong>, by helping everyone understand Scrum theory and practice, and <strong>the Scrum Team's effectiveness</strong>, by enabling the team to improve its practices within the framework. The Guide describes Scrum Masters as true leaders who serve the Scrum Team and the larger organization.</p><h3>Who the Scrum Master serves</h3><p><strong>The Scrum Team:</strong> coaching members in self-management and cross-functionality; helping them focus on high-value Increments that meet the Definition of Done; causing the removal of impediments; and ensuring all Scrum events take place and are positive, productive and kept within the timebox.</p><p><strong>The Product Owner:</strong> helping find techniques for defining the Product Goal and managing the Product Backlog; helping the team understand the need for clear, concise backlog items; helping establish empirical product planning; and facilitating stakeholder collaboration as requested or needed.</p><p><strong>The organization:</strong> leading, training and coaching its Scrum adoption; planning and advising Scrum implementations; helping employees and stakeholders understand and enact an empirical approach; and removing barriers between stakeholders and Scrum Teams.</p><h3>Choosing how to help</h3><p>Scrum.org learning resources describe several ways a Scrum Master may show up — for example as a teacher, coach, facilitator, mentor, impediment remover or change agent. These are not rules from the Guide; they are a vocabulary for choosing the right kind of help. A useful habit is to ask: <em>What does this situation need, and who should own the outcome?</em></p><ul><li><strong>Teach</strong> when people lack knowledge of Scrum (for example, a new stakeholder believes the Review is a sign-off meeting).</li><li><strong>Coach</strong> when people have the knowledge but need to find their own way forward (for example, the Developers keep missing the Sprint Goal).</li><li><strong>Facilitate</strong> when a group needs a neutral structure to reach a decision it owns.</li><li><strong>Intervene directly</strong> when a rule of the framework is being broken in a way that harms empiricism, or when an impediment is outside the team's reach.</li><li><strong>Step back</strong> when the team can solve the problem itself; solving it for them reduces self-management.</li></ul><p>Effectiveness is measured by what the team achieves and how it improves, not by how busy the Scrum Master looks. A Scrum Master who becomes the team's note-taker, scheduler and problem-solver may feel useful but can weaken the team's ability to manage itself.</p>",
      "example": "<p>The Developers complained that Sprint Planning ran long because backlog items arrived vague. Marcus could have rewritten the items himself. Instead he worked with Priya on techniques for expressing items clearly, facilitated one refinement session with the Developers to model a format, and then let the team decide how to continue. Two Sprints later, Planning finished in half the time, and Marcus was no longer involved in refinement.</p>",
      "misconception": {
        "myth": "A good Scrum Master personally solves every problem the team raises.",
        "reality": "The Scrum Master causes the removal of impediments and coaches self-management. Often the most effective help is enabling the team to solve the problem itself."
      },
      "activity": {
        "type": "decision",
        "prompt": "The Developers have missed their Sprint Goal three Sprints in a row. In the Retrospective, nobody raises it. What should Marcus do first?",
        "options": [
          {
            "text": "Tell the team they must take on less work next Sprint.",
            "best": false,
            "feedback": "This takes the decision away from the Developers, who own their forecast. It may also be the wrong diagnosis."
          },
          {
            "text": "Ask the team to look at the pattern and explore its causes, using questions rather than answers.",
            "best": true,
            "feedback": "Coaching makes the problem visible and helps the team own the solution. Marcus can teach or intervene later if the team lacks information or the issue is beyond its reach."
          },
          {
            "text": "Report the missed goals to Dana so management can step in.",
            "best": false,
            "feedback": "Escalating before helping the team inspect its own work undermines self-management and trust."
          },
          {
            "text": "Say nothing; the Retrospective belongs to the team.",
            "best": false,
            "feedback": "The team owns its improvements, but the Scrum Master is accountable for its effectiveness and should help make important patterns visible."
          }
        ]
      },
      "teachBack": {
        "prompt": "Describe one situation each where a Scrum Master should teach, coach, facilitate, and step back — and explain how you would decide between them.",
        "rubric": [
          "Matched each mode to a fitting situation (knowledge gap → teach; ownership needed → coach; group decision → facilitate; team can solve → step back).",
          "Kept decisions with the right accountability.",
          "Referred to the Scrum Master's two accountabilities: establishing Scrum and team effectiveness.",
          "Avoided treating the stances as official rules."
        ],
        "model": "<p>I would teach a new stakeholder who thinks the Sprint Review is a sign-off. I would coach a team that keeps missing its Sprint Goal, helping it find causes rather than telling it what to fix. I would facilitate a Product Owner and two stakeholders working through conflicting priorities, so the decision stays with the Product Owner. I would step back when Developers ask me to resolve a disagreement they can settle themselves. To decide, I ask what the situation needs and who should own the result.</p>"
      },
      "sources": [
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
        },
        {
          "label": "Navigating Impediments",
          "url": "https://www.scrum.org/resources/navigating-impediments",
          "section": "Who should remove impediments for the Scrum Team?",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Direct removal of every impediment can create dependency; the Scrum Master enables self-management and may intervene in organizational obstacles.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "m10",
      "num": 10,
      "track": "psm",
      "minutes": 30,
      "title": "Self-management and cross-functionality",
      "objective": "Support team decisions about who does what, when and how, and respond to command-and-control habits without simply obeying or defying management.",
      "explanation": "<p>Scrum Teams are <strong>self-managing</strong>: they internally decide who does what, when and how. During Sprint Planning, how the chosen work gets done is at the sole discretion of the Developers, and no one else tells them how to turn backlog items into Increments. The organization structures and empowers Scrum Teams to manage their own work.</p><p>Self-management is not the absence of structure. The team works within the Scrum framework, toward the Product Goal and the Sprint Goal, against the Definition of Done, and in an organization with its own constraints. Within those boundaries, the people closest to the work decide how to do it, which lets them adapt quickly. The Guide notes that adaptation becomes more difficult when people are not empowered or self-managing.</p><h3>Cross-functionality</h3><p>A cross-functional team has all the skills needed to create value each Sprint. That describes the team as a whole, not every individual. Teams typically share or acquire skills as needed, which reduces handoffs and single points of failure. People can retain their job titles and specialties. Within the Scrum Team there are no sub-teams or hierarchies — no separate \"testing team\" inside it.</p><h3>The Scrum Master's role</h3><p>The Scrum Master coaches team members in self-management and cross-functionality. When a manager wants to assign tasks, the Scrum Master does not simply comply, nor does the Scrum Master start a fight. A constructive approach is to understand the manager's concern (often a need for visibility or confidence), explain how Scrum provides transparency through its artifacts and events, and offer ways for the manager to support the team — such as removing organizational barriers or investing in skills.</p><h3>Holding each other accountable</h3><p>Developers are accountable for holding each other accountable as professionals. In a self-managing team, peer accountability replaces a manager's task-level supervision. The Scrum Master can help a team build the openness and respect it needs to do that well.</p>",
      "example": "<p>A new engineering director asked Marcus for a spreadsheet assigning each Launchpad task to a named Developer, with hours. Marcus asked what problem the spreadsheet would solve. The director wanted to know whether the invitation work would land before a customer launch. Marcus walked the director through the Sprint Backlog, which the Developers kept current, and invited the director to the Sprint Review. The director dropped the spreadsheet request and instead asked how to help with a slow security-review process — an impediment the team could not fix alone.</p>",
      "misconception": {
        "myth": "Self-managing means the team ignores management and decides everything, including the Product Goal.",
        "reality": "Self-management covers who does what, when and how. The Product Owner is accountable for the Product Goal and backlog order, and the team works within the framework and organizational context."
      },
      "activity": {
        "type": "decision",
        "prompt": "Dana wants to assign Launchpad's Sprint tasks to individual Developers to \"make sure the important ones get done.\" What is Marcus's best response?",
        "options": [
          {
            "text": "Agree, because Dana is senior and accountable for customer success.",
            "best": false,
            "feedback": "Seniority does not change who decides how work is done in Scrum. Task assignment by an outsider undermines self-management."
          },
          {
            "text": "Refuse and tell Dana that management has no role in Scrum.",
            "best": false,
            "feedback": "Management has an important role in supporting the team and removing barriers. A blunt refusal damages trust and teaches nothing."
          },
          {
            "text": "Explore Dana's underlying concern, show how the Sprint Backlog and Sprint Review provide visibility, and suggest ways Dana can support the team.",
            "best": true,
            "feedback": "This serves the organization by teaching and coaching, keeps the decision with the Developers, and addresses Dana's real need."
          },
          {
            "text": "Assign the tasks himself so that Dana does not have to.",
            "best": false,
            "feedback": "The Scrum Master is not a task manager. The Developers decide who does what."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain self-management and cross-functionality to a manager who is used to assigning tasks. Include what self-management does not mean.",
        "rubric": [
          "Self-management: the team decides who does what, when and how.",
          "Cross-functional describes the team's combined skills, not each person.",
          "Boundaries: framework, Product Goal, Sprint Goal, Definition of Done, organizational context.",
          "Offered constructive roles for management."
        ],
        "model": "<p>Self-management means the people doing the work decide how to organize it: who picks up which task, in what order, and how. That lets them adapt the moment they learn something, instead of waiting for approval. It does not mean the team sets its own product direction — the Product Owner owns that — or ignores quality standards. Cross-functional means the team, together, has every skill it needs, so work does not stall waiting for another department. Managers help most by giving teams the environment, skills and organizational support to do that well.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
          "section": "Scrum Team"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#topic-three-how-will-the-chosen-work-get-done",
          "section": "Sprint Planning, Topic Three"
        },
        {
          "label": "Navigating Impediments",
          "url": "https://www.scrum.org/resources/navigating-impediments",
          "section": "Who should remove impediments for the Scrum Team?",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Direct removal of every impediment can create dependency; the Scrum Master enables self-management and may intervene in organizational obstacles.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "m11",
      "num": 11,
      "track": "psm",
      "minutes": 35,
      "title": "Facilitation, coaching, and impediments",
      "objective": "Decide what kind of help an impediment or group conversation needs, and when direct Scrum Master action is appropriate.",
      "explanation": "<p>An <strong>impediment</strong> is an obstacle that slows or blocks the team's progress toward its goals and delivering value. Some impediments can be resolved by the team; others require help from the wider organization. The Scrum Master is accountable for <em>causing</em> the removal of impediments — a deliberate wording. It means making sure impediments get removed, not necessarily removing every one personally.</p><h3>Sorting impediments</h3><ul><li><strong>Problems within the team's control</strong> — such as a disagreement over coding standards or an unclear task split. The Developers are self-managing and should solve these. The Scrum Master may coach or facilitate, but solving them for the team weakens self-management.</li><li><strong>Problems outside the team's authority</strong> — such as a slow approval process in another department, a shared environment the team cannot access, or a policy that conflicts with Scrum. These often need the Scrum Master to work with the organization, which the Guide frames as removing barriers between stakeholders and Scrum Teams.</li><li><strong>Product decisions</strong> — such as whether a blocked item is still worth pursuing. These go to the Product Owner.</li></ul><p>The Daily Scrum helps identify impediments, but the Developers do not need to wait for it to raise one, and the Scrum Master does not need to wait to act on one.</p><h3>Facilitation</h3><p>Facilitation helps a group achieve its purpose by providing structure while staying neutral about the content. The Scrum Master ensures the Scrum events take place and are positive, productive and kept within the timebox, and facilitates stakeholder collaboration as requested or needed. The Scrum Master is not required to facilitate every event personally; for example, the Developers own the Daily Scrum.</p><h3>Coaching</h3><p>Coaching helps people find their own answers through questions, observation and reflection. It is useful when the person or team has, or can develop, what is needed to solve the problem. Teaching shares knowledge they do not yet have. Mentoring shares experience. A Scrum Master moves between these as the situation requires.</p><h3>Conflict</h3><p>Disagreement within a team is normal and can be healthy. The Scrum Master's first move is usually to help the team work through it, not to decide the outcome. Escalation or direct intervention becomes appropriate when conflict is damaging the team, harms the values of respect and openness, or cannot be resolved within the team.</p>",
      "example": "<p>Two impediments arose in one week. First, Ana and Tom disagreed about whether to write automated tests before or after code for the invitation service. Marcus asked a few questions at the Retrospective and let them agree on an experiment for one Sprint. Second, every production deploy needed a sign-off from a change-advisory board that met monthly, holding back Done Increments for weeks. That was outside the team's authority, so Marcus worked with the operations director to pilot a lighter approval route for small, low-risk changes.</p>",
      "misconception": {
        "myth": "The Scrum Master must facilitate every Scrum event, including the Daily Scrum.",
        "reality": "The Scrum Master ensures the events take place and are effective. The Daily Scrum belongs to the Developers, and the Scrum Master facilitates when requested or needed."
      },
      "activity": {
        "type": "sort",
        "prompt": "For each Launchpad problem, who should take the lead in resolving it?",
        "categories": [
          "Developers resolve it themselves",
          "Scrum Master works with the organization",
          "Product Owner decision"
        ],
        "items": [
          {
            "text": "Two Developers disagree on how to split a task.",
            "answer": "Developers resolve it themselves",
            "why": "Who does what and how is the Developers' decision; the Scrum Master may coach if they get stuck."
          },
          {
            "text": "A monthly change-advisory board blocks every release.",
            "answer": "Scrum Master works with the organization",
            "why": "This barrier lies outside the team's authority; the Scrum Master serves the organization by helping remove it."
          },
          {
            "text": "A blocked feature may no longer be worth building.",
            "answer": "Product Owner decision",
            "why": "Whether work is still valuable is a Product Owner decision expressed through backlog ordering."
          },
          {
            "text": "The build server is slow and the team has admin access.",
            "answer": "Developers resolve it themselves",
            "why": "The team has the means to fix it; this is within their self-management."
          },
          {
            "text": "HR rewards individual output, discouraging pairing.",
            "answer": "Scrum Master works with the organization",
            "why": "Organizational policies that conflict with effective Scrum are a classic area for the Scrum Master to address with leaders."
          },
          {
            "text": "A stakeholder wants a different order for the next three items.",
            "answer": "Product Owner decision",
            "why": "Those who want to change the backlog must convince the Product Owner."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain what \"causing the removal of impediments\" means, and give one example of when a Scrum Master should act directly and one where acting directly would be harmful.",
        "rubric": [
          "Distinguished causing removal from personally removing every impediment.",
          "Example of direct action: an organizational barrier outside the team's authority.",
          "Example of harmful action: solving a problem the team can solve itself.",
          "Mentioned facilitation as neutral support for a group decision."
        ],
        "model": "<p>\"Causing the removal\" means the Scrum Master makes sure impediments get dealt with, not that they fix everything. If the team can solve something — like a disagreement over how to split work — the Scrum Master may coach, but solving it for them would weaken their self-management. If the obstacle is outside the team's authority — like a slow approval board in another department — the Scrum Master should act directly with the organization, because that is part of removing barriers between stakeholders and Scrum Teams.</p>"
      },
      "sources": [
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
          "label": "Navigating Impediments",
          "url": "https://www.scrum.org/resources/navigating-impediments",
          "section": "When should team members raise impediments?",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Blockers should be raised early; Developers need not wait for the Daily Scrum or Retrospective.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "m12",
      "num": 12,
      "track": "psm",
      "minutes": 35,
      "title": "Organizational support and integrated practice",
      "objective": "Apply Scrum Master reasoning across stakeholders, product value, multiple teams and organizational barriers.",
      "explanation": "<p>The Scrum Master's work extends beyond the team. Serving the organization includes leading, training and coaching its Scrum adoption; planning and advising Scrum implementations; helping employees and stakeholders understand and enact an empirical approach to complex work; and removing barriers between stakeholders and Scrum Teams.</p><h3>Serving the Product Owner and product value</h3><p>PSM I is not only about team dynamics. The published focus areas include Product Value, Product Backlog Management, Forecasting &amp; Release Planning, and Stakeholders &amp; Customers. A Scrum Master helps the Product Owner find techniques for Product Goal definition and backlog management, helps the Developers understand why clear, concise backlog items matter, helps establish empirical product planning, and facilitates stakeholder collaboration. A Scrum Master who ignores whether the team delivers value is missing an important service.</p><h3>Scaling basics from the Guide</h3><p>When several Scrum Teams work on the same product, they share one Product Goal, Product Backlog and Product Owner, and must mutually define and comply with the same Definition of Done. Each Increment must work with all previous Increments. Scaling frameworks such as Nexus add practices for integrating the work of several teams, but you do not need their detailed rules to reason about these core constraints.</p><h3>Adapting Scrum versus changing Scrum</h3><p>Teams improve their <em>practices</em> within the framework: changing the Daily Scrum format, adopting new engineering techniques, or adjusting their Definition of Done. Changing the framework itself — removing events, appointing two Product Owners for one product, skipping the Retrospective — limits Scrum's benefits and the result is not Scrum. A Scrum Master helps the organization tell the difference.</p><h3>Putting it together</h3><p>Most realistic situations combine several principles. A useful sequence for any Scrum Master question: (1) Which accountability owns this decision? (2) What does the framework require? (3) What would increase transparency? (4) What response builds the team's and organization's capability rather than dependence on the Scrum Master?</p><h3>Customer value and stakeholder trade-offs</h3><p>The Scrum Master also supports empirical product planning and stakeholder collaboration. When two requests compete, help clarify the customer outcome, expected benefit, lifetime cost and uncertainty. Facilitate the discussion without taking over Product Owner accountability. A Done feature can still cost more than the benefit it produces; feature counts alone do not establish value.</p>",
      "example": "<p>Tallyworks decided to add a second team to Launchpad. A manager proposed giving the new team its own Product Owner and backlog \"to keep things simple,\" and letting each team define Done. Marcus explained that teams working on one product share a Product Goal, Product Backlog and Product Owner, and a common Definition of Done, so their Increments integrate. He helped Priya and both teams plan a joint refinement approach and helped the teams integrate and verify their work throughout each Sprint, resolving integration problems as they appeared. The Sprint Review would inspect the resulting Done Increment and customer outcomes. He also coached the manager on why splitting the product ownership would make value harder to maximize.</p><p>Two stakeholders wanted different Launchpad improvements. Marcus helped Priya compare customer completion problems, likely benefits, ongoing support costs and a smaller experiment. Priya decided the order and explained the assumptions. At the next Review they inspected results and reconsidered the decision.</p>",
      "misconception": {
        "myth": "The Scrum Master focuses only on the team; product value is the Product Owner's concern alone.",
        "reality": "The Scrum Master serves the Product Owner and the organization too, including helping with backlog techniques, empirical product planning and stakeholder collaboration."
      },
      "activity": {
        "type": "decision",
        "prompt": "A department head proposes that Launchpad skip Sprint Retrospectives \"because the team is already performing well.\" What is Marcus's best response?",
        "options": [
          {
            "text": "Agree for now, and restart Retrospectives if performance drops.",
            "best": false,
            "feedback": "Removing an event is changing the framework, and it loses a formal opportunity to inspect and adapt. High performance is a reason to keep improving, not to stop looking."
          },
          {
            "text": "Explain the Retrospective's purpose and the cost of losing it, and invite the team to make its Retrospectives more valuable if they feel stale.",
            "best": true,
            "feedback": "This teaches the organization why the event matters while addressing the underlying concern. Changing how the Retrospective is run is allowed; removing it is not."
          },
          {
            "text": "Shorten the Retrospective to 10 minutes and combine it with the Sprint Review.",
            "best": false,
            "feedback": "The events have different purposes and participants. Merging them blurs both."
          },
          {
            "text": "Let the Product Owner decide whether to keep it.",
            "best": false,
            "feedback": "Whether to follow the framework is not a Product Owner backlog decision. The Scrum Master is accountable for establishing Scrum as defined."
          }
        ]
      },
      "teachBack": {
        "prompt": "Walk through a realistic Scrum Master problem using the four-question sequence: accountability, framework rule, transparency, and building capability.",
        "rubric": [
          "Identified the correct accountability for the decision.",
          "Cited the relevant framework rule accurately.",
          "Proposed an action that improves transparency.",
          "Chose a response that builds capability rather than dependence."
        ],
        "model": "<p>Example: two teams on one product each want their own backlog. Accountability: the Product Owner owns the single Product Backlog. Rule: teams on one product share a Product Goal, Product Backlog and Product Owner, and a common Definition of Done. Transparency: one ordered backlog shows everyone the real priorities and dependencies; two backlogs would hide them. Capability: rather than designing their process for them, I would facilitate a session where both teams and the Product Owner work out how they will refine and integrate their work together during each Sprint.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-master",
          "section": "Scrum Master"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#scrum-team",
          "section": "Scrum Team"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-definition-of-done",
          "section": "Commitment: Definition of Done"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#end-note",
          "section": "End Note"
        },
        {
          "label": "PSM I certification and focus areas",
          "url": "https://www.scrum.org/assessments/professional-scrum-master-i-certification",
          "section": "Published Focus Areas"
        },
        {
          "label": "Customer Outcomes",
          "url": "https://www.scrum.org/resources/customer-outcomes",
          "section": "Determining customer outcomes - getting started; Conclusion",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Asking customers about their goals and challenges supports discovery of desired outcomes. This does not mandate one discovery technique for all products.",
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
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        }
      ]
    },

    {
      "id": "m13",
      "num": 13,
      "track": "pspo",
      "minutes": 30,
      "title": "Product vision, goals, and strategy",
      "objective": "Connect customer problems and product direction to choices about work, and write an outcome-oriented Product Goal.",
      "explanation": "<p>The Product Owner is accountable for <strong>maximizing the value of the product</strong> resulting from the Scrum Team's work. The Guide notes that how this is done may vary widely across organizations, teams and individuals. Part of that accountability is developing and explicitly communicating the <strong>Product Goal</strong>.</p><h3>What a product is</h3><p>The Guide describes a product as a vehicle to deliver value. It has a clear boundary, known stakeholders, and well-defined users or customers. It could be a service, a physical product or something more abstract. Defining the product boundary needs context: even a small product can deliver a clear customer outcome. A boundary becomes a concern when it prevents decisions about that outcome or obscures who benefits.</p><h3>Vision, strategy and goals</h3><p>Scrum.org's Product Owner resources describe a chain from long-term direction to near-term work. A <strong>product vision</strong> describes the purpose of the product and the change it aims to create for customers. A <strong>strategy</strong> describes how the product intends to realize that vision in its market. The <strong>Product Goal</strong> is a concrete future state of the product that the team can plan against. <strong>Sprint Goals</strong> are steps toward it. Only the Product Goal and Sprint Goal are defined in the Scrum Guide; vision and strategy are common Product Owner practices.</p><h3>Outcome-oriented goals</h3><p>A goal framed as an <em>output</em> names things to build (\"Ship a new invitation screen\"). A goal framed as an <em>outcome</em> names a change in customer behavior or results (\"Customers complete onboarding within 14 days\"). Outcome-oriented goals give the team room to discover the best solution and make it possible to inspect whether the work actually created value.</p><p>The team must fulfill or abandon one Product Goal before taking on the next. A Product Owner should be willing to abandon a goal when evidence shows it is no longer worthwhile — persisting would waste effort.</p><h3>The Product Owner as one person</h3><p>The Product Owner is one person, not a committee, and may represent the needs of many stakeholders in the Product Backlog. Effective Product Owners spend real time with customers and stakeholders to understand their problems, rather than simply collecting feature requests.</p><h3>Connecting business strategy to product choices</h3><p>Business strategy guides organizational goals and product direction. Product evidence can also challenge that strategy. For example, if a strategy assumes that more onboarding options improve retention, but customer experiments favor a simpler experience, share the findings with stakeholders and reconsider the assumption. Align the product vision, Product Goal and backlog choices with the resulting direction. Vision and strategy remain supplemental practices; they add no mandatory Scrum artifact.</p>",
      "example": "<p>Priya's first draft Product Goal was \"Deliver onboarding version 2 with 12 new features.\" After talking with Helen and other customers, she rewrote it: \"New customers complete their first month-end close in Tallyworks within 14 days of signing.\" The new goal let the Developers propose simpler solutions — for instance, a close checklist that took one Sprint instead of a full workflow engine — and gave everyone a way to check whether Launchpad was improving.</p>",
      "misconception": {
        "myth": "The Product Goal is a list of features the product must have by a certain date.",
        "reality": "The Product Goal describes a future state of the product. The Product Backlog then emerges to define what will fulfill it. Framing the goal as an outcome keeps the solution open."
      },
      "activity": {
        "type": "decision",
        "prompt": "Which candidate Product Goal for Launchpad is most useful?",
        "options": [
          {
            "text": "\"Release 15 onboarding features by Q3.\"",
            "best": false,
            "feedback": "This is an output target. It says nothing about the change the product should create and invites building features regardless of value."
          },
          {
            "text": "\"Make onboarding better.\"",
            "best": false,
            "feedback": "Too vague to plan against or to inspect progress toward."
          },
          {
            "text": "\"New customers complete their first month-end close within 14 days of signing.\"",
            "best": true,
            "feedback": "This is a concrete future state tied to a customer outcome. The team can plan against it and inspect whether they are getting closer."
          },
          {
            "text": "\"Keep all stakeholders satisfied with the onboarding roadmap.\"",
            "best": false,
            "feedback": "Stakeholder satisfaction matters, but this is not a product state. It could also push the Product Owner toward acting as a committee."
          }
        ]
      },
      "teachBack": {
        "prompt": "Write an outcome-oriented Product Goal for a product you know. Then explain how it differs from a feature list and how you would know you were making progress.",
        "rubric": [
          "Goal describes a future state or outcome, not a list of outputs.",
          "Goal is concrete enough to plan against and inspect.",
          "Distinguished Guide-defined elements (Product Goal, Sprint Goal) from practices (vision, strategy).",
          "Described evidence that would show progress or prompt abandoning the goal."
        ],
        "model": "<p>Goal: \"Small-business customers can file quarterly sales tax in under 30 minutes without contacting support.\" Unlike a feature list, it does not say what to build; it says what should become true for customers. The team can propose many solutions and choose the most valuable. I would watch filing time, support contacts and completion rate, and if evidence showed customers no longer needed this — say, a regulation change — I would consider abandoning the goal.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#commitment-product-goal",
          "section": "Commitment: Product Goal"
        },
        {
          "label": "What is a Product?",
          "url": "https://www.scrum.org/resources/what-product-1",
          "section": "Opening explanation",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Products deliver valuable customer outcomes and include objects, digital experiences, services and combinations. Size or screen count alone does not establish a valid or invalid product.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Why Is Scrum All About Products?",
          "url": "https://www.scrum.org/resources/blog/why-scrum-all-about-products",
          "section": "Defining Product; Product provides clarity and focus.",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Dave West's July 21, 2023 blog connects product boundaries, customers and outcomes; it provides interpretation, not a categorical minimum product size rule.",
          "authorityType": "author-blog-interpretation"
        },
        {
          "label": "What is a Product Vision",
          "url": "https://www.scrum.org/resources/what-product-vision",
          "section": "Opening explanation",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "A Product Vision states product purpose and intended value/beneficiaries, incorporates team/stakeholder input and exists in business/product strategy context.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Scrum and Business Strategy",
          "url": "https://www.scrum.org/resources/scrum-and-business-strategy",
          "section": "Opening explanation",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Business Strategy supplies context for product visions, product strategies and Product Goals, and should adapt empirically as assumptions are tested.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Customer Outcomes",
          "url": "https://www.scrum.org/resources/customer-outcomes",
          "section": "What are customer outcomes?",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Customer results are distinguished from tangible outputs. Outcome-oriented goals enable measuring benefit and leave solution choices open.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Customer Outcomes",
          "url": "https://www.scrum.org/resources/customer-outcomes",
          "section": "Determining customer outcomes - getting started; Conclusion",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Asking customers about their goals and challenges supports discovery of desired outcomes. This does not mandate one discovery technique for all products.",
          "authorityType": "scrum-org-learning-practice"
        },
        {
          "label": "Evidence-Based Management (EBM) and Business Strategy",
          "url": "https://www.scrum.org/resources/evidence-based-management-ebm-and-business-strategy",
          "section": "Opening explanation; organizational, portfolio and product experimentation"
        },
        {
          "label": "PSPO I suggested reading",
          "url": "https://www.scrum.org/resources/suggested-reading-professional-scrum-product-owner"
        }
      ]
    },

    {
      "id": "m14",
      "num": 14,
      "track": "pspo",
      "minutes": 35,
      "title": "Backlog ordering and stakeholders",
      "objective": "Explain ordering trade-offs, delegation and Product Owner accountability, and respond to conflicting customer and executive demands.",
      "explanation": "<p>The Product Owner is accountable for effective Product Backlog management: developing and communicating the Product Goal; creating and clearly communicating backlog items; <strong>ordering</strong> them; and ensuring the backlog is transparent, visible and understood. The Product Owner may do this work or delegate it, but <strong>remains accountable</strong>.</p><h3>Ordering, not just prioritizing</h3><p>The Guide calls the Product Backlog an <em>ordered</em> list. Ordering is more than ranking by business value. A Product Owner may consider value, risk, cost, dependencies, learning opportunities, and the size of the opportunity. Sometimes a risky item comes first because learning early is cheaper; sometimes a small item comes first because it unblocks others. The order expresses the Product Owner's best judgment about how to maximize value.</p><h3>Stakeholders and authority</h3><p>The Product Owner represents the needs of many stakeholders. Those who want to change the Product Backlog do so by trying to convince the Product Owner. For the Product Owner to succeed, the <strong>entire organization must respect their decisions</strong>, which are visible in the backlog's content and order and through the Increment at the Sprint Review.</p><p>Respecting the Product Owner's authority does not mean ignoring stakeholders. Effective Product Owners collaborate actively: they listen, share the reasoning behind ordering decisions, invite stakeholders to the Sprint Review, and make trade-offs transparent. Saying no, or not yet, is a normal part of the job.</p><h3>Delegation</h3><p>A Product Owner might ask Developers or a business analyst to write backlog items, or ask a domain expert to clarify details. That is legitimate delegation of work. What cannot be delegated is the accountability: the Product Owner still answers for the product's value and the backlog's effectiveness. Delegation needs clear intent and authority. Unexplained reversals without new evidence may reveal missing clarity; changing a decision when new evidence arrives can be healthy adaptation.</p><h3>Refinement and transparency</h3><p>A transparent backlog is visible to everyone, ordered, and understood well enough near the top that the Developers can select items in Sprint Planning. Lower items can stay coarse until they are closer. Developers size items; the Product Owner helps them understand trade-offs.</p>",
      "example": "<p>Brightfield Logistics, Launchpad's largest new customer, demanded multi-entity setup immediately. Dana, the VP of Customer Success, wanted a self-service help center first. Priya met with both, gathered evidence on how many customers each would help and how long each delayed onboarding, and showed the Developers' rough sizes. She ordered a small multi-entity improvement first because it unblocked several large customers, then the help center. She explained the reasoning at the Sprint Review and committed to revisiting the order when new data arrived.</p>",
      "misconception": {
        "myth": "When a senior executive and the Product Owner disagree about backlog order, the executive's preference wins.",
        "reality": "The entire organization must respect the Product Owner's decisions. Stakeholders influence the backlog by convincing the Product Owner, who remains accountable for the order."
      },
      "activity": {
        "type": "decision",
        "prompt": "Priya is overloaded and asks Kenji to write and order the next ten backlog items. A week later Dana complains about the order. Who is accountable for it?",
        "options": [
          {
            "text": "Kenji, because he wrote and ordered the items.",
            "best": false,
            "feedback": "Kenji did delegated work, but the Product Owner remains accountable for the Product Backlog."
          },
          {
            "text": "Priya, because she remains accountable for Product Backlog management even when she delegates the work.",
            "best": true,
            "feedback": "Delegation of work is allowed; accountability stays with the Product Owner."
          },
          {
            "text": "Marcus, because he should have stopped the delegation.",
            "best": false,
            "feedback": "Delegating backlog work is allowed. The Scrum Master may help the Product Owner with techniques but does not own the backlog."
          },
          {
            "text": "Dana, because stakeholders share ownership of the order.",
            "best": false,
            "feedback": "Stakeholders influence the backlog by convincing the Product Owner. They do not share accountability for it."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain how you would order three competing Launchpad items requested by different stakeholders, and how you would communicate the decision.",
        "rubric": [
          "Considered more than one factor (value, risk, cost, dependencies, learning).",
          "Kept the decision with the Product Owner while collaborating with stakeholders.",
          "Made the reasoning transparent, for example at the Sprint Review.",
          "Showed willingness to reorder when evidence changes."
        ],
        "model": "<p>I would gather what each stakeholder expects the item to achieve and what evidence they have, ask the Developers for rough sizes and risks, and look at dependencies. I would order to maximize value, which might mean doing a risky or enabling item first. I would explain the order and its reasoning openly — in conversations and at the Sprint Review — and say what evidence would cause me to change it. The decision is mine as Product Owner, but stakeholders should understand it and feel heard.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-backlog",
          "section": "Product Backlog"
        },
        {
          "label": "Ordering the Product Backlog",
          "url": "https://www.scrum.org/resources/ordering-product-backlog",
          "section": "Opening explanation",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Ordering may consider business value, risk, ROI, dependencies and impact; no single required ordering formula is prescribed.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "m15",
      "num": 15,
      "track": "pspo",
      "minutes": 35,
      "title": "Value, economics, and releases",
      "objective": "Evaluate value, cost over the product's life, risk and uncertainty, and plan releases empirically.",
      "explanation": "<p>Maximizing value is the Product Owner's central accountability, yet the Scrum Guide deliberately does not define value. Value is what customers, users and the organization actually gain from the product — and evidence is needed to assess it. Customer research and small experiments can test assumptions before a complete feature is delivered; usage after release provides further evidence. Revenue, cost savings, customer satisfaction, regulatory compliance, risk reduction and learning can all be forms of value, depending on the product.</p><h3>Cost over the product's life</h3><p>A feature's cost does not end when it ships. Software features can add maintenance, testing, documentation, support and complexity costs. Some changes simplify the product instead; consider the actual costs and benefits of the proposed change. Scrum.org Product Owner materials discuss this as <strong>total cost of ownership</strong>. A feature that brings modest benefit but large ongoing cost may reduce overall value. Removing rarely used features can increase value by lowering ongoing cost.</p><h3>Technical debt</h3><p>Technical debt — shortcuts in design or code that make future change harder — is not a Scrum Guide term, but it matters to value. It slows delivery, increases defects, and reduces the organization's ability to respond to new opportunities. A Product Owner who never allows time to address it trades short-term output for long-term value. Making technical debt transparent in the Product Backlog lets the Product Owner order it against other work.</p><h3>Risk and uncertainty</h3><p>In complex work, the biggest risk is often building something nobody needs. Delivering small Increments early and inspecting real usage reduces that risk. Ordering riskier, more uncertain items early can be valuable when learning sooner prevents larger waste later.</p><h3>Releases</h3><p>An Increment that meets the Definition of Done is usable and may be released at any time, including before the Sprint Review. The Sprint Review is never a gate to releasing value. Releasing frequently shortens the feedback loop and lets the organization realize value sooner. Release timing remains a product decision informed by customer needs, market timing and organizational constraints.</p><h3>Empirical release planning</h3><p>Forecasts for future releases should be based on what has actually happened and revised as more is learned. The Product Owner can present a likely range with its assumptions, and use each Sprint Review to update stakeholders. An unsupported fixed-scope, fixed-date promise can create pressure for hidden compromises. Make uncertainty and scope trade-offs explicit while preserving quality.</p>",
      "example": "<p>Sales wanted Launchpad to support custom-branded onboarding portals for each enterprise customer. It would likely win two deals. The Developers estimated it would also double the number of portal variants to test and support. Priya asked Customer Success how many support tickets existing customization generated, and found that customized features produced four times the support load of standard ones. She proposed a lighter alternative — a customer logo and color theme — that addressed most of the sales need at a fraction of the ongoing cost, and released it as soon as it was Done instead of waiting for the next Sprint Review.</p>",
      "misconception": {
        "myth": "The more features we deliver, the more value we create.",
        "reality": "Output does not establish value. Features can add ongoing costs without enough customer benefit, while some changes simplify the product. Inspect customer and business outcomes alongside the actual lifetime costs."
      },
      "activity": {
        "type": "decision",
        "prompt": "Two Launchpad items compete for the next Sprint. Item A: a niche integration requested by one large customer, expected to need ongoing maintenance with every partner API change. Item B: removing a confusing step that most customers abandon at, with low ongoing cost. Which reasoning is strongest?",
        "options": [
          {
            "text": "Choose A because the customer is large and has asked directly.",
            "best": false,
            "feedback": "Customer size matters, but this ignores ongoing cost and how many customers benefit."
          },
          {
            "text": "Compare expected customer benefit, ongoing cost, uncertainty and learning; if B offers the stronger net benefit, choose it and inspect results, while keeping A open for reconsideration.",
            "best": true,
            "feedback": "This compares the alternatives using value evidence rather than customer count alone. A large customer could justify A if its expected benefit outweighs its lifetime costs."
          },
          {
            "text": "Do both in parallel to avoid choosing.",
            "best": false,
            "feedback": "Avoiding the trade-off spreads focus and is still a decision — usually a worse one."
          },
          {
            "text": "Ask the Developers to choose because they know the costs.",
            "best": false,
            "feedback": "The Developers' sizing informs the decision, but ordering is the Product Owner's accountability."
          }
        ]
      },
      "teachBack": {
        "prompt": "Explain why delivering more features does not necessarily increase value. Include total cost of ownership and release timing in your answer.",
        "rubric": [
          "Distinguished output from outcomes/value.",
          "Explained ongoing costs: maintenance, support, complexity, technical debt.",
          "Linked early, frequent release to faster feedback and value realization.",
          "Noted that the Sprint Review is not a release gate."
        ],
        "model": "<p>Features are outputs; value is what customers and the organization gain. Software features can carry ongoing costs — maintenance, testing, support, complexity — so a low-use feature can reduce net value. Technical debt makes later change slower and riskier. Releasing Done Increments early, without waiting for the Sprint Review, gets real feedback sooner and starts realizing value sooner. The Product Owner orders work to maximize value over the product's life, not to maximize the number of things shipped.</p>"
      },
      "sources": [
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#product-owner",
          "section": "Product Owner"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#increment",
          "section": "Increment"
        },
        {
          "label": "Scrum Guide",
          "url": "https://scrumguides.org/scrum-guide.html#the-sprint",
          "section": "The Sprint"
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
          "label": "Introduction to Forecasting and Release Planning",
          "url": "https://www.scrum.org/resources/introduction-forecasting-and-release-planning",
          "section": "Release Planning",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Frequent small releases support faster user feedback, learning and course correction and earlier risk discovery. These are potential benefits, not guaranteed customer satisfaction.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    },

    {
      "id": "m16",
      "num": 16,
      "track": "pspo",
      "minutes": 35,
      "title": "Evidence-Based Management and integrated Product Owner practice",
      "objective": "Interpret value evidence using the four Key Value Areas, form a hypothesis and measure, and choose the next adaptation.",
      "explanation": "<p><strong>Evidence-Based Management (EBM)</strong> is a Scrum.org framework, published in its own guide, that helps people, teams and organizations make better-informed decisions toward their goals using intentional experimentation and feedback. It is not part of the Scrum Guide, and the course makes no claim about how heavily it is weighted on any exam. It is useful because it gives Product Owners a structured way to think about value and evidence.</p><h3>Goals at different horizons</h3><p>EBM describes a <strong>Strategic Goal</strong> (a long-term, ambitious aim), <strong>Intermediate Goals</strong> (milestones on the way, whose achievement shows progress toward the Strategic Goal), and <strong>Immediate Tactical Goals</strong> (near-term objectives the team is working on now). A Sprint Goal is often an example of an immediate tactical goal, and a Product Goal may play the role of an intermediate goal.</p><h3>Four Key Value Areas</h3><ul><li><strong>Current Value</strong> — the value the product delivers today. Example question: how satisfied are customers, and what results are they achieving now?</li><li><strong>Unrealized Value</strong> — the potential future value that could be realized by better meeting customer needs. The gap between what customers want and what they currently experience is one signal.</li><li><strong>Ability to Innovate</strong> — the organization's capability to deliver new capabilities. Technical debt, defect load and time spent maintaining old features reduce it.</li><li><strong>Time to Market</strong> — how quickly the organization can deliver new capabilities and learn from them. Release frequency and cycle time are examples of signals.</li></ul><p>The first two areas describe the value of the product; the last two describe the organization's capability to deliver value. Looking at all four avoids optimizing one at the expense of the others.</p><h3>The experiment loop</h3><p>Because outcomes in complex work are uncertain, EBM treats each step toward a goal as an experiment: <strong>form a hypothesis</strong> about an improvement and the result it should produce, <strong>run the experiment</strong> using an appropriate test, which may be a prototype or another small test of assumptions rather than delivery of the entire feature, <strong>inspect the results</strong> against the measure, and <strong>adapt</strong> the goals or approach. This is empiricism applied to product strategy.</p><h3>Choosing measures</h3><p>Useful measures show whether customers and the organization are better off. Activity measures (hours worked, meetings held) and output measures (features shipped, story points completed) are easy to collect but say little about value and can be gamed. Every measure has limits; combine several and treat them as evidence to be interpreted, not as targets to be hit at any cost.</p>",
      "example": "<p>Launchpad's auto-join feature shipped, but adoption was weak: only 12% of new workspaces used it. Priya framed a hypothesis: \"If we prompt admins to enable auto-join during bank-feed setup, at least 40% of new workspaces will enable it, and median time to first close will fall by three days.\" The team shipped the prompt in one Sprint. Adoption rose to 35%, but time to first close barely moved — customers were stalling on account mapping instead. Priya adapted: she retained the prompt only if evidence showed it remained useful and reordered the next experiment toward account mapping. The first-close goal remained relevant; the approach changed. Meanwhile, Kenji pointed out that defect fixes were consuming a third of each Sprint, a warning sign for Ability to Innovate; Priya asked the team to investigate the causes and made appropriate improvement work visible for ordering.</p>",
      "misconception": {
        "myth": "Velocity and the number of features delivered are good measures of the value a Product Owner creates.",
        "reality": "These are output measures. EBM looks at customer outcomes (Current and Unrealized Value) and organizational capability (Ability to Innovate and Time to Market)."
      },
      "activity": {
        "type": "decision",
        "prompt": "Which hypothesis and measure would best help Priya decide what to do next about weak adoption of a new Launchpad feature?",
        "options": [
          {
            "text": "\"If we finish the next five items, adoption will improve.\" Measure: items completed per Sprint.",
            "best": false,
            "feedback": "This measures output, not the customer outcome, and the hypothesis has no specific, testable expectation."
          },
          {
            "text": "\"If we add an in-product prompt at bank-feed setup, at least 40% of new workspaces will enable the feature within a month.\" Measure: share of new workspaces enabling it.",
            "best": true,
            "feedback": "This is specific and falsifiable, ties the change to an expected customer behavior, and the measure tells Priya whether to persist or adapt."
          },
          {
            "text": "\"Customers will like the feature more over time.\" Measure: team morale survey.",
            "best": false,
            "feedback": "The hypothesis is vague and the measure is unrelated to customer value."
          },
          {
            "text": "\"Adoption is low because of marketing.\" Measure: none needed.",
            "best": false,
            "feedback": "Without a measure there is no experiment and no evidence to inspect."
          }
        ]
      },
      "teachBack": {
        "prompt": "Name the four Key Value Areas and give a Launchpad example of evidence for each. Then describe one experiment loop from hypothesis to adaptation.",
        "rubric": [
          "Named Current Value, Unrealized Value, Ability to Innovate and Time to Market accurately.",
          "Distinguished product value (first two) from organizational capability (last two).",
          "Described a specific, testable hypothesis with a measure.",
          "Showed adaptation based on the results, including the possibility of abandoning an idea."
        ],
        "model": "<p>Current Value: share of new customers who complete their first close. Unrealized Value: the many prospects who say onboarding takes too long. Ability to Innovate: a third of each Sprint going to defects. Time to Market: Done Increments waiting weeks for a release approval. Experiment: \"If we add a setup prompt, 40% of workspaces will enable auto-join.\" We run an appropriate test, inspect adoption and time to first close, and adapt the approach based on what we find. We retain the change only if evidence supports its usefulness.</p>"
      },
      "sources": [
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "Definition of Evidence-Based Management",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "The May 2024 EBM Guide defines its own framework for better-informed decisions using intentional experimentation and feedback.",
          "authorityType": "separate-ebm-framework"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "EBM Helps Organizations Achieve Their Goals in a Complex World",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Strategic, Intermediate and Immediate Tactical Goals are separate levels. Relevance and progress should be examined; levels are not individual task lists.",
          "authorityType": "separate-ebm-framework"
        },
        {
          "label": "Evidence-Based Management Guide (May 2024)",
          "url": "https://www.scrum.org/resources/online-evidence-based-management-guide",
          "section": "EBM Uses Key Value Areas to Examine Improvement Opportunities",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "CV and UV examine market value; A2I and T2M examine the organization's capability to deliver valuable outcomes.",
          "authorityType": "separate-ebm-framework"
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
          "section": "Hypotheses, Experiments, Features, and Requirements",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "A whole feature need not be built to test critical value assumptions. Customer evidence can come from small experiments.",
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
          "label": "Steer with product vision, strategy and goals",
          "url": "https://www.scrum.org/resources/steer-product-vision-strategy-and-goals",
          "section": "Opening explanation and goal structure",
          "verifiedOn": "2026-10-14",
          "sourceSupport": "Product Goal and Sprint Goal are given as possible examples of intermediate and tactical goals, not mandatory equivalences between the frameworks.",
          "authorityType": "scrum-org-learning-practice"
        }
      ]
    }
  ]);
})(typeof window !== 'undefined' ? window : globalThis);
