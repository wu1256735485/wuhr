<template>
  <div class="footer">
   <div class="footer_el">
    <span class="footer_img"><img src="@/base/footer/scanning.png" @click="scanning"></span>
    <span class="footer_input">
      <cube-input 
      class="footer_input_bg"
      :style="input_Images" 
      v-model="add_number" 
      :clearable="clearable" 
      :placeholder="placeholdertext" 
      ref="input" 
      @keyup.enter.native="searchFile()" 
      @keydown.enter.native="searchBlur()"></cube-input></span>
   </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  data () {
    return {
      add_number: '',
      clearable: true,
      msg: '',
      input_Images: {
        backgroundImage: 'url(' + require('@/base/footer/input.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  methods: {
    beCalledPDscanner (data) {
      this.add_number = ''
      this.add_number = data
      this.$emit('func', this.add_number)
    },
    searchBlur () {
      this.$emit('func', this.add_number)
    },
    scanning () {
      $App.callScan()
    },
    searchFile () {
      this.$refs.input.blur()
    },
    beCalledNfc (data) {
      this.add_number = ''
      this.add_number = data
      this.$emit('func', this.add_number)
    },
    beCalledScan (data) {
      this.add_number = ''
      this.add_number = data
      this.$emit('func', this.add_number)
    }
  },
  props: ['placeholdertext'],
  mounted () {
    this.add_number = ''
    window.beCalledScan = this.beCalledScan
    window.beCalledNfc = this.beCalledNfc
    window.beCalledPDscanner = this.beCalledPDscanner
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
.footer
  margin-left 10px
  margin-right 10px
  background #9acafb
 .footer_el
  display flex
  align-items center
  height 50px
  margin-top 5px
  .footer_img
   text-align center
   width 20%
  .footer_input
   display flex
   align-items center
   text-align center
   width 70%
   height 30px
   .footer_input_bg
    width 100%
    height 30px
    background none
	  outline none
	  border none
</style>
