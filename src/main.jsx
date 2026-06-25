import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import {
  AlertTriangle,
  ArrowRight,
  CalendarClock,
  Check,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  FileText,
  Mail,
  Plus,
  RefreshCw,
  Search,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './styles.css';

const hackathonBrief = `Vibe2Ship submission requirements:

Problem Statement Selected
Solution Overview
Key Features
Technologies Used
Google Technologies Utilized

Mandatory links:
- Deployed Application Link on Google Cloud
- GitHub Repository Link
- Project Description Google Doc Link

Submission deadline: 29 June 2026, 2:00 PM.`;

const examples = {
  dsa: 'I have a coding interview in 14 days. I keep avoiding DSA because I feel behind. I need to start with arrays and two pointers.',
  ml: 'I want to learn machine learning but I keep watching tutorials without building anything. I need a tiny first project I can finish today.',
  interview: 'I have a job interview on Friday. I am avoiding preparation because I do not know what to study first.',
  hackathon: hackathonBrief,
};

const requiredFields = [
  'Problem Statement Selected',
  'Solution Overview',
  'Key Features',
  'Technologies Used',
  'Google Technologies Utilized',
];

const initialChecks = [
  { label: 'Draft document', status: 'missing', evidence: 'Not created yet' },
  { label: 'GitHub link', status: 'missing', evidence: 'Required by Vibe2Ship' },
  { label: 'Deployed app link', status: 'missing', evidence: 'Must be public on Google Cloud' },
  { label: 'Doc sharing', status: 'review', evidence: 'Check public access before submit' },
];

const completedChecks = [
  { label: 'Draft document', status: 'pass', evidence: 'Version Zero doc generated' },
  { label: 'GitHub link', status: 'missing', evidence: 'Paste repo URL before final submit' },
  { label: 'Deployed app link', status: 'missing', evidence: 'Cloud Run URL not added yet' },
  { label: 'Doc sharing', status: 'review', evidence: 'Set access to anyone with link' },
];

function App() {
  const [brief, setBrief] = useState('');
  const [mode, setMode] = useState('deadline');
  const [view, setView] = useState('start');
  const [stage, setStage] = useState('intake');
  const [isGenerating, setIsGenerating] = useState(false);
  const [artifact, setArtifact] = useState(null);

  const analyzed = useMemo(() => analyzeBrief(brief), [brief]);
  const checks = finishChecksFor(analyzed.kind, Boolean(artifact));
  const verdict = getVerdict(checks);

  const createVersionZero = () => {
    setIsGenerating(true);
    setStage('creating');
    window.setTimeout(() => {
      setArtifact(buildArtifact(analyzed, mode));
      setStage('debrief');
      setIsGenerating(false);
    }, 650);
  };

  const resetSession = () => {
    setBrief('');
    setView('start');
    setStage('intake');
    setArtifact(null);
    setIsGenerating(false);
  };

  const loadExample = (type) => {
    setBrief(examples[type]);
    setMode(type === 'dsa' || type === 'interview' || type === 'hackathon' ? 'deadline' : 'momentum');
    setArtifact(null);
    setStage('intake');
    setView('start');
  };

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-mark">R</div>
          <div>
            <strong>Reentry</strong>
            <span>avoided work rescue</span>
          </div>
        </div>

        <nav className="step-list" aria-label="Session steps">
          <Step icon={FileText} label="Task" active={stage === 'intake'} done={Boolean(brief.trim())} />
          <Step icon={Sparkles} label="First move" active={stage === 'creating'} done={Boolean(artifact)} />
          <Step icon={ClipboardCheck} label="Sprint" active={stage === 'debrief'} done={Boolean(artifact)} />
          <Step icon={Mail} label="Finish" active={false} done={Boolean(artifact)} />
        </nav>

        <div className="sidebar-note">
          <Clock3 size={16} />
          <span>Demo target: blank brief to first artifact in under 10 minutes.</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>Start the thing you keep avoiding.</h1>
            <p>Tell Reentry what you are stuck on. It turns the next 10 minutes into a specific action, not another plan.</p>
          </div>
          <button className="ghost-button" onClick={resetSession}>
            <RefreshCw size={16} />
            Reset demo
          </button>
        </header>

        <section className="view-row" aria-label="View selector">
          <button className={view === 'start' ? 'mode active' : 'mode'} onClick={() => setView('start')}>
            <Sparkles size={16} />
            Start
          </button>
          <button className={view === 'finish' ? 'mode active' : 'mode'} onClick={() => setView('finish')}>
            <ClipboardCheck size={16} />
            Finish
          </button>
        </section>

        <section className="mode-row" aria-label="Mode selector">
          <button className={mode === 'deadline' ? 'mode active' : 'mode'} onClick={() => setMode('deadline')}>
            <CalendarClock size={16} />
            Deadline
          </button>
          <button className={mode === 'momentum' ? 'mode active' : 'mode'} onClick={() => setMode('momentum')}>
            <Plus size={16} />
            Momentum
          </button>
        </section>

        <div className="content-grid">
          <section className="primary-panel">
            <div className="panel-heading">
              <div>
                <h2>Describe what you are stuck on</h2>
                <p>Use your own words. Interview prep, DSA, ML, assignments, and hackathon submissions should each produce a different first move.</p>
              </div>
              <span className="status-chip">{mode === 'deadline' ? 'Deadline Reentry' : 'Momentum Reentry'}</span>
            </div>

            <div className="example-row">
              <span>Examples</span>
              <button className="example-button" onClick={() => loadExample('dsa')}>DSA interview</button>
              <button className="example-button" onClick={() => loadExample('ml')}>Learn ML</button>
              <button className="example-button" onClick={() => loadExample('interview')}>Job interview</button>
              <button className="example-button" onClick={() => loadExample('hackathon')}>Hackathon</button>
            </div>

            <textarea
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              spellCheck="false"
              aria-label="Deadline brief"
              placeholder="Example: I have a coding interview in 2 weeks and I keep avoiding DSA..."
            />

            <div className="action-row">
              <button className="primary-button" onClick={createVersionZero} disabled={isGenerating || !brief.trim()}>
                {isGenerating ? <RefreshCw className="spin" size={17} /> : <Sparkles size={17} />}
                {isGenerating ? 'Creating first move' : 'Create first move'}
              </button>
              <button className="secondary-button" disabled={!artifact}>
                <Mail size={17} />
                Finish Check
              </button>
            </div>
          </section>

          <aside className="readiness-panel">
            {view === 'start' ? (
              <>
                <div className="readiness-header">
                  <div>
                    <span>What Reentry does</span>
                    <h2>Make the next 10 minutes obvious.</h2>
                    <p>Start here if the goal feels too big. Reentry picks one useful action and one proof that you actually began.</p>
                  </div>
                  <CheckCircle2 className="verdict ready" size={30} />
                </div>

                <div className="plain-summary">
                  For a DSA user, this means one target problem. For ML, one tiny experiment. For interviews, one practice answer.
                </div>

                <div className="check-list">
                  <FeatureRow title="10-minute start" body="The smallest useful action you can do now." />
                  <FeatureRow title="Proof of progress" body="A visible output: answer, code, notes, or checklist." />
                  <FeatureRow title="Finish view" body="What remains before the task is actually done." />
                </div>

                <div className="next-action">
                  <span>Optional finish check</span>
                  <strong>Switch to Finish when you want to check what is still missing.</strong>
                </div>
              </>
            ) : (
              <>
                <div className="readiness-header">
                  <div>
                    <span>Submission readiness</span>
                    <h2>{statusLabel(verdict, checks)}</h2>
                    <p>{statusHelper(verdict, checks)}</p>
                  </div>
                  <VerdictIcon verdict={verdict} />
                </div>

                <div className="plain-summary">
                  This panel tells you what still has to happen before this task counts as done for today.
                </div>

                <div className="check-list">
                  {checks.map((check) => (
                    <CheckRow key={check.label} check={check} />
                  ))}
                </div>

                <div className="next-action">
                  <span>Next step</span>
                  <strong>{artifact ? nextStepFor(analyzed.kind) : 'Create the first move first, then check what remains.'}</strong>
                </div>
              </>
            )}
          </aside>
        </div>

        <section className="lower-grid">
          <ArtifactPreview artifact={artifact} analyzed={analyzed} />
          <AgentTrace artifact={artifact} analyzed={analyzed} />
        </section>
      </section>
    </main>
  );
}

