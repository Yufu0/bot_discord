FROM node:lts

COPY ./ .

RUN npm install
RUN node deployCommands.js

CMD ["node", "index.js"]
