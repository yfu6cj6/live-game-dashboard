<template>
  <div v-if="visible">
    <template v-if="device==='mobile'">
      <div class="notice-cover" @click="onClose" />
      <div v-loading="dialogLoading" class="fadeInUp pp notice animated">
        <div class="scroll-wrap float">
          <div class="scroll-inner off">
            <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
              <div class="text-white text-center">{{ title }}</div>
              <div class="text-red pt-3 pb-3 w-100 mt-1">
                <form class="el-form el-form--label-left">
                  <div class="el-form-item operator-psw custom-psw mr-auto ml-0 el-form-item--small" :class="{'is-error': hasError, 'is-success': isSuccess}">
                    <div class="el-form-item__content">
                      <div class="value-group">
                        <div class="el-input el-input--small el-input--suffix">
                          <input v-model="form.userPassword" :type="userPasswordType" autocomplete="off" :placeholder="$t('__userPassword')" class="el-input__inner" @focus="passwordFocus" @blur="passwordChange" @change="passwordChange">
                          <span class="el-input__suffix">
                            <span class="el-input__suffix-inner">
                              <i class="el-input__icon el-icon-error el-input__validateIcon has-error" />
                              <i class="el-input__icon el-icon-success el-input__validateIcon no-error" />
                              <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType!=='password'}" @click="showUserPasswordType" />
                            </span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              <div class="text-red ml-auto mr-auto w-100">{{ errorTip }}</div>
            </div>
          </div>
        </div>
        <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
          <button type="button" class="el-button bg-yellow common-button w-50 el-button--primary" @click.stop="onSubmit">
            <span>{{ $t('__confirm') }}</span>
          </button>
          <button type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click.stop="onClose">
            <span>{{ $t('__cancel') }}</span>
          </button>
        </div>
      </div>
    </template>
    <template v-else>
      <div class="agent-pop-up-panel" :class="{'sidebar_open': sidebar.opened}">
        <div class="popup-cover" @click.stop="onClose" />
        <div class="popup-panel animated fadeInUp" style="width: auto; min-width: 300px;">
          <div class="fas icon-close w yellow" style="height: 1.77778rem; width: 1.77778rem;">
            <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" class="icon" @click="onClose" />
          </div>
          <div class="text-white d-flex" style="max-width: 295px;">
            <div class="m-auto text-left">{{ title }}</div>
          </div>
          <div class="text-red pt-3 pb-3 w-100 mt-1 ml-auto mr-auto" style="max-width: 295px;">
            <form class="el-form el-form--label-left">
              <div class="el-form-item operator-psw custom-psw m-auto el-form-item--small" style="max-width: 340px;" :class="{'is-error': hasError, 'is-success': isSuccess}">
                <div class="el-form-item__content">
                  <div class="label-group w-100">
                    <label class="form-item-label text-yellow">{{ $t('__userPassword') }}</label>
                  </div>
                  <div class="value-group">
                    <div class="el-input el-input--small el-input--suffix">
                      <input v-model="form.userPassword" :type="userPasswordType" autocomplete="off" class="el-input__inner" @focus="passwordFocus" @blur="passwordChange" @change="passwordChange">
                      <span class="el-input__suffix">
                        <span class="el-input__suffix-inner">
                          <i class="el-input__icon el-icon-error el-input__validateIcon has-error" />
                          <i class="el-input__icon el-icon-success el-input__validateIcon no-error" />
                          <i class="el-input__icon el-icon-view" style="cursor: pointer;" :class="{'text-black': userPasswordType!=='password'}" @click="showUserPasswordType" />
                        </span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="text-red ml-auto mr-auto w-100" style="max-width: 340px;">{{ errorTip }}</div>
          <div class="d-flex w-100 justify-content-center popup-buttons" style="margin-top: 20px;">
            <button type="button" class="el-button bg-yellow common-button el-button--primary" @click.stop="onSubmit">
              <span>{{ $t('__confirm') }}</span>
            </button>
            <button type="button" class="el-button bg-gray common-button el-button--primary" @click.stop="onClose">
              <span>{{ $t('__cancel') }}</span>
            </button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'
import { mapGetters } from 'vuex'

export default {
  name: 'OperateDialog',
  components: {},
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
    }
  },
  data: function() {
    return {
      userPasswordType: 'password',
      hasError: false,
      errorTip: '',
      isSuccess: false
    }
  },
  computed: {
    ...mapGetters([
      'sidebar'
    ])
  },
  watch: {
    visible() {
      if (!this.visible) {
        this.userPasswordType = 'password'
        this.hasError = false
        this.errorTip = ''
        this.isSuccess = false
      }
    }
  },
  methods: {
    passwordChange() {
      if (this.form.userPassword) {
        this.isSuccess = true
      } else {
        this.isSuccess = false
        this.hasError = true
        this.errorTip = this.$t('__pleaseCheckFormContent')
      }
    },
    passwordFocus() {
      this.hasError = false
      this.errorTip = ''
    },
    showUserPasswordType() {
      if (this.userPasswordType === 'password') {
        this.userPasswordType = ''
      } else {
        this.userPasswordType = 'password'
      }
    },
    onSubmit() {
      if (!this.form.userPassword) {
        this.errorTip = this.$t('__pleaseCheckFormContent')
        this.hasError = true
        this.isSuccess = false
      } else {
        this.hasError = false
        this.isSuccess = true
        const data = JSON.parse(JSON.stringify(this.form))
        this.$emit('onSubmit', data)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.p-buttons {
  padding-top: 0.41667rem;
  padding-bottom: 0.41667rem;
}
</style>
