<template>
  <div class="bg-black num-pre-page" :class="{'open': sidebar.opened}">
    <div v-if="dropdown" class="cover" @click.stop="toggleDropdown" />
    <div class="text-white ml-auto d-flex align-items-center" style="height: 30px; padding-right: 15px;">
      <span class="ml-auto" style="position: relative; width: 10px; height: 100%;" />
      <template v-if="showPageNumber">
        <div class="num-per ml-3" style="position: relative; width: auto; height: 100%;">
          <el-pagination
            layout="prev, pager, next"
            small
            :total="total"
            :page-size="pageSize"
            :page-sizes="pageSizes"
            :current-page.sync="currentPage"
            @current-change="handleCurrentChange"
          />
        </div>
        <div class="num-per ml-3" style="position: relative; width: 45px; height: 100%;">
          <div class="dropDown bg-black w-100" style="position: absolute; bottom: 0px; z-index: 10; border: 1px solid rgb(248, 201, 4);">
            <input
              v-model="inputCurrentPage"
              type="number"
              class="size m-0 w-100 pl-2"
              style="height: 30px; line-height: 30px;"
              @keyup.enter="handleCurrentChange(inputCurrentPage)"
            >
          </div>
        </div>
      </template>
      <div class="label pr-1 ml-3">{{ $t('__display') }}</div>
      <div class="num-per" style="position: relative; width: 45px; height: 100%;">
        <div class="dropDown bg-black w-100" style="position: absolute; bottom: 0px; z-index: 10; border: 1px solid rgb(248, 201, 4);">
          <template v-if="dropdown">
            <div
              v-for="(item, index) in pageSizes"
              :key="index"
              class="item m-0 w-100 pl-2"
              :class="{current: item === pageSize}"
              style="height: 30px; line-height: 30px;"
              @click.stop="selectPageSize(item)"
            >
              {{ item }}
            </div>
          </template>
          <template v-else>
            <div class="item m-0 w-100 pl-2" style="height: 30px; line-height: 30px;" @click.stop="toggleDropdown">
              {{ pageSize }}
            </div>
          </template>
        </div>
      </div>
      <div class="label pl-1">{{ $t('__bar') }}</div>
      <div class="label">{{ `, ${$t('__total')} ${total}${$t('__bar')}` }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'Pagination',
  props: {
    pageSize: {
      type: Number,
      require: true,
      default() {
        return 100
      }
    },
    pageSizes: {
      type: Array,
      require: true,
      default() {
        return [50, 100, 200, 300, 500]
      }
    },
    currentPage: {
      type: Number,
      require: true,
      default() {
        return 1
      }
    },
    total: {
      type: Number,
      require: true,
      default() {
        return 0
      }
    },
    showPageNumber: {
      type: Boolean,
      require: true,
      default() {
        return true
      }
    }
  },
  data() {
    return {
      inputCurrentPage: 1,
      dropdown: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  methods: {
    selectPageSize(pageSize) {
      this.$emit('size-change', pageSize)
      this.toggleDropdown()
    },
    handleCurrentChange(page) {
      const max = Math.floor(this.total / this.pageSize) + 1
      if (page > max) {
        page = max
      } else if (page < 1) {
        page = 1
      }
      this.$emit('current-change', page)
    },
    toggleDropdown() {
      this.dropdown = !this.dropdown
    }
  }
}
</script>

<style lang="scss" scoped>
.num-pre-page {
  position: fixed;
  bottom: 0px;
  left: 50px;
  width: calc(100vw - 50px);
  z-index: 11;
  padding: 0;
  height: 30px;
  transition: all .3s;
  &.open {
    left: 200px;
    width: calc(100vw - 200px);
    transition: all .5s;
  }
  .cover {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.5);
    z-index: 10;
  }
  .num-per {
    .item {
      cursor: pointer;
    }
    .current {
      color: #f8c904;
    }
  }
}
</style>
