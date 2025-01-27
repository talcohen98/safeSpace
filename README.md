# SafeSpace
#### QueenB X AppsFlyer - BeSafe Hackathon 2025

SafeSpace is a platform committed to raising awareness and providing resources for tackling difficult issues such as cyberbullying, sexual harassment, and eating disorders. Our mission is to foster a supportive community where individuals can find a safe environment to share their experiences and receive expert guidance. By connecting users with trusted professionals, we aim to empower everyone to take control of their journey toward healing and growth.

---

## Features

### Server-Side
- **User Management**: Handles user and expert registrations.
- **Content Management**: Manages questions and answers.
- **Admin Panel**: Allows admins to approve or reject experts. Only verified experts can provide advice. Admins can also re-approve previously rejected experts.
- **Email Notifications**: Notifies users when they submit a question, receive an expert’s response, or in other relevant scenarios.
- **Security**: Middleware ensures only authorized users can perform actions like posting comments or adding questions.

#### Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- Middleware

### Client-Side
- **HomePage**: Introduces the platform’s purpose and the experts.
- **AboutUs**: Introduces the team.
- **Expert Forum**: Displays a list of questions that can be filtered by category and keywords.
- **SingleQuestionPage**: Shows the complete details of a question along with its answers.
- **AnswerForm**: Allows logged-in users to submit answers; prompts non-logged-in users to log in.
- **Authentication**: LoginPage and SignupPage for user and expert registration, including fields specific to experts.
- **NotFoundPage**: A 404 page displayed when users navigate to non-existent routes.
- **Navigation**: Smooth routing using React Router.
- **Data Fetching**: Axios is used for secure and efficient API interactions.
- **Custom Hooks**: Manage authentication and session states for improved user experience.

#### Technologies
- React
- React Router
- Axios
- HTML
- CSS

---

## Installation

### Prerequisites
- [Node.js](https://nodejs.org/en/) v20.x or higher.
- `npm` v10.x or higher (comes with Node.js).

### Environment Variables
Configure environment variables in the respective `.env` files as follows:

#### `/server/.env`
```plaintext
PORT=5000
CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:4000
MONGO_URI=your_mongo_uri
JWT_SECRET=your_jwt_secret_key
```

#### `/client/.env`
```plaintext
VITE_SERVER_API_URL=http://localhost:5000/staySafe
```

#### `/admin/.env`
```plaintext
PORT=4000
```

---

### Steps to Install
1. Clone the repository:
   ```bash
   git clone [https://github.com/idanye/group19-hackathon-project]
   cd [group19-hackathon-project]
   ```

2. Install dependencies for all components:
    - **Server**:
      ```bash
      cd server
      npm install
      ```
    - **Client**:
      ```bash
      cd ../client
      npm install
      ```
    - **Admin Panel**:
      ```bash
      cd ../admin
      npm install
      ```

---

## Usage

### Start the Servers
1. **Admin Panel**:
   ```bash
   cd admin
   npm start
   ```
   Runs on `http://localhost:4000`.

2. **Backend Server**:
   ```bash
   cd server
   npm run dev
   ```
   Runs on `http://localhost:5000`.

3. **Frontend Client**:
   ```bash
   cd client
   npm run dev
   ```
   Runs on `http://localhost:3000`.

---

## Project Structure

### Client
- `src/components`: Reusable UI components.
- `src/pages`: Components for individual routes (e.g., Homepage, LoginPage, etc.).
- `src/services`: Manages API interactions.
- `src/styles`: Contains CSS for styling the application.
- `src/hooks`: Custom hooks to simplify user registration and authentication processes.
- `src/images`: Contains the application's logo and other image assets.

### Server
- `models`: Data models for users, experts, questions, and answers.
- `routes`: API endpoints for handling data and logic.
- `controllers`: Backend logic for managing requests.
- `middlewares`: Security and validation for user actions.
- `services`: Handles email notifications for updates.

### Admin
- Contains the admin panel for expert management.

---

## Troubleshooting
- **Ensure all `.env` files are configured correctly.**
- **Verify no other services are using ports 3000, 4000, or 5000.**
- **Check logs for error messages in the terminal or browser.**

---

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For support, reach out at [group19hackathon@gmail.com](mailto:group19hackathon@gmail.com).

#### **SafeSpace Team**
