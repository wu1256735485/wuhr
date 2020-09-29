<template>
  <div class="header">
    <i class="cubeic-back back" @click="routerBack"></i>
    <h1 class="title">{{title}}</h1>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '生产执行'
    }
  },
  methods: {
    routerBack(path) {
      this.$emit('back')
      this.$router.back()
    },
    back() {
      this.$router.push('/Exception')
    }
  }
}
</script>

<style lang="stylus" scoped>
  .header
    width 100%
    height 45px
    position fixed
    z-index 1
    background #3b85e6
    .home
      position absolute
      width 28px
      height 28px
      right 10px
      top 10px
    .back
      width 28px
      height 28px
      position absolute
      left 5px
      top 12px
      color #fff
      font-size 18px
      &>img
        width 100%
        height 100%
        margin-top 8px
    .title
      font-size 16px
      color #fff
      line-height 45px
      text-align center
</style>
