<template>
  <div>
    <div class="common-ticket common-active" v-show="list.orderNoRelSeq">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">订单号:</span>
            <span class="desc">{{list.orderNoRelSeq}}</span>
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
            <span class="desc">版本(订单/工艺):</span>
            <span class="desc">{{list.routingRevision}}/{{list.routingNewRevision}}</span>
          </p>
          <p class="child">
            <span class="desc">订单数量:</span>
            <span class="desc">{{list.revisedQty}}</span>
          </p>
        </li>
      </div>
    </div>
    <div class="footer-btn" v-show="list.workNo">
      <div class="btn" 
        :style="{background: currentIndex === 0 ? '#fc9153' : '#666'}"
        @click="handleShow(0)"
      >文件(艺)</div>
      <div class="btn" 
        :style="{background: currentIndex === 1 ? '#fc9153' : '#666'}"
        @click="handleShow(1)"
      >文件(单)</div>
      <div class="btn"
        :style="{background: currentIndex === 2 ? '#fc9153' : '#666'}"
        @click="handleShow(2)"
      >作业</div>
      <div class="btn"
        :style="{background: currentIndex === 3 ? '#fc9153' : '#666'}"
        @click="handleShow(3)"
      >物料</div>
      <div class="btn"
        :style="{background: currentIndex === 4 ? '#fc9153' : '#666'}"
        @click="handleShow(4)"
      >变更</div>
    </div>
    <div v-show="currentIndex==0" class="common-ticket" v-for="item in list.proDoc" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit_li">
          <p class="child_m">
            <span class="text_spanm">文件名称:</span>
            <span class="text_pm" @click.stop="handleDowload(item)">{{item.docCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">文件类型:</span>
            <span class="desc">{{item.type}}</span>
          </p>
          <p class="child">
            <span class="desc">文件版本:</span>
            <span class="desc">{{item.docRev}}</span>
          </p>
        </li>
        <li class="unit" style="height:25px !important;">
          <!-- <p class="child">
            <span class="desc">是否加密:</span>
            <span class="desc">{{item.start === '1' ? '不加密' : '加密'}}</span>
          </p>-->
          <p class="child"> 
            <span class="desc">工序号:</span>
            <span class="desc">{{item.operationCode}}</span>
          </p>
          <p class="child">
              <img src="static/see.png" alt @click.stop="handleDowload(item)" />
          </p>
        </li>
        <li class="unit">
            <p class="child">
            <span class="desc">文件类别:</span>
            <span class="desc">{{item.docClass}}</span>
          </p>
        </li>
      </div>
    </div>
    <div v-show="currentIndex==1" class="common-ticket" v-for="item in list.orderProDocList" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">文件名称:</span>
            <span class="desc">{{item.docTitle}}</span>
          </p>
        </li>
        <li class="unit">
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
            <span class="desc">工序号:</span>
            <span class="desc">{{item.operationCode}}</span>
          </p>
          <p class="child">
            <img src="static/see.png" alt @click.stop="handleDowload(item)" />
          </p>
        </li>
      </div>
    </div>
    <div v-show ='currentIndex==2' class="common-ticket" v-for="item in list.guideline" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit" v-show="item.dataSource===0">
          <p class="child">
            <span class="desc">工序号:</span>
            <span class="desc">{{item.operationCode}}</span>
          </p>
          <p class="child">
            <span class="desc">导引序号:</span>
            <span class="desc">{{item.guidelineSEQ}}</span>
          </p>
        </li>
        <li class="unit" v-show="item.dataSource===0">
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
    <div v-show ='currentIndex==3' class="common-ticket" v-for="(item) in list.bomInfoList" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">物料名称:</span>
            <span class="desc">{{item.materialName}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">物料编码:</span>
            <span class="desc">{{item.materialCode}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">需求数量:</span>
            <span class="desc">{{item.demandQuantity}}</span>
          </p>
          <p class="child">
            <span class="desc">工序号:</span>
            <span class="desc">{{item.operationCode}}</span>
          </p>
        </li>
      </div>
    </div>
    <div v-show ='currentIndex==4' class="common-ticket" v-for="(item) in list.processChangeList" v-bind:key="item.id">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc">变更代码:</span>
            <span class="desc">{{item.actionCode}}</span>
          </p>
          <p class="child">
            <span class="desc">版本:</span>
            <span class="desc">{{item.newRevNo}}</span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc">变更描述:</span>
            <!-- <span class="desc">{{item.materialCode}}</span> -->
          </p>
          <p class="child">
            <span class="desc">变更时间:</span>
            <span class="desc">{{item.changeTime}}</span>
          </p>
        </li>
        <li class="unit_li">
          <p class="child_p">
            <span class="text_p">{{item.notes}}</span>
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
export default {
  props: {
    list: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      options: {
        scrollbar: true
      },
      currentIndex: 0,
      message: ''
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
    // 显示工序描述
    showmaterials (title, msg) {
      this.$refs.showtext.popushow(title, msg)
    },
    // tab切换
    handleShow(index) {
      this.currentIndex = index
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
          this.showPopup('myPopup', '获取数据异常')
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


