<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="device === 'mobile'"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules">
      <el-form-item v-if="isEdit" :label="$t('__tableId')" prop="id">
        <el-input v-model="editForm.id" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__name')" prop="name">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item :label="$t('__status')" prop="status">
        <el-select v-model="editForm.status">
          <el-option v-for="item in status" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item label="app_name" prop="app_name">
        <el-input v-model="editForm.app_name" />
      </el-form-item>
      <el-form-item label="streaming_name" prop="streaming_name">
        <el-input v-model="editForm.streaming_name" />
      </el-form-item>
      <el-form-item :label="$t('__idleRounds')" prop="idle_rounds">
        <el-input v-model="editForm.idle_rounds" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__streamingUrl')" prop="streaming_url">
        <el-input v-model="editForm.streaming_url" />
      </el-form-item>
      <el-form-item :label="$t('__description')" prop="description">
        <el-input v-model="editForm.description" type="textarea" :rows="2" />
      </el-form-item>
    </el-form>
    <span v-if="!dialogLoading" slot="footer">
      <el-button class="bg-gray" @click="onReset">{{ $t("__reset") }}</el-button>
      <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
    </span>
  </Dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'

export default {
  name: 'EditDialog',
  components: { Dialog },
  mixins: [dialogCommon],
  props: {
    title: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    visible: {
      type: Boolean,
      require: true
    },
    confirm: {
      type: String,
      require: true,
      default() {
        return ''
      }
    },
    form: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    status: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    isEdit: {
      type: Boolean,
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
    const validateIdleRounds = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else if (value <= 0) {
        callback(new Error(this.$stringFormat(this.$t('__mustBeGreater'), [0])))
      } else {
        callback()
      }
    }
    return {
      rules: {
        id: [{ required: true, trigger: 'blur', validator: validate }],
        name: [{ required: true, trigger: 'blur', validator: validate }],
        app_name: [{ required: true, trigger: 'blur', validator: validate }],
        streaming_name: [{ required: true, trigger: 'blur', validator: validate }],
        idle_rounds: [{ required: true, trigger: 'blur', validator: validateIdleRounds }],
        streaming_url: [{ required: true, trigger: 'blur', validator: validate }]
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
