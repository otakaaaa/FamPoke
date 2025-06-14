FROM node:22.16.0

WORKDIR /app

RUN mkdir -p /app/node_modules

COPY ./package.json ./yarn.lock* ./

RUN yarn install

RUN chown -R node:node ./
USER node

ARG NEXT_TELEMETRY_DISABLED=1
ENV NEXT_TELEMETRY_DISABLED=$NEXT_TELEMETRY_DISABLED
