<template>
  <div style="display: flex; justify-content: space-between; margin: 5px">
    <a-form
      :model="searchForm"
      style="display: flex; width: 200px; justify-content: space-between"
    >
      <a-form-item>
        <a-select
          v-model:value="searchForm.type"
          style="width: 200px"
          placeholder="请选择加班类型"
        >
          <a-select-option value="">全部</a-select-option>
          <a-select-option value="双休日加班">双休日加班</a-select-option>
          <a-select-option value="节假日加班">节假日加班</a-select-option>
        </a-select>
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
    <a-button type="primary" @click="applyWork">申请加班</a-button>
    <a-modal
      v-model:visible="addVisible"
      title="新增加班申请"
      :footer="null"
      destroyOnClose
    >
      <a-form :model="addForm">
        <a-form-item
          label="加班类型:"
          name="type"
          :rules="[{ required: true, message: '请选择加班类型!' }]"
        >
          <a-select
            v-model:value="addForm.type"
            style="width: 200px"
            placeholder="请选择加班类型"
          >
            <a-select-option value="双休日加班">双休日加班</a-select-option>
            <a-select-option value="节假日加班">节假日加班</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="工作地点:"
          name="address"
          :rules="[{ required: true, message: '请选择工作地点!' }]"
        >
          <a-select
            v-model:value="addForm.address"
            style="width: 200px"
            placeholder="请选择工作地点"
          >
            <a-select-option value="公司内">公司内</a-select-option>
            <a-select-option value="公司外">公司外</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="工作事由:"
          name="reason"
          :rules="[{ required: true, message: '请输入工作事由!' }]"
        >
          <a-input v-model:value="addForm.reason"></a-input>
        </a-form-item>
        <a-form-item
          label="工作时间:"
          name="date"
          :rules="[{ required: true, message: '请选择工作时间!' }]"
        >
          <a-date-picker
            v-model:value="addForm.date"
            valueFormat="YYYY-MM-DD"
          ></a-date-picker>
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
          <a-button type="danger" style="margin-left: 5px">删除</a-button>
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
    <a-form :model="editForm">
      <a-form-item
        label="加班类型:"
        name="type"
        :rules="[{ required: true, message: '请选择加班类型!' }]"
      >
        <a-select
          v-model:value="editForm.type"
          style="width: 200px"
          placeholder="请选择加班类型"
        >
          <a-select-option value="双休日加班">双休日加班</a-select-option>
          <a-select-option value="节假日加班">节假日加班</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="工作地点:"
        name="address"
        :rules="[{ required: true, message: '请选择工作地点!' }]"
      >
        <a-select
          v-model:value="editForm.address"
          style="width: 200px"
          placeholder="请选择工作地点"
        >
          <a-select-option value="公司内">公司内</a-select-option>
          <a-select-option value="公司外">公司外</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="工作事由:"
        name="reason"
        :rules="[{ required: true, message: '请输入工作事由!' }]"
      >
        <a-input v-model:value="editForm.reason"></a-input>
      </a-form-item>
      <a-form-item
        label="工作时间:"
        name="date"
        :rules="[{ required: true, message: '请选择工作时间!' }]"
      >
        <a-date-picker
          v-model:value="editForm.date"
          valueFormat="YYYY-MM-DD"
        ></a-date-picker>
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
      type: ''
    })

    const addForm = ref({
      type: '',
      address: '',
      reason: '',
      date: ''
    })

    const editForm = ref({
      type: '',
      address: '',
      reason: '',
      date: ''
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
        title: '加班类型',
        dataIndex: 'type',
        key: 'type'
      },
      {
        title: '工作地点',
        dataIndex: 'address',
        key: 'address'
      },
      {
        title: '工作事由',
        dataIndex: 'reason',
        key: 'reason'
      },
      {
        title: '工作时间',
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
        const { data } = await axios.get(`${baseURL}/work`, {
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
      await getList({ ...searchForm, type: searchForm.value.type.trim() })
    }

    async function reset () {
      searchForm.value.type = ''
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
        const { data } = await axios.get(`${baseURL}/work/${id}`)
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
        await axios.post(`${baseURL}/deleteWork`, { ...params })
        handleSubmit()
      } catch (error) {}
    }

    function close () {
      addVisible.value = false
      editVisible.value = false
      clearForm()
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

    function clearForm () {
      addForm.value = {
        type: '',
        address: '',
        reason: '',
        date: ''
      }
      editForm.value = {
        type: '',
        address: '',
        reason: '',
        date: ''
      }
    }

    function handleSubmit () {
      message.success('提交成功')
      clearForm()
      close()
      getList()
    }

    async function submitAdd () {
      try {
        const params = {
          ...addForm.value,
          user_id: localStorage.getItem('userid')
        }
        const validate = checkForm(params)
        if (validate !== true) {
          message.error(validate)
          return
        }
        await axios.post(`${baseURL}/addWork`, { ...params })
        handleSubmit()
      } catch (error) {}
    }

    async function submitEdit () {
      try {
        const params = { ...editForm.value }
        const validate = checkForm(params)
        if (validate !== true) {
          message.error(validate)
          return
        }
        await axios.post(`${baseURL}/editWork`, { ...params })
        handleSubmit()
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
