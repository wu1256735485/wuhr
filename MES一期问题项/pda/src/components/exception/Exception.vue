<template>
  <div>
    <div class="Selectlibrary">
      <img class="image" src="@/components/warehouse/selectlibrary/header@2x.png" />
      <div class="Selectlibrary_header">
        <div class="Selectlibrary_text">
          <div class="name">
            欢迎：{{name}}
            <span @click="exit()" style="margin-right: 2px">
              <img class="sp_exit" src="@/components/warehouse/selectlibrary/exit_image.png" />
            </span>
            <!-- <router-link
              class="link-go"
              tag="span"
              to="/Selectlibrary"
            >生产
          </router-link> -->
          <div class="Selectlibrarys_children">
            <span v-if="this.getpathArr.indexOf('/Selectlibrary')!=-1" @click.stop="routerGoGo('/Selectlibrary')"><img class="sp_exit" src="@/components/manufacturing/cang.png" /></span>
            <span v-if="this.getpathArr.indexOf('/home')!=-1" @click.stop="routerGoGo('/home')"><img class="sp_exit" src="@/components/manufacturing/sheng.png" /></span>
             <span v-if="this.getpathArr.indexOf('/assurance')!=-1" @click.stop="routerGoGo('/assurance')"><img class="sp_exit" src="@/components/manufacturing/zhi.png" /></span>
            </div>
          <!-- <span @click.stop="routerGoGo('/home')"><img class="sp_exit" src="@/components/exception/sheng.png" /></span> -->
          </div>
          <!-- {{time | formatDate}} -->
        </div>
      </div>
      <div class="se_body" >
        <div class="se_body_h">
          <div class="se_body_item" @click="routerGo('exception/send')">
          <div class="se_body_noticeEd">
            <div class="Select_notice_ed">
                <!-- 11 -->
          </div>
            <img class="image_items" src="@/components/exception/progress.png" />
            <p class="item_p">{{"异常发起"}}</p>
          </div>
          
          </div>
          <div class="se_body_item se_width" @click="routerGo('exception/inspect')" style="margin-left: 0.5%;margin-right: 0.5%">
          <div class="se_body_noticeEd">
            <div class="Select_noticeD">
                {{exceptionNum}}
          </div>
            <img class="image_items" src="@/components/exception/clock.png" />
            <p class="item_p">{{"异常待办"}}</p>
          </div>
          </div>
          
          <div class="se_body_item" @click="exit">
            <div class="Select_notice_ed">
                <!-- 11 -->
          </div>
            <div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/exit.png" />
              <p class="item_p">退出</p>
          </div>
          
        </div>
        </div>
        
        <!-- </div> -->
      </div>
    </div>
  </div>
</template>
<script>
import { exceptionLogin, activitiBackLog, getExceptionBackLog } from 'api/exception'
import { getData } from 'common/helpers/util'
const querygroupData = {
  assignment: 'group',
  includeProcessInstance: 'true',
  pageOffset: 0,
  sort: 'created-desc',
  state: 'open'
}
const queryinvolvedData = {
  assignment: 'involved',
  includeProcessInstance: 'true',
  pageOffset: 0,
  sort: 'created-desc',
  state: 'open'
}
export default {
  data() {
    return {
      time: this.text.time,
      name: this.text.name,
      code: this.text.code,
      exceptionNum: 0,
      getpathArr: []
    };
  },
  created() {
    this.getpathArr = this.$route.query.pathArr
    this.getTitleList()
  },
  // watch: {
  //   '$route': function(to, from) {
  //     // this.getTitleList()
  //     this.$createDialog({
  //       content: 'path'
  //     }).show()
  //   }
  // },
  filters: {
    formatDate: function() {
      return getData(Date.now())
    }
  },
  methods: {
    routerGo(path) {
      this.$router.push(path);
    },
    getTitleList() {
      // 请求角色待办的信息
      getExceptionBackLog({}).then(res => {
        console.log(res)
        if (res.data.code === 0) {
          const groupData = res.data.data
          this.exceptionNum = groupData.length
        }
      })
      // activitiBackLog(queryinvolvedData).then(res => {
      //   // this.$createDialog({
      //   //   content: res.data.data.length
      //   // }).show()
      //   if (res.data.code === 0) {
      //     const groupData = res.data.data

      //     this.exceptionNum = groupData.length

      //     // 请求用户待办的信息
      //     // activitiBackLog(queryinvolvedData).then(res => {
      //     //   const involvedData = res.data.data
      //     //   const resultData = groupData.concat(involvedData)
      //     //   this.exceptionNum = resultData.length
      //     // })
      //   }
      // })
    },
    routerGoGo(path) { // 显示的路由
        // const Arrs = ['/Selectlibrary','/exception','/home']
        // const index = Arrs.indexOf(path)
      const pathArr = this.$route.query.pathArr

      const index = pathArr.indexOf(path)
      // this.$createDialog({
      //   content: path
      // }).show()
      if (index < 0) {
        return
      }

      this.$router.push({path: path, query: {pathArr}})
    },
    getExcptionToken() {
      exceptionLogin({ nfcNo: 'F989C56E' }).then(res => {
        if (res.data.msg === '登陆成功') {
          // this.text.code = this.code
          // console.log(res.data)
          if (res.data.msg === '登陆成功') {
            const str = res.data.data.roleIdsString
            sessionStorage.setItem('roleIdsString', str)
          }
          // this.$router.push('/exception')
        } else {
          // this.showToast(this, '请求数据失败')
        }
        // if(res)
        // sessionStorage.setItem('token',JSON.stringify(res.))
      })
    },
    exit() {
      sessionStorage.removeItem('tokenStr');
      sessionStorage.removeItem('sessionStr');
      sessionStorage.removeItem('roleIdsString');
      this.$router.push('/');
    }
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
.name {
  display: flex;
  justify-content: start;
  align-items: center;
}
.sp_exit {
  margin-left: 10px;
  width: 20px;
  height: 20px;
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
.image_items {
  margin-top: 3px;
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
.Select_noticeD{
    width: 17px;
    height: 17px;
    position: relative;
    background: red;
    left: 75px;
    top: 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius:100px;
    font-size: 8px;
}
.Select_notice_ed {
  width: 17px;
    height: 17px;
    position: relative;
    background: #fff;
    opacity:0;
    left: 88px;
    top: 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius:100px;
    font-size: 8px;
}
.se_body_noticeEd{
  /* width: 55px; */
  /* height: 75px; */
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

</style>
