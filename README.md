# Online Judge System

A scalable competitive programming and automated code evaluation platform inspired by platforms like LeetCode, Codeforces, and CodeChef.

## Overview

The Online Judge System allows users to:

* Solve programming problems
* Submit code in multiple languages
* Receive automated verdicts
* Participate in contests
* View leaderboards and submission history

The platform is built using the MERN stack with PostgreSQL, MinIO object storage, Docker-based sandbox execution, and Kafka-driven asynchronous evaluation.

---

# High Level Architecture Diagram

```text id="n4x8vt"
                                 ┌────────────────────┐
                                 │    React Client    │
                                 │  Web / Frontend    │
                                 └─────────┬──────────┘
                                           │
                                  HTTPS / REST APIs
                                           │
                                           ▼
                          ┌────────────────────────────────┐
                          │        Express.js API          │
                          │ Authentication + Controllers   │
                          └──────────────┬─────────────────┘
                                         │
          ┌──────────────────────────────┼──────────────────────────────┐
          │                              │                              │
          ▼                              ▼                              ▼

┌──────────────────┐        ┌────────────────────┐        ┌──────────────────┐
│   PostgreSQL     │        │       Redis        │        │      MinIO       │
│ Relational DB    │        │  Cache Layer       │        │ Object Storage   │
└────────┬─────────┘        └─────────┬──────────┘        └────────┬─────────┘
         │                            │                             │
         │                            │                             │
         │                    Leaderboard Cache              Test Cases
         │                    Session Storage                Submission Files
         │                    Recent Submissions             Problem Assets
         │                                                  Execution Logs
         │
         ▼
┌──────────────────────────────┐
│        Apache Kafka          │
│      submission-jobs         │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Evaluation Workers      │
│  Kafka Consumers (Node.js)   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│      Docker Sandboxes        │
│ Isolated Secure Containers   │
│  C++ / Java / Python / Go    │
└──────────────────────────────┘
```

---

# Submission Flow Diagram

```text id="t2v6rm"
User
 │
 │ Submit Code
 ▼
React Frontend
 │
 ▼
Express.js API
 │
 ├── Save metadata in PostgreSQL
 │
 ├── Upload source file to MinIO
 │
 └── Publish event to Kafka
                │
                ▼
        Kafka Queue
                │
                ▼
      Evaluation Worker
                │
                ├── Fetch code from MinIO
                ├── Fetch test cases from MinIO
                ├── Start Docker container
                ├── Compile and execute
                └── Generate verdict
                           │
                           ▼
              PostgreSQL updated
                           │
                           ▼
               Logs uploaded to MinIO
                           │
                           ▼
                 Client polls result
```

---

# Tech Stack

## Frontend

* React.js
* Monaco Editor
* JWT Authentication

## Backend

* Node.js
* Express.js

## Database

* PostgreSQL

## Object Storage

* MinIO (S3-compatible storage)

## Messaging Queue

* Apache Kafka

## Cache

* Redis

## Sandbox & Execution

* Docker Containers

---

# Features

## User Management

* User registration and login
* JWT-based authentication
* User profile management
* Submission history

## Problem Management

* Browse coding problems
* Difficulty levels
* Practice and contest problems
* Markdown-based statements

## Code Submission

* Multi-language support:

  * C++
  * Java
  * Python
  * Go
* File upload support
* Automated evaluation

## Verdict System

* Accepted (AC)
* Wrong Answer (WA)
* Time Limit Exceeded (TLE)
* Memory Limit Exceeded (MLE)
* Runtime Error (RE)
* Compilation Error (CE)

## Leaderboard

* Contest rankings
* Score tracking
* Recent submissions

## Secure Sandbox Execution

* Docker-based isolation
* CPU and memory limits
* Read-only filesystem
* No network access

---

# Why PostgreSQL?

PostgreSQL is used for structured relational data because it provides:

* Strong ACID compliance
* Reliable transactions
* Efficient joins
* Better consistency for contests and leaderboards
* Advanced indexing support

