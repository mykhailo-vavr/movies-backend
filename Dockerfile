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
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/.env .

ENV APP_PORT=8000

EXPOSE ${APP_PORT}

CMD [ "node", "index.js" ]