<template>
  <div
    ref="el"
    @mousedown.stop.prevent="onMouseDown"
    @mouseup.stop.prevent="onMouseUp"
  >
    <slot />
  </div>
</template>

<script>
export default {
  name: "DragScroll",
  data() {
    return {
      isDragging: false,
      cursorPos: [0, 0],
      el: null
    };
  },
  mounted() {
    window.addEventListener("mouseup", this.onMouseUp);
  },
  destroyed() {
    window.removeEventListener("mouseup", this.onMouseUp);
  },
  methods: {
    /** @param {MouseEvent} ev */
    onMouseDown(ev) {
      this.cursorPos = [ev.pageX, ev.pageY];
      this.isDragging = true;

      window.addEventListener("mousemove", this.onMouseHold);
    },
    /** @param {MouseEvent} ev */
    onMouseUp(ev) {
      window.removeEventListener("mousemove", this.onMouseHold);
      this.isDragging = false;
    },
    /** @param {MouseEvent} ev */
    onMouseHold(ev) {
      ev.preventDefault();

      requestAnimationFrame(() => {
        const delta = [
          ev.pageX - this.cursorPos[0],
          ev.pageY - this.cursorPos[1]
        ];

        this.cursorPos = [ev.pageX, ev.pageY];

        if (!this.$refs.el) return;
        this.$refs.el.scrollBy({
          left: -delta[0],
          top: -delta[1]
        });
      });
    }
  }
};
</script>
