# insites

Business website for **insites**, focused on modern, sleek UI/UX and a professional presentation of services and past work.

## Goals
- Present insites as a premium digital partner.
- Highlight services and successful projects.
- Make contact fast and frictionless.
- Keep the stack maintainable and deployment portable.

## Tech Stack
- Next.js (React) + TypeScript
- Styling: CSS modules or scoped styles with CSS variables
- Package manager: pnpm
- Node.js: current LTS

## Site Structure
- **Landing**: overview + services
  - Services: Websites, Social Media Packages, AI Training
- **Projects/Testimonials**: showcase past work and feedback
- **Contact**: direct CTA + contact form/info

## Getting Started
```bash
pnpm install
pnpm dev
```

Other useful scripts:
```bash
pnpm lint
pnpm typecheck
pnpm build
pnpm start
```

## Deployment

Self-hosted Linux server with systemd. `scripts/deploy` handles the full pipeline.

### Quick deploy

```bash
scripts/deploy --host example.com --path /srv/insites --service insites.service
```

Run `scripts/deploy --help` for all flags and env-var overrides.

### What the script does

1. Dry-run preview of rsync changes
2. Syncs source to the remote path (excludes `.git`, `node_modules`, `.next`, `.env*`)
3. `pnpm install --frozen-lockfile` on the remote
4. `pnpm build` on the remote
5. Restarts the named systemd service

### Server requirements

- SSH access from the deploying machine
- `rsync` and `pnpm` available on the remote
- Node.js current LTS on the remote
- A systemd service unit running `pnpm start` from the deploy path

### Environment variables

| Variable | Required | Default | Notes |
|---|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes (prod) | `http://localhost:3000` | Canonical URL for metadata and OpenGraph |

Set in `.env.local` at the deploy path on the server, or via `Environment=` in the systemd unit. Never committed.

### Logs

Contact form submissions are appended to `logs/contact-submissions.jsonl` relative to the working directory. The directory is created automatically on first submission. `logs/` is git-ignored.

### Containerisation (planned)

Podman preferred, Docker compatible. Images and unit files will be added in a future commit.

## Licensing
- **Code and structure**: GPL-3.0 (see `LICENSE`).
- **Assets and content**: proprietary (see `LICENSE-ASSETS`).

## Contributing
- Follow `AGENTS.md` for workflow and conventions.
- Keep commits small and use semantic prefixes (feat, fix, chore, docs, refactor).
