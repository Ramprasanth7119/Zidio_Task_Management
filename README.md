
# 📋 Task Management Application

A full-stack Task Management Application featuring **role-based authentication**, **task assignment**, and **real-time video conferencing** using **Jitsi Meet** — designed to streamline team productivity.

---

## 🚀 Key Features

- 🔐 **Role-Based Authentication**  
  - **Admin**: Assigns tasks, updates task details, schedules video meetings.  
  - **User**: Views assigned tasks, updates task status, joins meetings.

- 🗂️ **Task Workflow**  
  - Admin creates and assigns tasks to specific users.  
  - Users can track progress and update task status: `To Do` → `In Progress` → `Completed`.

- 📞 **Video Conferencing (Jitsi Integration)**  
  - One-click join video meetings via Jitsi, similar to Google Meet experience.  
  - Meeting room generated dynamically per task or team.

---

## 🧰 Tech Stack

**Frontend**  
- React.js  
- Axios  
- Tailwind CSS / Bootstrap  

**Backend**  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT & Bcrypt for Authentication  

**Video Integration**  
- Jitsi Meet (via iFrame or React SDK)

---

## 📁 Project Structure

```
task-management-app/
├── client/           # React frontend
├── server/           # Express backend
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── middleware/
├── .env
├── README.md
└── package.json
```

---

## 🔧 Setup Instructions

### 1. Clone the Repo
```bash
git clone https://github.com/Ramprasanth7119/Zidio_Task_Management.git
cd Zidio_Task_Management
```

### 2. Backend Setup
```bash
cd server
npm install
```

Create `.env` in `server/`:
```
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/taskDB
JWT_SECRET=your_jwt_secret
```

Run the backend:
```bash
npm run dev
```

### 3. Frontend Setup
```bash
cd client
npm install
npm start
```

---

## 📌 How It Works

### 🔐 Authentication
- Admin and User roles determined at registration.
- JWT stored in localStorage for session handling.

### 🗒️ Task Management
- **Admin**:
  - Creates and assigns tasks (`POST /api/tasks`)
  - Edits task details
- **User**:
  - Views assigned tasks (`GET /api/tasks/user`)
  - Updates status (`PUT /api/tasks/:id/status`)

### 📹 Jitsi Video Meetings
- Admin generates a room name (e.g., `meeting-task-123`)
- Frontend renders a Jitsi iFrame:

```jsx
<iframe
  allow="camera; microphone; display-capture"
  src={`https://meet.jit.si/meeting-task-${taskId}`}
  style={{ height: '600px', width: '100%', border: 0 }}
  allowFullScreen
/>
```

---

## 🧪 Sample API Routes

### Auth
- `POST /api/auth/register` – Register with role
- `POST /api/auth/login` – Login and receive token

### Tasks
- `POST /api/tasks` – Admin creates task
- `GET /api/tasks/user` – User gets assigned tasks
- `PUT /api/tasks/:id/status` – User updates status

---

## 📸 Screenshots

> _Coming soon...

## 🧾 License

MIT License  
© 2025 Your Name

---

## 🙌 Acknowledgements

- [Jitsi Meet](https://jitsi.org)
- [React](https://reactjs.org)
- [MongoDB](https://mongodb.com)
- [Node.js](https://nodejs.org)
