# P2P Lending Platform

## Overview

The P2P Lending Platform is a web application that connects borrowers and lenders, allowing users to apply for loans, invest in loans, and manage their profiles. The application features a modern, responsive design and utilizes a dark theme for an enhanced user experience.

## Features

- User authentication (login and registration)
- Dashboard with portfolio statistics
- Loan application and investment functionalities
- Recent transactions overview
- Responsive design for mobile and desktop

## Tech Stack

- **Frontend**: React, TypeScript, Material-UI
- **Backend**: Python, FastAPI (or Flask/Django)
- **Database**: PostgreSQL (or any other preferred database)
- **State Management**: Redux Toolkit
- **Charting**: Chart.js for visualizing data

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Python (v3.7 or higher)
- PostgreSQL (or your preferred database)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/rohandol112/P2P-Hackanova.git
   cd P2P-Hackanova
   ```

2. Navigate to the frontend directory and install dependencies:
   ```bash
   cd frontend
   npm install
   ```

3. Set up the backend:
   - Navigate to the backend directory:
     ```bash
     cd ../backend
     ```
   - Install required Python packages (if using FastAPI):
     ```bash
     pip install -r requirements.txt
     ```

4. Create a `.env` file in both the frontend and backend directories to store environment variables.

### Running the Application

1. Start the backend server:
   ```bash
   cd backend
   uvicorn main:app --reload
   ```

2. Start the frontend development server:
   ```bash
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to view the application.

## Usage

- **Login**: Use the login form to access your account.
- **Register**: Create a new account if you don't have one.
- **Dashboard**: View your portfolio, active loans, and recent transactions.
- **Loan Application**: Apply for a loan through the application form.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/YourFeature`).
3. Make your changes and commit them (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.


