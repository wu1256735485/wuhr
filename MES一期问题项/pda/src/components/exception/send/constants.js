const groups = [
  {
    legend: '异常发起',
    fields: [

      {
        type: 'input',
        modelKey: 'workbookNo',
        label: '工票号',
        props: {
          disabled: true
        }
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'projectNo',
        label: '项目号',
        props: {
          disabled: true,
          className: 'inputClass'
        },
        className: 'inputClass'
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'columnNo',
        label: '列号',
        props: {
          disabled: true,
          style: 'width: 10px'
        }
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'workCenter',
        label: '工区',
        props: {
          disabled: true
        }
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'startUser',
        label: '发起人',
        props: {
          disabled: true
        }
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'exceptionName',
        label: '异常名称',
        props: {
          placeholder: '请输入'
          // disabled: true
        }
        // validating when blur
      },
      // 异常编码
      {
        type: 'input',
        modelKey: 'exceptionCode',
        label: '异常编码',
        props: {
          placeholder: '请输入'
          // disabled: true
        }
        // validating when blur
      },
      {
        type: 'select',
        modelKey: 'priority',
        label: '优先级',
        props: {
          options: [{ value: '1', text: '一般' }, { value: '2', text: '紧急' }]
        }
      },

      {
        type: 'input',
        modelKey: 'location',
        label: '位置',
        props: {
          placeholder: '请输入'
          // disabled: true
        }
        // validating when blur
      },

      {
        type: 'input',
        modelKey: 'exceptionTypeCode',
        label: '异常类型',
        props: {
          placeholder: '请输入'
          // disabled: true
        }
        // validating when blur
      },
      {
        type: 'input',
        modelKey: 'exceptionReason',
        label: '异常原因',
        props: {
          placeholder: '请输入'
          // disabled: true
        }
        // validating when blur
      },
      // {
      //   type: 'upload',
      //   modelKey: '上传照片',
      //   label: 'Upload',
      //   events: {
      //     'file-removed': (...args) => {
      //       console.log('file removed', args)
      //     }
      //   },
      //   messages: {
      //     uploaded: '上传失败'
      //   }
      // },

      {
        type: 'textarea',
        modelKey: 'remark',
        label: '备注',
        props: {
          placeholder: '请输入'
        },
        // debounce validate
        // if set to true, the default debounce time will be 200(ms)
        debounce: 100
      }

    ]
  }
]
export {
  groups
}