---

# Why MinIO?

MinIO is used for scalable object/file storage.

The Online Judge System stores:

* Problem attachments
* Input/output test case files
* Uploaded source code files
* Execution logs
* User profile images

MinIO provides:

* S3-compatible APIs
* High-performance storage
* Bucket-based organization
* Easy Docker deployment
* Presigned URL support

---

# Suggested MinIO Buckets

| Bucket         | Purpose                      |
| -------------- | ---------------------------- |
| problem-assets | Problem images and PDFs      |
| testcases      | Input/output test case files |
| submissions    | Uploaded source code         |
| logs           | Execution logs               |
| profiles       | User profile pictures        |

---

# Submission Workflow

1. User submits code
2. API validates request
3. Submission metadata stored in PostgreSQL
4. Source code uploaded to MinIO
5. Job pushed to Kafka
6. Worker consumes submission
7. Docker container created
8. Test cases fetched from MinIO
9. Code compiled and executed
10. Output compared with expected output
11. Verdict updated in PostgreSQL
12. Logs uploaded to MinIO
13. Client polls and displays result

---

# API Endpoints

## Authentication

### Register

```http id="r5k2tx"
POST /auth/register
```

### Login

```http id="b3n8vf"
POST /auth/login
```

---

## Problems

### Get All Problems

```http id="q2d4lm"
GET /problems
```

### Get Problem Details

```http id="h7x1pc"
GET /problems/:id
```

---

## Submissions

### Submit Code

```http id="w1u9ra"
POST /submissions
```

### Get Submission Result

```http id="m8s2yd"
GET /submissions/:id
```

### Recent Submissions

```http id="f6v0jk"
GET /submissions/recent
```

---

## User

### Current User Profile

```http id="g2k8oq"
GET /users/me
```

---

## Leaderboard

### Contest Leaderboard

```http id="n1p4zt"
GET /leaderboard/:contestId
```

---

# Database Design

## users

| Column     | Type      | Description            |
| ---------- | --------- | ---------------------- |
| id         | UUID      | Primary Key            |
| username   | VARCHAR   | Unique username        |
| email      | VARCHAR   | Unique email           |
| password   | TEXT      | bcrypt hashed password |
| full_name  | VARCHAR   | User full name         |
| dob        | DATE      | Date of birth          |
| created_at | TIMESTAMP | Account creation time  |

---

## problems

| Column          | Type      | Description                |
| --------------- | --------- | -------------------------- |
| id              | UUID      | Primary Key                |
| title           | VARCHAR   | Problem title              |
| code            | VARCHAR   | Unique problem code        |
| statement       | TEXT      | Markdown problem statement |
| difficulty      | VARCHAR   | Easy / Medium / Hard       |
| time_limit_ms   | INTEGER   | Execution limit            |
| memory_limit_mb | INTEGER   | Memory limit               |
| asset_url       | TEXT      | MinIO object URL           |
| created_at      | TIMESTAMP | Creation timestamp         |

---

## test_cases

| Column          | Type    | Description            |
| --------------- | ------- | ---------------------- |
| id              | UUID    | Primary Key            |
| problem_id      | UUID    | FK → problems.id       |
| input_file_url  | TEXT    | MinIO input file       |
| output_file_url | TEXT    | MinIO output file      |
| is_hidden       | BOOLEAN | Hidden during contests |

---

## submissions

| Column         | Type      | Description         |
| -------------- | --------- | ------------------- |
| id             | UUID      | Primary Key         |
| user_id        | UUID      | FK → users.id       |
| problem_id     | UUID      | FK → problems.id    |
| language       | VARCHAR   | cpp/java/python/go  |
| code_file_url  | TEXT      | MinIO source file   |
| verdict        | VARCHAR   | AC/WA/TLE/MLE/RE/CE |
| execution_ms   | INTEGER   | Execution time      |
| memory_used_mb | INTEGER   | Memory usage        |
| logs_url       | TEXT      | MinIO execution log |
| submitted_at   | TIMESTAMP | Submission time     |

