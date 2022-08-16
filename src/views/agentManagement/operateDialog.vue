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
        <el-input ref="userPassword" v-model="form.userPassword" :type="userPasswordType" class="custom-psw">
          <template slot="suffix">
            <i class="el-input__icon el-icon-view clickable" :class="{'text-black': userPasswordType !== 'password', 'text-line-gray-shallow': userPasswordType === 'password'}" @click="showUserPasswordType" />
          </template>
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="bodyFooter">
      <el-button class="bg-yellow font-weight-bold" @click="onSubmit">{{ $t('__confirm') }}</el-button>
      <el-button class="bg-gray font-weight-bold" @click="onClose">{{ $t('__cancel') }}</el-button>
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
      userPasswordType: 'password',
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
    showUserPasswordType() {
      if (this.userPasswordType === 'password') {
        this.userPasswordType = ''
      } else {
        this.userPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.userPassword.focus()
      })
    },
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
    color: #fff;
    font-size: 1.4rem;
    line-height: 2rem;
  }
  .el-form {
    .el-form-item {
      display: flex;
      flex-direction: column;
      .el-form-item__label {
        color: $yellow;
        min-width: auto;
        text-align: left;
        line-height: 3rem;
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
      }
      &.is-required {
        &:not(.is-no-asterisk) {
          &>.el-form-item__label {
            &:before {
              content: '';
            }
          }
        }
      }
    }
  }
}
</style>
