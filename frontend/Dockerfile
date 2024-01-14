FROM node:18-alpine
WORKDIR /frontend/
COPY frontend/frontend/public/ /frontend/public
COPY frontend/frontend/src/ /frontend/src
COPY frontend/frontend/package.json /frontend/

RUN npm install
CMD ["npm", "start"]
