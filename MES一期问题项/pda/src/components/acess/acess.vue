<template>
  <div>
    <v-header :title="'现场入库'"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper">
          <acess-list
            :order="order"
            :list="list"
            :codeList="codeList"
            :pauseList="pauseList"
            :isDisabled="isDisabled"
            @location-code="handleLocationCode"
            @scanning="get_scanning"
          ></acess-list>
        </div>
      </div>
      <footer-oper @search="_searchAcess" @read="_searchAcess" :placeholder="'请输入订单号或扫描流转卡二维码'">
        <!-- <div class="footer-btn">
          <div class="btn" @click.stop="_submitAcess">提交</div>
        </div> -->
        <div class="tt_btn_div" >
        <div class="ttput_div">
            <span class="ttput_col">
              <cube-button class="but_style" :primary="true"  @click.stop="_submitAcess">提交</cube-button>
            </span>
            <span class="ttput_col">
              <cube-button class="but_style" :primary="true"  @click="getprint">补打收料标签</cube-button>
            </span>
        </div>
      </div>
      </footer-oper>
    </div>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
    <acessquery ref="acessquery"></acessquery>
  </div>
</template>

<script>
import VHeader from 'base/v-header/v-header'
import AcessList from './acess-list'
import Acessquery from './acessquery'
import FooterOper from 'base/footer-operation/footer'
import {
  searchAcess,
  submitAcess,
  searchCode,
  scrapPause,
  queryBasic,
  printslwlzpl,
  queryCodeBasic
} from 'api/acess'

const _SCRAP_ = 'SCRAP' // 报废
const _DISPOSE_ = 'DISPOSE' // 检修
const _SCRRET_ = 'SCR-RET' // 报废保留
const _TBDECIDED_ = 'TB-DECIDED' // 待处理

