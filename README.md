# 🌻 Visa Star – Visa Navigator

[Live Site 🔗](https://visa-navigator-shafin.netlify.app/)

> A fully responsive and interactive web application designed to simplify and streamline the visa application process—from exploration to submission.

---

## 🌐 Introduction

**Visa Star** is a personal project I created to address the complexities of visa processing by offering a centralized, intuitive platform. Whether it's checking visa requirements, applying online, or tracking application progress, Visa Star brings everything together in one smooth, user-friendly experience.

The project reflects my passion for building scalable, interactive web applications with real-world utility, using modern technologies and thoughtful design.

---

## 📚 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Installation](#-installation)
- [Usage](#-usage)
- [Pages Overview](#-pages-overview)
- [Environment Configuration](#-environment-configuration)
- [Troubleshooting](#-troubleshooting)
- [Contributors](#-contributors)
- [License](#-license)

---

## 🚀 Features

- **Visa Navigator:** Instantly check visa requirements, apply online, and track your submissions.
- **Responsive Design:** Fully optimized across all devices—mobile, tablet, and desktop.
- **Authentication System:**
  - Register/Login with email & password or Google.
  - Secure routes and session handling.
- **Dynamic CRUD Operations:**
  - Add, update, delete personal visa entries.
  - Real-time database sync for applications.
- **Search & Filter:**
  - Filter visas by type.
  - Search applications by country name.
- **Interactive UI Components:**
  - Carousel banners and modal forms.
  - Instant feedback via toast/sweet alerts.
- **Custom 404 Page:** Cleanly handles unknown routes with a custom design.
- **Clean Navigation:** Navbar, banner slider, visa highlights, and smooth routing throughout.

---

## 🛠️ Tech Stack

- **Frontend:** React.js, React-tooltip, React-simple-typewriter  
- **Backend:** Node.js, Express.js, MongoDB  
- **Authentication:** Firebase Auth + Google OAuth  
- **Hosting:**
  - Client: [Firebase](https://firebase.google.com/)
  - Server: [Vercel](https://vercel.com/)  
- **Environment Variables:** Managed securely via `.env` files

---

## 💻 Installation

To run this project locally:

```bash
# Clone the repository
git clone https://github.com/your-username/visa-star.git
cd visa-star

# Install client dependencies
cd client
npm install

# Install server dependencies
cd ../server
npm install

# Add your environment variables in a .env file
```

---

## 🚦 Usage

1. Register or log in using your email or Google account.
2. Explore visas and filter based on your criteria.
3. Add your own visa entries or apply for existing ones.
4. Manage your submitted applications through your personal dashboard.

---

## 📄 Pages Overview

| Page                | Description |
|---------------------|-------------|
| **Home**            | Intro, banner slider, latest visas, and CTA buttons |
| **Login/Register**  | Secure authentication with form validation and Google sign-in |
| **Add Visa**        | Private form to add a visa (stored in MongoDB) |
| **All Visas**       | Grid view of all visas with filter by type |
| **Visa Details**    | Private modal-based details and application form |
| **My Added Visas**  | Manage your own visas (update or delete) |
| **My Applications** | Track your visa applications and cancel if needed |
| **404 Not Found**   | Custom-designed page for undefined routes |

---

## ⚙️ Environment Configuration

Create a `.env` file in both the `client` and `server` folders to store sensitive credentials:

```env
# Firebase
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain

# MongoDB
MONGODB_URI=your_mongodb_connection_string

# Other secrets...
```

---

## 🧩 Troubleshooting

- **Firebase Auth Issues:** Double-check API keys and whitelist domains in your Firebase console.
- **MongoDB Errors:** Ensure the cluster is running and IP access is configured properly.
- **Hosting Conflicts:** Clear cache or redeploy if the client isn't syncing with server data.

---

## 👤 Contributors

This project was fully developed and maintained by:

**Tanjid Karim Shafin**  
[LinkedIn](https://www.linkedin.com/in/tanjidshafin-dev/) • [Portfolio](https://tanjidshafin.netlify.app/)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
