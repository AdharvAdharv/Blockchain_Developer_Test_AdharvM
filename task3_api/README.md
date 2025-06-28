# 📦 Crowdfunding API (Task 2)

A Node.js + Express REST API to store and retrieve crowdfunding campaign metadata. Data is persisted in MongoDB, and the whole service is containerized with Docker.

---


### ✅ POST /campaigns
![Post Campaign Success](Screenshot/Add%20Campaign.png)

### POST /campaigns
![Post Campaign Error](Screenshot/Post%20Error.png)

### ✅ GET /campaigns
![Get Campaigns Success](Screenshot/Get%20Campaign.png)

###  GET /campaigns
![Get Campaigns Empty](Screenshot/Empty%20Campaign.png)

## 🚀 Setup Instructions

1️⃣ Install dependencies:

```bash
npm install
```
2️⃣ Create a .env file:

```bash

MONGO_URI=mongodb://localhost:27017/crowdfunding
```

3️⃣ Run locally:


```bash
nodemon server.js
```

4️⃣ Or via Docker Compose:

```bash
docker compose up --build
```

## 📑 API Endpoints
POST /campaigns
➝ Create a new campaign with a unique ID, title, and description.

## GET /campaigns
➝ Retrieve all available campaigns.

## ✅ Test Cases Covered
Test Case	Description	Expected Result
POST /campaigns success	Submit valid title & description	Campaign created & returned
POST /campaigns error	Submit request missing title or description	400 error with validation message
GET /campaigns success	Retrieve campaigns when database has campaigns	Array of campaigns returned
GET /campaigns empty	Retrieve when no campaigns exist in the database	Empty array returned


## 📦 Docker Usage
Build and run the API and MongoDB containers:

```bash
docker compose up --build
```

Stop containers:

```bash
docker compose down
```
