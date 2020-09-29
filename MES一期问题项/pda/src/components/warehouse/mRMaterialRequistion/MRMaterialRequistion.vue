<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <ul class="mr_s_header">
      <li class="mr_search">
        <span class="mr_text">仓库:</span>
        <span class="mr_input">
          <cube-input
            class="cube_put"
            :style="input_Image"
            type="text"
            placeholder="请输入关键词"
            v-model="warehousecode"
          ></cube-input>
        </span>
         <span class="print_div_sp">
            <cube-button class="btn_styles" :inline="true" :primary="true" @click="Undercarriage">查询</cube-button>
          </span>
      </li>
      <li class="mr_search">
        <span class="mr_text">工区:</span>
        <span class="mr_input">
          <cube-input
            class="cube_put"
            :style="input_Image"
            type="text"
            placeholder="请输入关键词"
            v-model="workcenterno"
          ></cube-input>
        </span>
      </li>
    </ul>
    <cube-scroll class="scroll-wrapper" >
      <div class="mr" v-for="(item,index) in mr_list" v-bind:key="item.id"   @click="click_item(index)">
        <ul>
        <li class="mr_item">
          <span class="mr_sp">MR号:{{item.receiptCode}}</span>
          <span class="mr_sp">项目号:{{item.projectCode}}</span>
        </li>
        <li class="mr_item">
          <span class="mr_sp">
          <span class="sp_text_bold">库位:</span>
          <span class="sp_bold">{{item.warehouseCode}}</span>
          </span>
          <span class="mr_sp">工区:{{item.workCenterNo}}</span>
        </li>
        <li class="mr_item">
          <span class="mr_sp">种类:{{item.categoryCount}}</span>
          <span class="mr_sp">创建日期:{{item.createTime}}</span>
        </li>
        <li class="mr_item">
          <span class="mr_sp">库存分析人:{{item.createByCode}}</span>
        </li>
        </ul>
        <div class="div_image" >
          <img v-if="item.itemChecked" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
        </div>
     </div>
    </cube-scroll>
    <div class="cube_btn">
    <cube-button class="btn_style" :primary="true" @click="yes">确定</cube-button>
    </div>
  </div>
</template>
<script>
import VHeader from 'base/warehouseheader/Header'
import { getquerymraggregatelist } from 'common/js/httpConnection'
export default {
  data () {
    return {
      msg: 'MR领料单',
      newArray: [],
      workcenterno:'',
      warehousecode:'',
      mr_list: [],
      paramsArray: [],
      input_Image: {
        backgroundImage: 'url(' + require('@/components/warehouse/pOstorage/inputbg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  components: {
    VHeader
  },
  methods: {
    Undercarriage (){
     this._getquerymraggregatelist()
    },
    click_item (index) {
      if (this.mr_list[index].itemChecked === false) {
        this.mr_list[index].itemChecked = true
      } else {
        this.mr_list[index].itemChecked = false
      }
    },
    yes () {
      for (var i = 0; i < this.mr_list.length; i++) {
        if (this.mr_list[i].itemChecked === true) {
          this.paramsArray.push(this.mr_list[i])
        }
      }
      if (this.paramsArray.length === 0) {
        this.showToast(this, '请选择数据')
        return
      }
      this.$router.push({
        name: 'MRMaterialDetailed',
        params: {
          paramsArray: this.paramsArray
        }
      })
    },
    _getquerymraggregatelist (){
      this.showIndicator(this)
      let data ={
        workcenterno : this.workcenterno,
        warehousecode : this.warehousecode
      }
      getquerymraggregatelist(data).then((response) => {
      this.closeIndicator()
      console.log(response)
      if (response.status === 0) {
        this.showToast(this, response.errorMsg)
        return
      }
      var result = response.result
      this.mr_list = result
    }).catch((error) => {
      this.closeIndicator()
      console.log(error)
      if (error=== 307 || error=== 900 || error=== 403) return
      this.showToast(this, '请求数据失败')
    })
  }
  },
  mounted () {
    this._getquerymraggregatelist()
  }
}
</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
@import '~common/style/warehouse.styl'

.mr_s_header 
  height: 65px
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  padding-left: 10px
  padding-right: 10px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  background: #9acafb
  .mr_search 
    padding-top: 5px
    display: flex
    justify-content: start
    align-items: center
    .mr_text 
      font-size: 14px
      width: 13%
    .mr_input 
      width: 70%
      text-align: left 

.scroll-wrapper
  height 470px
  .mr
   position relative
   margin-top 5px
   border: 1px solid rgba(0, 0, 0, 0.1)
   border-radius: 5px
   height auto
   margin-left 10px
   margin-right 10px
   padding-bottom 3px
.mr_item
  display flex
  justify-content start
  margin-top 5px
  margin-left 10px
  margin-right 10px
  font-size 13px
  .mr_sp
   width 50%
   overflow hidden
   text-overflow ellipsis
   white-space nowrap
   padding-top 2px
.bg
  background #ecf8ff
.div_image
 position absolute
 top 5px
 right 5px
 .image_items
  width 20px
  height 20px
.cube_btn
  position absolute
  top 590px
  left 10px
  right 10px
  .btn_style
   height 10px
   line-height 1px

.cube_put 
  width: 100%
  height: 25px
  background: none
  line-height : 25px

.btn_styles
  margin-left 10px
  background: #3A85E6
  height: 25px
  line-height: 1px
</style>
