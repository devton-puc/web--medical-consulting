FROM node:16-alpine AS build

WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY . .

RUN npm run build

FROM nginx:stable-alpine as final

RUN apk add --no-cache curl

COPY --from=build /app/build /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 5000

CMD ["nginx", "-g", "daemon off;"]