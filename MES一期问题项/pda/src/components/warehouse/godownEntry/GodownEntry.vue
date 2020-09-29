<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <div class="godownentry" v-if="showdata">
      <cube-scroll class="scroll-wrapper">
        <ul class="godownentry_title">
          <li class="godownentry_item1">
            <span class="godownentry_sp1">订单号:{{orderNo}}</span>
            <span class="godownentry_sp1">项目号:{{projectCode}}</span>
          </li>
          <li class="godownentry_item1">
            <span class="godownentry_sp1">车间订单类型:{{orderCodeName}}</span>
            <span class="godownentry_sp1">列号:{{trainNo}}</span>
          </li>
        </ul>
        <div
          class="godownentry_item_ul"
          v-for="(item,index) in godownentry_list"
          v-bind:key="item.index"
          @click="click_item(index)"
        >
          <ul>
            <li class="godownentry_item">
              <span class="godownentry_sp">
                <span class="sp_text_bold">零件号:</span>
                <span class="sp_bold">{{item.partNo}}</span>
              </span>
            </li>
            <li class="godownentry_item">
              <span class="godownentry_sp">
                <span class="go_sp" @click.stop="showmaterial('零件描述',item.partDescribe)">零件描述:{{item.partDescribe}}</span>
              </span>
            </li>
            <li class="godownentry_item">
              <span class="godownentry_sp">
                序列号:
                <div @click.stop>
                  <input
                    class="sp_input"
                    style="width:95px; height: 18px;"
                    :disabled="item.serialNo_isDisabled"
                    v-model="item.serialNo"
                  />
                </div>
                <span v-show="item.is_img_serialNo">
                  <img class="img_edit" src="static/edit@2x.png" @click.stop="get_iseditt(index)" />
                </span>
              </span>
              <span class="godownentry_sp">
                批次号:
                <div @click.stop>
                  <input
                    class="sp_input"
                    style="width:110px; height: 18px; "
                    v-model="item.lotBatchNo"
                  />
                </div>
                <span v-show="item.is_img_lotBatchNo">
                  <img class="img_edit" src="static/edit@2x.png" @click.stop="get_isshow(index)" />
                </span>
              </span>
            </li>
            <li class="godownentry_item">
              <span class="godownentry_sp">
                条件代码:
                <div @click.stop>
                  <input
                    class="sp_input"
                    style="width:80px; height: 18px; "
                    :disabled="item.conditionCode_isDisabled"
                    v-model="item.conditionCode"
                  />
                </div>
                <span v-show="item.is_img_edit">
                  <img class="img_edit" src="static/edit@2x.png" @click.stop="get_isedit(index)" />
                </span>
              </span>
              <span class="godownentry_sp">处置代码:
                <div @click.stop="item_dispositionCode_click(item.dispositionCode_isDisabled, index)">
                  <input
                    readonly="readonly"
                    class="sp_input"
                    style="width:100px; height: 18px; "
                    :disabled="item.dispositionCode_isDisabled"
                    v-model="item.dispositionCode"
                  />
                </div></span>
            </li>
            <li class="godownentry_item">
              <span class="godownentry_sp" @click.stop>
                库位:
                <span>
                  <input
                    class="sp_input"
                    style="width:70px; height: 18px;"
                    :disabled="true"
                    v-model="item.locationCode"
                  />
                </span>
                <span>
                  <img class="img_edit" src="static/edit@2x.png" @click.stop="item_click(index)" />
                </span>
              </span>
              <span class="godownentry_sp" @click.stop>
                数量({{item.finishQty}}/{{item.requiredQty}}):
                <input
                  class="sp_input"
                  style="width:50px; height: 18px; "
                  v-on:input="change(index, item.qtyReceived, item.requiredQty)"
                  :disabled="item.isDisabled"
                  v-model="item.qtyReceived"
                />
                <span>
                  <img class="img_edit" src="static/edit@2x.png" @click.stop="get_edit(index)" />
                </span>
              </span>
            </li>
            <li class="godownentry_item">
              <span class="godownentry_sp">类型:{{item.ifsType}}</span>
            </li>
          </ul>
          <!-- <div class="div_image" >
        <img v-if="item.itemChecked" class="image_items" src="@/components/warehouse/pOstorage/yes.png" >
          </div>-->
        </div>
      </cube-scroll>
    </div>
    <VFooter @func="getadd_number" :placeholdertext="imput_text"></VFooter>
    <div class="godownentry_btn">
      <cube-button class="btn_style" :primary="true" @click="submission">入库</cube-button>
    </div>
    <VPopup @setlocation="getloction" ref="showpopup"></VPopup>
    <cube-popup type="my-popup" :mask="false" ref="Popup">
      <div class="cube-popup-message">
        <div class="my-message">{{message}}</div>
      </div>
    </cube-popup>
  </div>
