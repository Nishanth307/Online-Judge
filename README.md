# Online Judge System — High Level Design (HLD)

## 1. Overview

### Purpose

The Online Judge System is a scalable competitive programming platform where users can solve coding problems, submit solutions, and receive automated verdicts after execution against hidden test cases.

The system is designed to support:

* High concurrent submissions
* Secure sandboxed code execution
* Multi-language compilation and execution
* Contest leaderboards
* Scalable asynchronous evaluation

---

## 2. High Level Architecture

```text
                                ┌───────────────────┐
                                │     Frontend      │
                                │   React Client    │
                                └─────────┬─────────┘
                                          │
                                          ▼
                                ┌───────────────────┐
                                │  Backend Service  │
                                │   Express.js API  │
                                └─────────┬─────────┘
                                          │
               ┌──────────────────────────┼──────────────────────────┐
               │                          │                          │
               ▼                          ▼                          ▼

      ┌────────────────┐       ┌────────────────┐       ┌────────────────┐
      │  MongoDB       │       │     Redis      │       │     MinIO      │
      │  Nosql database│       │     Cache      │       │ File Storage   │
      └────────────────┘       └────────────────┘       └────────────────┘
                                                              │
                                                              ▼
                                                   Store Source Code
                                                   Store Test Cases
                                                   Store Logs

                                          │
                                          ▼
                                ┌───────────────────┐
                                │   Apache Kafka    │
                                │ submission-jobs   │
                                └─────────┬─────────┘
                                          │
                                          ▼
                                ┌───────────────────┐
                                │ Evaluation Worker │
                                │ Kafka Consumers   │
                                └─────────┬─────────┘
                                          │
                                          ▼
                                ┌───────────────────┐
                                │ Docker Sandbox    │
                                │ Secure Execution  │
                                └───────────────────┘
```

---

## 3. Core Components

### Frontend

Responsible for:

* User registration/login
* Problem listing
* Code editor
* Submission history
* Leaderboard
* Contest participation

Tech:

* React.js
* Monaco Editor

---

### Backend Service

Handles:

* Authentication
* API routing
* Submission processing
* JWT validation
* Problem APIs
* Contest APIs

Tech:

* Node.js
* Express.js

---

### PostgreSQL

Stores relational data:

* Users
* Problems
* Contests
* Submissions
* Verdicts
* Leaderboards

---

### Redis

Used for caching:

* User sessions
* Leaderboards
* Frequently accessed problems
* Recent submissions

---

### MinIO

Object storage service used for:

* Source code files
* Test case files
* Execution logs
* Problem assets

Buckets:

* submissions
* testcases
* logs
* problem-assets

---

### Kafka

Acts as asynchronous message queue.

Topic:

* submission-jobs

Benefits:

* Handles traffic spikes
* Decouples API and evaluation
* Improves scalability

---

### Evaluation Worker

Consumes Kafka jobs and:

* Downloads source code
* Downloads test cases
* Starts Docker containers
* Executes code
* Generates verdicts

---

### Docker Sandbox

Secure execution environment.

Features:

* CPU limits
* Memory limits
* Read-only filesystem
* No network access
* Non-root execution

---

## 4. Authentication Flow

```text
User
 │
 ▼
Register/Login
 │
 ▼
Backend Service
 │
 ├── Validate Credentials
 ├── Store User in PostgreSQL
 └── Generate JWT Token
            │
            ▼
      Return JWT
            │
            ▼
 Store Token in Client
```

JWT contains:

* userId
* expiry time

---

## 5. Submission Flow

```text
User
 │
 ▼
Select Problem
 │
 ▼
Write Code
 │
 ▼
Submit Solution
 │
 ▼
Backend API
 │
 ├── Store metadata in PostgreSQL
 ├── Upload source file to MinIO
 └── Push job to Kafka
                │
                ▼
         Evaluation Worker
                │
                ├── Fetch source file
                ├── Fetch test cases
                ├── Start Docker container
                ├── Compile code
                ├── Execute code
                └── Generate verdict
                           │
                           ▼
              Update PostgreSQL
                           │
                           ▼
                Upload logs to MinIO
                           │
                           ▼
                    Return Result
```

---

## 6. Database Design

### users

| Column     | Type      |
| ---------- | --------- |
| id         | UUID      |
| username   | VARCHAR   |
| email      | VARCHAR   |
| password   | TEXT      |
| created_at | TIMESTAMP |

---

### problems

| Column          | Type    |
| --------------- | ------- |
| id              | UUID    |
| title           | VARCHAR |
| statement       | TEXT    |
| difficulty      | VARCHAR |
| time_limit_ms   | INTEGER |
| memory_limit_mb | INTEGER |

---

### submissions

| Column         | Type      |
| -------------- | --------- |
| id             | UUID      |
| user_id        | UUID      |
| problem_id     | UUID      |
| language       | VARCHAR   |
| verdict        | VARCHAR   |
| execution_ms   | INTEGER   |
| memory_used_mb | INTEGER   |
| created_at     | TIMESTAMP |

---

## 7. MinIO Storage Design

| Bucket         | Purpose            |
| -------------- | ------------------ |
| submissions    | User source code   |
| testcases      | Input/output files |
| logs           | Execution logs     |
| problem-assets | Images/PDFs        |

---

## 8. Docker Sandbox Constraints

| Constraint   | Value     |
| ------------ | --------- |
| CPU Limit    | 1 vCPU    |
| Memory Limit | 256 MB    |
| Network      | Disabled  |
| Filesystem   | Read-only |
| User         | Non-root  |

---

## 9. Verdict Types

| Verdict | Description           |
| ------- | --------------------- |
| AC      | Accepted              |
| WA      | Wrong Answer          |
| TLE     | Time Limit Exceeded   |
| MLE     | Memory Limit Exceeded |
| RE      | Runtime Error         |
| CE      | Compilation Error     |

---

## 10. Scalability

### Horizontal Scaling

Evaluation workers can scale independently.

### Kafka Queue

Buffers high submission traffic during contests.

### Redis Cache

Reduces database load.

### Stateless APIs

Enables easy backend scaling.

---

## 11. Security

### Authentication

* JWT-based authentication

### Sandbox Isolation

* Docker containers per submission

### File Security

* Files stored in MinIO
* Presigned URLs

### Network Isolation

* No outbound internet inside containers

---

## 12. Non-Functional Requirements

| Requirement        | Target  |
| ------------------ | ------- |
| Concurrent Users   | 1000+   |
| Evaluation Latency | < 5s    |
| API Response Time  | < 200ms |
| Availability       | 99.9%   |

---

## 13. Future Enhancements

* Kubernetes deployment
* Auto-scaling workers
* WebSocket live verdicts
* Plagiarism detection
* Distributed MinIO storage
* Multi-region deployment

---

## 14. Technology Stack

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

# License

This project is for educational and learning purposes.

---

# Author

Platform Engineering Team
