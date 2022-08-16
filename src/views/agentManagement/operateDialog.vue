<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
    class="operateDialog"
  >
    <div class="contentClass">
      <span>{{ content }}</span>
    </div>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="$t('__userPassword')" prop="userPassword">
        <el-input v-model="form.userPassword">
          <template slot="suffix">
            <i class="el-input__icon el-icon-view clickable" :class="{'text-black': newPasswordType !== 'password', 'text-line-gray-shallow': newPasswordType === 'password'}" @click="showNewPwd" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <span v-if="!dialogLoading" slot="bodyFooter">
      <el-button class="bg-yellow" @click="onSubmit">{{ $t('__confirm') }}</el-button>
    </span>
  </Dialog>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'
import common from '@/mixin/common'

export default {
  name: 'OperateDialog',
  components: { Dialog },
  mixins: [dialogCommon, common],
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
    'content': {
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
    const validate = (rule, value, callback) => {
      if (!value) {
        callback(new Error(this.$t('__requiredField')))
      } else {
        callback()
      }
    }
    return {
      rules: {
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      dialogLoading: false
    }
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.$refs.form.clearValidate()
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmMsg(`${this.content}`, () => {
            const data = JSON.parse(JSON.stringify(this.form))
            this.$emit('onSubmit', data)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";

.operateDialog {
  .contentClass {
    text-align: center;
    color: $yellow;
    padding-top: 10px;
    margin-bottom: 10px;
    font-size: 20px;
  }
  .el-form {
    .el-form-item {
      display: flex;
      flex-direction: column;
      .el-form-item__label {
        color: $yellow;
        min-width: auto;
        text-align: left;
        line-height: 20px;
      }
      .el-form-item__content {
        line-height: 0;
        .el-input {
          .el-input__inner {
            padding: 0, 15px;
            color: #000;
            height: 2.83333rem;
          }
        }
      }
      .el-form-item__error {
        padding: 0;
        left: unset;
        right: 0;
      }
    }
  }
}
</style>
