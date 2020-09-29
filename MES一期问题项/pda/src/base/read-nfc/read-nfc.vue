<template>
  <div class="wrapper" @click.stop="handleIsShow">
    <div class="nfc-back">
      <div class="nfc">
        <img src="static/btn_img.png" alt="" class="nfc-img">
        <p class="text-info">请刷卡验证人员</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cardId: {
      type: String,
      default: ''
    },
    operation: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    window.beCalledstartNfc = this.beCalledNfc
  },
  methods: {
    beCalledNfc(data) {
      alert(data)
      console.log(data, this.cardId)
      if (!this.operation) {
        return
      }
      if (this.cardId === data) {
        this.$emit('card', true)
      } else {
        this.$emit('card', false)
      }
    },
    handleIsShow() {
      this.$emit('is-show', false)
    }
  }
}
</script>

<style lang="stylus" scoped>
  .wrapper
    width 100%
    height 100%
    background #000
    .nfc-back
      position fixed
      left 0
      right 0
      top 0
      bottom 0
      z-index 99
      background rgba(0, 0, 0, .7)
      .nfc
        position absolute
        left 50%
        top 50%
        transform translate(-50%, -120%)
        .nfc-img
          display block
          width 70px
          height 70px
          margin-left 21px
        .text-info
          display block
          font-size 16px
          color #fff
          line-height 35px
          text-align center
</style>