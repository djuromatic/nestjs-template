FROM node:18.13.0-alpine

ADD . /app

WORKDIR /app

RUN cat package.json

RUN ls /app -al
RUN yarn app:install
RUN yarn build bizzlet

COPY apps/bizzlet/package.json dist/apps/bizzlet/
COPY apps/bizzlet/tsconfig.app.json dist/apps/bizzlet/

RUN yarn --cwd dist/apps/bizzlet
RUN yarn --cwd dist/apps/libs/modules
RUN yarn --cwd dist/apps/libs/utils

RUN ls dist/apps/bizzlet -al

RUN ls /app -al

RUN yarn

CMD yarn --cwd apps start:prod