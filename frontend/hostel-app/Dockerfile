# ---------- Build Stage ----------
FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . .

# Build-time API URL
ARG VITE_API_URL

ENV VITE_API_URL=$VITE_API_URL

RUN npm run build


# ---------- Production Stage ----------
FROM nginx:alpine

# Copy the Vite production build
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8080

# Cloud Run-compatible nginx configuration
RUN printf 'server {\n\
    listen 8080;\n\
    server_name _;\n\
\n\
    root /usr/share/nginx/html;\n\
    index index.html;\n\
\n\
    location / {\n\
        try_files $uri $uri/ /index.html;\n\
    }\n\
}\n' > /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]


