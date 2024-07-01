FROM node

WORKDIR /app

COPY *.json .

RUN npm install

RUN npm install express axios path node-cache helmet

# Define a variável de ambiente para a URL da API
ENV API_URL=https://pokeapi.co/api/v2/

COPY . .

EXPOSE 3000

CMD ["node", "server.js"]