export default {
  data() {
    return {
      list: [],
      order: {},
      requstdata: {},
      codeList: [], // 处置代码list
      pauseList: [], // 报废原因list
      message: '',
      scanningdata: '',
      scanningindex: -1,
      btn_disable: false, // 禁用按键
      flage: 0,
      code: '', // 选择当前处置代码
      pauseCode: '', // 当前所选择的报废原因Code
      listIndex: -1, // 当前选中的出入库记录下标
      printlist: [],
      isDisabled: false // 当前库位信息是否禁用
    }
  },
  created() {
    this._searchCode()
    this._scrapPause()
  },
  methods: {
    // 查询处置代码与库位关联信息
    _queryCodeBasic(code) {
      queryCodeBasic({ disposalcode: code })
        .then(res => {
          if (res.status === 1) {
            this.list[this.listIndex].locationCode = res.result[0].locationCode
            this.isDisabled = true
          } else {
            this.showPopup('myPopup', res.errorMsg)
          }
        })
        .catch(err => {
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showPopup('myPopup', process.env.WARNING_INFO)
        })
    },
    // 查询报废原因列表
    _scrapPause() {
      scrapPause().then(res => {
        if (res.status === 1) {
          this.pauseList = res.result
        } else {
          this.showPopup('myPopup', res.errorMsg)
        }
      })
    },
    // 获取处置代码选中项
    handleLocationCode(index, val, type, selectedText) {
      console.log(index, type)
      if (index !== -1) {
        this.listIndex = index
      }
      if (type === 'code' && val[0] != 'SCRAP') {
        this.list[index].scrapReasonCode = ''
        this.list[index].scrapReasonName = ''
      }
      if (type === 'pause') {
        this.list[index].scrapReasonCode = val[0]
        this.list[index].scrapReasonName = selectedText[0]
        this.pauseCode = val[0]
      } else if (type === 'condition') {
        this.list[index].conditionCode = val[0]
      } else {
        this.list[index].dispositionCode = val[0]
        this.code = val[0]
      }
    },
    // 查询处置代码列表
    _searchCode() {
      searchCode()
        .then(res => {
          if (res.status === 1) {
            this.codeList = res.result
          } else {
            this.showPopup('myPopup', res.errorMsg)
          }
        })
        .catch(err => {
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showPopup('myPopup', process.env.WARNING_INFO)
        })
    },
    // 定位扫描
    get_scanning(index) {
      this.scanningindex = index
      $App.callScan()
    },
    // 查询出入库
    _searchAcess(data) {
      if (this.scanningindex === -1) {
        this.scanningdata = data
        searchAcess({ qccode: data, type: '' }).then(res => {
          if (res.status !== 1) {
            this.showPopup('myPopup', res.errorMsg)
          } else {
            this.order = res.result
            this.list = res.result.workOrderInStockRecordList
          }
        })
      } else {
        let stringlist = []
        let str = data.replace(/；/g, '')
        stringlist = str.split('')
        let partNostr = stringlist[stringlist.length - 1].replace(
          'BST No.',
          ''
        )
        if (partNostr === this.list[this.scanningindex].partNo) {
          if (this.list[this.scanningindex].serialTracking === 1) {
            this.list[this.scanningindex].serialNo = stringlist[0]
          }
          if (this.list[this.scanningindex].lotTracking === 1) {
            this.list[this.scanningindex].lotBatchNo = stringlist[0]
          }
        } else {
          this.showPopup(
            'myPopup',
            '扫描零件号' + partNostr + '与当前数据不符!'
          )
        }
        this.scanningindex = -1
      }
    },
    // 刷新数据
    getrequst (data) {
      searchAcess({ qccode: data, type: '1' }).then(res => {
        if (res.status === 1) {
          this.order = res.result
          this.list = res.result.workOrderInStockRecordList
        }
      })
    },
    getcollect() {
      var newArray = []
      newArray = this.list
      var selectRows = newArray.filter(function(item) {
        return item.itemChecked
      })
      if (selectRows.length > 0) {
        newArray = selectRows
      }
      return newArray
    },
    // 提交现场出入库
    _submitAcess() {
      if (this.list.length === 0) {
        this.showPopup('myPopup', '无数据')
        return
      }
      let newlist = this.getcollect()
      let locationCodelist = newlist.filter(function(item) {
        let stringHeader = item.locationCode.substring(0, 2)
        if (stringHeader !== 'FS') {
          return true
        }
        return false
      })
      if (locationCodelist.length > 0) {
        this.$createDialog({
          type: 'confirm',
          title: '入库申请',
          content: '是否提交入库申请',
          confirmBtn: {
            text: '是',
            active: true
          },
          cancelBtn: {
            text: '立即入库',
            active: false
          },
          onConfirm: () => {
            this.order.batchLibrary = 0
            // this.requstdata = newlist
             this.getRequst(newlist)
            // $App.callconntBluetooth()
          },
          onCancel: () => {
            this.flage = 1
            this.order.batchLibrary = 1
            this.getRequst(newlist)
          }
        }).show()
      } else {
        this.getRequst(newlist)
      }
    },
    getRequst(list) {
      // this.$refs.acessquery.acessqueryshow(list)
      let datalist = JSON.parse(JSON.stringify(this.order))
      datalist.workOrderInStockRecordList = list
      submitAcess(datalist)
        .then(res => {
          if (res.status === 1) {
            this.showPopup('myPopup', '提交成功')
            this.getrequst(this.scanningdata)
          } else if (res.status === 0) {
            this.showPopup('myPopup', res.errorMsg) 
          } else if (res.status === 2) {
            this.$refs.acessquery.acessqueryshow(list)
            this.getrequst(this.scanningdata)
          } else {
            // this.getstartPrint(res.result)
            this.getrequst(this.scanningdata)
          }
        })
        .catch(err => {
          if (this.flage === 1) {
            this.flage = 0
            // this.getclose()
          }
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showPopup('myPopup', process.env.WARNING_INFO)
        })
    },
    // 打印收料物料标签接口
    _printslwlzpl(list) {
      // let newlist = this.getcollect()
      printslwlzpl(list).then(res => {
        if (res.status !== 1) {
          this.showPopup('myPopup', res.errorMsg)
          this.getclose()
          return
        }
        this.showPopup('myPopup', '提交成功')
        this.getstartPrint(res.result)
      })
      .catch(err => {
        this.getclose()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showPopup('myPopup', process.env.WARNING_INFO)
      })
    },
    // 显示查询界面
    getprint () {
      this.$refs.acessquery.acessqueryshow('')
    },
    // 打印
    _getprint(list){
      if (list.length === 0) {
        this.showPopup('myPopup', '无数据')
        this.$refs.acessquery._setdisable()
        return
      }
      this.printlist = list
      // this._printslwlzpl(list)
      $App.callconntBluetooth()
      clearTimeout(this.timeout_Submission);
      this.timeout_Submission = setTimeout(() => {
        this.$refs.acessquery._setdisable()
      }, 5000)
    },
    // 提示消息
    showPopup(name, message) {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 3000)
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
      this._printslwlzpl(this.printlist)
    }
  },
  mounted() {
    window.beCalledBLSuccess = this.beCalledBLSuccess
  },
  watch: {
    code(newVal) {
      if (newVal !== _DISPOSE_) {
        if(this.code){ // 解决监听后第二次调接口为空
          this._queryCodeBasic(newVal)
        }
        this.code = "";
      }
    }
  },
  components: {
    AcessList,
    Acessquery,
    FooterOper,
    VHeader
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/style/common.styl'

.cube-my-popup 
  .cube-popup-message 
    color: #fff
    padding: 20px
    background: rgba(0, 0, 0, 0.8)

.tt_btn_div
 margin-top 5px
 margin-bottom 5px
 width 100%
 .ttput_div
  display flex
  justify-content space-between
  margin-left 10px
  margin-right 10px
  .ttput_col
      width 45%

.but_style
  height 10px
  line-height 1px
</style>