FROM node:16-alpine
LABEL authors="Hilmi Yetgin <hilmi.yetgin@student.kdg.be>"
WORKDIR /client
COPY package.json package-lock.json /client/
RUN npm install
COPY . /client/
RUN npm run build
EXPOSE 8081
CMD ["npm", "start"]


