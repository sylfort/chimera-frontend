<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="leaderboard-item">
      <div class="sweet-name">Kinoko</div>
      <div class="sweet-count">{{ counts.kinoko }}</div>
    </div>
    <div class="leaderboard-item">
      <div class="sweet-name">Takenoko</div>
      <div class="sweet-count">{{ counts.takenoko }}</div>
    </div>
  </div>
</template>
  
  <script>
export default {
  name: "LeaderBoard",
  props: {
    counts: {
      type: Object,
      required: true,
    },
  },
};
</script>
  
  <style scoped>
.leaderboard {
  max-width: 500px;
  margin: 0 auto;
  text-align: center;
}
.leaderboard-item {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 1em;
  margin: 0.5em 0;
  background-color: #f5f5f5;
  border-radius: 4px;
}
.sweet-name {
  font-weight: bold;
}
.sweet-count {
  font-size: 1.2em;
}
</style>
  