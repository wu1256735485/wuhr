<template>
  <div class="po_s">
    <VHeader :title="msg"></VHeader>
    <ul class="po_s_header">
      <li class="po_search">
        <span class="po_text">到货区：</span>
        <span class="po_input">
          <cube-select
            :style="{height:'25px',lineHeight:'10px'}"
            v-model="locationCode"
            :options="ArrivalList"
            placeholder = "请选择"
            >
          </cube-select>
        </span>
        
      </li>
      <li class="po_search">
        <span class="po_text">供应商:</span>
        <span class="po_input" @click="cube_input_click()">
          <cube-input
            class="cube_put"
            :style="input_Image"
            readonly="readonly"
            type="text"
            placeholder="请输入关键词"
            v-model="value"
          ></cube-input>
        </span>
      </li>
      <li class="po_item1">
        <span class="po_sp">待入库种类:{{overInspectionCategoryCount}}</span>
        <span class="po_sp">过检种类:{{receiptCategoryCount}}</span>
      </li>
    </ul>
    <cube-scroll class="scroll-wrapper" :data="POstorage_list">
      <div style="margin-top:5px;" v-for="(item1,index) in POstorage_list" v-bind:key="item1.id">
        <ul class="po_ul_title">
          <li class="po_item">
            <span class="po_sp">订单号:{{item1.purchaseCode}}</span>
            <span class="po_sp">下达号:{{item1.releaseNo}}</span>
          </li>
          <li class="po_item">
            <span class="po_sp">行号:{{item1.lineNumber}}</span>
            <span class="po_sp">到货日期:{{item1.arrivalTimeString}}</span>
          </li>
        </ul>
        <div class="po_wrappers">
          <div v-for="(item,index1) in item1.poArrivalDetailEntityList" v-bind:key="item.id" @click="item_click_div(index,index1)">
            <!-- <div class="div_item" v-if="!item1.item_show" @click="item_click_div(index,index1)"> -->
            <div class="div_item">
              <ul class="ul_item">
                <li class="po_item">
                  <span class="po_sp">
                    <span class="sp_text_bold">零件号:</span>
                    <span class="sp_bold">{{item.materialCode}}</span>
                  </span>
                  <span class="po_sp">
                    <span @click.stop="showmaterial('零件描述', item.materialName)" class="po_over_text">零件描述:{{item.materialName}}</span>
                  </span>
                </li>
                <li class="po_item">
                  <span class="po_sp">
                  <span @click.stop="showmaterial('序列号', item.snCode)" class="po_over_text">序列号:{{item.snCode}}</span></span>
                  <span class="po_sp">批次号:{{item.snBatch}}</span>
                </li>
                <li class="po_item">
                  <span class="po_sp">生产日期:{{item.productTime}}</span>
                  <span class="po_sp">过期日期:{{item.expirationTime}}</span>
                </li>
                <li class="po_item">
                  <span class="po_sp">条件代码:{{item.conditionCode}}</span>
                  <span class="po_sp" @click.stop>
                    库位:
                    <span>
                      <cube-input
                        class="po_item_input"
                        style="width:80px; height: 18px;"
                        v-model="item.defaultLocationCode"
                      ></cube-input>
                    </span>
                    <span>
                      <img
                        class="img_edit"
                        src="static/edit@2x.png"
                        @click="item_click(index,index1)"
                      />
                    </span>
                  </span>
                </li>
                <li class="po_item" @click.stop>
                  数量({{item.unitCode}}):
                  <input
                    class="sp_input"
                    style="width:60px; height: 18px;"
                    v-on:input="change(index, index1, item.inQuantity)"
                    v-model="item.inQuantity"
                    :disabled="item.isDisabled"
                  />
                  <span>
                    <img class="img_edit" src="static/edit@2x.png" @click="get_edit(index,index1)" />
                  </span>
                </li>
              </ul>
              <div class="div_image">
                <img
                  v-if="item.itemChecked"
                  class="image_items"
                  src="@/components/warehouse/pOstorage/yes.png"
                />
              </div>
            </div>
          </div>
          <!-- <div class="po_item2" @click="item_shows(index)">
            <img
              v-if="item1.item_show"
              class="image_items"
              src="@/components/warehouse/pOstorage/shou.png"
            />
            <img v-else class="image_items" src="@/components/warehouse/pOstorage/kai.png" />
          </div> -->
        </div>
      </div>
    </cube-scroll>
    <div class="po_button" v-if="show">
      <cube-button class="btn_style" :primary="true" @click="submission">入库</cube-button>
    </div>
    <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
    <cube-popup class="popup1" :mask="false" type="my-popup" v-model="popupVisible">
      <div class="pupop_cl" @click="mask_click()">
        <div class="popup_warp" @click="warp_click()">
          <h1 class="text">搜索供应商</h1>
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
              <p class="popup_item">{{item.value}}</p>
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
import {
  getquerypoinstock,
  getsubmitpoinstock,
  getbasicInfo,
  getArrivalList
} from 'common/js/httpConnection'
export default {
  data() {
    return {
      show: true,
      msg: 'PO入库',
      supplier: '',
      popupVisible: false,
      clearable: true,
      receiptCategoryCount: '',
      overInspectionCategoryCount: '',
      putinto_number: '',
      overcheck_number: '',
      flage: false,
      item_flage: false,
      sncode: '',
      options: [],
      value: '',
      locationCode:'',
      ArrivalList:[],//到货区集合
      suppliercode: '',
      POstorage_list: [], // 展示数据数组
      defaultLocationName_list_index: '', // 记录索引
      defaultLocationCode_index: '',
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
  mounted() {
    this.getArrival()
  },
  methods: {
    // 显示描述数据
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    // 控制输入框可编辑
    get_edit(index, index1) {
      if (
        this.POstorage_list[index].poArrivalDetailEntityList[index1].isDisabled
      ) {
        this.POstorage_list[index].poArrivalDetailEntityList[index1].isDisabled = false
      } else {
        this.POstorage_list[index].poArrivalDetailEntityList[index1].isDisabled = true
      }
    },
    change(index, index1, inQuantity) {
      let newlist = []
      newlist = this.POstorage_list[index].poArrivalDetailEntityList
      let qtyToReceive = newlist[index1].qtyToReceive
      this.inputVal(index, index1, inQuantity, qtyToReceive)
    },
    inputVal(index, index1, inQuantity, qtyToReceive) {
      // 实现input连续输入，只判断一次
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if ((inQuantity + '').match(/[^\d.]/g, '')) {
          this.POstorage_list[index].poArrivalDetailEntityList[index1].inQuantity = qtyToReceive
        }
        if (inQuantity > qtyToReceive) {
          this.showToast(this, '数量不能超过预留数量')
          this.POstorage_list[index].poArrivalDetailEntityList[index1].inQuantity = qtyToReceive
        }
      }, 300)
    },
    item_click_div(index, index1) {
      if (
        this.POstorage_list[index].poArrivalDetailEntityList[index1].itemChecked
      ) {
        this.POstorage_list[index].poArrivalDetailEntityList[index1].itemChecked = false
      } else {
        this.POstorage_list[index].poArrivalDetailEntityList[index1].itemChecked = true
      }
    },
    // 弹出供应商搜索
    cube_input_click() {
      this.popupVisible = true
      this.options = []
      this.sncode = ''
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
      var datas = { searchkey: query , locationcode: this.locationCode }
      getbasicInfo(datas)
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
    //获取到货区
    getArrival() {
      getArrivalList().then(response => {
        // console.info(response.result,"查看数据")
        this.ArrivalList = []
        response.result.map((val) => {
          this.ArrivalList.push(val.value)
        })
      })
    },
    // 关闭软键盘
    searchFile() {
      this.$refs.input.blur()
    },
    // 切换选中背景
    item_shows(index) {
      if (this.POstorage_list[index].item_show) {
        this.POstorage_list[index].item_show = false
      } else {
        this.POstorage_list[index].item_show = true
      }
    },
    // 控制popup 显示隐藏
    mask_click() {
      if (!this.flage) {
        this.popupVisible = false
      }
      this.flage = false
    },
    warp_click() {
      if (!this.item_flage) {
        this.flage = true
        this.popupVisible = true
      }
      this.item_flage = false
    },
    // 获取弹框数据
    getloction(data) {
      let nwelisrt = this.POstorage_list[this.defaultLocationName_list_index]
      nwelisrt.poArrivalDetailEntityList.forEach((item, index) => {
        if (this.defaultLocationCode_index === index) {
          this.$set(item, 'defaultLocationCode', data)
        }
      })
    },
    // item 点击事件
    item_click(index, index1) {
      this.$refs.showpopup.childClick()
      this.defaultLocationName_list_index = index
      this.defaultLocationCode_index = index1
    },
    setshopname(index) {
      console.log(index)
      this.popupVisible = false
      this.item_flage = true
      this.flage = true
      this.value = this.options[index].value
      for (var i = 0; i < this.options.length; i++) {
        if (this.value + '' === this.options[i].value + '') {
          this.suppliercode = this.options[i].key
        }
      }
      this.getquery()
    },
    getquery() {
      this.showIndicator(this)
      var datas = { suppliercode: this.suppliercode ,locationcode:this.locationCode }
      getquerypoinstock(datas)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          this.receiptCategoryCount = response.result.receiptCategoryCount
          this.overInspectionCategoryCount =
            response.result.overInspectionCategoryCount
          this.POstorage_list = []
          this.POstorage_list = response.result.poArrivalList
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    getcollect() {
      var newArray = []
      for (var i = 0; i < this.POstorage_list.length; i++) {
        let list = this.POstorage_list[i].poArrivalDetailEntityList
        for (var j = 0; j < list.length; j++) {
          newArray.push(list[j])
        }
      }
      var selectRows = newArray.filter(function(item) {
        return item.itemChecked
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 数据提交
    submission() {
      if (this.POstorage_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      var newArrays = this.getcollect()
      for (var j = 0; j < newArrays.length; j++) {
        if (newArrays[j].defaultLocationCode === '') {
          this.showToast(this, '库位不能为空')
          return
        }
        if (newArrays[j].inQuantity === '' || newArrays[j].inQuantity <= 0) {
          this.showToast(this, '数量必须大于0')
          return
        }
      }
      if (this.POstorage_list.length === newArrays.length) {
        this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '是否全部入库？',
        confirmBtn: {
          text: '是',
          active: true,
          disabled: false,
        },
        cancelBtn: {
          text: '否',
          active: false,
          disabled: false,
        },
        onConfirm: () => {
          this._getrequst(newArrays)
        }
      }).show()
      } else {
        this._getrequst(newArrays)
      }
    
    },
    _getrequst(newArrays) {
      this.showIndicator(this)
      getsubmitpoinstock(newArrays)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          this.showToast(this, response.errorMsg)
          if (response.status === 1) {
            this.POstorage_list = []
            this.overInspectionCategoryCount = ''
            this.receiptCategoryCount = ''
            this.getquery()
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/style/warehouse.styl'

.po_s_header 
  height: 85px
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  padding-left: 10px
  padding-right: 10px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  background: #9acafb
  .po_search 
    padding-top: 5px
    display: flex
    justify-content: center
    align-items: center
    .po_text 
      font-size: 14px
      width: 20%
    .po_input 
      width: 80%
      text-align: left 

.po_item1 
  display: flex
  justify-content: start
  align-items: center
  font-size: 13px

.scroll-wrapper 
  margin-left: 10px
  margin-right: 10px
  height: 485px

.po_wrappers 
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 0 0 10px 10px

.po_ul_title 
  position: relative
  padding-top: 1px
  width: 100%
  height: auto
  padding-bottom: 3px
  background: #ecf8ff

.ul_item 
  padding-bottom: 3px
  
  // border-bottom: 1px solid rgba(0, 0, 0, 0.1)

.div_item 
  width: 100%
  height: 100%
  position: relative

.div_image 
  position: absolute
  top: 5px
  right: 5px

.po_item 
  display: flex
  justify-content: start
  align-items: center
  padding-left: 10px
  padding-right: 10px
  font-size: 13px

.po_sp 
  display: flex
  justify-content: start
  align-items: center
  margin-top: 3px
  width: 50%
  padding-top: 2px
  overflow: hidden

  .po_over_text 
    padding-top: 2px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap

.img_edit 
  width: 15px
  height: 15px
  margin-left: 5px

.po_button 
  position: absolute
  top: 595px
  left: 10px
  right: 10px
  z-index:3

  .btn_style 
    height: 10px
    line-height: 1px

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
  text-align: start
  margin-top: 7px
  font-size: 13px

.popup_scroll_wrapper 
  height: 215px

.cube_put 
  width: 100%
  height: 25px
  background: none
  line-height : 25px

outline none 
  border: none

.po_item_input 
  box-sizing: border-box
  border: 1px solid #eeeeee
  background: none

outline none 
  border: none

.po_item2 
  display: flex
  align-items: center
  width: 100%
  height: 26px
  margin-left: 10px
  margin-right: 10px

.image_items 
  width: 20px
  height: 20px
</style>
