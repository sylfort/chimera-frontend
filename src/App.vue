<!-- App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <h1 v-html="$t('app.title')"></h1>
      <!-- <h2>{{ $t("app.subtitle") }}</h2> -->
      <p v-html="$t('app.description1')"></p>
      <p>{{ $t("app.description2") }}</p>
      <!-- Toggle language button -->
      <button class="modern-button" @click="toggleLanguage">{{ $t("app.toggleLang") }}</button>
    </header>
    <main>
      <section class="upload-section">
        <ImageUpload @imageUploaded="handleImageUploaded" />
      </section>
      <section class="leaderboard-section">
        <LeaderBoard 
        :kinoko="leaderboardCounts.kinoko" :takenoko="leaderboardCounts.takenoko" 
  />
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
    LeaderBoard
  },
  data() {
    return {
      leaderboardCounts: {
        kinoko: 5, // Initial values
        takenoko: 2,
      },
    };
  },
  methods: {
    handleImageUploaded(newCounts) {
      // Update leaderboardCounts with the new totals
      this.leaderboardCounts.kinoko += newCounts.kinoko;
      this.leaderboardCounts.takenoko += newCounts.takenoko;
      console.log("Updated leaderboardCounts:", this.leaderboardCounts);
    },
    toggleLanguage() {
      console.log("aqui")
      this.$i18n.locale = this.$i18n.locale === "en" ? "ja" : "en";
    }
  },

  };

//   data() {
//     return {
//       kinokoCount: 0,
//       takenokoCount: 0,
//     };
//   },
//   methods: {
//     // Update them separately wherever needed
//     updateKinoko(value) {
//       this.kinokoCount = value;
//     },
//     updateTakenoko(value) {
//       this.takenokoCount = value;
//     },
//     // Or if you're updating from an API response:
//     handleApiResponse(data) {
//       if (data.kinoko !== undefined) {
//         this.kinokoCount = data.kinoko;
//       }
//       if (data.takenoko !== undefined) {
//         this.takenokoCount = data.takenoko;
//       }
//     }
//   }
// };
</script>

<style>
/* Import the ludical font from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&display=swap");

/* Apply the font to the entire app */
* {
  font-family: "Baloo 2", cursive;
}

body {
  background-color: #f9f7f0;
  background-image: radial-gradient(#f8d7da 1px, transparent 1px),
    radial-gradient(#c3e6cb 1px, transparent 1px);
  background-size: 20px 20px;
  background-position: 0 0, 10px 10px;
}

.modern-button {
      background-color: #D2691E; /* A modern blue */
      color: #fff;
      border: none;
      outline: none;
      padding: 12px 24px;
      border-radius: 6px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s ease, box-shadow 0.3s ease;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    }

    .modern-button:hover {
      background-color: #D2691E;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
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
  margin-bottom: 0;
  margin-top: 0;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.kinoko {
  color: #D2691E;
}

.takenoko {
  color: #4caf50;
}

h2 {
  margin-top: 0;
  color: #491212;
}

p {
  color: #53595f;
  font-size: 1.2em;
  line-height: 1.4;
}

.upload-section,
.leaderboard-section {
  margin-bottom: 2em;
}

button {
  font-family: "Baloo 2", cursive !important;
  font-weight: 600;
  transition: all 0.3s ease;
}

button:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}
</style>