---

# Docker Sandbox Constraints

| Constraint      | Value     |
| --------------- | --------- |
| CPU Limit       | 1 vCPU    |
| Memory Limit    | 256 MB    |
| Network Access  | Disabled  |
| Filesystem      | Read-only |
| User Privileges | Non-root  |
| PID Limit       | 50        |

---

# Scalability Features

* Kafka-based asynchronous processing
* Horizontal worker scaling
* Redis caching
* Stateless REST APIs
* Docker container isolation
* S3-compatible object storage using MinIO

---

# Security

* JWT Authentication
* Sandboxed execution
* No internet access inside containers
* Read-only container filesystem
* Resource isolation using cgroups
* Isolated object storage buckets
* Presigned URLs for secure file access

---

# Running the Project

## Clone Repository

```bash id="y4r9tw"
git clone https://github.com/Nishanth307/Online-Judge
cd online-judge-system
```

---

## Install Dependencies

### Backend

```bash id="z8p1lv"
cd backend
npm install
```

### Frontend

```bash id="j5x3qe"
cd frontend
npm install
```

---

# Start Infrastructure

## PostgreSQL

```bash id="v2n6am"
docker run -d \
  --name postgres \
  -e POSTGRES_USER=admin \
  -e POSTGRES_PASSWORD=password \
  -e POSTGRES_DB=online_judge \
  -p 5432:5432 \
  postgres
```

---

## MinIO

```bash id="q7f1kc"
docker run -d \
  --name minio \
  -p 9000:9000 \
  -p 9001:9001 \
  -e MINIO_ROOT_USER=admin \
  -e MINIO_ROOT_PASSWORD=password123 \
  -v ~/minio-data:/data \
  quay.io/minio/minio server /data --console-address ":9001"
```

### MinIO Console

```text id="u4k2dt"
http://localhost:9001
```

### MinIO API Endpoint

```text id="r9w5lx"
http://localhost:9000
```

---

## Redis

```bash id="x3m8qp"
docker run -d -p 6379:6379 redis
```

---

## Kafka

```bash id="t7j4ns"
docker compose up kafka
```

---

# Start Backend

```bash id="k2v5ba"
npm run dev
```

---

# Start Frontend

```bash id="m7c1yo"
npm start
```

---

# Example Environment Variables

```env id="p6s9wr"
PORT=5000

DATABASE_URL=postgresql://admin:password@localhost:5432/online_judge

JWT_SECRET=your_jwt_secret

KAFKA_BROKER=localhost:9092

REDIS_HOST=localhost
REDIS_PORT=6379

MINIO_ENDPOINT=localhost
MINIO_PORT=9000
MINIO_ACCESS_KEY=admin
MINIO_SECRET_KEY=password123
MINIO_BUCKET=submissions
```

---

# Example MinIO Integration (Node.js)

## Install Dependency

```bash id="w8n3kd"
npm install minio
```

---

## MinIO Client

```javascript id="h5p2za"
const Minio = require('minio');

const minioClient = new Minio.Client({
  endPoint: 'localhost',
  port: 9000,
  useSSL: false,
  accessKey: 'admin',
  secretKey: 'password123'
});

module.exports = minioClient;
```

---

## Upload File Example

```javascript id="f1r6mc"
await minioClient.fPutObject(
  'submissions',
  'solution.cpp',
  '/tmp/solution.cpp'
);
```

---

# Future Enhancements

* Kubernetes deployment
* Auto-scaling worker nodes
* WebSocket-based live verdicts
* Distributed object storage
* CDN integration for assets
* Multi-region deployment

---

# Non-Functional Requirements

| Requirement            | Target  |
| ---------------------- | ------- |
| Concurrent Submissions | 1000+   |
| Evaluation Latency     | < 5s    |
| API Response Time      | < 200ms |
| Availability           | 99.9%   |

---

# Project Goals

* Scalable architecture
* Secure execution environment
* Fast verdict generation
* High availability
* Contest-ready infrastructure

---
