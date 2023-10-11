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

2. Install packages for both client and server folders:

    ```bash
   cd client/
   npm install

3. Open other terminal

   ```bash
   cd server/
   npm install
