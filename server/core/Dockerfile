# Builder config
FROM node:13 AS builder
WORKDIR /app/
# Install build dependencies
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
# Copy source and build
COPY src/ src/
RUN yarn build

# Runner config
FROM node:13
WORKDIR /app/
# Copy built source
COPY package.json yarn.lock ./
RUN yarn install --production
COPY --from=builder /app/build/ ./build/
# Prepare to run
CMD ["yarn", "start"]