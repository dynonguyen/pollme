FROM node:16-alpine

WORKDIR /app

COPY package.json tsconfig.json ./

RUN yarn install

COPY . .

RUN yarn build

EXPOSE 3000

CMD ["yarn", "start"]