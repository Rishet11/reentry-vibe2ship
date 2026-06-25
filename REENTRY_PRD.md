# Reentry - Product Requirements Document

**Version:** 1.0  
**Status:** Judge-Ready PRD  
**Date:** 2026-06-25  
**Hackathon:** Vibe2Ship  
**Selected Problem Statement:** Problem Statement 1 - The Last-Minute Life Saver  

**Submission Authority Note:** This PRD supersedes `PRESENCE_PRD.md` for build and judge submission. `PRESENCE_PRD.md` should be treated as an earlier brainstorming artifact, not the implementation scope.

---

## 1. Executive Summary

**Reentry** is an AI companion for avoided work.

Most productivity tools assume the user needs a better plan. Reentry assumes something more human: the user often already knows what matters, but the task feels too big, too late, too unclear, or too tied to possible failure to open.

Reentry helps at that exact moment. It turns an avoided task into a **10-minute Version Zero**: the smallest imperfect artifact that proves the user has started. When a real deadline or submission exists, Reentry then runs a **FinalMile Check** to make sure the deliverable is actually ready to submit.

**One-line pitch:**

> Reentry helps procrastinators re-enter avoided work by creating the first imperfect artifact, then getting the final mile ready before the deadline is missed.

**Hero demo moment:** A user pastes the Vibe2Ship submission brief, clicks **Create Version Zero**, and Reentry creates the required project description Google Doc, checks missing deploy/GitHub links and sharing status, then drafts the final submission text.

---

## 2. Problem Statement Alignment

### Hackathon Problem

Students, professionals, and entrepreneurs frequently miss deadlines, assignments, meetings, bills, interviews, and important commitments. Existing tools rely on reminders that are easy to ignore and rarely help users complete the work.

### Reentry's Interpretation

The main failure is not notification failure. It is **reentry failure**.

The user may know the deadline exists, but they avoid the work because:

- the next step is ambiguous
- the task feels emotionally loaded
- the ideal version feels impossible
- guilt makes opening the task harder
- no-deadline goals have no immediate consequence

Reentry moves beyond reminders by taking action:

1. Finds or accepts the avoided commitment.
2. Identifies the likely deliverable.
3. Creates a rough first artifact.
4. Proposes the next three actions.
5. Checks final submission readiness when a deadline exists.

### Evaluation Matrix Fit

| Criterion | Reentry Response |
|---|---|
| Problem Solving & Impact | Converts avoidance into a real artifact and catches final submission blockers. |
| Agentic Depth | Uses an observe -> reason -> act -> verify -> debrief workflow, not a single chatbot response. |
| Innovation & Creativity | Owns the human moment of re-entering avoided work instead of optimizing reminders. |
| Usage of Google Technologies | Gemini reasons; Cloud Run hosts; Calendar, Drive, Docs, and Gmail perform real actions. |
| Product Experience & Design | Low-shame, one-action-at-a-time UX centered on Version Zero. |
| Technical Implementation | Feasible Cloud Run web app with bounded Workspace integrations. |
| Completeness & Usability | End-to-end demo creates an artifact, audits readiness, and drafts communication. |

---

## 3. Product Philosophy

### Core Principle

**Do not tell the user to be disciplined. Lower the emotional cost of starting.**

### Design Rules

- No shame language.
- No streaks, leaderboards, guilt scores, or public accountability.
- No clinical or diagnostic claims.
- No hidden keystroke capture or covert browsing surveillance.
- AI output is framed as **Version Zero**, not a polished final answer.
- Every write action requires user approval.

---

## 4. Target Users

### Primary Persona: The High-Functioning Avoider

**Who:** Student, freelancer, founder, or knowledge worker.  
**Pain:** Capable but repeatedly delays important tasks until the deadline becomes dangerous.  
**Behavior:** Opens many tabs, rereads context, reorganizes notes, avoids the actual artifact.  
**Need:** A low-shame way to make the first real move.

