# Bayes Impact Connect x PrendreSoin

Bayes Impact is a technology nonprofit organization building AI recommendation systems for the public interest.
As part of this work, we curate public and community resource datasets and make them usable by AI agents.
This project connects jobseekers with resources from Prendre Soin, a workforce development platform built by France Travail, dedicated to the healthcare and social work fields.

## Components

* **Prendre Soin resources:** Data and assets dedicated to healthcare and social work professions.
* **Conversational engine:** AI-driven recommendation workflow for career guidance.
* **Sample implementation:** Reference frontend for deploying the interface.

## Technical roadmap

* [ ] Clean CORS for production.
* [ ] Force iframe source.
* [x] Implement auto-scroll.

## Installation

```bash
git clone [https://github.com/bayesimpact/connect-prendresoin.git](https://github.com/bayesimpact/connect-prendresoin.git)
cd connect-prendresoin
npm install
npm run dev
```

## Configuration

The frontend talks to an agent of the Bayes Impact platform through its public chat API. Set these variables in `apps/web/.env`:

| Variable | Value |
|---|---|
| `VITE_API_URL` | Base URL of the platform instance, without `/public` |
| `VITE_EMBED_TOKEN` | Embed token of the agent (agent editor, **Embed** tab) |

## Licensing

Licensed under the MIT License. We welcome reuse by any organization.
