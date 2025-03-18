<!-- App.vue -->
<template>
  <div id="app">
    <header class="app-header">
      <h1 v-html="$t('app.title')"></h1>
      <!-- <h2>{{ $t("app.subtitle") }}</h2> -->
      <p v-html="$t('app.description1')"></p>
      <p>{{ $t("app.description2") }}</p>
      <!-- Toggle language button -->
      <button class="modern-button" @click="toggleLanguage">
        {{ $t("app.toggleLang") }}
      </button>
    </header>
    <main>
      <section class="upload-section">
        <ImageUpload @imageUploaded="handleImageUploaded" />
      </section>
      <section class="leaderboard-section" v-if="leaderboardCounts">
        <LeaderBoard 
          :kinoko="leaderboardCounts.kinoko" 
          :takenoko="leaderboardCounts.takenoko" 
        />
      </section>
      <section v-else class="leaderboard-section">
        <p>Loading counts...</p>
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
      kinoko: 433,
      takenoko: 777,  
      }
    };
  },
  methods: {
    handleImageUploaded(newCounts) {
      if (this.leaderboardCounts) {
        this.leaderboardCounts.kinoko += newCounts.kinoko;
        this.leaderboardCounts.takenoko += newCounts.takenoko;
      } else {
        this.leaderboardCounts = { ...newCounts };
      }
      console.log("Updated leaderboardCounts:", this.leaderboardCounts);
    },
    toggleLanguage() {
      console.log("Toggle language");
      this.$i18n.locale = this.$i18n.locale === "en" ? "ja" : "en";
    },
    // Retry fetchCounts with a maximum of maxAttempts attempts.
    fetchCounts(attempt = 1) {
      const maxAttempts = 3;
      fetch("/counts")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          this.leaderboardCounts = data;
        })
        .catch((error) => {
          console.error(`Attempt ${attempt} failed:`, error);
          if (attempt < maxAttempts) {
            console.log(`Retrying in 2 seconds... (attempt ${attempt + 1})`);
            setTimeout(() => {
              this.fetchCounts(attempt + 1);
            }, 2000);
          } else {
            console.error("Max attempts reached. Unable to fetch counts.");
          }
        });
    },
  },
  mounted() {
    // Call the endpoint when the component mounts
    this.fetchCounts();
  },
};
</script>

<style>
/* Import the ludical font from Google Fonts */
@import url("https://fonts.googleapis.com/css2?family=Baloo+2:wght@400;600;700&display=swap");

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
  background-color: #d2691e;
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
  background-color: #d2691e;
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
  color: #d2691e;
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
