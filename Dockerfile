# ------- Base Khi Build Image ------- //

# # Stage 1: Build image
# FROM node:20-alpine as BUILD_IMAGE
# WORKDIR /app
# # Copy package.json và lockfile trước để tối ưu cache layer Docker
# COPY package*.json ./
# COPY project.inlang/ ./project.inlang/
# # Cài đặt các dependencies mà không audit
# RUN npm ci --no-audit

# ------------------------------------- //

FROM linhtran2023/base-image-ui-influence-management:v06 as BUILD_IMAGE

# Copy toàn bộ mã nguồn dự án
COPY . .

# Thiết lập biến môi trường để tránh lỗi EMFILE
ENV CHOKIDAR_USEPOLLING=true
ENV NODE_OPTIONS="--max-old-space-size=2048"

# Copy file môi trường sản phẩm
COPY .env.prod ./.env

# Build ứng dụng
RUN npm run build

# Stage 2: Production image
FROM nginx:1.27.2-alpine-slim as PRODUCTION_IMAGE

WORKDIR /app

# Copy build output từ stage BUILD_IMAGE
COPY --from=BUILD_IMAGE /app/dist/ /app/dist/

# Copy cấu hình Nginx
COPY nginx.conf /etc/nginx/conf.d

# Expose cổng 3000
EXPOSE 3000

CMD ["nginx", "-g", "daemon off;"]
