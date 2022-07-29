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
      <el-form-item v-if="!isEdit" :label="$t('__tableId')" prop="table_id">
        <el-select v-model="editForm.table_id">
          <el-option v-for="item in tables" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item v-if="!isEdit" :label="$t('__liveBetAreaId')" prop="live_bet_area_id">
        <el-select v-model="editForm.live_bet_area_id">
          <el-option v-for="item in liveBetArea" :key="item.key" :label="item.nickname" :value="item.key" />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('__betMin')" prop="bet_min">
        <el-input v-model="editForm.bet_min" type="number" />
      </el-form-item>
      <el-form-item :label="$t('__betMax')" prop="bet_max">
        <el-input v-model="editForm.bet_max" type="number" />
      </el-form-item>
      <el-form-item class="totalBetMax" :label="$t('__totalBetMax')" prop="total_bet_max">
        <span class="zeroMeansNoLimit">{{ `${$t('__zeroMeansNoLimit')}` }}</span>
        <el-input v-model="editForm.total_bet_max" type="number" />
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
    'tables': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'liveBetArea': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'isEdit': {
      type: Boolean,
      require: true
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
        bet_min: [{ required: true, trigger: 'blur', validator: validate }],
        bet_max: [{ required: true, trigger: 'blur', validator: validate }],
        total_bet_max: [{ required: true, trigger: 'blur', validator: validate }]
      },
      editForm: {},
      dialogLoading: false
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
.totalBetMax {
  position: relative;
  .zeroMeansNoLimit {
    position: absolute;
    padding: 5px 0 0 125px;
    display: block;
    line-height: 14px;
    color: #f00;
    top: calc(-100% + 7px);
    right: 0;
  }
}
</style>
