<template>
  <div>
    <VHeader :title="msg"></VHeader>
    <div class="print">
      <div class="print_div">
        <div class="print_div_text">单据类型:</div>
        <div class="print_div_span">
          <span class="print_div_sp1">
            <cube-select
              class="cube_put"
              :style="input_Image"
              v-model="value"
              placeholder="请选择"
              @change="changeValue"
              :title="select_title"
              :options="options"
              :auto-pop="false"
              :disabled="false"
            ></cube-select>
          </span>
          <span class="print_div_sp">
            <cube-button class="btn_styles" :inline="true" :primary="true" @click="Undercarriage">查询</cube-button>
          </span>
        </div>
      </div>
      <div class="print_div">
        <div class="print_div_text">列&nbsp;&nbsp;&nbsp;&nbsp;号:</div>
        <div class="print_div_span">
          <span>
            <cube-input class="cube_input" :style="input_Image" type="text" v-model="sncode"></cube-input>
          </span>
          <span>车&nbsp;&nbsp;&nbsp;&nbsp;号:</span>
          <span>
            <cube-input class="cube_input" :style="input_Image" type="text" v-model="carcode"></cube-input>
          </span>
        </div>
      </div>
      <div class="print_div">
        <div class="print_div_text">{{number}}:</div>
        <div class="print_div_span">
          <span>
            <cube-input class="cube_input" :style="input_Image" type="text" v-model="dcode"></cube-input>
          </span>
          <span>零件号:</span>
          <span>
            <cube-input class="cube_input" :style="input_Image" type="text" v-model="mcode"></cube-input>
          </span>
        </div>
      </div>
    </div>
    <cube-scroll class="scroll_wrapper" :data="print_list" ref="scroll">
      <div
        v-for="(item,item_index) in print_list"
        v-bind:key="item.id"
        class="div_item"
        @click="print_item_click(item_index)"
      >
        <div class="div_items">
          <div v-if="index === 1">
            <ul>
              <li class="print_item">
                <span class="print_sp">From:{{item.fromLocation}}</span>
                <span class="print_sp">To:{{item.toLocation}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">项目号:{{item.projectCode}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">零件号:</span>
                  <span class="sp_bold">{{item.materialCode}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp1">零件描述:{{item.materialName}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">条件代号:{{item.conditionalCode}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                  <span class="sp_bold">{{item.transferQuantity}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp">序列号:{{item.sncode}}</span>
                <span class="print_sp">批次号:{{item.snbatch}}</span>
              </li>
            </ul>
          </div>
          <div v-else-if="index === 2">
            <ul>
              <li class="print_item">
                <span class="print_sp">From:{{item.fromLocation}}</span>
                <span class="print_sp">To:{{item.toLocation}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">项目号:{{item.projectCode}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">零件号:</span>
                  <span class="sp_bold">{{item.materialCode}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp1">零件描述:{{item.materialName}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">序列号:{{item.snCode}}</span>
                <span class="print_sp">批次号:{{item.snBatch}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">
                  <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                  <span class="sp_bold">{{item.transferQuantity}}</span>
                </span>
              </li>
            </ul>
          </div>
          <div v-else-if="index === 4">
            <ul>
              <li class="print_item">
                <span class="print_sp">集料单号:{{item.aggregateCode}}</span>
                <span class="print_sp">项目号:{{item.projectCode}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">订单号:{{item.orderNo}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">零件号:</span>
                  <span class="sp_bold">{{item.partNo}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp">种类:{{item.reservedCategoryCount}}</span>
                <span class="print_sp">工区:{{item.workCenterNo}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp1">零件描述:{{item.partDescribe}}</span>
              </li>
            </ul>
          </div>
          <div v-else-if="index === 5">
            <ul>
              <li class="print_item">
                <span class="print_sp">集料单号:{{item.aggregateCode}}</span>
                <span class="print_sp">项目号:{{item.projectCode}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">种类:{{item.categoryCount}}</span>
                <span class="print_sp">工区:{{item.workCenterCode}}</span>
              </li>
            </ul>
          </div>
          <div v-else>
            <ul>
              <li class="print_item">
                <span class="print_sp">项目号:{{item.projectCode}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">零件号:</span>
                  <span class="sp_bold">{{item.materialCode}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp1">零件描述:{{item.materialName}}</span>
              </li>
              <li class="print_item">
                <span class="print_sp">条件代号:{{item.conditional}}</span>
                <span class="print_sp">
                  <span class="sp_text_bold">数量({{item.unitCode}}):</span>
                  <span class="sp_bold">{{item.quantity}}</span>
                </span>
              </li>
              <li class="print_item">
                <span class="print_sp">序列号:{{item.snCode}}</span>
              </li>
               <li class="print_item">
                <span class="print_sp">批次号:{{item.snBatch}}</span>
              </li>
            </ul>
          </div>
          <div class="div_image">
            <img
              v-if="item.selected"
              class="image_items"
              src="@/components/warehouse/pOstorage/yes.png"
            />
          </div>
        </div>
      </div>
    </cube-scroll>
    <div class="print_el">
      <cube-button class="btn_style" :primary="true" :disabled="btn_disable" @click="getprint">打印标签</cube-button>
    </div>
  </div>
</template>
<script>
import VHeader from 'base/warehouseheader/Header'
import {
  getsupplementBarcode,
  getmakepbuildprint
} from 'common/js/httpConnection'
export default {
  data() {
    return {
      msg: '补打条码',
      select_title: '类型选择',
      sncode: '',
      carcode: '',
      dcode: '',
      mcode: '',
      data: '',
      number: '订单号',
      options: ['SO领料', 'TT移库', 'MTR移库', 'MR领料', 'SO集料', 'MR集料'],
      value: 'SO领料',
      index: 0,
      print_list: [],
      btn_disable: false,
      selectRows: [],
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
    VHeader
  },
  methods: {
    print_item_click(indexs) {
      if (this.print_list[indexs].selected === true) {
        this.print_list[indexs].selected = false
      } else {
        this.print_list[indexs].selected = true
      }
    },
    changeValue(value, index, text) {
      this.index = index
      if (index === 1) {
        this.number = 'TT单号'
      } else if (index === 2) {
        this.number = 'MTR单号'
      } else if (index === 3) {
        this.number = 'MR号'
      } else if (index === 5) {
        this.number = '集料单号'
      } else {
        this.number = '订单号'
      }
      this.print_list = []
    },
    Undercarriage() {
      if (
        this.sncode === '' &&
        this.carcode === '' &&
        this.dcode === '' &&
        this.mcode === ''
      ) {
        this.showToast(this, '查询条件为空或不足')
        return
      }
      this.showIndicator(this)
      var datas = {
        type: this.index,
        sncode: this.sncode,
        carcode: this.carcode,
        dcode: this.dcode,
        mcode: this.mcode
      }
      this.showIndicator(this)
      getsupplementBarcode(datas)
        .then(response => {
          this.closeIndicator()
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            return
          }
          this.print_list = []
          if (this.index === 1) {
            this.print_list = response.result.ttMoveLibraryDetaillist
          } else if (this.index === 2) {
            this.print_list = response.result.mtrMoveLibraryDetaillist
          } else {
            this.print_list = response.result
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    getprint() {
      this.selectRows = this.print_list.filter(function(item) {
        return item.selected
      })
      if (this.selectRows.length === 0) {
        this.showToast(this, '请选择数据')
        return
      }
      this.btn_disable = true
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission)
      this.timeout_Submission = setTimeout(() => {
        this.btn_disable = false
      }, 5000)
    },
    // 打印请求
    getsorequst() {
      let data = []
      let datas = []
      data = this.selectRows
      if (this.index === 4 || this.index === 5) {
        this.selectRows.map(function(item) {
          return datas.push(item.aggregateCode)
        })
        data = datas
      }
      this.showIndicator(this)
      getmakepbuildprint(this.index, data)
        .then(response => {
          this.closeIndicator()
          if (response.status === 0) {
            this.showToast(this, response.errorMsg)
            this.getclose()
            return
          }
          if (response.status === 1) {
            this.getstartPrint(response.result)
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
    // 调打印机
    getstartPrint(data) {
      clearTimeout(this.timeout_pint)
      this.timeout_pint = setTimeout(() => {
        $App.callPrint(data)
      }, 500)
    },
    // 关闭打印连接
    getclose() {
      clearTimeout(this.timeoutclose)
      this.timeoutclose = setTimeout(() => {
        $App.callcolsePrint()
      }, 500)
    },
    beCalledBLSuccess(data) {
      this.getsorequst()
    }
  },
  mounted() {
    window.beCalledBLSuccess = this.beCalledBLSuccess
  }
}
</script>
<style lang='stylus' scoped>
@import '~common/style/warehouse.styl'

.print 
  height: 83px
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 5px
  background: #9acafb
  .print_div 
    display: flex
    justify-content: start
    align-items: center
    font-size: 13px
    margin-left: 15px
    margin-right: 15px
    .cube_input 
      width: 100px
      height: 18px
      background: none
    .print_div_text 
      width: 20%
    .print_div_span 
      margin-top: 5px
      display: flex
      justify-content: space-between
      align-items: center
      width: 80%
      .print_div_sp1 
        width: 200px
        .cube_put 
          width: 100%
          height: 25px
          background: none
          line-height: 6px

.btn_styles 
  background: #3A85E6
  height: 25px
  line-height: 1px

.div_image 
  position: absolute
  top: 5px
  right: 5px
  .image_items 
    width: 20px
    height: 20px

.scroll_wrapper 
  height: 450px
  margin-top: 5px
  margin-left: 10px
  margin-right: 10px
  .div_item 
    position: relative
    border: 1px solid rgba(0, 0, 0, 0.1)
    margin-top: 5px
    border-radius: 5px
    padding-bottom 5px
    .print_item 
      display: flex
      justify-content: start
      align-items: center
      margin-left: 10px
      margin-top: 5px
      font-size: 13px
      .print_sp 
        display: flex
        justify-content: start
        align-items: center
        width: 50%
      .print_sp1 
        width: 100%

.item_bg 
  background: #ecf8ff

.print_el 
  margin-top: 5px
  margin-left: 5px
  margin-right: 5px
  display: flex
  justify-content: space-between
  .btn_style 
    height: 10px
    line-height: 1px
</style>
