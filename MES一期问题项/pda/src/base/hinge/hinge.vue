<template>
  <cube-scroll :data="data" ref="scroll" :options="scrollOptions" class="ticket">
    <cube-checkbox-group 
      v-model="checkList" 
      :options="options"
      @checked="selected"
      @cancel-checked="cancelSelected"
    >
      <ul class="personal" v-for="ele in data" :key="ele.tbdID">
        <li class="unit">
          <span class="desc">序列号:&nbsp;&nbsp;{{ele.sncode}}</span>
          <cube-checkbox :option="ele.tbdID" shape="square" position="right">选择</cube-checkbox>
        </li>
        <li class="unit">
          <span class="desc">批次号:&nbsp;&nbsp;{{ele.snbatch}}</span>
        </li>
        <li class="unit">
          <span class="desc">物料名称:&nbsp;&nbsp;{{ele.materialName}}</span>
        </li>
        <li class="unit">
          <span class="desc">物料编码:&nbsp;&nbsp;{{ele.materialCode}}</span>
        </li>
        <li class="unit">
          <span class="desc">供应商名称:&nbsp;&nbsp;{{ele.supplierCode}}</span>
        </li>
        <li class="unit">
          <span class="desc">是否绑定:&nbsp;&nbsp;{{ele.isBindCriticalPart == '0' ? '未绑定' : '已绑定'}}</span>
        </li>
      </ul>
    </cube-checkbox-group>
  </cube-scroll>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollOptions: {
        scrollbar: true
      },
      options: [],
      checkList: []
    }
  },
  methods: {
    // 选中
    selected(val) {
      console.log(val)
      this.$emit('ticketselected', val)
    },
    // 取消选中
    cancelSelected(val) {
      this.$emit('ticketcancel', val)
    }
  }
}
</script>

<style lang="stylus" scoped>
.ticket
  width 100%
  height 270px
  border-bottom 1px solid #fc9153
  padding-bottom 15px
  .personal
    box-sizing border-box
    border-bottom 1px solid #999
    margin 15px 10px 0 10px
    &:last-child
      border none
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
</style>


