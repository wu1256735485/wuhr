<template>
    <div>
      <div class="Selectlibrarys">
        <img class="image" src="@/components/warehouse/selectlibrary/header@2x.png" >
        <div class="tips_text" v-show="showtext"> 培训库</div>
     <div class="Selectlibrarys_header">
       <div class="Selectlibrarys_text">
        <div class="names">欢迎：{{name}}
          <!-- <div class="work" @click="handleShow" v-show="workCode">
            {{workCode}}
          </div> -->
          <span  @click="exit()"><img class="sp_exit" src="@/components/warehouse/selectlibrary/exit_image.png" ></span>
          <!-- <router-link
            class="link-go"
            tag="span" 
            to="/home"
            v-show="isShow"
          >执行</router-link> -->
          <div class="Selectlibrarys_children">
          <span v-if="this.getpathArr.indexOf('/home')!=-1" @click.stop="routerGoGo('/home')"><img class="sp_exit" src="@/components/warehouse/selectlibrary/sheng.png" /></span>
          <span v-if="this.getpathArr.indexOf('/exception')!=-1" @click.stop="routerGoGo('/exception')"><img class="sp_exit" src="@/components/warehouse/selectlibrary/yi.png" /></span>
           <span v-if="this.getpathArr.indexOf('/assurance')!=-1" @click.stop="routerGoGo('/assurance')"><img class="sp_exit" src="@/components/manufacturing/zhi.png" /></span>
          </div>
        </div>
        <!-- {{time | formatDate}} -->
       </div>
     </div>
      
    
  
     <div class="se_body">
      <cube-slide ref="slide" 
        :loop="loop"
        :auto-play="autoPlay"
        :show-dots="showDots"
        :options="slideOptions"
        >
       <cube-slide-item >
       <div class="se_body_h">
         <div class="se_body_item" @click="get_select('/POstorage')" >
             <div class="se_body_div">
               <div class="se_body_notice">
               <div class="Select_notice">{{PO_number}}</div>
               <img class="image_items" src="@/components/warehouse/selectlibrary/po.png" >
             </div>
           </div>
            <p class="item_ps">PO入库</p>
         </div>
         <div class="se_body_item se_widths" @click="get_select('/PLMaterialRequistion')">
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{SO_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/pl.png" >
            </div>
           </div>
          <p class="item_ps">SO领料</p>
         </div>
         <div class="se_body_item" @click="get_select('/GOdownEntry')">
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{GOdownEntry_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/godownEntry.png" >
            </div>
           </div>
          <p class="item_ps">SO入库</p>
         </div>
         
       </div>
       <div class="se_body_h">
         <div class="se_body_item" @click="get_select('/Materialwithdrawal')">
           <div class="se_body_div">
             <!-- <div class="se_body_notice"> -->
              <!-- <div class="Select_notice">{{Materialwithdrawal_number}}</div> -->
              <img class="image_item1" src="@/components/warehouse/selectlibrary/materialwithdrawal.png" >
            <!-- </div> -->
           </div>
          <p class="item_ps">生产退料</p>
         </div>
          <div class="se_body_item se_widths" @click="get_select('/MRMaterialRequistion')">
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{MR_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/mr.png" >
              </div>
            </div>
            <p class="item_ps">MR领料</p>
         </div>
         <div class="se_body_item" @click="get_select('/TT')"  >
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{TT_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/tt.png" >
             </div>
            </div>
           <p class="item_ps">TT移库</p>
         </div>
       </div>
       <div class="se_body_h">
         <div class="se_body_item" @click="get_select('/Clockin')">
           <div class="se_body_div">
              <img class="image_item1" src="@/components/manufacturing/clock.png" >
           </div>
          <p class="item_ps">员工打卡</p>
         </div>
         <div class="se_body_item se_widths" @click="get_select('/Print')">
           <div class="se_body_div">
          <img class="image_item1" src="@/components/warehouse/selectlibrary/print.png" >
          </div>
          <p class="item_ps">补打条码</p>
         </div>
         <div class="se_body_item" @click="get_select('/SOHandover')">
           <div class="se_body_div">
          <img class="image_item1" src="@/components/manufacturing/exchange.png" >
           </div>
          <p class="item_ps">SO物料交接</p>
         </div>
       </div>

        <div class="se_body_h">
         <div class="se_body_item" @click="get_select('/MRHandover')">
           <div class="se_body_div">
              <img class="image_item1" src="@/components/warehouse/selectlibrary/mrHandover@2x.png" >
           </div>
          <p class="item_ps">MR物料交接</p>
         </div>
         <div class="se_body_item se_widths" @click="get_select('/MobileInventory')">
           <div class="se_body_div">
          <img class="image_item1" src="@/components/warehouse/selectlibrary/inventory@2x.png" >
          </div>
          <p class="item_ps">移动库存</p>
         </div>
         <div class="se_body_item" @click="get_select('/Personallist')">
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{Personal_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/unhanded@2x.png" >
           </div>
           </div>
          <p class="item_ps">未交接清单</p>
         </div>
       </div>
        </cube-slide-item>
     
        <cube-slide-item>
           <div class="se_body_h">
         <div class="se_body_item" @click="get_select('/MTR')">
           <div class="se_body_div">
             <div class="se_body_notice">
              <div class="Select_notice">{{MTR_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/mtr.png" >
            </div>
           </div>
          <p class="item_ps">MTR合同移库</p>
         </div>
         <div class="se_body_items se_widths">
           <div class="se_body_div">
          <!-- <img class="image_item1" src="@/components/warehouse/selectlibrary/inventory@2x.png" > -->
          </div>
          <p class="item_ps"></p>
         </div>
         <div class="se_body_items" >
           <div class="se_body_div">
             <!-- <div class="se_body_notice">
              <div class="Select_notice">{{Personal_number}}</div>
              <img class="image_items" src="@/components/warehouse/selectlibrary/unhanded@2x.png" >
           </div> -->
           </div>
          <p class="item_ps"></p>
         </div>
       </div>
        </cube-slide-item>
       </cube-slide>
     </div>
     </div>
    </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getData, findIndex } from 'common/helpers/util'
import { promptInfo } from 'common/js/dialog'
import { getremindercount } from 'common/js/httpConnection'
export default {
  data () {
    return {
      showtext: this.showtext,
      time: Date.parse(new Date()),
      name: this.text.name,
      datas: '',
      GOdownEntry_number: '',
      PO_number: '',
      SO_number: '',
      MR_number: '',
      TT_number: '',
      MTR_number: '',
      Personal_number: '',
      Materialwithdrawal_number: '',
      getpathArr:'',
      workCode: '',
      loop: false,
      autoPlay: false,
      showDots: true,
      slideOptions: {
        listenScroll: true,
        probeType: 2,
        directionLockThreshold: 0
      },
    }
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
    this.workCode = obj.warehouseCode ? obj.warehouseCode : ''
    this.getpathArr = this.$route.query.pathArr
  },
  methods: {
    handleShow() {
      promptInfo(this, '库位', this.workCode)
    },
    get_select (path) {
      this.$router.push(path)
    },
    exit () {
      // this.$router.back()
      this.$router.push('/')
    },
    routerGoGo(path) {//显示的路由
        //  const Arrs = ['/Selectlibrary','/exception']
        // const index = Arrs.indexOf(path)
        //console.log(this.$route.query.pathArr,"路由传的值")
      const pathArr = this.$route.query.pathArr
      const index = this.$route.query.pathArr.indexOf(path)
      if (index < 0) {
        return
      }
      this.$router.push({path:path,query:{pathArr}})
    },
  },
  mounted () {
    getremindercount().then((response) => {
      console.log(response)
      if (response.status === 0) {
        this.showToast(this, response.errorMsg)
        return
      }
      var result = response.result
      if (result.soinstockCount > 1000) {
        this.GOdownEntry_number = '999+'
      } else {
        this.GOdownEntry_number = result.soinstockCount
      }
      this.PO_number = result.poArrivalCount
      this.SO_number = result.soMaterielReserveCount
      this.MR_number = result.mrpickingCount
      this.TT_number = result.ttMoveLibraryCount
      this.MTR_number = result.mtrMoveLibraryCount
      this.Personal_number = result.nonhandoverCount
      this.Materialwithdrawal_number = result.backInStockCount
    })
  }
}
</script>

<style>
.Selectlibrarys{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: #e6e0e0;
}
.image{
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  width: 100%;
  height: 25%;
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
.work {
  width: 200px;
  margin-left: 5px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis
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
.Selectlibrarys_header{
    position: absolute;
    height: 6%;
    top: 25%;
    left: 0;
    right: 0;
    background: #fff;
}
.Selectlibrarys_text {
   display: flex;
   justify-content: space-between;
   align-items: center; 
   height: 100%;
   font-size: 13px;
   padding-left: 20px;
   padding-right: 20px;
}
.se_widths{
  margin-left: 0.5%;
  margin-right: 0.5%;
}
.names {
  display: flex;
  justify-content: start;
  align-items: center; 
  overflow: hidden;
}
.link-go {
  margin-left: 10px;
  font-size: 14px;
}
.se_body{
    position: absolute;
    width: 100%;
    top: 32%;
    bottom: 0;
}
.se_body_h{
   display: flex;
   justify-content: center;
   align-items: center;
   width: 100%;
   height: 103px;
   margin-top: 2px;
}
.se_body_div{
  display: flex;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 75px;
}
.se_body_notice{
  width: 55px;
  height: 75px;
}
.image_items{
  width: 50px;
  height: 50px;
}
.image_item1{
  margin-top: 15px;
  width: 50px;
  height: 50px;
}
.se_body_item{
  text-align: center;
  width: 100%;
  height: 100%;
  background: #fff;
}
.se_body_items{
  text-align: center;
  width: 100%;
  height: 100%;
  background: #e6e0e0;
}
.item_ps{
  text-align: center;
  font-size: 13px;
}
.sp_exit{
  margin-left: 10px;
  width: 20px;
  height: 20px;
}
.Select_notice{
    width: 17px;
    height: 17px;
    position: relative;
    background: red;
    left: 45px;
    top: 15px;
    display: flex;
    text-align: center;
    justify-content: center;
    align-items: center;
    color: #fff;
    border-radius:100px;
    font-size: 8px;
}
</style>
