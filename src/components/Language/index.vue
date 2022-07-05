<template>
  <div @click.stop="onClick">
    <div class="language">
      <div class="language-switch" :class="{'dropdown': dropdown}">
        <div class="current-language">
          <div
            v-for="(item, index) in langList"
            :key="index"
            @click="changLang(item.key, index)"
          >
            <img
              :src="require(`@/assets/lang/${item.key}.png`)"
              :class="{'display_none': index !== curLangIndex}"
              :title="item.title"
              width="25"
              height="25"
            >
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
            <img
              :src="require(`@/assets/lang/${item.key}.png`)"
              :title="item.title"
              width="25"
              height="25"
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
  z-index: 1;
  width: 30px;
  height: 30px;
  cursor: pointer;

  .language-switch {
    .current-language {
      cursor: pointer;
      text-align: center;
      padding-top: 3px;
    }

    .language-list {
      display: block;

      .language-item {
        border-top: 0.08333rem solid $yellow;
        text-align: center;

        img {
          margin-top: 3px;
        }
      }
    }
  }

  .display_none {
    display: none;
  }

  .language-switch.dropdown {
    background: rgba(155,155,155,0.4);
  }
}
</style>
