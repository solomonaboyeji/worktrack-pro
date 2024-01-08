# Use a Node.js base image
FROM node:16

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

RUN npm prune --production

EXPOSE 4000

CMD ["npm", "start"]
