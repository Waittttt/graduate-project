<template>
  <div style="display: flex; justify-content: space-between; margin: 5px">
    <a-form
      :model="searchForm"
      style="display: flex; width: 200px; justify-content: space-between"
    >
      <a-form-item>
        <a-input
          v-model:value="searchForm.num"
          style="width: 200px"
          placeholder="请输入设备编号"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-input
          v-model:value="searchForm.name"
          style="width: 200px;margin-left:5px"
          placeholder="请输入设备名称"
        >
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          style="margin-left: 5px"
          @click="search"
        >
          搜索
        </a-button>
      </a-form-item>
      <a-form-item>
        <a-button @click="reset" style="margin-left: 5px">重置</a-button>
      </a-form-item>
    </a-form>
    <a-button type="primary" @click="applyWork">申请资产</a-button>
    <a-modal
      v-model:visible="addVisible"
      title="新增资产申请"
      :footer="null"
      destroyOnClose
    >
      <a-form :model="addForm">
        <a-form-item
          label="资产名称:"
          name="name"
          :rules="[{ required: true, message: '请选择资产名称!' }]"
        >
          <a-select
            v-model:value="addForm.name"
            style="width: 200px"
            placeholder="请选择资产名称"
          >
            <a-select-option value="Mac mini">Mac mini</a-select-option>
            <a-select-option value="笔记本">笔记本</a-select-option>
            <a-select-option value="台式机">台式机</a-select-option>
            <a-select-option value="显示器">显示器</a-select-option>
            <a-select-option value="测试机">测试机</a-select-option>
            <a-select-option value="办公升降桌">办公升降桌</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="申请数量:"
          name="count"
          :rules="[{ required: true, message: '请输入申请数量!' }]"
        >
          <a-input v-model:value="addForm.count" />
        </a-form-item>
        <a-form-item
          label="申请原因:"
          name="reason"
          :rules="[{ required: true, message: '请输入申请原因!' }]"
        >
          <a-input v-model:value="addForm.reason"></a-input>
        </a-form-item>
        <a-form-item>
          <div style="display: flex; justify-content: end">
            <a-button type="primary" @click="submitAdd">提交</a-button>
            <a-button style="margin-left: 5px" @click="close">取消</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
  <a-table :dataSource="dataSource" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button type="primary" @click="editWork(record.id)">编辑</a-button>
        <a-popconfirm
          title="你确认取消此申请?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteWork(record.id)"
        >
          <a-button
          type="danger"
          style="margin-left: 5px"
          >删除</a-button
        >
        </a-popconfirm>

      </template>
    </template>
  </a-table>
  <a-modal
    v-model:visible="editVisible"
    title="编辑加班申请"
    :footer="null"
    destroyOnClose
  >
    <a-form :model="editForm" :labelCol="{span:6}">
      <a-form-item
          label="资产名称:"
          name="name"
          :rules="[{ required: true, message: '请选择资产名称!' }]"
        >
          <a-select
            v-model:value="editForm.name"
            style="width: 200px"
            placeholder="请选择资产名称"
          >
            <a-select-option value="Mac mini">Mac mini</a-select-option>
            <a-select-option value="笔记本">笔记本</a-select-option>
            <a-select-option value="台式机">台式机</a-select-option>
            <a-select-option value="显示器">显示器</a-select-option>
            <a-select-option value="测试机">测试机</a-select-option>
            <a-select-option value="办公升降桌">办公升降桌</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="资产编号:"
        >
          <a-input v-model:value="editForm.num" disabled />
        </a-form-item>
        <a-form-item
          label="申请日期:"
        >
          <a-date-picker v-model:value="editForm.date" valueFormat="YYYY-MM-DD" disabled ></a-date-picker>
        </a-form-item>
        <a-form-item
          label="申请数量:"
          name="count"
          :rules="[{ required: true, message: '请输入申请数量!' }]"
        >
          <a-input v-model:value="editForm.count" />
        </a-form-item>

        <a-form-item
          label="申请原因:"
          name="reason"
          :rules="[{ required: true, message: '请输入申请原因!' }]"
        >
          <a-input v-model:value="editForm.reason"></a-input>
        </a-form-item>
      <a-form-item>
        <div style="display: flex; justify-content: end">
          <a-button type="primary" @click="submitEdit">提交</a-button>
          <a-button style="margin-left: 5px" @click="close">取消</a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
