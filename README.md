# Flytrap Dashboard
Flytrap Dashboard is the web interface for our error monitoring software, Flytrap. This dashboard allows developers to view, filter, and analyze errors collected from their applications in one centralized location. It offers project-based access, nea real-time notifications, and intuitive navigation to streamline debugging and enhance software reliability.

## Features
### Project-based Error Tracking
Monitor errors specific to each project for focused debugging.

### Near Real-Time Notifications
Stay updated with live notifications when new errors are logged.

### User Access Control
Restrict access to error data based on user permissions and project association.

### Detailed Error Logs
View comprehensive error details, including stack traces, timestamps, and context.

### Filtering
Quickly locate specific errors using filters.

## Tech Stack
Frontend: React (with Chakra UI for styling and React Router for navigation)
Backend: Flask API hosted on AWS EC2, using PostgreSQL on AWS RDS for data storage
Notifications: WebSockets for real-time updates
Infrastructure: Dockerized services, AWS Lambda for error processing, and API Gateway for SDK interaction