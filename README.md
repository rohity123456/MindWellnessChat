# Mind Wellness Chat 
### A chat application built using socket.io, node, and React in TypeScript. It utilizes MongoDB as the database.

 Features:
 - Real-time chat functionality.
 - Chat room creation and management
 - Message history and retrieval
 - Emojis support
 - User online status
 - User authentication and authorization

 ### Steps to run the project in your local machine:
 1. Clone the repository to your local machine.
 2. Install the necessary dependencies by running `npm install` for both frontend and backend repositories.
 3. Set up a MongoDB database and configure the connection in the project.
 4. Create a `.env` file in the `backend` directory and add the following environment variables:
    ```
    PORT=8000
    SOCKET_PORT=8080
    DB_URI=mongodb://localhost:27017/mindWellnessChat
    CLIENT_URL=http://localhost:3000
    ```
 5. Create a `.env` file in the `frontend` directory and add the following environment variables:
    ```
    REACT_APP_API_URL=http://localhost:8000/api/v1
    REACT_APP_SOCKET_URL=http://localhost:8080
    ```
 4. Start the `backend server` by running `npm start` in the `backend` directory.
 5. Start the `React Frontend` by running `npm start` in the `frontend` directory.
 6. Access the application in your browser at `http://localhost:3000`.

 ### Additional Information:
 - The server code can be found in the `backend` directory.
 - The client code can be found in the `frontend` directory.


## Contact
- [Linkedin](https://www.linkedin.com/in/rohit-yadav-sde/)
- [Github](https://github.com/rohity123456)
- [Email](mailto:rohity123456@gmail.com)
