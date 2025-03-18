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
      // Weight determining how close the initial state is pulled toward
      // the normalized ratio versus being a flat 50%.
      initialWeight: 0.6,
      kinokoSvg: null,
      takenokoSvg: null,
      kinokoBar: null,
      takenokoBar: null,
      kinokoText: null,
      takenokoText: null,
    };
  },
  computed: {
    // Total count helps us normalize both counts.
    totalCount() {
      return this.kinoko + this.takenoko;
    },
  },
  mounted() {
    // Compute the initial (biased) ratio for each bar.
    const kinokoInitialRatio = this.getInitialRatio(this.kinoko);
    const takenokoInitialRatio = this.getInitialRatio(this.takenoko);

    this.initializeBar(
      this.$refs.kinokoContainer,
      "#D2691E",
      "kinokoSvg",
      "kinokoBar",
      "kinokoText",
      kinokoInitialRatio,
      this.kinoko
    );
    this.initializeBar(
      this.$refs.takenokoContainer,
      "#8ee56c",
      "takenokoSvg",
      "takenokoBar",
      "takenokoText",
      takenokoInitialRatio,
      this.takenoko
    );

    // Animate from the initial biased widths to the final normalized widths.
    this.animateBar(this.kinokoBar, this.kinokoText, this.kinoko);
    this.animateBar(this.takenokoBar, this.takenokoText, this.takenoko);
  },
  watch: {
    kinoko(newVal) {
      console.log("Updating kinoko to:", newVal);
      this.animateBar(this.kinokoBar, this.kinokoText, newVal);
    },
    takenoko(newVal) {
      console.log("Updating takenoko to:", newVal);
      this.animateBar(this.takenokoBar, this.takenokoText, newVal);
    },
  },
  methods: {
    // Returns the normalized ratio of a value relative to the total.
    getNormalizedRatio(value) {
      return this.totalCount > 0 ? value / this.totalCount : 0.5;
    },
    // Returns the initial displayed ratio by pulling the normalized ratio
    // toward 0.5. For example, if the counts are very different (like 12 vs 25)
    // the initial state is biased away from 50% (e.g. ~40% vs ~60%).
    // But for big, nearly equal values (500 vs 525) the initial ratio stays near 50%.
    getInitialRatio(value) {
      const normalized = this.getNormalizedRatio(value);
      return 0.5 + this.initialWeight * (normalized - 0.5);
    },
    /**
     * Initializes a bar with a given initial ratio.
     * @param {HTMLElement} container - Where the SVG is placed.
     * @param {string} color - The bar color.
     * @param {string} svgProp - The property name to store the SVG.
     * @param {string} barProp - The property name for the bar rect.
     * @param {string} textProp - The property name for the count text.
     * @param {number} initialRatio - A value between 0 and 1 for the initial width.
     * @param {number} actualValue - The actual count (for later animation).
     */
    initializeBar(
      container,
      color,
      svgProp,
      barProp,
      textProp,
      initialRatio,
    ) {
      const width = container.clientWidth;
      const height = 40;
      // Create the SVG container.
      this[svgProp] = d3
        .select(container)
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "progress-svg");

      // Draw the background rectangle.
      this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width)
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", "#eee");

      // Draw the progress bar using the initial (biased) ratio.
      this[barProp] = this[svgProp]
        .append("rect")
        .attr("x", 0)
        .attr("y", 0)
        .attr("width", width * initialRatio)
        .attr("height", height)
        .attr("rx", 20)
        .attr("ry", 20)
        .attr("fill", color);

      // Initialize the number text to 0 so the animation visibly counts up.
      this[textProp] = this[svgProp]
        .append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .attr("fill", "#000")
        .text(0);
    },
    /**
     * Animates a bar and its text from the current state to the new final state.
     * The final width is computed from the normalized ratio.
     * @param {D3.Selection} bar - The D3 selection of the bar rect.
     * @param {D3.Selection} text - The D3 selection of the text element.
     * @param {number} newCount - The new count value.
     */
    animateBar(bar, text, newCount) {
      const containerWidth =
        bar.node().parentNode.getBoundingClientRect().width;
      // Final state uses the normalized ratio.
      const finalRatio = this.getNormalizedRatio(newCount);
      const newWidth = finalRatio * containerWidth;
      const currentCount = +text.text();

      // Animate the bar width.
      bar.transition()
        .duration(1000)
        .ease(d3.easeCubicInOut)
        .attr("width", newWidth);

      // Animate the number text.
      text.transition()
        .duration(1000)
        .tween("text", () => {
          const interpolate = d3.interpolateNumber(currentCount, newCount);
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

.progress-svg text {
  font-size: 14px;
  font-weight: bold;
}
</style>
