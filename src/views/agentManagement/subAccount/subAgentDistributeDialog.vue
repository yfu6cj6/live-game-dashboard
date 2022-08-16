<template>
  <Dialog
    v-if="visible"
    :loading="dialogLoading"
    :title="title"
    :on-close-even="onClose"
    :close-on-click-modal="device === 'mobile'"
    class="subAgentDistributeDialog"
  >
    <table class="subAgent">
      <tr>
        <th>
          <el-checkbox v-model="selectAll" class="red-tick" @change="selection" />
        </th>
        <th align="right" class="agent">{{ $t('__agent') }}</th>
      </tr>
      <tr
        v-for="(item, index) in selectSubAgents"
        :key="index"
      >
        <td>
          <el-checkbox v-model="item.exist" class="red-tick" @change="handleCheckboxChange" />
        </td>
        <td align="right" class="agent">{{ item.nickname }}</td>
      </tr>
    </table>
    <el-form ref="form" :model="form" :rules="rules">
      <el-form-item :label="$t('__userPassword')" prop="userPassword" class="disableRequiredIcon">
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
import Dialog from '@/components/Dialog'
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'

export default {
  name: 'SubAgentDistributeDialog',
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
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'subAgents': {
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
        userPassword: [{ required: true, trigger: 'blur', validator: validate }]
      },
      userPasswordType: 'password',
      selectAll: false,
      selectSubAgents: []
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
    setData(boundAgents) {
      this.selectSubAgents = JSON.parse(JSON.stringify(this.subAgents))
      this.selectSubAgents.forEach(subAgent => {
        if (boundAgents.some(boundAgent => boundAgent === subAgent.key)) {
          subAgent.exist = true
        }
      })
    },
    selection(select) {
      this.selectSubAgents.forEach(element => {
        element.exist = select
      });
      this.selectSubAgents = JSON.parse(JSON.stringify(this.selectSubAgents))
    },
    handleCheckboxChange(select) {
      if (select) {
        this.selectAll = !this.selectSubAgents.some(subAgent => subAgent.exist === false)
      } else {
        this.selectAll = false;
      }
    },
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.confirmMsg(`${this.$t('__confirmOperation')}?`, () => {
            const data = JSON.parse(JSON.stringify(this.form))
            data.agents = []
            this.selectSubAgents.filter(item => item.exist).forEach(element => {
              data.agents.push(element.key)
            })
            this.$emit('onSubmit', data)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
#app .subAgentDistributeDialog {
  .subAgent {
    width: 100%;
    .el-checkbox {
      .el-checkbox__input {
        .el-checkbox__inner {
          width: 2rem;
          height: 2rem;
        }
      }
      &.red-tick {
        .is-checked {
          .el-checkbox__inner {
            &:after {
              width: 0.5rem;
              height: 1.5rem;
              left: 1rem;
              top: -0.5rem;
            }
          }
        }
      }
    }
    .agent {
      font-size: 1.5rem;
    }
  }
  .el-form {
    .el-form-item {
      .el-form-item__label {
        line-height: 2rem;
      }
    }
  }
}
</style>
