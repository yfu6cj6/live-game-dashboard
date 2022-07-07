<template>
  <div class="home-container">
    <div class="accordion">
      <h2 class="header">{{ $t('__agencyAnnouncement') }}</h2>
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
    <div class="accordion">
      <h2 class="header">{{ $t('__gameAnnouncement') }}</h2>
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

<style lang="scss">
@import "~@/styles/variables.scss";

.home-container {
  .accordion {
    .header {
      width: 100%;
      text-align: center;
      padding: 10px 12px;
      color: #ce9600;
      font-weight: bold;
      border-bottom: 1px solid #EBEEF5;
    }
  
    .el-collapse {
      border: none;

      .el-collapse-item {
        .el-collapse-item__header {
          font-size: 18px;
          font-weight: bold;
          color: #ca0;
          padding-left: 10px;
        }
  
        .el-collapse-item__content {
          font-size: 16px;
          padding-left: 5px;
          padding-right: 5px;
        }
      }
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
}

@media screen and (min-width: 992px) {
  .home-container {
    display: flex;
    .accordion {
      width: 50%;

      .el-collapse {
        .el-collapse-item {
          width: calc(100% - 1em);
          margin: 0 auto;
        }
      }
    }
  }
}
</style>
