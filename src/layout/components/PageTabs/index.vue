<template>
  <div>
    <div class="tabs">
      <div class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
        <div class="swiper-wrapper" :style="`transform: translate3d(${translateX}px, 0px, 0px); transition-duration: 300ms;`">
          <div
            class="swiper-slide page-tab-item swiper-slide-active"
            :class="{
              'inactive': !isActive('/home'),
              'active': isActive('/home')}"
            @click.stop="toPage({ path: '/home' })"
          >
            <span class="tab-name">{{ $t('__announcement') }}</span>
            <span class="text-white separator">|</span>
          </div>
          <div
            v-for="(page, index) in visitedViews"
            ref="page"
            :key="page.path"
            class="swiper-slide page-tab-item"
            :class="{
              'inactive': !isActive(page),
              'active': isActive(page),
              'swiper-slide-next': page.path !== '/home'}"
            :style="`${(page.path === '/home' ? '' : `order: ${2000 + (index * 100)};`)}`"
            @click.stop="toPage(page)"
          >
            <template v-if="page.path !== '/home'">
              <span :title="$t(page.meta.title)" class="tab-name">{{ $t(page.meta.title) }}</span>
              <div class="fas icon-close" style="height: 1.33333rem; width: 1.33333rem;" @click.prevent.stop="closeSelectedTag(page)">
                <svg
                  id="close"
                  data-name="close"
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  x="0px"
                  y="0px"
                  viewBox="0 0 47.971 47.971"
                  style="height: 0.705882rem; width: 0.705882rem;"
                  xml:space="preserve"
                  @click.prevent.stop="closeSelectedTag(page)"
                >
                  <title>{{ $t('__close') }}</title>
                  <g>
                    <path
                      d="M28.228,23.986L47.092,5.122c1.172-1.171,1.172-3.071,0-4.242c-1.172-1.172-3.07-1.172-4.242,0L23.986,19.744L5.121,0.88   c-1.172-1.172-3.07-1.172-4.242,0c-1.172,1.171-1.172,3.071,0,4.242l18.865,18.864L0.879,42.85c-1.172,1.171-1.172,3.071,0,4.242   C1.465,47.677,2.233,47.97,3,47.97s1.535-0.293,2.121-0.879l18.865-18.864L42.85,47.091c0.586,0.586,1.354,0.879,2.121,0.879   s1.535-0.293,2.121-0.879c1.172-1.171,1.172-3.071,0-4.242L28.228,23.986z"
                    />
                  </g>
                </svg>
              </div>
              <span class="text-white separator">|</span>
            </template>
          </div>
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
      </div>
    </div>
  </div>
</template>

<script>
import path from 'path'
import { mapGetters } from 'vuex'

export default {
  data() {
    return {
      visible: false,
      left: 0,
      selectedTag: {},
      affixTags: [],
      translateX: 0
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
    toPage(page) {
      this.$router.push({ path: page.path, query: page.query, fullPath: page.fullPath })
    },
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
      const pages = this.visitedViews
      const $container = document.getElementsByClassName('swiper-container')[0]
      const $wrapper = document.getElementsByClassName('swiper-wrapper')[0]
      this.$nextTick(() => {
        let firstPage = null
        let lastPage = null

        // find first tag and last tag
        if (pages.length > 0) {
          firstPage = pages[0].path
          lastPage = pages[pages.length - 1].path
        }
        if (firstPage === this.$route.path) {
          this.translateX = 0
        } else if (lastPage === this.$route.path) {
          this.translateX = $container.offsetWidth - $wrapper.scrollWidth
        } else {
          const $swiperSlide = document.getElementsByClassName('swiper-slide active')[0]
          const curPos = $swiperSlide.getBoundingClientRect()
          const containerPos = $container.getBoundingClientRect()
          const currentIndex = pages.findIndex(item => item.path === this.$route.path)
          if (curPos.left < containerPos.left) {
            this.translateX = -(currentIndex - 1) * curPos.width
          } else if (curPos.left > containerPos.right || curPos.right > containerPos.right) {
            this.translateX = containerPos.width - (curPos.width * (currentIndex + 2));
          }
        }
        for (const page of pages) {
          if (page.path === this.$route.path) {
            // when query is different then update
            if (page.fullPath !== this.$route.fullPath) {
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

.tabs {
  overflow-x: hidden;
  -ms-touch-action: none;
  touch-action: none;
  padding-left: 0.83333rem;
  z-index: 1;
  padding-right: 4.16667rem;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    left: 0;
    bottom: 0px;
    height: 3px;
    width: 100%;
    background: #f9c901;
    z-index: 0;
    border-bottom: 0.25rem solid #6e6e6e;
  }
  .swiper-container {
    height: 2.5rem;
    .swiper-notification {
      position: absolute;
      left: 0;
      top: 0;
      pointer-events: none;
      opacity: 0;
      z-index: -1000;
    }
  }
  .page-tab-item {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    width: 15rem !important;
    cursor: pointer;
    padding: 0;
    color: #fff;
    fill: #fff;
    position: relative;
    .tab-name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      word-break: keep-all;
      margin-right: auto;
      padding: 0.83333rem 0 0.83333rem 1.25rem;
      width: 12.5rem !important;
      &:hover {
        color: #f9c901;
      }
    }
    .separator {
      margin-left: 0.41667rem;
      font-weight: 150;
      color: #c0c4cc;
    }
    .icon-close.fas {
      background-color: transparent;
      border-radius: 50%;
      width: 1.41667rem;
      height: 1.41667rem;
      display: -webkit-box;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
      margin-left: auto;
      &:hover {
        background-color: #666;
      }
    }
    &.active {
      color: #f9c901;
      fill: #f9c901;
      font-weight: bold;
      &:before {
        content: '';
        display: block;
        position: absolute;
        left: 0;
        bottom: 0px;
        height: 3px;
        width: 100%;
        background: #f9c901;
        z-index: 3;
      }
    }
    &:last-child {
      margin-right: 1.66667rem;
    }
  }
}
</style>
