FROM node:12

WORKDIR ./magicmap
COPY . .

WORKDIR ./frontend
RUN sed -i 's/<%= MAP_APP_API_KEY %>/AIzaSyCda9ideami1i3TWwD1av6vHwXoFcEGvCk/g' src/index.html
RUN npm install
RUN npm run build

WORKDIR  ../control-plane
RUN npm install
RUN npm run build

WORKDIR ..
RUN npm install

EXPOSE 3000
CMD npm start
