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
    }
  }
}
