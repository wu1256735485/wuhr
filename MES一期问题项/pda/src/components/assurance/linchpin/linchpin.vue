<template>
<div class="linchpin">
  <v-header :title="'关键件管理'" @back="handleBack"></v-header>
  <div class="common-wrapper">
    <div class="common-inside">
      <div class="ticket-wrapper" 
        v-show="!childStatus">
        <ticket :obj="ticket" v-show="ticket.TICKETCODE"></ticket>
      </div>
      <linchpin-list 
        :list="info" 
        @check="selectLinchpin"
        @poschange="handleData"
        @child-index="handleChildList"
        v-show="!childStatus"
      ></linchpin-list>
      <div class="child-wrapper" v-show="childStatus">
        <cube-button @click.stop="handleStatus">收起</cube-button>
        <linchpin-list 
          :list="childList" 
          @check="selectLinchpin"
          @poschange="handlePosData"
          v-show="childStatus"
        ></linchpin-list>
      </div>
    </div>
    <footer-oper @search="_getLinchpin" @read="handleLinchpin">
      <!-- <div class="footer-btn">
        <div class="btn" @click="_binding(0)">绑定</div>
        <div class="btn" @click="_binding(1)">解绑</div>
      </div> -->
    </footer-oper>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
    <cube-loading v-show="hasMore" class="loading"></cube-loading>
  </div>
</div>
</template>

<script>
import Ticket from './ticket'
import VHeader from 'base/v-header/v-header'
import LinchpinList from './linchpin-list'
import FooterOper from 'base/footer-operation/footer'
import { getLinchpin, binding } from 'api/linchpin'
import { responesMode } from 'common/js/config'
import { mapMutations } from 'vuex'

export default {
  data() {
    return {
      list: [],
      ticketCode: '',
      options: [],
      info: [],
      ticket: {},
      selectList: [],
      message: '',
      hasMore: false,
      index: 0,
      childList: [],
      childStatus: false,
      scanInfo: [],
      tid: '' // 工票id
    }
  },
  created() {
    if (!this.$router.currentRoute.params.ticketCode) return
    const code = this.$router.currentRoute.params.ticketCode
    const ticketCode = code ? this.$router.currentRoute.params.ticketCode : this.ticketCode
    if (ticketCode) {
      this._getLinchpin(ticketCode)
    }
  },
  methods: {
    // 扫码获取关键件
    handleLinchpin(data) {
      if (!data) {
        this.showPopup('myPopup', '未扫描到相关信息')
        return
      }
      // data = 'MES-ZS;/NEW;金属软管 D22;青岛松科机电科技有限公司;601M1054;;1000005;NEW;1'
      if (this.info.length) {
        this.scanInfo = data.split(';')
        if (this.scanInfo.length !== 9) {
          this.showPopup('myPopup', '请扫描正确的关键件')
          this.scanInfo = []
        } else {
          const code = this.scanInfo[4]
          if (this.childStatus) {
            this.childList.forEach((item) => {
              if (item.materialCode === code) {
                if (!item.sncode && !item.snbatch) {
                  const sncode = this.scanInfo[1].split('/')
                  item.sncode = sncode[0]
                  item.snbatch = sncode[1]
                  item.supplierName = this.scanInfo[3]  // 3为供应商名称
                }
              } else {
                this.showPopup('myPopup', '关键件物料编码不一致')
              }
            })
          } else {
            this.info.forEach((item) => {
              if (item.materialCode === code) {
                if (!item.sncode && !item.snbatch) {
                  const sncode = this.scanInfo[1].split('/')
                  item.sncode = sncode[0]
                  item.snbatch = sncode[1]
                  item.supplierName = this.scanInfo[3]  // 3为供应商名称
                }
              } else {
                this.showPopup('myPopup', '关键件物料编码不一致')
              }
            })
          }
        }
      } else {
       this._getLinchpin(data) 
      }
    },
    // 获取关键件
    _getLinchpin(code) {
      if (!code) return
      this.hasMore = true
      getLinchpin({ticketCode: code}).then((res) => {
        this.hasMore = false
        if (res.status === responesMode.ERR_OK) {
          if (!res.result.ticketInfo) {
            this.showPopup('myPopup', '未找到相关工票信息')
            return
          }
          this.ticket = res.result.ticketInfo
          this.info = res.result.ticketBindingParts
          setTimeout(() => {
            this.setIsSelect(false)
          }, 600)
        } else {
          if (!res.ticketBindingParts.length) {
            this.showPopup('myPopup', '未找到相关信息')
          }
        }
      })
    },
    handleChildList(index) {
      this.childList = this.info[index].childBind
      this.childStatus = true
    },
    // 绑定/解绑
    _binding(status) {
      if (!this.ticket.TICKETCODE) {
        this.showPopup('myPopup', '请先扫描相关工票')
        return
      }
      // if (!this.selectList.length) {
      //   this.showPopup('myPopup', '请先选择要绑定/解绑的关键件')
      //   return
      // }
      let data = {bind: []}
      data.start = status
      data.tid = this.ticket.TID
      // this.selectList.forEach((item) => {
      this.info.forEach((child) => {
        if (child.childBind.length) {
          child.childBind.forEach((item) => {
            data.bind.push({
              pid: item.tbpId,
              sncode: item.sncode,
              snbatch: item.snbatch,
              position: item.position,
              supplierName: item.supplierName
            })
          })
        }
        data.bind.push({
          pid: child.tbpId,
          sncode: child.sncode,
          snbatch: child.snbatch,
          position: child.position,
          supplierName: child.supplierName
        })
      })
      binding(data).then((res) => {
        if (res.status === responesMode.ERR_OK) {
          this.showPopup('myPopup', '操作成功')
          this.selectList = []
          this.setIsSelect(true)
          this._getLinchpin(this.ticket.TICKETCODE)
        } else {
          this.showPopup('myPopup', '操作失败')
        }
      })
    },
    // 选中关键件
    selectLinchpin(list) {
      this.selectList = list
    },
    // 处理序列号数据
    handleData(index, val) {
      this.info[index].position = val[0]
    },
    handlePosData(index, val) {
      this.childList[index].position = val[0]
    },
    // 处理缓存数据
    handleBack() {
      this.ticket = {}
      this.info = []
    },
    handleStatus() {
      this.childStatus = false
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 2000)
    },
    ...mapMutations({
      setIsSelect: 'SET_IS_SELECT'
    })
  },
  components: {
    Ticket,
    LinchpinList,
    FooterOper,
    VHeader
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
  .child-wrapper
    height 100%
    overflow hidden
  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)
</style>
