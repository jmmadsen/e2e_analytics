# build
FROM node:alpine as build

WORKDIR /usr/src/app/

COPY package*.json ./

RUN npm ci --silent

COPY . .

RUN npm run build

# production
FROM nginx:stable-alpine

COPY --from=build /usr/src/app/build /usr/share/nginx/html

RUN rm /etc/nginx/conf.d/default.conf

# without below command, icon won't appear in tab
RUN chmod +r /usr/share/nginx/html/favicon.ico

COPY ./nginx.conf /etc/nginx/conf.d

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]