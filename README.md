#  Near Miss Analytics Dashboard

A **full-stack analytics dashboard** built with **React + Express** to visualize construction near-miss incidents. The application features interactive charts, dynamic filtering, and robust data handling for real-world datasets.

---

##  Features

### Frontend
*  **Interactive Charts** (Bar, Line, Area, Pie, Donut)
*  **Dynamic Filters** (Region, Year, Category)
*  **Optimized Performance** using `useMemo`
*  **Robust Data Normalization** (handles missing/noisy fields)
*  **Responsive Layout** (works on desktop & tablet)
*  **Modular & Scalable File Structure**
*  **Graceful Empty-State Handling**

### Backend
*  **RESTful API** serving incident data
*  **File-based Data Storage** (JSON)
*  **Data Upload Endpoint** to replace datasets
*  **CORS Enabled** for cross-origin requests

---

##  Tech Stack

### Frontend
* **React** (Vite)
* **Recharts** - Data visualization
* **CSS** - Custom design system
* **React Hooks** - State management

### Backend
* **Node.js** - Runtime environment
* **Express** - Web framework
* **Multer** - File upload handling

---

##  Project Structure

```
Nearmiss/
├── backend/
│   ├── data/
│   │   └── db.dashboard_incidents.json    # Incident data
│   ├── uploads/                           # Uploaded files
│   ├── server.js                          # Express server
│   └── package.json                       # Backend dependencies
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Charts/
    │   │   │   ├── IncidentsByCategory.jsx
    │   │   │   ├── IncidentsByRegion.jsx
    │   │   │   ├── IncidentsOverTime.jsx
    │   │   │   ├── LocationAreaChart.jsx
    │   │   │   ├── SeverityPie.jsx
    │   │   │   └── TopCausesDonut.jsx
    │   │   ├── Dashboard.jsx              # Main dashboard
    │   │   └── Loader.jsx
    │   ├── utils/
    │   │   └── dataParser.js              # Data normalization
    │   ├── api.js                         # API integration
    │   ├── App.jsx
    │   ├── main.jsx
    │   └── styles.css
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## Dashboard Visualizations

| Chart | Type | Description |
|-------|------|-------------|
| Incidents by Category | Bar Chart | Distribution across incident types |
| Incidents by Region | Bar Chart | Geographic breakdown |
| Incidents Over Time | Line Chart | Monthly trend analysis |
| Incidents by Location | Area Chart | Location-based distribution |
| Severity Distribution | Pie Chart | Incident severity breakdown |
| Top Causes | Donut Chart | Root cause analysis |

---

##  Data Handling

The dashboard handles **real-world datasets** with:
* Missing values → mapped to `"Unknown"`
* Invalid dates → excluded from time-series charts
* Multiple field name formats (e.g., `incident_date`, `createdAt`, `date`)

All normalization logic: `src/utils/dataParser.js`

---

##  Getting Started

### Prerequisites
* Node.js (v14 or higher)
* npm or yarn

### 1️ Start the Backend

```bash
cd backend
npm install
npm start
```

Backend runs on: **http://localhost:4000**

###  Start the Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on: **http://localhost:5173**

---

##  API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/data` | Fetch all incident records |
| POST | `/api/upload` | Upload new JSON dataset |

### Sample Response

```json
{
  "records": [
    {
      "id": 1,
      "incident_date": "2024-01-15",
      "category": "Fall from Height",
      "region": "North",
      "severity": "High",
      "location": "Building A",
      "cause": "Inadequate scaffolding"
    }
  ]
}
```

---

##  Performance Optimizations

* Heavy aggregations memoized using `useMemo`
* Charts re-render only when filtered data changes
* Responsive containers with fixed heights
* File-based data storage for fast reads

---

##  Future Enhancements

*  Dark Mode Toggle
*  Export charts as CSV/PNG
*  Mobile-first optimizations
*  Authentication & role-based access
*  Deployment on Vercel/Netlify
*  Database integration (MongoDB/PostgreSQL)
*  Advanced analytics 

---

##  Author

**Gagan**
Full-Stack Developer | React | Node.js | Data Visualization

---



