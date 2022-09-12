<template>
  <div v-if="visible" class="treeDialog" :style="`top: ${top}px; left: ${left}px;`">
    <div class="pop-over bg-black">
      <div class="panel flex-column">
        <div
          class="fas icon-close text-link yellow"
          style="height: 1.77778rem; width: 1.77778rem;"
          @click.stop="onClose"
        >
          <svg-icon icon-class="close" style="height: 0.941176rem; width: 0.941176rem;" />
        </div>
        <div class="d-flex flex-nowrap">
          <div class="b-right" style="padding: 15px 10px;">
            <div class="notice-tip text-yellow mb-1">{{ `${$t('__superior')} :` }}</div>
            <div>
              <div>
                <div class="bg-lightgray agent-tree is-superior">
                  <el-tree
                    v-loading="dialogLoading"
                    :data="treeLevel"
                    :props="levelProps"
                    node-key="selected"
                    :render-content="renderContent"
                    :indent="8"
                    highlight-current
                    :expand-on-click-node="false"
                    default-expand-all
                    :current-node-key="1"
                    @node-click="handleNodeClick"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import dialogCommon from '@/mixin/dialogCommon'
import common from '@/mixin/common'

export default {
  name: 'TreeDialog',
  components: { },
  mixins: [dialogCommon, common],
  props: {
    'visible': {
      type: Boolean,
      require: true
    },
    'treeLevel': {
      type: Array,
      require: true,
      default() {
        return []
      }
    },
    'clickClassName': {
      type: String,
      require: true,
      default() {
        return ''
      }
    }
  },
  data: function() {
    return {
      levelProps: {
        children: 'SubAgentLevelInfos',
        label: 'AgentName'
      },
      top: 0,
      left: 0
    }
  },
  computed: {
  },
  watch: {
    'visible': {
      handler() {
        if (this.visible) {
          this.$nextTick(() => {
            const parentRect = this.$el.parentNode.getBoundingClientRect()
            const clickEl = document.querySelector(this.clickClassName)
            if (clickEl) {
              const clickElRect = clickEl.getBoundingClientRect()
              const top = clickElRect.top - parentRect.top + 30
              let setTop = top
              if ((setTop + 180) > parentRect.height) {
                setTop = setTop - 180 - 60
              }
              if (setTop < parentRect.top) {
                setTop = top
              }
              this.top = setTop
              this.left = clickElRect.left - parentRect.left + 30
            } else {
              this.top = 0
              this.left = 0
            }
          })
        }
      },
      immediate: true
    }
  },
  methods: {
    renderContent(h, { node, data, store }) {
      return (
        <span style='font-size: 1.16667rem'>
          {data.AgentName}
        </span>
      )
    },
    async handleNodeClick(data, node, com) {
      node.expanded = true
      if (data.AgentId !== null) {
        await this.$router.push({ path: `/agentManagement/agentManagement/${data.AgentId}` })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.treeDialog {
  position: absolute;
  z-index: 1;
}
</style>
