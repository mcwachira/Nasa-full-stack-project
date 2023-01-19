FROM node:lts-alpine

WORKDIR /app

# Install dependencies first, as they change less often than code.
COPY package*.json ./

# Install dependencies first, as they change less often than code.
COPY client/package*.json client/
RUN npm run install-client --production

# Install dependencies first, as they change less often than code.
COPY server/package*.json server/
RUN npm run install-server --production

COPY client/ client/
RUN npm run build --prefix client

COPY server/ server/

USER node

CMD [ "npm", "start", "--prefix", "server" ]

EXPOSE 8000