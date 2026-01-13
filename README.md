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

## Site Structure (Planned)
- **Landing**: overview + services
  - Services: Websites, Social Media Packages, AI Training
- **Projects/Testimonials**: showcase past work and feedback
- **Contact**: direct CTA + contact form/info

## Getting Started (Planned)
> Project scaffolding will be added once the initial setup begins.

Expected local workflow:
```bash
pnpm install
pnpm dev
```

## Deployment (Planned)
Target: self-hosted Linux server with systemd. Containerization is expected later.

- **Systemd**: keep service files and environment configuration minimal and portable.
- **Containers**: Podman preferred, Docker compatible. Images and unit files will be added when the app is scaffolded.

## Contributing
- Follow `AGENTS.md` for workflow and conventions.
- Keep commits small and use semantic prefixes (feat, fix, chore, docs, refactor).

## Next Steps
- Scaffold Next.js + TypeScript app with pnpm.
- Define UI system (typography, spacing, color tokens).
- Add initial content and components for services, testimonials, and contact.
