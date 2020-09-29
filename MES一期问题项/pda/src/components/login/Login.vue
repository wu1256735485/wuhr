<template>
  <div>
    <div class="login"></div>
    <img class="login_image" src="@/components/login/login.png" />
    <div class="tips_div" v-show="showtext">正在使用培训环境</div>
    <div class="logo_div">
      <img class="logo_image" src="@/components/login/logo.png" />
      <!-- <div class="p_div" @click="this._requestLogin"> -->
      <div class="p_div">
        <p class="login_text">智能执行系统</p>
        
      </div>
    </div>
    <div class="login_div">
      <img class="btn_image" src="@/components/login/btn_img.png"/>
    </div>
    <div class="login_verson">版本1.5.7-{{packages}}</div>
    <div class="login_popup" v-if="show">
      <div class="login_circle">
        <p class="login_title">登&nbsp;&nbsp;录</p>
        <div class="login_cube_div">
          <span>
            <img class="logo_l_t" src="@/components/login/login_text.png" />
          </span>
          <span>
            <input class="login_input" :placeholder="autocomplete" type="text" v-model="namecode" />
          </span>
        </div>
      </div>
    </div>
    <div class="login_btn_div" v-if="show">
      <div class="login_div_sp">
        <div class="login_btn_styles" @click="get_select">登&nbsp;录</div>
        <div class="login_btn_styles" @click="colse_btn">取&nbsp;消</div>
      </div>
    </div>
    <desktop-selection
      :pathArr="pathArr"
      :status="status"
      v-show="selection"
    ></desktop-selection>

  </div>
</template>
<script>
import { getlogin } from 'common/js/httpConnection'
import { requestLogin, getUserMenu } from 'common/js/request'
import { exceptionLogin } from 'api/exception'
import DesktopSelection from 'base/desktop-selection/desktop-selection'
import { mapMutations } from 'vuex'
export default {
  data() {
    return {
      showtext: this.showtext,
      code: '',
      namecode: '',
      data: [],
      flage: false,
      packages: '',
      autocomplete: '请输入员工号',
      show: true,
      userId: '',
      status:false,
      pathArr: [],
      selection: true
    }
  },
  created() {
    this.selection = false
  },
  methods: {
    _request(){
// this.$router.push('/Manufacturing')
this.$router.push('/Selectlibrary')
    },
    // 登录
    _requestLogin() {
      // let data = { nfcNo: 'F989C56E' }
      // let data = { nfcNo: 'B038ED13' }
      // let data = { nfcNo: '8B960E1C'}
      // let data = { nfcNo: '79D8C17E' }
      // let data = { nfcNo: '2B2A9116' }
      // let data = { nfcNo :'894A836D' }
      // let data = { nfcNo :'DA314EE6' }
      // this.code = '894A836D'
      let data = { nfcNo: this.code }
      requestLogin(data).then((res) => {
        if (res.code === 0) {
          this.userId = res.data.userId
          const jsonStr = JSON.stringify(res.data)
          sessionStorage.setItem('userInfo', jsonStr)
          this.text.name = res.data.name
          getUserMenu({userId: this.userId}).then((result) => {
            console.log(result,"1")
            if (result.code === 0) {
              if (!result.data.length) {
                this.showToast(this, '您没有登录权限')
                return 
              }
              if (result.data.length === 1) {
                var routerList = result.data[0].vuePath
                this.$router.push({path:result.data[0].vuePath,query:{pathArr:routerList}})
              } else {
                let num = 0 // 是否存在默认页面
                let auth = 0
                this.pathArr = []
                result.data.forEach((item) => {
                  this.pathArr.push(item.vuePath)
                  if (item.vuePath === '/home') {
                    auth++
                  }
                  if (item.vuePath === '/Selectlibrary') {
                    auth++
                  }
                  // if (item.vuePath === '/exception') {
                  //   auth++
                  // }
                  if (!item.default) {
                    num++
                  } else {
                    var routerList = result.data
                    this.$router.push({path:item.vuePath,query:{pathArr:this.pathArr}})
                  }
                })
                if (auth === 2) {
                  this.setAuth(1)
                  console.log('auth')
                }
                if (num === result.data.length) {
                  this.selection = true
                  this.status = true
                }
              }
            }else{
              if(result.code === 500){
                this.showToast(this, '您没有登录权限')
                return 
              }
            }
          })
        } else {
          this.showToast(this, res.msg)
        }
      })
    },
    // nfc 回调方法
    beCalledNfc(data) {
      $App.callgetLogin('1')
      this.code = ''
      this.code = data
      // this.$createDialog({
      //   content: data
      // }).show()
      // if (this.code === 'F989C56E' || this.code === '894A836D') {
      //   this.getExcptionToken()
      //   // this.$router.push('/exception')
      //   return
      // }
      this._requestLogin()
    },
    beCalledPackage (data) {
      this.packages = data
    },
    get_select() {
      this.code = '3D1D7F33'
      //  this.code = '79D8C17E'
      this._requestLogin()
      // let data = { nfcNo: '79D8C17E' }
    },
    getRequest() {
      if (!this.flage) {
        var datas = { nfcNo: this.code }
        this.showIndicator(this)
        getlogin(datas)
          .then(response => {
            if (response.result.start === '200') {
              const userInfo = { code: response.result.mes.nameCode }
              sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
            }
            this.closeIndicator()
           // console.log(response)
            var result = response.result
            if (result.error === '1') {
              this.showToast(this, '请联系管理员')
              return
            }
            if (result.start === '200') {
              this.flage = true
              this.text.name = result.mes.name
              this.text.time = result.time
              sessionStorage.setItem('usercode', this.code)
              if (result.mes.orgCode === '10110') {
                this.$router.push('/Selectlibrary')
              } else if (result.mes.orgCode === '10111') {
                this.$router.push('/Manufacturing')
              } else {
                this.flage = false
                this.showToast(this, '该卡未绑定人员!')
              }
            } else {
              this.showToast(this, '该卡未绑定人员')
            }
          })
          .catch(error => {
            this.closeIndicator()
            console.log(error)
            this.showToast(this, '请求数据失败')
          })
      }
    },
    getExcptionToken() {
      exceptionLogin({ nfcNo: this.code }).then(res => {
        if (res.data.msg === '登陆成功') {
          this.text.code = this.code
          // console.log(res.data)
          if (res.data.msg === '登陆成功') {
            const str = res.data.data.roleIdsString
            sessionStorage.setItem('roleIdsString', str)
          }
          this.$router.push('/exception')
        } else {
          this.showToast(this, '请求数据失败')
        }
        // if(res)
        // sessionStorage.setItem('token',JSON.stringify(res.))
      })
    },
    logins_btn() {},
    colse_btn() {},
    ...mapMutations({
      setAuth: 'SET_AUTH_STATUS'
    })
  },
  mounted() {
    $App.callgetLogin('0')
    this.flage = false
    this.code = '' 
    window.beCalledNfc = this.beCalledNfc
    window.beCalledPackage = this.beCalledPackage
  },
  components: {
    DesktopSelection
  }
}
</script>

