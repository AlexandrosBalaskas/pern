FROM node:18-alpine
WORKDIR /example-react/
COPY package.json /example-react/
RUN npm i --force
RUN npm i typescript -g
COPY public/ /example-react/public
COPY src/ /example-react/src
COPY tsconfig.json /example-react/
CMD ["npm", "start"]