<template>
  <div>
    <div class="common-ticket common-active" v-show="order.orderNo">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{order.orderNo}}</span>
          </p>
          <p class="child">
            <span class="desc">项目号:</span>
            <span class="desc">{{order.projectCode}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">列号:</span>
            <span class="desc">{{order.trainNo}}</span>
          </p>
          <p class="child">
            <span class="desc">车号:</span>
            <span class="desc">{{order.carNo}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="common-ticket" v-for="(item,index) in list" v-show="list.length" v-bind:key="item.id">
      <div class="ticket-unit" @click="getischeck(index)">
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.partNo}}</span>
          </p>
          <p class="child">
            <span class="desc">类型:</span>
            <span class="desc">{{item.ifsType}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child" @click.stop="handleInfo(item.partDescribe)">
            <span class="desc">零件描述:</span>
            <span class="desc">{{item.partDescribe}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">入库数量({{item.finishQty}}/{{item.requiredQty}}):</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                v-model="item.qtyReceived"
                @keyup="handleReceive(item)"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc">库位:</span>
            <span class="desc">
              <input
                type="text"
                class="input_text child-text"
                @click.stop
                v-model="item.locationCode"
              />
            </span>
            <!-- :disabled="isDisabled && index === currentIndex" -->
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">条件代码:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                :disabled="item.conditionCodeUsage == 0"
                v-model="item.conditionCode"
                @focus="handleCondition(index)"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc">里程数:</span>
            <span class="desc">
              <input
                class="child-text"
                type="number"
                v-model="item.operationalData"
                :disabled="item.orderCode !== 'B'"
              />
            </span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">处置代码:</span>
            <span class="desc">
              <input
                type="text"
                class="input_text child-text"
                @click.stop
                @focus="handleSelect(index, 'code')"
                v-model="item.dispositionCode"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc">报废原因:</span>
            <span class="desc">{{item.scrapReasonName}}</span>
          </p>
        </li>
        <li class="unit border">
          <div class="li_div">
            <p class="child">
              <span class="desc">序列号:</span>
              <span class="desc">
                <input
                  type="text"
                  v-model="item.serialNo"
                  class="input_div_text child-text"
                  :disabled="item.serialTracking==0"
                />
              </span>
            </p>
            <p class="child">
              <span class="desc">批次号:</span>
              <span class="desc">
                <input
                  type="text"
                  class="input_div_text child-text"
                  v-model="item.lotBatchNo"
                  :disabled="item.lotTracking==0"
                />
              </span>
            </p>
          </div>
          <div class="div_img" @click.stop="getscanning(index)">
            <img src="static/xscanning.png" />
          </div>
        </li>
        <div class="ticket-status" v-show="item.itemChecked">
          <img src="static/yes.png" alt />
        </div>
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
import { promptInfo } from 'common/js/dialog'
const _SCRAP_ = 'SCRAP' // 报废
const _DISPOSE_ = 'DISPOSE' // 检修
const _SCRRET_ = 'SCR-RET' // 报废保留
const _TBDECIDED_ = 'TB-DECIDED' // 待处理

export default {
  props: {
    order: {
      type: Object,
      default: () => {}
    },
    list: {
      type: Array,
      default: () => []
    },
    codeList: {
      type: Array,
      default: () => []
    },
    pauseList: {
      type: Array,
      default: () => []
    },
    isDisabled: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      msgtitle: '',
      message: '',
      conditionList: [], // 条件代码列表
      currentIndex: -1, // 当前被点击选项的下标
      type: 'code' // 当前picker组件所初始化的数据是处置代码列表或者是报废原因列表
    }
  },
  methods: {
    // 过长字段详情展示
    handleInfo(item) {
      promptInfo(this, '零件描述', item)
    },
    getscanning(index) {
      this.$emit('scanning', index)
    },
    handleCondition(index) {
      this.conditionList = this.list[index].condCodeList
      this.handleSelect(index, 'condition')
    },
    // 下拉框
    handleSelect(index, type) {
      let data = []
      this.type = type
      if (type === 'code') {
        data = this.codeList
        this.msgtitle = '处置代码'
      } else if (type === 'pause') {
        data = this.pauseList
        this.msgtitle = '报废原因'
      } else {
        data = this.conditionList
        this.msgtitle = '条件代码'
      }
      this.picker = this.$createPicker({
        title: this.msgtitle,
        alias: {
          value: 'key',
          text: 'value'
        },
        data: [data],
        onSelect: this.selectHandle
      })
      const dataType = typeof index
      if (dataType === 'number') {
        this.currentIndex = index
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      if (selectedVal[0] === _SCRAP_) {
        setTimeout(() => {
          this.handleSelect(this.currentIndex, 'pause')
        }, 300)
      }
      this.$emit(
        'location-code',
        this.currentIndex,
        selectedVal,
        this.type,
        selectedText
      )
    },
    handleReceive(item) {
      if (item.qtyReceived > item.pendingQty) {
        item.qtyReceived = 0
        this.showPopup(
          'myPopup',
          `入库数量不可大于待入库数量${item.pendingQty}`
        )
        return
      }
    },
    getischeck(index) {
      if (this.list[index].itemChecked) {
        this.list[index].itemChecked = false
      } else {
        this.list[index].itemChecked = true
      }
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 2000)
    }
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
.input_text 
  width: 80px !important
.li_div 
  width: 85%
.input_div_text 
  width: 80% !important
.div_img 
  display: flex
  justify-content: center
  align-items: center
  width: 15%
  height: 50px
</style>
