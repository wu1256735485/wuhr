<template >
  <div>
  <div class="bg_div" @click.stop="popupshow()" v-if="show">
   <div class="datalist" @click.stop="">
      <cube-scroll class="popup_scroll_wrapper" >
        <div class="list_div" v-for="(item,index) in list" v-bind:key="item.id">
         <ul v-if="type == 1">
            <li class="item_li" @click="item_file(item,index)">
              <span class="sp_img">
                <img v-if="item.type==0" class="item_img" src="static/other.png" alt />
                <img v-else class="item_img" src="static/pdf.png" alt/>
              </span>
             <span class="sp_text">{{item.name}}</span>
            </li>     
         </ul>
        </div>
      </cube-scroll>
   </div>
  </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      show: false,
      type: 0,
      list: []
    }
  },
  methods: {
    // 组合数据
    Compositedata (data) {
      if (data.length === 1) {
        this.show = false
        $App.callDownlode(data[0].value)
        return
      }
      this.list = []
      let index = ''
      let filetype = ''
      data.forEach(item => {
        index = item.key.lastIndexOf('.')
        let obj = {}
        obj.name = item.key.substring(0,index)
        filetype = item.key.substring(index+1)
        obj.filetype = filetype
        obj.type = filetype === 'PDF' || filetype === 'pdf' ? 1 : 0
        obj.url = item.value
        this.list.push(obj)
      })
    },
    // item点击显示图片
    item_file (item, index) {
      if (item.filetype === 'tif' || item.filetype === 'TIF') {
        this.$parent.getreqestfile(item.url)
        return
      }
      // pdf 下载
      $App.callDownlode(item.url)
    },
    // 显示popup
    popushow (data) {
      this.type = data
      this.show = true
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
.datalist
 position absolute
 right 10%
 left 10%
 top 35%
 bottom 40%
 box-shadow: 10px 10px 3px #888888
.popup_scroll_wrapper
 background #ecf8ff
 border 1px solid rgba(0, 0, 0, 0.1)
 border-radius 5px
 width 100%
 height 100%
.list_div
 margin-left 10px
 margin-right 10px
.item_li
 margin-top 10px
 display flex
 justify-items center
 align-items center
.sp_text
 margin-left 6px
 width 85%
 font-size: 16px
.sp_img
 display flex
 width 10%
 align-items center
 .item_img
  width 22px
  height 22px
</style>
