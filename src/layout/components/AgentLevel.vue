<template>
  <div ref="agentLevel" class="agentLevel-container" :class="{'open': agentLevelSidebar}">
    <div class="agentLevel-header" @click="onHandleBtnClick()">
      <i class="el-icon-arrow-left ml-2" />
      <span>{{ $t('__agentManagement') }}</span>
    </div>
    <div v-loading="agentLevelLoading" class="agentLevel-item">
      <!-- <el-input v-model="filterText" :placeholder="$t('__enterKeys')" /> -->
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
        <span style='font-size: 1.16667rem'>
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
  height: calc(100vh - 3.75rem);
  background-color: #000;
  transform: translateX(-($sideBarWidth + 1));
  color: #fff;
  .agentLevel-header {
    cursor: pointer;
    border-bottom: 0.08333rem solid $gray;
    height: 3.33333rem;
    line-height: 3.33333rem;
    margin-top: 0.91667rem;
  }
  .agentLevel-item {
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
            height: 2.66667rem;
            .el-tree-node__expand-icon {
              color: $yellow;
              font-size: 1.5rem;
              margin-left: 0.5rem;
              padding: 0.33333rem !important;
            }
            &:hover {
              background-color: #000;
            }
          }
          &:focus>.el-tree-node__content {
            background-color: #000;
          }
        }
      }
      .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
        background-color: #000;
        color: $yellow;
      }
    }
  }
}

.open.agentLevel-container {
  transform: translateX(0);
  transition: transform .5s;
}
</style>
