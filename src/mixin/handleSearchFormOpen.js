// => 換頁相關變數與函式都放這
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      searchFormOpen: false,
      searchFormNormalHeight: "34px"
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
  activated() {
    if (this.$route.path === this.tempRoute.path) {
      this.resizeHandler();
    }
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = this.searchFormNormalHeight;
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? `auto` : formHeight;
      } else if (vw > 768 && vw < 992) {
        formHeight = this.searchFormOpen ? `auto` : formHeight;
      } else {
        formHeight = "auto";
      }
      this.$nextTick(() => {
        if (this.$refs.seachFormExpand) {
          this.$refs.seachFormExpand.style.height = `${formHeight}`;
        }
        if (this.$refs.container) {
          const tagsView = document.getElementsByClassName("tagsView");
          const tagsViewHeight = (tagsView && tagsView.length > 0) ? tagsView[0].clientHeight : 0;
          this.$refs.container.style.height = `calc(100vh - 45px - ${tagsViewHeight}px - 40px)`;
        }
        if (this.$refs.table) {
          this.$refs.table.style.height = `${this.$refs.container.clientHeight - this.$refs.seachForm.clientHeight}px`;
        }
      });
    }
  }
}
