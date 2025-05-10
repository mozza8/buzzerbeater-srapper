# frontend/Dockerfile
FROM node:20

WORKDIR /app

COPY frontend/package.json frontend/yarn.lock ./
RUN yarn install

COPY frontend/ .

RUN yarn build

EXPOSE 3000

# Serve with a simple server (like serve or nginx)
RUN yarn global add serve
CMD ["serve", "-s", "dist", "-l", "3000"]