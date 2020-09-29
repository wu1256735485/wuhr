<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <cube-scroll class="scroll-wrapper">
      <div
        class="detail"
        v-for="(item,index) in detail_list"
        v-bind:key="item.id"
        @click="click_item(index)"
        :class="{ bg_rowColorStatus: item.rowColorStatus }">
        <ul>
          <li class="detail_item">
            <span class="detail_sp">订单号:{{item.orderNo}}</span>
            <span class="detail_sp" @click.stop="showmaterial('零件号',item.materialCode)">
              <span class="sp_text_bold">零件号:</span>
              <span class="sp_bold">{{item.materialCode}}</span>
            </span>
          </li>
          <li class="detail_item">
            <span class="detail_sp1" @click.stop="showmaterial('零件描述',item.materialName)">零件描述:{{item.materialName}}</span>
            <span class="detail_sp">项目号:{{item.projectCode}}</span>
          </li>
          <li class="detail_item">
            <span class="detail_sp">需求数量({{item.unitCode}}):{{item.demandQuantity}}</span>
            <span class="detail_sp">
              <span class="sp_text_bold">预留数量({{item.unitCode}}):</span>
              <span class="sp_bold">{{item.assignedQty}}</span>
            </span>
          </li>
          <li class="detail_item">
            <span class="detail_sp">
              实际数量:
              <span @click.stop>
                <input
                  class="sp_input"
                  style="width:80px; height: 18px;"
                  v-model="item.actualQuantity"
                  :disabled="item.isDisabled"
                  v-on:input="change(index, item.actualQuantity)"
                />
              </span>
              <span>
                <img class="img_edit" src="static/edit@2x.png" @click.stop="get_edit(index)" />
              </span>
            </span>
            <span class="detail_sp">
              <span class="sp_text_bold">库位:</span>
              <span class="sp_bold">{{item.locationName}}</span>
            </span>
          </li>
           <li class="detail_item">
            <span class="detail_sp">条件代码:{{item.conditionCode}}</span>
          </li>
          <li class="detail_item">
            <span class="detail_sp">批次号:{{item.snBatch}}</span>
          </li>
          <li class="detail_item">
            <span class="detail_sp2">
              序列号:
              <span>
                <input
                  class="sp_input"
                  :disabled="true"
                  style="width:160px; height: 18px;"
                  type="text"
                  v-model="item.snCode"
                />
              </span>
              <span>
                <img class="img_edit" src="static/edit@2x.png" @click.stop="item_snCode(index)" />
              </span>
            </span>
          </li>
        </ul>
        <div class="div_image">
          <img
            v-if="item.selected"
            class="image_items"
            src="@/components/warehouse/pOstorage/yes.png"
          />
        </div>
        <div class="div_text_s" v-if="item.printMaterialLable == 1" >已</div>
        <div class="div_index"> {{index+1}}</div>
      </div>
    </cube-scroll>
    <div class="detail_el">
      <span class="detail_span">
        <cube-button
          class="btn_style"
          :primary="true"
          :disabled="btn_disable"
          @click="getprint"
        >打印物料标签</cube-button>
      </span>
      <span class="detail_span">
        <cube-button
          class="btn_style"
          :primary="true"
          :disabled="btn_disable"
          @click="getSubmission"
        >打印集料标签</cube-button>
      </span>
      
    </div>
    
    <cube-popup class="popup" :mask="false" type="my-popup" ref="myPopup" v-model="popupVisible">
      <div class="popup_cl" @click="mask_click()">
        <div class="popup_warp" @click="warp_click()">
          <h1 class="text">搜索序列号</h1>
          <div class="popup_search">
            <div class="popup_input">
              <cube-input
                class="cube_input"
                :style="input_Image"
                v-model="sncode"
                placeholder="请输入内容"
                :clearable="clearable"
                ref="input"
                @keyup.enter.native="searchFile()"
                @keydown.enter.native="searchBlur()"
              ></cube-input>
            </div>
          </div>
          <cube-scroll class="popup_scroll_wrapper">
            <div
              v-for="(item,index) in newSNBatch_list"
              v-bind:key="item.id"
              @click="newSNBatchname(index)"
            >
              <p class="materialwithdrawal_item">{{item.value}}</p>
            </div>
          </cube-scroll>
        </div>
      </div>
    </cube-popup>
    <VToastp ref="showp"></VToastp>
  </div>
