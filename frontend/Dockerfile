### STAGE 1: Build ###
FROM node:16.15.0-alpine AS build

WORKDIR /app
COPY package*.json /app/

RUN npm install
    
COPY ./ /app/
#RUN CI=true npm test
RUN npm run build

### STAGE 2: Production Environment ###
FROM nginx:1.16.0-alpine
COPY --from=build /app/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/build/ /usr/share/nginx/html