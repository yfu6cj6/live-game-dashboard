// => 換頁相關變數與函式都放這
export default {
  data() {
    return {
      searchFormOpen: false
    }
  },
  computed: {
    advancedSearchIcon() {
      return this.searchFormOpen ? "el-icon-arrow-up" : "el-icon-arrow-down";
    }
  },
  watch: {
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