function Step({ icon: Icon, label, active, done }) {
  return (
    <div className={active ? 'step active' : 'step'}>
      <div className={done ? 'step-icon done' : 'step-icon'}>
        {done ? <Check size={15} /> : <Icon size={15} />}
      </div>
      <span>{label}</span>
    </div>
  );
}

function CheckRow({ check }) {
  const Icon = check.status === 'pass' ? CheckCircle2 : check.status === 'missing' ? AlertTriangle : ShieldCheck;
  return (
    <div className={`check-row ${check.status}`}>
      <Icon size={17} />
      <div>
        <strong>{check.label}</strong>
        <span>{check.evidence}</span>
      </div>
    </div>
  );
}

function FeatureRow({ title, body }) {
  return (
    <div className="feature-row">
      <div className="feature-bullet" aria-hidden="true" />
      <div>
        <strong>{title}</strong>
        <span>{body}</span>
      </div>
    </div>
  );
}

function VerdictIcon({ verdict }) {
  if (verdict === 'Ready') return <CheckCircle2 className="verdict ready" size={30} />;
  if (verdict === 'Blocked') return <AlertTriangle className="verdict blocked" size={30} />;
  return <AlertTriangle className="verdict risk" size={30} />;
}

function ArtifactPreview({ artifact, analyzed }) {
  return (
    <section className="artifact-panel">
      <div className="panel-heading compact">
        <div>
          <h2>{artifact ? artifact.panelTitle : 'Your first move'}</h2>
          <p>{artifact ? artifact.panelSubtitle : 'Reentry will create a small action that proves you started.'}</p>
        </div>
        <FileText size={20} />
      </div>

      {artifact ? (
        <article className="doc-preview">
          <h3>{artifact.title}</h3>
          {artifact.sections.map((section) => (
            <section key={section.heading}>
              <h4>{section.heading}</h4>
              <p>{section.body}</p>
            </section>
          ))}
        </article>
      ) : (
        <div className="empty-state">
          <Search size={24} />
          <strong>No first move yet</strong>
          <span>Describe the stuck task or load an example. Reentry will turn it into a 10-minute start.</span>
        </div>
      )}
    </section>
  );
}

