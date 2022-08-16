<template>
  <div class="tags-view-container">
    <scroll-pane ref="scrollPane" class="scroll-pane" @scroll="handleScroll">
      <router-link
        v-for="tag in visitedViews"
        ref="tag"
        :key="tag.path"
        :class="{'active': isActive(tag)}"
        :to="{ path: tag.path, query: tag.query, fullPath: tag.fullPath }"
        tag="span"
        class="tags-view-item"
        @click.middle.native="!isAffix(tag)?closeSelectedTag(tag):''"
        @dblclick.native="refreshSelectedTag(tag)"
        @contextmenu.prevent.native="openMenu(tag,$event)"
      >
        <div class="content">
          <span class="title">{{ $t(tag.title) }}</span>
          <svg-icon v-if="!isAffix(tag)" class="close-icon" icon-class="close" @click.prevent.stop="closeSelectedTag(tag)" />
        </div>
      </router-link>
    </scroll-pane>
    <ul v-show="visible" :style="{left:left+'px'}" class="contextmenu">
      <li @click="refreshSelectedTag(selectedTag)">{{ $t("__refresh") }}</li>
      <li v-if="!isAffix(selectedTag)" @click="closeSelectedTag(selectedTag)">{{ $t("__close") }}</li>
      <li @click="closeOthersTags">{{ $t("__closeOthers") }}</li>
      <li @click="closeAllTags(selectedTag)">{{ $t("__closeAll") }}</li>
    </ul>
  </div>
</template>

<script>
import ScrollPane from './ScrollPane'
import path from 'path'
import { mapGetters } from 'vuex'

export default {
  components: { ScrollPane },
  data() {
    return {
      visible: false,
      left: 0,
      selectedTag: {},
      affixTags: []
    }
  },
  computed: {
    ...mapGetters([
      'visitedViews',
      'permission_routes'
    ])
  },
  watch: {
    $route() {
      this.addTags()
      this.moveToCurrentTag()
    },
    visible(value) {
      if (value) {
        document.body.addEventListener('click', this.closeMenu)
      } else {
        document.body.removeEventListener('click', this.closeMenu)
      }
    }
  },
  mounted() {
    this.initTags()
    this.addTags()
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path
    },
    isAffix(tag) {
      return tag.meta && tag.meta.affix
    },
    filterAffixTags(routes, basePath = '/') {
      let tags = []
      routes.forEach(route => {
        if (route.meta && route.meta.affix) {
          const tagPath = path.resolve(basePath, route.path)
          tags.push({
            fullPath: tagPath,
            path: tagPath,
            name: route.name,
            meta: { ...route.meta }
          })
        }
        if (route.children) {
          const tempTags = this.filterAffixTags(route.children, route.path)
          if (tempTags.length >= 1) {
            tags = [...tags, ...tempTags]
          }
        }
      })
      return tags
    },
    initTags() {
      const affixTags = this.affixTags = this.filterAffixTags(this.permission_routes)
      for (const tag of affixTags) {
        // Must have tag name
        if (tag.name) {
          this.$store.dispatch('tagsView/addVisitedView', tag)
        }
      }
    },
    addTags() {
      const { name } = this.$route
      if (name) {
        this.$store.dispatch('tagsView/addView', this.$route)
      }
      return false
    },
    moveToCurrentTag() {
      const tags = this.$refs.tag
      this.$nextTick(() => {
        for (const tag of tags) {
          if (tag.to.path === this.$route.path) {
            this.$store.dispatch('tagsView/updateCurViewTitle', this.$route)
            this.$refs.scrollPane.moveToTarget(tag)
            // when query is different then update
            if (tag.to.fullPath !== this.$route.fullPath) {
              this.$store.dispatch('tagsView/updateVisitedView', this.$route)
            }
            break
          }
        }
      })
    },
    refreshSelectedTag(view) {
      this.$store.dispatch('tagsView/delCachedView', view).then(() => {
        const { fullPath } = view
        this.$nextTick(() => {
          this.$router.replace({
            path: '/redirect' + fullPath
          })
        })
      })
    },
    closeSelectedTag(view) {
      this.$store.dispatch('tagsView/delView', view).then(({ visitedViews }) => {
        if (this.isActive(view)) {
          this.toLastView(visitedViews, view)
        }
      })
    },
    closeOthersTags() {
      this.$router.push(this.selectedTag)
      this.$store.dispatch('tagsView/delOthersViews', this.selectedTag).then(() => {
        this.moveToCurrentTag()
      })
    },
    closeAllTags(view) {
      this.$store.dispatch('tagsView/delAllViews').then(({ visitedViews }) => {
        if (this.affixTags.some(tag => tag.path === view.path)) {
          return
        }
        this.toLastView(visitedViews, view)
      })
    },
    toLastView(visitedViews, view) {
      const latestView = visitedViews.slice(-1)[0]
      if (latestView) {
        this.$router.push(latestView.fullPath)
      } else {
        // now the default is to redirect to the home pages if there is no tags-view,
        // you can adjust it according to your needs.
        if (view.name === 'Dashboard') {
          // to reload home pages
          this.$router.replace({ path: '/redirect' + view.fullPath })
        } else {
          this.$router.push('/')
        }
      }
    },
    openMenu(tag, e) {
      const menuMinWidth = 100
      const offsetWidth = this.$el.offsetWidth // container width
      const maxLeft = offsetWidth + menuMinWidth // left boundary
      const left = e.clientX

      if (left > maxLeft) {
        this.left = maxLeft
      } else {
        this.left = left
      }

      this.visible = true
      this.selectedTag = tag
    },
    closeMenu() {
      this.visible = false
    },
    handleScroll() {
      this.closeMenu()
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.tags-view-container {
  width: 100vw;
  background-color: #000;

  .scroll-pane {
    .tags-view-item {
      color: #fff;
      font-size: 16px;
      display: inline-block;
      height: $tagsViewHeight;
      border-right: 1px solid #fff;
      cursor: pointer;

      .content {
        padding-left: .5em;
        padding-right: .5em;
        display: flex;
        align-items: center;
        height: $tagsViewHeight;

        .title + .close-icon {
          width: 12px;
          margin-left: 1em;
        }
      }
    }

    .tags-view-item.active {
      color: $yellow;
      font-size: 18px;
      font-weight: bold;
    }
  }

  .contextmenu {
    display: none;
  }
}

@media screen and (min-width: 992px) {
  .tags-view-container {
    position: relative;
    .contextmenu {
      background-color: #000;
      color: $yellow;
      position: absolute;
      display: block;
      box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .3);
      border-radius: 4px;
      list-style-type: none;

      li {
        padding: 5px;
        cursor: pointer;
        &:hover {
          background: #444;
        }
      }

      li + li {
        border-top: 1px solid #fff;
      }
    }
  }
}
</style>
