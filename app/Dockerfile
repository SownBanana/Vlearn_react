# build stage

FROM node:14-alpine as build-stage
WORKDIR /app
COPY . .
COPY dev.env .env
RUN npm install
RUN npm run build

CMD ["npm", "start"]

# production stage

# FROM nginx:1.17-alpine as production-stage
# COPY --from=build-stage /app/build /usr/share/nginx/html
# CMD ["nginx", "-g", "daemon off;"]
