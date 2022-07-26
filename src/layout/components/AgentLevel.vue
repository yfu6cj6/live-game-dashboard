<template>
  <div ref="agentLevel" class="agentLevel-container" :class="{'open': agentLevelSidebar}">
    <div class="agentLevel-header" @click="onHandleBtnClick()">
      <i class="el-icon-arrow-left" />
      <span>{{ $t('__agentManagement') }}</span>
    </div>
    <div v-loading="agentLevelLoading" class="agentLevel-item">
      <el-input v-model="filterText" :placeholder="$t('__enterKeys')" />
      <div class="scroll-view">
        <el-tree
          ref="tree"
          :data="agentLevel"
          :props="defaultProps"
          node-key="AgentId"
          :default-expanded-keys="treeDefaultExpandedKeys"
          :render-content="renderContent"
          :indent="8"
          :filter-node-method="filterNode"
          highlight-current
          :expand-on-click-node="false"
          @node-click="handleNodeClick"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AgentLevel',
  data() {
    return {
      defaultProps: {
        children: 'SubAgentLevelInfos',
        label: 'AgentName'
      },
      filterText: ''
    }
  },
  computed: {
    ...mapGetters([
      'agentLevelSidebar',
      'agentLevel',
      'agentLevelLoading',
      'agentLevelExpandedKeys'
    ]),
    treeDefaultExpandedKeys() {
      return (!this.agentLevelExpandedKeys || this.agentLevelExpandedKeys.length === 0) ? [] : this.agentLevelExpandedKeys
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val)
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true
      const regex = new RegExp(value, 'gi')
      return regex.test(data.AgentName)
    },
    onHandleBtnClick() {
      this.$store.dispatch('agentManagement/closeAgentLevelSideBar')
    },
    renderContent(h, { node, data, store }) {
      return (
        <span style='font-size: 14px'>
          {data.AgentName}
        </span>
      )
    },
    async handleNodeClick(data, node, com) {
      node.expanded = true
      this.$store.dispatch('agentManagement/setAgentLevelLoading', true)
      await this.$router.push({ path: `/agentManagement/agentManagement/${data.AgentId}` })
      this.$store.dispatch('agentManagement/setAgentLevelLoading', false)
    }
  }
}
</script>

<style lang="scss">
@import "~@/styles/variables.scss";
.agentLevel-container {
  display: flex;
  flex-direction: column;
  width: $sideBarWidth;
  height: calc(100vh - 45px);
  background-color: #000;
  transition: transform .3s;
  transform: translateX(-($sideBarWidth + 1));
  color: #fff;
  .agentLevel-header {
    padding: 10px 0;
    cursor: pointer;
    border-bottom: 0.08333rem solid $gray;
  }
  .agentLevel-item {
    padding: 10px 0;
    max-height: 100%;
    overflow: auto;
    cursor: pointer;
    .scroll-view {
      .el-tree {
        background-color: #000;
        color: #fff;
        display: inline-block;
        .el-tree-node {
          .el-tree-node__content {
            .el-tree-node__expand-icon {
              color: $yellow;
            }
            &:hover {
              background-color: #000;
            }
          }
        }
      }
    }
  }
}

.open.agentLevel-container {
  transform: translateX(0);
}
</style>
