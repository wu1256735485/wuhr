<template>
  <div>
    <div class="common-ticket" v-for="item in list">
      <div class="ticket-unit ticket-div" @click.stop="handleChecked(item)">
        <li class="unit">
          <p class="child">
            <span class="desc">工票号:</span>
            <span class="desc">{{item.ticketCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.partNo}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">车号:</span>
            <span class="desc">{{item.carNo}}</span>
          </p>
          <p class="child">
            <span class="desc">列号:</span>
            <span class="desc">{{item.trainNo}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">零件描述:</span>
            <span class="desc">{{item.partDes}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc">生产开工时间:</span>
            <span class="desc">{{item.productionTime}}</span>
          </p>
        </li>
        <div class="img_div">
          <img
            class="image"
            :src="item.ticStart == 10 ?
            'static/wait.png' : item.ticStart == 20 ?
            'static/start@2x.png' : item.ticStart == 30 ?
            'static/stop@2x.png' : 'static/completed@2x.png'"
          />
        </div>
        <img src="static/yes.png" alt="" class="selected"
          v-show="handleShow(item)"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      checkList: []
    }
  },
  methods: {
    // 选中与否
    handleChecked(item) {
      const index = this.findId(item.tid)
      if (index >= 0) {
        this.checkList.splice(index, 1)
      } else {
        if (this.checkList.length) {
          if (this.checkList[0].pno === item.pno) {
            this.checkList.push(item)
            this.$emit('checked-list', this.checkList)
          } else {
            this.$emit('is-checked')
          }
        } else {
          this.checkList.push(item)
          this.$emit('checked-list', this.checkList)
        }
      }
    },
    // 检索当前工票是否选中
    handleShow(item) {
      const index = this.findId(item.tid)
      if (index >= 0) {
        return true
      } else {
        return false
      }
    },
    // 检索工票Id
    findId(id) {
      if (!this.checkList.length) {
        return -1
      }
      const index = this.checkList.findIndex((item) => {
        return id === item.tid
      })
      return index
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl'
.ticket-active 
  background: #f8fcff !important;
.ticket-div
  position: relative;
.img_div 
  position: absolute;
  top: 0px;
  right: 18px;
  width: 25px;
  height: 25px;
.image
  width: 25px;
  height: 25px;
.selected
  width 20px
  height 20px
  position absolute
  top 0px
  right -5px
</style>