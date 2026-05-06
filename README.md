# Portfolio — Aleksei Bykovskii

Personal portfolio website for a Senior Frontend Engineer. Built with Astro (SSR), React 19, Tailwind CSS v4, and supports three languages — English, Russian, and Spanish.

> Also available in [Russian](./README-RU.md)

---

## Tech Stack

| Layer            | Technology                                                                     |
| ---------------- | ------------------------------------------------------------------------------ |
| Framework        | [Astro 6](https://astro.build) (SSR, Node adapter)                             |
| UI library       | [React 19](https://react.dev)                                                  |
| Styling          | [Tailwind CSS v4](https://tailwindcss.com) + [DaisyUI v5](https://daisyui.com) |
| Animations       | [Motion](https://motion.dev)                                                   |
| Icons            | [Lucide React](https://lucide.dev)                                             |
| Email            | [Resend](https://resend.com)                                                   |
| Monorepo         | pnpm workspaces                                                                |
| Formatting       | [dprint](https://dprint.dev)                                                   |
| Linting          | ESLint                                                                         |
| Containerization | Docker (multi-stage, Bun runtime)                                              |
| CI/CD            | GitHub Actions → Dokploy                                                       |

## Project Structure

```
portfolio/
├── apps/
│   └── web/               # Astro application
│       └── src/
│           ├── collections/   # Content data (bio, projects, experience, …)
│           ├── components/    # UI components (Astro + React)
│           ├── containers/    # Page sections
│           ├── layouts/       # Page layouts
│           ├── pages/         # File-based routes
│           │   └── [lang]/    # i18n routes (/en, /ru, /es)
│           ├── types/         # TypeScript types
│           └── utils/         # Helpers and utilities
├── Dockerfile
├── .github/workflows/deploy.yml
├── package.json           # Root workspace
└── pnpm-workspace.yaml
```
