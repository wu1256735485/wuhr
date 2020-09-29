<template>
  <div>
    <v-header :title="'物料交接'" @back="handleBack"></v-header>
    <div class="common-wrapper">
      <div class="common-inside">
        <div class="ticket-wrapper pad-botm">
          <list :list="list" :ticketno="ticketno" ref='lists'></list>
        </div>
      </div>
      <div class="production">
        <li class="pro">
          <span class="label">仓库人员&nbsp;:</span>
          <span class="desc">姓名&nbsp;:{{warehouse.NAME}}，员工号&nbsp;:{{warehouse.NAMECODE}}</span>
        </li>
        <li class="pro">
          <span class="label">生产人员&nbsp;:</span>
          <span class="desc">姓名&nbsp;:{{production.NAME}}，员工号&nbsp;:{{production.NAMECODE}}</span>
        </li>
      </div>
      <footer-oper
        :placeholder="'请输入集料单号或扫描集料标签'"
        @search="_getMaterials"
        @readNfc="_getNfc"
        @read="_getMaterials"
      >
        <div class="footer-btn">
          <div class="btn_div">
            <span class="btn_col">
              <cube-button
                class="btn_style"
                :primary="true"
                :disabled="btn_materialsConfirm"
                @click="_materialsConfirm"
              >发料确认</cube-button>
            </span>
            <span class="btn_col">
              <cube-button
                class="btn_style"
                :primary="true"
                :disabled="btn_signConfirm"
                @click="_signConfirm"
              >收料确认</cube-button>
            </span>
          </div>
        </div>
      </footer-oper>
      <cube-popup type="my" :mask="false" ref="myPopup">
        <div class="cube-popup-message">
          <div class="my-message">{{message}}</div>
        </div>
      </cube-popup>
    </div>
  </div>
</template>

<script>
import List from './list'
import VHeader from 'base/v-header/v-header'
import FooterOper from 'base/footer-operation/footer'
import { log } from 'common/js/dialog'
import { getNfc } from 'api/materials'
import {
  getMaterials,
  materialsConfirm,
  materialsSign
} from 'api/sohandover'
export default {
  data() {
    return {
      list: {},
      mes: {},
      message: '操作成功',
      btn_materialsConfirm: true,
      btn_signConfirm: true,
      mhId: '',
      warehouse: {},
      production: {},
      ticketno:'',
      orderCode: ''
    }
  },
  methods: {
    _getMaterials(code) {
      this.orderCode = code
      if (this.list.aggregateUserCode) {
        log(this, '物料交接', '已存在相关集料单，确认替换？', this._getList)
      } else {
        this._getList()
      }
    },
    // 获取物料
    _getList() {
      this.ticketno = this.orderCode
      const data = { aggregateCode: this.orderCode }
      getMaterials(data).then(res => {
        if (res.status === 1) {
          let nwelist = res.result
          nwelist.soAggregateDetailEntityList.forEach(item => {
            this.$set(item, 'isDisabled', true)
          })
          this.list = nwelist
          this.warehouse.NAMECODE = res.result.hairfeedUserCode
          this.warehouse.NAME = res.result.hairfeedUserName
          this.production.NAMECODE = res.result.receivingCode
          this.production.NAME = res.result.receivingName
        } else {
          this.showPopup('myPopup', res.errorMsg)
        }
        this.$refs.lists._getquerywomaterialconsbyticket(this.ticketno)
      })
    },
    // 发料确认
    _materialsConfirm() {
      this.btn_materialsConfirm = true
      if (!this.list.aggregateCode) {
        return
      }
      if (this.list.confirmationStatus === 2) {
        this.showPopup('myPopup', '此集料单已经确认收料')
        return
      }
      if (!this.warehouse.CODE) {
        this.showPopup('myPopup', '请先扫描员工卡')
        return
      }
      this.handleMes()
      materialsConfirm([this.list]).then(res => {
        this.showPopup('myPopup', res.errorMsg)
        if (res.status === 1) {
          this.list.confirmationStatus = 1
        } else {
          this.btn_materialsConfirm = false
        }
      })
    },
    // 收料确认
    _signConfirm() {
      this.btn_signConfirm = true
      if (!this.list.aggregateCode) {
        return
      }
      if (this.list.confirmationStatus === 0) {
        this.showPopup('myPopup', '仓库未确认，请先发料')
        return
      } else if (this.list.confirmationStatus === 2) {
        this.showPopup('myPopup', '此集料单已经确认收料')
        return
      }
      if (!this.production.CODE) {
        this.showPopup('myPopup', '请先扫描员工卡')
        return
      }
      this.list.receivingCode = this.production.NAMECODE
      this.list.receivingName = this.production.NAME
      materialsSign([this.list]).then(res => {
        this.showPopup('myPopup', res.errorMsg)
        if (res.status === 1) {
          this.list.confirmationStatus = 2
        } else {
          this.btn_signConfirm = false
        }
      })
    },
    // 处理发料确认参数
    handleMes() {
      this.list.hairfeedUserCode = this.warehouse.NAMECODE
      this.list.hairfeedUserName = this.warehouse.NAME
    },
    _getNfc(code) {
      getNfc({ nfcNo: code }).then(res => {
        if (res.result.start !== 200) {
          this.showPopup('myPopup', '未找到相关人员信息')
          return
        }
        if (!res.result.mes.CODE) {
          this.showPopup('myPopup', '未找到相关人员信息')
          return
        }
        if (res.result.code === 0) {
          if (this.list.confirmationStatus !== 2) {
            this.btn_materialsConfirm = false
            this.btn_signConfirm = false
          }
          this.warehouse = res.result.mes
          this.production = res.result.mes
          this.list.soAggregateDetailEntityList.forEach(item => {
            this.$set(item, 'isDisabled', false)
          })
        } else {
          if (res.result.mes.ORG.split(",").indexOf("llEwFREIU4Q5RpQh") != -1 || res.result.mes.ORG.split(",").indexOf("VVgMAMUIEtt8IR1o") !=-1 || res.result.mes.ORG === "10110") {
            if (this.list.confirmationStatus !== 2) {
              this.btn_materialsConfirm = false
            }
            this.warehouse = res.result.mes
            this.list.soAggregateDetailEntityList.forEach(item => {
              this.$set(item, 'isDisabled', false)
            })
          } else {
            if (this.list.confirmationStatus !== 2) {
              this.btn_signConfirm = false
            }
            this.production = res.result.mes
          }
        }  
      })
    },
    // 处理缓存数据
    handleBack() {
      this.list = {}
    },
    showPopup(refId, message = '操作成功') {
      const component = this.$refs[refId]
      this.message = message
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1000)
    }
  },
  components: {
    List,
    FooterOper,
    VHeader
  }
}
</script>

<style lang='stylus' scoped>
@import '~common/style/common.styl'

.production 
  position: fixed
  bottom: 110px
  box-sizing: border-box
  padding: 0 10px
  font-size: 14px
  line-height: 35px
  width: 100%
  background: #fff
  .pro 
    display: flex
    margin-top: 10px
    .desc 
      flex: 1
      border: 1px solid #e6e6e6
      padding-left: 5px
      background: #fff
      margin-left: 10px
      border-radius: 4px

.cube-popup 
  .my-message 
    padding: 20px
    color: #fff
    background-color: rgba(0, 0, 0, 0.8)

.pad-botm 
  padding-bottom: 100px !important

.btn_div 
  display: flex
  width: 100%
  justify-content: space-between
  margin-left: 5px
  margin-right: 5px
  .btn_col 
    width: 45%

.btn_style 
  height: 10px
  line-height: 1px
</style>