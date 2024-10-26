# Taxi Transfers Service

This project leverages **Vue.js** for the frontend, **.NET** for the backend API, **GraphQL** for querying, and **MongoDB Atlas** for data storage. With Docker, you can easily set up and run the entire stack locally.

## Getting Started

### Prerequisites
1. **Docker Desktop**: Install [Docker Desktop](https://www.docker.com/products/docker-desktop/) for Mac or Windows to use Docker Compose.

### Installation

1. **Clone the Repository**
   - Clone this repository to your local machine.

2. **Build and Run the App**
   - In the project root directory, run the following command to build and run the app:

   ```bash
   docker compose up

### Alternative Setup

Alternatively, you can pull the Docker images directly from Docker Hub:

- **Backend Service**  
  ```bash
  docker pull ahmedbichiou/vuejs-net-taxiservice-graphqltaxibackend:latest
- **FrontEnd Service**  
  ```bash
  docker pull ahmedbichiou/vuejs-net-taxiservice-frontend:latest
 
And run them with 
- **Backend Container**  
  ```bash
  docker run -d -p 5000:80 --name graphqltaxibackend ahmedbichiou/vuejs-net-taxiservice-graphqltaxibackend:latest
- **FrontEnd Container**  
  ```bash
  docker run -d -p 3000:80 --name frontend -e VUE_APP_API_URL=http://localhost:5000 ahmedbichiou/vuejs-net-taxiservice-frontend:latest