### Secondary Persona: The Deadline Sprinter

**Who:** User who often finishes near the deadline but risks missing final submission details.  
**Pain:** Produces work under pressure but forgets links, permissions, formats, or required sections.  
**Need:** A final-mile safety check.

### Tertiary Persona: The No-Deadline Learner

**Who:** User trying to upskill, build a portfolio, prepare for DSA, learn AI, or improve job readiness.  
**Pain:** No deadline means no urgency, so progress remains vague.  
**Need:** A tiny visible artifact today.

---

## 5. Product Modes

### 5.1 Deadline Reentry

For assignments, hackathons, meetings, interviews, reports, bills, client work, and submissions.

**User promise:** "We will create the smallest useful version before time runs out."

Core flow:

1. User selects an upcoming deadline from Calendar or pastes a brief.
2. Reentry uses Gemini to extract requirements, deliverables, risks, and likely next actions.
3. Reentry finds relevant Google Drive files when the user grants access.
4. Reentry proposes a Version Zero artifact.
5. User approves creation.
6. Reentry creates a Google Doc, Gmail draft, checklist, or optional Slides starter.
7. Reentry runs FinalMile Check if submission is required.

### 5.2 Momentum Reentry

For goals without a hard deadline: upskilling, portfolio building, job preparation, DSA practice, writing, and personal projects.

**User promise:** "We will make visible proof of progress today."

Examples:

| Goal | Version Zero Artifact |
|---|---|
| Learn React | One tiny component spec and starter code |
| Prepare DSA | One solved problem summary and mistake log |
| Learn AI | One mini app/prompt experiment plan |
| Build portfolio | One project card draft |
| Job prep | One improved resume bullet or interview answer |

Momentum Reentry is secondary for the hackathon demo. It proves Reentry can support no-deadline procrastination without weakening the deadline-first PS1 story.

### 5.3 FinalMile Check

For submissions and deadline deliverables.

Checks:

- Required sections exist.
- Required links are present.
- Google Docs/Drive links have correct sharing.
- Attachments or exports are ready.
- GitHub/deployed app links are included when required.
- Final update email or submission text is drafted.
- Remaining blockers are explicit.

---

## 6. MVP Scope

### Must Have

These are the submission-critical features. Build them before any bonus mode or integration.

1. **Manual Deadline Brief Intake**
   - User can paste the hackathon brief, assignment prompt, email text, or task description.
   - This guarantees the demo works even if Calendar/OAuth setup is constrained.

2. **Gemini Requirement Analyzer**
   - Extracts deadline, deliverables, required sections, missing inputs, and likely artifact type.

3. **Version Zero Generator**
   - Generates a rough first artifact in one of these formats:
     - project description
     - report outline
     - email draft
     - presentation outline
     - next-action checklist

4. **Google Docs Creation**
   - Creates a Version Zero document with structured sections.

5. **FinalMile Check**
   - Audits required fields and links.
   - Flags missing or private Drive links.
   - Shows Ready, At Risk, or Blocked status.

6. **Gmail Draft**
   - Drafts final submission/update email for user approval.

7. **Reentry Debrief**
   - Shows the before/after:
     - avoided task
     - created artifact
     - remaining blockers
     - next action

8. **Google OAuth Sign-In**
   - User connects Google account.
   - App requests only the scopes needed for the demo.

9. **Calendar Deadline Selector**
   - User can select a Calendar event or paste a deadline brief.

### Should Have

1. Calendar focus block creation.
2. Drive file search for related documents.
3. Share-permission fix with explicit approval.
4. Google Slides two-slide starter for presentation deadlines.

### Not in MVP

1. Chrome extension as the primary product.
2. Keystroke capture.
3. Passive tab surveillance.
4. Gemini Nano.
5. Gemini Live voice.
6. Social accountability rooms.
7. Streaks or gamification.
8. Full autonomous writes without approval.

---

## 7. Core User Journeys

### Journey A: Hackathon Submission Rescue

