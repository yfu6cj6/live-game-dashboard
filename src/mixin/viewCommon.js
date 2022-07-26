export default {
  data() {
    return {
      dataLoading: false,
      tempRoute: {}
    }
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route);
  }
}
