FROM node:erbium-alpine

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm ci --silent

COPY . .

EXPOSE 8080

CMD [ "node", "server.js" ]