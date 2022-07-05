<template>
  <div class="home-container">
    <div>
      <div class="header">{{ $t('__agencyAnnouncement') }}</div>
      <el-collapse v-if="showAgentAnnouncements">
        <el-collapse-item
          v-for="item in agentAnnouncements"
          :key="item.id"
          :title="item.title"
        >
          <template>
            {{ item.fullContent }}
          </template>
        </el-collapse-item>
      </el-collapse>
      <div v-else class="noMore">{{ $t('__noMore') }}</div>
    </div>
    <div>
      <div class="header">{{ $t('__gameAnnouncement') }}</div>
      <el-collapse v-if="showGameAnnouncements">
        <el-collapse-item
          v-for="item in gameAnnouncements"
          :key="item.id"
          :title="item.title"
        >
          <template>
            {{ item.fullContent }}
          </template>
        </el-collapse-item>
      </el-collapse>
      <div v-else class="noMore">{{ $t('__noMore') }}</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'gameAnnouncements',
      'agentAnnouncements'
    ]),
    showGameAnnouncements() {
      return this.gameAnnouncements.length > 0
    },
    showAgentAnnouncements() {
      return this.agentAnnouncements.length > 0
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.home-container {
  .header {
    display: flex;
    align-items: center;
    justify-content: center;
    color: #ce9600;
    font-weight: bold;
    height: 40px;
  }

  .noMore {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    border-top: 2px solid #eee;
    border-bottom: 2px solid #eee;
  }
}
</style>
