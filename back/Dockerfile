FROM node:18-alpine as build

WORKDIR /app/
COPY ./package.json ./
COPY ./package-lock.json ./
COPY . .
RUN npm ci

CMD ["node", "index.js"]
