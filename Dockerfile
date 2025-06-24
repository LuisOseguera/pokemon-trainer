FROM node:24-alpine3 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

FROM nginx:alpine

COPY --from=builder /app/dist/pokemon-trainer /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]