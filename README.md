# Quantum-Safe File Transfer Application with Hybrid Encryption

A secure file transfer application designed to protect sensitive files using modern symmetric encryption combined with post-quantum cryptographic mechanisms.

The project combines **JWT-based authentication**, **AES-256-GCM**, **ML-KEM**, **ML-DSA**, and **SHA3-256** to provide a foundation for quantum-resistant secure file transfer.

> **Project Status:** Authentication and frontend application structure are implemented. File-transfer and cryptographic backend modules are under development.

---

## 1. Project Overview

The **Quantum-Safe File Transfer Application** is a Final Year Engineering Project that aims to provide secure file transfer between authenticated users.

The application is designed around a hybrid cryptographic architecture:

```text
                    USER
                     │
                     ▼
              Authentication
                     │
                     ▼
               JWT Security
                     │
                     ▼
              Secure Dashboard
                     │
                     ▼
                File Transfer
                     │
          ┌──────────┼──────────┐
          │          │          │
          ▼          ▼          ▼
       ML-KEM    AES-256-GCM   ML-DSA
      Key Setup  File Encrypt  Signature
          │          │          │
          └──────────┼──────────┘
                     │
                     ▼
                 SHA3-256
               File Integrity
```

The primary goal is to protect files against both current and future cryptographic threats.

---

# 2. Main Features

## Authentication

* User registration
* User login
* JWT authentication
* BCrypt password hashing
* Protected API endpoints
* Authenticated user retrieval
* Logout
* Protected frontend routes

## File Transfer

Planned functionality:

* Select files for transfer
* Encrypt files before transfer
* Send files securely
* Receive encrypted files
* Decrypt received files
* Transfer history
* File integrity verification

## Cryptographic Security

The project is designed to use:

### AES-256-GCM

Used for symmetric file encryption.

### ML-KEM

Used for post-quantum key encapsulation and secure key establishment.

### ML-DSA

Used for post-quantum digital signatures and authenticity verification.

### SHA3-256

Used to generate a cryptographic fingerprint for file integrity verification.

---

# 3. Technology Stack

## Frontend

* React.js
* Vite
* JavaScript
* React Router DOM
* Axios
* React Icons
* CSS

## Backend

* Java
* Spring Boot
* Spring Security
* Spring Data JPA
* JWT
* BCrypt
* Maven

## Database

* PostgreSQL

## Cryptography

* AES-256-GCM
* ML-KEM
* ML-DSA
* SHA3-256

---

# 4. Project Structure

