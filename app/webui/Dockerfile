# PioOne web UI. VITE_* values are baked in at image build time.
FROM node:22-alpine AS build
WORKDIR /src
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG VITE_AUTH_MODE=demo
ARG VITE_KEYCLOAK_URL=
ARG VITE_KEYCLOAK_REALM=pioone
ARG VITE_KEYCLOAK_CLIENT_ID=pioone-web
ENV VITE_AUTH_MODE=$VITE_AUTH_MODE \
    VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL \
    VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM \
    VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID
RUN npm run test:model && npm run test:documents && npm run build

FROM nginx:1.27-alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /src/dist /usr/share/nginx/html
EXPOSE 8080
