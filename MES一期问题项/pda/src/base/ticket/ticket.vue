<template>
<div class="ticket">
  <ul class="personal" v-for="item in ticket" :key="item.TID">
    <li class="unit">
      <span class="desc">工票号:&nbsp;&nbsp;{{item.TICKETCODE}}</span>
    </li>
    <li class="unit">
      <span class="desc">件号:&nbsp;&nbsp;{{item.REPNUM}}</span>
    </li>
    <li class="unit">
      <span class="desc">车号/列号:&nbsp;&nbsp;{{item.CARNO}}/{{item.TRAINNO}}</span>
    </li>
    <li class="unit">
      <span class="desc">描述:&nbsp;&nbsp;{{item.PARTDES}}</span>
    </li>
  </ul>
</div>
</template>

<script>
export default {
  props: {
    ticket: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      checkList: [],
      scrollOption: {
        scrollbar: true
      },
      options: []
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" scoped>
  .ticket
    height 45%
    .personal
      width 100%
      height 100%
      box-sizing border-box
      padding-left 15px
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
</style>