# frontend/Dockerfile
FROM node:24-slim

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install

COPY frontend/ .

RUN yarn build

# Serve with a simple server (like serve or nginx)
RUN yarn global add serve
CMD ["serve", "-s", "dist", "-l", "3000"]