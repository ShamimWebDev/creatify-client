# 🎨 Creatify – A Creative Artwork Showcase Platform

**Live Site URL:** [https://creatify-art.web.app](https://creatify-artwork.netlify.app)

Creatify is a modern online platform where artists can **upload**, **explore**, and **showcase** their creative artworks. It provides a beautiful, minimal UI for discovering art, connecting with creators, and curating personal favorites.

---

## 🚀 Features

- **🖼️ Explore & Showcase Art:** Browse artworks shared by other creators and upload your own.
- **❤️ Favorites System:** Add or remove artworks from your personalized favorites gallery.
- **🔐 Secure Authentication:** Firebase Email/Password & Google Login with real-time user session.
- **🛠️ Full CRUD Support:** Add, update, or delete your uploaded artworks easily.
- **🌙 Theme Toggle:** Switch between Dark and Light modes with localStorage persistence.
- **✨ Animations & UI:** Smooth transitions using React Awesome Reveal & React Simple Typewriter.
- **🔍 Search & Filter:** Quickly find artworks by title, artist, or category.
- **🔥 Like System:** Express appreciation by liking artworks (MongoDB `$inc` for like count).
- **📱 Responsive Design:** Fully optimized for mobile, tablet, and desktop users.

---

## 🧱 Project Structure

### 🧭 Navbar

- Links: **Home | Explore Artworks | Add Artwork | My Gallery | My Favorites**
- Shows **Login/Register** if not logged in, or **User Photo & Logout** if logged in.

### 🏠 Home Page

- Interactive **Banner/Slider** showcasing trending art.
- **Featured Artworks** – 6 most recent uploads sorted via MongoDB `sort()` & `limit()`.
- Additional sections: **Top Artists of the Week** and **Community Highlights**.

### 🔐 Authentication

- Firebase authentication (Email/Password + Google Sign-In).
- Validates password (uppercase, lowercase, ≥6 chars).
- Redirects & toast/sweetalert for feedback.

### 🧾 CRUD Operations

- **Add Artwork (Private Route):** Upload image, title, category, medium, description, visibility, and price.
- **My Gallery (Private Route):** Manage your artworks with Update & Delete.
- **Explore Artworks:** Displays all public artworks with search & filter.
- **Artwork Details:** Shows full info with Like & Add to Favorites options.
- **My Favorites:** Lists saved artworks with unfavorite option.

### ⚙️ Other Features

- Loading spinners during data fetch.
- 404 Page with custom creative design (no navbar/footer).
- Toast/SweetAlert feedback for all key actions.

---

## 🧩 Technologies Used

| Category          | Tools / Libraries                                     |
| ----------------- | ----------------------------------------------------- |
| **Frontend**      | React 18, React Router DOM 6                          |
| **Styling**       | Tailwind CSS, DaisyUI                                 |
| **Animations**    | Motion, React Awesome Reveal, React Simple Typewriter |
| **Auth**          | Firebase                                              |
| **Backend**       | MongoDB (for CRUD & Like system)                      |
| **UI Components** | React Icons, React Toastify, React Spinners           |
| **Build Tool**    | Vite                                                  |
