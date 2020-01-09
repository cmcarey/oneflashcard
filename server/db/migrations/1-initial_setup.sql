-- Migrations
CREATE TABLE migrations (
  migration_id SERIAL PRIMARY KEY NOT NULL,
  migration_message TEXT NOT NULL,
  migration_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
INSERT INTO migrations
  (migration_id, migration_message)
  VALUES (1, 'initial setup');

-- Users
CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);
CREATE UNIQUE INDEX users_email
  ON users (lower(email));

-- User sessions
CREATE TABLE user_sessions (
  session_id SERIAL PRIMARY KEY NOT NULL,
  user_id SERIAL REFERENCES users(user_id) NOT NULL,
  session_key TEXT UNIQUE NOT NULL,
  device_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Cards
CREATE TABLE cards (
  card_id SERIAL PRIMARY KEY NOT NULL,
  user_id SERIAL REFERENCES users(user_id) NOT NULL,
  card_title TEXT NOT NULL,
  card_body TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);

-- Card tags
CREATE TABLE card_tags (
  card_tag_id SERIAL PRIMARY KEY NOT NULL,
  card_id SERIAL REFERENCES cards(card_id) NOT NULL,
  tag_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP NOT NULL
);