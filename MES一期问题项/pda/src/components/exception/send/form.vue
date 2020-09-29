<template>
  <div class="formBox">
    <div class="common-ticket ">
      <div class="ticket-unit">
        <li class="unit">
          <p class="child">
            <span class="desc span-box" style="width: 70px">工票号:</span>
            <!-- <span class="desc">{{model.numberCode,}}</span> -->
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 270px"
                v-model="model.numberCode"
              />
            </span>
            
          </p>
        </li>
        <li class="unit border">
          <p class="child">
            <span class="desc span-box" style="width: 35px">车间:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 110px"
                v-model="model.workshopCode"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc span-box">工区:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 110px"
                v-model="model.workCenterNo"
              />
                  <!-- <cube-select
                    v-model="model.exceptionBigTypeCode"
                    class="cubeSelect"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    :options="firstOptions"
                    :autoPop="false"
                    @picker-show="handleOpenInput"
                  ></cube-select> -->
            </span>
          </p>
        </li>
        <li class="unit">
          <p class="child">
            <span class="desc span-box" style="width: 35px">车号:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 48px"
                v-model="model.carNo"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc span-box  " style="width: 65px">项目号:</span>
            <span class="desc ">
              <input
                type="text"
                class="child-text"
                style="width: 48px"
                v-model="model.projectId"
              />
            </span>
          </p>
          <p class="child">
            <span class="desc" style="width: 50px">列号:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 48px"
                v-model="model.trainNo"
              />
            </span>
          </p>
        </li>
        
        <!-- <li class="unit">
          <p class="child">
            <span class="desc"></span>
            <span class="desc"></span>
          </p>
        </li> -->
      </div>
    </div>
    <div class="common-ticket">
      <div class="ticket-unit">
        <li class="unit content">
          <p class="child">
            <span class="desc span-box">异常描述:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 253px"
                v-model="model.exceptionName"
              />
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常分类:</span>
            <!-- <div>
              
            </div> -->
            <span style="display: flex">
              <span style="display: flex; ">
              <div style="display: flex;">
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionBigTypeCode"
                    class="cubeSelect"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    :options="firstOptions"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            <span style="display: flex; margin-left: 5px;">
              <div style="display: flex;">
                <!-- <cube-button @click="showCscadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionSmallTypeCode"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    class="cubeSelect"
                    :options="secendOptions"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            <span style="display: flex; margin-left: 5px;">
              <div style="display: flex;">
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionTypeCode"
                    style="font-size: 10px;line-height: 20px;padding-left: 2px;padding-right: 2px"
                    class="cubeSelect"
                    :options="options"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
            </span>
            
          </p>
        </li>
        <!-- <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常中类:</span>
            <span style="display: flex; ">
              <div style="display: flex;">
                <span class="desc">
                  <cube-select
                    v-model="model.secendOptions"
                    class="cubeSelect"
                    :options="secendOptions"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
          </p>
        </li> -->
        <!-- <li class="unit content">
          <p class="child" style="display: flex">
            <span class="desc span-box">异常小类:</span>
            <span style="display: flex; ">
              <div style="display: flex;">
                <span class="desc">
                  <cube-select
                    v-model="model.exceptionTypeCode"
                    class="cubeSelect"
                    :options="options"
                    :autoPop="false"
                  ></cube-select>
                </span>
              </div>
            </span>
          </p>
        </li> -->
        <li class="unit content">
          <!-- <p class="child">
            <span class="desc span-box">异常原因:</span>
            <span class="desc">
              <input
                type="text"
                class="child-text"
                style="width: 180px"
                v-model="model.exceptionReason"
              />
            </span>
          </p> -->
          <p class="child" style="display: flex">
            <span class="desc span-box">异常原因:</span>
            <span style="display: flex; ">
              <div style="display: flex;">
                <!-- <cube-button @click="showCascadePicker">{{dataCode}}</cube-button> -->
                <span class="desc">
                  <!-- <cube-select
                    v-model="model.exceptionReason"
                    class="cubeSelect"
                    style="width: 253px"·
                    :options="reasonOptions"
                    :autoPop="false"
                  ></cube-select> -->
                  <input
                type="text"
                class="child-text"
                style="width: 253px"
                v-model="model.exceptionReason"
              />
                </span>
              </div>
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child">
            <span class="desc span-box" style="width: 65px">发起人:</span>
            <span class="desc">
              <input type="text" class="child-text" style="width: 80px" v-model="groupInfos.startUser" readonly/>
            </span>
          </p>
          <p class="child">
            <span class="desc span-box" style="width: 63px">班组:</span>
            <span class="desc">
              <input type="text" class="child-text" style="width: 80px" readonly disabled  v-model="groupInfos.teamGroupCode" />
            </span>
          </p>
          
        </li>
         <!-- <li class="unit content">
           
        </li> -->
        <li class="unit content">
          <p class="child">
            <span class="desc span-box">位置:</span>
            <span class="desc">
              <input type="text" class="child-text" :style="inputWidth" v-model="model.location" />
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child">
            <span class="desc span-box">影响范围:</span>
            <span class="desc">
              <textarea class="child-text" :style="inputWidth" rows="2" v-model="model.exceptionExtent" />
            </span>
          </p>
        </li>
        <li class="unit content">
          <p class="child">
            <span class="desc span-box">备注:</span>
            <span class="desc">
              <textarea class="child-text" :style="inputWidth" rows="2" v-model="model.remark" />
            </span>
          </p>
        </li>
        
      </div>
    </div>
    <!-- <Uploader
      title="上传图片"
      v-model="model.photoIds"
      :multiple="true"
      name="photoIds"
      :autoUpload="false"
      limit="20"
    /> -->

    <!-- <input type="file" accept="image/*" id="filed" />
    <span @click="click">点击</span>-->
  </div>
