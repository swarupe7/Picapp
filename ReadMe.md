
# PICAPP 

This repository contains the code for picApp, a web application for uploading pics using Node.js, Express,MongoDb and React.

## Table of Contents
- [Project Objective](#project-objective)
- [Prerequisites](#prerequisites)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Installation](#installation)
- [Database Schema](#database-schema)
- [API Endpoints](#api-endpoints)

## Project Objective
Create a simple web application that allows users to sign up, log in, and upload images. Implement basic authentication and authorization mechanisms to ensure secure access to user data.

## Prerequisites
Before setting up picapp, make sure you are aware of following prerequisites:
- [Node.js](https://nodejs.org/): Version 14 or higher
- [React.js](https://www.postgresql.org/): Version 12 or higher

## Project Structure
The project structure is organized as follows:
```
task-app/
├── Frontend # React application file key for UI.
├── Backend # Database connection and resolves backend queries.
└── README.md # Project documentation (this file)
```


## Getting Started
Follow these steps to set up and run the picapp:

### Installation
1. Clone the repository:
-git clone https://github.com/swarup/picapp.git
-cd frontend

2. Install dependencies:
-npm install

3. Similarly go to backend of picapp
-cd backend 
-npm install 

4. Start the application.
-Inorder to start Backend 
-node server.js

-Inorder to start Frontend
-npm start 


## Database Schema
The database schema consists of  table:

1. **Users Table:**
- `_id` (Primary Key): Uniquely identifies each user.
- `email`: User's Email.
- `password`: Encrypted to keep the secrets safe.

## API Endpoints
The following API endpoints are available:

### User Endpoints:
- `POST /api/signup`: Create a new user.
- `POST /api/login`: Get into application.
- `POST /api/upload`: Upload the photos.


## Pictures
![Screenshot 2024-02-13 053846](https://github.com/swarupe7/Picapp/assets/85427735/3a33c124-a24f-4843-aabc-bfe7f4b018b1)







