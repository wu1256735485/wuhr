<template>
  <div>
    <div class="common-ticket common-active" v-show="obj.orderNo">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{obj.orderNo}}</span>
          </p>
          <p class="child">
            <span class="desc">件号:</span>
            <span class="desc">{{obj.partNo}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">日期:</span>
            <span class="desc">{{obj.revisedStringStartDate}}</span>
          </p>
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{obj.trainPartNo}}/{{obj.trainNo}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">总工艺工时:</span>
            <span
              class="desc"
            >{{obj.operatTime}}</span>
          </p>
          <p class="child">
            <span class="desc">工单状态:</span>
            <span
              class="desc"
            >{{obj.orderStatus}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket" v-for="ele in list" v-show="list.length">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">工票号:</span>
            <span class="desc">{{ele.ticketCode}}</span>
          </p>
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{ele.quantity}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">状态:</span>
            <span
              class="desc"
            >{{ele.ticketStatus == '10' ? '待开工' : ele.ticketStatus == '20' ? '开工中' : ele.ticketStatus == '30' ? '暂停' : '已完工'}}</span>
          </p>
          <p class="child">
            <span class="desc">齐套性:</span>
            <span
              class="desc"
            >{{ele.materstatus == '0' ? '不带料' : ele.materstatus == '10' ? '缺料' : '齐套'}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">缺料数量:</span>
            <span class="desc">{{ele.qtyShort}} <img v-show="ele.qtyShort > 0" src="static/complete@2x.png" alt @click.stop="routerGo('lack', ele.ticketCode)" /></span>
          </p>
          <p class="child">
            <span class="desc">工艺工时:</span>
            <span class="desc">{{ele.machTime}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{ele.orderNo}}</span>
          </p>
          <p class="child">
            <span class="desc">工区:</span>
            <span class="desc">{{ele.workCenterNo}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">报告数量:</span>
            <span class="desc">{{ele.finishPer == '100'?ele.quantity:ele.productionQuantity}}</span>
          </p>
          <p class="child">
            <span class="desc">百分比:</span>
            <span class="desc">{{ele.finishPer}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">开工时间:</span>
            <span class="desc">{{ele.startTime}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">报工时间:</span>
            <span class="desc">{{ele.newsTime}}</span>
          </p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    obj: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    // 路由跳转
    routerGo(hash, code) {
      this.$router.push({
        name: hash,
        params: { ticketCode: code }
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.images
 width 25px
 height 25px
</style>