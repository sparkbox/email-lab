FROM node:4-onbuild

RUN \
  apt-get update && \
  apt-get install -y ruby && \
  apt-get install -y ruby-dev

RUN npm install -g grunt-cli

RUN gem install bundler && bundle install

WORKDIR /usr/src/app/

EXPOSE 9000
EXPOSE 35729
