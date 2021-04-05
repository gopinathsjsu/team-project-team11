FROM node:14-alpine

# Create app directory
WORKDIR /usr/src/app
# For bcrypt
RUN apk --no-cache add --virtual builds-deps build-base python

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
RUN npm install
RUN npm rebuild bcrypt --build-from-source
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY . .

EXPOSE 5000

ENV PORT=5000

RUN printenv

CMD [ "node", "server.js" ]