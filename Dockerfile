# build environment
FROM node:12-alpine as build
LABEL maintainer="build@lecturegoggles.io"
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY package*.json /app/
RUN npm install
COPY . /app
RUN npm run build

# production environment
FROM nginx:mainline-alpine

RUN rm -rf /usr/share/nginx/html/*
COPY --from=build /app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf
COPY conf/nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]