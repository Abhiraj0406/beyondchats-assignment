# BeyondChats -- Gmail Integration Dashboard

Author: **Abhiraj Vishwakarma**

## Project Overview

This project is a responsive dashboard that allows users to connect
their Gmail account, sync email conversations, and reply to threads
directly from a unified chat-style interface.

Although the assignment specifies **ReactJS**, the frontend is
implemented using **React with TypeScript (React + TS)** to improve type
safety, maintainability, and scalability of the codebase.

The backend is built with **Laravel** as required.

------------------------------------------------------------------------

## Tech Stack

### Frontend

-   ReactJS with TypeScript
-   Axios
-   React Router
-   TailwindCSS / CSS

### Backend

-   Laravel
-   Gmail API
-   Laravel Socialite (Google OAuth)
-   MySQL

### Tools

-   Node.js
-   Composer
-   Google Cloud Console

------------------------------------------------------------------------

## Features

### 1. Gmail Account Integration

Users can securely connect their Gmail account using Google OAuth
authentication.

Flow: 1. User clicks **Connect Gmail** 2. Redirects to Google OAuth 3.
User grants permission 4. Access token is stored securely 5. Gmail API
becomes accessible

------------------------------------------------------------------------

### 2. Email Synchronization

After connecting Gmail, users select how many days of emails they want
to sync.

Example: Sync emails from last **7 days**

The backend fetches emails using Gmail API and stores them in the
database.

Stored Data: - Email threads - Sender and receiver details - Subject -
HTML formatted email body - Attachments - Timestamp

------------------------------------------------------------------------

### 3. Chat Style Email Interface

Emails are displayed in a **chat-style conversation interface**.

Each thread shows: - Complete email conversation - Sender & receiver -
Attachments - Reply option

------------------------------------------------------------------------

### 4. Reply to Email Threads

Users can reply to email threads directly from the dashboard.

Flow: User → Write Reply → API Request → Laravel Backend → Gmail API →
Send Email

------------------------------------------------------------------------

### 5. Fully Responsive Design

The UI is designed to work seamlessly across:

-   Mobile devices
-   Tablets
-   Desktop

The project follows a **mobile-first design approach**.

------------------------------------------------------------------------

## System Architecture

React (TypeScript) Frontend → Laravel API → Gmail API\
↓\
Database

------------------------------------------------------------------------

## Data Flow

### Gmail Connection Flow

User\
↓\
Connect Gmail\
↓\
Google OAuth\
↓\
Access Token Generated\
↓\
Stored in Backend

------------------------------------------------------------------------

### Email Sync Flow

User selects sync days\
↓\
Frontend API Request\
↓\
Laravel Backend\
↓\
Fetch emails from Gmail API\
↓\
Store in Database\
↓\
Return email threads to frontend

------------------------------------------------------------------------

### Reply Flow

User writes reply\
↓\
Frontend API request\
↓\
Laravel backend\
↓\
Gmail API sends message\
↓\
Thread updated

------------------------------------------------------------------------

## Database Design (Simplified)

### Users

-   id
-   email
-   google_id
-   access_token

### Email Threads

-   id
-   thread_id
-   subject
-   snippet
-   created_at

### Emails

-   id
-   thread_id
-   sender
-   receiver
-   body_html
-   attachments
-   sent_at

------------------------------------------------------------------------

## Local Setup Instructions

### 1. Clone Repository

git clone https://github.com/Abhiraj0406/beyondchats-assignment.git\
cd beyondchats-dashboard

------------------------------------------------------------------------

## Backend Setup (Laravel)

Install dependencies

composer install

Create environment file

cp .env.example .env

Update database configuration in `.env`

Generate application key

php artisan key:generate

Run migrations

php artisan migrate

Start backend server

php artisan serve

Backend will run at:

http://127.0.0.1:8000

------------------------------------------------------------------------

## Frontend Setup (React + TypeScript)

Navigate to frontend directory

cd frontend

Install dependencies

npm install

Start development server

npm run dev

App runs at:

http://localhost:5173

------------------------------------------------------------------------

## Google OAuth Setup

1.  Go to Google Cloud Console
2.  Create a new project
3.  Enable Gmail API
4.  Create OAuth credentials
5.  Add redirect URI:

http://localhost:8000/auth/google/callback

6.  Add credentials to `.env`

GOOGLE_CLIENT_ID=\
GOOGLE_CLIENT_SECRET=\
GOOGLE_REDIRECT_URI=

------------------------------------------------------------------------

## Evaluation Criteria Covered

-   Gmail Integration
-   Email Sync System
-   Chat-style email interface
-   Reply functionality
-   Mobile responsive UI
-   Clean project architecture
-   Proper documentation

------------------------------------------------------------------------

## Author

**Abhiraj Vishwakarma**\
Full Stack Developer
