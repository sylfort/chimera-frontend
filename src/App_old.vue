<template>
  <div id="app">
    <header class="app-header">
      <h1>Sweets Recognition Leaderboard</h1>
      <p>Upload an image of either Kinoko no Yama or Takenoko no Sato</p>
      <p>let`s see which sweet is the most beloved!</p>
    </header>
    <main>
      <section class="upload-section">
        <!-- When the ImageUpload component emits "imageUploaded", handle it -->
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
import LeaderBoard from "./components/LeaderBoard_old.vue";

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
     * Updates the leaderboard counts depending on the classification result.
     * @param {string} type - The classification result ("kinoko" or "takenoko")
     */
    handleImageUploaded(counts) {
      this.leaderboardCounts = {
      kinoko: counts.kinoko,
      takenoko: counts.takenoko
    };
    },
  },
};
</script>

<style scoped>
#app {
  max-width: 900px;
  margin: 0 auto;
  padding: 1em;
}
.app-header {
  text-align: center;
  margin-bottom: 2em;
}
.upload-section,
.leaderboard-section {
  margin-bottom: 2em;
}
</style>
