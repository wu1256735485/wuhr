<template>
<div>
  <div class="desktop">
  <div class="swiper-container">
    <div class="swiper-wrapper">
    <div class="swiper-slide">
      <!-- <img src="./production.png" @click.stop="routerGo('/home')" /> -->
      <img v-if="this.pathArr.indexOf('/home')!=-1" src="./production.png" @click.stop="routerGo('/home')" />
      <img v-else src="./production1.png" @click.stop="routerGo('/home')" />
    </div>
    <div  class="swiper-slide">
      <img v-if="this.pathArr.indexOf('/Selectlibrary')!=-1" src="./Selectlibrary.png" @click.stop="routerGo('/Selectlibrary')" />
       <img v-else src="./Selectlibrary1.png" @click.stop="routerGo('/Selectlibrary')" />
    </div>
    <div   class="swiper-slide">
      <img v-if="this.pathArr.indexOf('/exception')!=-1" src="./exception.png" @click.stop="routerGo('/exception')" />
      <img v-else src="./exception1.png" @click.stop="routerGo('/exception')" />
    </div>
    <div class="swiper-slide">
      <img v-if="this.pathArr.indexOf('/assurance')!=-1" src="./quality.png" @click.stop="routerGo('/assurance')" />
      <img v-else src="./quality1.png" @click.stop="routerGo('/assurance')" />
    </div>
    <!-- <div class="row">
      <div class="selection">
        <button class="btn"
          :style="{background: searchPath('/home')}"
          @click.stop="routerGo('/home')">生产执行</button>
      </div>
      <div class="selection">
        <button class="btn"
          :style="{background: searchPath('/Selectlibrary')}"
          @click.stop="routerGo('/Selectlibrary')">仓库</button>
      </div>
    </div> -->
    <!-- <div class="row">
      <div class="selection">
        <button class="btn"
          :style="{background: searchPath('/exception')}"
          @click.stop="routerGo('/exception')">异常</button>
      </div>
      <div class="selection">
        <button class="btn">质保</button>
      </div>
    </div> -->
  </div>
  </div>
  </div>
</div>
</template>

<script>
import Swiper from 'swiper'
export default {
  props: {
    pathArr: {
      type: Array,
      default: () => []
    },
    status: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    searchPath(path) {
      const index = this.pathArr.indexOf(path)
      return index >= 0 ? '#3b85e6' : '#7e8c8d'
    },
    changePath(path){//判断图片是否置灰
      const index = this.pathArr.indexOf(path)
      return index >=0 ? './production' : './exception'
    },
    routerGo(path) {
      const index = this.pathArr.indexOf(path)
      if (index < 0) {
        this.showToast(this, '您没有权限')
        return 
      }
      this.$router.push({path:path,query:{pathArr:this.pathArr}})
    },
    //初始化swiper
    _initSwiper(){
       var mySwiper = new Swiper('.swiper-container', {
         slidesPerView : 3,
         centeredSlides : true,
        spaceBetween: 50,
        observer:true, //修改swiper自己或子元素时，自动初始化swiper
        observeParents:true,
        initialSlide :1,//默认第二个
    });
    }
  },
  watch: {
    status (newVal) {
      if (!newVal) {
        return
      }
      this._initSwiper()
    }
  }
}
</script>

<style scoped>
@import "../../../node_modules/swiper/dist/idangerous.swiper.css";
.btn{
  color: #fff;
  font-size :16px;
  width : 80px;
  height : 35px;
  line-height : 35px;
  border : none;
  border-radius : 60px;
  background : #3b85e6;
  outline : none;
}
.desktop{
   width: 80%;
  height : 200px;
  position : absolute;
  left : 50%;
  top : 90%;
  transform : translate(-50%, -110%);
  border-radius : 10px;
}
.row{
     display: flex;
    margin-top: 35px;
    position: relative;
    
  }
.selection{
      flex: 1;
      box-sizing: border-box;
      padding-left: 15px;
      line-height: 35px;
      letter-spacing: 2px;
}
img{
  height: 110px;
}
.btn{
  color: #fff;
    font-size: 16px;
    width: 80px;
    height: 35px;
    line-height: 35px;
    border: none;
    border-radius: 60px;
    background: #3b85e6;
    outline : none;
}
    .swiper-container {
      width: 100%;
      height: 100%;
    }
    .swiper-slide {
      text-align: center;
      font-size: 18px;
      width: 72px;
      height: 110px;
      transition: 300ms;
      transform: scale(0.9);
    }
	.swiper-slide-active,.swiper-slide-duplicate-active{
      transform: scale(1);
	}


</style>