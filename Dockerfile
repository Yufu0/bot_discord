FROM node:lts

COPY ./ .

RUN npm install
