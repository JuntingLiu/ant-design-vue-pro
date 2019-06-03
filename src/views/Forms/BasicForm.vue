<template>
  <div>
    <a-form :layout="formLayout" :form="form">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'fieldA',
            {
              // 只初始化一次，后续需要修改得使用
              initialValue: fieldA,
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handelSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formLayout: 'horizontal',
      fieldA: 'hello',
      fieldB: ''
    };
  },
  computed: {
    formItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 }
          }
        : {};
    },
    buttonItemLayout() {
      const { formLayout } = this;
      return formLayout === 'horizontal'
        ? {
            wrapperCol: { span: 14, offset: 4 }
          }
        : {};
    }
  },
  beforeCreate() {
    // 构建一个 Form 实例
    this.form = this.$form.createForm(this);
  },
  mounted() {
    // 模拟编辑接口, 使用此方式，动态改变表单数据值
    setTimeout(() => {
      this.form.setFieldsValue({ fieldA: 'hello vue!' });
    }, 3000);
  },
  methods: {
    handleFormLayoutChange(e) {
      this.formLayout = e.target.value;
    },
    handelSubmit() {
      // form 实例的 校验字段 API
      this.form.validateFields((err, values) => {
        if (!err) {
          console.log('校验通过后的数据：', values);
          // 数据通过，发送给服务端
          // ...
          // 成功后，数据同步到当前
          Object.assign(this, { fieldA: 'hellossss' });
          // this.form.setFieldsValue({ fieldA: 'hello world!' }); 也只有这种发式 DOM 上的数据值才能同步
        } else {
          console.warn('error', err);
        }
      });
    }
  }
};
</script>
