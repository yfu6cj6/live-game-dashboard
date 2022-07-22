// => 換頁相關變數與函式都放這
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      tempRoute: {},
      searchFormOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'device',
      'visitedViews'
    ]),
    advancedSearchIcon() {
      return this.searchFormOpen ? "el-icon-arrow-up" : "el-icon-arrow-down";
    }
  },
  watch: {
    'visitedViews'() {
      if (this.$route.path === this.tempRoute.path) {
        this.resizeHandler();
      }
    },
    'sidebar.opened'() {
      this.resizeHandler();
    },
    'searchFormOpen'() {
      this.resizeHandler();
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  created() {
    this.tempRoute = Object.assign({}, this.$route);
  },
  methods: {
    setHeight() {
      const tagsView = document.getElementsByClassName("tagsView");
      if (tagsView && tagsView.length > 0) {
        this.$refs.container.style.height = `calc(100vh - 45px - ${tagsView[0].clientHeight}px - 40px)`;
      }
      setTimeout(() => {
        this.$refs.table.style.height = `${this.$refs.container.clientHeight - this.$refs.seachForm.clientHeight}px`;
      }, 300);
    }
  }
}
