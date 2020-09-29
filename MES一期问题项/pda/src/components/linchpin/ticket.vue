<template>
  <div>
    <div class="common-ticket common-active">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">工票号:</span>
            <span class="desc">{{obj.TICKETCODE}}</span>
          </p>
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{obj.CARNO}}/ {{obj.TRAINNO}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">件号:</span>
            <span class="desc">{{obj.OARTNO}}</span>
          </p>
          <p class="child">
            <span class="desc">件描述:</span>
            <span class="desc">{{obj.PARTDES}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{obj.REPNUM}}</span>
          </p>
          <p class="child">
            <span class="desc">工艺工时:</span>
            <span class="desc">{{obj.MACHTIME}}</span>
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
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
</style>