# QuizApp

QuizApp is a full-stack quiz platform built with React, Spring Boot, MySQL, and JWT authentication. It supports user registration, login, quiz listing, quiz attempts, scoring, attempt history, and admin quiz management.

## Features

- User registration and login
- JWT-based authentication
- Role-based access for users and admins
- Quiz listing
- Take quiz flow
- Score calculation
- Attempt history
- Admin quiz management
- React frontend with React Router
- Spring Boot REST API backend
- MySQL persistence using Spring Data JPA
- Global exception handling
- Deployment configuration for hosted environments

## Tech Stack

### Frontend

- React
- Vite
- React Router
- Axios
- Tailwind CSS
- ESLint

### Backend

- Java
- Spring Boot
- Spring Security
- JWT
- Spring Data JPA
- MySQL
- Maven

## Project Structure

```text
quizapp
├── backend
│   ├── src/main/java/com/yogesh/quizapp
│   │   ├── config
│   │   ├── controllers
│   │   ├── dto
│   │   ├── models
│   │   ├── repositories
│   │   ├── security
│   │   └── services
│   └── src/main/resources/application.properties
└── frontend
    ├── src
    │   ├── components
    │   ├── pages
    │   ├── api.js
    │   └── main.jsx
    └── package.json
```

## Environment Variables

Do not commit real secrets to GitHub. Configure secrets through environment variables.

### Backend

```env
SPRING_DATASOURCE_URL=jdbc:mysql://localhost:3306/quizapp
SPRING_DATASOURCE_USERNAME=root
SPRING_DATASOURCE_PASSWORD=your_password
SPRING_DATASOURCE_DRIVER_CLASS_NAME=com.mysql.cj.jdbc.Driver
JWT_SECRET=replace_with_a_long_secure_secret
JWT_EXPIRATION_MS=86400000
SPRING_MAIL_HOST=sandbox.smtp.mailtrap.io
SPRING_MAIL_PORT=587
SPRING_MAIL_USERNAME=your_mailtrap_username
SPRING_MAIL_PASSWORD=your_mailtrap_password
PORT=8080
```

### Frontend

```env
VITE_API_BASE_URL=http://localhost:8080
```

## Local Setup

### Backend

1. Clone the repository:

```bash
git clone https://github.com/YogesTech/quizapp.git
cd quizapp/backend
```

2. Create a MySQL database:

```sql
CREATE DATABASE quizapp;
```

3. Configure backend environment variables.

4. Run the backend:

```bash
./mvnw spring-boot:run
```

On Windows:

```bash
mvnw.cmd spring-boot:run
```

### Frontend

1. Move into the frontend folder:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a frontend environment file:

```env
VITE_API_BASE_URL=http://localhost:8080
```

4. Run the frontend:

```bash
npm run dev
```

5. Open the app using the Vite local URL shown in the terminal.

## Testing

Run backend tests:

```bash
cd backend
./mvnw test
```

On Windows:

```bash
cd backend
mvnw.cmd test
```

Run frontend linting:

```bash
cd frontend
npm run lint
```

## Security Note

If secrets were previously committed, rotate them before sharing the project publicly. This includes database passwords, JWT secrets, and Mailtrap credentials.

## Future Improvements

- Add screenshots and live demo link
- Add refresh-token based authentication
- Add password reset flow
- Add quiz categories and difficulty levels
- Add timer-based quiz attempts
- Add admin dashboard analytics
- Add OpenAPI/Swagger documentation
- Add broader backend and frontend test coverage

## Author

**Yogeshwaran B**  
GitHub: https://github.com/YogesTech  
Portfolio: https://yogeshdeveloper.netlify.app
