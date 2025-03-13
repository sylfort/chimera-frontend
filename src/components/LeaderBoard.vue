<template>
    <div class="leaderboard">
      <h2>Leaderboard</h2>
      <div class="bar-chart">
        <div class="bar-container">
          <div class="sweet-name">Kinoko</div>
          <div class="bar-outer">
            <div class="bar kinoko-bar" :style="{ width: getBarWidth('kinoko') }">
              <transition name="count">
                <span class="sweet-count">{{ counts.kinoko }}</span>
              </transition>
            </div>
          </div>
        </div>
        
        <div class="bar-container">
          <div class="sweet-name">Takenoko</div>
          <div class="bar-outer">
            <div class="bar takenoko-bar" :style="{ width: getBarWidth('takenoko') }">
              <transition name="count">
                <span class="sweet-count">{{ counts.takenoko }}</span>
              </transition>
            </div>
          </div>
        </div>
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
    methods: {
      getBarWidth(type) {
        const total = this.counts.kinoko + this.counts.takenoko;
        if (total === 0) return '0%';
        
        const percentage = (this.counts[type] / total) * 100;
        return `${Math.max(percentage, 5)}%`; // Minimum 5% width for visibility
      }
    }
  };
  </script>
    
  <style scoped>
  .leaderboard {
    max-width: 600px;
    margin: 0 auto;
    text-align: center;
    padding: 20px;
    background-color: rgba(255, 255, 255, 0.8);
    border-radius: 12px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
  
  .bar-chart {
    margin-top: 20px;
  }
  
  .bar-container {
    margin-bottom: 20px;
  }
  
  .sweet-name {
    font-weight: bold;
    text-align: left;
    margin-bottom: 5px;
    font-size: 1.2em;
  }
  
  .bar-outer {
    width: 100%;
    height: 40px;
    background-color: #f0f0f0;
    border-radius: 20px;
    overflow: hidden;
  }
  
  .bar {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right: 15px;
    border-radius: 20px;
    transition: width 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  }
  
  .kinoko-bar {
    background: linear-gradient(to right, #8B4513, #D2691E);
  }
  
  .takenoko-bar {
    background: linear-gradient(to right, #4ecd78, #8ee56c);
  }
  
  .sweet-count {
    font-size: 1.4em;
    font-weight: bold;
    color: white;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
  }
  
  /* Count animation */
  .count-enter-active, .count-leave-active {
    transition: all 0.5s;
  }
  .count-enter-from, .count-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  </style>