```text
QuantumSafeFileTransfer/
│
├── backend/
│   ├── src/
│   │   └── main/
│   │       ├── java/
│   │       │   └── com/
│   │       │       └── quantumsafe/
│   │       │           └── backend/
│   │       │
│   │       └── resources/
│   │
│   ├── pom.xml
│   └── ...
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   ├── components/
│   │   ├── context/
│   │   ├── layouts/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   ├── package-lock.json
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 5. Prerequisites

Install the following before running the project.

## Required Software

### Java

Java 21 is required.

Check:

```bash
java -version
```

Expected:

```text
java version "21..."
```

---

### Node.js

Install a current LTS version of Node.js.

Check:

```bash
node -v
```

and:

```bash
npm -v
```

---

### PostgreSQL

PostgreSQL is required for the backend.

The project currently uses:

```text
PostgreSQL 18
```

Check:

```bash
psql --version
```

---

### Git

Check:

```bash
git --version
```

---

### Maven

Check:

```bash
mvn -version
```

If the project contains Maven Wrapper files, Maven Wrapper can be used instead.

---

# 6. Clone the Repository

Clone the project:

```bash
git clone <YOUR_GITHUB_REPOSITORY_URL>
```

Enter the project:

```bash
cd QuantumSafeFileTransfer
```

If you need a specific branch:

```bash
git checkout vaishnavi
```

---

# 7. Database Setup

Create the PostgreSQL database:

```sql
CREATE DATABASE quantum_safe_transfer;
```

Verify that the database exists:

```sql
\l
```

You should see:

```text
quantum_safe_transfer
```

---

# 8. Backend Configuration

The backend requires database and security configuration.

Do **not** commit real passwords, database credentials, or JWT secrets to GitHub.

Configure the required environment variables according to the backend configuration.

Example development configuration:

```text
DB_URL=jdbc:postgresql://localhost:5432/quantum_safe_transfer
DB_USERNAME=postgres
DB_PASSWORD=YOUR_POSTGRES_PASSWORD
JWT_SECRET=YOUR_DEVELOPMENT_JWT_SECRET
```

Replace:

```text
YOUR_POSTGRES_PASSWORD
```

with your local PostgreSQL password.

Use a different development JWT secret on your own machine.

---

# 9. Start the Backend

Open a terminal.

```bash
cd backend
```

Build the backend:

```bash
mvn clean install
```

Run the Spring Boot application:

```bash
mvn spring-boot:run
```

If Maven Wrapper is available on Windows:

```bash
mvnw.cmd spring-boot:run
```

On Linux/macOS:

```bash
./mvnw spring-boot:run
```

The backend should run on:

```text
http://localhost:8080
```

---

# 10. Backend Authentication APIs

The current authentication APIs are:

## Register

```text
POST /api/v1/auth/register
```

Example request:

```json
{
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "email": "john@example.com",
  "password": "Password123"
}
```

---

## Login

```text
POST /api/v1/auth/login
```

Example request:

```json
{
  "email": "john@example.com",
  "password": "Password123"
}
```

The login response contains an access token:

```json
{
  "userId": "...",
  "firstName": "...",
  "lastName": "...",
  "username": "...",
  "email": "...",
  "role": "USER",
  "accessToken": "...",
  "message": "..."
}
```

---

## Current User

```text
GET /api/v1/users/me
```

This endpoint requires:

```http
Authorization: Bearer <accessToken>
```

Example response:

```json
{
  "userId": "...",
  "firstName": "...",
  "lastName": "...",
  "username": "...",
  "email": "...",
  "role": "USER",
  "status": "ACTIVE"
}
```

---

# 11. Start the Frontend

Open another terminal.

From the project root:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Start the Vite development server:

```bash
npm run dev
```

The frontend normally runs on:

```text
http://localhost:5173
```

Open the displayed Vite URL in your browser.

---

# 12. Frontend Authentication Flow

The frontend authentication flow is:

```text
Landing Page
     │
     ▼
Register
     │
     ▼
Login
     │
     ▼
POST /api/v1/auth/login
     │
     ▼
Receive JWT
     │
     ▼
Store authentication state
     │
     ▼
GET /api/v1/users/me
     │
     ▼
Authenticated User
     │
     ▼
Dashboard
```

Protected requests automatically include:

```http
Authorization: Bearer <JWT>
```

---

# 13. Protected Routes

The frontend protects authenticated pages.

Examples:

```text
/dashboard
/send-file
/received-files
/history
/crypto
/profile
/settings
```

If an unauthenticated user attempts to access a protected route, the frontend redirects them to:

```text
/auth
```

---

# 14. Logout

Logout clears the frontend authentication state and removes the stored access token.

After logout, protected routes should no longer be accessible.

---

# 15. Current Frontend Pages

The frontend currently contains pages for:

```text
Landing
Authentication
Dashboard
Send File
Received Files
Transfer History
Crypto Details
Profile
Settings
```

The file-transfer pages are currently UI implementations and will be connected to the backend as the corresponding APIs are implemented.

---

# 16. Cryptographic Architecture

The planned cryptographic workflow is:

```text
                FILE
                  │
                  ▼
           Generate/Establish
             Secure Key
                  │
                  ▼
              ML-KEM
                  │
                  ▼
           AES-256-GCM
                  │
                  ▼
          Encrypted File
                  │
                  ▼
              ML-DSA
                  │
                  ▼
          Digital Signature
                  │
                  ▼
             SHA3-256
                  │
                  ▼
        Integrity Fingerprint
                  │
                  ▼
           Secure Transfer
