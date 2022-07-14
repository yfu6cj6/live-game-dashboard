<template>
  <div>
    <div ref="container" class="view-container">
      <div ref="seachForm" class="view-container-seachForm" :class="{'opened': sidebar.opened}">
        <div ref="seachFormExpand" class="view-container-seachForm-item">
          <p class="view-container-seachForm-item-wrap pc">
            <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.id" type="number" placeholder="ID" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
          </p>
          <p class="view-container-seachForm-item-wrap">
            <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
              <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
            </el-select>
          </p>
        </div>
        <div class="view-container-seachForm-item">
          <div class="view-container-seachForm-item-group">
            <p class="view-container-seachForm-item-wrap pc">
              <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
                {{ $t("__search") }}
              </el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
                {{ $t("__create") }}
              </el-button>
            </p>
            <p class="view-container-seachForm-item-wrap">
              <el-button class="moreSearch" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
                {{ $t("__moreSearch") }}
              </el-button>
            </p>
          </div>
        </div>
      </div>
      <div ref="table" class="view-container-table">
        <div
          v-for="(item, index) in tableData"
          :key="index"
          class="view-container-table-row"
          :class="{'single-row': index % 2 === 0}"
        >
          <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.png" :alt="$t('__dealerPhoto')">
          <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
          <table>
            <tr>
              <td>
                <span class="header">ID:</span>
                <span>{{ item.id }}</span>
              </td>
              <td>
                <span class="header">{{ $t('__account') }}:</span>
                <span>{{ item.account }}</span>
              </td>
              <td>
                <span class="header">{{ $t('__name') }}:</span>
                <span>{{ item.name }}</span>
              </td>
            </tr>
            <tr>
              <td>
                <span class="header">{{ $t('__activated') }}:</span>
                <span class="status" :class="{'statusOpen': item.status === '1' }">{{ item.statusLabel }}</span>
              </td>
              <td>
                <span class="header">{{ $t('__creator') }}:</span>
                <span>{{ item.creator }}</span>
              </td>
              <td>
                <div class="operate">
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(scope.row)">{{ $t("__loginBarcode") }}</el-button>
                  <a :href="item.dns1d" :download="item.name">
                    <el-button class="bg-yellow" size="mini">{{ $t("__loginBarcodeDownload") }}</el-button>
                  </a>
                  <el-button class="bg-yellow" size="mini" @click="onEditBtnClick(scope.row)">{{ $t("__edit") }}</el-button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="view-footer" :class="{'opened': sidebar.opened}">
      <el-pagination
        layout="prev, pager, next, jumper, sizes"
        :total="totalCount"
        background
        :page-size="pageSize"
        :page-sizes="pageSizes"
        :pager-count="pagerCount"
        :current-page.sync="currentPage"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { dealerSearch } from '@/api/backstageManagement/dealerManagement'
import { mapGetters } from 'vuex'
import common from '@/layout/mixin/common'
import handlePageChange from '@/layout/mixin/handlePageChange'
import handleSearchFormOpen from '@/layout/mixin/handleSearchFormOpen'

export default {
  name: 'DealerManagement',
  components: { },
  mixins: [common, handlePageChange, handleSearchFormOpen],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      curDialogIndex: 0,
      paginationPagerCount: 5
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount;
    },
    pagerCount() {
      return this.paginationPagerCount
    }
  },
  watch: {
    'searchForm.status'() {
      this.resizeHandler();
    }
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      var formHeight = 34;
      if (vw <= 768) {
        formHeight = this.searchFormOpen ? 136 + (this.searchForm.status.length * 32) : formHeight;
        this.paginationPagerCount = 5;
      } else if (vw > 768 && vw <= 992) {
        formHeight = this.searchFormOpen ? 68 + (this.searchForm.status.length * 32) : formHeight;
        this.paginationPagerCount = 7;
      } else {
        formHeight = 34 + (this.searchForm.status.length * 32);
        this.paginationPagerCount = 7;
      }

      this.$refs.seachFormExpand.style.height = `${formHeight}px`;
      setTimeout(() => {
        this.$refs.table.style.top = `${this.$refs.seachForm.clientHeight}px`;
        this.$refs.table.style.height = `calc(100vh - 45px - 35px - 40px - ${this.$refs.seachForm.clientHeight}px)`;
      }, 300);
    },
    onSearchBtnClick(data, page) {
      this.searchForm = data
      this.handleCurrentChange(page)
    },
    onSubmit() {
      this.dataLoading = true
      dealerSearch(this.searchForm).then((res) => {
        this.handleRespone(res)
      }).catch(() => {
        this.closeLoading()
      })
    },
    handleRespone(res) {
      this.$refs.container.scrollTop = 0;
      this.$refs.table.scrollTop = 0;
      this.searchItems = res.searchItems
      this.totalCount = res.rows.length
      this.allDataByClient = res.rows
      this.allDataByClient.forEach(element => {
        const statusItem = this.searchItems.status.find(item => item.key === element.status)
        if (statusItem) {
          element.statusLabel = statusItem.nickname
        }
      })
      this.handlePageChangeByClient(this.currentPage)

      this.closeDialogEven()
      this.closeLoading()
    },
    closeLoading() {
      this.dataLoading = false
    },
    closeDialogEven() {
      this.curDialogIndex = this.dialogEnum.none
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.view {
  &-container {
    &-seachForm {
      &-item {
        height: 34px;
      }
    }
    &-table {
      &-row {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        .dealerPhoto {
          vertical-align: middle;
          width: 105px;
        }
        table {
          tr {
            display: flex;
            flex-direction: column;
            td {
              line-height: 20px;
              .header {
                font-weight: bold;
                margin-right: 5px;
              }
              .status {
                color: #f00;
                font-weight: bold;
              }
              .statusOpen {
                color: #090;
              }
              .operate {
                width: 250px;
                display: flex;
                justify-content: space-between;
                a {
                  .el-button {
                    height: 100%;
                    vertical-align: top;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          table {
            display: flex;
            justify-content: space-evenly;
            width: 600px;
            tr {
              td {
                line-height: 35px;
              }
            }
          }
        }
      }
    }
  }
}

@media screen and (min-width: 992px) {
  .view {
    &-container {
      &-table {
        &-row {
          justify-content: space-evenly;
          .dealerPhoto {
            width: 210px;
          }
          table {
            display: inline-block;
            tr {
              display: block;
              td {
                display: inline-block;
                width: 350px;
                font-size: 20px;
                line-height: 60px;
                .operate {
                  width: 100%;
                  .el-button {
                    font-size: 20px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>
