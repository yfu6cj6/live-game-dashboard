// import { getMonthDateTime, getDayDateTime, getWeekDateTime } from '@/utils/transDate'
import { getFullDate, getMonthDateTime, getDayDateTime, getWeekDateTime } from '@/utils/transDate'

export default {
  data() {
    return {
      selectCollapseCount: 1,
      searchTime: [],
      monthIndex: 0,
      dayIndex: 0,
      weekIndex: 0,
      pickerOptions: { }
    }
  },
  watch: {
    'device': function() {
      this.handleChangePickerClass()
    },
    'searchTime': function() {
      this.handleCalendarPage()
    }
  },
  created() {
    this.pickerOptions = {
      onPick: ({ maxDate, minDate }) => {
        if (minDate && maxDate) {
          this.searchTime = [getFullDate(minDate), getFullDate(maxDate)]
          // this.$refs.datePicker.picker.handleChangeRange({
          //   minDate: this.$refs.datePicker.picker.minDate,
          //   maxDate: this.$refs.datePicker.picker.maxDate,
          //   rangeState: {
          //     selecting: true
          //   }
          // })
        }
      },
      disabledDate: (time) => {
        const preThirdDay = new Date()
        preThirdDay.setMonth(preThirdDay.getMonth() - 3)
        preThirdDay.setDate(preThirdDay.getDate() - 1)
        return time.getTime() > Date.now() || time.getTime() < preThirdDay
      }
    }
  },
  methods: {
    checkMonIndex() {
      const preEl = document.querySelector('.el-button.el-button--default.preMon.arrow')
      const nextEl = document.querySelector('.el-button.el-button--default.nextMon.arrow')
      if (preEl && nextEl) {
        const thisMonth = new Date().getMonth();
        const searchMonth = new Date(this.searchTime[0]).getMonth();
        this.monthIndex = searchMonth - thisMonth
        if (this.monthIndex < -2) {
          preEl.classList.add('disable')
          nextEl.classList.remove('disable')
        } else if (this.monthIndex >= 0) {
          nextEl.classList.add('disable')
          preEl.classList.remove('disable')
        } else {
          preEl.classList.remove('disable')
          nextEl.classList.remove('disable')
        }
      }
    },
    checkDayIndex() {
      const preEl = document.querySelector('.el-button.el-button--default.preDay.arrow')
      const nextEl = document.querySelector('.el-button.el-button--default.nextDay.arrow')
      if (preEl && nextEl) {
        const search = new Date(this.searchTime[0]);
        this.dayIndex = parseInt((search - new Date()) / 1000 / 60 / 60 / 24)
        const preThirdDay = new Date()
        preThirdDay.setMonth(preThirdDay.getMonth() - 3)
        preThirdDay.setDate(preThirdDay.getDate())
        if (search.getTime() <= preThirdDay) {
          preEl.classList.add('disable')
          nextEl.classList.remove('disable')
        } else if (this.dayIndex >= 0) {
          nextEl.classList.add('disable')
          preEl.classList.remove('disable')
        } else {
          preEl.classList.remove('disable')
          nextEl.classList.remove('disable')
        }
      }
    },
    checkWeekIndex() {
      const preEl = document.querySelector('.el-button.el-button--default.preWeek.arrow')
      const nextEl = document.querySelector('.el-button.el-button--default.nextWeek.arrow')
      if (preEl && nextEl) {
        const search = new Date(this.searchTime[0]);
        search.setDate(search.getDate() - search.getDay() + 1)
        const date = new Date()
        date.setDate(date.getDate() - date.getDay() + 1)
        this.weekIndex = parseInt((search - date) / 1000 / 24 / 60 / 60 / 7)
        const preThirdDay = new Date()
        preThirdDay.setMonth(preThirdDay.getMonth() - 3)
        preThirdDay.setDate(preThirdDay.getDate())
        const min = parseInt((preThirdDay - date) / 1000 / 24 / 60 / 60 / 7)
        if (this.weekIndex < min) {
          preEl.classList.add('disable')
          nextEl.classList.remove('disable')
        } else if (this.weekIndex >= 0) {
          nextEl.classList.add('disable')
          preEl.classList.remove('disable')
        } else {
          preEl.classList.remove('disable')
          nextEl.classList.remove('disable')
        }
      }
    },
    getStringLength(str) {
      if (str === null || str === undefined) {
        return 0
      }
      return str.replace(/[^\x00-\xff]/g, "xx").length
    },
    handleChangePickerClass() {
      this.$nextTick(() => {
        const datePicker = document.getElementsByClassName('ams-timeslot-popper')
        if (datePicker && datePicker.length > 0) {
          if (this.device === 'mobile') {
            datePicker.forEach(element => {
              if (element.classList.contains('pcPicker')) {
                element.classList.remove('pcPicker')
                element.classList.add('mobilePicker')
              }
            })
          } else {
            datePicker.forEach(element => {
              if (element.classList.contains('mobilePicker')) {
                element.classList.remove('mobilePicker')
                element.classList.add('pcPicker')
              }
            })
          }
        }
      })
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage() {
      this.$nextTick(() => {
        const el = document.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
        if (el) {
          el.click()
        }
        this.checkMonIndex()
        this.checkDayIndex()
        this.checkWeekIndex()
      })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage() {
      this.handleCalendarPage()
      this.addDateTimeOption(() => {
        if (this.monthIndex < -2) return;
        this.monthIndex--;
        this.searchTime = getMonthDateTime(this.monthIndex, false)
      }, () => {
        this.monthIndex = 0;
        this.searchTime = getMonthDateTime(this.monthIndex, false)
      }, () => {
        if (this.monthIndex >= 0) return;
        this.monthIndex++;
        this.searchTime = getMonthDateTime(this.monthIndex, false)
      }, () => {
        const preThirdDay = new Date()
        preThirdDay.setMonth(preThirdDay.getMonth() - 3)
        preThirdDay.setDate(preThirdDay.getDate())
        const search = new Date(this.searchTime[0]);
        if (search.getTime() <= preThirdDay) return;
        this.dayIndex--;
        this.searchTime = getDayDateTime(this.dayIndex, false)
      }, () => {
        this.dayIndex = 0;
        this.searchTime = getDayDateTime(this.dayIndex, false)
      }, () => {
        if (this.dayIndex >= 0) return;
        this.dayIndex++;
        this.searchTime = getDayDateTime(this.dayIndex, false);
      }, () => {
        const date = new Date()
        date.setDate(date.getDate() - date.getDay() + 1)
        const preThirdDay = new Date()
        preThirdDay.setMonth(preThirdDay.getMonth() - 3)
        preThirdDay.setDate(preThirdDay.getDate())
        const min = parseInt((preThirdDay - date) / 1000 / 24 / 60 / 60 / 7)
        if (this.weekIndex < min) return;
        this.weekIndex--;
        this.searchTime = getWeekDateTime(this.weekIndex, false)
      }, () => {
        this.weekIndex = 0;
        this.searchTime = getWeekDateTime(this.weekIndex, false)
      }, () => {
        if (this.weekIndex >= 0) return;
        this.weekIndex++;
        this.searchTime = getWeekDateTime(this.weekIndex, false)
      })
    },
    // 新增多選過濾器
    addSelectDropDownFilter(name, onSelectAll, onClear, onInputFilter) {
      const parent = document.getElementsByClassName(name)[0].getElementsByClassName('custom-dropdown')[0]
      if (parent && parent.querySelector('.el-filter')) {
        return
      }
      const selectAll = document.createElement('span')
      selectAll.className = 'text-link'
      selectAll.onclick = onSelectAll
      selectAll.innerHTML = `${this.$t('__selectAll')}`
      const separator = document.createElement('span')
      separator.className = 'pl-2 pr-2'
      separator.innerHTML = '|'
      const clear = document.createElement('span')
      clear.className = 'text-link'
      clear.onclick = onClear
      clear.innerHTML = `${this.$t('__clear')}`
      const group = document.createElement('div')
      group.className = 'w-100 text-right'
      group.appendChild(selectAll)
      group.appendChild(separator)
      group.appendChild(clear)
      const innerBox = document.createElement('div')
      innerBox.appendChild(group)
      const selectFilter = document.createElement('div')
      selectFilter.className = 'select-filter'
      selectFilter.appendChild(innerBox)
      const filterOption = document.createElement('div')
      filterOption.className = 'el-filter_option'
      filterOption.appendChild(selectFilter)
      const inputFilter = document.createElement('input')
      inputFilter.type = 'text'
      inputFilter.autocomplete = 'off'
      inputFilter.className = 'el-select__input el-filter_input w-100'
      inputFilter.addEventListener("input", onInputFilter)
      const filter = document.createElement('div')
      filter.className = 'el-filter'
      filter.appendChild(inputFilter)
      filter.appendChild(filterOption)
      parent.prepend(filter)
    },
    // 新增日期快捷紐
    addDateTimeOption(onPreMon, onThisMon, onNextMon, onPreDay, onToday, onNextDay, onPreWeek, onThisWeek, onNextWeek) {
      // 上月
      const preMonIcon = document.createElement('i')
      preMonIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-left'
      const preMonIconSpan = document.createElement('span')
      preMonIconSpan.appendChild(preMonIcon)
      const preMonBtn = document.createElement('button')
      preMonBtn.className = 'el-button el-button--default preMon arrow'
      preMonBtn.onclick = onPreMon
      preMonBtn.appendChild(preMonIconSpan)
      // 本月
      const thisMonthSpan = document.createElement('span')
      thisMonthSpan.innerHTML = `${this.$t('__thisMonth')}`
      const thisMonthBtn = document.createElement('button')
      thisMonthBtn.className = 'el-button el-button--default thisMonth'
      thisMonthBtn.onclick = onThisMon
      thisMonthBtn.appendChild(thisMonthSpan)
      // 下月
      const nextMonIcon = document.createElement('i')
      nextMonIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextMonSpan = document.createElement('span')
      nextMonSpan.appendChild(nextMonIcon)
      const nextMonBtn = document.createElement('button')
      nextMonBtn.className = 'el-button el-button--default nextMon arrow'
      nextMonBtn.onclick = onNextMon
      nextMonBtn.appendChild(nextMonSpan)
      // 月群組
      const monGroup = document.createElement('div')
      monGroup.className = 'button-group'
      monGroup.appendChild(preMonBtn)
      monGroup.appendChild(thisMonthBtn)
      monGroup.appendChild(nextMonBtn)
      // 上一天
      const preDayIcon = document.createElement('i')
      preDayIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-left'
      const preDayIconSpan = document.createElement('span')
      preDayIconSpan.appendChild(preDayIcon)
      const preDayBtn = document.createElement('button')
      preDayBtn.className = 'el-button el-button--default preDay arrow'
      preDayBtn.onclick = onPreDay
      preDayBtn.appendChild(preDayIconSpan)
      // 今天
      const todaySpan = document.createElement('span')
      todaySpan.innerHTML = `${this.$t('__today')}`
      const todayBtn = document.createElement('button')
      todayBtn.className = 'el-button el-button--default today'
      todayBtn.onclick = onToday
      todayBtn.appendChild(todaySpan)
      // 下一天
      const nextDayIcon = document.createElement('i')
      nextDayIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextDaySpan = document.createElement('span')
      nextDaySpan.appendChild(nextDayIcon)
      const nextDayBtn = document.createElement('button')
      nextDayBtn.className = 'el-button el-button--default nextDay arrow'
      nextDayBtn.onclick = onNextDay
      nextDayBtn.appendChild(nextDaySpan)
      // 日群組
      const dayGroup = document.createElement('div')
      dayGroup.className = 'button-group'
      dayGroup.appendChild(preDayBtn)
      dayGroup.appendChild(todayBtn)
      dayGroup.appendChild(nextDayBtn)
      // 上一週
      const preWeekIcon = document.createElement('i')
      preWeekIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-left'
      const preWeekIconSpan = document.createElement('span')
      preWeekIconSpan.appendChild(preWeekIcon)
      const preWeekBtn = document.createElement('button')
      preWeekBtn.className = 'el-button el-button--default preWeek arrow'
      preWeekBtn.onclick = onPreWeek
      preWeekBtn.appendChild(preWeekIconSpan)
      // 本週
      const thisWeekSpan = document.createElement('span')
      thisWeekSpan.innerHTML = `${this.$t('__thisWeek')}`
      const thisWeekBtn = document.createElement('button')
      thisWeekBtn.className = 'el-button el-button--default thisWeek'
      thisWeekBtn.onclick = onThisWeek
      thisWeekBtn.appendChild(thisWeekSpan)
      // 下一週
      const nextWeekIcon = document.createElement('i')
      nextWeekIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextWeekSpan = document.createElement('span')
      nextWeekSpan.appendChild(nextWeekIcon)
      const nextWeekBtn = document.createElement('button')
      nextWeekBtn.className = 'el-button el-button--default nextWeek arrow'
      nextWeekBtn.onclick = onNextWeek
      nextWeekBtn.appendChild(nextWeekSpan)
      // 週群組
      const weekGroup = document.createElement('div')
      weekGroup.className = 'button-group'
      weekGroup.appendChild(preWeekBtn)
      weekGroup.appendChild(thisWeekBtn)
      weekGroup.appendChild(nextWeekBtn)
      //
      const quickSearch = document.createElement('div')
      quickSearch.className = 'quickSearch'
      quickSearch.appendChild(monGroup)
      quickSearch.appendChild(dayGroup)
      quickSearch.appendChild(weekGroup)
      //
      const el = document.getElementsByClassName('ams-timeslot-popper')
      el.forEach(element => {
        if (!element.querySelector('quickSearch')) {
          element.insertBefore(quickSearch, element.children[1])
        }
      });
    }
  }
}
