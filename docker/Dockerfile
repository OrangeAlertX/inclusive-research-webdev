FROM node:alpine

WORKDIR /app/Core

EXPOSE 5173

COPY ../Core .
RUN cd ./Core && npm i

COPY ../Landing-Page-Static ../Landing-Page-Static

COPY ../Landing-Page-Responsive ../Landing-Page-Responsive
RUN cd ./Landing-Page-Responsive && npm i

COPY ../Paired-Colors ../Paired-Colors
RUN cd ./Paired-Colors && npm i

COPY ../ComponentViewer ../ComponentViewer
RUN cd ./ComponentViewer && npm i

COPY ../ComponentCollection ../ComponentCollection
RUN cd ./ComponentCollection && npm i

CMD ["npm", "run", "dev"]