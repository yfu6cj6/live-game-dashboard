<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div ref="table" class="view-container-table">
      <div v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0">
        <div class="view-container-table-row">
          <div class="wrap header">
            <div class="item selection">
              <el-checkbox v-model="selectAll" class="red-tick" @change="selection" />
            </div>
            <div class="item name">
              <span>{{ $t('__name') }}</span>
            </div>
            <div class="item nickname">
              <span>{{ $t('__nickname') }}</span>
            </div>
          </div>
        </div>
        <div
          v-for="(item, index) in serverData.allPermissions"
          :key="index"
          class="view-container-table-row"
          :class="{'single-row': index % 2 === 0}"
        >
          <div class="wrap">
            <div class="item selection">
              <el-checkbox v-model="item.exist" class="red-tick" @change="handleCheckboxChange" />
            </div>
            <div class="item name">
              <span>{{ item.name }}</span>
            </div>
            <div class="item nickname">
              <span>{{ item.nickname }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
    </div>
    <span v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0 && !dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="selection(false)">{{ $t('__cancelSelect') }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'RolePermissionDialog',
  mixins: [dialogCommon],
  props: {
    'title': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'visible': {
      type: Boolean,
      require: true
    },
    'confirm': {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  data: function() {
    return {
      serverData: {},
      administer: {},
      selectAll: false
    }
  },
  methods: {
    setData(data) {
      this.serverData = data
      this.administer = this.serverData.allPermissions.find(allPermission => allPermission.name === 'Administer')
      const administerIndex = this.serverData.allPermissions.indexOf(this.administer)
      if (administerIndex >= 0) {
        this.serverData.allPermissions.splice(administerIndex, 1)
      }
      const isAdminister = this.serverData.existPermissions.some(exist => exist.id === this.administer.id);
      this.selectAll = isAdminister;
      this.serverData.allPermissions.forEach(element => {
        element.exist = isAdminister ? true : this.serverData.existPermissions.some(exist => element.id === exist.id);
      });
      this.serverData.allPermissions = JSON.parse(JSON.stringify(this.serverData.allPermissions));
    },
    selection(select) {
      this.serverData.allPermissions.forEach(element => {
        element.exist = select;
      });
      this.serverData.allPermissions = JSON.parse(JSON.stringify(this.serverData.allPermissions));
    },
    handleCheckboxChange(select) {
      if (select) {
        this.selectAll = !this.serverData.allPermissions.some(permissions => permissions.exist === false);
      } else {
        this.selectAll = false;
      }
    },
    onSubmit() {
      const notAnAdminister = this.serverData.allPermissions.some(permissions => permissions.exist === false);
      var data = {};
      if (notAnAdminister) {
        data = this.serverData.allPermissions.filter(permissions => permissions.exist);
      } else {
        data = [this.administer];
      }
      this.$emit('confirm', JSON.parse(JSON.stringify(data)))
    }
  }
}
</script>

<style lang="scss" scoped>
.view {
  &-container {
    &-table {
      &-row {
        .wrap {
          justify-content: space-between;
          &.header {
            font-weight: bold;
            font-size: 18px;
          }
          .item {
            display: flex;
            align-items: center;
          }
          .selection {
            width: 15px;
          }
          .name {
            width: 190px;
          }
          .nickname {
            width: 80px;
          }
        }
      }
      .noInformation {
        color: #fff;
        font-size: 18px;
        padding-bottom: 20px;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .view {
    &-container {
      &-table {
        &-row {
          .wrap {
            .item {
              width: auto;
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
          .wrap {
            &.header {
              font-weight: bold;
              font-size: 22px;
            }
            .item {
              width: auto;
            }
          }
        }
      }
    }
  }
}
</style>
