<template>
  <div class="lack">
    <div class="common-ticket common-active">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{orderInfo.ORDERNO}}</span>
          </p>
          <p class="child">
            <span class="desc">合同号:</span>
            <span class="desc">{{orderInfo.PROJECTID}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">车号:</span>
            <span class="desc">{{orderInfo.CARNO}}</span>
          </p>
          <p class="child">
            <span class="desc">列号:</span>
            <span class="desc">{{orderInfo.TAAINNO}}</span>
          </p>
        </li>
      </div>
    </div>
    <cube-scroll :data="info" ref="scroll">
      <div class="common-ticket common-back" v-for="item in lackList">
        <div class="ticket-unit">
          <li class="unit">
            <p class="child" @click.stop="showmaterial('零部件号', item.materialName)">
              <span class="desc">零部件号:</span>
              <span class="desc">{{item.materialName}}</span>
            </p>
            <p class="child">
              <span class="desc">零件名称:</span>
              <span class="desc">{{item.materialCode}}</span>
            </p>
          </li>
          <li class="unit">
            <p class="child">
              <span class="desc">需求数量:</span>
              <span class="desc">{{item.demandQuantity}}</span>
            </p>
            <p class="child">
              <span class="desc">已送数量:</span>
              <span class="desc">{{item.sendQuantity}}</span>
            </p>
          </li>
        </div>
      </div>
    </cube-scroll>
  </div>
</template>

<script>
import { lackDetail } from 'api/start';
export default {
  data() {
    return {
      info: [],
      lackList: [],
      orderInfo: {},
      ticketCode: ''
    };
  },
  mounted() {
    this.ticketCode = this.$router.currentRoute.params.ticketCode;
    this._getLackList();
    console.log(this.$refs.scroll);
  },
  methods: {
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    _getLackList() {
      lackDetail({ ticketCode: this.ticketCode }).then(res => {
        this.lackList = res.result.detail;
        this.orderInfo = res.result;
      });
    }
  }
};
</script>

<style lang="stylus" scoped>
.lack {
  z-index: 6;
  background: #fff;
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  bottom: 0px;
  overflow: hidden;
  padding-bottom: 50px;
}
</style>

