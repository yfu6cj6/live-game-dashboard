export default {
  data() {
    return {
      dialogLoading: false
    }
  },
  methods: {
    onClose() {
      this.$emit('close');
    },
    setDialogLoading(dialogLoading) {
      this.dialogLoading = dialogLoading;
    }
  }
}
