<template>
   <a-descriptions bordered>
    <a-descriptions-item label="申请补签人" :span="12">{{row.name}}</a-descriptions-item>
    <a-descriptions-item label="补签时间" :span="12">{{row.date}}</a-descriptions-item>
    <a-descriptions-item label="补签理由" :span="12">{{row.reason}}</a-descriptions-item>
   </a-descriptions>
</template>

<script>
export default {
  props: {
    row: {
      type: Object,
      default: () => ({})
    }
  },
  setup (props) {
    console.log(props.row)
    return {}
  }
}
</script>
