FROM node:19-alpine

WORKDIR /app

COPY server/package*.json ./

RUN npm install

COPY server/ ./

CMD ["npm", "run", "dev"]
