FROM node:slim

COPY frontend.js /opt/frontend.js
WORKDIR /opt
RUN npm init --yes
RUN npm i express
RUN npm i axios
ENTRYPOINT node /opt/frontend.js
