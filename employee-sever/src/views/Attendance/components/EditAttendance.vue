<template>
  <h3>补签卡申请-{{ user || "" }}</h3>
  <a-form :model="form" :label-col="{ span: 4 }" :wrapper-col="{ span: 16 }">
    <a-form-item
      label="补签日期"
      name="date"
      :rules="[{ required: true, message: '请填写补签日期' }]"
    >
      <a-space direction="vertical" :size="12">
        <a-date-picker
          v-model:value="form.date"
          valueFormat="YYYY-MM-DD"
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
    <a-form-item>
      <div style="display: flex; justify-content: end">
        <a-button type="primary" @click="submit">提交</a-button>
        <a-button type="danger" style="margin-left: 5px" @click="close"
          >取消</a-button
        >
      </div>
    </a-form-item>
  </a-form>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { baseURL } from '../../../utils/constant'
import { message } from 'ant-design-vue'

export default {
  props: {
    user: {
      type: String
    },
    row: {
      type: Object,
      default: () => ({})
    }
  },
  emits: ['submit', 'close'],
  setup (props, { emit }) {
    const form = ref({
      date: '',
      reason: ''
    })

    console.log(props.row)

    function checkForm (form) {
      if (!form.date) {
        return '请填写补签日期'
      }
      if (!form.reason) {
        return '请填写漏签原因'
      }

      return true
    }

    async function submit () {
      try {
        const params = { ...form.value }
        const validate = checkForm(params)
        if (validate !== true) {
          message.error(validate)
          return
        }
        await axios.post(`${baseURL}/editAttendance`, { ...params })
        emit('submit')
      } catch (error) {}
    }

    function close () {
      emit('close')
    }

    return {
      form,
      submit,
      close
    }
  }
}
</script>
