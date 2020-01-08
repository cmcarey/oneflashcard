FROM node:13
WORKDIR /app/
# Install build dependencies
COPY package.json yarn.lock tsconfig.json ./
RUN yarn install
# Copy tests
COPY tests/ tests/
# Prepare to run
CMD yarn test