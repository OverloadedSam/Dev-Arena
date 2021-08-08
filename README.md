# Dev-Arena

This project is a Web app for developers where they can showcase their skills. Developers can interact with other developers on the platform by posting questions, solutions and Up or Down voting the post.

## Requirements

- `node >= 14.0.0`
- `npm >= 6.14.8`

## Usage

    $ git clone https://github.com/OverloadedSam/Dev-Arena.git

  2. Move to the below locations and run `npm install` from there

    $ cd Dev-Arena/
    $ cd Dev-Arena/frontend/
    $ cd Dev-Arena/backend/

  3. Install project dependencies (For both frontend and backend).

    $ npm install

## Configure App

You have to set the environment variables of your configuration before starting the server.

### 1. Config directory for root

Make a `/config` directory and inside this directory make config files for different environments e.g. `development.json`.

NOTE: This step is important for running scripts from the root of the project and set below properties in `development.json` or `default.json` file.

### 2. Config for backend API

Place a `config` i.e `development.json` or `default.json` file at `Dev-Arena/backend/` location and set following environment variables in the `json` file.

    {
      "mongoURI": (your_mongo_db_connection_string),
      "apiUrl": "/api",
      "salt": "10",
      "secret": (secret_for_json_web_token)
    }

### 3. Environment variables for frontend

Place a `.env` file at `Dev-Arena/frontend/` location and set following environment variables.

    REACT_APP_API_URL={backend_api_url} // e.g. http://localhost:8000/api/v1

## Running The Project

### Run backend (Node API)

    $ cd backend/ // got to backend directory
    $ npm start // run backend with hot reloading.

    // or you can run the backend with standard node command
    $ node server.js

### Run frontend (React app)

    $ cd frontend/ // got to frontend directory
    $ npm start

### Run frontend and backend from root folder

There are some scripts to run the project

    $ npm run server // simply run server without watching files.

    $ npm run backend  // run server with watching file changes.

    $ npm run client // run react development server

    $ npm run dev // run both backend server and frontend at the same time.

NOTE: `/config` directory must be present at the root of the project with appropriate `config files`while running scripts like `npm run dev` from the `root` of the project.
