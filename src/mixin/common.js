export default {
  data() {
    return {
      selectCollapseCount: 3
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
    }
  }
}
