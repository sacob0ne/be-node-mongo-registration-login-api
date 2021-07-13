FROM node:10 AS ui-build
# USER root
WORKDIR /usr/src/app
COPY . .
RUN npm install @angular/cli && npm install

EXPOSE 4000

CMD ["npm", "start"]