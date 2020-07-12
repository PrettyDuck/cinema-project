FROM node:12-alpine
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5000
CMD ["npm", "run", "server"]