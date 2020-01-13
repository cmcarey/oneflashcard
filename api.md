# API documentation

_Very pre-alpha_

## Global responses

```
- 400 {error: "INVALID_SESSION_KEY"}
- 400 {error: "BAD_INPUT"}
- 500 {error: "SERVER_ERROR"}
```

## Authorization header

When required, the authorization header must be as so:

```
Authorization: <session key>
```

---

```
POST /register
REQ {name, email, password}
=> 200 {sessionKey}
=> 400 {error: "EMAIL_USED"}

POST /login
REQ {email, password}
=> 200 {sessionKey}
=> 400 {error: "INVALID_DETAILS"}

GET /user
+AUTH
=> 200 {name, email}

GET /cards
+AUTH
=> 200 {cardID, title, text, tagIDs: string[]}[]

GET /tags
+AUTH
=> 200 {tagID, name, color}[]

POST /cards/new
+AUTH
REQ {title, text, tagIDs: string[]}
=> 200 {cardID}
=> 400 {error: "INVALID_TAG_ID"}

POST /tags/new
+AUTH
REQ {name, color}
=> 200 {tagID}

POST /cards/update
+AUTH
REQ {cardID, title, text, tagIDs: string[]}
=> 200
=> 400 {error: "INVALID_CARD_ID"}
=> 400 {error: "INVALID_TAG_ID"}

POST /tags/update
+AUTH
REQ {tagID, name, color}
=> 200
=> 400 {error: "INVALID_TAG_ID"}
```
