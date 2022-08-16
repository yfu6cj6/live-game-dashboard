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
  },
  watch: {
  },
  methods: {
    moreInfo() {
      this.pageSizeCount++;
      this.handleCurrentChange(1)
    },
    moreInfoByClient() {
      this.pageSizeCount++;
      this.handlePageChangeByClient(1)
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
      this.tableData = this.allDataByClient.slice((this.currentPage - 1) * this.pageSize, this.currentPage * (this.pageSize * this.pageSizeCount))
    }
  }
}
