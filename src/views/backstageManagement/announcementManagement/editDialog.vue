<template>
  <div v-if="visible">
    <template v-if="device === 'mobile'">
      <div class="black_bg announcementManagementDialog">
        <div v-loading="dialogLoading" class="data_content">
          <div class="titleBar yellow">
            <span class="titleTips">{{ title }}</span>
          </div>
          <div class="el-form-item__content item" :class="{'is-error': inputTitle === inputState.error, 'is-success': inputTitle === inputState.success}">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__announcementTitle') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <input v-model="editForm.title" type="text" autocomplete="off" class="el-input__inner" @focus="inputFocus()" @change="checkValidInput()" @blur="checkValidInput()">
                <span class="el-input__suffix">
                  <span class="el-input__suffix-inner" />
                  <i class="el-input__icon el-input__validateIcon" :class="{'el-icon-error': inputTitle === inputState.error, 'el-icon-success': inputTitle === inputState.success}" />
                </span>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__announcementDate') }}</label>
            </div>
            <div class="day-range">
              <div class="date-time-picker-box">
                <div class="picker datetimerange" @click.once="changeInitCalendarPage_announcement">
                  <el-date-picker
                    ref="datePicker"
                    v-model="editForm.announcementedAt"
                    type="datetimerange"
                    popper-class="ams-timeslot-popper dialogAnnouncementData"
                    align="right"
                    :clearable="false"
                    :editable="false"
                    time-arrow-control
                    :range-separator="$t('__to')"
                    :start-placeholder="$t('__startDate')"
                    :end-placeholder="$t('__endDate')"
                    :default-time="['00:00:00', '23:59:59']"
                    :picker-options="dialogPickerOptions"
                    :format="'yyyy-MM-dd HH:mm'"
                    prefix-icon="''"
                    clear-icon="''"
                    @change="checkValidDate(editForm.announcementedAt)"
                    @blur="checkValidDate(editForm.announcementedAt)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group required">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__maintainDate') }}</label>
            </div>
            <div class="day-range">
              <div class="date-time-picker-box">
                <div class="picker datetimerange" @click.once="changeInitCalendarPage_maintain">
                  <el-date-picker
                    ref="datePicker"
                    v-model="editForm.maintainedAt"
                    type="datetimerange"
                    popper-class="ams-timeslot-popper dialogMaintainData"
                    align="right"
                    :clearable="false"
                    :editable="false"
                    time-arrow-control
                    :range-separator="$t('__to')"
                    :start-placeholder="$t('__startDate')"
                    :end-placeholder="$t('__endDate')"
                    :default-time="['00:00:00', '23:59:59']"
                    :picker-options="dialogPickerOptions"
                    :format="'yyyy-MM-dd HH:mm'"
                    prefix-icon="''"
                    clear-icon="''"
                    @change="checkValidDate(editForm.maintainedAt)"
                    @blur="checkValidDate(editForm.maintainedAt)"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__announcementType') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.type" class="el-select">
                  <option v-for="item in methodType" :key="item.key" :value="item.key">
                    {{ $t(item.nickname) }}
                  </option>
                </select>
                <div class="fas gray-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 63 63"
                    style="height: 0.916667rem; width: 0.916667rem;"
                  >
                    <title>arrow_2</title>
                    <g id="hGqiqI.tif">
                      <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__marquee') }}</label>
            </div>
            <div class="option">
              <div class="comp selected-filter">
                <select v-model="editForm.is_marquee" class="el-select">
                  <option v-for="item in announcementMarqueeStatusType" :key="item.key" :value="item.key">
                    {{ $t(item.nickname) }}
                  </option>
                </select>
                <div class="fas gray-deep">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 63 63"
                    style="height: 0.916667rem; width: 0.916667rem;"
                  >
                    <title>arrow_2</title>
                    <g id="hGqiqI.tif">
                      <path d="M63,10.44,31.74,52.56,0,10.44Z" />
                    </g>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          <div class="el-form-item__content item">
            <div class="label-group">
              <label class="form-item-label text-yellow font-weight-bold">{{ $t('__announcementContent') }}</label>
            </div>
            <div class="d-flex">
              <div class="el-input el-input--small">
                <el-input v-model="editForm.content" type="textarea" :rows="2" />
              </div>
            </div>
          </div>
        </div>
        <div class="operate_content">
          <div class="form-alert">
            <div v-show="errorTips !== ''" role="alert" class="el-alert el-alert--warning is-light fade show">
              <i class="el-alert__icon el-icon-warning" />
              <div class="el-alert__content">
                <span class="el-alert__title">{{ errorTips }}</span>
                <i class="el-alert__closebtn el-icon-close" style="display: none;" />
              </div>
            </div>
          </div>
          <div class="form-ctrl">
            <div class="el-row is-align-middle el-row--flex">
              <button type="button" class="el-button bg-yellow el-button--primary" @click="onSubmit">
                <span>{{ confirm }}</span>
              </button>
              <button type="button" class="el-button bg-gray el-button--primary" @click="onReset">
                <span>{{ $t('__reset') }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </template>
    <template v-else>
      <Dialog
        v-if="visible"
        :loading="dialogLoading"
        :title="title"
        :on-close-even="onClose"
        :close-on-click-modal="device === 'mobile'"
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
              :picker-options="dialogPickerOptions"
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
              :picker-options="dialogPickerOptions"
            />
          </el-form-item>
          <el-form-item :label="$t('__announcementContent')" prop="content">
            <el-input v-model="editForm.content" type="textarea" :rows="2" />
          </el-form-item>
        </el-form>
        <span v-if="!dialogLoading" slot="bodyFooter">
          <el-button class="bg-gray" @click="onReset">{{ $t("__reset") }}</el-button>
          <el-button class="bg-yellow" @click="onSubmit">{{ confirm }}</el-button>
        </span>
      </Dialog>
    </template>
  </div>
</template>

<script>
import common from '@/mixin/common';
import dialogCommon from '@/mixin/dialogCommon'
import Dialog from '@/components/Dialog'
import { getDayDateTime, getWeekDateTime, getMonthDateTime } from '@/utils/transDate'

export default {
  name: 'EditDialog',
  components: { Dialog },
  mixins: [common, dialogCommon],
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
    'dialogPickerOptions': {
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
      dateEnum: Object.freeze({
        'none': 0,
        'yesterday': 1,
        'today': 2,
        'lastWeek': 3,
        'thisWeek': 4,
        'lastMonth': 5,
        'thisMonth': 6
      }),
      rules: {
        title: [{ required: true, trigger: 'blur', validator: validate }],
        announcementedAt: [{ required: true, trigger: 'blur', validator: validate }],
        maintainedAt: [{ required: true, trigger: 'blur', validator: validate }],
        content: [{ required: true, trigger: 'blur', validator: validate }]
      },
      inputTitle: 0,
      errorTips: '',
      maintainedMonthIndex: 0,
      maintainedDayIndex: 0,
      maintainedWeekIndex: 0,
      editForm: { }
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
    inputFocus() {
      this.inputTitle = this.inputTitle === this.inputState.error ? this.inputState.none : this.inputTitle
      this.errorTips = ''
    },
    checkValidInput() {
      this.inputTitle = this.validContent(this.editForm.title) ? this.inputState.success : this.inputState.error
    },
    validContent(content) {
      const valid = content && content.length > 0
      valid ? '' : this.errorTips = this.$t('__pleaseCheckFormContent')
      return valid
    },
    checkValidDate(date) {
      const valid = date && date.length === 2
      if (!valid) {
        this.errorTips = `${this.$t('__pleaseCheckFormContent')}`
      }
      return valid
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage_announcement() {
      // this.$nextTick(() => {
      //   const parentEl = document.getElementsByClassName('dialogAnnouncementData')[0]
      //   if (parentEl) {
      //     const el = parentEl.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
      //     if (el) {
      //       el.click()
      //     }
      //   }
      // })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage_announcement() {
      this.handleCalendarPage_announcement()
      this.addDateTimeOption(() => {
        this.monthIndex--;
        this.editForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.monthIndex = 0;
        this.editForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.monthIndex++;
        this.editForm.announcementedAt = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex--;
        this.editForm.announcementedAt = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex = 0;
        this.editForm.announcementedAt = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.dayIndex++;
        this.editForm.announcementedAt = getDayDateTime(this.dayIndex, true);
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex--;
        this.editForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex = 0;
        this.editForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      }, () => {
        this.weekIndex++;
        this.editForm.announcementedAt = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage_announcement()
      })
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage_maintain() {
      // this.$nextTick(() => {
      //   const parentEl = document.getElementsByClassName('dialogMaintainData')[0]
      //   if (parentEl) {
      //     const el = parentEl.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
      //     if (el) {
      //       el.click()
      //     }
      //   }
      // })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage_maintain() {
      this.handleCalendarPage_maintain()
      this.addDateTimeOption(() => {
        this.maintainedMonthIndex--;
        this.editForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedMonthIndex = 0;
        this.editForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedMonthIndex++;
        this.editForm.maintainedAt = getMonthDateTime(this.maintainedMonthIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex--;
        this.editForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex = 0;
        this.editForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedDayIndex++;
        this.editForm.maintainedAt = getDayDateTime(this.maintainedDayIndex, true);
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex--;
        this.editForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex = 0;
        this.editForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      }, () => {
        this.maintainedWeekIndex++;
        this.editForm.maintainedAt = getWeekDateTime(this.maintainedWeekIndex, true)
        this.handleCalendarPage_maintain()
      })
    },
    onSubmit() {
      this.errorTips = ''
      this.checkValidInput()
      this.checkValidDate(this.editForm.announcementedAt)
      this.checkValidDate(this.editForm.maintainedAt)
      if (this.errorTips !== '') {
        return
      }

      this.$emit('confirm', JSON.parse(JSON.stringify(this.editForm)))
    },
    onReset() {
      this.editForm = JSON.parse(JSON.stringify(this.form))
      this.$nextTick(() => {
        // this.$refs.editForm.clearValidate()
        this.inputTitle = this.inputState.none
        this.errorTips = ''
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#app.mobile .announcementManagementDialog {
  .datetimerange {
    width: 100%;
  }
  .day-range {
    padding: 0;
  }
}
</style>
