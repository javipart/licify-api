FROM node:alpine3.18

RUN npm install -g serve

EXPOSE 3010

WORKDIR /app
COPY . .

RUN npm install

CMD ["npm", "start"]