# noteTaker API Testing Plan

Public Repository: https://github.com/abish-s/noteTaker
Live API on Render: https://notetaker-hjnd.onrender.com
Live API Documentation: https://notetaker-hjnd.onrender.com/api-docs

## Testing Plan:

### Setup

1. Run `npm install`.
2. Run `npx prisma db push`.
3. Run `npx prisma generate`.
4. Run `npm run seed`.
5. Run `npm run dev`.
6. Open Swagger UI at `http://localhost:8080/api-docs`.


Seeded Accounts

C- Email: `admin@notetaker.local`
- Password: `AdminPass123!`
- Email: `user@notetaker.local`
- Password: `UserPass123!`

JWT Setup (for protected routes)

1. Execute `POST /api/auth/login`.
2. Copy `accessToken` from response.
3. Click Swagger `Authorize` and paste `Bearer <accessToken>`.

---

## GET /api/health

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Click Execute
3. Expect response:

```json
{ "status": "UP" }
```

## POST /api/auth/signup

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Send body:

```json
{
  "email": "newuser@example.com",
  "password": "Password123!"
}
```

3. Click Execute
4. Expect response:

```json
{ "id": 3, "email": "newuser@example.com", "role": "USER" }
```

400 Bad Request:

1. Remove a required field (email or password)
2. Click Execute
3. Expect 400 Bad Request

409 Conflict:

1. Reuse an already registered email
2. Click Execute
3. Expect 409 Conflict

## POST /api/auth/login

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Send body:

```json
{
  "email": "admin@notetaker.local",
  "password": "AdminPass123!"
}
```

3. Click Execute
4. Expect response:

```json
{ "accessToken": "eyJhbadFfHfrACsadEAedsa" }
```

400 Bad Request:

1. Remove password from request body
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Use an incorrect password
2. Click Execute
3. Expect 401 Unauthorized

## GET /api/boards

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Click Execute
3. Expect response:

```json
[
  { "id": 1, "title": "My Board 1", "ownerId": 1 },
  { "id": 2, "title": "My Board 2", "ownerId": 2 }
]
```

## GET /api/boards/{id}

Access Control: Public (any user can access)

Success Case:

1. Use existing ID (example: `1`)
2. Click Try it out
3. Click Execute
4. Expect response:

```json
{ "id": 1, "title": "My Board 1", "ownerId": 1 }
```

400 Bad Request:

1. Provide an invalid ID (example: `-10`)
2. Click Execute
3. Expect 400 Bad Request

404 Not Found:

1. Use a non-existent ID (example: `9999`)
2. Click Execute
3. Expect 404 Not Found

## POST /api/boards

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Click Try it out
2. Send body:

```json
{ "title": "Capstone Board" }
```

3. Click Execute
4. Expect response:

```json
{ "id": 10, "title": "Capstone Board", "ownerId": 1 }
```

400 Bad Request:

1. Remove required field `title`
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT in Swagger Authorize
2. Click Execute
3. Expect 401 Unauthorized

## PUT /api/boards/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing ID (example: `1`)
2. Click Try it out
3. Send body:

```json
{ "title": "Updated Board Title" }
```

4. Click Execute
5. Expect response:

```json
{ "id": 1, "title": "Updated Board Title", "ownerId": 1 }
```

400 Bad Request:

1. Provide an invalid ID (example: `0`)
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT in Swagger Authorize
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use valid JWT from account that does not have permission for that board
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use a non-existent ID (example: `9999`)
2. Click Execute
3. Expect 404 Not Found

## DELETE /api/boards/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use an existing board ID
2. Click Try it out
3. Click Execute
4. Expect 204 No Content

400 Bad Request:

1. Provide invalid ID (example: `-1`)
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use valid JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent ID `9999`
2. Click Execute
3. Expect 404 Not Found

## GET /api/boards/{id}/members

Access Control: Public (any user can access)

Success Case:

1. Use existing board ID (example: `1`)
2. Click Try it out
3. Click Execute
4. Expect response:

```json
[
  { "id": 1, "email": "test@test.com", "role": "USER" },
  { "id": 2, "email": "test2@test.com", "role": "USER" }
]
```

400 Bad Request:

1. Provide invalid ID (example: `0`)
2. Click Execute
3. Expect 400 Bad Request

404 Not Found:

1. Use non-existent board ID `9999`
2. Click Execute
3. Expect 404 Not Found

## POST /api/boards/{id}/members

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing board ID (example: `1`)
2. Click Try it out
3. Send body:

```json
{
  "userId": 2,
  "role": "MEMBER"
}
```

4. Click Execute
5. Expect response:

```json
{ "boardId": 1, "userId": 2 }
```

400 Bad Request:

1. Send invalid request body
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent board ID or user ID
2. Click Execute
3. Expect 404 Not Found

409 Conflict:

1. Try adding the same user to the same board twice
2. Click Execute
3. Expect 409 Conflict

## DELETE /api/boards/{id}/members/{uid}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing board ID and member user ID
2. Click Try it out
3. Click Execute
4. Expect 204 No Content

400 Bad Request:

1. Provide invalid path IDs
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent board/user pair
2. Click Execute
3. Expect 404 Not Found

## GET /api/notes

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Click Execute
3. Expect response:

```json
[
  { "id": 1, "content": "Note content here", "boardId": 1, "x_pos": 0, "y_pos": 0, "color": "#FFFF88" },
  { "id": 2, "content": "Another note", "boardId": 1, "x_pos": 100, "y_pos": 150, "color": "#FFFF88" }
]
```

