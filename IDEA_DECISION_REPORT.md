# Vibe2Ship Problem Statement 1 - Idea Decision Report

**Date:** 2026-06-25  
**Selected Problem Statement:** Problem Statement 1 - The Last-Minute Life Saver  
**Final Winning Idea:** Reentry  
**Flagship Feature:** Version Zero  
**Secondary Module:** FinalMile Check

---

## 1. Hackathon Context

The selected challenge asks for an AI-powered productivity companion that helps users plan, prioritize, and complete tasks before deadlines are missed.

The submission will be judged on:

| Criterion | Weight |
|---|---:|
| Problem Solving & Impact | 20% |
| Agentic Depth | 20% |
| Innovation & Creativity | 20% |
| Usage of Google Technologies | 15% |
| Product Experience & Design | 10% |
| Technical Implementation | 10% |
| Completeness & Usability | 5% |

The most important implication: a generic AI planner, reminder app, Pomodoro timer, habit tracker, or calendar scheduler is unlikely to stand out. The winning idea needs to show meaningful action, not passive nudging.

---

## 2. Human Problem

The real user is not simply disorganized. They often already know what matters.

The deeper human loop is:

1. The task feels large, vague, emotionally loaded, or tied to possible failure.
2. The user avoids opening it.
3. Avoidance gives short-term relief.
4. Guilt increases.
5. The task now feels even harder to start.
6. Near the deadline, panic replaces planning.
7. The user either rushes, submits badly, or misses the deadline.

For non-deadline goals like upskilling, the loop is similar but worse:

1. There is no hard deadline.
2. There is no immediate consequence.
3. The goal is vague: "learn AI", "learn React", "prepare DSA", "build portfolio".
4. The user postpones because there is no clear first artifact.

So the winning product should not mainly say "manage your time better." It should reduce the emotional cost of starting and create visible proof of progress quickly.

---

## 3. Core Insight

Most productivity products optimize the plan.

The better product rescues the moment when the user drifts away from the work.

**Final thesis:**

> A procrastinator does not need another dashboard. They need a low-shame way to re-enter avoided work and create the first imperfect artifact.

---

## 4. Ideas Considered

### Idea 1: PRESENCE

**Pitch:** A Chrome extension that detects deadline pressure, tab switching, and document inactivity, then intervenes before the user misses a deadline.

**Strengths:**

- Strongest original behavioral insight.
- Clearly goes beyond reminders.
- Calendar pressure plus document inactivity is highly relevant to PS1.
- Strong innovation story.

**Weaknesses:**

- Too large for the hackathon as written.
- Chrome extension, tab telemetry, Drive revisions, Gemini Nano, Gemini Live, FCM, Pub/Sub, Eventarc, Gmail, Slides, Maps, and debriefs are too much.
- Keydown capture and behavioral monitoring can feel invasive.
- Heavy psychology language may distract or worry judges.

**Verdict:** Do not build PRESENCE v4 as written. Keep its core insight: detect avoidance around urgent work.

**Score:** 8.0/10 as an idea, 6.0/10 as the current PRD build.

---

### Idea 2: FinalMile

**Pitch:** An AI agent that turns a last-minute assignment, hackathon, grant, job application, or submission into a checked, packaged, permission-safe final bundle.

**Strengths:**

- Very practical.
- Easy to demo using the hackathon's own submission requirements.
- Strong Google Workspace fit: Docs, Drive, Gmail, Calendar.
- Solves real final-step failures: private links, missing docs, wrong formats, incomplete requirements.

**Weaknesses:**

- May feel like a submission checklist if not framed well.
- Does not fully solve the emotional start problem.
- Could look like a Gemini wrapper if it only generates documents.

**Verdict:** Strong module, but not the whole product. Use it as the finishing layer after the user has re-entered the task.

**Score:** 8.4/10.

---

### Idea 3: Deadline War Room

**Pitch:** A crisis dashboard for an approaching deadline that gathers Calendar, Gmail, and Drive context, then helps the user finish.

**Strengths:**

- Strong demo clarity.
- Good Google Cloud web app fit.
- Easy to explain to judges.
- Can include artifact creation, email drafts, file search, and focus blocks.

**Weaknesses:**

- "War Room" can feel panic-inducing.
- Sounds enterprise/team-oriented rather than private and human.
- Risks becoming a dashboard unless the agent takes real action.

**Verdict:** Useful implementation pattern, but not the best emotional framing.

**Score:** 8.1/10.

---

### Idea 4: Momentum Mode

**Pitch:** A mode for long-term, no-deadline goals like upskilling, portfolio building, DSA practice, or job preparation.

**Strengths:**

- Addresses an important human gap: vague goals with no urgency.
- Expands beyond deadline-only productivity.
- Useful for students and self-learners.

**Weaknesses:**

- Weaker fit for "Last-Minute Life Saver."
- "Momentum" sounds generic.
- Lower demo urgency.
- Can become another habit tracker if not tied to artifact creation.

**Verdict:** Include as a secondary mode, not the main hackathon demo.

**Score:** 7.2/10.

---

### Idea 5: Meeting Rescue Room

