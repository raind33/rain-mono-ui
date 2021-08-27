<template>
  <div class="content">
    <el-select
      v-model="province"
      placeholder="请选择省市"
      value-key="provinceCode"
      @change="(val) => change(val, 'province')"
    >
      <el-option
        v-for="value in provinceList"
        :key="value.provinceCode"
        :label="value.name"
        :value="value"
      />
    </el-select>
    <el-select
      v-if="showCity"
      v-model="city"
      value-key="cityCode"
      placeholder="请选择城市"
      @change="(val) => change(val, 'city')"
    >
      <el-option
        v-for="value in cityList"
        :key="value.cityCode"
        :label="value.name"
        :value="value"
      />
    </el-select>
    <el-select
      v-if="showCity && showDist"
      v-model="dist"
      value-key="adCode"
      placeholder="请选择区域"
      @change="(val) => change(val, 'dist')"
    >
      <el-option
        v-for="(value, index) in distList"
        :key="index"
        :label="value.name"
        :value="value"
      />
    </el-select>
  </div>
</template>
<script lang="ts">
export default {
  name: "HaluoCascadeArea",
};
</script>
<script setup lang="ts">
import { computed, reactive, toRefs } from "@vue/reactivity";
import { onMounted } from "@vue/runtime-core";
const props = withDefaults(
  defineProps<{
    getArea(params?: object): void;
    showCity?: boolean;
    showDist?: boolean;
    selectedData: any; // todo 空数组定义
  }>(),
  {
    showCity: true,
    showDist: true,
    selectedData: [],
  }
);
const emits = defineEmits<{
  (e: "update:selectedData", val: any[]): void;
  (e: "change", val: any[]): void;
}>();
interface Area {
  provinceList: any,
  cityList: any,
  distList: any
}
const area = reactive<Area>({
  provinceList: [],
  cityList: [],
  distList: [],
});
const province: any = computed({
  get() {
    if (props.selectedData.length) {
      return props.selectedData[0];
    }
    return null;
  },
  set(province) {
    const data = [];
    if (province) data.push(province);
    area.distList = [];
    area.cityList = [];
    emits("update:selectedData", data);
  },
});
const city = computed({
  get() {
    const index = 1;
    if (props.selectedData.length > index) {
      return props.selectedData[index];
    }
    return null;
  },
  set(val) {
    const data: any[] = [province.value];
    if (val) data.push(val);
    area.distList = [];
    emits("update:selectedData", data);
  },
});

const dist = computed({
  get() {
    const index = 2;
    if (props.selectedData.length > index) {
      return props.selectedData[index];
    }
    return null;
  },
  set(val) {
    const data: any[] = [province.value, city.value];
    if (val) data.push(val);
    emits("update:selectedData", data);
  },
});

onMounted(() => {
  init()
})
const init = async () => {
  await getProvice();
  if (province.value) {
    await getCity(province.value);
  }
  if (city.value) {
    getDist(city.value);
  }
}
const getProvice = async () => {
  try {
    const res: any = await props.getArea();
    const list = res.data.data && res.data.data.list;
    if (!list.length) {
      return;
    }
    area.provinceList = list;
  } catch (error) {
    console.log(error);
  }
}
const getCity = async (val: any) => {
  if (!props.showCity) {
        return;
      }
  const { provinceCode, name } = val;
  const params = {
    provinceName: name,
    provinceCode: provinceCode,
  };
  try {
    const res: any = await props.getArea(params);
    const list = res.data.data && res.data.data.list;
    if (!list.length) {
      return;
    }
    area.cityList = list;
  } catch (error) {
    console.log(error);
  }
}
const getDist = async (val:any) => {
   // 不展示区域不请求
   if (!props.showDist) {
        return;
      }
  const { provinceCode, name } = province.value;
  const { cityCode, name: cityName } = val;
  const params = {
    provinceName: name,
    provinceCode: provinceCode,
    cityName,
    cityCode,
  };
  try {
    const res: any = await props.getArea(params);
    const list = res.data.data && res.data.data.list;
    if (!list.length) {
      return;
    }
    area.distList = list;
  } catch (error) {
    console.log(error);
  }
}

type AreaType = 'province' | 'city' | 'dist'
const change = (val: any, type: AreaType) => {
  if (!val) return;
  if (type === "province") getCity(val);
  if (type === "city") getDist(val);
  emits("change", val);
}
const { distList, provinceList, cityList } = toRefs(area)
</script>

<style lang="scss" scoped>
.content {
  /* border: 1px solid #dcdfe6;
  border-radius: 5px;
  padding: 20px;
  margin-bottom: 10px; */
  .el-select ~ .el-select {
    margin-left: 10px;
  }
}
</style>
