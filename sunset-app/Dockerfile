FROM node:18-alpine

WORKDIR /app

COPY . /app

RUN yarn add serve -g

RUN yarn install

RUN yarn build

EXPOSE 3000

CMD ["npm", "run", "serve"]