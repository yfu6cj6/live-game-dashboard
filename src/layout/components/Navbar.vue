<template>
  <div class="navbar">
    <language class="language" :lang="curLang" @changLang="language" />
    <hamburger class="hamburger" :is-active="isCollapse" @toggleClick="toggleSideBar" />
    <div>
      <div class="app-info">
        <div class="app-name">
          {{ $t('__projectName') }}
        </div>
        <div class="user-info">
          <div class="item">
            Hi,
            <span>{{ nickname }}</span>
          </div>
          <div class="item">
            {{ $t('__currentAgent') }}:
            <span>{{ agentFullName }}</span>
          </div>
          <div class="item">
            {{ $t('__balance') }}:
            <span>{{ balanceInfo }}</span>
          </div>
        </div>
      </div>
    </div>

    <marquee v-if="marqueeMsg.length > 0" class="marquee">
      <div v-for="item in marqueeMsg" :key="item" class="marqueeMsg">
        {{ item }}
      </div>
    </marquee>
  </div>
</template>

<script>
import Hamburger from '@/components/Hamburger'
import { mapGetters } from 'vuex'
import Language from '@/components/Language'
import { getLanguage, setLanguage } from '@/lang/lang'

export default {
  components: {
    Hamburger,
    Language
  },
  data: function() {
    return {}
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'marqueeMsg',
      'agentFullName',
      'nickname',
      'balance',
      'agent_id'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    },
    balanceInfo() {
      return this.agent_id === 1 ? 'oo' : this.balance
    },
    curLang() {
      return getLanguage()
    }
  },
  created() {
  },
  methods: {
    language(lang) {
      setLanguage(lang)
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
      this.$nextTick(() => {
        if (!this.sidebar.opened) {
          this.$store.dispatch('agentManagement/closeAgentLevelSideBar')
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.navbar {
  width: 100vw;
  height: $navBarHeight;
  background-color: $black;
  display: flex;
  align-items: center;
  position: relative;

  .language {
    position: absolute;
    top: -2px;
    left: calc(100% - 40px);
  }

  .hamburger {
    margin-left: .5em;
    margin-right: .5em;
  }

  .app-info {
    font-size: 16px;
    height: 100%;

    .app-name {
      color: #fff;
    }

    .user-info {
      display: flex;
      width: calc(100vw - 1em - 40px);
      justify-content: space-between;

      .item {
        color: $yellow;

        span {
          color: #fff;
        }
      }
    }
  }

  .marquee {
    display: none;
  }
}

@media screen and (min-width: 992px) {
  .navbar {
    .language,
    .hamburger {
      display: none;
    }

    .app-info {
      display: flex;

      .app-name {
        width: 140px;
        margin-left: 10px;
        margin-right: 100px;
      }

      .user-info {
        width: 700px;
        justify-content: Flex-start;

        .item + .item {
          margin-left: 100px;
        }
      }
    }

    .marquee {
      display: inline-block;
    }
  }
}
</style>
