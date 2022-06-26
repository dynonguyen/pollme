FROM node:16-alpine

WORKDIR /app

COPY package.json ./

RUN yarn install

COPY . .

EXPOSE 8080

CMD ["yarn", "dev"]