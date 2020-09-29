<template>
  <div ref="ticket">
    <div class="common-ticket" v-for="(item, index) in list" :key="item.TID">
      <div class="ticket-unit ticket-div">
        <li class="unit">
          <p class="child" @click.stop="ticketInfo(item.TICKETCODE)">
            <span class="desc">工票号:</span>
            <span class="desc">{{item.TICKETCODE}}</span>
          </p>
          <p class="child" @click.stop="handleInfos(item.CARNO,item.TRAINNO)">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{item.CARNO}}/{{item.TRAINNO}}</span>
          </p>
        </li>
        <li class="unit border">
          <p class="child" @click.stop="partoInfo(item.OARTNO)">
            <span class="desc">件号:</span>
            <span class="desc">{{item.OARTNO}}</span>
          </p>
          <p class="child" @click.stop="handleInfo(item.PARTDES)">
            <span class="desc">件描述:</span>
            <span class="desc">{{item.PARTDES}}</span>
          </p>
        </li>
        <li class="unit" v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{item.REPNUM}}</span>
          </p>
          <p class="child">
            <span class="desc">工艺工时:</span>
            <span class="desc">{{item.MACHTIME}}</span>
          </p>
        </li>
        <li class="unit border" v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">工艺变更:</span>
            <span class="desc" v-if="item.PROCHANG == 0 && item.pictureStart == 1" @click="handleChanges(item)">
              <img src="static/change_w.png" alt />
            </span>
            <span class="desc" v-else-if="item.pictureStart == 0">
              <img src="static/change_no.png" alt />
            </span>
            <span class="desc" v-else-if="item.pictureStart == 1" @click="handleChanges(item)">
              <img src="static/change@2x.png" alt />
            </span>
          </p>
          <p class="child">
            <span class="desc">工区:</span>
            <span class="desc">{{item.WORKCENTNO}}</span>
            <span class="radius">{{index + 1}}</span>
          </p>
        </li>
        <li class="unit" v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">订单状态:</span>
            <span v-if="item.ORDERSTATUS == 'Parked'" class="desc"  style="color:red">{{item.ORDERSTATUS}}</span>
            <span v-else class="desc">{{item.ORDERSTATUS}}</span>
          </p>
        </li>
        <li class="unit" v-show="currentIndex !== index">
          <p class="child">
            <span class="desc">工序描述:</span>
            <span class="desc">{{item.OPERATIONDESC}}</span>
          </p>
        </li>
        <div class="img_div">
          <img
            class="image"
            :src="item.STA === 10 ?
            'static/wait.png' : item.STA == 20 ?
            'static/start@2x.png' : item.STA == 30 ?
            'static/stop@2x.png' : 'static/completed@2x.png'"
          />
        </div>
      </div>
      <div class="ticket-operation">
        <span class="oper">
          <img src="static/collapse@2x.png" alt @click.stop="handleIsClose(index, $event)" />
        </span>
        <!-- <span class="oper-img">
        <img 
          :src="item.STA === 10 ?
          'static/wait.png' : item.STA == 20 ?
          'static/start@2x.png' : item.STA == 30 ?
          'static/stop@2x.png' : 'static/completed@2x.png'" 
        >
        </span>-->
        <span class="oper-img" v-show="item.STA == 10">
          <img src="static/delete.png" alt @click.stop="deleteTicket(index)" />
        </span>
        <span class="oper-img" v-show="item.QTSTART == 10">
          <img src="static/complete@2x.png" alt @click.stop="routerGo('lack', item.TICKETCODE)" />
        </span>
        <span class="oper-img" v-show="item.QTSTART !== 10">
          <img src="static/complete_no.png" alt />
        </span>
        <span class="oper-img" v-show="item.CODE !== 'TRUE'">
          <img src="static/number@2x.png" alt @click.stop="routerGo('match', item.TICKETCODE)" />
        </span>
        <span class="oper-img" v-show="item.CODE == 'TRUE'">
          <img src="static/number_no.png" alt />
        </span>
        <span class="oper-img"  v-if="item.StartMes == 1">
          <img src="static/close@2x.png" alt @click.stop="routerGo('linchpin', item.TICKETCODE)" />
        </span>
        <span class="oper-img" v-else>
          <img src="static/close_no.png" alt />
        </span>
        <span class="oper-img" v-show="item.ISEXISTFILES == 1">
          <img src="static/file@2x.png" alt @click.stop="routerGo('process', item.TICKETCODE)" />
        </span>
        <span class="oper-img" v-show="item.ISEXISTFILES !=1 ">
          <img src="static/file_no.png" alt />
        </span>
        <span class="oper-img" v-show="item.error == 1" @click="handleError(item)">
          <img src="static/error.png" alt />
        </span>
        <span class="oper-img" v-show="item.error != 1">
          <img src="static/error_no.png" alt />
        </span>
      </div>
      <!-- <div class="ticket-status" >
      <img src="static/yes.png" alt="">
      </div>-->
    </div>
  </div>
