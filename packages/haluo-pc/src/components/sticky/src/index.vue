<template>
  <div ref="el" class="halo-sticky">
    <div
      :class="['halo-sticky_content', { sticky: data.isSticky }]"
      :style="{
        top: data.isSticky ? stickyTop + 'px' : '',
      }"
    >
      <slot>
        <div>sticky</div>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
export default {
  name: "HaloSticky",
};
</script>
<script setup lang="ts">
import { reactive, onMounted, ref, onUnmounted } from "vue";
const props = withDefaults(
  defineProps<{
    stickyTop?: number;
  }>(),
  {
    stickyTop: 0,
  }
);
const data = reactive<{ height: string | undefined; isSticky: boolean }>({
  height: undefined,
  isSticky: false,
});
const el = ref<HTMLDivElement | null>(null);
onMounted(() => {
  data.height = (el.value as HTMLDivElement).getBoundingClientRect().height + 'px';
  window.addEventListener("scroll", handleScroll);
});
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
const handleScroll = () => {
  const { top } = (el.value as HTMLDivElement).getBoundingClientRect();
  if (top < props.stickyTop) {
    sticky();
    return;
  }
  reset();
}
const sticky = () => {
  data.isSticky = true;
}
const reset = () => {
  data.isSticky = false
}
</script>
<style lang="scss" scoped>
.halo-sticky {
  height: v-bind('data.height');
  .halo-sticky_content {
    height: v-bind('data.height');
    position: v-bind('');
    &.sticky {
      position: fixed;
    }
  }
}
</style>
