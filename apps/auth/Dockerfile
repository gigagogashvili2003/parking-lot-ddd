FROM node:20.8.1

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .

ENV PORT=3000

EXPOSE $PORT

CMD ["npm", "run", "start:dev", "auth"]