function AgentTrace({ artifact, analyzed }) {
  const trace = artifact
    ? [
        ['Observed', analyzed.observation],
        ['Reasoned', analyzed.reasoning],
        ['Acted', `Created a ${artifact.outputType}.`],
        ['Verified', artifact.finishCheck],
      ]
    : [
        ['Observed', 'Waiting for a task, goal, or deadline.'],
        ['Reasoned', 'The first move should be smaller than the whole goal.'],
        ['Waiting', 'Create the first move when you are ready.'],
      ];

  return (
    <section className="trace-panel">
      <div className="panel-heading compact">
        <div>
          <h2>Agent loop</h2>
          <p>Not a reminder. A bounded workflow that observes, acts, and verifies.</p>
        </div>
        <ArrowRight size={20} />
      </div>

      <div className="trace-list">
        {trace.map(([label, body], index) => (
          <div className="trace-item" key={label}>
            <span>{String(index + 1).padStart(2, '0')}</span>
            <div>
              <strong>{label}</strong>
              <p>{body}</p>
            </div>
          </div>
        ))}
      </div>

      {artifact && (
        <div className="debrief">
          <span>What changed</span>
          <strong>{artifact.debrief}</strong>
        </div>
      )}
    </section>
  );
}

function analyzeBrief(text) {
  const lower = text.toLowerCase();
  const kind = detectKind(lower);
  const fields = requiredFields.filter((field) => text.toLowerCase().includes(field.toLowerCase()));
  const links = [
    { label: 'Deployed Application Link', found: /deployed|cloud/i.test(text) },
    { label: 'GitHub Repository Link', found: /github/i.test(text) },
    { label: 'Project Description Google Doc Link', found: /google doc|project description/i.test(text) },
  ];
  const scenario = scenarioFor(kind);
  return {
    kind,
    title: scenario.title,
    observation: scenario.observation,
    reasoning: scenario.reasoning,
    fields,
    links: links.filter((link) => link.found),
  };
}

function buildArtifact(analyzed, mode) {
  return scenarioFor(analyzed.kind).artifact;
}

function detectKind(lower) {
  if (/vibe2ship|hackathon|github|deployed|submission/.test(lower)) return 'submission';
  if (/dsa|leetcode|algorithm|two pointer|coding interview|arrays/.test(lower)) return 'dsa';
  if (/machine learning|\bml\b|model|dataset|notebook|tutorial/.test(lower)) return 'ml';
  if (/interview|job|hiring|company|recruiter/.test(lower)) return 'interview';
  return 'general';
}

