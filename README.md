
# Aegira

Aegira is my personal SIEM UI built on top of Wazuh. This repo contains the frontend foundation (dashboard layout, navbar, theme tokens) and the API integration layer used to authenticate and query Wazuh endpoints.

## Tech Stack

- React + Vite
- Tailwind CSS
- ESLint

## Getting Started

### Prerequisites

- Node.js (LTS recommended)
- A running Wazuh API endpoint (local dev expects `https://localhost:55000`)

### Install

```bash
npm install
```

### Run (Dev)

```bash
npm run dev
```

In dev, the Vite server proxies API calls to the Wazuh backend (see `vite.config.js`). This avoids CORS/certificate issues when your Wazuh API is using a local/self-signed HTTPS setup.

### Build

```bash
npm run build
```

### Lint

```bash
npm run lint
```

## Configuration

### API Base URL

The app supports a configurable API base URL via `VITE_API_URL`:

- Dev: you can usually leave this unset and rely on the dev proxy.
- Production builds / previews: set `VITE_API_URL` to your Wazuh API URL.

Example:

```bash
VITE_API_URL=https://localhost:55000 npm run build
```

## Project Structure

- `src/views/` – pages (login, dashboard/control hub)
- `src/components/` – reusable UI components (Navbar, Core primitives)
- `src/services/` – auth + token storage
- `src/hooks/` – API request hook with auth header injection
- `src/assets/` – icons and static assets used by components

## Security Notes

- Do not commit credentials or secrets to git. Local scratch notes are ignored via `.gitignore` (e.g. `notes.txt`).
