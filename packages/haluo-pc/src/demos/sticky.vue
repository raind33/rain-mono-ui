<template>
  <div style="height: 1000px">
    <haluo-sticky :sticky-top="20">
      <div style="height: 100px; border: 1px solid red; width: 100px"></div>
    </haluo-sticky>
  </div>
</template>

<script lang="ts" setup>
import HaluoSticky from '@components/sticky'
</script>
