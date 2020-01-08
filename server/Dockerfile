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
COPY --from=builder /app/build/ ./build/
COPY --from=builder /app/package.json /app/yarn.lock ./
RUN yarn install --production
RUN node --version
# Prepare to run
CMD yarn start