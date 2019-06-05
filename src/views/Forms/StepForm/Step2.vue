<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账号"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        {{ step.payAccount }}
      </a-form-item>
      <a-form-item
        label="付款密码"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payPassword',
            {
              initialValue: step.payPassword,
              rules: [{ required: true, message: '请输入付款密码' }]
            }
          ]"
          type="password"
          placeholder="请输入付款密码"
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="onPrev">上一步</a-button>
        <a-button type="primary" @click="handleSumbit" style="margin-left: 8px;"
          >提交</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data() {
    this.form = this.$form.createForm(this);
    return {
      formItemLayout: {
        labelCol: { span: 4 },
        wrapperCol: { span: 14 }
      }
    };
  },
  computed: {
    step() {
      return this.$store.state.form.step;
    }
  },
  methods: {
    handleSumbit() {
      const { form, $store, step } = this;
      form.validateFields((err, values) => {
        if (!err) {
          // 提交 vuex store
          // 将第一步存储到 vuex state 中
          $store.dispatch({
            type: 'form/submitStepForm',
            payload: { ...values, ...step }
          });
        }
      });
    },
    onPrev() {
      this.$router.push('/form/step-form/info');
    }
  }
};
</script>

<style></style>
