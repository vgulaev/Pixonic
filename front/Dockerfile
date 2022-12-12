FROM node:18-alpine as build

WORKDIR /app/frontend
COPY ./package.json ./
COPY ./package-lock.json ./
COPY . .
RUN npm ci
RUN npm run build
RUN rm -rf node_modules/
RUN rm -rf src/

FROM nginx:stable-alpine
COPY --from=build /app/frontend/dist /usr/share/nginx/html
CMD ["nginx", "-g", "daemon off;"]
