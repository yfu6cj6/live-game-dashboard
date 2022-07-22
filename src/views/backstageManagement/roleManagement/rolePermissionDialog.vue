<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="false"
  >
    <!-- <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="cancelSelection">{{ $t('__cancelSelect') }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span> -->
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
    }
  },
  methods: {
    cancelSelection() {
      this.$refs.multipleTable.clearSelection()
    },
    onSubmit() {
      const administer = this.multipleSelection.find(element => element.name === 'Administer')
      if (administer) {
        this.$emit('confirm', JSON.parse(JSON.stringify([administer])))
      } else {
        this.$emit('confirm', JSON.parse(JSON.stringify(this.multipleSelection)))
      }
    }
  }
}
</script>