**Pitch:** Ten minutes before a meeting or interview, the agent builds a live prep cockpit from Calendar, Gmail, Drive, attendees, and likely questions.

**Strengths:**

- Strong use case: interviews, investor calls, client meetings.
- Great demo: empty calendar event becomes a prep brief and agenda.
- Good Google API fit.

**Weaknesses:**

- Narrower than the full PS1.
- Less helpful for assignments, bills, hackathons, and long-term goals.
- Could be confused with meeting summarization/prep tools.

**Verdict:** Good scenario inside Reentry, not the final product.

**Score:** 8.0/10.

---

### Idea 6: Permission Panic Killer

**Pitch:** An agent that catches broken links, private Drive files, missing attachments, wrong formats, and bad permissions before a submission or email is sent.

**Strengths:**

- Extremely concrete.
- Solves a painful last-minute failure.
- Easy to verify in a demo.

**Weaknesses:**

- Too narrow as a full hackathon project.
- Lower emotional depth.
- May not feel like a complete productivity companion.

**Verdict:** Use inside FinalMile Check.

**Score:** 7.8/10.

---

### Idea 7: Deadline Triage ER

**Pitch:** When there is not enough time to do everything, the agent cuts scope and produces the minimum viable deliverable.

**Strengths:**

- Strong human truth: near deadlines, the real question is what to skip.
- Helps users stop pretending everything can still be done.
- Good "meaningful action" fit.

**Weaknesses:**

- Risk of sounding defeatist.
- Needs careful UX so scope-cutting feels supportive.

**Verdict:** Use as part of Reentry's deadline mode.

**Score:** 8.3/10.

---

### Idea 8: Version Zero

**Pitch:** An AI companion that asks, "What is the ugliest acceptable first version we can create in 10 minutes?" and immediately creates it.

**Strengths:**

- Most human-centered idea.
- Directly attacks start paralysis.
- Simple, memorable, and demoable.
- Avoids shame and productivity theater.
- Works for both deadlines and no-deadline goals.

**Weaknesses:**

- Needs a broader product wrapper to satisfy the full PS1.
- If it only creates drafts, judges may see it as simple AI generation.

**Verdict:** This should be the flagship feature of the winning product.

**Score:** 9.0/10.

---

## 5. Final Winning Idea: Reentry

### One-Line Pitch

**Reentry is an AI companion for avoided work. It notices when a task is becoming dangerous or stagnant, helps the user create a 10-minute Version Zero, then handles the final-mile actions needed to actually submit or continue.**

### Short Pitch

Most productivity tools remind you about the work. Reentry helps when you are emotionally avoiding it.

It turns:

- "I can't start this" into a Version Zero artifact.
- "I do not have enough time" into a minimum viable scope.
- "I might miss the submission" into a FinalMile checklist.
- "I want to upskill someday" into today's smallest visible proof of progress.

### Why This Is the Best Idea

Reentry combines the strongest parts of all previous concepts:

| Source Idea | What Reentry Keeps | What Reentry Drops |
|---|---|---|
| PRESENCE | Detecting avoidance around urgent work | Overbuilt telemetry, keylogging, clinical framing |
| FinalMile | Submission readiness and artifact checks | Being only a checklist/auditor |
| Deadline War Room | Deadline rescue and context gathering | Panic-heavy "war room" framing |
| Momentum Mode | No-deadline upskilling support | Generic habit tracking |
| Version Zero | Tiny imperfect first artifact | Being only a drafting feature |

### Final Score

**Reentry: 9.3/10**

It has the best balance of:

- Human truth
- Hackathon originality
- Demo clarity
- Agentic action
- Google technology fit
- Buildability

---

## 6. Product Modes

### Mode 1: Deadline Reentry

For assignments, hackathons, interviews, meetings, reports, bills, submissions, and client work.

**Goal:** Rescue the user before the deadline is missed.

Flow:

1. User connects Google Calendar, Drive, Gmail, and Docs.
2. Reentry finds an urgent upcoming commitment or the user selects one.
3. Gemini identifies the likely deliverable and relevant files.
4. The app asks one low-friction question: "Want a 10-minute Version Zero?"
5. It creates a rough first artifact: outline, first paragraph, 2 slides, email draft, README, project doc, or checklist.
6. It proposes the next 3 actions.
7. If submission is near, FinalMile Check audits requirements, links, permissions, and missing sections.

### Mode 2: Momentum Reentry

For no-deadline goals like upskilling, portfolio building, DSA, AI learning, job preparation, writing, or fitness planning.

**Goal:** Convert vague ambition into visible proof of progress.

Flow:

1. User enters a goal like "learn React" or "prepare for DSA".
2. Reentry refuses to create a huge plan first.
3. It creates today's smallest artifact:
   - React: one tiny component
   - DSA: one solved easy problem plus notes
   - AI: one mini demo prompt/app
   - Portfolio: one project card
   - Job prep: one improved resume bullet or interview answer
4. It stores the artifact and schedules the next tiny reentry block.

### Mode 3: FinalMile Check

For submissions and deadline deliverables.

**Goal:** Prevent last-step failure.

