<template>
  <div>
    <div class="common-ticket common-active" v-show="list.aggregateCode">
      <div class="ticket-unit ticket-div">
        <li class="unit" >
          <p class="child">
            <span class="desc">领料单号:</span>
            <span class="desc" @click.stop="showmaterial('领料单号', list.aggregateCode)">{{list.aggregateCode}}</span>
          </p>
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{list.orderNo}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">合同号:</span>
            <span class="desc">{{list.projectCode}}</span>
          </p>
          <p class="child">
            <span class="desc">预留种类:</span>
            <span class="desc">{{list.reservedCategoryCount}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{list.carNo}}/{{list.trainNo}}</span>
          </p>
          <p class="child">
            <span class="desc">工区:</span>
            <span class="desc">{{list.workCenterNo}}</span>
          </p>
        </li>
        <div class="img_div">
        <img class="image"
          :src="list.confirmationStatus === 0 ?
          'static/double.png' : list.confirmationStatus === 1 ?
          'static/single.png' : list.confirmationStatus === 2 ?
          'static/two.png' : 'static/double.png'" 
        >
      </div>
      </div>
    </div>
    <div class="common-ticket order"
      @click.stop="checkedOrder(index)"
      v-for="(item, index) in list.soAggregateDetailEntityList"
    >
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.materialCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">零件描述:</span>
            <span class="desc" @click.stop="showmaterial('零件描述', item.materialName)">{{item.materialName}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">需求数量({{item.unitCode}}):</span>
            <span class="desc">{{item.demandQuantity}}</span>
          </p>
          <p class="child">
            <span class="desc">预留数量({{item.unitCode}}):</span>
            <span class="desc">{{item.assignedQty}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">实际数量({{item.unitCode}}):</span>
            <span class="desc">
              <input type="text" class="child-text" 
                :disabled="item.isDisabled"
                v-model="item.handoverQuantity"
                @keyup="handleCount(item)"
              >
            </span>
          </p>
          <p class="child">
            <span class="desc">库位:</span>
            <span class="desc">{{item.locationCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">批次号:</span>
            <span class="desc">{{item.snBatch}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">序列号:</span>
            <span class="desc">{{item.snCode}}</span>
          </p>
        </li>
      </div>
    </div>
    <cube-popup type="my-popup" :mask="false" ref="myPopup">
      <div class="cube-popup-message">
        <slot>{{message}}</slot>
      </div>
    </cube-popup>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      order: {},
      message: '',
      checkedList: []
    }
  },
  methods: {
    // 显示描述数据
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    checkedOrder(index) {
      const orderIndex = this.checkedList.findIndex((item) => {
        return item === index
      })
    },
    handleCount(item) {
      if (item.handoverQuantity > item.aggregateQuantity) {
        this.showPopup('myPopup', `实际数量不可大于发料数量${item.aggregateQuantity}`)
        item.handoverQuantity = 0
        return
      }
      this.$emit('change', this.list)
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
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
  .active-ticket
   background #fafdff
  .cube-my-popup
    .cube-popup-message
      color #fff
      padding 20px
      background rgba(0, 0, 0, .8)

.ticket-div
 position relative
.img_div
 position absolute
 top 0px
 right 5px
 width 25px
 height 25px
.image
  width 25px
  height 25px
</style>