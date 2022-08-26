import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      inputState: Object.freeze({
        'none': 0,
        'success': 1,
        'error': 2
      }),
      dialogLoading: false
    }
  },
  computed: {
    ...mapGetters([
      'device'
    ])
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
