<template>
 <div>
     <VHeader :title="'移动库存'"></VHeader>
     <div class="mobile_t">
        <div class="mobile">
         <span class="mobile_sp" @click="cube_input_click()" >项&nbsp;&nbsp;目&nbsp;&nbsp;号:
           <input class="cube_input" readonly="readonly"  v-model="projectcode"/>
         </span>
         <span class="mobile_sp">零&nbsp;&nbsp;件&nbsp;&nbsp;号:
            <input class="cube_input" v-model="materialcode"/>
         </span>
        </div>
        <div class="mobile">零件描述:
           <span class="input_sp"><input class="cube_inputs" v-model="materialname"/></span>
           <span class="btn_sp"> <cube-button class="btn_styles" :inline="true" :primary="true" @click="Undercarriage">查询</cube-button> </span>     
        </div>           
      </div>
      <cube-scroll class="scroll_wrapper" :data="mobile_list" ref="scroll">
      <div class="div_item" v-for="(item,index) in mobile_list" v-bind:key="item.id" @click="checked(index)">
        <ul>
        <li class="mobile_item">
         <span class="mobile_sp">库位号:{{item.locationCode}}</span>
         <span class="mobile_sp">失效日期:{{item.expirationTime}}</span>
        </li>
        <li class="mobile_item">
         <span class="mobile_sp">可用数量({{item.unitCode}}):{{item.availableQty}}</span>
         <span class="mobile_sp">现有数量({{item.unitCode}}):{{item.onhandQty}}</span>
        </li>
        <li class="mobile_item">
         <span class="mobile_sp">批号:{{item.snBatch}}</span>
         <span class="mobile_sp">序列号:{{item.snCode}}</span>
        </li>
         <li class="mobile_item">
         <span class="mobile_sp">项目号:{{item.projectCode}}</span>
         <span class="mobile_sp">条件代码:{{item.conditionCode}}</span>
        </li>
        <li class="mobile_item">
         <span class="mobile_sp">移动库位:
          <span  @click.stop=""><cube-input class="cb_item_input" style="width:80px; height: 18px;" v-model="item.tolocationCode"></cube-input></span>
            <span><img class="img_edit" src="static/edit@2x.png"  @click.stop="item_click(index)"></span>
         </span>
         <span class="mobile_sp">调整数量:
            <span  @click.stop=""><input class="sp_input" style="width:60px; height: 18px;" v-on:input="change(index, item.moveLibraryQty, item.allowMoveLibraryQty)"
            v-model="item.moveLibraryQty" :disabled="item.isDisabled"/></span>
            <span><img class="img_edit" src="static/edit@2x.png" @click.stop="get_edit(index)"></span>
         </span>
        </li>
        </ul>
         <div class="div_image" >
            <img v-show="item.selected" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
          </div>
      </div>
      </cube-scroll>
      <div class="print_el">
        <cube-button class="btn_style" :primary="true" @click="submit">提交</cube-button>
      </div>
      <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
      <cube-popup class="popup1" :mask="false" type="my-popup" v-model="popupVisible">
      <div class="pupop_cl" @click="mask_click()">
        <div class="popup_warp" @click="warp_click()">
          <h1 class="text">搜索项目号</h1>
          <div class="popup_search">
            <div class="popup_input">
              <cube-input
                class="cube_input"
                v-model="sncode"
                :style="input_Image"
                placeholder="请输入内容"
                :clearable="clearable"
                ref="input"
                @keyup.enter.native="searchFile()"
                @keydown.enter.native="searchBlur(sncode)"
              ></cube-input>
            </div>
          </div>
          <cube-scroll class="popup_scroll_wrapper">
            <div v-for="(item,index) in options" v-bind:key="item.id" @click="setshopname(index)">
              <p class="popup_item">{{item.key}}</p>
            </div>
          </cube-scroll>
        </div>
      </div>
    </cube-popup>
 </div>
