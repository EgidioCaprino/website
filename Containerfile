FROM node:24.13.0-alpine AS base

FROM base AS builder
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1
COPY . .
RUN rm -rf node_modules
RUN npm ci
RUN npm run validate
ENV NODE_ENV=production
RUN cp .env.test .env.production && npm run build && rm .env.production
RUN npm prune

FROM base AS runner
WORKDIR /app
ARG BUILD_DATE
ARG GITHUB_SHA
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV BUILD_DATE="${BUILD_DATE}"
ENV GITHUB_SHA="${GITHUB_SHA}"
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/public ./public
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/package-lock.json ./package-lock.json
USER nextjs
EXPOSE ${PORT}
ENV HOSTNAME="0.0.0.0"
CMD ["npm", "start"]
