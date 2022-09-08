<template>
  <div v-if="visible">
    <div class="notice-cover" @click.stop="onClose" />
    <div class="fadeInUp pp notice animated">
      <div class="scroll-wrap float">
        <div id="scroll-inner" class="scroll-inner off">
          <div class="scroll-view" style="display: block; position: static; max-height: 50vh;">
            <div class="w-100">
              <div class="notice-tip">{{ `${$t('__superior')} :` }}</div>
              <div class="notice-text">
                <div class="scroll-wrap float" style="height: auto;">
                  <div id="scroll-inner" class="scroll-inner off">
                    <div class="scroll-view" style="position: static;">
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
          </div>
        </div>
      </div>
      <div class="d-flex w-100 justify-content-center p-buttons" style="margin-top: 1.5rem;">
        <button type="button" class="el-button bg-gray common-button w-50 el-button--primary" @click.stop="onClose">
          <span>{{ $t('__close') }}</span>
        </button>
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
    }
  },
  data: function() {
    return {
      levelProps: {
        children: 'SubAgentLevelInfos',
        label: 'AgentName'
      }
    }
  },
  computed: {
  },
  watch: {
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
.notice-cover {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: block;
  background-color: rgba(0,0,0,0.5);
  z-index: 3;
}
.notice {
  background-color: #000;
  padding: 1.66667rem 1.66667rem 1.66667rem 1.66667rem;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 4;
  border-top: 0.25rem solid #f9c901;
  height: auto;
}

.p-buttons {
  padding-top: 0.41667rem;
  padding-bottom: 0.41667rem;
}
</style>
