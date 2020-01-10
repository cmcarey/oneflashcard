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
- 200 {sessions: [{sessionID, deviceName}]}
```

```
POST /session/delete
+AUTH
REQ {sessionID}
RES
- 200
- 400 {error: "Invalid sessionID"}
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
- 200 {cards: [{cardID, cardTitle, cardBody}]}
```

```
POST /card/update
+AUTH
REQ {cardID, cardTitle?, cardBody?}
RES
- 200 {cardID, cardTitle, cardBody}
- 400 {error: "Invalid cardID"}
```

# Card tag routes

```
POST /cardtag
+AUTH
REQ {cardID, tagName}
RES
- 200 {cardTagID, cardID, tagName}
- 400 {error: "Invalid cardID"}
```

```
/GET /cardtag
+AUTH
RES
- 200 {cardTags: [{cardTagID, cardID, tagName}]}
```

```
POST /cardtag/update
+AUTH
REQ {cardID, tagName?}
RES
- 200 {cardTagID, cardID, tagName}
- 400 {error: "Invalid cardTagID"}
```
