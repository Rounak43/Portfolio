# Portfolio API

Express + Firestore backend powering the dynamic sections of the portfolio.
Content is public to read and admin-only to write; the admin is a Firebase Auth
user whose email appears in `ADMIN_EMAILS`.

## Layout

```
server/
├── src/
│   ├── config/       env loading + Firebase Admin initialisation
│   ├── middleware/   auth (ID-token verification), Zod validation, errors
│   ├── schemas/      one Zod schema per content type
│   ├── services/     generic Firestore repository + the repository registry
│   ├── controllers/  request handlers
│   ├── routes/       route wiring (a factory builds the five CRUD routes)
│   ├── app.js        Express app: helmet, CORS, compression, routes
│   └── index.js      entrypoint — validates env, then listens
├── scripts/
│   ├── seed.js       pushes the previously-hardcoded content into Firestore
│   ├── grantAdmin.js sets the `admin: true` custom claim on an account
│   └── data/         the seed payload
└── firestore.rules   locks down direct browser access to Firestore
```

## Setup

1. **Create the Firebase project** at <https://console.firebase.google.com>.
2. **Enable Firestore**: Build → Firestore Database → Create database → start in
   production mode.
3. **Enable Auth**: Build → Authentication → Sign-in method → enable
   Email/Password. Then Users → Add user, and create your admin account.
4. **Get a service account key**: Project settings → Service accounts →
   Generate new private key. Save the JSON somewhere outside the repo.
5. **Configure this server**:

   ```bash
   cd server
   npm install
   cp .env.example .env
   ```

   Fill in `.env`. For `FIREBASE_SERVICE_ACCOUNT_BASE64`, run:

   ```bash
   node -e "console.log(Buffer.from(require('fs').readFileSync('/path/to/serviceAccount.json')).toString('base64'))"
   ```

   Set `ADMIN_EMAILS` to the account you created in step 3.

6. **Seed your existing content**:

   ```bash
   npm run seed
   ```

7. **Run it**:

   ```bash
   npm run dev
   ```

   Check <http://localhost:5000/api/v1/health>.

8. **Publish the Firestore rules** (optional but recommended):

   ```bash
   firebase deploy --only firestore:rules
   ```

   The rules check an `admin: true` custom claim, which you grant with
   `npm run grant-admin -- you@example.com`.

## API

Base path `/api/v1`. Writes need `Authorization: Bearer <firebase-id-token>`.

| Method | Path                  | Access | Purpose                       |
| ------ | --------------------- | ------ | ----------------------------- |
| GET    | `/health`             | public | Liveness check                |
| GET    | `/auth/me`            | admin  | Confirm the caller is admin   |
| GET    | `/projects`           | public | List projects                 |
| POST   | `/projects`           | admin  | Create                        |
| PATCH  | `/projects/:id`       | admin  | Partial update                |
| DELETE | `/projects/:id`       | admin  | Delete                        |
| POST   | `/projects/reorder`   | admin  | Rewrite ordering (`{ ids }`)  |
| …      | `/skills`, `/timeline`, `/competitions` | | Identical shape |
| GET    | `/about`              | public | About paragraphs + cards      |
| PUT    | `/about`              | admin  | Replace About content         |
| POST   | `/messages`           | public | Contact form (5/hour per IP)  |
| GET    | `/messages`           | admin  | Inbox, newest first           |
| PATCH  | `/messages/:id`       | admin  | Mark read/unread              |
| DELETE | `/messages/:id`       | admin  | Delete                        |

Responses are `{ success, data }`, or `{ success: false, error: { message } }`.

## Images

There is no upload endpoint. Image fields take a URL string. Content migrated
by the seed script uses an `asset:<filename>` scheme that the frontend resolves
against its bundled files in `src/assets`; anything added later should be a
plain `https://` URL.

## Deploying

GitHub Pages is static and cannot run this server, so host it separately —
Render's free tier works. Create a Web Service pointing at this repo with root
directory `server`, build command `npm install`, start command `npm start`.
Add every variable from `.env` in the dashboard, and put your Pages origin
(`https://Rounak43.github.io`) in `CORS_ORIGINS`.

Then set `VITE_API_URL` in the frontend's `.env` to the deployed API base.
