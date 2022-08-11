export default {
  data() {
    return {
      selectCollapseCount: 1
    }
  },
  methods: {
    confirmMsg(msg, callBack) {
      this.$confirm(msg, {
        closeOnClickModal: false,
        closeOnPressEscape: false,
        confirmButtonClass: 'bg-yellow confirmButton',
        cancelButtonClass: 'bg-gray cancelButton'
      }).then(_ => {
        callBack()
      }).catch(() => {
      })
    },
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
    addDateTimeOption(onPreMon, onThisMon, onNextMon, onPreDay, onToday, onNextDay, onPreWeek, onThisWeek, onNextWeek) {
      // 上月
      const preMonIcon = document.createElement('i')
      preMonIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-left'
      const preMonIconSpan = document.createElement('span')
      preMonIconSpan.appendChild(preMonIcon)
      const preMonBtn = document.createElement('button')
      preMonBtn.className = 'el-button el-button--default preMon line-yellow arrow'
      preMonBtn.onclick = onPreMon
      preMonBtn.appendChild(preMonIconSpan)
      // 本月
      const thisMonthSpan = document.createElement('span')
      thisMonthSpan.innerHTML = `${this.$t('__thisMonth')}`
      const thisMonthBtn = document.createElement('button')
      thisMonthBtn.className = 'el-button el-button--default thisMonth line-yellow'
      thisMonthBtn.onclick = onThisMon
      thisMonthBtn.appendChild(thisMonthSpan)
      // 下月
      const nextMonIcon = document.createElement('i')
      nextMonIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextMonSpan = document.createElement('span')
      nextMonSpan.appendChild(nextMonIcon)
      const nextMonBtn = document.createElement('button')
      nextMonBtn.className = 'el-button el-button--default nextMon line-yellow arrow'
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
      preDayBtn.className = 'el-button el-button--default preDay line-yellow arrow'
      preDayBtn.onclick = onPreDay
      preDayBtn.appendChild(preDayIconSpan)
      // 今天
      const todaySpan = document.createElement('span')
      todaySpan.innerHTML = `${this.$t('__today')}`
      const todayBtn = document.createElement('button')
      todayBtn.className = 'el-button el-button--default today line-yellow'
      todayBtn.onclick = onToday
      todayBtn.appendChild(todaySpan)
      // 下一天
      const nextDayIcon = document.createElement('i')
      nextDayIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextDaySpan = document.createElement('span')
      nextDaySpan.appendChild(nextDayIcon)
      const nextDayBtn = document.createElement('button')
      nextDayBtn.className = 'el-button el-button--default nextDay line-yellow arrow'
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
      preWeekBtn.className = 'el-button el-button--default preWeek line-yellow arrow'
      preWeekBtn.onclick = onPreWeek
      preWeekBtn.appendChild(preWeekIconSpan)
      // 本週
      const thisWeekSpan = document.createElement('span')
      thisWeekSpan.innerHTML = `${this.$t('__thisWeek')}`
      const thisWeekBtn = document.createElement('button')
      thisWeekBtn.className = 'el-button el-button--default thisWeek line-yellow'
      thisWeekBtn.onclick = onThisWeek
      thisWeekBtn.appendChild(thisWeekSpan)
      // 下一週
      const nextWeekIcon = document.createElement('i')
      nextWeekIcon.className = 'icon-arrow el-submenu__icon-arrow el-icon-arrow-right'
      const nextWeekSpan = document.createElement('span')
      nextWeekSpan.appendChild(nextWeekIcon)
      const nextWeekBtn = document.createElement('button')
      nextWeekBtn.className = 'el-button el-button--default nextWeek line-yellow arrow'
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
      const el = document.getElementsByClassName('ams-timeslot-popper')[0]
      el.insertBefore(quickSearch, el.children[1])
      // document.getElementsByClassName('ams-timeslot-popper').forEach(element => {
      //   element.insertBefore(quickSearch, element.children[1])
      // })
    }
  }
}
