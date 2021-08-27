<template>
  <HaluoCascadeArea :get-area="getArea" v-model:selected-data="selectedData" />
</template>
<script setup lang="ts">
import HaluoCascadeArea from '@components/cascade-area'
import { reactive, toRefs } from '@vue/reactivity';
import request, { APIURL } from '@utils/request'
const getArea = (params: any) => {
  console.log("getArea");

  return request({
    url: `${APIURL}uic/map/listMap`,
    method: 'get',
    params: params
  })
};
const { selectedData } = toRefs(
  reactive<any>({
    selectedData: [
      {
        adCode: "",
        cityCode: "",
        id: 0,
        latitude: "29.563707",
        longitude: "106.550483",
        name: "重庆市",
        pinyin: "ZhongQingShi",
        provinceCode: "500000",
      },
      {
        adCode: "",
        cityCode: "500200",
        id: 0,
        latitude: "29.291965",
        longitude: "108.170255",
        name: "重庆市",
        pinyin: "ZhongQingShi",
        provinceCode: "500000",
      },
    ],
  })
);
</script>