# Japanese Sweets Image Classifier - Frontend (Kinoko vs Takenoko)

[![Backend Repo](https://img.shields.io/badge/Backend%20Repo-GitHub-blue?logo=github)](https://github.com/sylfort/yolo-chimera) <!-- Update link if backend repo is different -->
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](http://ec2-54-215-114-190.us-west-1.compute.amazonaws.com)

This repository contains the Vue.js frontend for the Japanese Sweets Image Classifier project. It provides the user interface for uploading images, viewing detection results, checking the overall "popularity" leaderboard, and supports both English and Japanese languages.

[View the Live Demo](http://ec2-54-215-114-190.us-west-1.compute.amazonaws.com)

## Overview

This single-page application (SPA) serves as the interactive client for the Python backend API. Users can:

1.  **Upload Images:** Select an image file containing Kinoko no Yama or Takenoko no Sato sweets.
2.  **View Predictions:** See the uploaded image annotated by the backend's YOLOv8 model, highlighting detected sweets.
3.  **Check Counts:** Observe the number of each sweet detected in the uploaded image.
4.  **Follow the Leaderboard:** View an animated bar chart showing the cumulative count of each sweet detected across all submissions, fetched from the backend API.
5.  **Switch Languages:** Toggle the interface between English and Japanese.

The frontend communicates with the backend API to send images for prediction and fetch leaderboard counts.

## Features

*   **Image Upload:** Clean interface for selecting image files.
*   **Image Preview:** Shows a preview of the selected image before uploading and the annotated image received from the backend.
*   **Modal Image Viewer:** Click on preview/result images to view them enlarged.
*   **API Integration:** Uses Axios to communicate with the Flask backend (`/predict` for uploads, `/counts` for leaderboard).
*   **Dynamic Leaderboard:** Visualizes Kinoko vs. Takenoko counts using D3.js animated bars.
*   **Internationalization (i18n):** Supports English and Japanese languages using `vue-i18n`.
*   **Responsive Design:** Basic responsiveness included for better viewing on different devices.
*   **Deployment:** Configured for easy deployment to AWS S3 via GitHub Actions.

## Tech Stack

*   **Framework:** [Vue.js](https://vuejs.org/) (v3)
*   **Build Tool:** [Vue CLI](https://cli.vuejs.org/)
*   **HTTP Client:** [Axios](https://axios-http.com/)
*   **Data Visualization:** [D3.js](https://d3js.org/) (for the leaderboard)
*   **Internationalization:** [Vue I18n](https://kazupon.github.io/vue-i18n/)
*   **Styling:** CSS (scoped styles, potentially some global styles in `App.vue`)
*   **Language:** JavaScript (ES6+)
*   **Package Management:** npm

## Screenshots

*(Placeholder: Add screenshots of the UI here if available)*
*   *Screenshot of the main page with upload button and leaderboard.*
*   *Screenshot showing an uploaded image and the annotated result.*
*   *Screenshot showing the enlarged image modal.*

## Architecture & Interaction Flow

1.  **Initial Load:**
    *   The `App.vue` component mounts.
    *   It makes a `GET` request to the backend's `/counts` endpoint to fetch the initial leaderboard totals.
    *   The fetched counts are passed as props to the `LeaderBoard.vue` component.
    *   `LeaderBoard.vue` uses D3.js to render the initial state of the bars.
2.  **Image Upload:**
    *   The user interacts with the `ImageUpload.vue` component to select a file.
    *   A local preview of the selected image is shown.
    *   Upon clicking "Submit", `ImageUpload.vue` sends a `POST` request with the image file (`multipart/form-data`) to the backend's `/predict` endpoint via `src/api/api.js`.
3.  **Receiving Prediction:**
    *   The backend processes the image, updates its database count, and returns a JSON response containing:
        *   The counts for the *current* image (`results.class.kinoko`, `results.class.takenoko`).
        *   A URL to the annotated image (`img`).
    *   `ImageUpload.vue` displays the annotated image received from the backend URL.
4.  **Updating Leaderboard:**
    *   `ImageUpload.vue` emits an `imageUploaded` event containing the counts from the *current* image prediction.
    *   `App.vue` listens for this event and updates its `leaderboardCounts` data by adding the new counts to the existing totals.
    *   Vue's reactivity updates the props passed to `LeaderBoard.vue`.
    *   `LeaderBoard.vue` watches for changes in its props and uses D3.js to animate the bars to reflect the new cumulative totals.
5.  **Language Switching:**
    *   The user clicks the language toggle button in `App.vue`.
    *   `App.vue` changes the `locale` property of the `vue-i18n` instance.
    *   All text elements using `$t(...)` automatically update to the selected language.

## Setup and Local Development

1.  **Prerequisites:**
    *   Node.js (which includes npm) installed. Recommend LTS version.
    *   Git

2.  **Clone the Repository:**
    ```bash
    git clone <your-frontend-repo-url>
    cd <your-frontend-repo-directory>
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Configure Backend API URL (Optional):**
    *   The application expects the backend API to be running on the same host/port or proxied correctly.
    *   By default (`src/api/api.js`), it uses `/` as the base URL.
    *   If your backend runs on a different port during local development (e.g., `http://localhost:5000`), create a `.env.development.local` file in the project root with:
        ```env
        VUE_APP_API_BASE_URL=http://localhost:5000/
        ```
    *   Ensure the backend Flask application is running.

5.  **Run Development Server:**
    ```bash
    npm run serve
    ```
    This command compiles the application and serves it with hot-reloading at `http://localhost:8080` (or another port if 8080 is busy).

## Build for Production

```bash
npm run build