1. User opens Reentry with 90 minutes left.
2. User pastes or selects the Vibe2Ship brief.
3. Reentry extracts mandatory submission requirements:
   - deployed app link
   - GitHub repo link
   - project description Google Doc
   - problem statement selected
   - solution overview
   - key features
   - technologies used
   - Google technologies utilized
4. Reentry asks: "Want a 10-minute Version Zero?"
5. User approves.
6. Reentry creates the project description doc.
7. FinalMile Check flags missing deploy/GitHub links or private docs.
8. Reentry drafts the final submission/update text.
9. Debrief shows progress from avoided task to submission-ready packet.

### Journey B: Interview Prep Reentry

1. User selects an interview event from Calendar.
2. Reentry gathers event title, description, and optionally related Gmail/Drive context.
3. Reentry creates a Version Zero prep brief:
   - company/context summary
   - likely questions
   - user's opening answer
   - questions to ask interviewer
4. Reentry creates a focus block and final checklist.

### Journey C: Upskilling Without a Deadline

1. User enters "learn React" or "prepare DSA."
2. Reentry does not create a huge learning plan first.
3. It creates today's smallest visible artifact:
   - one component plan
   - one solved problem note
   - one mini-demo outline
4. It asks the user to schedule the next 25-minute reentry block.

---

## 8. Functional Requirements

### FR1: Deadline and Goal Intake

- User can create a Reentry session from:
  - pasted brief
  - manual task/deadline form
  - selected Google Calendar event
- System stores the session with title, deadline, mode, and source.

### FR2: Requirement Extraction

- Gemini extracts:
  - deadline date/time
  - artifact type
  - required sections
  - required links/files
  - missing information
  - estimated urgency
  - recommended Version Zero type

### FR3: Version Zero Creation

- User sees a proposed artifact before creation.
- User can approve, edit prompt, or cancel.
- System creates the artifact in Google Docs or as in-app markdown.
- System labels it clearly as a rough first version.

### FR4: Workspace Context Gathering

- System can search Drive for files related to the session.
- System can read selected file metadata and content where permitted.
- System should prefer user-selected files over broad Drive search.

### FR5: FinalMile Check

- System compares requirements against current artifact state.
- System identifies missing sections, missing links, private Drive permissions, and incomplete submission text.
- System provides a readiness verdict:
  - Ready
  - At Risk
  - Blocked

### FR6: Approval-Gated Actions

- System must ask approval before:
  - creating a Google Doc
  - creating a Gmail draft
  - changing Drive permissions
  - creating Calendar events
  - creating Slides

### FR7: Debrief

- System shows:
  - what the user started with
  - what Reentry created
  - what remains
  - the next concrete action

---

## 9. Non-Functional Requirements

### Performance

- Initial requirement extraction should return within 10 seconds for pasted briefs.
- Version Zero generation should return within 20 seconds for normal project docs.
- FinalMile Check should run within 10 seconds after artifact data is available.

### Privacy

- No hidden keystroke capture.
- No passive tab surveillance in MVP.
- Google access must be explicit.
- Prefer least-privilege scopes.
- User can disconnect Google account and delete sessions.

### Reliability

- Manual brief input must work even if Google OAuth fails.
- In-app markdown artifact must work even if Docs API creation fails.
- Readiness check must distinguish missing data from failed checks.

### Usability

- The user should reach Version Zero in under three clicks after opening a session.
- The app should avoid productivity jargon and guilt language.
- UI should show one primary next action at a time.

---

## 10. Agentic Architecture

Reentry is not a single chatbot. It is an approval-gated agent workflow.

### Agent Roles

| Agent | Responsibility |
|---|---|
| Intake Agent | Parses brief/event and classifies mode |
| Requirement Agent | Extracts deliverables, constraints, and missing data |
| Reentry Agent | Chooses the smallest useful Version Zero |
| Artifact Agent | Generates Docs/Gmail/Slides/checklist outputs |
| FinalMile Agent | Audits readiness and permissions |
| Debrief Agent | Summarizes progress and next action |