import { ref } from 'vue'
import axios from 'axios'
import { baseURL } from '../../utils/constant'
import { message } from 'ant-design-vue'
import dayjs from 'dayjs'
export default {
  setup () {
    const searchForm = ref({
      num: '',
      name: ''
    })

    const addForm = ref({
      name: '',
      count: '',
      reason: ''
    })

    const editForm = ref({
      name: '',
      count: '',
      reason: ''
    })

    const addVisible = ref(false)
    const editVisible = ref(false)

    const dataSource = ref([])
    const columns = ref([
      {
        title: '序号',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '设备名称',
        dataIndex: 'name',
        key: 'name'
      },
      {
        title: '设备编号',
        dataIndex: 'num',
        key: 'num'
      },
      {
        title: '申请数量',
        dataIndex: 'count',
        key: 'count'
      },
      {
        title: '申请原因',
        dataIndex: 'reason',
        key: 'reason'
      },
      {
        title: '申请时间',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '操作',
        dataIndex: 'action',
        key: 'action'
      }
    ])

    async function getList (query = {}) {
      const params = {
        user_id: localStorage.getItem('userid'),
        ...query
      }

      try {
        const { data } = await axios.get(`${baseURL}/device`, {
          params
        })
        console.log(data)
        dataSource.value = (data.data || []).map((item) => ({
          ...item,
          date: dayjs(item.date).format('YYYY-MM-DD')
        }))
      } catch (error) {}
    }

    getList()

    async function search () {
      await getList({ ...searchForm, num: searchForm.value.num.trim(), name: searchForm.value.name.trim() })
    }

    async function reset () {
      searchForm.value.num = ''
      searchForm.value.name = ''
      await getList()
    }

    function applyWork () {
      addVisible.value = true
    }

    async function editWork (id) {
      console.log(id)
      // const params = {
      //   user_id: localStorage.getItem('userid')
      // }

      try {
        const { data } = await axios.get(`${baseURL}/device/${id}`)
        console.log(data)
        // dataSource.value = (data.data || []).map((item) => ({
        //   ...item,
        //   date: dayjs(item.date).format('YYYY-MM-DD')
        // }))
        editForm.value = data.data[0]
        editVisible.value = true
      } catch (error) {}
    }

    async function deleteWork (id) {
      const params = { id }
      try {
        await axios.post(`${baseURL}/deleteDevice`, { ...params })
        handleSubmit('删除')
      } catch (error) {

      }
    }

    function close () {
      addVisible.value = false
      editVisible.value = false
    }

    function checkForm (form) {
      // if (!form.date) {
      //   return '请填写补签日期'
      // }
      // if (!form.reason) {
      //   return '请填写漏签原因'
      // }

      return true
    }

    function handleSubmit (msg) {
      message.success(`${msg}成功`)
        close()
        getList()
    }

    async function submitAdd () {
      try {
        const params = {
      ...addForm.value,
        user_id: localStorage.getItem('userid'),
        num: Math.random().toString(16).slice(3),
        date: dayjs(new Date()).format('YYYY-MM-DD')
}
        const validate = checkForm(params)
        if (validate !== true) {
          message.error(validate)
          return
        }
        await axios.post(`${baseURL}/addDevice`, { ...params })
        handleSubmit('添加')
      } catch (error) {}
    }

    async function submitEdit () {
      try {
        const params = { ...editForm.value, date: dayjs(new Date()).format('YYYY-MM-DD') }
        const validate = checkForm(params)
        if (validate !== true) {
          message.error(validate)
          return
        }
        await axios.post(`${baseURL}/editDevice`, { ...params })
        handleSubmit('编辑')
      } catch (error) {}
    }

    return {
      searchForm,
      search,
      reset,
      addVisible,
      editVisible,
      applyWork,
      submitAdd,
      submitEdit,
      editWork,
      deleteWork,
      addForm,
      close,
      dataSource,
      columns,
      editForm
    }
  }
}
</script>