Checks:

- Required sections present
- Google Doc is public if needed
- Drive files have correct sharing
- GitHub/deploy links exist
- Attachments are included
- Export format is correct
- Final email/update draft exists

---

## 7. Recommended MVP

Build Reentry as a **Google Cloud web app**, not browser-only.

### Must Build

1. Google OAuth sign-in.
2. Calendar deadline selector or manual deadline brief input.
3. Gemini requirement and context analyzer.
4. Drive file search for relevant docs/slides.
5. Version Zero generator.
6. Google Docs creation for generated briefs/reports.
7. Gmail draft generation for final communication.
8. FinalMile checklist for submission readiness.
9. Simple debrief: "You went from avoided task to Version Zero in X minutes."

### Nice to Have

1. Calendar focus block creation.
2. Google Slides 2-slide starter.
3. Lightweight browser helper or extension.
4. Scheduled deadline checks.

### Do Not Build for MVP

1. Full Chrome extension as the main product.
2. Keystroke capture.
3. Tab-switch monitoring as a required feature.
4. Gemini Nano.
5. Gemini Live voice.
6. Complex Pub/Sub/Eventarc real-time pipeline.
7. Social accountability rooms.
8. Streaks, leaderboards, guilt scores, or gamification.
9. Clinical mental-health claims.

---

## 8. Demo Scenario

### Demo Title

**The 90-Minute Reentry**

### Setup

The user has a Vibe2Ship submission due soon. They feel stuck and have not prepared the project description document.

### Demo Flow

1. User opens Reentry.
2. Reentry reads the hackathon brief or Calendar deadline.
3. Gemini extracts mandatory submission requirements:
   - deployed application link
   - GitHub repository link
   - Google Doc project description
   - problem statement selected
   - solution overview
   - key features
   - technologies used
   - Google technologies utilized
4. Reentry asks: "Want a 10-minute Version Zero?"
5. User clicks start.
6. Reentry creates a rough project description document.
7. Reentry searches Drive/GitHub/deploy fields or asks for missing links.
8. FinalMile Check flags missing or private links.
9. Reentry creates a final submission checklist and Gmail/update draft.
10. Debrief shows: "Avoided task -> Version Zero doc -> submission checklist."

### Judge Wow Moment

The app uses the hackathon's own requirements as input, then creates and audits the exact artifact needed for the hackathon submission.

---

## 9. Google Technology Stack

| Technology | Use |
|---|---|
| Gemini API | Requirement extraction, artifact generation, next-action reasoning |
| Google Cloud Run | Public deployed web app backend |
| Google AI Studio | Rapid prototyping and Cloud Run deployment path |
| Google Calendar API | Deadline detection and focus block creation |
| Google Drive API | Find related files and check sharing/access state |
| Google Docs API | Create Version Zero documents and project reports |
| Gmail API | Draft final submission/update emails |
| Google Slides API | Optional 2-slide starter for presentation deadlines |
| Firestore | Store reentry sessions, checklist state, and generated artifacts |

---

## 10. Why It Beats Common Competitors

Most teams will likely build:

- AI calendar scheduler
- AI task prioritizer
- AI reminder bot
- Pomodoro coach
- Habit tracker
- Voice assistant for tasks

Reentry is different because it does not start from "organize my tasks." It starts from "I am avoiding the thing I already know matters."

That is more emotionally true and more aligned with the brief's demand to move beyond passive reminders.

---

## 11. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Looks like a generic Gemini wrapper | Show agent loop: detect, gather context, create artifact, audit, propose next action |
| Too broad | Demo only Deadline Reentry + Version Zero + FinalMile Check |
| Privacy concerns | No keystroke capture, no hidden tab tracking in MVP, explicit OAuth permissions |
| Weak no-deadline fit | Keep Momentum Reentry as secondary, not main demo |
| AI output is mediocre | Frame output as Version Zero, not final polished work |
| Too many APIs | Use Calendar, Drive, Docs, Gmail first; Slides optional |

---

## 12. Final Recommendation

Build **Reentry**.

Do not build PRESENCE v4 as written. Do not build a pure FinalMile checker. Do not make the main experience a panic-heavy War Room.

The winning product should be:

> **Reentry: an AI companion for avoided work that creates the first imperfect artifact, then gets the final mile ready before the deadline is missed.**

For the hackathon demo, focus on:

1. One deadline.
2. One avoided task.
3. One Version Zero artifact.
4. One FinalMile readiness check.
5. One clear before/after debrief.

That gives the project a human soul, a strong AI agent loop, a practical Google Workspace build, and a memorable judging story.

---

## 13. Sources Consulted

Local files:

- `Vibe2Ship - Problem Statements & Submission Guidelines.md`
- `PRESENCE_PRD.md`

External references:

- Google AI Studio Build Mode and Cloud Run deployment: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
- Google Cloud Run documentation: https://docs.cloud.google.com/run/docs
- Google Workspace API enablement: https://developers.google.com/workspace/guides/enable-apis
- Focusmate body-doubling positioning: https://www.focusmate.com/
- Reclaim AI calendar positioning: https://reclaim.ai/

