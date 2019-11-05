export default {
  methods: {
    isActive(path) {
      return this.$route.matched[2] ? this.$route.matched[2].path === path : false
    }
  }
}
