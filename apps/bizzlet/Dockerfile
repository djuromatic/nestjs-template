FROM node:18-alpine

ADD . /app

WORKDIR /app

RUN cat package.json

RUN yarn app:install

RUN yarn bizzllet:cert

RUN yarn build bizzlet

RUN yarn libs:build:modules
RUN yarn libs:build:utils


# stage 2 build copy dist folder and package.json
FROM node:18-alpine

WORKDIR /app

COPY --from=0 /app/dist/ ./
#copy package.json
COPY --from=0 /app/package.json ./
#copy yarn.lock
COPY --from=0 /app/yarn.lock ./

#copy package for libs
COPY --from=0 /app/libs/modules/package.json ./libs/modules/package.json
COPY --from=0 /app/libs/utils/package.json ./libs/utils/package.json

#copy yarn.lock for libs
COPY --from=0 /app/libs/modules/yarn.lock ./libs/modules/yarn.lock
COPY --from=0 /app/libs/utils/yarn.lock ./libs/utils/yarn.lock


RUN ls -la


RUN ls ./libs -la

RUN ls ./libs/modules -la

RUN ls ./libs/utils -la


#install dependencies
RUN yarn app:install:production



CMD node ./apps/bizzlet/main.js