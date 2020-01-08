CREATE TABLE migrations (
  migration_id SERIAL PRIMARY KEY NOT NULL,
  migration_message TEXT NOT NULL,
  migration_time TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO migrations
  (migration_id, migration_message)
  VALUES (1, 'initial setup');


CREATE TABLE users (
  user_id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL,
  hashed_password TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE UNIQUE INDEX users_email
  ON users (lower(email));


CREATE TABLE sessions (
  session_id SERIAL PRIMARY KEY NOT NULL,
  user_id SERIAL REFERENCES users(user_id) NOT NULL,
  session_key TEXT NOT NULL UNIQUE,
  device_name TEXT NOT NULL
);