function scenarioFor(kind) {
  const scenarios = {
    dsa: {
      title: 'DSA interview prep',
      observation: 'A coding interview goal with arrays and two pointers.',
      reasoning: 'The fastest useful start is one concrete problem, not a full roadmap.',
      artifact: {
        title: 'DSA Reentry Sprint',
        panelTitle: '10-minute DSA start',
        panelSubtitle: 'A tiny practice sprint that gets you out of avoidance.',
        outputType: 'DSA practice card',
        finishCheck: 'One problem, one dry run, and one mistake note are enough for today.',
        debrief: 'Avoided DSA became one problem, one dry run, and one practice note.',
        sections: [
          { heading: 'Target problem', body: 'Solve Valid Palindrome or another easy two-pointer problem. Do not open a full roadmap first.' },
          { heading: 'First 10 minutes', body: 'Write the brute force idea, list edge cases, then do one dry run by hand before coding.' },
          { heading: 'Proof of progress', body: 'A submitted solution or a screenshot of the dry run plus one mistake note.' },
          { heading: 'Next session', body: 'Repeat with Two Sum II or Merge Sorted Array for 25 minutes.' },
        ],
      },
    },
    ml: {
      title: 'Machine learning upskilling',
      observation: 'A learning goal with high ambiguity and no hard deadline.',
      reasoning: 'The fastest useful start is a tiny experiment, not another tutorial queue.',
      artifact: {
        title: 'ML Reentry Sprint',
        panelTitle: 'Tiny ML experiment',
        panelSubtitle: 'A small buildable experiment instead of passive tutorial watching.',
        outputType: 'ML experiment card',
        finishCheck: 'A dataset, a baseline model, and one metric make the session real.',
        debrief: 'Avoided ML became a tiny experiment with a measurable output.',
        sections: [
          { heading: 'Today build', body: 'Train a baseline classifier on Iris or Titanic. Use one notebook or one script.' },
          { heading: 'First 10 minutes', body: 'Load the dataset, print the first five rows, and write the target metric before choosing a model.' },
          { heading: 'Proof of progress', body: 'A notebook cell showing dataset shape, baseline accuracy, and one sentence about what failed.' },
          { heading: 'Next session', body: 'Improve only one thing: preprocessing, model choice, or evaluation split.' },
        ],
      },
    },
    interview: {
      title: 'Job interview preparation',
      observation: 'An upcoming interview with unclear preparation priorities.',
      reasoning: 'The fastest useful start is one practiced answer and one company-specific question.',
      artifact: {
        title: 'Interview Reentry Sprint',
        panelTitle: 'Interview prep drill',
        panelSubtitle: 'One practiced answer beats a vague plan to prepare later.',
        outputType: 'interview drill',
        finishCheck: 'One answer, one project story, and one interviewer question are enough to start.',
        debrief: 'Avoided interview prep became one answer, one story, and one question.',
        sections: [
          { heading: 'Practice answer', body: 'Draft a 60-second answer to: Tell me about yourself and why this role.' },
          { heading: 'First 10 minutes', body: 'Write three bullets: current skill, strongest project, why this company or role.' },
          { heading: 'Proof of progress', body: 'Record or read the answer once. Keep the messy first version.' },
          { heading: 'Next session', body: 'Prepare one project deep dive using problem, action, result, tradeoff.' },
        ],
      },
    },
    submission: {
      title: 'Hackathon submission',
      observation: 'A deadline submission with required links and project description fields.',
      reasoning: 'The fastest useful start is the required project description plus missing-link check.',
      artifact: {
        title: 'Vibe2Ship Submission Sprint',
        panelTitle: 'Submission first draft',
        panelSubtitle: 'A rough submission packet for the hackathon deadline.',
        outputType: 'submission draft',
        finishCheck: 'Submission check found missing deploy and GitHub links.',
        debrief: 'Avoided submission became a project description and missing-link checklist.',
        sections: [
          { heading: 'Problem Statement Selected', body: 'Problem Statement 1 - The Last-Minute Life Saver.' },
          { heading: 'Solution Overview', body: 'Reentry helps users restart avoided work by creating a concrete first move and showing what remains.' },
          { heading: 'Key Features', body: 'Task intake, first-move generation, scenario-specific sprint, finish check, and debrief.' },
          { heading: 'Google Technologies Utilized', body: 'Planned: Gemini API, Cloud Run, Google Docs, Drive, Gmail, and Calendar APIs.' },
        ],
      },
    },
    general: {
      title: 'Avoided task',
      observation: 'A vague task that needs to become smaller before it can start.',
      reasoning: 'The fastest useful start is one visible output in 10 minutes.',
      artifact: {
        title: 'General Reentry Sprint',
        panelTitle: '10-minute start',
        panelSubtitle: 'A small action that proves the task is no longer untouched.',
        outputType: 'action card',
        finishCheck: 'One output and one next step are enough for the first session.',
        debrief: 'Avoided task became one small output and a next step.',
        sections: [
          { heading: 'Smallest useful action', body: 'Open the work surface and create a rough outline, answer, note, or checklist.' },
          { heading: 'First 10 minutes', body: 'Do not organize everything. Produce one messy artifact.' },
          { heading: 'Proof of progress', body: 'A visible file, note, answer, draft, or screenshot.' },
          { heading: 'Next session', body: 'Schedule one 25-minute block to improve the rough version.' },
        ],
      },
    },
  };

  return scenarios[kind] || scenarios.general;
}

