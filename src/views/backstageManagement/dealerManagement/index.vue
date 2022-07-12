<template>
  <div class="view-container">
    <div class="view-seachForm">
      <div class="seachForm-item seachForm-expand">
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
      <div
        v-for="(item, index) in tableData"
        :key="index"
        class="row"
        :class="{'single-row': index % 2 === 0}"
      >
        <div>
          <img v-if="item.photo_url === ''" class="dealerPhoto" src="@/assets/unknown.jpg" :alt="$t('__dealerPhoto')">
          <img v-else :src="item.photo_url" class="dealerPhoto" :alt="$t('__dealerPhoto')">
        </div>
        <div>
          <p>ID: {{ item.id }}</p>
          <p>{{ $t('__account') }}: {{ item.account }}</p>
          <p>{{ $t('__name') }}: {{ item.name }}</p>
          <p>{{ $t('__activated') }}: {{ item.statusLabel }}</p>
          <p>
            {{ $t('__loginBarcode') }}:
            <img :src="item.dns1d" :alt="$t('__loginBarcode')">
          </p>
          <p>{{ $t('__creator') }}: {{ item.creator }}</p>
          <p><el-button class="bg-yellow" size="mini" @click="onEditBtnClick(scope.row)">{{ $t("__edit") }}</el-button></p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { dealerSearch } from '@/api/backstageManagement/dealerManagement'
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
      curDialogIndex: 0
    }
  },
  computed: {
    statusCollapse() {
      return this.searchForm.status && this.searchForm.status.length > this.selectCollapseCount
    }
  },
  watch: {
  },
  created() {
    this.onSearchBtnClick({}, 1);
  },
  methods: {
    resizeHandler() {
      const vw = window.innerWidth;
      const seachFormItem = document.getElementsByClassName("seachForm-expand");
      var formHeight = "34px";
      if (this.searchFormOpen) {
        if (vw <= 768) {
          formHeight = `${136 + (this.searchForm.status.length * 32)}px`;
        } else if (vw > 768 && vw <= 992) {
          formHeight = `${68 + (this.searchForm.status.length * 32)}px`;
        } else {
          formHeight = `${34 + (this.searchForm.status.length * 32)}px`;
        }
      } else {
        if (vw > 992) {
          formHeight = `${34 + (this.searchForm.status.length * 32)}px`;
        }
      }
      seachFormItem.forEach(item => {
        item.style.height = formHeight;
      });
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
.view-container {
  .view-seachForm {
    .seachForm-item {
      height: 34px;
    }
  }
  .view-wrap {
    .row {
      display: flex;
      align-items: center;
      padding: 3px;
      .dealerPhoto {
        vertical-align: middle;
        width: 150px;
      }
    }
  }
}
</style>