```

The exact implementation will be handled by the backend cryptographic module.

---

# 17. Security Requirements

The application follows several important security principles.

## JWT Authentication

Protected API requests require a valid JWT.

```http
Authorization: Bearer <JWT>
```

## Password Security

Passwords are stored using BCrypt hashing.

Plain-text passwords must never be stored in the database.

## Secret Cryptographic Material

The normal UI must never display:

* AES encryption keys
* ML-KEM shared secrets
* private signing keys
* sensitive cryptographic parameters
* other secret key material

The application may display non-sensitive cryptographic proof such as:

* Algorithm name
* Key size
* SHA3-256 fingerprint
* Signature verification status
* Encryption/decryption status
* Execution time
* Verification result

---

# 18. Error Handling

The frontend handles common authentication/API errors including:

### 401 Unauthorized

Possible causes:

* Invalid credentials
* Expired/invalid JWT
* Missing authentication token

### 403 Forbidden

Possible cause:

* Authenticated user does not have permission to access the resource.

### Network Error

Possible causes:

* Backend is not running
* Incorrect backend URL
* CORS configuration issue
* Network connection problem

### Backend Unavailable

Make sure the Spring Boot server is running on:

```text
http://localhost:8080
```

---

# 19. Running the Complete Project

You need two terminals.

## Terminal 1 — Backend

```bash
cd QuantumSafeFileTransfer/backend
mvn spring-boot:run
```

Backend:

```text
http://localhost:8080
```

---

## Terminal 2 — Frontend

```bash
cd QuantumSafeFileTransfer/frontend
npm install
npm run dev
```

Frontend:

```text
http://localhost:5173
```

---

# 20. Basic Testing Flow

After starting both servers:

### Step 1 — Open the frontend

```text
http://localhost:5173
```

### Step 2 — Register

Create a new account.

### Step 3 — Login

Use the registered email and password.

### Step 4 — Authentication

The backend returns a JWT.

### Step 5 — Current User

The frontend requests:

```text
GET /api/v1/users/me
```

using the JWT.

### Step 6 — Dashboard

The authenticated user's information should be displayed.

### Step 7 — Protected Route

Try:

```text
http://localhost:5173/dashboard
```

without being logged in.

You should be redirected to the authentication page.

### Step 8 — Logout

Logout from the application.

### Step 9 — Protected Route Again

Try accessing:

```text
http://localhost:5173/dashboard
```

The route should no longer be accessible.

---

# 21. Git Workflow for Team Members

Before starting work:

```bash
git checkout <your-branch>
git pull origin <your-branch>
```

After making changes:

```bash
git status
```

Stage changes:

```bash
git add .
```

Commit:

```bash
git commit -m "feat(frontend): describe your changes"
```

Push:

```bash
git push origin <your-branch>
```

Before starting new work, pull the latest changes from the shared branch to reduce merge conflicts.

---

# 22. Important Files

| File                                              | Purpose                           |
| ------------------------------------------------- | --------------------------------- |
| `frontend/package.json`                           | Frontend dependencies and scripts |
| `frontend/package-lock.json`                      | Exact npm dependency versions     |
| `backend/pom.xml`                                 | Backend dependencies              |
| `frontend/src/api/`                               | API client/service layer          |
| `frontend/src/context/AuthContext.jsx`            | Authentication state              |
| `frontend/src/components/auth/LoginForm.jsx`      | Login UI                          |
| `frontend/src/components/auth/RegisterForm.jsx`   | Registration UI                   |
| `frontend/src/components/auth/ProtectedRoute.jsx` | Protected frontend routes         |
| `frontend/src/routes/AppRoutes.jsx`               | Application routing               |
| `backend/src/main/`                               | Spring Boot backend               |
| `README.md`                                       | Project setup and documentation   |

---

# 23. Environment and Secret Management

Never commit sensitive values such as:

```text
Database passwords
JWT secrets
Private keys
AES keys
ML-KEM shared secrets
ML-DSA private keys
API credentials
```

Use environment variables or local configuration files that are excluded from Git.

If a local environment file is used, make sure it is included in `.gitignore`.

Example:

```text
.env
.env.local
application-local.yml
```

Only commit safe example configuration files such as:

```text
.env.example
```

with placeholder values.

---

# 24. Troubleshooting

## Frontend does not start

Run:

```bash
npm install
npm run dev
```

If dependencies are corrupted:

```bash
rm -rf node_modules
npm install
```

On Windows PowerShell:

```powershell
Remove-Item -Recurse -Force node_modules
npm install
```

---

## Backend does not start

Check:

```bash
java -version
mvn -version
```

Make sure Java 21 is being used.

Also verify PostgreSQL is running.

---

## Database connection fails

Check:

```text
Database name
PostgreSQL username
PostgreSQL password
Database port
Environment variables
```

The expected database is:

```text
quantum_safe_transfer
```

---

## CORS error

Make sure the backend allows the frontend development origin:

```text
http://localhost:5173
```

Do not solve CORS by disabling browser security.

---

## Login returns 401

Check:

```text
Email
Password
User exists in PostgreSQL
Backend is running
```

---

## Protected endpoint returns 401

Check that the frontend sends:

```http
Authorization: Bearer <accessToken>
```

Also verify that the JWT has not expired or been invalidated.

---

# 25. Current Development Status

## Completed

* [x] Spring Boot backend setup
* [x] PostgreSQL integration
* [x] User registration API
* [x] User login API
* [x] BCrypt password hashing
* [x] JWT generation
* [x] JWT authentication filter
* [x] Protected backend endpoint
* [x] `/api/v1/users/me`
* [x] React frontend
* [x] Frontend API service layer
* [x] Login integration
* [x] Registration UI
* [x] Authentication context
* [x] Protected frontend routes
* [x] Logout
* [x] Dashboard UI
* [x] Send File UI
* [x] Receive Files UI
* [x] Transfer History UI
* [x] Profile UI
* [x] Crypto Details UI

## In Progress / Planned

* [ ] Backend File Transfer APIs
* [ ] Secure file upload
* [ ] Secure file download
* [ ] AES-256-GCM implementation
* [ ] ML-KEM integration
* [ ] ML-DSA integration
* [ ] SHA3-256 file hashing
* [ ] Digital signature verification
* [ ] End-to-end encrypted file transfer
* [ ] Cryptographic execution metrics
* [ ] Final security testing

---

# 26. Important Development Rule

The frontend must integrate with the existing backend APIs.

Do **not**:

* Create mock authentication
* Create fake JWT tokens
* Replace the existing authentication API
* Change backend endpoint names unnecessarily
* Hardcode fake user data for authentication
* Display real secret cryptographic keys
* Implement cryptographic algorithms only in the frontend when they belong in the backend

Frontend UI should consume real backend responses.

---

# 27. Project Goal

The final system aims to provide:

```text
                QUANTUM-SAFE FILE TRANSFER
                         │
        ┌────────────────┼────────────────┐
        │                │                │
        ▼                ▼                ▼
   Authentication   File Security    Integrity
        │                │                │
       JWT          AES-256-GCM       SHA3-256
        │                │
        │             ML-KEM
        │                │
        │             ML-DSA
        │                │
        └────────────────┼────────────────┘
                         │
                         ▼
               Secure File Transfer
```

The objective is to demonstrate how **hybrid classical + post-quantum cryptography** can be incorporated into a secure file-transfer application.

---

# 28. Team Development

Each team member should:

1. Pull the latest changes before starting work.
2. Work on their assigned Git branch.
3. Avoid modifying another member's module unnecessarily.
4. Test the application locally before pushing.
5. Commit changes with meaningful commit messages.
6. Push the branch regularly.
7. Resolve merge conflicts carefully.
8. Never commit passwords, secrets, private keys, or generated build files.

---

# 29. Quick Start

For an already-configured development machine:

```bash
# Clone
git clone <YOUR_GITHUB_REPOSITORY_URL>

# Backend
cd QuantumSafeFileTransfer/backend
mvn spring-boot:run

# Open another terminal

# Frontend
cd QuantumSafeFileTransfer/frontend
npm install
npm run dev
```

Then open:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:8080
```

---

## License

This project is developed as a **Final Year Engineering Project** for academic and educational purposes.
