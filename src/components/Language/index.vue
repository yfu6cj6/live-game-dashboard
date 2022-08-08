<template>
  <div class="language" @click.stop="onClick">
    <div class="language-switch" :class="{'dropdown': dropdown}">
      <div class="current-language">
        <div
          v-for="(item, index) in langList"
          :key="index"
          class="language-item"
          @click="changLang(item.key, index)"
        >
          <div class="fas" :class="{'display_none': index !== curLangIndex}">
            <img
              :src="require(`@/assets/lang/${item.key}.png`)"
              :title="item.title"
            >
          </div>
        </div>
      </div>
      <div v-if="dropdown" class="language-list">
        <div
          v-for="(item, index) in langList"
          :key="index"
          class="language-item"
          :class="{'display_none': index === curLangIndex}"
          @click="changLang(item.key, index)"
        >
          <div class="fas">
            <img
              :src="require(`@/assets/lang/${item.key}.png`)"
              :title="item.title"
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Language',
  props: {
    lang: {
      type: String,
      require: true,
      default() {
        return 'zh_cht'
      }
    }
  },
  data() {
    const langList = [{
      key: 'zh_cht',
      title: this.$t('__traditionalChinese')
    },
    {
      key: 'zh_chs',
      title: this.$t('__simplifiedChinese')
    }]
    let langIndex = -1
    for (let i = 0, max = langList.length; i < max; i++) {
      if (langList[i].key === this.lang) {
        langIndex = i
        break
      }
    }
    return {
      langList: langList,
      curLangIndex: langIndex,
      dropdown: false
    }
  },
  methods: {
    changLang(lang, index) {
      this.curLangIndex = index
      this.$emit('changLang', lang)
    },
    onClick() {
      this.dropdown = !this.dropdown
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.language {
  position: absolute;
  top: 0.16667rem;
  right: 0.41667rem;
  z-index: 2;
  .language-switch {
    position: relative;
    padding: 0.66667rem;
    &.dropdown {
      background: rgba(155,155,155,0.4);
    }
    .current-language {
      cursor: pointer;
    }
    .language-item {
      .fas {
        fill: #fff !important;
        img {
          vertical-align: middle;
          overflow: hidden;
          height: 2.16667rem;
          width: 2.16667rem;
        }
      }
    }
    .language-list {
      display: block;
      -webkit-animation-name: fadeIn;
      animation-name: fadeIn;
      -webkit-animation-duration: 0.5s;
      animation-duration: 0.5s;
      -webkit-animation-fill-mode: both;
      animation-fill-mode: both;
      .language-item {
        border-top: 0.08333rem solid #f9c901;
        margin-top: 0.41667rem;
        padding-top: 0.5rem;
        cursor: pointer;
      }
    }
  }
  .display_none {
    display: none;
  }
}
</style>
