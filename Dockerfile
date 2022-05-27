FROM node:16.13.2 As development

WORKDIR /usr/src/library_app

COPY package*.json ./

RUN npm install --only=development

COPY . .

RUN npm run build

FROM node:16.13.2 As production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/library_app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/library_app/dist ./dist

CMD ["node", "dist/main"]