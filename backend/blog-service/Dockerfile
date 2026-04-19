FROM node:18 AS installer
WORKDIR /app
COPY package*.json ./

RUN npm install

FROM installer AS tester
COPY . .

FROM node:18 AS release
WORKDIR /app
COPY package*.json ./

RUN npm install --only=production

COPY --from=tester /app/src ./src
COPY --from=tester /app/server.js .

EXPOSE 5001
CMD ["node", "server.js"]
