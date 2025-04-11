# Japanese Sweets Image Classifier - Frontend (Kinoko vs Takenoko)

[![Backend Repo](https://img.shields.io/badge/Backend%20Repo-GitHub-blue?logo=github)](https://github.com/sylfort/yolo-chimera) <!-- Update link if backend repo is different -->
[![Live Demo](https://img.shields.io/badge/Live-Demo-brightgreen)](http://ec2-54-215-114-190.us-west-1.compute.amazonaws.com)

This repository contains the Vue.js frontend for the Japanese Sweets Image Classifier project. It provides the user interface for uploading images, viewing detection results, checking the overall "popularity" leaderboard, and supports both English and Japanese languages.

[View the Live Demo](http://ec2-54-215-114-190.us-west-1.compute.amazonaws.com)

## Overview

<p align="center">  <!-- Optional: align="center" or align="left" -->
  <img src="https://github.com/user-attachments/assets/7aed6d80-abf9-44a0-8212-5ebc8451a783" alt="Kansai Ben Quest image" width="500">
</p>

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
*   **Data Visualization:** [D3.js](https://d3js.org/) (for the leaderboard)
*   **Fetching library:** [Axios](https://axios-http.com/)
*   **Internationalization:** [Vue I18n](https://kazupon.github.io/vue-i18n/)

## Setup and Local Development

1.  **Prerequisites:**
    *   Node.js (which includes npm) installed. Recommend LTS version.
    *   Git

2.  **Clone the Repository:**
    ```bash
    git clone https://github.com/sylfort/chimera-frontend.git
    ```

3.  **Install Dependencies:**
    ```bash
    npm install
    ```

4.  **Run Development Server:**
    ```bash
    npm run serve
    ```
    This command compiles the application and serves it with hot-reloading at `http://localhost:8080` (or another port if 8080 is busy).

## Build for Production

```bash
npm run build
