# Reentry

Reentry is a Vibe2Ship Problem Statement 1 MVP: an AI productivity companion for avoided work.

The demo flow shows how a user can paste a deadline brief, create a 10-minute **Version Zero** artifact, run a **FinalMile Check**, and see a concrete debrief before missing a deadline.

## What Is Built

- React + Vite web app
- Judge-demo flow for Vibe2Ship submission rescue
- Editable deadline brief
- Version Zero project description generator
- FinalMile readiness panel
- Agent loop and debrief UI
- Responsive desktop/mobile layout
- Production build
- Cloud Run-ready Dockerfile

## Local Development

```bash
npm install
npm run dev
```

The current dev server may choose a free port automatically. In this workspace it is running at:

```text
http://localhost:5175/
```

## Production Build

```bash
npm run build
PORT=8080 node server.js
```

## Cloud Run Container

```bash
docker build -t reentry .
docker run --rm -p 8080:8080 reentry
```

Then open:

```text
http://localhost:8080/
```

## Planned API Integration

The current MVP is a front-end demo simulation. The next implementation step is wiring the same flow to:

- Gemini API for requirement extraction and artifact generation
- Google Docs API for real Version Zero document creation
- Drive API for link and permission checks
- Gmail API for draft creation
- Calendar API for deadline selection and focus block creation
- Cloud Run for public deployment