</template>
<script>
import VHeader from 'base/warehouseheader/Header'
import VPopup from 'base/popup/Popup'
import { getsearchmovematerielstock, getmovematerielstockconfirm, getqueryprojectinfo } from 'common/js/httpConnection'
export default {
  data () {
    return {
      projectcode: '',
      materialname: '',
      materialcode: '',
      popupVisible: false, // popup 隐藏
      flage: false,
      item_flage: false,
      clearable: true,
      sncode: '',
      options: [],
      defaultLocationCode_index: '', // 库位标识
      mobile_list: [],
      input_Image: {
        backgroundImage: 'url(' + require('@/components/warehouse/pOstorage/inputbg.png') + ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  components: {
    VPopup,
    VHeader
  },
  methods: {
    cube_input_click () {
      this.popupVisible = true
      this.options = []
      this.projectcode = ''
      this.getsearch('')
    },
     // 键盘搜索
    searchBlur(query) {
      if (query === '') {
        this.showToast(this, '请输入内容')
        return
      }
      this.getsearch(query)
    },
    getsearch(query) {
      this.showIndicator(this)
      var datas = { projectcode: query }
      getqueryprojectinfo(datas)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          this.popupVisible = true
          this.options = response.result
          if (this.options.length === 0) {
            this.showToast(this, '没有查询到数据')
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // 关闭软键盘
    searchFile () {
      this.$refs.input.blur()
    },
    mask_click () {
      if (!this.flage) {
        this.popupVisible = false
      }
      this.flage = false
    },
    warp_click () {
      if (!this.item_flage) {
        this.flage = true
        this.popupVisible = true
      }
      this.item_flage = false
    },
    setshopname(index) {
      console.log(index)
      this.popupVisible = false
      this.item_flage = true
      this.flage = true
      this.projectcode = this.options[index].key
    },
    // 组合数据
    getcollect () {
      var newmobile = []
      newmobile = this.mobile_list
      let selectedlist = this.mobile_list.filter(function (item) {
        return item.selected
      })
      if (selectedlist.length > 0) {
        newmobile = selectedlist
      }
      return newmobile
    },
     // 提交
    submit () {
      let newlist = this.getcollect()
      if (newlist.length <= 0) {
        this.showToast(this, '请选择数据')
        return
      }
      getmovematerielstockconfirm(newlist).then((response) => {
        this.closeIndicator()
        this.showToast(this, response.errorMsg)
        if (response.status === 0) {
          return
        }
        this.Undercarriage()
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
     // 查询
    Undercarriage () {
      if (this.materialcode === '') {
        this.showToast(this, '零件号不能为空')
        return
      }
      this.showIndicator(this)
      var datas = {'materialcode': this.materialcode, 'projectcode': this.projectcode, 'materialname': this.materialname}
      getsearchmovematerielstock(datas).then((response) => {
        this.closeIndicator()
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        if (response.result.length === 0) {
          this.showToast(this, '未查询到数据')
        }
        this.materialname = response.result.materialName
        response.result.list.forEach(item => {
          item.selected = false
          item.isDisabled = true
        })
        this.mobile_list = response.result.list
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 显示库位
    item_click (index) {
      this.$refs.showpopup.childClick()
      this.defaultLocationCode_index = index
    },
    // 判断选中
    checked (index) {
      if (this.mobile_list[index].selected) {
        this.mobile_list[index].selected = false
      } else {
        this.mobile_list[index].selected = true
      }
    },
     // 判断可输入
    get_edit (index) {
      if (this.mobile_list[index].isDisabled) {
        this.mobile_list[index].isDisabled = false
      } else {
        this.mobile_list[index].isDisabled = true
      }
    },
     // 输入框监听
    change (index, qtyReceived, requiredQty) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if ((qtyReceived + '').match(/[^\d.]/g, '')) {
          this.mobile_list[index].moveLibraryQty = requiredQty
        }
        if (qtyReceived > requiredQty) {
          this.showToast(this, '数量不能超过可用数量')
          this.mobile_list[index].moveLibraryQty = requiredQty
        }
      }, 300)
    },
     // 获取弹框数据
    getloction (data) {
      this.mobile_list[this.defaultLocationCode_index].tolocationCode = data
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/style/warehouse.styl'
.mobile_t
 height auto
 padding-bottom 5px
 margin-left 5px
 margin-right 5px
 margin-top 5px
 background #9acafb
 border 1px solid rgba(0,0,0,0.1)
 border-radius 5px
 font-size 14px
 .mobile
  display flex
  justify-content start
  align-items center
  margin-top 5px
  margin-left 10px
  margin-right 10px
  background #9acafb
  .mobile_sp
   flex 1
   display flex
   justify-content start
   align-items center
   .cube_input
    margin-left 3px
    width 100%
    height 25px
    background #fff
    border 1px solid #e6e6e6
    border-radius 4px
  .input_sp
   width 65%
   .cube_inputs
    margin-left 3px
    width 100%
    height 25px
    background #fff
    border 1px solid #e6e6e6
    border-radius 4px
  .btn_sp
   margin-left 3px
   display flex
   justify-content: flex-end
   width 16%
   .btn_styles
    background #3A85E6
    height 25px
    line-height 1px
.scroll_wrapper
  height 470px
  margin-left 5px
  margin-right 5px
 .div_item
  position relative
  height auto
  border 1px solid rgba(0, 0, 0, 0.1)
  border-radius 5px
  margin-top 5px
  padding-bottom 5px
  .mobile_item
   margin-left 5px
   margin-right 5px
   font-size 13px
   margin-top 5px
   display flex
   justify-content start
   align-items center
  .mobile_sp
   flex 1
   display flex
   align-items center

.div_image
  position absolute
  top 5px
  right 5px
  .image_items
    width 20px
    height 20px

.img_edit
 width 15px
 height 15px
 margin-left 5px

.cb_item_input
  box-sizing border-box
  border 1px solid #eeeeee
  background none
	outline none
	border none

.print_el
  margin-top: 5px
  margin-left 5px
  margin-right 5px
  display: flex
  justify-content: space-between
  .btn_style
    height 10px
    line-height 1px

.popup1 
  .pupop_cl 
    width: 335px
    height: 630px
    .popup_warp 
      position: absolute
      margin-left: 10%
      margin-right: 10%
      top: 150px
      width: 80%
      height: 280px
      background: #ecf8ff
      border: 1px solid rgba(0, 0, 0, 0.1)
      border-radius: 5px
      .text 
        margin-top: 10px
        text-align: center
        font-size: 16px
        color: #26a2ff
      .popup_search 
        margin-top: 10px
        display: flex
        justify-content: space-between
        align-items: center
        width: 100%
        .popup_input 
          display: flex
          justify-content: center
          width: 100%
          .cube_input 
            height: 25px
            width: 60%
            background: none
          
.popup_item 
  margin-left: 10px
  margin-right: 10px
  text-align: center
  margin-top: 7px
  font-size: 13px

.popup_scroll_wrapper 
  height: 215px
</style>