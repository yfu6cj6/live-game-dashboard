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
      <el-form-item :label="$t('__name')" prop="area_name">
        <el-input v-model="editForm.area_name" />
      </el-form-item>
      <el-form-item :label="$t('__code')" prop="area">
        <el-input v-model="editForm.area" />
      </el-form-item>
      <el-form-item :label="$t('__odds')" prop="odds">
        <el-input v-model="editForm.odds" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__betMin')" prop="bet_min">
        <el-input v-model="editForm.bet_min" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__betMax')" prop="bet_max">
        <el-input v-model="editForm.bet_max" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__currency')" prop="currency">
        <el-select v-model="editForm.currency">
          <el-option v-for="item in currency" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('__status')" prop="activated">
        <el-select v-model="editForm.activated">
          <el-option v-for="item in activated" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
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
    currency: {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    activated: {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    const validate = (rule, value, callback) => {
      if (!value && value !== 0) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        area_name: [{ required: true, trigger: 'blur', validator: validate }],
        area: [{ required: true, trigger: 'blur', validator: validate }],
        odds: [{ required: true, trigger: 'blur', validator: validate }],
        bet_min: [{ required: true, trigger: 'blur', validator: validate }],
        bet_max: [{ required: true, trigger: 'blur', validator: validate }]
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
