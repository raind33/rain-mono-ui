<template>
  <div>
    limit: {{ params.limit }} page: {{ params.currentPage }}
    <haluo-pagination v-model:currentPage="params.currentPage" v-model:limit="params.limit" :total="80" :search="search" />
  </div>
</template>

<script setup lang="ts">
import HaluoPagination from '@components/pagination'

import { reactive } from 'vue'
const params = reactive({
  currentPage: 1,
  limit: 20
})
const search = () => {
  console.log(21)
}
</script>
