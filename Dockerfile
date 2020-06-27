FROM node:14.4.0

WORKDIR /usr/src/app

ENV NODE_ENV production

COPY package*.json /usr/src/app/

RUN npm ci

COPY . /usr/src/app

CMD ["npm","run","start"]