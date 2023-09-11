# FROM node:18-alpine as dependencies

# WORKDIR /usr/src/app



FROM node:18-alpine as build

WORKDIR /usr/src/app

COPY package*.json .
RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine as start

WORKDIR /usr/src/app

ENV NODE_ENV=production

COPY --from=build /usr/src/app/dist .

ENV APP_PORT=8000

EXPOSE ${APP_PORT}

CMD [ "node", "index.js" ]