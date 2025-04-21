FROM node:20-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build_server
WORKDIR /usr/src
COPY . .                                
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm --filter=server install --no-frozen-lockfile
RUN pnpm --filter server run -r build
RUN pnpm --filter server deploy --prod --legacy /prod/server

FROM base AS production_server
ENV NODE_ENV=production
WORKDIR /prod/server
COPY --from=build_server /prod/server /prod/server
RUN pnpm install --prod --no-frozen-lockfile
EXPOSE ${PORT} 4000
CMD [ "pnpm", "start:prod" ]