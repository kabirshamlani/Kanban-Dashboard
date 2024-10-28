```markdown
# Kanban Dashboard

This project is a Kanban Dashboard, designed to manage a large dataset of tickets for task tracking purposes. It visualizes tickets across multiple statuses (e.g., To Do, In Progress, Blocked, Done) and includes live transitions for real-time updates. Built with React, it demonstrates efficient handling of large datasets through lazy loading, a custom state management system with Finite State Automaton (FSA), and a user-friendly UI.

## Features

- **Ticket Data Generation**: Uses Faker to create realistic ticket data.
- **Kanban Interface**: Swim lanes for each ticket status, supporting drag-and-drop transitions.
- **Lazy Loading**: Loads tickets on demand to handle large datasets efficiently.
- **Live Mode**: Custom hook to simulate live ticket status transitions between statuses, enabled via a toggle switch.

## Prerequisites

- **Docker**: Ensure Docker is installed on your machine.

## Getting Started

Clone the project from GitHub:

```bash
git clone https://github.com/kabirshamlani/Kanban-Dashboard.git
cd Kanban-Dashboard
```

## Running with Docker

1. **Build the Docker Image**:

   ```bash
   docker build -t kanban-dashboard .
   ```

2. **Run the Docker Container**:

   ```bash
   docker run -p 3000:3000 kanban-dashboard
   ```

3. **Access the Application**:

   Open your browser and go to [http://localhost:3000](http://localhost:3000) to view the Kanban Dashboard.

---

### Additional Notes

- The application automatically handles live ticket transitions when "Live Mode" is enabled.
- Each status column has lazy loading for smooth scrolling with large datasets.
- Dependencies like `@faker-js/faker` and `@reduxjs/toolkit` are installed directly in Docker to ensure smooth deployment.
```
