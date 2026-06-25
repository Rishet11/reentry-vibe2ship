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
  const [brief, setBrief] = useState(hackathonBrief);
  const [mode, setMode] = useState('deadline');
  const [stage, setStage] = useState('intake');
  const [isGenerating, setIsGenerating] = useState(false);
  const [artifact, setArtifact] = useState(null);

  const analyzed = useMemo(() => analyzeBrief(brief), [brief]);
  const checks = artifact ? completedChecks : initialChecks;
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
    setBrief(hackathonBrief);
    setStage('intake');
    setArtifact(null);
    setIsGenerating(false);
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
          <Step icon={FileText} label="Brief" active={stage === 'intake'} done={Boolean(brief.trim())} />
          <Step icon={Sparkles} label="Version Zero" active={stage === 'creating'} done={Boolean(artifact)} />
          <Step icon={ClipboardCheck} label="Submit Check" active={stage === 'debrief'} done={Boolean(artifact)} />
          <Step icon={Mail} label="Submission Draft" active={false} done={Boolean(artifact)} />
        </nav>

        <div className="sidebar-note">
          <Clock3 size={16} />
          <span>Demo target: blank brief to first artifact in under 10 minutes.</span>
        </div>
      </aside>

      <section className="workspace">
        <header className="topbar">
          <div>
            <h1>Make the first imperfect version.</h1>
            <p>Paste a deadline brief. Reentry extracts what matters, creates Version Zero, and checks what still blocks submission.</p>
          </div>
          <button className="ghost-button" onClick={resetSession}>
            <RefreshCw size={16} />
            Reset demo
          </button>
        </header>

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
                <h2>Paste deadline brief</h2>
                <p>Use the Vibe2Ship requirements or replace them with any assignment, interview, or submission prompt.</p>
              </div>
              <span className="status-chip">{mode === 'deadline' ? 'Deadline Reentry' : 'Momentum Reentry'}</span>
            </div>

            <textarea
              value={brief}
              onChange={(event) => setBrief(event.target.value)}
              spellCheck="false"
              aria-label="Deadline brief"
            />

            <div className="action-row">
              <button className="primary-button" onClick={createVersionZero} disabled={isGenerating || !brief.trim()}>
                {isGenerating ? <RefreshCw className="spin" size={17} /> : <Sparkles size={17} />}
                {isGenerating ? 'Creating Version Zero' : 'Create Version Zero'}
              </button>
              <button className="secondary-button" disabled={!artifact}>
                <Mail size={17} />
                Draft Email
              </button>
            </div>
          </section>

          <aside className="readiness-panel">
            <div className="readiness-header">
              <div>
                <span>Submission readiness</span>
                <h2>{statusLabel(verdict, checks)}</h2>
                <p>{statusHelper(verdict, checks)}</p>
              </div>
              <VerdictIcon verdict={verdict} />
            </div>

            <div className="plain-summary">
              This panel tells you, in plain English, what still has to be done before the submission is ready.
            </div>

            <div className="check-list">
              {checks.map((check) => (
                <CheckRow key={check.label} check={check} />
              ))}
            </div>

            <div className="next-action">
              <span>Next step</span>
              <strong>{artifact ? 'Add deploy and GitHub links, then make the doc public.' : 'Create Version Zero first, then we can check the submission.'}</strong>
            </div>
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
          <h2>Draft document</h2>
          <p>Rough by design. Useful enough to start editing immediately.</p>
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
          <strong>No draft yet</strong>
          <span>Reentry has detected {analyzed.fields.length} required fields. Create Version Zero to generate the first rough draft.</span>
        </div>
      )}
    </section>
  );
}

function AgentTrace({ artifact, analyzed }) {
  const trace = artifact
    ? [
        ['Observed', `${analyzed.fields.length} required fields and ${analyzed.links.length} required links found.`],
        ['Reasoned', 'A project description doc is the fastest useful first draft.'],
        ['Acted', 'Generated a structured draft with judge-required sections.'],
        ['Verified', 'Submission check found 2 blockers before submit.'],
      ]
    : [
        ['Observed', 'Brief text is ready for extraction.'],
        ['Reasoned', 'Version Zero should reduce starting friction.'],
        ['Waiting', 'Approve creation to generate the first artifact.'],
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
          <strong>Avoided task became a draft and a submission checklist.</strong>
        </div>
      )}
    </section>
  );
}

function analyzeBrief(text) {
  const fields = requiredFields.filter((field) => text.toLowerCase().includes(field.toLowerCase()));
  const links = [
    { label: 'Deployed Application Link', found: /deployed|cloud/i.test(text) },
    { label: 'GitHub Repository Link', found: /github/i.test(text) },
    { label: 'Project Description Google Doc Link', found: /google doc|project description/i.test(text) },
  ];
  return {
    title: /Vibe2Ship/i.test(text) ? 'Vibe2Ship submission' : 'Avoided deadline task',
    fields,
    links: links.filter((link) => link.found),
  };
}

function buildArtifact(analyzed, mode) {
  return {
    title: mode === 'deadline' ? 'Reentry - Vibe2Ship Draft' : 'Reentry - Momentum Draft',
    sections: [
      {
        heading: 'Problem Statement Selected',
        body: 'Problem Statement 1 - The Last-Minute Life Saver.',
      },
      {
        heading: 'Solution Overview',
        body: 'Reentry helps users re-enter avoided work by creating a 10-minute first draft and checking final submission risks before a deadline is missed.',
      },
      {
        heading: 'Key Features',
        body: 'Deadline brief intake, Gemini requirement extraction, first-draft generation, submission checks, Google Docs creation, Gmail draft support, and a debrief summary.',
      },
      {
        heading: 'Technologies Used',
        body: 'React, Cloud Run backend, Firestore session state, Google OAuth, Gemini API, and Google Workspace APIs.',
      },
      {
        heading: 'Google Technologies Utilized',
        body: 'Gemini API for reasoning and generation, Google Cloud Run for deployment, Google Docs API for artifact creation, Drive API for file and sharing checks, Gmail API for drafts, and Calendar API for deadline context.',
      },
    ].filter((section) => analyzed.fields.length === 0 || requiredFields.includes(section.heading)),
  };
}

function getVerdict(checks) {
  if (checks.some((check) => check.status === 'missing')) return checks.some((check) => check.status === 'pass') ? 'At Risk' : 'Blocked';
  if (checks.some((check) => check.status === 'review')) return 'At Risk';
  return 'Ready';
}

function statusLabel(verdict, checks) {
  const blockers = checks.filter((check) => check.status === 'missing').length;
  if (verdict === 'Ready') return 'Ready to submit';
  return `${blockers} blocker${blockers === 1 ? '' : 's'} left`;
}

function statusHelper(verdict, checks) {
  const blockers = checks.filter((check) => check.status === 'missing').length;
  if (verdict === 'Ready') return 'The required pieces are in place.';
  if (verdict === 'Blocked') return 'The app still needs a few required links before it is submit-ready.';
  return `One or more required links still need attention. ${blockers} item${blockers === 1 ? '' : 's'} are unresolved.`;
}

createRoot(document.getElementById('root')).render(<App />);
