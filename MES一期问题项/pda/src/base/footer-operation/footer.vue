<template>
  <div class="footer">
    <div class="search" ref="search">
      <img src="@/base/footer/scanning.png" class="scan-code" 
      @click="scanNing">
      <input type="text"
        v-model="value"
        ref="search"
        @keyup.enter="search"
        :clearable="true"
        :placeholder="placeholder"
        class="search-text" />
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入工票号或扫描工票二维码'
    }
  },
  data() {
    return {
      list: '',
      value: ''
    }
  },
  // 缓存触发
  activated() {
    window.beCalledScan = this.beCalledScan
    window.beCalledNfc = this.beCalledNfc
    window.beCalledPDscanner = this.beCalledPDscanner
  },
  mounted () {
    window.beCalledScan = this.beCalledScan
    window.beCalledNfc = this.beCalledNfc
    window.beCalledPDscanner = this.beCalledPDscanner
    
  },
  methods: {
    scanNing() {
      $App.callScan()
    },
    search() {
      this.$refs.search.style.position = 'static'
      this.$emit('search', this.value)
    },
    beCalledNfc (data) {
      this.value = data
      this.$emit('readNfc', this.value)
    },
    beCalledScan (data) {
      this.$emit('read', data)
      this.$refs.search.style.position = 'static'
    },
    beCalledPDscanner (data) {
      this.value = data
      this.$emit('read', this.value)
      this.$refs.search.style.position = 'static'
    }
  }
}
</script>

<style lang="stylus" scoped>

  .footer
    width 100%
    position fixed
    bottom 0px
    @media (min-device-height: 790px) 
      bottom 50px
    z-index 6
    background #fff
    .search
      font-size 14px
      color #fff
      height 50px
      padding 5px 10px
      margin 0 10px
      display flex
      background #9acafb
      box-sizing border-box
      .search-text
        flex 1
        height 30px
        margin-top 5px
        padding-left 10px
        border-radius 4px
      .add-btn
        width 60px
        height 25px
        color #fff
        border none
        border-radius 5px
        background #f57021
        margin-left 5px
        margin-top 4px
      .scan-code
        width 36px
        height 32px
        margin 2px 10px 0 5px
</style>