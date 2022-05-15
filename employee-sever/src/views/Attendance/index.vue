<template>
  <div style="display: flex; justify-content: space-between; margin: 5px">
    <a-form
      :model="searchForm"
      style="display: flex; width: 300px; justify-content: space-between"
    >
      <a-form-item>
        <a-input v-model:value="searchForm.reason" placeholder="请输入补签理由">
        </a-input>
      </a-form-item>
      <!-- <a-form-item>
           <a-range-picker v-model:value="value1" />
        </a-form-item> -->
      <a-form-item>
        <a-button
          type="primary"
          html-type="submit"
          :disabled="searchForm.reason === ''"
          style="margin-left:5px"
          @click="search"
        >
          搜索
        </a-button>

      </a-form-item>
      <a-form-item>
        <a-button @click="reset" style="margin-left:5px">重置</a-button>
      </a-form-item>
    </a-form>
    <a-button
      type="primary"
      @click="applyAttendance"
      >前往补签</a-button
    >
    <a-modal
      v-model:visible="visible"
      title="提交补签申请"
      :footer="null"
      destroyOnClose
    >
      <ApplyAttendance  @submit="handleSubmit" @close="closeAdd" />
    </a-modal>
  </div>
  <a-table bordered :dataSource="dataSource" :columns="columns">
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'operator'">
        <!-- <a-button type="primary" @click="showDetail(record)">查看详情</a-button> -->
        <a-button type="primary" @click="editApply" style="margin-right:5px">编辑申请</a-button>
        <a-modal
          v-model:visible="editVisible"
          title="编辑补签申请"
          :footer="null"
          destroyOnClose
        >
          <EditAttendance :user="dataSource[0].name" :row="record" @submit="handleSubmit" @close="closeEdit" />
        </a-modal>
        <!-- <a-drawer
          v-model:visible="drawVisible"
          class="custom-class"
          style="color: red"
          title="补签详情"
          placement="right"
        >
          <ApplyDetail :row="record" />
        </a-drawer> -->
        <a-popconfirm
          title="你确认取消此申请?"
          ok-text="确定"
          cancel-text="取消"
          @confirm="deleteApply(record.id)"
        >
          <a-button type="danger"
          >取消申请</a-button
        >
        </a-popconfirm>

      </template>
    </template>
  </a-table>
</template>

<script>
import dayjs from 'dayjs'
import { ref, reactive } from 'vue'
import axios from 'axios'
import { message } from 'ant-design-vue'
import { baseURL } from '../../utils/constant'
import ApplyAttendance from './components/ApplyAttendance.vue'
import EditAttendance from './components/EditAttendance.vue'
// import ApplyDetail from './components/ApplyDetail.vue'
export default {
  components: { ApplyAttendance, EditAttendance },
  setup () {
    const searchForm = reactive({
      reason: ''
      // start: '',
      // end: ''
    })

    const dataSource = ref([])

    const columns = ref([
      {
        title: 'ID',
        dataIndex: 'id',
        key: 'id'
      },
      {
        title: '姓名',
        dataIndex: 'username',
        key: 'username'
      },
      {
        title: '考勤异常日期',
        dataIndex: 'date',
        key: 'date'
      },
      {
        title: '考勤异常原因',
        dataIndex: 'reason',
        key: 'reason'
      },
      {
        title: '操作',
        dataIndex: 'operator',
        key: 'operator'
      }
    ])

    const form = ref({
      date: '',
      reason: ''
    })

    async function getList (query = {}) {
      const params = {
        user_id: localStorage.getItem('userid'),
        ...query
      }

      try {
        const { data } = await axios.get(`${baseURL}/attendance`, {
          params
        })
        console.log(data)
        dataSource.value = (data.data || []).map(item => ({ ...item, date: dayjs(item.date).format('YYYY-MM-DD') }))
      } catch (error) {

      }
    }
    getList()
    const visible = ref(false)
    const drawVisible = ref(false)
    const editVisible = ref(false)
    const confirmLoading = ref(false)
    const value1 = ref('')

    function applyAttendance () {
      visible.value = true
    }

    function editApply () {
      editVisible.value = true
    }

    async function search () {
      await getList({ ...searchForm, reason: searchForm.reason.trim() })
    }

    async function reset () {
      searchForm.reason = ''
      await getList()
    }

    function showDetail (row = {}) {
      drawVisible.value = true
      console.log(row)
    }

    async function deleteApply (id) {
      const params = { id }
      try {
        await axios.post(`${baseURL}/deleteAttendance`, { ...params })
        message.success('取消申请成功')
        await getList()
      } catch (error) {

      }
    }

    async function handleSubmit () {
      visible.value = false
      editVisible.value = false
      message.success('提交成功')
      await search()
    }

    function closeAdd () {
      visible.value = false
    }

    function closeEdit () {
      editVisible.value = false
    }

    return {
      searchForm,
      dataSource,
      columns,
      applyAttendance,
      visible,
      drawVisible,
      editVisible,
      confirmLoading,
      search,
      reset,
      showDetail,
      deleteApply,
      editApply,
      handleSubmit,
      closeAdd,
      closeEdit,
      value1,
      form
    }
  }
}
</script>
