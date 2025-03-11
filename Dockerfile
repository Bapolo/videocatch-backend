# Usando uma imagem do Node.js
FROM node:18

# Criando diretório de trabalho no container
WORKDIR /app

# Copiando arquivos para o container
COPY package*.json ./
RUN npm install

# Copiar código restante
COPY . .

# Expor a porta que o backend usa (exemplo: 3000)
EXPOSE 5000

# Comando para iniciar o backend
CMD ["npm", "start"]
