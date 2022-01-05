FROM node:lts-alpine AS builder

WORKDIR /build

COPY package*.json ./
RUN npm ci

COPY . .
RUN ./run build

FROM node:lts-alpine AS app

WORKDIR /app

COPY package*.json ./
RUN npm ci --production && npm cache clean --force

COPY --from=builder /build/dist/ ./

EXPOSE 8080

CMD node server.js
