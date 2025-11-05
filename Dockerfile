FROM node:lts

WORKDIR /app

COPY package.json package-lock.json ./

# Usando um mirror alternativo (solução temporária)
RUN npm config set registry https://registry.npmmirror.com && npm install

COPY . .

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]