<template>
  <div>
    <div class="Selectlibrary">
      <img class="image" src="@/components/warehouse/selectlibrary/header@2x.png" />
       <div class="tips_text" v-show="showtext"> 培训库</div>
      <div class="Selectlibrary_header">
        <div class="Selectlibrary_text">
          <div class="name">
            欢迎：{{name}}
            <div class="work" @click="handleShow">
              {{workCode ? workCode  : ''}}
            </div>
            <span @click="exit()">
              <img class="sp_exit" src="@/components/warehouse/selectlibrary/exit_image.png" />
            </span>
            <!-- <router-link
              class="link-go"
              tag="span"
              to="/Selectlibrary"
            >仓库</router-link> -->
            <div class="Selectlibrarys_children">
            <span v-if="this.getpathArr.indexOf('/Selectlibrary')!=-1" @click.stop="routerGoGo('/Selectlibrary')"><img class="sp_exit" src="@/components/manufacturing/cang.png" /></span>
            <span v-if="this.getpathArr.indexOf('/exception')!=-1" @click.stop="routerGoGo('/exception')"><img class="sp_exit" src="@/components/manufacturing/yi.png" /></span>
            <span v-if="this.getpathArr.indexOf('/assurance')!=-1" @click.stop="routerGoGo('/assurance')"><img class="sp_exit" src="@/components/manufacturing/zhi.png" /></span>
            </div>
          </div>
            <!-- {{time | formatDate}} -->
        </div>
      </div>
      <div class="se_body">
        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('materials')">
            <img class="image_item" src="@/components/manufacturing/exchange.png" />
            <p class="item_p">SO物料交接</p>
          </div>
          <div class="se_body_item se_width" se_width @click="routerGo('start')">
            <img class="image_item" src="@/components/manufacturing/start.png" />
            <p class="item_p">开工</p>
          </div>
          <div class="se_body_item" @click="routerGo('ol')">
            <img class="image_item" src="@/components/manufacturing/Newspaper.png" />
            <p class="item_p">报工</p>
          </div>
        </div>
        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('process')">
            <img class="image_item" src="@/components/manufacturing/Technology.png" />
            <p class="item_p">工艺文件</p>
          </div>
          <div class="se_body_item se_width" @click="routerGo('acess')">
            <img class="image_item" src="@/components/manufacturing/scene.png" />
            <p class="item_p">现场入库</p>
          </div>
          <div class="se_body_item" @click="routerGo('failed')">
            <img class="image_item" src="@/components/manufacturing/products.png" />
            <p class="item_p">不良品报工</p>
          </div>
        </div>

        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('match')">
            <img class="image_item" src="@/components/manufacturing/sequence.png" />
            <p class="item_p">调整序列号</p>
          </div>
          <div class="se_body_item se_width" @click="routerGo('working')">
            <img class="image_item" src="@/components/manufacturing/personal.png" />
            <p class="item_p">个人工时</p>
          </div>
          <div class="se_body_item" @click="routerGo('linchpin')">
            <img class="image_item" src="@/components/manufacturing/crux.png" />
            <p class="item_p">绑定关键件</p>
          </div>
        </div>

        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('progress')">
            <img class="image_item" src="@/components/manufacturing/progress.png" />
            <p class="item_p">订单进度</p>
          </div>
          <div class="se_body_item se_width" @click="routerGo('Clockin')">
          <!-- <div class="se_body_item se_width" > -->
            <img class="image_item" src="@/components/manufacturing/clock.png" />
            <p class="item_p">员工打卡</p>
          </div>
          <div class="se_body_item" @click="routerGo('Call')">
            <img class="image_item" src="@/components/manufacturing/picking.png" />
            <p class="item_p">生产call料</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getData } from 'common/helpers/util'
import { promptInfo } from 'common/js/dialog'
export default {
  data() {
    return {
      showtext: this.showtext,
      time: Date.parse(new Date()),
      name: this.text.name,
      getpathArr:[],
      workCode: ''
    };
  },
  filters: {
    formatDate: getData
  },
  computed: {
    isShow() {
      return this.authStatus === 1
    },
    ...mapGetters([
      'authStatus'
    ])
  },
  created:function(){
    let obj = JSON.parse(sessionStorage.getItem('userInfo'))
    console.log(obj)
    this.workCode = obj.workCenterCode ? obj.workCenterCode : ''
    this.getpathArr = this.$route.query.pathArr
  },
  beforeRouteLeave (to, from, next) {
    this.$vnode.parent.componentInstance.cache = {}
    this.$vnode.parent.componentInstance.keys = []
    next()
  },
  methods: {
    handleShow() {
      promptInfo(this, '工区', this.workCode)
    },
    routerGo(path) {
      this.$router.push(path)
    },
    exit() {
      this.$router.replace('/')
      // this.$router.back(-1)
      sessionStorage.clear()
    },
    routerGoGo(path) {//显示的路由
        // const Arrs = ['/Selectlibrary','/exception','/home']
        // const index = Arrs.indexOf(path)
      const pathArr = this.$route.query.pathArr
      const index = pathArr.indexOf(path)
      if (index < 0) {
        return
      }
      this.$router.push({path:path,query:{pathArr}})
    },
  }
};
</script>
<style>
.Selectlibrary {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #e6e0e0;
}

.tips_text{
  position: absolute;
  left: 0;
  right: 0;
  top: 20px;
  z-index: 99;
  text-align: center;
  height: 20px;
  font-size: 40px;
  font-weight: bold;
  color: #f00;
}
.image {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 25%;
}
.Selectlibrary_header {
  position: absolute;
  height: 6%;
  top: 25%;
  left: 0;
  right: 0;
  background: #fff;
}
.Selectlibrary_text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 20px;
}
.work {
  width: 200px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
}
.name {
  display: flex;
  justify-content: start;
  align-items: center;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.timer {
  flex: 1;
}
.Selectlibrarys_children{
  position: absolute;
  top: -80%;
  left: 0;
}
.Selectlibrarys_children img{
  width: 30px;
  height: 30px;
}
.sp_exit {
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.link-go {
  margin-left: 10px;
  font-size: 14px;
}
.se_body {
  position: absolute;
  width: 100%;
  top: 32%;
  bottom: 0;
}
.se_body_h {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 103px;
  margin-top: 2px;
}
.image_item {
  margin-top: 20px;
  width: 50px;
  height: 50px;
}
.se_body_item {
  text-align: center;
  width: 100%;
  height: 100%;
  background: #fff;
  position: relative;
}
.se_width {
  margin-left: 0.5%;
  margin-right: 0.5%;
}
.item_p {
  text-align: center;
  font-size: 13px;
  margin-top: 5px;
}
.mouseove {
  background: rgba(0, 0, 0, 0.8);
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
.mouseove .desc {
  font-size: 16px;
  color: #fff;
  text-align: center;
  padding: 15px;
}
</style>
