
FROM node:latest
LABEL Name=gameserver Version=0.0.1 
RUN mkdir -p /usr/src/app 
WORKDIR /usr/src/app
COPY . /usr/src/app
EXPOSE 3005
CMD npm start
