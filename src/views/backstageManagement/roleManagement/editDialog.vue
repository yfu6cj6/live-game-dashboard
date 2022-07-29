<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules">
      <el-form-item :label="$t('__name')" prop="name">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item :label="$t('__nickname')" prop="nickname">
        <el-input v-model="editForm.nickname" />
      </el-form-item>
      <el-form-item :label="$t('__type')" prop="type">
        <el-select v-model="editForm.type">
          <el-option v-for="item in types" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
      </el-form-item>
    </el-form>
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="onReset">{{ $t("__reset") }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'

export default {
  name: 'EditDialog',
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
    },
    'types': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        name: [{ required: true, trigger: 'blur', validator: validate }],
        nickname: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {}
    }
  },
  computed: {
  },
  watch: {
    visible() {
      if (this.visible) {
        this.onReset()
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.editForm.validate((valid) => {
        if (valid) {
          this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
        }
      })
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        this.$refs.editForm.clearValidate()
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
