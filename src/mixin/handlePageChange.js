// => 換頁相關變數與函式都放這
export default {
  data() {
    return {
      searchForm: {},
      searchItems: {},
      selectForm: {},
      tableData: [],
      allDataByClient: [],
      totalCount: 0,
      pageSize: 25,
      currentPage: 1,
      pageSizes: [50, 100, 200, 300, 500],
      paginationPagerCount: 7,
      pageSizeCount: 1
    }
  },
  computed: {
    pagerCount() {
      return this.paginationPagerCount;
    }
  },
  watch: {
    currentPage() {
      // this.$refs.container.scrollTop = 0;
      // this.$refs.table.scrollTop = 0;
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.resizeHandler);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.resizeHandler);
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      if (vw <= 768) {
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw < 992) {
        this.paginationPagerCount = 7;
      } else {
        this.paginationPagerCount = 7;
      }
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.handleCurrentChange(1)
    },
    handleSizeChangeByClient(val) {
      this.pageSize = val
      this.handlePageChangeByClient(1)
    },
    handleCurrentChange(page) {
      this.currentPage = page
      this.onSubmit()
    },
    handlePageChangeByClient(page) {
      this.currentPage = page
      this.tableData = this.allDataByClient.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    }
  }
}
