<template>
  <div style="display: flex; justify-content: end; margin: 5px">
    <a-button
      type="primary"
      :disabled="!dataSource.length"
      @click="applyAttendance"
      >前往补签</a-button
    >
    <a-modal
      v-model:visible="visible"
      title="提交补签申请"
      @ok="submit"
      cancelText="取消"
      okText="提交"
      destroyOnClose
    >
      <applyAttendance :user="dataSource[0].name" />
    </a-modal>
  </div>
  <a-table :dataSource="dataSource" :columns="columns" />
</template>

<script>
import { ref } from 'vue'
import { message } from 'ant-design-vue'
import applyAttendance from './components/applyAttendance.vue'
export default {
  components: { applyAttendance },
  setup () {
    const dataSource = ref([
      {
        key: '1',
        name: '胡彦斌',
        date: '2022-04-20'
      },
      {
        key: '2',
        name: '胡彦祖',
        date: '2022-04-19'
      }
    ])

    const columns = ref([
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '考勤异常日期',
        dataIndex: 'date',
        key: 'date'
      }
    ])

    const form = ref({
      date: '',
      reason: ''
    })
    const visible = ref(false)
    const confirmLoading = ref(false)
    const value1 = ref('')

    function applyAttendance () {
      visible.value = true
    }

    function checkForm (form) {
      if (!form.date) {
        return '请填写补签日期'
      }
      if (!form.reason) {
        return '请填写漏签原因'
      }

      return true
    }

    function submit () {
      const params = form.value
      const validate = checkForm(params)
      if (validate !== true) {
        message.error(validate)
        return
      }
      console.log('ok')
      console.log(form.value)
    }

    return {
      dataSource,
      columns,
      applyAttendance,
      visible,
      confirmLoading,
      submit,
      value1,
      form
    }
  }
}
</script>
