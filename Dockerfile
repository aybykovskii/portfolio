FROM oven/bun:1-alpine AS base
RUN bun add --global pnpm

# ── deps ──────────────────────────────────────────────────────────────────────
FROM base AS deps
WORKDIR /app

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install --frozen-lockfile

# ── build ─────────────────────────────────────────────────────────────────────
FROM deps AS builder
WORKDIR /app

ARG SITE_URL
ENV SITE_URL=$SITE_URL

COPY . .

RUN pnpm --filter @portfolio/web build

# ── runtime ───────────────────────────────────────────────────────────────────
FROM base AS runtime
WORKDIR /app

COPY --from=builder /app/apps/web/dist ./apps/web/dist
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json ./apps/web/package.json

RUN pnpm install --prod --frozen-lockfile

ENV HOST=0.0.0.0
ENV PORT=4333

EXPOSE 4333

CMD ["bun", "apps/web/dist/server/entry.mjs"]
