<template>
  <div>
    <div class="Assurance">
      <img class="image" src="@/components/warehouse/selectlibrary/header@2x.png" />
       <div class="tips_text" v-show="showtext"> 培训库</div>
      <div class="Assurance_header">
        <div class="Assurance_text">
          <div class="name">
            欢迎：{{name}}
            <span @click="exit()">
              <img class="sp_exit" src="@/components/warehouse/selectlibrary/exit_image.png" />
            </span>
            <!-- <router-link
              class="link-go"
              tag="span" 
              to="/Assurance"
            >仓库</router-link> -->
            <div class="Assurances_children">
            <span v-if="this.getpathArr.indexOf('/Selectlibrary')!=-1" @click.stop="routerGoGo('/Selectlibrary')"><img class="sp_exit" src="@/components/manufacturing/cang.png" /></span>
            <span v-if="this.getpathArr.indexOf('/exception')!=-1" @click.stop="routerGoGo('/exception')"><img class="sp_exit" src="@/components/manufacturing/yi.png" /></span>
            <span v-if="this.getpathArr.indexOf('/home')!=-1" @click.stop="routerGoGo('/home')"><img class="sp_exit" src="@/components/manufacturing/sheng.png" /></span>
            </div>
          </div>
          {{time | formatDate}}
        </div>
      </div>
      <div class="se_body">
        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('assprocess')">
            <img class="image_item" src="@/components/manufacturing/Technology.png" />
            <p class="item_p">工艺文件</p>
          </div>
           <div class="se_body_item se_width" @click="routerGo('linchpins')">
            <img class="image_item" src="@/components/manufacturing/crux.png" />
            <p class="item_p">绑定关键件</p>
          </div>
          <div class="se_body_item" @click="exit()">
            <img class="image_item" src="@/components/warehouse/selectlibrary/exit.png" />
              <p class="item_p">退出</p>
          </div>
        </div>
 
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getData } from 'common/helpers/util'
export default {
  data() {
    return {
      showtext: this.showtext,
      time: Date.parse(new Date()),
      name: this.text.name,
      Arrss : ['/home','/exception'],
      getpathArr:[],
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
    this.getpathArr = this.$route.query.pathArr
  },
  methods: {
    routerGo(path) {
      this.$router.push(path)
    },
    exit() {
      this.$router.push('/')
    },
    routerGoGo(path) {//显示的路由
    console.log(this.getpathArr,'12345')
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
.Assurance {
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
.Assurance_header {
  position: absolute;
  height: 6%;
  top: 25%;
  left: 0;
  right: 0;
  background: #fff;
}
.Assurance_text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100%;
  font-size: 13px;
  padding-left: 20px;
  padding-right: 20px;
}
.name {
  display: flex;
  justify-content: start;
  align-items: center;
}
.Assurances_children{
  position: absolute;
  top: -80%;
  left: 0;
}
.Assurances_children img{
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