### Core Agent Loop

1. Observe: deadline/goal, brief, Calendar metadata, selected files.
2. Reason: infer deliverable, urgency, blockers, smallest useful artifact.
3. Act: create draft/checklist/doc/email with user approval.
4. Verify: compare output against requirements.
5. Debrief: show progress and remaining blockers.

---

## 11. Technical Architecture

### Recommended Stack

- **Frontend:** React + Vite or Next.js
- **Backend:** Cloud Run service
- **Database:** Firestore
- **AI:** Gemini API with function calling
- **Auth:** Google OAuth
- **Google APIs:** Calendar, Drive, Docs, Gmail, optional Slides

### High-Level Flow

```text
User
  -> Reentry Web App
  -> Cloud Run API
  -> Gemini Requirement/Artifact Agents
  -> Google Workspace APIs
  -> Firestore session state
  -> Reentry Dashboard + Created Artifacts
```

### Key Backend Endpoints

| Endpoint | Purpose |
|---|---|
| `POST /api/session` | Create Reentry session from brief/event |
| `POST /api/analyze` | Run Gemini requirement extraction |
| `POST /api/version-zero` | Generate proposed artifact |
| `POST /api/docs/create` | Create approved Google Doc |
| `POST /api/finalmile/check` | Run readiness audit |
| `POST /api/gmail/draft` | Create approved Gmail draft |
| `POST /api/calendar/focus-block` | Create optional focus block |

### Data Model

#### `Session`

```json
{
  "id": "session_123",
  "userId": "user_123",
  "mode": "deadline_reentry",
  "title": "Vibe2Ship submission",
  "deadlineAt": "2026-06-29T14:00:00+05:30",
  "sourceType": "pasted_brief",
  "status": "at_risk",
  "createdAt": "2026-06-25T12:00:00+05:30"
}
```

#### `Requirement`

```json
{
  "sessionId": "session_123",
  "label": "Project Description Google Doc",
  "type": "document",
  "required": true,
  "status": "missing"
}
```

#### `Artifact`

```json
{
  "sessionId": "session_123",
  "type": "google_doc",
  "title": "Version Zero Project Description",
  "url": "https://docs.google.com/...",
  "status": "created"
}
```

#### `CheckResult`

```json
{
  "sessionId": "session_123",
  "verdict": "at_risk",
  "checks": [
    {
      "label": "GitHub repository link present",
      "status": "missing",
      "fix": "Add repository URL"
    }
  ]
}
```

---

## 12. Google Technology Usage

| Technology | Load-Bearing Use |
|---|---|
| Gemini API | Requirement extraction, action planning, artifact generation, final debrief |
| Gemini Function Calling | Lets the model request structured actions like file search, doc creation, permission check, and draft creation |
| Google Cloud Run | Hosts public deployed backend required for submission |
| Firestore | Stores sessions, requirements, artifacts, and check results |
| Google Calendar API | Reads upcoming commitments and creates focus blocks |
| Google Drive API | Searches selected files, checks metadata, and manages permissions after approval |
| Google Docs API | Creates Version Zero documents and project reports |
| Gmail API | Creates final submission or stakeholder update drafts |
| Google Slides API | Optional creation of a two-slide Version Zero for presentation deadlines |

Official feasibility notes:

- Gemini function calling supports defining application functions, letting the model call them, executing them in the app, and returning results to the model.
- Google Docs `documents.batchUpdate` can apply structured edits to Docs.
- Google Drive `permissions.create` can create file permissions after approval.
- Google Calendar `events.insert` can create Calendar focus blocks after authorization.

---

## 13. UX Requirements

### Tone

Calm, direct, and non-judgmental.

Preferred language:

- "Want a 10-minute Version Zero?"
- "This does not need to be good yet."
- "Here is the smallest useful next move."
- "Three things are still blocking submission."