function getVerdict(checks) {
  if (checks.some((check) => check.status === 'missing')) return checks.some((check) => check.status === 'pass') ? 'At Risk' : 'Blocked';
  if (checks.some((check) => check.status === 'review')) return 'At Risk';
  return 'Ready';
}

function finishChecksFor(kind, hasArtifact) {
  if (kind === 'submission') return hasArtifact ? completedChecks : initialChecks;

  const checkSets = {
    dsa: [
      { label: 'Target problem', status: hasArtifact ? 'pass' : 'missing', evidence: hasArtifact ? 'Picked a two-pointer starter' : 'Pick one problem first' },
      { label: 'Dry run', status: 'review', evidence: 'Do one example by hand before coding' },
      { label: 'Mistake note', status: 'review', evidence: 'Write one thing you forgot or misunderstood' },
    ],
    ml: [
      { label: 'Tiny dataset', status: hasArtifact ? 'pass' : 'missing', evidence: hasArtifact ? 'Use Iris or Titanic' : 'Pick one dataset first' },
      { label: 'Baseline metric', status: 'review', evidence: 'Track one metric before tuning' },
      { label: 'Notebook output', status: 'review', evidence: 'Save one visible result cell' },
    ],
    interview: [
      { label: '60-second answer', status: hasArtifact ? 'pass' : 'missing', evidence: hasArtifact ? 'Draft created' : 'Create one answer first' },
      { label: 'Project story', status: 'review', evidence: 'Prepare one project deep dive' },
      { label: 'Question to ask', status: 'review', evidence: 'Write one role-specific question' },
    ],
    general: [
      { label: 'First output', status: hasArtifact ? 'pass' : 'missing', evidence: hasArtifact ? 'First move created' : 'Create one visible output first' },
      { label: 'Next block', status: 'review', evidence: 'Schedule one 25-minute follow-up' },
      { label: 'Definition of done', status: 'review', evidence: 'Decide what counts as enough for today' },
    ],
  };

  return checkSets[kind] || checkSets.general;
}

function nextStepFor(kind) {
  const nextSteps = {
    dsa: 'Do the dry run by hand, then code only that one problem.',
    ml: 'Open a notebook, load one dataset, and print the first five rows.',
    interview: 'Say the 60-second answer out loud once, even if it is rough.',
    submission: 'Add deploy and GitHub links, then make the doc public.',
    general: 'Do the visible first output, then schedule one follow-up block.',
  };

  return nextSteps[kind] || nextSteps.general;
}

function statusLabel(verdict, checks) {
  const blockers = checks.filter((check) => check.status === 'missing').length;
  if (verdict === 'Ready') return 'Ready to submit';
  return `${blockers} blocker${blockers === 1 ? '' : 's'} left`;
}

function statusHelper(verdict, checks) {
  const blockers = checks.filter((check) => check.status === 'missing').length;
  if (verdict === 'Ready') return 'The required pieces are in place.';
  if (verdict === 'Blocked') return 'Create the first move before checking what remains.';
  return `${blockers} required item${blockers === 1 ? '' : 's'} still need attention before this is done.`;
}

createRoot(document.getElementById('root')).render(<App />);