</template>

<script>
import { groups } from './constants';
import {
  getExceptionTypeByParentId,
  getUserByNfc,
  getReasonListByExceptionCode,
  getTypeList,
  getTypeDeptList,
  getDeptGroupListByDeptCode,
  getGroupUserListByGroupCode
} from 'api/exception';
import Uploader from 'vux-uploader-component';

// ];
export default {
  components: {
    Uploader
  },
  props: {
    model: {
      default() {
        return {
          photoIds: [],
          exceptionName: '',
          startUser: '',
          exceptionCode: '',
          ticketCode: '',
          projectId: '',
          trainNo: '',
          workCenterNo: '',
          location: '',
          order: '',
          carNo: '',
          exceptionTypeCode: '',
          exceptionTypeName: '',
          exceptionReason: '',
          remark: '',
          teamGroupCode: '',
          style: {},
          numberCode: '',
          priority: '',
          firstOptions: '',
          secendOptions: '',
          workshopCode: ''
        };
      }
    }
  },
  data() {
    return {
      // model: {},
      inputWidth: {
        width: '253px'
      },
      isShowInput: false,
      schema: {
        groups
      },
      groupInfos: {
        startUser: '',
        teamGroupCode: ''
      },
      code: this.text.code,
      cascadeData: '',
      dataCode: '',
      options: [],
      firstOptions: [],
      reasonOptions: [],
      secendOptions: [],
      teamGroupOptions: [],
      userInfo: {}
    };
  },
  beforeUpdate() {
    this.$createDialog({
      type: 'confirm',
      content: this.model.projectId
    })
  },
  // updated() {

  // },
  created() {
    this.getExceptionTypeList(undefined, 'firstOptions');
    const userInfo = JSON.parse(sessionStorage.getItem('userInfo'))
    if (userInfo) {
      this.userInfo = userInfo
      console.log(userInfo)
      this.getUserByNfc(userInfo.nfcNo)
      this.model.startUser = userInfo.name
    }
    // this.getUserByNfc('4C443D9F')
  },
  mounted() {
    // console.log(this.c·ascadeData);
    // window.beCalledNfc = this.beCalledNf·c

    // getExceptionTypeList
  },
  // updated() {
  //   log(this, this.model.projectId)
  // },
  watch: {
    cascadeData(oldValue, newValue) {
      if (newValue !== '') {
        this.cascadePicker = this.$createCascadePicker({
          title: '请选择',
          data: newValue,
          selectedIndex: [0, 1],
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        });
      }
    },
    'model.exceptionBigTypeCode': function(nextValue, oldValue) {
      // this.getExceptionTypeList(nextValue, 'secendOptions');
      if (nextValue !== '') {
        console.log(this.firstOptions)
        // this.$createDialog({
        //   content: nextValue
        // }).show()
        // const data = this.firstOptions.filter(item => {
        //   return item.exceptionTypeCode === nextValue
        // })
        // console.log(data)
        // this.formData.exceptionBigName = data[0].exceptionTypeName || ''
        getTypeDeptList({ exceptionTypeCode: nextValue }).then(res => {
          console.log(res.data.data.rows)
          let data = []
          res.data.data.rows.forEach(item => {
            item.value = item.exceptionDeptCode
            item.text = item.exceptionDeptName
            // data.push({
            //   value: item.exceptionDeptCode,
            //   text: item.exceptionDeptName
            // })
            // data = {

            // }
          })

          this.secendOptions = []
          this.secendOptions = res.data.data.rows
          // this.secendOptions = res.data.data.rows
          // let data = {
          //     value: item.exceptionTypeCode,
          //     text: item.exceptionTypeName
          //   }

            // this[optionData].push(data)
        })
      }
    },
    'model.exceptionSmallTypeCode': function(nextValue, oldValue) {
      if (nextValue !== '') {
        getDeptGroupListByDeptCode({ exceptionDeptCode: nextValue }).then(res => {
          // let data = {}
          // this.$createDialog({
          //   content: res.data.data
          //   // type: 'confirm'
          // }).show()
          // console.log(res.data)
          res.data.data.forEach(item => {
            item.value = item.exceptionGroupCode
            item.text = item.exceptionGroupName
          })

          this.options = []
          this.options = res.data.data
        })
      }
      // this.getExceptionTypeList(nextValue, 'options');
      // this.$createDialog({
      //   content: '11111',
      //   type: 'confirm'
      // }).show()
    },
    'model.exceptionTypeCode': function(nextValue, oldValue) {
      const data = this.options.filter(item => {
        return item.exceptionTypeCode === nextValue
      })
      console.log(data)
      // this.model.exceptionTypeName = data[0].exceptionTypeName
      getReasonListByExceptionCode({ exceptionTypeCode: nextValue }).then(
        res => {
          if (res.data.msg === '操作成功') {
            const resultData = res.data.data
            resultData.forEach(item => {
              item.text = item.exceptionReason
              item.value = item.id
            })
            this.reasonOptions = resultData
          }
        }
      )
    }
  },
  methods: {
    handleOpenInput() {
      this.isShowInput = true
    },
    showCascadePicker() {
      this.cascadePicker.show();
    },
    selectHandle(data) {
      this.dataCode = data[0];
    },
    getUserByNfc(code) {
      getUserByNfc({nfcNo: code}).then(res => {
        console.log(res)
        if (res.data.msg === '操作成功') {
          const resultData = res.data.data

          this.groupInfos.startUser = resultData.employeeName
          this.groupInfos.teamGroupCode = resultData.teamGroupName
          this.model.workshopCode = resultData.workshopName
          // console.log(this.model.teamGroupCode)
        } else {
          console.log(res.data)
          const toast = this.$createToast({
            txt: res.data.msg,
            type: 'txt'
          })
          toast.show()
        }
      })
    },
    getExceptionTypeList(id = 0, optionData) {
      // console.log(optionData)
      getTypeList({ parentCode: id }).then(res => {
        // console.log(res);console.log(1111)
        if (res.data.code === 0) {
          // log(this, optionData)

          if (optionData === 'secendOptions') {
            this[optionData] = []
            this.options = []
          } else {
            this[optionData] = []
          }

          // console.log(res.data.data)
          res.data.data.rows.forEach(item => {
            let data = {
              value: item.exceptionTypeCode,
              text: item.exceptionTypeName
            }

            this[optionData].push(data)
          })
        }
      });
    },
    handleInputBlur() {
      this.getUserByNfc()
    },
    resetTeam() {
      // this.$createDialog({
      //   content: '1111'
      // }).show()
      this.groupInfos = {
        startUser: '',
        teamGroupCode: '',
        workshopCode: ''
      }
    },
    // 重置
    resetHandler(e) {
      this.groupInfos = {
        startUser: undefined,
        teamGroupCode: undefined
        // workshopCode: undefined
      }
      this.model = {
        photoIds: [],
        exceptionName: undefined,
        exceptionCode: undefined,
        ticketCode: undefined,
        projectId: undefined,
        trainNo: undefined,
        workCenterNo: undefined,
        location: undefined,
        order: undefined,
        exceptionTypeCode: undefined,
        exceptionTypeName: undefined,
        exceptionReason: undefined,
        remark: undefined,
        workshopCode: undefined,
        style: {},
        carNo: undefined,
        numberCode: undefined,
        priority: undefined,
        firstOptions: undefined,
        secendOptions: undefined
      };
    }
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

.formBox >>> .vux-uploader_info {
  display: none;
}

.span-box {
  display: inline-block;
  width: 80px;
}

.content {
  // padding-top: 10px;
  padding-bottom: 10px;
}
.child {
  display: flex
}
.child .cubeSelect {
  padding: 0;
  width: 80px;
  height: 20px;
  line-height: 20px;
  font-size: 10px;
  margin-left: 1px;
  padding-left: 2px;
  padding-right: 2px
  white-space:nowrap;
  text-overflow:ellipsis;
  overflow:hidden;
}
.formBox >>> .vux-uploader .vux-uploader_bd .vux-uploader_input-box {
  width: 44px;
  height: 44px
}
</style>