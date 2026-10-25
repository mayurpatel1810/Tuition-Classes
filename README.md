# Bright Future Institute — Full-Stack Tuition Management Website

A production-quality tuition/coaching institute website: public marketing site + secure admin dashboard, built with React (frontend) and Spring Boot + PostgreSQL (backend).

## Stack
- **Frontend:** React 18, React Router, Axios, Vite, plain CSS
- **Backend:** Java 25, Spring Boot 3.5.4, Spring Security, Spring Data JPA, JWT
- **Database:** PostgreSQL

## Folder structure
```
tuition-project/
├── backend/    # Spring Boot API
├── frontend/   # React app
├── test-api.sh # Smoke-test script (run against a live backend)
└── README.md
```

## Quick start

### 1. Database
```bash
createdb tuition_db
# or with Docker:
docker run --name tuition-postgres -e POSTGRES_PASSWORD=postgres -e POSTGRES_DB=tuition_db -p 5432:5432 -d postgres:16
```

### 2. Backend
```bash
cd backend
mvn spring-boot:run
```
Runs on `http://localhost:8080`. On first run it seeds an admin user:
- **username:** `admin`
- **password:** `Admin@123`

⚠️ Change this password (or disable/guard `DataSeeder`) before deploying anywhere public.

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
Runs on `http://localhost:5173`. Public site at `/`, admin login at `/admin/login`.

### 4. Run tests
```bash
cd backend
mvn test              # automated backend tests (uses in-memory H2, no Postgres needed)

# with the backend running separately:
bash ../test-api.sh    # smoke test against the live API
```

## Environment variables (production)
Set these on your backend host:
| Variable | Purpose |
|---|---|
| `DATABASE_URL` | JDBC connection string to your managed Postgres |
| `DATABASE_USERNAME` / `DATABASE_PASSWORD` | DB credentials |
| `JWT_SECRET` | Long random string for signing tokens |
| `CORS_ALLOWED_ORIGINS` | Your deployed frontend's URL |
| `UPLOAD_DIR` | Folder for uploaded images |

Set this on your frontend host (build-time):
| Variable | Purpose |
|---|---|
| `VITE_API_BASE_URL` | Your deployed backend's `/api` URL |

Before going live: switch `ddl-auto` to `validate` in `application.yml`, and remove/guard `DataSeeder`.

## API overview
All responses follow:
```json
{ "success": true, "message": "...", "data": { ... } }
```
Public `GET` endpoints: `/api/toppers`, `/api/courses`, `/api/faculty`, `/api/results`, `/api/gallery`, `/api/announcements`, `/api/institute-info`, plus `POST /api/enquiries`.
Everything else under `/api/**` requires `Authorization: Bearer <JWT>` from `POST /api/auth/login`.

## Notes
- Image uploads are stored on local disk (`uploads/`) with the URL saved in Postgres. The storage layer (`FileStorageService`) is an interface — swap `LocalFileStorageService` for an S3/Cloudinary implementation without touching any controller.
- `uploads/` is gitignored — don't rely on it persisting across redeploys on ephemeral-disk hosts.
