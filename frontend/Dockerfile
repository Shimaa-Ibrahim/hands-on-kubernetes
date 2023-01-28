From node:14-alpine as builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM nginx:stable-alpine
WORKDIR /usr/share/nginx/html
RUN rm -rf ./*
COPY --from=builder /app/build .
COPY nginx.conf /etc/nginx/conf.d/default.conf
