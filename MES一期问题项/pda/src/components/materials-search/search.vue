<template>
  <div>
    <div class="common-ticket common-active" v-show="record.AGGREGATECODE">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">领料单号:</span>
            <span class="desc">{{record.AGGREGATECODE}}</span>
          </p>
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{record.ORDERNO}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">合同号:</span>
            <span class="desc">{{record.PROJECTCODE}}</span>
          </p>
          <p class="child">
            <span class="desc">预留种类:</span>
            <span class="desc">{{record.cateCount}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">车号:</span>
            <span class="desc">{{record.CARNO}}</span>
          </p>
          <p class="child">
            <span class="desc">列号:</span>
            <span class="desc">{{record.TRAINNO}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">工区:</span>
            <span class="desc">A</span>
          </p>
          <p class="child">
            <span class="desc">确认情况:</span>
            <span class="desc">{{record.BILLSTATUS == 0 ? '未完成' : record.BILLSTATUS == '10' ? '集料完成' : '物料交接完成'}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket" v-for="item in list" v-show="list.length">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.PARTNO}}</span>
          </p>
          <p class="child">
            <span class="desc">零件描述:</span>
            <span class="desc">{{item.PARTDESCRIBE}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">需求数量:</span>
            <span class="desc">{{item.DEMANDQUANTITY}}</span>
          </p>
          <p class="child">
            <span class="desc">预留数量:</span>
            <span class="desc">{{item.ASSIGNEDQTY}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">实际数量:</span>
            <span class="desc">{{item.ACTUALQUANTITY}}</span>
          </p>
          <p class="child">
            <span class="desc">库位:</span>
            <span class="desc">{{item.INVENTORYLOCATION}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">批次号:</span>
            <span class="desc">{{item.PCH}}</span>
          </p>
          <p class="child">
            <span class="desc">序列号:</span>
            <span class="desc">{{item.SNCODE}}</span>
          </p>
        </li>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    record: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
</style>