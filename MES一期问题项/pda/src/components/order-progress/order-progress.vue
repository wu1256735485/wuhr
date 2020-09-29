<template>
<div>
  <v-header :title="'订单进度查询'"></v-header>
  <div class="common-wrapper">
    <div class="common-side">
      <div class="ticket-wrapper">
        <order-list :obj="item" :list="list"></order-list>
      </div>
    </div>
    <footer-oper @search="_getOrder" @read="handleOrder"></footer-oper>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</div>
</template>

<script>
import orderList from './order-list'
import VHeader from 'base/v-header/v-header'
import FooterOper from 'base/footer-operation/footer'
import { getOrderProgress } from 'api/orderProgress'
export default {
  data() {
    return {
      list: [],
      item: {},
      message: ''
    }
  },
  methods: {
    handleOrder(data) {
      if (!data) {
        this.showPopup('myPopup', '未扫描到工票信息')
        return
      }
      this._getOrder(data)
    },
    _getOrder(code) {
      getOrderProgress({workNo: code}).then((res) => {
        if (res.result.start === 200) {
          this.list = res.result.ticket
          this.item = res.result.order
        } else {
          this.showPopup()
        }
      })
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 1500)
    }
  },
  components: {
    orderList,
    FooterOper,
    VHeader
  }
}
</script>

<style lang="stylus" scoped>
  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)
</style>