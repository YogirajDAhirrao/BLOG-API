# 📝 Blog API — Express + TypeScript + Prisma

A secure, scalable, and documented **Blog API** built with **Express**, **TypeScript**, and **Prisma** (PostgreSQL), featuring **JWT auth**, **cookie sessions**, **rate limiting**, **Swagger docs**, and **profile management**.

---

## ✅ Features (Implemented)

### 🔐 Authentication

* JWT-based login with cookie session.
* Login & Register endpoints (`/auth` routes).
* Global `authenticate` middleware using JWT cookie.

### 👤 Profile Management

* `GET /profile/me`: View user profile (posts + comments).
* `PUT /profile/update`: Update name/email (with conflict checks).

### 📖 CRUD Models (Prisma)

* **User**: name, email, password, posts, comments.
* **Post**: title, content, author.
* **Comment**: content, linked to author + post.

### ⚙️ Middlewares

* `authenticate`: Protects private routes using JWT from cookies.
* `rateLimiter`: 100 requests per IP every 15 minutes.

### 📚 Swagger Documentation

* Available at: `GET /api-docs`
* Auto-generated using `swagger-jsdoc` and `swagger-ui-express`.



### ✏️ Blog Post & Comment System

* `POST /posts` – Create post
* `GET /posts` – List all posts
* `GET /posts/:id` – View single post
* `PUT /posts/:id` – Update post
* `DELETE /posts/:id` – Delete post
* Add comments to posts

### 📂 Caching

* Redis integration for caching popular posts and GET responses.

### 📈 Rate Limiting Enhancements

* Redis-based limiter for distributed environments.
* Per-user (not just IP) rate limits.

### 🔐 Auth Features

* Password hashing with bcrypt
* Password reset (email token based)

### 🧪 Testing & CI

* Add unit + integration tests with Jest + Supertest.
* Setup GitHub Actions for CI.

---

## 💠 Tech Stack

| Layer         | Tech Used                          |
| ------------- | ---------------------------------- |
| Backend       | Express + TypeScript               |
| Database      | PostgreSQL (via Prisma ORM)        |
| Auth          | JWT with HTTP-only cookies         |
| Validation    | Built-in checks (Zod planned)      |
| Docs          | Swagger (OpenAPI 3.0)              |
| Rate Limiting | express-rate-limit                 |
| ORM Client    | Prisma Client                      |
| Dev Tools     | Nodemon, ts-node, ESLint, Prettier |

---

## 📦 Project Structure

```
src/
├── controllers/       # Logic for each route
├── routes/            # Express route definitions
├── middlewares/       # Auth, rate limiters, etc.
├── prisma/            # Prisma client and migrations
├── types/             # TypeScript custom types
├── utils/             # Utility functions (e.g., JWT helpers)
├── swagger.ts         # Swagger config and setup
├── index.ts           # Entry point to start the server
```

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Setup Prisma
npx prisma generate
npx prisma migrate dev --name init

# Start development server
npm run dev
```

Ensure `.env` includes:

```
DATABASE_URL=postgresql://user:password@localhost:5432/blogdb
JWT_SECRET=your_jwt_secret
```

---

## 📙 API Docs

Once server is running:

**Swagger UI:** [http://localhost:3000/api-docs](http://localhost:3000/api-docs)

---

## 👨‍💼 Author

Made by **Yogiraj Ahirrao** — as part of a backend development roadmap.

> Contributions, forks, and feedback welcome!

---

## 🏁 License

[MIT](./LICENSE)
