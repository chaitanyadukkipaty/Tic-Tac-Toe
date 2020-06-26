FROM node:carbon-jessie-slim
WORKDIR /app
COPY $PWD /app
RUN npm install
EXPOSE 8000
CMD ["npm", "run", "start"]