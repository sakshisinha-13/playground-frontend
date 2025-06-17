# CodePlayground Frontend

**Live Demo:** [https://playground-frontend-taupe.vercel.app/login](https://playground-frontend-taupe.vercel.app/login)

This is the frontend of the CodePlayground project — a full-stack coding interview preparation platform with:

* Authentication (Signup/Login)
* Company-wise interview question filtering
* Interactive code editor with execution support (JavaScript, Python, C++)
* Export options: PDF, CSV, and Markdown

---

## Features

### Authentication

* Signup & Login using JWT

### Question Curation Dashboard

* Filter questions by:

  * Company
  * Role
  * YOE (Years of Experience)
  * Assessment Type (Online Assessment / Interview)
  * Topic
  * Difficulty
  * Year
* Pie chart showing topic distribution
* Toggle between detailed and table views
* Export questions to PDF, CSV, and Markdown
* Ticked questions (selection tracking)

### Code Playground

* AceEditor-based editor
* Supports JavaScript, Python, and C++
* Custom input/output
* Backend-integrated code execution

---

## Folder Structure

```
client/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   ├── exports/
│   ├── pages/
│   ├── data/
│   └── App.js
```

---

## Tech Stack

* React.js
* Tailwind CSS
* React Router
* AceEditor
* Chart.js

---

## Deployment

* Frontend: Vercel
* Backend: Render (not included in this repo)

---

## Run Locally

1. Clone the repo:

```bash
git clone https://github.com/sakshisinha-13/playground-frontend.git
cd playground-frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm start
```

Make sure the backend server is running on `http://localhost:5000`

---

## Developer

Sakshi Sinha

---

## License

This project is licensed under the MIT License.
