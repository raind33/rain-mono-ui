<template>
  <el-pagination
    v-bind="attrs"
    :current-page.sync="page"
    :page-sizes="pageSizes"
    :total="total"
    background
    :page-size="limit"
    :layout="layout"
    @size-change="handleSizeChange"
    @current-change="currentChange"
  />
</template>
<script lang="ts">

export default {
  name: 'HaloPagination',
}
</script>
<script setup lang="ts">
import { computed, useAttrs } from 'vue'

const attrs = useAttrs()
console.log(attrs)
const props = withDefaults(defineProps<{
  search():void,
  pageSizes?: number[],
  total: number,
  layout?: string,
  currentPage?: number,
  limit?: number
}>(), {
  pageSizes: () => [10, 20, 50],
  total: 0,
  layout: 'total, sizes, prev, pager, next, jumper',
  currentPage: 1,
  limit: 10
})
const emits = defineEmits<{
  (e: 'update:currentPage', val: number): void,
  (e: 'update:limit', val: number): void,
}>()
const page = computed({
  get() {
    return props.currentPage
  },
  set(val: number) {
    emits('update:currentPage', val)
  }
})

const handleSizeChange = (limit: number) => {
  emits('update:limit', limit)
  props.search()
}

const currentChange = (page: number) => {
  emits('update:currentPage', page)
  props.search()
}
</script>

