<template>
  <div>
    <VHeader :title="'打卡'"></VHeader>
    <div class="clockin">
    <div class="clockin_t">
     <div class="colckin_text">{{time | formatDate}}</div>
      <div class="clockin_recode">
        <img class="imgs" src="@/components/warehouse/clockin/记录.png" @click="gorout()"/>     
      </div>
     </div>
     <div class="clockin_s">
        <div class="clock_name">
          <div>{{this.isCommute == 0 ? name : '打卡时间:'+ this.punchTime}}</div>
        </div>
        <img class="image_items" src="@/components/warehouse/clockin/上班.png" @click="camera('0')"/>
       <div class="clockin_img">
          <img class="imgs" src="@/components/warehouse/clockin/小太阳.png"/>     
       </div>
     </div>
     <div class="clockin_x">
       <div class="clock_name">
          <div>{{this.isCommute == 1 ? name : ''}}</div>
        </div>
       <img class="image_items" src="@/components/warehouse/clockin/下班.png" @click="camera('1')"/>
       <div class="clockin_img">
          <img class="imgs" src="@/components/warehouse/clockin/月亮.png"/>     
       </div>
     </div>
     <div class="clockin_b">
        <cube-radio-group style="height:100%;font-size:20px;" v-model="selected" :options="options" position="lift" :horizontal="true" />
     </div>
     <div class="clockin_f">
     <cube-button class="btn_style" :primary="true" :disabled="btn_disable" @click="getyes()">提交</cube-button>
     </div>
    </div>
  </div>