## GET /api/notes/{id}

Access Control: Public (any user can access)

Success Case:

1. Use existing note ID (example: `1`)
2. Click Try it out
3. Click Execute
4. Expect response:

```json
{ "id": 1, "content": "Note content here", "boardId": 1, "x_pos": 0, "y_pos": 0, "color": "#FFFF88" }
```

400 Bad Request:

1. Use invalid ID (example: `-10`)
2. Click Execute
3. Expect 400 Bad Request

404 Not Found:

1. Use non-existent ID `9999`
2. Click Execute
3. Expect 404 Not Found

## POST /api/notes

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Click Try it out
2. Send body:

```json
{
  "boardId": 1,
  "content": "New sticky note",
  "x_pos": 120,
  "y_pos": 200,
  "color": "#FFFF88"
}
```

3. Click Execute
4. Expect response:

```json
{ "id": 5, "content": "New sticky note", "boardId": 1, "x_pos": 120, "y_pos": 200, "color": "#FFFF88" }
```

400 Bad Request:

1. Remove required field (for example `content`)
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

## PUT /api/notes/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing note ID (example: `1`)
2. Click Try it out
3. Send body:

```json
{
  "content": "Updated note content",
  "boardId": 1,
  "x_pos": 50,
  "y_pos": 75,
  "color": "#FFFF88"
}
```

4. Click Execute
5. Expect response:

```json
{ "id": 1, "content": "Updated note content", "boardId": 1, "x_pos": 50, "y_pos": 75, "color": "#FFFF88" }
```

400 Bad Request:

1. Use invalid ID or invalid request body
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent note ID `9999`
2. Click Execute
3. Expect 404 Not Found

## DELETE /api/notes/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing note ID
2. Click Try it out
3. Click Execute
4. Expect 204 No Content

400 Bad Request:

1. Use invalid ID
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent note ID `9999`
2. Click Execute
3. Expect 404 Not Found

## GET /api/notes/{id}/tags

Access Control: Public (any user can access)

Success Case:

1. Use existing note ID (example: `1`)
2. Click Try it out
3. Click Execute
4. Expect response:

```json
[
  { "id": 1, "name": "Urgent" },
  { "id": 2, "name": "Work" }
]
```

400 Bad Request:

1. Use invalid ID
2. Click Execute
3. Expect 400 Bad Request

404 Not Found:

1. Use non-existent note ID `9999`
2. Click Execute
3. Expect 404 Not Found

## POST /api/notes/{id}/tags

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing note ID (example: `1`)
2. Click Try it out
3. Send body:

```json
{
  "tagId": 1
}
```

4. Click Execute
5. Expect response:

```json
{ "noteId": 1, "tagId": 1 }
```

400 Bad Request:

1. Use malformed body
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

404 Not Found:

1. Use non-existent note ID or tag ID
2. Click Execute
3. Expect 404 Not Found

409 Conflict:

1. Attach the same tag to the same note again
2. Click Execute
3. Expect 409 Conflict

## DELETE /api/notes/{id}/tags/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing note ID and tag ID pair
2. Click Try it out
3. Click Execute
4. Expect 204 No Content

400 Bad Request:

1. Use invalid path IDs
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent note/tag pair
2. Click Execute
3. Expect 404 Not Found

## GET /api/tags

Access Control: Public (any user can access)

Success Case:

1. Click Try it out
2. Click Execute
3. Expect response:

```json
[
  { "id": 1, "name": "Urgent" },
  { "id": 2, "name": "Work" }
]
```

## GET /api/tags/{id}

Access Control: Public (any user can access)

Success Case:

1. Use existing tag ID (example: `1`)
2. Click Try it out
3. Click Execute
4. Expect response:

```json
{ "id": 1, "name": "Urgent" }
```

400 Bad Request:

1. Use invalid ID
2. Click Execute
3. Expect 400 Bad Request

404 Not Found:

1. Use non-existent ID `9999`
2. Click Execute
3. Expect 404 Not Found

## POST /api/tags

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Click Try it out
2. Send body:

```json
{ "name": "Work" }
```

3. Click Execute
4. Expect response:

```json
{ "id": 3, "name": "Work" }
```

400 Bad Request:

1. Remove required field `name`
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

409 Conflict:

1. Try to create duplicate tag name
2. Click Execute
3. Expect 409 Conflict

## PUT /api/tags/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing tag ID (example: `1`)
2. Click Try it out
3. Send body:

```json
{ "name": "Updated Tag" }
```

4. Click Execute
5. Expect response:

```json
{ "id": 1, "name": "Updated Tag" }
```

400 Bad Request:

1. Use invalid ID or malformed body
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

404 Not Found:

1. Use non-existent ID `9999`
2. Click Execute
3. Expect 404 Not Found

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

409 Conflict:

1. Rename tag to an already existing tag name
2. Click Execute
3. Expect 409 Conflict

## DELETE /api/tags/{id}

Access Control: Authenticated user (JWT required)

Setup:

1. Login and add JWT using Swagger Authorize

Success Case:

1. Use existing tag ID
2. Click Try it out
3. Click Execute
4. Expect 204 No Content

400 Bad Request:

1. Use invalid ID
2. Click Execute
3. Expect 400 Bad Request

401 Unauthorized:

1. Remove JWT
2. Click Execute
3. Expect 401 Unauthorized

403 Forbidden:

1. Use JWT from account without permission
2. Click Execute
3. Expect 403 Forbidden

404 Not Found:

1. Use non-existent ID `9999`
2. Click Execute
3. Expect 404 Not Found
