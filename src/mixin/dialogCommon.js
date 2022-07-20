import { mapGetters } from 'vuex';

export default {
  data() {
    return {
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
