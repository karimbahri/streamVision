# StreamVision

StreamVision is a modern web application for streaming movies and TV shows, designed to provide an immersive and seamless entertainment experience. It is built using Node.js and PostgreSQL for the backend, utilizing GraphQL for efficient data querying and React.js with pure CSS for the frontend. We've also integrated Apollo Client for smooth communication between the frontend and backend, and Supabase for data storage.

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Movie and TV Show Streaming:** StreamVision allows users to stream their favorite movies and TV shows with ease. Enjoy a wide variety of content, from classics to the latest releases.

- **User Authentication:** Users can create accounts, sign in, change password if forgotten using Email authentication and upload movies as an admin user. StreamVision ensures a secure and personalized experience.

- **Search and Filter:** Easily find content with a powerful search and filter functionality.

- **User-friendly Interface:** The application boasts a sleek and intuitive user interface for an enjoyable streaming experience.

## Technologies & Tools

-  Typescript, ReactJs, Vite, Redux, Apollo-client.
-  NodeJs, Express, GraphQl, Typeorm.
-  Postgres, Supabase.

## Getting Started

Follow these instructions to set up StreamVision locally for development or testing purposes.

### Prerequisites

Before you begin, ensure you have the following prerequisites installed on your system:

- [Node.js](https://nodejs.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [Supabase](https://supabase.io/) account for user authentication and data storage

In this project, i opted for a hosted managed PostgreSQL service [ElephantSQL](https://www.elephantsql.com/) for instance.

### Installation

1. Clone the StreamVision repository to your local machine:

   ```bash
   git clone https://github.com/yourusername/strreamvision.git

2. Docker Setup:

   Ensure you have Docker installed on your local machine. If not, you can download and install it from [Docker's official website](https://docs.docker.com/engine/install/).

3. Configuration
  
  - Navigate to the project directory:

    ```bash
    cd streamVision/

  - Switch to streamVision--local-db branch:
    ```bash
    git checkout streamVision--local-db

  - open docker-compose.yaml and replace the variables with your supabase credentials:
    ```bash
        environment:
      - VITE_SUPABASE_KEY=supabasekey_here
      - VITE_SUPABASE_URL=supabaseurl_here
      - VITE_CDN_URL=cdnurl_here
    

5. Run with Docker Compose
   
   ```bash
     docker-compose up
   ```
    This will build and start the necessary Docker containers for both the frontend, backend and database.
    Once the process is complete, you can access the application at http://localhost:5173.

6. Create admin user for more privileges

   - Open the graphQl interface through http://localhost:8080 and paste the following code:

     ```bash
        mutation {
         createUser(userName:"admin", password:"2)2TA3Ji0iK\X6Nj", passwordConfirmation: "2)2TA3Ji0iK\X6Nj", fullName: "admin admin", birthday:"1990-01-01", email: "admin@streamvision.com", isAdmin: true) {
           userName,
           email,
           isAdmin
           }
        }
