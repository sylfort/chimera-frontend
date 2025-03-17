<template>
  <div class="leaderboard">
    <h2>Leaderboard</h2>
    <div class="bar-chart">
      <div class="bar-container">
        <!-- Display the cumulative value in the name -->
        <div class="sweet-name">Kinoko: {{ cumulative.kinoko }}</div>
        <div class="bar-wrapper">
          <div ref="kinokoContainer" class="bar-outer">
            <!-- SVG will be inserted here by D3 -->
          </div>
          <div class="count-label"></div>
        </div>
      </div>
      <div class="bar-container">
        <div class="sweet-name">Takenoko: {{ cumulative.takenoko }}</div>
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
    // The incoming `counts` represent the incremental updates
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
      // A baseline and scaling factor for the progress bar width
      baseline: 0.5,
      scaleFactor: 0.02,
      // Store the current cumulative totals here.
      // These are initialized with the default values.
      cumulative: {
        kinoko: 5,
        takenoko: 2,
      },
      kinokoSvg: null,
      takenokoSvg: null,
      kinokoBar: null,
      takenokoBar: null,
      kinokoText: null,
      takenokoText: null,
    };
  },
  mounted() {
    // Initialize each bar with the starting cumulative totals.
    this.initializeBar(
      this.$refs.kinokoContainer,
      "#D2691E",
      "kinokoSvg",
      "kinokoBar",
      "kinokoText",
      this.cumulative.kinoko
    );
    this.initializeBar(
      this.$refs.takenokoContainer,
      "#8ee56c",
      "takenokoSvg",
      "takenokoBar",
      "takenokoText",
      this.cumulative.takenoko
    );
  },
  watch: {
    // When a new value is received (e.g. 1 for kinoko),
    // add it to the existing cumulative value and animate.
    "counts.kinoko"(increment) {
      this.animateBar(this.kinokoBar, this.kinokoText, "kinoko", increment);
    },
    "counts.takenoko"(increment) {
      this.animateBar(this.takenokoBar, this.takenokoText, "takenoko", increment);
    },
  },
  methods: {
    /**
     * Initialize a D3 progress bar.
     *
     * @param {HTMLElement} container - The element in which the SVG is inserted.
     * @param {string} color - The fill color of the progress bar.
     * @param {string} svgProp - The property name for the SVG reference.
     * @param {string} barProp - The property name for the bar reference.
     * @param {string} textProp - The property name for the text element reference.
     * @param {number} initialValue - The starting value to display.
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

      // Add the background bar (trail)
      this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", "#eee");

      // Add the progress bar with the initial width corresponding to the value
      this[barProp] = this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", this.calculateWidth(initialValue, width))
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", color);

      // Add the text label (showing the current cumulative value)
      this[textProp] = this[svgProp]
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text(initialValue);
    },

    /**
     * Calculate the width of a bar based on its value.
     *
     * @param {number} value - The value (cumulative total).
     * @param {number} totalWidth - The total width of the SVG container.
     * @returns {number} - The calculated width of the progress bar.
     */
    calculateWidth(value, totalWidth) {
      const percentage = this.baseline + value * this.scaleFactor;
      return Math.min(percentage, 1) * totalWidth;
    },

    /**
     * Animate the progress bar by adding the new increment to the cumulative sum.
     *
     * @param {Object} bar - The D3 selection for the bar (rect element).
     * @param {Object} text - The D3 selection for the text element.
     * @param {string} key - The key ("kinoko" or "takenoko") for which we're updating.
     * @param {number} increment - The new value to add (e.g., 1 for kinoko).
     */
    animateBar(bar, text, key, increment) {
      // Update the cumulative value
      this.cumulative[key] += increment;
      const currentValue = +text.text();
      const newTotal = this.cumulative[key];

      // Get the width of the container
      const containerWidth =
        bar.node().parentNode.getBoundingClientRect().width;
      const newWidth = this.calculateWidth(newTotal, containerWidth);

      // Animate the bar width transition
      bar
        .transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("width", newWidth);

      // Animate the text update to show the cumulative sum
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
