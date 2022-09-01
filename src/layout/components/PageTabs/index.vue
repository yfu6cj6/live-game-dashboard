<template>
  <div>
    <div class="tabs">
      <div class="swiper-container swiper-container-initialized swiper-container-horizontal swiper-container-free-mode">
        <div class="swiper-wrapper" :style="`transform: translate3d(${translateX}px, 0px, 0px); transition-duration: 300ms;`">
          <div
            class="swiper-slide page-tab-item swiper-slide-active"
            :class="{
              'inactive': !isActive({ path: '/home' }),
              'active': isActive({ path: '/home' })}"
            @click.stop="toPage({ path: '/home' })"
          >
            <span class="tab-name">{{ $t('__announcement') }}</span>
            <span class="text-white separator">|</span>
          </div>
          <template
            v-for="(page, index) in visitedViews"
          >
            <template v-if="page.path !== '/home'">
              <div
                ref="page"
                :key="page.path"
                class="swiper-slide page-tab-item swiper-slide-next"
                :class="{
                  'inactive': !isActive(page),
                  'active': isActive(page)}"
                :style="`order: ${2000 + (index * 100)};`"
                @click.stop="toPage(page)"
              >
                <span :title="$t(page.title)" class="tab-name">{{ $t(page.title) }}</span>
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
              </div>
            </template>
          </template>
        </div>
        <span class="swiper-notification" aria-live="assertive" aria-atomic="true" />
      </div>
    </div>
    <div v-if="expand" class="more-list">
      <div>
        <div
          class="list-item"
          :class="{
            'inactive': !isActive({ path: '/home' }),
            'active': isActive({ path: '/home' })}"
          @click.stop="toPage({ path: '/home' })"
        >
          <span class="tab-name">{{ $t('__announcement') }}</span>
        </div>
        <template
          v-for="(page, index) in visitedViews"
        >
          <template v-if="page.path !== '/home'">
            <div
              :key="page.path"
              class="list-item"
              :class="{
                'inactive': !isActive(page),
                'active': isActive(page)}"
              :style="`order: ${2000 + (index * 100)};`"
              @click.stop="toPage(page)"
            >
              <span :title="$t(page.title)" class="tab-name">{{ $t(page.title) }}</span>
            </div>
          </template>
        </template>
      </div>
    </div>
    <div class="more-button clickable" @click.stop="toggleExpand">
      <div class="fas white">
        <svg
          id="圖層_1"
          data-name="圖層 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 63 63"
          style="height: 1rem; width: 1rem;"
        >
          <title>{{ $t('__expand') }}</title>
          <path
            d="M31.51,32.86C33,31.4,34.35,30,35.76,28.56,40.82,23.5,45.91,18.46,51,13.38c2-2.05,4.84-2.16,6.37-.91a29.08,
            29.08,0,0,1,4.85,4.88c1.42,1.86.93,4.42-.81,6.2-2.08,2.13-4.2,4.22-6.31,6.33q-9.81,9.81-19.63,19.64A5.12,5.12,
            0,0,1,29.75,51a6,6,0,0,1-2.14-1.38Q17.23,39.32,6.91,28.94C5.27,27.3,3.64,25.64,2,24A5.72,5.72,0,0,1,0,20.38a4.48,
            4.48,0,0,1,1-3.52,47.11,47.11,0,0,1,4.12-4.12,4.87,4.87,0,0,1,6.31.19c1.85,1.73,3.61,3.55,5.41,5.33L31.12,
            32.52C31.22,32.62,31.33,32.7,31.51,32.86Z"
          />
        </svg>
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
      translateX: 0,
      expand: false
    }
  },
  computed: {
    ...mapGetters([
      'visitedViews',
      'permission_routes',
      'device'
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
    },
    device() {
      this.$nextTick(() => {
        this.closeOthersTags()
      })
    }
  },
  mounted() {
    document.addEventListener('click', (e) => {
      if (e.target.className !== 'more-button') {
        this.expand = false
      }
    })
    this.initTags()
    this.addTags()
  },
  beforeDestroy() {
    window.removeEventListener('click', () => {}, true)
  },
  methods: {
    toggleExpand() {
      this.expand = !this.expand
    },
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
      if (this.device === 'mobile') {
        this.$nextTick(() => {
          this.translateX = 0
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
      } else {
        const $container = document.querySelector('.swiper-container')
        const $wrapper = document.querySelector('.swiper-wrapper')
        this.$nextTick(() => {
          let lastPage = null

          // find first tag and last tag
          if (pages.length > 0) {
            lastPage = pages[pages.length - 1].path
          }
          if (this.$route.path === '/home') {
            this.translateX = 0
          } else if (lastPage === this.$route.path) {
            this.translateX = $container.offsetWidth - $wrapper.scrollWidth
          } else {
            const $swiperSlide = document.querySelector('.swiper-slide.active')
            const curPos = $swiperSlide.getBoundingClientRect()
            const containerPos = $container.getBoundingClientRect()
            const currentIndex = pages.findIndex(item => item.path === this.$route.path)
            if (curPos.left < containerPos.left) {
              this.translateX = -(currentIndex - 1) * curPos.width
            } else if (curPos.right > containerPos.right) {
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
      }
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
      this.$router.push(this.$route)
      this.$store.dispatch('tagsView/delOthersViews', this.$route).then(() => {
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

.more-list {
  width: 12.5rem;
  position: absolute;
  right: 1.66667rem;
  top: 1.66667rem;
  z-index: 2;
  background: #fff;
  border: 1px solid #666;
  .list-item {
    cursor: pointer;
    width: 100%;
    color: #000;
    border-bottom: 1px solid #f0eff0;
    .tab-name {
      display: block;
      padding: 0.41667rem;
      width: 100%;
      text-align: left;
    }
    &.active {
      color: #ce9600;
      font-weight: bold;
    }
  }
}

.more-button {
  cursor: pointer;
  position: absolute;
  right: 2.08333rem;
  top: 0.625rem;
  z-index: 3;
}
</style>
