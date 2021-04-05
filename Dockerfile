FROM node

RUN yarn global add @vue/cli

WORKDIR /todo

COPY . /todo

RUN yarn install

EXPOSE 8080
CMD ["yarn", "serve"]