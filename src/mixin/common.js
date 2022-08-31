import { getMonthDateTime, getDayDateTime, getWeekDateTime } from '@/utils/transDate'
// import { getFullDate, getMonthDateTime, getDayDateTime, getWeekDateTime } from '@/utils/transDate'

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
  },
  created() {
    this.pickerOptions = {
      // onPick: ({ maxDate, minDate }) => {
      //   if (maxDate) {
      //     this.searchTime = [getFullDate(minDate), getFullDate(maxDate)]
      //     this.$refs.datePicker.picker.handleChangeRange({
      //       minDate: this.$refs.datePicker.picker.minDate,
      //       maxDate: this.$refs.datePicker.picker.maxDate,
      //       rangeState: {
      //         selecting: true
      //       }
      //     })
      //   }
      // }
      // disabledDate: (time) => {
      //   const preThirdDay = new Date()
      //   preThirdDay.setMonth(preThirdDay.getMonth() - 3)
      //   preThirdDay.setDate(preThirdDay.getDate() - 1)
      //   return time.getTime() > Date.now() || time.getTime() < preThirdDay
      // }
    }
  },
  methods: {
    confirmMsg(msg, callBack) {
      this.$confirm(msg, {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonClass: 'bg-yellow font-weight-bold w-35',
        cancelButtonClass: 'bg-gray font-weight-bold w-35'
      }).then(_ => {
        callBack()
      }).catch(() => {
      })
    },
    // 點快捷鈕自動將日其放在右邊的table
    handleCalendarPage() {
      this.$nextTick(() => {
        const el = document.querySelector('button.el-picker-panel__icon-btn.el-icon-arrow-left')
        if (el) {
          el.click()
        }
      })
    },
    // 日期範圍選擇器點開後要做的初始化
    changeInitCalendarPage() {
      this.handleCalendarPage()
      this.addDateTimeOption(() => {
        this.monthIndex--;
        this.searchTime = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.monthIndex = 0;
        this.searchTime = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.monthIndex++;
        this.searchTime = getMonthDateTime(this.monthIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.dayIndex--;
        this.searchTime = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.dayIndex = 0;
        this.searchTime = getDayDateTime(this.dayIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.dayIndex++;
        this.searchTime = getDayDateTime(this.dayIndex, true);
        this.handleCalendarPage()
      }, () => {
        this.weekIndex--;
        this.searchTime = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.weekIndex = 0;
        this.searchTime = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage()
      }, () => {
        this.weekIndex++;
        this.searchTime = getWeekDateTime(this.weekIndex, true)
        this.handleCalendarPage()
      })
    },
    // 新增多選過濾器
    addSelectDropDownFilter(name, onSelectAll, onClear, onInputFilter) {
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
      document.getElementsByClassName(name)[0].getElementsByClassName('custom-dropdown')[0].prepend(filter)
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
