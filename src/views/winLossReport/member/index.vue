<template>
  <div>
    -
  </div>
</template>

<script>

export default {
  name: 'Member',
  mixins: [],
  props: {
    'payoutTime': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

</style>
