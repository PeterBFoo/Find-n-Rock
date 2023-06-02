FROM --platform=linux/amd64 node:alpine as build

WORKDIR /app
RUN npm i -g @angular/cli

COPY . /app
RUN npm install
RUN ng build --configuration production

FROM --platform=linux/amd64 nginx:alpine

COPY --from=build /app/dist/find-n-rock /usr/share/nginx/html
