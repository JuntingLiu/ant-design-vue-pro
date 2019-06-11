<template>
  <div>
    <a-form layout="horizontal" :form="form">
      <a-form-item
        label="付款账号"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <a-input
          v-decorator="[
            'payAccount',
            {
              initialValue: step.payAccount,
              rules: [{ required: true, message: '请输入付款账号' }]
            }
          ]"
          placeholder="请输入付款账号"
        />
      </a-form-item>
      <a-form-item
        label="收款账号"
        :label-col="formItemLayout.labelCol"
        :wrapperCol="formItemLayout.wrapperCol"
      >
        <ReceiverAccount
          v-decorator="[
            'receiverAccount',
            {
              initialValue: step.receiverAccount,
              rules: [
                {
                  required: true,
                  message: '请输入收款账号',
                  validator: (rule, value, callback) => {
                    if (value && value.number) {
                      callback();
                    } else {
                      callback(false);
                    }
                  }
                }
              ]
            }
          ]"
        />
      </a-form-item>
      <a-form-item>
        <a-button @click="handleSumbit">下一步</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import ReceiverAccount from '@/components/ReceiverAccount';

export default {
  components: {
    ReceiverAccount
  },
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
      const { form, $router, $store } = this;
      form.validateFields((err, values) => {
        if (!err) {
          // 提交 vuex store
          // 将第一步存储到 vuex state 中
          $store.commit({
            type: 'form/saveStepFormData',
            payload: values
          });
          $router.push('/form/step-form/confirm');
        }
      });
    }
  }
};
</script>

<style></style>
