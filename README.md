# Zetta
Google Drive-inspired cloud storage application with JWT authentication, hierarchical folder management, file streaming, bulk upload/delete, and MongoDB transactions.

# Drive Clone - Full Stack Cloud Storage Application

A full-stack Google Drive inspired cloud storage application built with the MERN stack. The application allows users to securely manage files and folders through a hierarchical file system with authentication, authorization, bulk operations, and efficient file streaming.

## Features

### Authentication & Security

* User registration and login
* Authentication and authorization
* Protected routes
* Ownership-based access control
* Secure file and folder operations

### File Management

* Upload files
* Download files
* Delete files
* Bulk file upload
* Bulk file deletion
* File streaming for efficient downloads

### Folder Management

* Create folders
* Nested folder hierarchy
* Directory navigation
* Recursive folder deletion
* Bulk folder operations

### Performance & Scalability

* Node.js stream-based file delivery
* MongoDB transactions for data consistency
* Scalable architecture with future AWS S3 migration support

## Tech Stack

### Frontend

* React
* React Router
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST APIs

### Database

* MongoDB
* Mongoose

## Architecture

The application separates:

* Metadata Storage (MongoDB)

  * Users
  * Files
  * Folders
  * Ownership information

* File Storage

  * Local filesystem storage
  * Future-ready architecture for AWS S3 migration

## Key Technical Challenges Solved

### Recursive Folder Deletion

Implemented recursive deletion for nested folders and files while maintaining database consistency.

### Data Consistency

Used MongoDB transactions to ensure that folder and file records remain synchronized during bulk delete operations.

### Efficient File Downloads

Implemented Node.js streams to serve files without loading entire files into server memory, improving scalability and performance.

### Authorization

Enforced ownership checks on all file and folder operations to prevent unauthorized access.

## Installation

### Backend

```bash
git clone <backend-repository-url>
cd drive_backend
npm install
npm run dev
```

### Frontend

```bash
git clone <frontend-repository-url>
cd drive_frontend
npm install
npm run dev
```

## Future Improvements

* AWS S3 integration
* File sharing with links
* Trash and restore functionality
* File versioning
* Search functionality
* Drag and drop uploads
* Storage quota management

## Project Status

This project is fully functional in a local environment and demonstrates production-oriented backend concepts including authentication, authorization, transactions, streaming, and scalable file management architecture.

## Author

Anamika Srivastava

GitHub:
https://github.com/Anamika770