</template>
<script>
import VHeader from 'base/warehouseheader/Header'
import VFooter from 'base/footer/Footer'
import VPopup from 'base/popup/Popup'
import {
  getquerysoinstocklist,
  getsaveworkorderinstockrecordlist
} from 'common/js/httpConnection'
import { searchCode } from 'api/acess'
export default {
  data() {
    return {
      showdata: false, // 界面显示
      popup_text: '',
      imput_text: '扫描流转卡、送件标签二维码',
      msg: '车间订单入库',
      codeList:[],
      dispositionCodeindex:'',
      message: '', // 提示消息
      returndata: '', // 请求返回数据
      orderNo: '', // 订单号
      projectCode: '', // 项目号
      orderCodeName: '', // 车间订单类型
      trainNo: '', // 车间订单类型
      godownentry_list: [], // 展示数据
      locationName_index: '' // 库位索引
    }
  },
  components: {
    VHeader,
    VFooter,
    VPopup
  },
  methods: {
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    item_dispositionCode_click(data, index){
      this.dispositionCodeindex = index
      if(!data) {
      searchCode().then(res => {
      if (res.status === 1) {
        this.codeList = res.result
        this.picker = this.$createPicker({
           title: this.msgtitle,
           alias: {
            value: 'key',
            text: 'value'
           },
        data: [this.codeList],
        onSelect: this.selectHandle
      })
      this.picker.show()
          } else {
            this.showPopup('myPopup', res.errorMsg)
          }
        })
        .catch(err => {
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showPopup('myPopup', process.env.WARNING_INFO)
        })
      }
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      this.godownentry_list[this.dispositionCodeindex].dispositionCode = selectedVal[0]
    },
    // 可输入判断
    get_isedit(index) {
      if (this.godownentry_list[index].conditionCode_isDisabled) {
        this.godownentry_list[index].conditionCode_isDisabled = false
      } else {
        this.godownentry_list[index].conditionCode_isDisabled = true
      }
      if (this.godownentry_list[index].lotTracking === 1) {
        if (this.godownentry_list[index].lotBatchNo_isDisabled) {
          this.godownentry_list[index].lotBatchNo_isDisabled = false
        } else {
          this.godownentry_list[index].lotBatchNo_isDisabled = true
        }
      }
    },
    //序列号显示隐藏
    get_iseditt(index) {
      if (this.godownentry_list[index].serialTracking === 1) {
        if (this.godownentry_list[index].serialNo_isDisabled) {
          this.godownentry_list[index].serialNo_isDisabled = false
        } else {
          this.godownentry_list[index].serialNo_isDisabled = true
        }
      }
    },
    //批次号显示隐藏
    get_isshow(index) {
      if (this.godownentry_list[index].lotTracking === 1) {
        if (this.godownentry_list[index].lotBatchNo_isDisabled) {
          this.godownentry_list[index].lotBatchNo_isDisabled = false
        } else {
          this.godownentry_list[index].lotBatchNo_isDisabled = true
        }
      }
    },
    // 控制输入框可编辑
    get_edit(index) {
      if (this.godownentry_list[index].isDisabled) {
        this.godownentry_list[index].isDisabled = false
      } else {
        this.godownentry_list[index].isDisabled = true
      }
    },
    // 判断选中
    click_item(index) {
      if (this.godownentry_list[index].itemChecked) {
        this.godownentry_list[index].itemChecked = false
      } else {
        this.godownentry_list[index].itemChecked = true
      }
    },
    // input 变化判断
    change(index, qtyReceived, requiredQty) {
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if ((qtyReceived + '').match(/[^\d.]/g, '')) {
          this.godownentry_list[index].qtyReceived = requiredQty
        }
        if (qtyReceived > requiredQty) {
          this.showToast(this, '数量不能超过预留数量')
          this.godownentry_list[index].qtyReceived = requiredQty
        }
      }, 300)
    },
    getadd_number(data) {
      this.add_number = data
      if (this.add_number === '') {
        this.showToast(this, '输入框不能为空')
        return
      }
      this.getrequst()
    },
    // 请求数据
    getrequst() {
      var datas = { qccode: this.add_number }
      this.showIndicator(this)
      getquerysoinstocklist(datas)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          this.showdata = true
          let dataobj = response.result
          this.orderNo = dataobj.orderNo
          this.projectCode = dataobj.projectCode
          this.orderCodeName = dataobj.orderCodeName
          this.trainNo = dataobj.trainNo
          if (dataobj.orderCode === 'M') {
            dataobj.workOrderInStockRecordList.forEach(item => {
              item.is_img_edit = true
              item.conditionCode_isDisabled = true
              item.lotBatchNo_isDisabled = false
              item.serialNo_isDisabled = true
              item.dispositionCode_isDisabled = true
              if (item.serialTracking === 0) {
                item.is_img_serialNo = false
              }
              if (item.lotTracking === 0) {
                item.is_img_lotBatchNo = false
              }
            })
            this.returndata = dataobj
            this.godownentry_list = this.returndata.workOrderInStockRecordList
          }else if(dataobj.orderCode === 'D') {
            dataobj.workOrderInStockRecordList.forEach(item => {
              item.is_img_edit = true
              item.lotBatchNo_isDisabled = true
              item.conditionCode_isDisabled = true
              item.serialNo_isDisabled = true
              item.dispositionCode_isDisabled = false
              if (item.serialTracking === 1) {
                item.is_img_serialNo = true
              }
              if (item.lotTracking === 1) {
                item.is_img_lotBatchNo = true
              }
            })
            this.returndata = dataobj
            this.godownentry_list = this.returndata.workOrderInStockRecordList
          }else {
            dataobj.workOrderInStockRecordList.forEach(item => {
              item.is_img_edit = true
              item.lotBatchNo_isDisabled = true
              item.conditionCode_isDisabled = true
              item.serialNo_isDisabled = true
              item.dispositionCode_isDisabled = true
              if (item.serialTracking === 1) {
                item.is_img_serialNo = true
              }
              if (item.lotTracking === 1) {
                item.is_img_lotBatchNo = true
              }
            })
            this.returndata = dataobj
            this.godownentry_list = this.returndata.workOrderInStockRecordList
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // 组合数据
    getcollect() {
      var newArray = []
      newArray = this.godownentry_list
      var selectRows = newArray.filter(function(item) {
        return item.itemChecked
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 提交数据
    submission() {
      if (this.godownentry_list.length === 0) {
        this.showToast(this, '无数据')
        return
      }
      this.showIndicator(this)
      getsaveworkorderinstockrecordlist(this.returndata)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0){
            this.message = response.errorMsg
            this.$refs.Popup.show()
            setTimeout(() => {
              this.$refs.Popup.hide()
            }, 30000)
          } else if (response.status === 1) {
            this.showdata = false
            this.returndata = ''
            this.godownentry_list = []
            // this.getrequst()
          }else if(response.status === 2){
           this.$createDialog({
              type: 'confirm',
              title: '提示',
              content: response.errorMsg,
              confirmBtn: {
                text: '确定',
                active: true
              },
              cancelBtn: {
                text: '取消',
                active: false
              },
              onConfirm: () => {
                this.returndata.validSORoutingChange=true
                this.submission()
              }
            }).show()
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // 库位修改
    getloction(data) {
      this.godownentry_list[this.locationName_index].locationCode = data
    },
    // 打开popup
    item_click(index) {
      this.$refs.showpopup.childClick()
      this.locationName_index = index
    }
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/style/warehouse.styl'

.scroll-wrapper 
  height: 495px
.godownentry_title 
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  height: 40px
  background: #9acafb
  .godownentry_item1 
    width: 100%
    display: flex
    justify-content: start
    align-items: center
    margin-left: 10px
    margin-right: 10px
    font-size: 13px
    .godownentry_sp1 
      margin-top: 5px
      width: 50%

.godownentry_item_ul 
  height: auto
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  padding-bottom: 3px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  position: relative
  .div_image 
    position: absolute
    top: 5px
    right: 5px
    .image_items 
      width: 20px
      height: 20px
  .godownentry_item 
    display: flex
    justify-content: start
    align-items: center
    margin-right: 10px
    margin-left: 10px
    font-size: 13px
    .godownentry_sp 
      display: flex
      flex: 1
      align-items: center
      margin-top: 5px
      white-space: nowrap
      .go_sp 
        padding-top: 2px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap

.godownentry_btn 
  position: absolute
  top: 595px
  left: 10px
  right: 10px
  .btn_style 
    height: 10px
    line-height: 1px
  
.img_edit 
  width: 15px
  height: 15px
  margin-left: 5px

.my-message 
  margin-left: 20px
  margin-right: 20px
  padding: 15px
  color: #fff
  background-color: rgba(0, 0, 0, 0.8)
</style>