</template>
<script>
import VToastp from 'base/popup/Toastp'
import VHeader from 'base/warehouseheader/Header'
import {
  getquerysomaterielreservelist,
  getvalidhasprintedsowl,
  getbuildsoaggregatelist,
  getquerymaterielsncode,
  getprintsowl,
  getadjustmentmaterielreserveList
} from 'common/js/httpConnection'
export default {
  data() {
    return {
      msg: '集料明细',
      data: [], // 路由数据
      detail_list: '', // 列表数据
      selected_list: [],
      item_snCode_index: '',
      clearable: true, // input属性
      popupVisible: false, // 弹窗显示
      flage: false, // 弹窗显示
      item_flage: false, // popup关闭
      btn_disable: false, // 按键禁止
      sncode: '', // 展示数据
      newSNBatch_list: [], // 弹窗列表数据
      materialCode: '',
      printflge: '0', // 打印标识
      input_Image: {
        backgroundImage:
          'url(' +
          require('@/components/warehouse/pOstorage/inputbg.png') +
          ')',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%'
      }
    }
  },
  components: {
    VHeader,
    VToastp
  },
  methods: {
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    // 控制输入框可编辑
    get_edit(index) {
      console.log(this.detail_list[index].isDisabled)
      if (this.detail_list[index].isDisabled) {
        this.detail_list[index].isDisabled = false
      } else {
        this.detail_list[index].isDisabled = true
      }
    },
    // 控制 popup 显示或隐藏
    mask_click() {
      if (!this.flage) {
        this.popupVisible = false
      }
      this.flage = false
    },
    // 控制 popup 显示或隐藏
    warp_click() {
      if (!this.item_flage) {
        this.flage = true
        this.popupVisible = true
      }
      this.item_flage = false
    },
    // 设置修改数据
    newSNBatchname(index) {
      this.popupVisible = false
      this.item_flage = true
      this.flage = true
      this.detail_list[this.item_snCode_index].newSNCode = this.newSNBatch_list[index].value
      let newlist = []
      newlist.push(this.detail_list[this.item_snCode_index])
      this.showIndicator(this)
      getadjustmentmaterielreserveList(newlist)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          this.showToast(this, response.errorMsg)
          if (response.status === 0) {
            return
          }
          this.detail_list[this.item_snCode_index].snCode = this.newSNBatch_list[index].value
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // 打开popup
    item_snCode(index) {
      this.newSNBatch_list = []
      this.sncode = ''
      this.item_snCode_index = index
      this.popupVisible = true
      this.materialCode = this.detail_list[index].materialCode
    },
    // 键盘隐藏
    searchFile() {
      this.$refs.input.blur()
    },
    // 键盘确定键事件
    searchBlur() {
      this.showIndicator(this)
      var datas = { materielcode: this.materialCode, sncode: this.sncode }
      getquerymaterielsncode(datas)
        .then(response => {
          this.closeIndicator()
          console.log(response)
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          this.newSNBatch_list = response.result
          if (this.newSNBatch_list.length === 0) {
            this.showToast(this, '未查询到数据')
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // input 输入事件监听
    change(index, actualQuantity) {
      let assignedQty = this.detail_list[index].assignedQty
      this.inputVal(index, actualQuantity, assignedQty)
    },
    inputVal(index, actualQuantity, assignedQty) {
      // 实现input连续输入，只判断一次
      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        if ((actualQuantity + '').match(/[^\d.]/g, '')) {
          this.detail_list[index].actualQuantity = assignedQty
        }
        if (actualQuantity > assignedQty) {
          this.showToast(this, '数量不能超过预留数量')
          this.detail_list[index].actualQuantity = assignedQty
        }
      }, 300)
    },
    click_item(index) {
      // if (this.detail_list[index].rowColorStatus === true) {
      //   this.detail_list[index].rowColorStatus = false
      // } else {
      //   if (this.detail_list[index].demandQuantity + '' !== this.detail_list[index].actualQuantity + '') {
      //     this.detail_list[index].rowColorStatus = true
      //   }
      // }
      if (this.detail_list[index].selected === true) {
        this.detail_list[index].selected = false
      } else {
        this.detail_list[index].selected = true
      }
    },
    // 接收数据
    getRuterData() {
      this.data = this.$route.params.data
    },
    getcollect() {
      var newArray = []
      newArray = this.detail_list
      var selectRows = newArray.filter(function (item) {
        return item.selected
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 提交数据
    getSubmission() {
      if (this.detail_list.length === 0) {
        this.showToast(this, '暂无数据')
        return
      }
      let newlists = this.getcollect()
      let isprint =this._iscollect(newlists)
      if (!isprint) {
        this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '有物料标签未打印，是否继续打印集料标签?',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
           this._openBluetooth()
          }
        }).show()
      } else {
         this.$createDialog({
        type: 'confirm',
        title: '提示',
        content: '当前为打印集料标签操作，是否继续？',
        confirmBtn: {
          text: '确定',
          active: true
        },
        cancelBtn: {
          text: '取消',
          active: false
        },
        onConfirm: () => {
         this._openBluetooth()
        }
      }).show()
      }
    },
    // 开蓝牙
    _openBluetooth(){
      this.btn_disable = true
      this.printflge = '1'
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission)
      this.timeout_Submission = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 验证是否已经打印过物料标签
    setvalidhasprintedsowl(newlists) {
      this.showIndicator(this)
      getvalidhasprintedsowl(newlists)
        .then(response => {
          this.closeIndicator(this)
          if (response.status === 2) {
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
                this.getrequstprint(newlists)
              },
              onCancel: () => {
                this.getclose()
              }
            }).show()
          } else {
            this.getrequstprint(newlists)
          }
        })
        .catch(error => {
          this.getclose()
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    getstartPrint(data) {
      clearTimeout(this.timeout_pint)
      this.timeout_pint = setTimeout(() => {
        $App.callPrint(data)
      }, 500)
    },
    getclose() {
      clearTimeout(this.timeoutclose)
      this.timeoutclose = setTimeout(() => {
        $App.callcolsePrint()
      }, 500)
    },
    _iscollect(list){
      let flage = true
      list.forEach(item => {
        if(item.printMaterialLable === 0) {
          flage = false
        }
      })
      return flage
    },
    // 打印提交集料
    getAggregate() {
      let newlists = this.getcollect()
      if (newlists.length === 0) {
        this.showToast(this, '无数据')
        this.getclose()
        return
      }
      this._getbuildsoaggregatelist(newlists)
    },
    // 打印集料接口
    _getbuildsoaggregatelist(newlists){
      this.showIndicator(this)
      getbuildsoaggregatelist(newlists)
        .then(response => {
          this.closeIndicator()
          if (response.status === 0) {
            this.$refs.showp.toastshow(15000, response.errorMsg)
            this.getclose()
            return
          }
          if (response.status === 2) {
            this.detail_list = response.result
            this.$refs.showp.toastshow(15000, response.errorMsg)
            this.getclose()
          } else if (response.status === 1) {
            this.getstartPrint(response.result)
            this.getrequst()
          } else {
            this.getclose()
          }
        })
        .catch(error => {
          this.getclose()
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    // 打印物料
    getprint() {
      if (this.detail_list.length === 0) {
        this.showToast(this, '暂无数据')
        return
      }
      this.btn_disable = true
      this.printflge = '2'
      $App.callconntBluetooth()
      clearTimeout(this.timeouts)
      this.timeouts = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 物料提示
    getmateriel() {
      let newlists = this.getcollect()
      if (newlists.length === 0) {
        this.showToast(this, '无数据')
        this.getclose()
        return
      }
      if (newlists.length === this.detail_list.length) {
        this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否全部打印?',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
            this.setvalidhasprintedsowl(newlists)
          },
          onCancel: () => {
            this.getclose()
          }
        }).show()
      } else {
        this.setvalidhasprintedsowl(newlists)
      }
    },
    // 物料请求打印
    getrequstprint(sowlist) {
      this.showIndicator(this)
      getprintsowl(sowlist)
        .then(response => {
          this.closeIndicator()
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            this.getclose()
            return
          }
          if (response.status === 1) {
            this.getrequst()
            this.getstartPrint(response.result)
          } else {
            this.getclose()
          }
        })
        .catch(error => {
          this.closeIndicator()
          this.getclose()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    setselected_data() {
      this.selected_list = []
      for (var i = 0; i < this.detail_list.length; i++) {
        if (this.detail_list[i].selected === true) {
          this.selected_list.push(this.detail_list[i])
        }
      }
    },
    // 拉取数据
    getrequst() {
      getquerysomaterielreservelist(this.data)
        .then(response => {
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          console.log(response.result.length)
          this.show = true
          this.detail_list = response.result
        })
        .catch(error => {
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    beCalledBLSuccess(data) {
      if (this.printflge === '1') {
        this.getAggregate()
      } else if (this.printflge === '2') {
        this.getmateriel()
      }
    }
  },
  created() {
    this.getRuterData()
  },
  mounted() {
    window.beCalledBLSuccess = this.beCalledBLSuccess
    if (typeof this.data === 'undefined') {
      return
    }
    this.getrequst()
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/style/warehouse.styl'
.scroll-wrapper 
  height: 550px
.detail 
  margin-left: 5px
  margin-right: 5px
  margin-top: 5px
  height: auto
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
.detail_item 
  display: flex
  justify-content: start
  align-items: center
  margin-left: 10px
  margin-right: 10px
  margin-top: 3px
  font-size: 13px
  .detail_sp 
    display: flex
    align-items: center
    width: 50%
    padding-top: 2px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
    .company 
      color: #9acafb
  .detail_sp1 
    width: 50%
    padding-top: 2px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
   .detail_sp2
    display: flex
    align-items: center
    width: 90%
    padding-top: 2px
    overflow: hidden
    text-overflow: ellipsis
    white-space: nowrap
.bg_rowColorStatus 
  background: RED
.detail_el 
  margin-top: 5px
  display: flex
  justify-content: space-between
  margin-left: 5px
  margin-right: 5px
  .detail_span 
    width: 45%
    .btn_style 
      height: 10px
      line-height: 1px
    
.popup_cl 
  width: 335px
  height: 630px
  .popup_warp 
    position: absolute
    margin-left: 15%
    margin-right: 15%
    top: 150px
    width: 70%
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
          width: 75%
          background: none
    .materialwithdrawal_item 
      text-align: center
      margin-top: 7px
      font-size: 15px
    
.popup_scroll_wrapper 
  height: 215px

.img_edit 
  width: 15px
  height: 15px
  margin-left: 5px

</style>
