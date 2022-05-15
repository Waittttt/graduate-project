<template>
  <h3>补签卡申请-{{user|| ''}}</h3>
  <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
    <a-form-item
      label="补签日期"
      name="date"
      :rules="[{ required: true, message: '请填写补签日期' }]"
    >
      <a-space direction="vertical" :size="12">
        <a-date-picker
          v-model:value="form.date"
          :disabled-date="disabledDate"
          placeholder="请选择补签日期"
        />
      </a-space>
    </a-form-item>
    <a-form-item
      label="原因"
      name="reason"
      :rules="[{ required: true, message: '请填写漏签原因' }]"
    >
      <a-textarea
        v-model:value="form.reason"
        placeholder="请输入漏签原因"
      ></a-textarea>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from 'vue'
export default {
  props: {
    user: {
      type: String
    }
  },
  setup (props) {
    const form = ref({
      date: '',
      reason: ''
    })

    return {
      form
    }
  }
}
</script>
