// PioOne web UI. Builds on the Jenkins agent and runs the container
// on that same node. Nginx on the node should proxy to HOST_PORT.
//
// Webhook payload URL (GitHub plugin):
//   https://inifniteloop.piosphere.com/github-webhook/
// Job trigger: "GitHub hook trigger for GITScm polling".
//
// VITE_* is compiled into the JS bundle. Changing Keycloak means a rebuild.
// Default auth mode is demo so the first deploy is usable without SSO.
pipeline {
    agent any

    options {
        timestamps()
        disableConcurrentBuilds()
    }

    environment {
        IMAGE_NAME = 'pioone-webui'
        CONTAINER_NAME = 'pioone-webui'
        // enterprise.piosphere.ai nginx proxies to this loopback port.
        HOST_PORT = '3523'
        CONTAINER_PORT = '8080'

        VITE_AUTH_MODE = 'demo'
        VITE_KEYCLOAK_URL = ''
        VITE_KEYCLOAK_REALM = 'pioone'
        VITE_KEYCLOAK_CLIENT_ID = 'pioone-web'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build image') {
            steps {
                script {
                    env.SHORT_COMMIT = sh(script: 'git rev-parse --short HEAD', returnStdout: true).trim()
                }
                sh '''
                    set -eu
                    docker build \
                        -f app/webui/Dockerfile \
                        -t "$IMAGE_NAME:$SHORT_COMMIT" \
                        -t "$IMAGE_NAME:latest" \
                        --build-arg "VITE_AUTH_MODE=$VITE_AUTH_MODE" \
                        --build-arg "VITE_KEYCLOAK_URL=$VITE_KEYCLOAK_URL" \
                        --build-arg "VITE_KEYCLOAK_REALM=$VITE_KEYCLOAK_REALM" \
                        --build-arg "VITE_KEYCLOAK_CLIENT_ID=$VITE_KEYCLOAK_CLIENT_ID" \
                        app/webui
                '''
            }
        }

        stage('Deploy container') {
            steps {
                sh '''
                    set -eu
                    docker rm -f "$CONTAINER_NAME" >/dev/null 2>&1 || true
                    docker run -d \
                        --name "$CONTAINER_NAME" \
                        --restart unless-stopped \
                        -p "127.0.0.1:${HOST_PORT}:${CONTAINER_PORT}" \
                        "$IMAGE_NAME:$SHORT_COMMIT"
                '''
            }
        }

        stage('Verify') {
            steps {
                sh '''
                    set -eu
                    for i in 1 2 3 4 5 6 7 8 9 10; do
                        if curl -fsS "http://127.0.0.1:${HOST_PORT}/" >/dev/null; then
                            echo "PioOne is serving on http://127.0.0.1:${HOST_PORT}"
                            docker ps --filter "name=${CONTAINER_NAME}" --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
                            exit 0
                        fi
                        sleep 1
                    done
                    echo "Container did not answer on 127.0.0.1:${HOST_PORT}"
                    docker logs "$CONTAINER_NAME" || true
                    exit 1
                '''
            }
        }
    }
}
