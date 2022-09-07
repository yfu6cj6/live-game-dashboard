<template>
  <div v-if="visible">
    <div class="pop-over bg-black">
      <div class="panel flex-column">
        <div
          class="fas icon-close text-link yellow"
          style="height: 1.77778rem; width: 1.77778rem;"
        >
          <svg
            id="close"
            data-name="close"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 47.971 47.971"
            style="height: 0.941176rem; width: 0.941176rem;"
            xml:space="preserve"
          >
            <g>
              <path
                d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,
                0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,
                3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,
                0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
              />
            </g>
          </svg>
        </div>
        <div class="d-flex flex-nowrap">
          <div class="b-right" style="padding: 15px 10px;">
            <div class="notice-tip text-yellow mb-1">{{ `${$t('__superior')} :` }}</div>
            <div>
              <div>
                <div class="bg-lightgray agent-tree is-superior">
                  <el-tree
                    ref="tree"
                    :data="agentLevel"
                    :props="agentLevelProps"
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
import { mapGetters } from 'vuex'

export default {
  name: 'AgentInfoDialog',
  components: { },
  mixins: [dialogCommon, common],
  props: {
    'visible': {
      type: Boolean,
      require: true
    },
    'form': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'agentInfo': {
      type: Object,
      require: true,
      default() {
        return {}
      }
    },
    'agentLevel': {
      type: Array,
      require: true,
      default() {
        return []
      }
    }
  },
  data: function() {
    return {
      agentLevelProps: {
        children: 'SubAgentLevelInfos',
        label: 'AgentName'
      }
    }
  },
  computed: {
    ...mapGetters([
      'isAgentSubAccount'
    ])
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
    handleNodeClick(data, node, com) {
      node.expanded = true
      if (data.AgentId !== null) {
        this.$emit('agent-click', JSON.parse(JSON.stringify(data.AgentId)))
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
