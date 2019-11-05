export default {
  data() {
    return {
      height: 0,
      screenHeight: window.innerHeight
    }
  },
  created() {
    this.height = window.innerHeight - this.subHeight
    window.addEventListener('resize', this.resize)
  },
  methods: {
    resize() {
      return (() => {
        this.screenHeight = window.innerHeight
      })()
    }
  },
  watch: {
    screenHeight(val) {
      this.height = val - this.subHeight
    }
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resize)
  }
}
