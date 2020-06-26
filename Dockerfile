FROM node:carbon-jessie-slim
WORKDIR /app
COPY $PWD /app
RUN npm install
EXPOSE 8082
CMD ["npm", "run", "start"]