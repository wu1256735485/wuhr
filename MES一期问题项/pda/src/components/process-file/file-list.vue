<template>
  <div>
    <div class="common-ticket common-active" v-show="list.ticketCode">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child" @click.stop="handleInfo('工票号',list.ticketCode)">
            <span class="desc">工票号:</span>
            <span class="desc">{{list.ticketCode}}</span>
          </p>
          <p class="child">
            <span class="desc">车号/列号:</span>
            <span class="desc">{{list.trainPartNo}}/{{list.trainNo}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">件号:</span>
            <span class="desc">{{list.partNo}}</span>
          </p>
          <p class="child" @click.stop="handleInfo('件描述',list.partDescription)">
            <span class="desc">件描述:</span>
            <span class="desc">{{list.partDescription}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">数量:</span>
            <span class="desc">{{list.count}}</span>
          </p>
          <p class="child">
            <span class="desc">工艺工时:</span>
            <span class="desc">{{list.operatTime}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child" @click.stop="showmaterials('工序描述',list.operationDesc)">
            <span class="desc">工序描述:</span>
            <span class="desc">{{list.operationDesc}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="footer-btn" v-show="list.ticketCode">
      <!-- <div class="btn" 
        :style="{background: currentIndex === 0 ? '#fc9153' : '#666'}"
        @click="handleShow(0)"
      >工艺文件</div>
      <div class="btn"
        :style="{background: currentIndex === 1 ? '#fc9153' : '#666'}"
        @click="handleShow(1)"
      >作业描述</div>
      <div class="btn"
        :style="{background: currentIndex === 2 ? '#fc9153' : '#666'}"
        @click="handleShow(2)"
      >物料</div> -->
       <div class="btn" 
        :style="{background: currentIndex === 0 ? '#fc9153' : '#666'}"
        @click="handleShow(0,ticketno)"
      >文件</div>
      <div class="btn"
        :style="{background: currentIndex === 1 ? '#fc9153' : '#666'}"
        @click="handleShow(1,ticketno)"
      >作业</div>
      <div class="btn"
        :style="{background: currentIndex === 2 ? '#fc9153' : '#666'}"
        @click="handleShow(2,ticketno)"
      >物料</div>
       <div class="btn"
        :style="{background: currentIndex === 3 ? '#fc9153' : '#666'}"
        @click="handleShow(3,ticketno)"
      >消耗</div>
       <div class="btn"
        :style="{background: currentIndex === 4 ? '#fc9153' : '#666'}"
        @click="handleShow(4,ticketno)"
      >非消耗</div>
    </div>
    <div v-show="currentIndex==0" class="common-ticket" v-for="item in list.proDoc" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit_li">
          <p class="child_m">
            <span class="text_spanm">文件名称:</span>
            <span class="text_pm">{{item.docCode}}</span>
          </p>
        </li>
        <li class="unit">
          <!-- <p class="child">
            <span class="desc">是否加密:</span>
            <span class="desc">{{item.start === '1' ? '不加密' : '加密'}}</span>
          </p>-->
           <p class="child">
            <span class="desc">文件类型:</span>
            <span class="desc">{{item.type}}</span>
          </p>
          <p class="child"> 
            <span class="desc">文件版本:</span>
            <span class="desc">{{item.docRev}}</span>
          </p>
        </li>
         <li class="unit">
          <p class="child">
            <span class="desc">文件类别:</span>
            <span class="desc">{{item.docClass}}</span>
          </p>
          <p class="child">
            <img src="static/see.png" alt @click.stop="handleDowload(item)" />
          </p>
        </li>
      </div>
    </div>
    <div v-show ='currentIndex==1' class="common-ticket" v-for="item in list.guideline" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit" v-show="item.dataSource===0">
          <p class="child">
            <span class="desc">导引序号:</span>
            <span class="desc">{{item.guidelineSEQ}}</span>
          </p>
          <p class="child">
            <span class="desc">导引详情:</span>
            <span class="desc">{{item.guidelineName}}</span>
          </p>
        </li>
        <li class="unit_li">
          <p class="child_p" @click.stop="showmaterial(item.guidelineText)">
            <span class="text_span" v-show="item.dataSource===0">导引描述:</span>
            <span class="text_span" v-show="item.dataSource===1">MRO订单问题描述:</span>
            <span class="text_p">{{item.guidelineText}}</span>
          </p>
        </li>
      </div>
    </div>
    <div v-show ='currentIndex==2' class="common-ticket" v-for="(item) in list.bomInfoList" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">零件号:</span>
            <span class="desc">{{item.materialCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">零件名称:</span>
            <span class="desc">{{item.materialName}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">需求数量:</span>
            <span class="desc">{{item.demandQuantity}}</span>
          </p>
        </li>
      </div>
    </div>
    <div v-show ='currentIndex==3' v-for="(item,index) in consbyticket" v-bind:key="item.id">
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
    <div v-show ='currentIndex==4' class="common-ticket" v-for="(item) in notconsbyticket" v-bind:key="item.id">
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
    <VPopuplist ref="showpop"></VPopuplist>
    <VPopuptext ref="showtext"></VPopuptext>
  </div>
</template>

<script>
import { promptInfo } from 'common/js/dialog'
import VPopuplist from 'base/popup/popuplist'
import VPopuptext from 'base/popup/Popuptext'
import { getconvertservice } from 'api/processFile'
import { getquerywomaterialnotconsbyticket, getquerywomaterialconsbyticket } from 'common/js/httpConnection'
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
      options: {
        scrollbar: true
      },
      currentIndex: 0,
      message: '',
      consbyticket: [],
      notconsbyticket: []
    };
  },
  components: {
    VPopuplist,
    VPopuptext
  },
  methods: {
    // 显示描述数据
    showmaterial (msg) {
      let str = msg.replace(/\r\n/gm, '<br/>')
      this.$refs.showtext.popushow('描述文本', str)
    },
    // 切换选中背景
    item_shows(index) {
      if (this.consbyticket[index].item_show) {
        this.consbyticket[index].item_show = false
      } else {
        this.consbyticket[index].item_show = true
      }
    },
    // 显示工序描述
    showmaterials (title, msg) {
      this.$refs.showtext.popushow(title, msg)
    },
    // tab切换
    handleShow(index,ticketno) {
      this.currentIndex = index
      if (index==3) {
       this._getquerywomaterialconsbyticket(ticketno)
      } else if (index==4) {
       this._getquerywomaterialnotconsbyticket(ticketno)
      }
    },
    _getquerywomaterialnotconsbyticket(ticketno) {
      this.showIndicator(this)
      getquerywomaterialnotconsbyticket({"ticketno":ticketno}).then(response => {
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
    _getquerywomaterialconsbyticket(ticketno) {
      this.showIndicator(this)
      getquerywomaterialconsbyticket({"ticketno":ticketno}).then(response => {
          this.closeIndicator()
          if (response.status === 1) {
            this.consbyticket = response.result
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
    handleInfo(title, item) {
      promptInfo(this, title, item)
    },
    handleDowload(item) {
      if (!item.url) {
        promptInfo(this, '提示', '未找到相关文件')
        return
      }
      let str = item.type
      if (str === 'ZIP' || str === 'TIF') {
        this.getreqestfile(item.url)
      } else {
        if (item.url.indexOf("%u")>0) {
          let strurl = encodeURI(item.url)
          console.log(strurl)
          $App.callDownlode(strurl)
        }else {
          $App.callDownlode(item.url)
        }
      }
    },
    getreqestfile (url) {
      debugger
      this.showIndicator(this)
      getconvertservice(url).then((res) => {
        this.closeIndicator()
        console.log(res)
        if (res.status === 200) {
          if (typeof res.result.pvList === 'undefined') {
            this.showToast(this, '系统不支持，请核实文件')
            return
          }
          this.$refs.showpop.popushow(1)
          this.$refs.showpop.Compositedata(res.result.pvList)
        } else {
          this.showToast('myPopup', '获取数据异常')
        }
      })
      .catch(error => {
        this.closeIndicator()
        console.log
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message
      const component = this.$refs[name]
      component.show()
      setTimeout(() => {
        component.hide()
      }, 2000);
    }
  }
};
</script>

<style lang="stylus" scoped>
.ticket
  width: 100%;
  height: 270px;
  padding: 0 10px;
  border-bottom: 1px solid #fc9153;
  padding-bottom: 15px;

  .personal
    box-sizing: border-box;
    border-bottom: 1px solid #999;

    &:last-child
      border: none;

    .unit
      display: flex;
      height: 39px;
      line-height: 39px;
      margin: 5px 0;
      font-size: 14px;
      padding-left: 5px;

      .desc
        flex: 1;
        display: inline-block

  .cube-my-popup
    .cube-popup-message
      color: #fff;
      padding: 20px;
      background: rgba(0, 0, 0, 0.8);
.child_p
  height 75px;
.text_span
  height: 15px;
  width 100%;
  display:inline-block;
  padding 0px 4px
.text_p
  height: 60px;
  width: 100%;
  word-break:break-all; 
  word-wrap:break-word; 
  display:inline-block;
  text-overflow: -o-ellipsis-lastline;
  overflow:hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height 20px;
  padding 0px 4px
  

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


.child_m
  display flex
  word-break: break-all;
.text_spanm
  width 20%;
  display inline-block
  margin-top 4px
  padding-left 4px
.text_pm
  width: 80%;
  margin-top: 2px;
  text-overflow: -o-ellipsis-lastline;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  line-height: 20px;
</style>


