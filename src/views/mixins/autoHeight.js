export default {
  data() {
    return {
      height: 0,
      screenHeight: window.innerHeight
    }
  },

  created() {
    this.height = window.innerHeight - this.subHeight
    window.addEventListener('resize', () =>
      (() => {
        this.screenHeight = window.innerHeight
      })()
    )
  },
  watch: {
    screenHeight(val) {
      this.height = val - this.subHeight
    }
  }
}
