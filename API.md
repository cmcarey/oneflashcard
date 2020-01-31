# Types

```
User {user_id: string, email: string}
Card {card_id: string, title: string, text: string, tag_ids: string[]}
Tag: {tag_id: string, text: string, color: string}
```

# Authentication

Where `AUTH` is added to a route, the API server expects an authorization header in the format of:

```
Authorization: Bearer SESSIONKEY
```

Additionally, requests may return 400 with the error `BAD_SESSION_KEY`.

# Request bodies and validation

Request bodies are strictly validated server side using Joi.

If the request body does not match the schema, the request will return 400 with the error `BAD_REQUEST_BODY`

# Routes

## User routes

```
User login
POST /login
  REQ {email: string, password: string}
  200 {user: User, session_key: string}
  400 "BAD_EMAIL" | "BAD_PASSWORD"
```

```
User fetch +AUTH
GET /user
  200 {user: User}
```

## Card routes

```
Fetch cards +AUTH
GET /card
  200 {cards: Card[]}
```

```
New card +AUTH
POST /card/new
  REQ {title: string, text: string, tag_ids: string[]}
  200 {card: Card}
  400 "BAD_TAGID"
```

```
Update card +AUTH
POST /card/update
  REQ {card: Card}
  200
  400 "BAD_CARDID" | "BAD_TAGID"
```

```
Delete card +AUTH
POST /card/delete
  REQ {card_id: string}
  200
  400 "BAD_CARDID"
```

## Tag routes

```
Fetch tags +AUTH
GET /tag
  200 {tags: Tag[]}
```

```
New tag +AUTH
POST /tag/new
  REQ {text: string, color: string}
  200 {tag: Tag}
```

```
Update tag +AUTH
POST /tag/update
  REQ {tag: Tag}
  200
  400 "BAD_TAGID"
```

```
Delete tag +AUTH
POST /tag/delete
  REQ {tag_id: string}
  200
  400 "BAD_TAGID"
```
