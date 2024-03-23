FROM node:18

WORKDIR /var/app

COPY ./src ./src
COPY ./package.json .
COPY ./public ./public
COPY ./templates ./templates

RUN npm install

EXPOSE 3000

CMD [ "npm", "start" ]
