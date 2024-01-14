FROM node:18-alpine
WORKDIR /frontend/
COPY /frontend/public/ /frontend/public
COPY /frontend/src/ /frontend/src
COPY /frontend/package.json /frontend/

RUN npm install
CMD ["npm", "start"]