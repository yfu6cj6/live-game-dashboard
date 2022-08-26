<template>
  <div class="http404-container">
    <div class="wrap">
      <div class="pic">
        <img src="@/assets/404_images/404.png" alt="404">
      </div>
      <div class="content">
        <div class="oops">{{ `${$t('__oops')}!` }}</div>
        <div class="headline">{{ $t('__checkUrl') }}</div>
        <a href="" class="return-home">{{ $t('__backToHome') }}</a>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Page404',
  computed: {
  }
};
</script>

<style lang="scss" scoped>
@import "~@/styles/variables.scss";

.http404-container {
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  .wrap {
    margin: 0 auto;
    overflow: auto;
    max-height: 100%;
    .pic {
      display: flex;
      justify-content: center;
      align-items: center;
      max-width: 100vw;

      img {
        max-width: 100vw;
      }
    }

    .content {
      max-width: 100vw;
      text-align: center;
      .oops {
        font-weight: bold;
        color: #f9c901;
        font-size: 3rem;
        margin-top: 1rem;
        margin-bottom: 1rem;
      }
      .headline {
        font-weight: bold;
        line-height: 1.8rem;
        font-size: 1.5rem;
        color: #f9c901;
      }
      .return-home {
        display: inline-block;
        background: #f9c901;
        border-radius: 10rem;
        text-align: center;
        color: #000;
        width: auto;
        height: 3rem;
        line-height: 3rem;
        padding: 0 1.5rem;
        margin-top: 1rem;
        font-weight: bold;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 991px) {
  .http404-container {
    .wrap {
      .pic {
        img {
          max-height: 250px;
        }
      }
    }
  }
}
</style>
