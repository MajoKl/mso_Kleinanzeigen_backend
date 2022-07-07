FROM  node:lts-alpine3.15

ADD . /webdev/msokleinanzeigen/

WORKDIR /webdev/msokleinanzeigen/

RUN npm ci

ENTRYPOINT [ "npm", "run", "start" ]