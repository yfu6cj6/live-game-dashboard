<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="table">
            <template v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0">
              <div class="el-form-item small el-form-item--feedback el-form-item--small">
                <div class="el-form-item__content">
                  <div class="w-100 handicap-table" style="position: relative;">
                    <table class="el-table">
                      <tbody>
                        <tr class="el-table__row head">
                          <td class="ww-2_5">
                            <div class="cell checkbox text-center h-100">
                              <span
                                class="el-checkbox green-tick pl-0"
                                @click="selection(!selectAll)"
                              >
                                <span
                                  :class="{
                                    'unchecked': !selectAll,
                                    'is-checked': selectAll}"
                                >
                                  <span class="el-checkbox__inner" />
                                </span>
                              </span>
                            </div>
                          </td>
                          <td class="ww-12">
                            <div class="cell d-flex align-items-center justify-content-center">{{ $t('__name') }}</div>
                          </td>
                          <td class="ww-4">
                            <div class="cell d-flex align-items-center justify-content-center lower-limit">{{ $t('__nickname') }}</div>
                          </td>
                        </tr>
                        <tr
                          v-for="(item, index) in serverData.allPermissions"
                          :key="index"
                          class="el-table__row"
                        >
                          <td class="ww-2_5">
                            <div class="cell checkbox text-center h-100">
                              <span
                                class="el-checkbox green-tick pl-0"
                                @click="handleCheckboxChange(item)"
                              >
                                <span
                                  class="el-checkbox__input"
                                  :class="{
                                    'unchecked': !item.exist,
                                    'is-checked': item.exist}"
                                >
                                  <span class="el-checkbox__inner" />
                                </span>
                              </span>
                            </div>
                          </td>
                          <td class="ww-12">
                            <div class="cell">
                              <span class="table-item-label">{{ item.name }}</span>
                            </div>
                          </td>
                          <td class="ww-4">
                            <div class="cell name">
                              <span class="table-item-label yellow">{{ item.nickname }}</span>
                            </div>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </template>
            <div v-else class="no-result">{{ $t("__noInformation") }}</div>
          </div>
        </div>
        <div v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0 && !dialogLoading" class="operate_content">
          <div class="form-ctrl">
            <div class="el-row is-align-middle el-row--flex">
              <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                <span>{{ confirm }}</span>
              </button>
              <button type="button" class="el-button bg-gray el-button--primary" @click="selection(false)">
                <span>{{ $t('__cancelSelect') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel giftEditDialog backstage_dialog" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click="onClose" />
        <div class="popup-panel animated fadeInUp">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="btn_icon" @click="onClose" />
          </div>
          <div class="data_content">
            <div class="w-100 d-flex justify-content-center font-weight-bold font-1_5">
              <span class="text-yellow mb-3">{{ title }}</span>
            </div>
            <div class="table">
              <template v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0">
                <div class="el-form-item small el-form-item--feedback el-form-item--small">
                  <div class="el-form-item__content">
                    <div class="w-100 handicap-table" style="position: relative;">
                      <table class="el-table">
                        <tbody>
                          <tr class="el-table__row head">
                            <td class="ww-2_5">
                              <div class="cell checkbox text-center h-100">
                                <span
                                  class="el-checkbox green-tick pl-0"
                                  @click="selection(!selectAll)"
                                >
                                  <span
                                    :class="{
                                      'unchecked': !selectAll,
                                      'is-checked': selectAll}"
                                  >
                                    <span class="el-checkbox__inner" />
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td class="ww-12">
                              <div class="cell d-flex align-items-center justify-content-center">{{ $t('__name') }}</div>
                            </td>
                            <td class="ww-4">
                              <div class="cell d-flex align-items-center justify-content-center lower-limit">{{ $t('__nickname') }}</div>
                            </td>
                          </tr>
                          <tr
                            v-for="(item, index) in serverData.allPermissions"
                            :key="index"
                            class="el-table__row"
                          >
                            <td class="ww-2_5">
                              <div class="cell checkbox text-center h-100">
                                <span
                                  class="el-checkbox green-tick pl-0"
                                  @click="handleCheckboxChange(item)"
                                >
                                  <span
                                    class="el-checkbox__input"
                                    :class="{
                                      'unchecked': !item.exist,
                                      'is-checked': item.exist}"
                                  >
                                    <span class="el-checkbox__inner" />
                                  </span>
                                </span>
                              </div>
                            </td>
                            <td class="ww-12">
                              <div class="cell">
                                <span class="table-item-label">{{ item.name }}</span>
                              </div>
                            </td>
                            <td class="ww-4">
                              <div class="cell name">
                                <span class="table-item-label yellow">{{ item.nickname }}</span>
                              </div>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </template>
              <div v-else class="no-result">{{ $t("__noInformation") }}</div>
            </div>
          </div>
          <div class="operate_content">
            <div class="form-ctrl">
              <div class="el-row is-align-middle el-row--flex">
                <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                  <span>{{ confirm }}</span>
                </button>
                <button type="button" class="el-button bg-gray el-button--primary" @click="selection(false)">
                  <span>{{ $t('__cancelSelect') }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import { mapGetters } from 'vuex'

export default {
  name: 'RolePermissionDialog',
  components: { },
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
  computed: {
    ...mapGetters([
      'sidebar'
    ])
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
      this.selectAll = select;
      this.serverData.allPermissions = JSON.parse(JSON.stringify(this.serverData.allPermissions));
    },
    handleCheckboxChange(item) {
      item.exist = !item.exist
      if (item.exist) {
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

.data_content {
  .is-disabled {
    .el-input__inner {
      color: #6e6e6e;
    }
  }
  .el-table {
    font-size: 1rem;
    line-height: 1rem;
    tbody {
      tr {
        transform: translateZ(0);
        -webkit-transform: translateZ(0);
        &:nth-child(odd) {
          background: #e9e9e9;
        }
        td {
          padding-top: 1rem;
          padding-bottom: 1rem;
          .lower-limit,
          .upper-limit {
            text-align: center !important;
          }
        }
        .ww-2_5 {
          width: 2.5rem;
        }
        .ww-4 {
          width: 4rem;
        }
        .ww-12 {
          width: 10rem;
        }
      }
    }
    td {
      border: 0;
    }
    .cell {
      word-break: break-word;
      overflow: visible;
      white-space: normal;
      overflow-x: visible;
      font-size: 1rem;
      line-height: 1.66667rem;
      height: 1.66667rem;
      text-align: center;
      color: #000;
      padding: 0;
      .el-checkbox {
        padding-left: 0.41667rem;
        padding-top: 0.41667rem;
        .unchecked {
          .el-checkbox__inner {
            &:after {
              border: 0.16667rem solid transparent;
            }
          }
        }
      }
      .yellow {
        color: #ce9600;
      }
    }
  }
}

#app.mobile {
  .black_bg {
    .data_content {
      overflow: auto;
      height: calc(100vh - 3.75rem - 1.5rem - 7.5rem);
    }
    .operate_content {
      height: 4.5rem;
    }
  }
}

#app.pc {
  .backstage_dialog {
    .operate_content {
      height: 4.5rem;
    }
  }
}
</style>
