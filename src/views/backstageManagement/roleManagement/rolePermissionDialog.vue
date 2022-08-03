<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <div class="table">
      <div v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0">
        <table>
          <tr>
            <th class="toggle">
              <el-checkbox v-model="selectAll" class="red-tick" @change="selection" />
            </th>
            <th align="center" class="name header">{{ $t('__name') }}</th>
            <th align="center" class="nickName header">{{ $t('__nickname') }}</th>
          </tr>
          <tr
            v-for="(item, index) in serverData.allPermissions"
            :key="index"
            class="view-container-table-row"
            :class="{'single-row': index % 2 === 0}"
          >
            <td class=" bg-color toggle">
              <el-checkbox v-model="item.exist" class="red-tick" @change="handleCheckboxChange" />
            </td>
            <td align="center" class="bg-color name">{{ item.name }}</td>
            <td align="center" class="bg-color nickName">{{ item.nickname }}</td>
          </tr>
        </table>
      </div>
      <div v-else class="noInformation">{{ $t("__noInformation") }}</div>
    </div>
    <div v-if="(serverData.allPermissions && serverData.allPermissions.length) > 0 && !dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="selection(false)">{{ $t('__cancelSelect') }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </div>
  </Dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'RolePermissionDialog',
  components: { Dialog },
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
.table {
  color: #fff;
  border-collapse: collapse;
  border-spacing: 0;
  font-size: 18px;
  .toggle {
    width: 40px;
    min-width: 40px;
    .red-tick {
      display: flex;
      justify-content: center;
    }
  }
  .bg-color {
    background-color: #000;
  }
  .header {
    color: rgb(255, 251, 0);
  }
  .name {
    word-break: break-all;
    width: 500px;
    min-width: 500px;
  }
  .nickName {
    word-break: break-all;
    width: 250px;
    min-width: 250px;
  }
}
</style>
