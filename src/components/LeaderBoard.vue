<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="bar-chart">
      <div class="bar-container">
        <div class="sweet-name">Kinoko: {{ counts.kinoko }}</div>
        <div class="bar-wrapper">
          <div ref="kinokoContainer" class="bar-outer">
            <!-- SVG will be inserted here by D3 -->
          </div>
          <div class="count-label"></div>
        </div>
      </div>
      <div class="bar-container">
        <div class="sweet-name">Takenoko: {{ counts.takenoko }}</div>
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
    counts: {
      type: Object,
      default: () => ({
        kinoko: 5,
        takenoko: 2,
      }),
    },
  },
  data() {
    return {
      baseline: 0.5,
      scaleFactor: 0.02,
      kinokoSvg: null,
      takenokoSvg: null,
      kinokoBar: null,
      takenokoBar: null,
      kinokoText: null,
      takenokoText: null,
    };
  },
  mounted() {
    this.initializeBar(
      this.$refs.kinokoContainer,
      "#D2691E",
      "kinokoSvg",
      "kinokoBar",
      "kinokoText",
      this.counts.kinoko
    );
    this.initializeBar(
      this.$refs.takenokoContainer,
      "#8ee56c",
      "takenokoSvg",
      "takenokoBar",
      "takenokoText",
      this.counts.takenoko
    );
  },
  watch: {
    "counts.kinoko"(newVal) {
      this.animateBar(this.kinokoBar, this.kinokoText, newVal);
    },
    "counts.takenoko"(newVal) {
      this.animateBar(this.takenokoBar, this.takenokoText, newVal);
    },
  },
  methods: {
    /**
     * Initialize a D3 progress bar.
     */
    initializeBar(
      container,
      color,
      svgProp,
      barProp,
      textProp,
      initialValue
    ) {
      const width = container.clientWidth;
      const height = 40;

      // Create the SVG container
      this[svgProp] = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "progress-svg");

      // Add background bar (trail)
      this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", "#eee");

      // Add progress bar
      this[barProp] = this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.calculateWidth(initialValue, width))
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", color);

      // Add text label
      this[textProp] = this[svgProp]
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text(initialValue);
    },

    /**
     * Calculate width for a bar based on a value.
     */
    calculateWidth(value, totalWidth) {
      const percentage = this.baseline + value * this.scaleFactor;
      return Math.min(percentage, 1) * totalWidth;
    },

    /**
     * Animate a progress bar.
     */
    animateBar(bar, text, updateAmount) {
      const width = bar.node().parentNode.getBoundingClientRect()
        .width;
      const newWidth = this.calculateWidth(updateAmount, width);

      // Animate the bar width
      bar
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("width", newWidth)
        .on("end", () => {
          text.text(updateAmount);
        });

      // Animate the text update
      text
        .transition()
        .duration(1000)
        .tween("text", () => {
          const currentText = +text.text();
          const interpolate = d3.interpolateNumber(currentText, updateAmount);
          return (t) => {
            text.text(Math.round(interpolate(t)));
          };
        });
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

.count-label {
  min-width: 100px;
  text-align: left;
  font-weight: 500;
  color: #555;
}

/* Style for the SVG progress text */
.progress-svg text {
  font-size: 14px;
  font-weight: bold;
}
</style>