<style>
.login {
  width: 100%;
  height: 100%;
}
.login_image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}
.logo_div {
  position: absolute;
  top: 130px;
  left: 0;
  right: 0;
  text-align: center;
  height: 80px;
}
.logo_image {
  width: 300px;
  height: 50px;
}
.p_div {
  display: flex;
  justify-content: center;
}
.login_text {
  display: flex;
  justify-content: start;
  width: 300px;
  font-size: 18px;
  color: #fff;
}
.login_div {
  position: absolute;
  top: 250px;
  left: 0;
  right: 0;
  text-align: center;
}
.btn_image {
  width: 70px;
  height: 70px;
}
.login_verson {
  position: absolute;
  top: 95%;
  left: 0;
  right: 0;
  bottom: 10px;
  font-size: 12px;
  color: #fff;
  text-align: center;
}
.tips_div {
  position: absolute;
  top: 270px;
  left: 0;
  right: 0;
  text-align: center;
  height: 20px;
  font-size: 35px;
  font-weight: 900;
  color: #f00;
  z-index: 9;
}
.login_popup {
  position: absolute;
  top: 250px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  text-align: center;
}
.login_circle {
  background: #fff;
  width: 280px;
  height: 140px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 5px;
}
.login_title {
  margin-top: 20px;
  color: #017aff;
  font-size: 17px;
  text-align: center;
}
.login_cube_div {
  margin-top: 20px;
  margin-left: 30px;
  margin-right: 30px;
  display: flex;
  height: 30px;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #dbdbdb;
}
.logo_l_t {
  width: 18px;
  height: 18px;
}
.login_input {
  font-size: 13px;
  margin-left: 10px;
  border-top: 0px;
  border-left: 0px;
  border-right: 0px;
  border-bottom: 0px;
  outline: none;
  background-color: rgba(0, 0, 0, 0);
}
.login_btn_div {
  position: absolute;
  top: 375px;
  left: 0;
  right: 0;
  height: 40px;
  display: flex;
  justify-content: center;
}
.login_div_sp {
  display: flex;
  justify-content: space-between;
  width: 160px;
}
.login_btn_styles {
  width: 55px;
  height: 28px;
  color: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-radius: 20px;
  background-image: linear-gradient(to right, #017aff, #45c8ff);
}
</style>
