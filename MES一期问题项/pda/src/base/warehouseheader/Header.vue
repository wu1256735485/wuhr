<template>
  <div>
    <header class="header">
      <h1 >{{title}}</h1>
      <i @click="back" class="cubeic-back"></i>
    </header>
  </div>
</template>

<script>
export default {
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    back() {
      this.$router.back()
    }
  },
  props: ['title']
}
</script>
<style lang="stylus" scoped>
.header
      position: relative
      height: 40px
      line-height: 40px
      text-align: center
      background-color: #3A85E6
      h1
        font-size: 16px
        color #fff
      .cubeic-back
        position: absolute
        top: 0
        left: 0
        padding: 0 15px
        color: #fff
</style>
