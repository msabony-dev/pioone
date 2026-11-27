# Build from the repository root so scripts/build-guides.mjs can read
# docs/end-user next to app/webui:
#   docker build -f app/webui/Dockerfile .
FROM node:22-alpine AS build
WORKDIR /repo
COPY app/webui/package.json app/webui/package-lock.json ./app/webui/
WORKDIR /repo/app/webui
RUN npm ci
WORKDIR /repo
COPY app/webui ./app/webui
COPY docs/end-user ./docs/end-user
WORKDIR /repo/app/webui
ARG VITE_AUTH_MODE=demo
ARG VITE_KEYCLOAK_URL=
ARG VITE_KEYCLOAK_REALM=piocloud
ARG VITE_KEYCLOAK_CLIENT_ID=piocloud-client
ENV VITE_AUTH_MODE=$VITE_AUTH_MODE \
    VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL \
    VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM \
    VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID
RUN npm run test:model && npm run test:documents && npm run build

FROM nginx:1.27-alpine
COPY app/webui/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /repo/app/webui/dist /usr/share/nginx/html
EXPOSE 8080
