import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      dataLoading: false,
      tempRoute: {}
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ])
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route);
  }
}
