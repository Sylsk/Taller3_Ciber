# backend/Dockerfile
FROM node:18

# Crear carpeta de trabajo
WORKDIR /app

# Copiar archivos y dependencias
COPY package*.json ./
RUN npm install

# Copiar el resto del código
COPY . .

# Crear carpeta de datos si no existe
RUN mkdir -p data && touch data/notas.json

# Exponer el puerto de Express
EXPOSE 5555

# Comando para iniciar la app
CMD ["node", "app.js"]
