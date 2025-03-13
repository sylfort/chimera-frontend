<template>
    <div id="app">
      <header class="app-header">
        <h1>Sweets Recognition Leaderboard</h1>
        <p>Upload an image of either Kinoko no Yama or Takenoko no Sato</p>
        <p>Let's see which sweet is the most beloved!</p>
      </header>
      <main>
        <section class="upload-section">
          <ImageUpload @imageUploaded="handleImageUploaded" />
        </section>
        <section class="leaderboard-section">
          <LeaderBoard :counts="leaderboardCounts" />
        </section>
      </main>
    </div>
  </template>
  
  <script>
  import ImageUpload from "./components/ImageUpload.vue";
  import LeaderBoard from "./components/LeaderBoard.vue";
  
  export default {
    name: "App",
    components: {
      ImageUpload,
      LeaderBoard,
    },
    data() {
      return {
        leaderboardCounts: { kinoko: 0, takenoko: 0 },
      };
    },
    methods: {
      /**
       * Updates the leaderboard counts with the values from the API response
       * @param {Object} counts - The counts object from the API response
       */
      handleImageUploaded(counts) {
        // Set the counts directly from the API response
        this.leaderboardCounts = {
          kinoko: counts.kinoko,
          takenoko: counts.takenoko
        };
      },
    },
  };
  </script>
  
  <style>
  /* Import the ludical font from Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&display=swap');
  
  /* Apply the font to the entire app */
  * {
    font-family: 'Baloo 2', cursive;
  }
  
  body {
    background-color: #f9f7f0;
    background-image: radial-gradient(#f8d7da 1px, transparent 1px), 
                      radial-gradient(#c3e6cb 1px, transparent 1px);
    background-size: 20px 20px;
    background-position: 0 0, 10px 10px;
  }
  
  #app {
    max-width: 900px;
    margin: 0 auto;
    padding: 1em;
  }
  
  .app-header {
    text-align: center;
    margin-bottom: 2em;
    background-color: rgba(255, 255, 255, 0.9);
    padding: 20px;
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #e83e8c;
    font-weight: 700;
    font-size: 2.5em;
    margin-bottom: 0.5em;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  p {
    color: #6c757d;
    font-size: 1.2em;
    line-height: 1.4;
  }
  
  .upload-section,
  .leaderboard-section {
    margin-bottom: 2em;
  }
  
  button {
    font-family: 'Baloo 2', cursive !important;
    font-weight: 600;
    transition: all 0.3s ease;
  }
  
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  </style>