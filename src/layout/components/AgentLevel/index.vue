<template>
  <div ref="agentLevel" :class="{show:agentLevelSidebar}">
    <div class="agentLevel">
      <div class="agentLevel-item" @click="onHandleBtnClick()">
        <i class="el-icon-arrow-left" />
        <span>{{ $t('__agentManagement') }}</span>
      </div>
      <div v-loading="agentLevelLoading">
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

.agentLevel {
  border-right: 2px solid $yellow;

  .el-tree-node__content:hover {
    background-color: #000;
  }

  .el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
    background-color: #000;
    color: $yellow;
  }

  .el-tree-node__expand-icon {
    color: $yellow;
  }

  .el-tree-node__expand-icon.is-leaf {
    color: transparent;
  }

  .el-tree-node:focus>.el-tree-node__content {
    background-color: #000;
  }
}
</style>
<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.agentLevel {
  width: 170px;
  max-width: 170px;
  height: 100%;
  position: fixed;
  top: 45px;
  right: 100%;
  transform-origin: right top;
  box-shadow: 0px 0px 15px 0px rgba(0, 0, 0, .05);
  background: #000;
  color: #fff;
  transition: all .4s cubic-bezier(.7, .3, .1, 1);
  transform: translate(0%);
  z-index: 1001;
  &-item {
    border-bottom: 0.08333rem solid $gray;
    margin-bottom: 10px;
    padding: 10px 0;
    cursor: pointer;
  }

  .scroll-view {
    max-height: calc(100vh - 90px);
    overflow: auto;
    overflow-x: auto;
    white-space: nowrap;
    width: 100%;
    padding-right: 10px;
  }
}

.show {
  transition: all .4s cubic-bezier(.7, .3, .1, 1);

  .agentLevel {
    transform: translate(100%);
  }
}

.el-tree {
  background-color: #000;
  color: #fff;
  display: inline-block;
}
</style>
