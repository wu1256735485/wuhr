<template>
  <div class="ticket">
    <h1 class="title">
      <span>工票总数:&nbsp;&nbsp;3</span>
      <div class="check">
        <cube-checkbox 
        v-model="checked" 
        :hollow-style="true"
        @input="checkUnit"
        >全选</cube-checkbox>
      </div>
    </h1>
    <div class="ol-top">
      <cube-scroll :data="ticketList" ref="scroll" :options="scrollOption">
        <cube-checkbox-group 
          v-model="checkList" 
          :options="options"
          @checked="selected"
          @cancel-checked="cancelSelected"
        >
          <ul class="personal" v-for="item in ticketList">
            <li class="unit">
              <span class="desc">工票号:&nbsp;&nbsp;{{item.number}}</span>
              <cube-checkbox :option="item.quantity" shape="square" position="right">选择</cube-checkbox>
            </li>
            <li class="unit">
              <span class="desc">件号:&nbsp;&nbsp;{{item.item}}</span>
            </li>
            <li class="unit">
              <span class="desc">车号:&nbsp;&nbsp;{{item.workshopNumber}}</span>
            </li>
            <li class="unit">
              <span class="desc">合同号:&nbsp;&nbsp;{{item.quantity}}</span>
            </li>
            <li class="unit">
              <span class="change-desc">
                数量:&nbsp;&nbsp;
              </span>
              <span class="input-desc">
                <cube-input v-model="item.quantity"></cube-input>
              </span>
            </li>
            <li class="unit">
              <span class="change-desc">
                完工百分比:&nbsp;&nbsp;
              </span>
              <span class="input-desc">
                <cube-input v-model="item.quantity"></cube-input>
              </span>
            </li>
          </ul>
        </cube-checkbox-group>
      </cube-scroll>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 工票信息列表
    ticketList: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollOption: {
        scrollbar: true
      },
      checked: false,
      checkList: [],
      options: []
    }
  },
  created() {
    this.ticketList.map((item) => {
      this.options.push({
        label: '选择',
        value: item.quantity
      })
    })
  },
  methods: {
    checkUnit(status) {
      if (status) {
        this.checkList = []
        this.ticketList.map((item) => {
          this.checkList.push(item.quantity)
        })
        this.$emit('selectallticket', this.checkList)
      } else {
        this.checkList = []
      }
    },
    // 选中
    selected(val) {
      this.$emit('ticketselected', val)
      setTimeout(() => {
        this.checked = this.ticketList.length === this.checkList.length ? !this.checked : this.checked
      }, 20)
    },
    // 取消选中
    cancelSelected(val) {
      this.checked = false
      this.$emit('ticketcancel', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.ticket
  height 60%
  .title
    display flex
    line-height 45px
    height 45px
    & > span 
      flex 1
      font-weight bold
      font-size 16px
  .ol-top
    height 82%
    padding-bottom 10px
    .personal
      width 100%
      height 100%
      box-sizing border-box
      padding-bottom 10px
      border-bottom 1px solid #999
      .unit
        display flex
        height 39px
        line-height 39px
        margin 5px 0;
        font-size 14px
        padding-left 5px
        .desc
          flex 1
          display inline-block
        .input-desc
          display inline-block
</style>