Avoid:

- "You are behind."
- "You failed to start."
- "Crush your goals."
- "Your productivity score dropped."

### Interface

Primary screens:

1. Session intake
2. Requirement extraction result
3. Version Zero proposal
4. Created artifact view
5. FinalMile readiness check
6. Debrief

The interface should prioritize one primary action per screen.

---

## 14. Demo Plan

### Demo Name

**The 90-Minute Reentry**

### Scenario

The user is submitting to Vibe2Ship and has not created the required project description document.

### Live Demo Steps

1. Open Reentry.
2. Paste the Vibe2Ship submission requirements.
3. Gemini extracts mandatory submission items.
4. Reentry asks for Version Zero approval.
5. Reentry creates a Google Doc project description.
6. FinalMile Check flags missing GitHub/deploy links and document sharing status.
7. User approves a Gmail draft or submission text.
8. Debrief shows the artifact and remaining blockers.

### Judge-Facing Claim

> Reentry does not remind the user about the deadline. It creates the first artifact, checks the final-mile risks, and gives the user a concrete path to submit.

### Mandatory Project Description Coverage

The generated Google Doc must include the exact required fields from the Vibe2Ship submission guidelines:

1. Problem Statement Selected
2. Solution Overview
3. Key Features
4. Technologies Used
5. Google Technologies Utilized

---

## 15. Success Metrics

### Hackathon Demo Metrics

| Metric | Target |
|---|---:|
| Time from brief input to extracted requirements | < 10 seconds |
| Time from approval to Version Zero doc | < 20 seconds |
| Number of real Google APIs used in demo | 4+ |
| Number of approval-gated actions demonstrated | 2+ |
| Final readiness verdict shown | Yes |
| Mandatory project description fields generated | 5/5 |
| Submission blockers caught | 2+ |

### Product Metrics

| Metric | Definition |
|---|---|
| Reentry Start Rate | % of sessions where user approves Version Zero |
| Artifact Creation Rate | % of sessions that create a doc/email/checklist |
| FinalMile Completion Rate | % of deadline sessions reaching Ready or At Risk with explicit blockers |
| Next Action Follow-Through | % of sessions where user completes at least one next action |

---

## 16. Risks and Mitigations

| Risk | Mitigation |
|---|---|
| Looks like a generic AI writing app | Emphasize requirement extraction, readiness audit, and approval-gated Workspace actions |
| Too broad for hackathon | Demo only Deadline Reentry, Version Zero Doc, Gmail Draft, and FinalMile Check |
| Privacy concerns | No keystroke capture or passive surveillance in MVP |
| Weak Google OAuth setup | Keep pasted brief and in-app artifact fallback |
| AI output not polished | Explicitly position output as Version Zero |
| Too much UI complexity | One primary action per screen |
| No-deadline goals dilute PS1 | Mention Momentum Reentry as secondary, but demo deadline rescue |

---

## 17. Build Timeline

### Day 1: Foundation

- Frontend scaffold
- Cloud Run backend scaffold
- Firestore schema
- Gemini requirement extraction
- Manual brief intake

### Day 2: Artifact Creation

- Version Zero generator
- Google OAuth
- Google Docs creation
- Session dashboard

### Day 3: FinalMile

- Requirement checklist
- Drive metadata and sharing check
- Gmail draft generation
- Readiness verdict

### Day 4: Calendar and Polish

- Calendar event intake
- Optional focus block creation
- Debrief screen
- Demo data setup

### Day 5: Submission Polish

- Error handling
- README and project description
- Cloud Run deploy
- Final demo rehearsal

---

## 18. Final Scope Decision

Build **Reentry** as a Google Cloud web app.

The final hackathon build should prove one thing:

> A user who is avoiding an urgent task can go from stuck to a real Version Zero artifact and a checked final-mile path in minutes.

That is the strongest version of the idea for Problem Statement 1 because it is human, agentic, practical, and demoable.
