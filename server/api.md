# API documentation

_Very pre-alpha_

# Global responses

```
400 Invalid session key
400 <validation issues>
```

# Authorization header

When required, the authorization header must be as so:

```
Authorization: <session key>
```

# User routes

```
POST /user/create
REQ {email, password}
RES
- 200
- 400 {error: "Email address is in use"}
```

# Session routes

```
POST /session/login
REQ {email, password, deviceName}
RES
- 200 {sessionKey}
- 400 {error: "Bad login details"}
```

```
GET /session
+AUTH
REQ {email, password, deviceName}
RES
- 200 {sessionID, deviceName}[]
```

```
POST /session/delete
+AUTH
REQ {sessionID}
RES
- 200
- 400 {error: "Unable to delete session"}
```

# Card routes

```
POST /card
+AUTH
REQ {cardTitle, cardBody}
RES
- 200 {cardID, cardTitle, cardBody}
```

```
GET /card
+AUTH
RES
- 200 {cardID, cardTitle, cardBody}[]
```
