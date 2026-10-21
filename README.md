# 🎬 Movie Explorer

**Discover movies. Explore details. Manage your experience.**

Movie Explorer is a responsive movie discovery web application built with React, designed to provide an interactive browsing experience alongside user account management, notifications, and administrative tools.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Redux Toolkit](https://img.shields.io/badge/Redux_Toolkit-State_Management-764ABC?logo=redux&logoColor=white)](https://redux-toolkit.js.org/)

---

## Overview

Movie Explorer combines movie discovery with account-related functionality in a modern web interface. The project uses a component-based architecture, centralized state management, client-side routing, and a local mock REST API.


## Features

### Movie Discovery

- **Movie Search** — Find movies using the available search functionality.
- **Movie Details** — Navigate to individual movie pages to explore movie information.
- **Popular Movies Carousel** — Browse popular movie selections using an interactive slider.
- **Responsive Layout** — Use the application across desktop, tablet, and mobile screen sizes.

### User & Account Management

- **User Profiles** — View and update profile information.
- **Account Settings** — Manage user-related settings and account preferences.
- **User Administration** — Access administrative interfaces for managing user accounts.
- **Account Status & Roles** — Display account status and user-role information.

### Notifications

- **User Notifications** — View notifications associated with an account.
- **Administrative Notifications** — Support notifications sent from the administrative interface.
- **Interactive Feedback** — Display toast messages and appropriate loading states during application operations.

### User Interface

- **Dark-Themed Design** — A consistent dark interface with carefully selected accent colors.
- **Reusable Components** — Shared UI elements for maintainable development.
- **Loading Skeletons** — Placeholder interfaces while content is loading.
- **Interactive Animations** — Motion effects and transitions.
- **Data Visualization** — Chart components for relevant administrative information.

## Tech Stack

| Technology | Purpose |
|---|---|
| React 19 | Building the user interface |
| Vite | Development server and production builds |
| Tailwind CSS 4 | Utility-first styling |
| Redux Toolkit | Centralized application state |
| React Redux | Connecting components to Redux |
| React Router | Client-side routing |
| JSON Server | Local mock REST API |
| Swiper | Interactive carousels |
| Framer Motion | Animations and transitions |
| Recharts | Data visualization |
| Lucide React | Icons |
| React Icons | Additional icon library |
| React Hot Toast | Notifications and feedback |
| ESLint | Code quality checks |

## Getting Started

Follow the steps below to run Movie Explorer locally.

### Prerequisites

Install the following:

- [Node.js](https://nodejs.org/)
- npm
- [Git](https://git-scm.com/)

### 1. Clone the repository

```bash
git clone https://github.com/amir-hossien-arhampoor/Movie-Explorer.git
```

### 2. Navigate to the project directory

```bash
cd Movie-Explorer
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the mock API server

Open a terminal in the project root and run:

```bash
npm run server
```

The JSON Server configuration uses `Data/DB.json` and port `8001`.

Keep this terminal running while using the application.

### 5. Start the development server

Open a second terminal in the project root:

```bash
npm run dev
```

Vite will display the local development URL in your terminal. Open that URL in your browser.

**Note:** Run both servers when the application requires data from the local JSON Server.

## Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the Vite development server |
| `npm run server` | Start the JSON Server mock API on port `8001` |
| `npm run build` | Create a production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint checks |


## Author

**Amir Hossien Arhampoor**

- **GitHub:** [@amir-hossien-arhampoor](https://github.com/amir-hossien-arhampoor)
- **Repository:** [Movie Explorer](https://github.com/amir-hossien-arhampoor/Movie-Explorer)

---

If you find this project useful, consider giving the repository a star.

