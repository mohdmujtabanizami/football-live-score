# ⚽ ScoreHub

### Live Football Scores & Statistics Platform

<p align="center">
  <strong>A modern, responsive, and installable football web application providing live scores, match events, team statistics, player information, football news, and more.</strong>
</p>

<p align="center">
  <a href="https://football-live-score-one.vercel.app">
    <img src="https://img.shields.io/badge/Live%20Demo-ScoreHub-000000?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo">
  </a>
  <a href="https://github.com/mohdmujtabanizami/football-live-score">
    <img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React.js-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React.js">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Node.js-339933?style=flat-square&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=flat-square&logo=express&logoColor=white" alt="Express.js">
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black" alt="Firebase">
  <img src="https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white" alt="PWA">
</p>

---

## 📌 About the Project

**ScoreHub** is a modern and responsive **full-stack football web application** built with **React.js, Node.js, Express.js, Firebase, and third-party football APIs**.

The platform provides users with real-time football information including live scores, match events, team statistics, player profiles, league standings, top scorers, and football news.

ScoreHub is also designed as a **Progressive Web App (PWA)**, allowing users to install it directly on supported mobile and desktop devices.

---

## ✨ Key Features

| Feature                        | Description                                                                       |
| ------------------------------ | --------------------------------------------------------------------------------- |
| ⚽ **Live Scores**              | View real-time football scores and match events.                                  |
| 🏟️ **Team Profiles**          | Explore detailed team information and statistics.                                 |
| 👤 **Player Profiles**         | View player information and statistics.                                           |
| 🏆 **League Standings**        | Check league tables, rankings, and top scorers.                                   |
| 📰 **Football News**           | Access football-related news through API integration.                             |
| 📱 **Progressive Web App**     | Install ScoreHub directly on supported mobile and desktop devices.                |
| 📡 **Offline Fallback**        | Provides graceful fallback handling when API limits or connectivity issues occur. |
| 🔐 **Firebase Authentication** | Secure Google Sign-In for users.                                                  |
| 🌐 **Multi-Language Support**  | Supports multiple languages for a better user experience.                         |
| 🌙 **Dark / Light Mode**       | Switch between dark and light themes.                                             |
| 📱 **Responsive Design**       | Optimized for mobile, tablet, and desktop devices.                                |

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://img.shields.io/badge/React.js-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React.js">
  <img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
</p>

* React.js
* Vite
* JavaScript
* CSS3
* Responsive UI/UX
* Progressive Web App (PWA)
* Web Manifest
* Service Workers

### Backend

<p>
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js">
</p>

* Node.js
* Express.js
* REST API development
* API integration
* Backend data handling

### Authentication & Services

<p>
  <img src="https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black" alt="Firebase">
</p>

* Firebase Authentication
* Google Sign-In
* Third-Party Football APIs
* Football News APIs

### Deployment

* Vercel

---

## 🧩 Application Modules

### ⚽ Live Football

* Live match scores
* Match events
* Match status
* Fixtures
* Real-time football information

### 🏆 Teams & Leagues

* Team profiles
* Team statistics
* League standings
* Rankings
* Top scorers

### 👤 Players

* Player profiles
* Player statistics
* Team association
* Player information

### 📰 Football News

* Football news integration
* API-based news fetching
* Dynamic news content

### 📱 Progressive Web App

* Installable web application
* Web App Manifest
* Service Worker support
* Mobile and desktop installation
* Offline fallback handling

### 🔐 Authentication

* Firebase Authentication
* Google Sign-In
* Secure user access

### 🎨 User Experience

* Dark / Light Mode
* Multi-language support
* Responsive layouts
* Mobile-friendly interface

---

## 🚀 Live Demo

<p align="center">
  <a href="https://football-live-score-one.vercel.app">
    <img src="https://img.shields.io/badge/🚀%20Visit%20ScoreHub-Live%20Demo-000000?style=for-the-badge" alt="Live Demo">
  </a>
</p>

**Live Website:**
https://football-live-score-one.vercel.app

**GitHub Repository:**
https://github.com/mohdmujtabanizami/football-live-score

---

## 💻 How to Run Locally

### 1. Clone the Repository

```bash
git clone https://github.com/mohdmujtabanizami/football-live-score.git
cd football-live-score
```

### 2. Install Dependencies

```bash
npm install
```

If the project contains separate frontend and backend directories, install dependencies in each directory as configured in the repository.

### 3. Configure Environment Variables

Create a `.env` file and add the required API and Firebase configuration values.

Example:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_API_URL=your_api_url
```

> ⚠️ Never commit private API keys, service-account files, passwords, or other sensitive credentials to a public repository.

### 4. Start the Application

```bash
npm run dev
```

The application will be available on your local development server.

---

## 📁 Project Highlights

```text
ScoreHub
│
├── ⚽ Live Football Scores
├── 📊 Match Events & Statistics
├── 🏆 League Standings
├── 👑 Top Scorers
├── 🏟️ Team Profiles
├── 👤 Player Profiles
├── 📰 Football News
├── 📱 Progressive Web App
├── 📡 Offline Fallback
├── 🔐 Firebase Authentication
├── 🌐 Multi-Language Support
├── 🌙 Dark / Light Mode
├── 🔗 REST APIs
└── 📱 Responsive UI
```

---

## 🎯 Project Goals

ScoreHub was developed to provide football fans with a **single, responsive, and installable platform** for accessing live football information.

The project focuses on:

* Real-time football data
* Clean and responsive UI
* API-driven application architecture
* Secure authentication
* Progressive Web App functionality
* Offline fallback handling
* Multi-language accessibility
* Cross-device user experience

---

## 👨‍💻 Author

### Mohd Mujtaba Nizami

**Computer Science Engineering Student | Full Stack Web Developer**

<p>
  <a href="https://github.com/mohdmujtabanizami">
    <img src="https://img.shields.io/badge/GitHub-Mohd%20Mujtaba%20Nizami-181717?style=for-the-badge&logo=github&logoColor=white" alt="GitHub">
  </a>
  <a href="https://www.linkedin.com/in/mohd-mujtaba-nizami-btech1707">
    <img src="https://img.shields.io/badge/LinkedIn-Mohd%20Mujtaba%20Nizami-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn">
  </a>
</p>

---

## 📄 License

This project is open-source and available under the **MIT License**.

---

<p align="center">
  ⭐ If you found ScoreHub useful or interesting, consider giving the repository a star!
</p>

<p align="center">
  Built with ❤️ using React.js, Node.js & Express.js
</p>
