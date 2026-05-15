🏠 Hostel and PG Management System

A Full-Stack React & MySQL Application for Seamless Accommodation Management

 
 🚀 Project Milestone
 
This project served as my **Final Year BCA Capstone**. It was successfully defended in the 6th-semester viva with a **100% error-free workflow** demonstration.

✨ Features

- **Student Module:** Room availability checks, booking requests, and profile management.
- **Admin Module:** Real-time dashboard for room allocation, fee tracking, and student records.
- **Relational Integrity:** Managed complex student-room relationships using MySQL foreign keys.
- **Responsive UI:** Fully functional React frontend designed for clarity and ease of use.

🛠️ Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MySQL (Relational)
- **Authentication:** localStorage

### 📐 System Architecture

```mermaid
graph TD
    %% Frontend Layer
    subgraph Client [Frontend Layer]
        React[React.js UI] -->|Interacts via| LocalStorage[(localStorage Session)]
    end

    %% API Layer
    subgraph Server [Backend API Layer]
        Express[Express.js Framework] -->|Routing & Logic| Node[Node.js Runtime]
    end

    %% Database Layer
    subgraph Storage [Database Layer]
        MySQL[(MySQL Database)] --- 3NF[3NF Normalization]
        MySQL --- FK[Foreign Key Constraints]
    end

    %% Interactions
    React -->|HTTP Requests / Fetch| Express
    Express -->|SQL Queries / Connection Pool| MySQL
    MySQL -->|Structured Data / Relations| Express
    Express -->|JSON Responses| React

    %% Styling
    style Client fill:#f9f9f9,stroke:#333,stroke-width:1px
    style Server fill:#e1f5fe,stroke:#0288d1,stroke-width:1px
    style Storage fill:#efebe9,stroke:#5d4037,stroke-width:1px
```

📊 Database Design

The system utilizes a structured relational schema to ensure ACID compliance:
- **Normalization:** Designed up to 3NF to eliminate data redundancy.
- **Relationships:** One-to-Many relationships between Rooms and Students.
- **Logic:** Optimized SQL queries for efficient data retrieval and updates.

🚦 Setup Instructions

1. Clone the repo: `git clone https://github.com/Irine-ops/Hostel-and-PG-Management-System.git`
2. Install dependencies: `npm install`
3. Configure your `.env` file with your `DB_HOST`, `DB_USER`, and `DB_PASSWORD`.
4. Import the provided `.sql` file into your MySQL instance.
5. Run the app: `npm start`

## 🤝 Let's Connect!

I am an aspiring Full-Stack Developer and recent BCA graduate actively looking for software engineering opportunities, internships, and open-source collaborations.

[![LinkedIn](https://shields.io)](https://www.linkedin.com/in/irinemary/)
[![Email](https://shields.io)](mailto:irinemaryrm2004@gmail.com)
[![Portfolio](https://shields.io)](https://Irine-ops.github.io/)

---
*Thank you for visiting my repository! Feel free to star ⭐ this project if you found it helpful.*

