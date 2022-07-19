// => 換頁相關變數與函式都放這
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchFormOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    advancedSearchIcon() {
      return this.searchFormOpen ? "el-icon-arrow-up" : "el-icon-arrow-down";
    }
  },
  watch: {
    'sidebar.opened'() {
      this.resizeHandler();
    },
    'searchFormOpen'() {
      this.resizeHandler();
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler)
  },
  methods: {
  }
}
