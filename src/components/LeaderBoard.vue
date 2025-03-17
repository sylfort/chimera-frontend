<!-- // LeaderBoard.vue - Fixed version -->

<!-- LeaderBoard.vue -->
<template>
  <div class="leaderboard">
    <h2>{{ $t("leaderboard.title") }}</h2>
    <div class="bar-chart">
      <div class="bar-container">
        <div class="sweet-name">
          {{ $t("leaderboard.kinoko") }}: {{ kinoko }}
        </div>
        <div class="bar-wrapper">
          <div ref="kinokoContainer" class="bar-outer">
            <!-- SVG will be inserted here by D3 -->
          </div>
          <div class="count-label"></div>
        </div>
      </div>
      <div class="bar-container">
        <div class="sweet-name">
          {{ $t("leaderboard.takenoko") }}: {{ takenoko }}
        </div>
        <div class="bar-wrapper">
          <div ref="takenokoContainer" class="bar-outer">
            <!-- SVG will be inserted here by D3 -->
          </div>
          <div class="count-label"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";

export default {
  name: "LeaderBoard",
  props: {
    kinoko: {
      type: Number,
      default: 0,
    },
    takenoko: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      baseline: 0.5,
      scaleFactor: 0.02,
      // Remove the duplicate state:
      // cumulative: { kinoko: 5, takenoko: 2 },
      kinokoSvg: null,
      takenokoSvg: null,
      kinokoBar: null,
      takenokoBar: null,
      kinokoText: null,
      takenokoText: null,
    };
  },
  mounted() {
    // Use the props for initialization:
    this.initializeBar(
      this.$refs.kinokoContainer,
      "#D2691E",
      "kinokoSvg",
      "kinokoBar",
      "kinokoText",
      this.kinoko
    );
    this.initializeBar(
      this.$refs.takenokoContainer,
      "#8ee56c",
      "takenokoSvg",
      "takenokoBar",
      "takenokoText",
      this.takenoko
    );
  },
  watch: {
    kinoko(newVal) {
      this.updateKinoko(newVal);
    },
    takenoko(newVal) {
      this.updateTakenoko(newVal);
    },
  },
  methods: {
    initializeBar(container, color, svgProp, barProp, textProp, initialValue) {
      const width = container.clientWidth;
      const height = 40;
      this[svgProp] = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "progress-svg");

      this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", "#eee");

      this[barProp] = this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.calculateWidth(initialValue, width))
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", color);

      this[textProp] = this[svgProp]
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text(initialValue);
    },
    calculateWidth(value, totalWidth) {
      const percentage = this.baseline + value * this.scaleFactor;
      return Math.min(percentage, 1) * totalWidth;
    },
    animateBar(bar, text, newTotal) {
      const currentValue = +text.text();
      const containerWidth = bar.node().parentNode.getBoundingClientRect().width;
      const newWidth = this.calculateWidth(newTotal, containerWidth);

      // Animate the SVG bar's width
      bar
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("width", newWidth);

      // Animate the text number within the SVG
      text
        .transition()
        .duration(1000)
        .tween("text", () => {
          const interpolate = d3.interpolateNumber(currentValue, newTotal);
          return (t) => {
            text.text(Math.round(interpolate(t)));
          };
        });
    },
    updateKinoko(newKinoko) {
      console.log("Updating kinoko to:", newKinoko);
      this.animateBar(this.kinokoBar, this.kinokoText, newKinoko);
    },
    updateTakenoko(newTakenoko) {
      console.log("Updating takenoko to:", newTakenoko);
      this.animateBar(this.takenokoBar, this.takenokoText, newTakenoko);
    },
  },
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
  font-size: 1.2em;
  text-align: left;
  margin-bottom: 5px;
}

.bar-wrapper {
  display: flex;
  align-items: center;
  gap: 15px;
}

.bar-outer {
  flex-grow: 1;
  height: 40px;
  position: relative;
  overflow: hidden;
}

/* .count-label {
  min-width: 100px;
  text-align: left;
  font-weight: 500;
  color: #555;
} */

.progress-svg text {
  font-size: 14px;
  font-weight: bold;
}
</style>