</template>

<script>
import { log, promptInfo } from 'common/js/dialog'
import { keyButton } from 'api/start'
export default {
  props: {
    list: {
      type: Array,
      default: []
    },
    operation: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      checkList: [],
      currentIndex: -1,
      activeIndex: -1,
      status: false,
      ticketIndex: -1,
      kbut:"",
      Knum:0
    };
  },

  methods: {
    handleInfo(item) {
      promptInfo(this, '件描述', item)
    },
    handleInfos(item,val){
      promptInfo(this, '车号/列号', item +'/'+ val)
    },
    ticketInfo(item){
      promptInfo(this, '工票号', item)
    },
    partoInfo(item) {
      promptInfo(this, '件号', item)
    },
    // 移除工票
    deleteTicket(index) {
      this.ticketIndex = index
      log(this, '开工', '是否移除此工票?', this.removeTicket)
    },
    // 触发移除
    removeTicket() {
      this.$emit('delete-ticket', this.ticketIndex)
    },
    //关键件按钮展示
    Keybutton() {
      if(this.Knum <= this.list.length-1){
          keyButton({ticketCode:this.list[this.Knum].TICKETCODE}).then((res) => {
                    // this.list[this.Knum].StartMes = res.result.startMes
                    this.$set(this.list[this.Knum],'StartMes', res.result.startMes)
                    this.Knum++
                  })
      }else{
        this.Knum = 0
      }
    },
    handleIsClose(index, e) {
      let img = e.target;
      if (this.currentIndex === index) {
        img.setAttribute('src', 'static/collapse@2x.png');
        this.currentIndex = -1;
        return;
      }
      img.setAttribute('src', 'static/expand@2x.png');
      this.currentIndex = index;
    },
    // 变更信息
    handleChanges(item) {
      this.$emit('start-change');
      this.$emit('change-isok',item.TICKETCODE)
      this.$router.push({
        name: 'change',
        params: { data: item, path: 'start' }
      });
    },
    // 路由跳转
    routerGo(hash, code) {
      if (code) {
        this.$router.push({
          name: hash,
          params: { ticketCode: code }
        });
      } else {
        this.$router.push(hash);
      }
    },
    // 异常信息查看
    handleError(item) {
      this.$router.push('/exception/send?' + `numberCode=${item.TICKETCODE}`);
    }
  },
  watch: {
    operation(newVal) {
      if (!newVal) return;
      this.checkList = [];
    },
    list(newVal) {
      this.Keybutton()
      if(!newVal) return
    }
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.radius
  display block
  width 26px
  float right
  text-align center
  line-height 26px
  border 1px solid #3b85e6
  border-radius 13px;
.ticket-active 
  background: #f8fcff !important;
.ticket-div
  position: relative;
.img_div 
  position: absolute;
  top: 0px;
  right: -5px;
  width: 25px;
  height: 25px;
.image
  width: 25px;
  height: 25px;
</style>