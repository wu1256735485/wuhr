<template>
  <div>
    <v-header :title="'异常发起'"></v-header>
    <!-- <cube-loading></cube-loading> -->
    <div class="common-wrapper">
      <div v-show="isChildren" class="common-inside">
        <Form  ref="form" :model="list" />
        <div style="padding:10px;font-size: 14px;color: #3b85e6">
          <i class="cubeic-camera" @click="tabkeCamera" style="margin-right: 10px">拍照</i>
          <i class="cubeic-picture" @click="callAlbum">相册</i>
        </div>
        <i class="el-icon-picture"></i>
        <div class="imgs-container" v-if="isShow" style="padding-left: 10px">
          <!-- <span>x</span> -->
          <img
            :src="img"
            v-for="(img, index) in imgs"
            :key="img"
            style="width: 70px; height: 70px; margin-right: 10px"
            @click="handleImgsClick(index)">
        </div>
      </div>
      <footer-oper @search="_seeWorkBookNo" @read="handleFile" @readNfc="beCalledNfc">
        <div class="footer-btn">
          <div class="btn" @click="handleSend">提交</div>
          <div class="btn" @click="handleReset">重置</div>
        </div>
      </footer-oper>
      
    </div>
    
  </div>
</template>

<script>
import { getStartDetail, saveException } from 'api/exception';
import VHeader from '../v-header/v-header';
import FooterOper from './components/footer';
import Form from './form';
import { log } from 'common/js/dialog';
export default {
  data() {
    return {
      ticketCode: '',
      ticket: '',
      isChildren: true,
      list: {projectId: ''},
      info: [],
      message: '',
      validity: {},
      valid: undefined,
      numberCode: '',
      imgs: [],
      initialIndex: 1,
      isShow: true
    };
  },
  created() {
    // if (!this.$route.query.numberCode) return;
    this.ticket = this.$route.query.numberCode;
    if (this.ticket) {
      this._seeWorkBookNo(this.ticket);
    }
    // this.showPopup('myPopup')
  },
  mounted() {
    window.callAlbum = this.takepictures
    window.takepictures = this.takepictures
  },
  methods: {
    // showPopup(refId) {
    //   const component = this.$refs[refId]
    //   component.show()
    //   setTimeout(() => {
    //     component.hide()
    //   }, 1000)
    // },
    callAlbum() {
      if (this.imgs.length <= 1) {
        $App.callAlbum()
      } else {
        this.$createDialog({
          content: '最多上传两张图片'
        }).show()
      }
    },
    // 展示照片
    handleImgsClick(index) {
      this.initialIndex = index
      const params = {
        $props: {
          imgs: this.imgs,
          initialIndex: 'initialIndex', // 响应式数据的key名
          loop: false
        },
        $events: {
          change: (i) => {
            this.initialIndex = i
          }
        }
      }
      this.$createImagePreview({ ...params }).show()
    },

    // nfc回调方法
    beCalledNfc(code) {
      this.$refs.form.resetTeam()
      // this.$createDialog({
      //   content: '111111'
      // }).show()
      this.$refs.form.getUserByNfc(code)
    },
    handleSend() {
      let data = Object.assign({}, {...this.$refs.form.model, ...this.$refs.form.groupInfos});
      // this.$createDialog({
      //   content: data
      // }).show()
      // console.log(data)
      // 验证是否输入
      const incloudData = [
        {title: '异常描述 ', value: 'exceptionName'},
        {title: '异常类型 ', value: 'exceptionBigTypeCode'},
        {title: '部门 ', value: 'exceptionSmallTypeCode'},
        {title: '小组 ', value: 'exceptionTypeCode'},
        {title: '发起人', value: 'startUser'}
      ]
      // console.log(data.startUser.length)
      Object.keys(data).forEach(key => {
        if (data[key] == null || typeof data[key] === 'undefined') {
          data[key] = ''
        }
      })
      let sum = 0
      let str = '';
      incloudData.forEach(item => {
        if (!data.hasOwnProperty(item.value) || data[item.value] === '') {
          sum++
          str += item.title
        }
      })
      // this.sendData(data);
      if (sum === 0) {
        this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: '是否发起?',
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          },
          onConfirm: () => {
            this.sendData(data);
          }
        }).show();
      } else {
        this.$createDialog({
          type: 'confirm',
          title: '提示',
          content: `请输入${str} 信息`,
          confirmBtn: {
            text: '确定',
            active: true
          },
          cancelBtn: {
            text: '取消',
            active: false
          }
          // onConfirm: () => {
          //   this.sendData(data);
          // }
        }).show();
      }
    },

    // example:
    // 提交form表单
    sendData(data) {
      data.photoIds = this.imgs
      let formData = new FormData();
      for (let key in data) {
        if (key === 'photoIds') {
          continue;
        }
        formData.append(key, data[key]);
      }
      if (Array.isArray(data.photoIds) && data.photoIds.length > 0) {
        data.photoIds.forEach(item => {
          let file = this.dataURLtoFile(item, `异常图片${Date.now()}.jpg`)
          formData.append('photoIds', file);
          if (this.numberCode !== '') {
            formData.append('numberCode', this.numberCode);
          }
          saveException(formData).then(res => {
            // this.$createDialog({
            //   content: res,
            //   type: 'confirm'
            // }).show()
            // log(this, res.data)
            if (res.data.msg === '操作成功') {
              log(this, res.data.msg);
              this.list = {projectId: ''}
              this.imgs = []
              this.$refs.form.model = {};
            }
          });
          // formData.append("photoIds", file);
        });
      } else {
        formData.append('photoIds', '');
        // log(this, '1111')
        saveException(formData).then(res => {
          log(this, res)
          if (res.data.msg === '操作成功') {
            log(this, res.data.msg);
            this.list = {projectId: ''}
            this.imgs = []
            this.$refs.form.model = {};
          }
        });
      }
    },
    // base64转file
    dataURLtoFile(dataurl, filename) {
      let arr = dataurl.split(',')
      let mime = arr[0].match(/:(.*?);/)[1]
      let bstr = atob(arr[1])
      let n = bstr.length
      let u8arr = new Uint8Array(n)
      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }
      // log(this, mime)
      return new File([u8arr], filename, { type: mime });
    },

   // blob转file
    getFile(blob, type, name) {
      // console.log(blob, '1111');
      // console.log(type);
      let newBlob = new Blob([blob], { type });
      var reader = new FileReader();
      // let newFile = new File(["teett"], { type: "txt" });
      let buffer;
      let file;
      // let isSend = true;
      // const data = this.$refs.form.model;
      reader.readAsDataURL(newBlob);
      // reader.readAsArrayBuffer(newBlob)
      const promise = new Promise((resolve, reject) => {
        reader.onload = function(e) {
          // this.sendData(data)
          // target.result 该属性表示目标对象的DataURL
          // console.log(e.target.result);
          buffer = e.target.result;
          // file = new File([buffer], name, {
          //   type
          // });
          resolve(buffer);
        };
      });
      return promise;

      // console.log(file, "111111");
      // console.log(isSend);
      // if (isSend) {
      //   // console.log(1111);
      //   // console.log()
      //   if (file) {
      //     console.log(file);
      //   }
      //   return file;
      // }

      // console.log("buffer", buffer);
    },
    // 重置
    handleReset() {
      // const gobj = this.tabkeCamera()(2, 3)
      // this.$createDialog({
      //   content: gobj
      // }).show()
      // log(this, 11111)
      this.list = {
        projectId: ''
      }
      this.imgs = []
      this.$refs.form.resetHandler();
    },
    // 扫描工票
    handleFile(data) {
      if (!data) {
        this.showPopup('未扫描到工票信息');
        return;
      }
      // this.$createDialog({
      //   content: '111'
      // }).show()
      this.operationSerialNumber = data;
      this._seeWorkBookNo(data);
    },
    // 查询工票相关详细信息
    _seeWorkBookNo(code) {
      // log(this, code)
      // this.isChildren = false
      getStartDetail({ numberCode: code }).then(res => {
        // console.log(res);
        this.isChildren = false
        setTimeout(() => {
          this.isChildren = true
        }, 200)
        if (res.data.msg === '操作成功') {
          let obj = res.data.data;
          // this.isChildren = true
          // isManufact === TRUE 是新造单子 carNo 取 车号 trainNo 取列号
          // isManufact === FALSE 是检修单子 carNo 取 客户车号 trainNo 取客户列号
          //
          const isNewCreate = obj.isManufact === 'TRUE'
          const carNo = isNewCreate ? obj.carNo : obj.cCarNo
          const trainNo = isNewCreate ? obj.trainNo : obj.cTrainNo
          this.list.projectId = obj.projectId || ''
          this.list.trainNo = trainNo || ''
          this.list.workCenter = obj.workCenterNo || ''
          this.list.numberCode = code;
          // this.list.teamGroupCode = obj.teamGroupCode;
          this.list.workshopCode = obj.workshopName || ''
          this.list.carNo = carNo || ''
          this.list.workCenterNo = obj.workCenterNo || ''
          obj.startUser = this.text.name;
          // console.log(obj);
          this.list.ticketCode = obj.ticketCode;
          // this.handleReset()
        } else {
          this.showPopup('获取数据异常');
        }
      });
    },
    // 拍照
    tabkeCamera() {
      // let datas, codes;
      if (this.imgs.length <= 1) {
        $App.callCamera()
      } else {
        this.$createDialog({
          content: '最多上传2张图片'
        }).show()
        // return
      }

      // this.$createDialog({
      //   content: dataBase
      // }).show()
      // window.callCamera()
    },
    // 获取照片信息
    takepictures(base64) {
      this.isShow = false
      this.imgs = [...this.imgs, base64]
      // this.$createDialog({
      //   type: 'confirm',
      //   content: this.imgs
      // }).show()
      setTimeout(() => {
        this.isShow = true
      }, 200)

      // this.$$createDialog({
      //   content: {
      //     path
      //   }
      // }).show()

      // this.showImagePreview([data])

      this.$$createDialog({
        content: {
          code,
          data
        }
      }).show()
    },
      // return resultData
    // 提示消息
    showPopup(name, message = '操作成功') {
      this.message = message;
      const component = this.$refs[name];
      component.show();
      setTimeout(() => {
        component.hide();
      }, 2000);
    }
  },
  components: {
    FooterOper,
    VHeader,
    Form
  }
};
</script>

<style lang="stylus" scoped>
@import '~common/style/common.styl';

.cube-my-popup {
  .cube-popup-message {
    color: #fff;
    padding: 20px;
    background: rgba(0, 0, 0, 0.8);
  }
}
</style>