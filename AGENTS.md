# AGENTS.md

Purpose: keep contributions consistent, maintainable, and portable for the "insites" business site.

## Project Intent
- Build a modern, sleek, professional business website for "insites".
- Stack: Next.js + React + TypeScript.
- Primary pages/sections: Landing (services), Projects/Testimonials, Contact.
- Visual direction: light theme, white base with blue accents.
- Hosting: portable/self-hosted Linux with systemd; containers (Podman preferred, Docker compatible) planned.

## Working Agreements
- Keep changes small and reviewable; prefer incremental commits.
- Use pnpm for all package operations.
- Default Node.js: current LTS unless explicitly changed.
- No generated assets or lockfiles unless needed for a change.
- Avoid unnecessary dependencies; prefer standard Next.js/React patterns.

## Code Style & Quality
- Prefer TypeScript-first APIs and strict types.
- Avoid bespoke CSS resets; use scoped styles and CSS variables.
- Add comments only when logic is non-obvious.
- Keep UI components composable and minimal.

## Content & UX Guidelines
- Copy should be concise, confident, and professional.
- Services list must include: Websites, Social Media Packages, AI Training.
- Include a dedicated Contact section/page with clear CTA.
- Include a Projects/Testimonials section with placeholder data until real content is provided.

## Deployment Notes (Forward-Looking)
- Assume self-hosted Linux; document systemd service patterns.
- Plan for containerization; prioritize Podman, note Docker compatibility.
- Keep environment configuration in `.env` (not committed).

## Git Conventions
- Commit prefixes: feat, fix, chore, docs, refactor.
- Commit messages should describe user-facing or maintenance impact.
