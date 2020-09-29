<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <cube-scroll class="scroll-wrapper" v-if="show">
      <div class="materialwithdrawal">
       <ul>
        <li class="materialwithdrawal_item1">
          <span class="materialwithdrawal_sp1">退料单号:{{backstockCode}}</span>
          <span class="materialwithdrawal_sp1">订单号:{{orderNo}}</span>
        </li>
        <li class="materialwithdrawal_item1">
          <span class="materialwithdrawal_sp1">项目号:{{projectCode}}</span>
          <span class="materialwithdrawal_sp1">提交日期:{{applyTime}}</span>
        </li>
       </ul>
      </div>
      <div class="materialwithdrawal_for" v-for="(item,index) in material_list" v-bind:key="item.id">
        <ul>
          <li class="materialwithdrawal_item">
           <span class="materialwithdrawal_sp">
           <span class="sp_text_bold">零件号:</span>
           <span class="sp_bold">{{item.materialCode}}</span>
           </span>
           <span class="materialwithdrawal_sp">退料数量({{item.unitCode}}):
           <input class="sp_input" 
           style="width:50px; height: 18px;" 
           v-on:input="change(index, item.confirmQuantity)"
           :disabled="item.isDisabled"
           v-model="item.confirmQuantity"/>
           <span><img class="img_edit" src="static/edit@2x.png" @click="get_edit(index)"></span>
           </span>
          </li>
          <li class="materialwithdrawal_item">
           <span class="materialwithdrawal_sp2">零件描述:{{item.materialName}}</span>
          </li>
          <li class="materialwithdrawal_item">
           <span class="materialwithdrawal_sp">序列号:{{item.snCode}}</span>
           <span class="materialwithdrawal_sp">批次号:{{item.snBatch}}</span>
          </li>
          <li class="materialwithdrawal_item">
           <span class="materialwithdrawal_sp">条件代码:{{item.conditionalCode}}</span>
           <span class="materialwithdrawal_sp">库位:
           <span ><input class="sp_input" :disabled="true" style="width:70px; height: 18px;" type="text" v-model="item.confirmIlGroup"/></span>
           <span ><img class="img_edit" src="static/edit@2x.png" @click="item_confirmInventoryLocation(index)"></span>
           </span>
          </li>
        </ul>
      </div>
     </cube-scroll>
      <VFooter @func="getadd_number"  :placeholdertext="imput_text"></VFooter>
      <div class="materialwithdrawal_btn">
        <cube-button class="btn_style" :primary="true" @click="submission">退料</cube-button>
     </div>
      <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
  </div>
</template>
<script>
import VFooter from 'base/footer/Footer'
import VPopup from 'base/popup/Popup'
import VHeader from 'base/warehouseheader/Header'
import { getbackinstockbybackcode, getsubmitbackinstock } from 'common/js/httpConnection'
export default {
  data () {
    return {
      msg: '生产退料单',
      add_number: '', // footer底部输入框数据
      show: false,
      imput_text: '输入退料单号、扫描退料单二维码',
      popupVisible: false, // 是否弹框
      backstockCode: '', // 退料单号
      orderNo: '', // 订单号
      projectCode: '',
      applyTime: '',
      backInStockId: '', // 提交数据id
      material_list: '', // 展示列表集合
      location_list: [], // 弹框库位数据集合
      confirmInventoryLocation_index: '' // 记录库位index
    }
  },
  components: {
    VFooter,
    VPopup,
    VHeader
  },
  methods: {
    // 控制输入框可编辑
    get_edit (index) {
      console.log(this.material_list[index].isDisabled)
      if (this.material_list[index].isDisabled) {
        this.material_list[index].isDisabled = false
      } else {
        this.material_list[index].isDisabled = true
      }
    },
    change(index, confirmQuantity) {
      let withdrawalQuantity = this.material_list[index].withdrawalQuantity
      this.inputVal(index, confirmQuantity, withdrawalQuantity)
    },
    inputVal(index, confirmQuantity, withdrawalQuantity) {
        // 实现input连续输入，只判断一次
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        if ((confirmQuantity + '').match(/[^\d.]/g, '')) {
          this.material_list[index].confirmQuantity = withdrawalQuantity
        }
        if (confirmQuantity > withdrawalQuantity) {
          this.showToast(this, '数量不能超过预留数量')
          this.material_list[index].confirmQuantity = withdrawalQuantity
        }
      }, 300);
    },
    getadd_number (data) {
      console.log(data)
      this.add_number = data
      this.showIndicator(this)
      var datas = {'backstockCode': this.add_number}
      getbackinstockbybackcode(datas).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.show = true
        var result = response.result
        console.log(result)
        this.backInStockId = result.backInStockId
        this.backstockCode = result.backstockCode
        this.orderNo = result.orderNo
        this.projectCode = result.projectCode
        this.applyTime = result.applyTime
        this.material_list = result.backInStockDetailList
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 提交数据
    submission () {
      var array = []
      var obj = {}
      obj.backInStockId = this.backInStockId
      obj.backInStockDetailList = this.material_list
      array.push(obj)
      console.log(array)
      this.showIndicator(this)
      getsubmitbackinstock(array).then((response) => {
        this.closeIndicator()
        console.log(response)
        if (response.status === 0) {
          this.showToast(this, response.errorMsg)
          return
        }
        this.show = false
        this.showToast(this, response.errorMsg)
        this.backInStockId = ''
        this.backstockCode = ''
        this.orderNo = ''
        this.projectCode = ''
        this.applyTime = ''
        this.material_list = []
      }).catch((error) => {
        this.closeIndicator()
        console.log(error)
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 打开popup
    item_confirmInventoryLocation (index) {
      this.$refs.showpopup.childClick()
      this.confirmInventoryLocation_index = index
    },
    // 设置选中库位
    getloction (data) {
      this.material_list.forEach((item, index) => {
        if (this.confirmInventoryLocation_index === index) {
          this.$set(item, 'confirmIlGroup', data)
        }
      })
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.scroll-wrapper
  height: 490px
.materialwithdrawal 
 margin-left 10px
 margin-right 10px
 margin-top 5px
 height 40px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 background #9acafb
 .materialwithdrawal_item1
  margin-left 15px
  margin-right 15px
  display flex
  align-items center
  font-size 13px
  .materialwithdrawal_sp1
   display flex
   align-items center
   margin-top 5px
   width 50%
.materialwithdrawal_for
 margin-left 10px
 margin-right 10px
 margin-top 5px
 border: 1px solid rgba(0, 0, 0, 0.1)
 border-radius: 5px
 height auto
 padding-bottom 3px
.materialwithdrawal_item
  display flex
  align-items center
  margin-left 10px
  margin-right 10px
  margin-top 5px
  font-size 13px
  overflow hidden
  .materialwithdrawal_sp
   display flex
   align-items center
   width 50%
   .materialwithdrawal_sp_input
    background none
	  outline none
	  border none
  .materialwithdrawal_sp2
   padding-top 2px
   overflow hidden
   text-overflow ellipsis
   white-space nowrap
   
.materialwithdrawal_btn
  position absolute
  top 590px
  left 10px
  right 10px
  .btn_style
   height 10px
   line-height 1px
.img_edit
 width 15px
 height 15px
 margin-left 5px
</style>