</template>
<script>
import { getDatas } from 'common/helpers/util'
import VHeader from 'base/warehouseheader/Header'
import VCallquery from 'components/warehouse/call/Callquery'
import { getNfc } from 'api/materials'
import { 
  singleUpload, 
  saveByUserMes,
  punchAstrict
} from 'api/clockin'
export default {
   data () {
      return {
        avatar: require('../../../../static/change_w.png'),
        time: Date.parse(new Date()),
        img:'',
        selected: 0,
        options: [
          {
          label: '早班',
          value: 1
          },
          {
          label: '中班',
          value: 2
          },
          {
          label: '晚班',
          value: 3
          }
        ],
        name: '', // 名字
        NFCCode: '', // nfc
        namecode: '', 
        cameraurl: '',
        punchType: '',
        isCommute:'',//区分上下班
        shiftCommute:'',//判断打卡是早中晚班
        punchTime:'',//上班打卡时间
        fullTime:'',//打卡一分钟限制
        btn_disable:false
      }
   },
   filters: {
    formatDate: getDatas
   },
   components:{
     VCallquery,
     VHeader    
   },
   methods: {
    gorout () {
      this.$router.push('/Record')
    },
    beCalledNfc (data) {
    this.NFCCode = data
    this.showIndicator(this)
    getNfc({ nfcNo: this.NFCCode }).then(res => {
      this.closeIndicator()
      if (res.result.start == 200 || res.result.start == 201 ) {
        this.name = res.result.mes.NAME
        this.namecode = res.result.mes.NAMECODE
        punchAstrict({userCode:this.namecode}).then((res) => {
          this.isCommute = res.result.statu
          this.punchTime = res.result.punchTime
          this.fullTime = res.result.time
          if(res.result.MSG){
            this.shiftCommute = res.result.MSG
          }
        })
      } else {
        this.showToast(this, '未找到人员信息')
      }
    }).catch((error) => {
      this.closeIndicator()
      if (error=== 307 || error=== 900 || error=== 403) return
      this.showToast(this, '请求数据失败')
    })
    },
    camera (data) {
      if (!this.namecode) {
      this.showToast(this, '先刷卡,再拍照!')
      return
      }
      this.punchType = data
      $App.callCamera()
      // this.takepictures(this.avatar)
    },
    takepictures(datas) {
      let files = this.dataURLtoFile(datas, `${Date.now()}.jpg`)
      let formData = new FormData()
      formData.append('file', files)
      formData.append('userCode', this.namecode)
      this.showIndicator(this)
      singleUpload(formData).then((response) => {
        this.closeIndicator()
        if (response.status !== 200) {
          this.showToast(this, '拍照失败')
          return
        }
        this.showToast(this, '拍照成功')
        this.cameraurl = response.result.fileUrl
      }).catch((error) => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    },
    // base64转file
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n)
      }
      // log(this, mime)
      return new File([u8arr], filename, { type: mime })
    },
    getyes () {
      if (!this.NFCCode) {
      this.showToast(this, '请刷卡')
      return
      }
      if (!this.name) {
      this.showToast(this, '请重新刷卡')
      return
      }
      if (this.isCommute == 0 && this.punchType != 0) {
        this.showToast(this,'请进行上班打卡')
        return
      }
      if(this.isCommute == 1 && this.punchType != 1) {
        this.showToast(this,'请进行下班打卡')
        return
      }
      if(this.fullTime == 'N'){
        this.showToast(this,'请勿重复打卡(一分钟后刷卡重试)')
        return
      }
      if (this.selected === 0) {
      this.showToast(this, '请选班')
      return
      }
      if(this.isCommute == 1 && this.selected != this.shiftCommute){
        if(this.shiftCommute == 1){
          this.showToast(this, '请选择早班班次')
          return
        }else if(this.shiftCommute == 2){
          this.showToast(this, '请选择中班班次')
          return
        }else{
          this.showToast(this, '请选择晚班班次')
          return
        }
      }
      if (!this.cameraurl) {
      this.showToast(this, '请拍照')
      return
      }
      this.btn_disable = true
      this.showIndicator(this)
      let requstdata = {
        'userName': this.name,
        'userCode': this.namecode,
        'classType': this.selected,
        'punchType': this.punchType,
        'file': this.cameraurl
      }
      saveByUserMes(requstdata).then((response) => {
        this.closeIndicator()
        this.btn_disable = false
        console.log(response)
        if (response.status !== 200) {
          this.showToast(this, '提交失败')
          return
        }
        // this.showToast(this, '提交成功')
        this.showToast(this, response.result.mes)
        this.name = ''
        this.namecode = ''
        this.selected = 0
        this.punchType = ''
        this.cameraurl = ''
        this.isCommute = ''
        this.punchTime = ''
        this.fullTime = ''
        this.shiftCommute = ''
      }).catch((error) => {
        this.closeIndicator()
        if (error=== 307 || error=== 900 || error=== 403) return
        this.showToast(this, '请求数据失败')
      })
    }
   },
   mounted() {
    window.beCalledNfc = this.beCalledNfc
    window.takepictures = this.takepictures
    this.timer = setInterval(() => {
      this.time = new Date() // 修改数据date
    }, 1000)
   },
   beforeDestroy() {
    window.beCalledNfc = ''
    if (this.timer) {
      clearInterval(this.timer) // 在Vue实例销毁前，清除我们的定时器
    }
  }
}
</script>
<style lang="stylus" scoped>
@import '~common/style/warehouse.styl'
.clockin
 position absolute
 top 30px
 right 0
 left 0
 bottom 0
 background #3A85E6
 .clockin_t
  position relative
  display flex
  justify-content center
  align-items center
  width 100%
  height 10%
  .colckin_text
   color #fff
   font-size 22px
 .clockin_s
   position relative
   display flex
   justify-content center
   align-items center
   margin-left 20px
   margin-right 20px
   height 33%
   background #fff
   border 1px solid rgba(0,0,0,0.1)
   border-radius 5px 5px 0 0
  .clockin_x
   position relative
   display flex
   justify-content center
   align-items center
   margin-left 20px
   margin-right 20px
   height 33%
   background #fff
   border 1px solid rgba(0,0,0,0.1)
   border-radius 0 0 5px 5px 
  .clockin_b
   padding-top 10px
   margin-left 20px
   margin-right 20px
   height 12%
   
  .clockin_f
   display flex
   justify-content center
   align-items center
   margin-left 20px
   margin-right 20px
   height 9%
   .btn_style 
    height: 10px
    line-height: 1px

.image_items 
  width 100px
  height 100px

.clockin_img
  position absolute
  top 10px
  left  10px
  .imgs
   width 25px
   height 25px

.clock_name
  position absolute
  top 10px
  right 5px
  font-size 18px
  color: #666

.clockin_recode
 position absolute
 top 1px
 right 20px
 .imgs
   width 25px
   height 25px
</style>