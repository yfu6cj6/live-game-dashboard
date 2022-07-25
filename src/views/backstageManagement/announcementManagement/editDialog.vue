<template>
  <el-dialog
    v-if="visible"
    v-loading="dialogLoading"
    :title="title"
    :visible.sync="visible"
    :before-close="onClose"
    :close-on-click-modal="false"
  >
    <el-form ref="editForm" :model="editForm" :rules="rules">
      <el-form-item class="inputTitle" :label="$t('__marquee')" prop="is_marquee">
        <el-select v-model="editForm.is_marquee">
          <el-option v-for="item in announcementMarqueeStatusType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('__announcementTitle')" prop="title">
        <el-input v-model="editForm.title" />
      </el-form-item>
      <el-form-item :label="$t('__announcementType')" prop="type">
        <el-select v-model="editForm.type">
          <el-option v-for="item in methodType" :key="item.key" :label="$t(item.nickname)" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item class="inputTitle" :label="$t('__announcementDate')" prop="announcementedAt">
        <el-date-picker
          v-model="editForm.announcementedAt"
          type="datetimerange"
          align="right"
          unlink-panels
          :range-separator="$t('__to')"
          :start-placeholder="$t('__startDate')"
          :end-placeholder="$t('__endDate')"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item class="inputTitle" :label="$t('__maintainDate')" prop="maintainedAt">
        <el-date-picker
          v-model="editForm.maintainedAt"
          type="datetimerange"
          align="right"
          unlink-panels
          :range-separator="$t('__to')"
          :start-placeholder="$t('__startDate')"
          :end-placeholder="$t('__endDate')"
          :picker-options="pickerOptions"
        />
      </el-form-item>
      <el-form-item :label="$t('__announcementContent')" prop="content">
        <el-input v-model="editForm.content" type="textarea" :rows="2" />
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
    'pickerOptions': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'methodType': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'announcementMarqueeStatusType': {
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
        title: [{ required: true, trigger: 'blur', validator: validate }],
        announcementedAt: [{ required: true, trigger: 'blur', validator: validate }],
        maintainedAt: [{ required: true, trigger: 'blur', validator: validate }]
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
