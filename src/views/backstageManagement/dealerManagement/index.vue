<template>
  <div class="view-container">
    <div class="view-seachForm">
      <div class="seachForm-item" :class="{'open': searchFormOpen}">
        <p class="wrap pc">
          <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, currentPage)">{{ $t("__refresh") }}</el-button>
        </p>
        <p class="wrap">
          <el-input v-model="searchForm.id" type="number" placeholder="ID" />
        </p>
        <p class="wrap">
          <el-input v-model="searchForm.account" :placeholder="$t('__account')" />
        </p>
        <p class="wrap">
          <el-input v-model="searchForm.name" :placeholder="$t('__name')" />
        </p>
        <p class="wrap">
          <el-select v-model="searchForm.status" multiple filterable :collapse-tags="statusCollapse" :placeholder="$t('__status')">
            <el-option v-for="item in searchItems.status" :key="item.key" :label="item.nickname" :value="item.key" />
          </el-select>
        </p>
      </div>
      <div class="seachForm-item">
        <div class="group">
          <p class="wrap pc">
            <el-button class="bg-gray" size="mini" @click="onSearchBtnClick({}, 1)">{{ $t("__reset") }}</el-button>
          </p>
          <p class="wrap">
            <el-button class="bg-yellow" size="mini" @click="onSearchBtnClick(searchForm, 1)">
              {{ $t("__search") }}
            </el-button>
          </p>
          <p class="wrap">
            <el-button class="bg-yellow" size="mini" @click="onCreateBtnClick()">
              {{ $t("__create") }}
            </el-button>
          </p>
          <p class="wrap">
            <el-button class="moreSearch" size="mini" :icon="advancedSearchIcon" @click="searchFormOpen = !searchFormOpen">
              {{ $t("__moreSearch") }}
            </el-button>
          </p>
        </div>
      </div>
    </div>
    <div class="view-wrap">
      <div />
    </div>
  </div>
</template>

<script>
import { dealerSearch } from '@/api/backstageManagement/dealerManagement'
import handlePageChange from '@/layout/mixin/handlePageChange'

export default {
  name: 'DealerManagement',
  components: { },
  mixins: [handlePageChange],
  data() {
    return {
      dialogEnum: Object.freeze({
        'none': 0,
        'create': 1,
        'edit': 2
      }),
      searchForm: {},
      searchItems: {},
      searchFormOpen: false,
      curDialogIndex: 0
    }
  },
  computed: {
    advancedSearchIcon() {
      return this.searchFormOpen ? "el-icon-arrow-up" : "el-icon-arrow-down";
    }
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
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

.view-container {
  .seachForm-item {
    height: 34px;
  }

  .seachForm-item.open {
    height: 136px;
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
  .view-container {
    .seachForm-item.open {
      height: 68px;
    }
  }
}

@media screen and (min-width: 992px) {
  .view-container {
    .view-seachForm {
      background-color: red;
      .seachForm-item {
        height: 50px;
      }
      .seachForm-item.open {
      }
    }
  }
}
</style>
