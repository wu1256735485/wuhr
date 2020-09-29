<template >
  <div>
  <div class="bg_div" @click.stop="popupshow()" v-if="show">
   <div class="datalist" @click.stop="">
      <div class="div_title">{{titles}}</div>
      <div class="p_div" v-html="msg">
      </div>
      <div class="xian"></div>
      <div class="btn" @click.stop="popupshow">确定</div>
   </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      titles: '',
      msg: ''
    }
  },
  methods: {
    // 显示popup
    popushow (titles, msg) {
      this.show = true
      this.titles= titles
      this.msg = msg
    },
    // 隐藏popup
    popupshow () {
      this.show = false
    }
  }
}
</script>
<style lang="stylus" scoped>
.bg_div
 position absolute
 right 0
 top 0
 left 0
 bottom 0
 background-color: rgba(14, 4, 4, 0.4);
 z-index 30
.datalist
 position absolute
 right 5%
 left 5%
 top 25%
 bottom 20%
 background-color #fcfcfc
 border 1px solid rgba(0, 0, 0, 0.1)
 border-radius 2px
.div_title
 width 100%
 margin-top 25px
 height 30px
 font-size 17px
 font-weight 400
 text-align center
.p_div
 display flex
 margin-right 15px
 margin-left 15px
 margin-bottom 10px
 height 235px
 overflow-y scroll
 line-height 22px
 color #1b1a1a
 font-size 16px
.xian
 width 100%
 height 1px
 border-top solid #efeded 1px
.btn
 width 100%
 margin-top 15px
 height 30px
 font-size 17px
 color #FC9153
 text-align center
</style>
