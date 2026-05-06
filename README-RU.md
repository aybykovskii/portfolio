# Portfolio — Алексей Быковский

Персональный сайт-портфолио Senior Frontend Engineer. Построен на Astro (SSR), React 19, Tailwind CSS v4 и поддерживает три языка — английский, русский и испанский.

> Также доступно на [английском](./README.md)

---

## Стек технологий

| Слой              | Технология                                                                     |
| ----------------- | ------------------------------------------------------------------------------ |
| Фреймворк         | [Astro 6](https://astro.build) (SSR, Node-адаптер)                             |
| UI-библиотека     | [React 19](https://react.dev)                                                  |
| Стили             | [Tailwind CSS v4](https://tailwindcss.com) + [DaisyUI v5](https://daisyui.com) |
| Анимации          | [Motion](https://motion.dev)                                                   |
| Иконки            | [Lucide React](https://lucide.dev)                                             |
| Электронная почта | [Resend](https://resend.com)                                                   |
| Монорепо          | pnpm workspaces                                                                |
| Форматирование    | [dprint](https://dprint.dev)                                                   |
| Линтинг           | ESLint                                                                         |
| Контейнеризация   | Docker (многоэтапная сборка, Bun runtime)                                      |
| CI/CD             | GitHub Actions → Dokploy                                                       |

## Структура проекта

```
portfolio/
├── apps/
│   └── web/               # Astro-приложение
│       └── src/
│           ├── collections/   # Контент (биография, проекты, опыт, …)
│           ├── components/    # UI-компоненты (Astro + React)
│           ├── containers/    # Секции страниц
│           ├── layouts/       # Макеты страниц
│           ├── pages/         # Файловая маршрутизация
│           │   └── [lang]/    # i18n-роуты (/en, /ru, /es)
│           ├── types/         # TypeScript-типы
│           └── utils/         # Вспомогательные утилиты
├── Dockerfile
├── .github/workflows/deploy.yml
├── package.json           # Корневой workspace
└── pnpm-workspace.yaml
```