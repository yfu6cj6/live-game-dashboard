<template>
  <div class="http404-container">
    <div class="wrap">
      <div class="pic">
        <img src="@/assets/404_images/404.png" alt="404">
      </div>
      <div class="content">
        <div class="oops">OOPS!</div>
        <div class="headline">Please check that the URL you entered is correct, or click the button below to return to the homepage.</div>
        <a href="" class="return-home">Back to home</a>
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
        color: #1482f0;
        font-size: 32px;
      }
      .headline {
        font-weight: bold;
        line-height: 24px;
        font-size: 20px;
      }
      .return-home {
        display: inline-block;
        background: #1482f0;
        border-radius: 100px;
        text-align: center;
        color: #ffffff;
        width: 110px;
        height: 36px;
        line-height: 36px;
      }
    }
  }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
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
