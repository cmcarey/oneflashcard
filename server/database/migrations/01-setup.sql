-- Used for UUID types
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users
CREATE TABLE users (
  user_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  email TEXT NOT NULL,
  password TEXT NOT NULL
);
-- Emails must be unique regardless of case
CREATE UNIQUE INDEX users_email ON users(lower(email));

-- Sessions
CREATE TABLE sessions (
  session_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  key TEXT UNIQUE NOT NULL
);

-- Cards
CREATE TABLE cards (
  card_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  title TEXT NOT NULL,
  "text" TEXT NOT NULL
);

-- Tags
CREATE TABLE tags (
  tag_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  "text" TEXT NOT NULL,
  color TEXT NOT NULL
);

-- Card tag relations
CREATE TABLE card_tags (
  card_tag_id UUID DEFAULT uuid_generate_v4() UNIQUE NOT NULL,
  user_id UUID REFERENCES users(user_id) NOT NULL,
  card_id UUID REFERENCES cards(card_id) NOT NULL,
  tag_id UUID REFERENCES tags(tag_id) NOT NULL
);