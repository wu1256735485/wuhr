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
      <div v-if='workCenterNokitStatus===2' class="text_div">欠</div>
      <!-- <div v-if='workCenterNokitStatus===0' class="text_div">载</div> -->
      <div v-if='workCenterNokitStatus===1' class="text_div">齐</div>
      </div>
    </div>
    <div class="footer-btn" v-show="list.aggregateCode">
       <div class="btn" 
        :style="{background: currentIndex === 0 ? '#fc9153' : '#666'}"
        @click="handleShow(0,ticketno)"
      >物料交接</div>
       <div class="btn"
        :style="{background: currentIndex === 1 ? '#fc9153' : '#666'}"
        @click="handleShow(1,ticketno)"
      >消耗件</div>
       <div class="btn"
        :style="{background: currentIndex === 2 ? '#fc9153' : '#666'}"
        @click="handleShow(2,ticketno)"
      >非消耗件</div>
    </div>
    <div v-show="currentIndex==0" class="common-ticket order" @click.stop="checkedOrder(index)" v-for="(item, index) in list.soAggregateDetailEntityList" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.materialCode}}</span>
          </p>
        </li>
         <li class="unit">
          <p class="child" @click.stop="handleInfo(item.materialName)">
            <span class="desc">零件描述:</span>
            <span class="desc">{{item.materialName}}</span>
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
            <span class="desc " :class="[item.handoverQuantity < item.demandQuantity ? 'text_color': '']">实际数量({{item.unitCode}}):</span>
            <span class="desc" >
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
    <div v-show ='currentIndex==1' v-for="(item,index) in consbyticket" v-bind:key="item.id">
      <div class="file_item">
        <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">物料名称:</span>
            <span class="desc">{{item.partDescribe}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">物料编码:</span>
            <span class="desc">{{item.partNo}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">数量(需/发):</span>
            <span class="desc">{{item.demandQty}}/{{item.sendQty}}</span>
          </p>
          <p class="child">
            <span class="desc">预留数量:</span>
            <span class="desc">{{item.assignedQty}}</span>
          </p>
        </li>
        <li class="unit">
         <p class="child">
            <span class="desc">物料类型:</span>
            <span class="desc">{{item.partType}}</span>
          </p>
        </li>
         <div v-if='item.kittingStatus==2' class="ticket-status file_bg" style="background: #f00"></div>
         <div v-if='item.kittingStatus==1' class="ticket-status file_bg" style="background: #0F0"></div>
        </div>
        </div>
        <div class="fie_wrappers">
          <div v-for="(item1) in item.materielKittingDTOList" v-bind:key="item1.id">
            <div class="file_items" v-if="item.item_show">               
              <ul class="ticket-unit" >
                <li class="unit">
                  <p class="child">
                    <span class="desc">批次号:</span>
                  <span class="desc">{{item1.snBatch}}</span>
                  </p>
                </li>
                <li class="unit">
                   <p class="child">
                    <span class="desc">序列号:</span>
                    <span class="desc">{{item1.snCode}}</span>
                  </p>
                </li>
                <li class="unit">
                  <p class="child">
                    <span class="desc">数量:</span>
                    <span class="desc">{{item1.quantity}}</span>
                  </p>
                  <p class="child">
                    <span class="desc">状态:</span>
                    <span class="desc">{{item1.materielStatusShow}}</span>
                  </p>
                </li>
              </ul>
            </div>
          </div>
          <div class="po_item2" @click="item_shows(index)">
            <img
              v-if="item.item_show"
              class="image_items"
              src="@/components/warehouse/pOstorage/shou.png"
            />
            <img v-else class="image_items" src="@/components/warehouse/pOstorage/kai.png" />
          </div>
        </div>
    </div>
    <div v-show ='currentIndex==2' class="common-ticket" v-for="(item) in notconsbyticket" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">物料名称:</span>
            <span class="desc">{{item.partDescribe}}</span>
          </p>
        </li>
         <li class="unit">
          <p class="child">
            <span class="desc">物料编码:</span>
            <span class="desc">{{item.partNo}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">需求数量:</span>
            <span class="desc">{{item.demandQty}}</span>
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
import { promptInfo } from 'common/js/dialog'
import { getquerywomaterialnotconsbyaggregateno, getquerywomaterialconsbyaggregateno } from 'common/js/httpConnection'
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    },
    ticketno:''
  },
  data() {
    return {
      order: {},
      currentIndex: 0,
      message: '',
      consbyticket: [],
      workCenterNokitStatus: 0,
      notconsbyticket: [],
      checkedList: []
    }
  },
  methods: {
    // 显示描述数据
    showmaterial (title, msg) {
      this.showdialog(this, title, msg)
    },
    handleInfo(item) {
      promptInfo(this, '零件描述', item)
    },
    // 切换选中背景
    item_shows(index) {
      if (this.consbyticket[index].item_show) {
        this.consbyticket[index].item_show = false
      } else {
        this.consbyticket[index].item_show = true
      }
    },
    // tab切换
    handleShow(index,aggregateNo) {
      this.currentIndex = index
        console.log(aggregateNo)
      if (index==1) {
      //  this._getquerywomaterialconsbyticket(aggregateNo)
      } else if (index==2) {
       this._getquerywomaterialnotconsbyticket(aggregateNo)
      }
    },
     _getquerywomaterialnotconsbyticket(aggregateNo) {
      this.showIndicator(this)
      getquerywomaterialnotconsbyaggregateno({"aggregateno":aggregateNo}).then(response => {
          this.closeIndicator()
          if (response.status === 1) {
            this.notconsbyticket = response.result
          }else {
            this.showToast(this, response.errorMsg)
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
    },
    _getquerywomaterialconsbyticket(aggregateNo) {
      this.showIndicator(this)
      getquerywomaterialconsbyaggregateno({"aggregateno":aggregateNo}).then(response => {
          this.closeIndicator()
          if (response.status === 1) {
            this.consbyticket = response.result
            if(response.result.length===0) {
              this.workCenterNokitStatus=1
            }else {
              this.workCenterNokitStatus=response.result[0].workCenterNokitStatus
            }
          }else {
            this.showToast(this, response.errorMsg)
          }
        })
        .catch(error => {
          this.closeIndicator()
          console.log(error)
          if (error=== 307 || error=== 900 || error=== 403) return
          this.showToast(this, '请求数据失败')
        })
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

.text_color
 color red

.text_div
 position absolute
 bottom  3px
 right 5px
 width 30px
 height 30px
 display flex
 background #ff0
 font-weight bold
 align-content center
 justify-content center
 border 1px solid #3b85e6
 border-radius 15px
 text-align center
 align-items center
 font-size 20px
 color red




.file_item 
  height: auto
  margin-top 5px
  margin-left 10px
  margin-right 10px
  padding-bottom: 3px
  background #ecf8ff
  position: relative
  .ticket-status
    position absolute
    right 5px
    bottom  5px
    & > img
      width 20px
      height 20px
  .ticket-unit
    margin 0 6px
    .unit
      display flex
      font-size 0px
      .child
        flex 1
        line-height 25px
        padding 0 4px
        font-size 14px
        overflow: hidden
        text-overflow: ellipsis
        white-space: nowrap
        
  
.fie_wrappers 
  border: 1px solid rgba(0, 0, 0, 0.1)
  border-radius: 0 0 10px 10px
  margin-left 10px
  margin-right 10px
  .file_items 
    height: auto
    padding-bottom: 3px
    border-bottom:1px solid rgba(0, 0, 0, 0.1)
    position: relative
    .ticket-unit
      margin 0 6px
      .unit
        display flex
        font-size 0px
        .child
          flex 1
          line-height 25px
          padding 0 4px
          font-size 14px
          overflow: hidden
          text-overflow: ellipsis
          white-space: nowrap
          

.po_item2
  display: flex
  align-items: center
  height: 26px

.image_items 
  margin-left 10px
  width: 20px
  height: 20px

.file_bg
 height 20px
 width 20px
 border 1px solid #fff
 border-radius 10px


</style>