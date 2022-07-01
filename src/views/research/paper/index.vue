<script lang="ts" setup>
import { MockJiBen, MockJiaFang, MockJiaoYuBu } from "./mock/mock";
import { onMounted, reactive, onUnmounted } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useRoute } from "vue-router";
import { Session } from "/@/utils/storage";
// import axios from 'axios';
const data = reactive({
  jiBen: {},
  jiaFang: {},
  jiaoYuBu: {},
});
// 页面加载时
onMounted(() => {
  // axios.get('searchAll/1/20').then(response => {
  //         console.log(response);
  //         this.results = response.data;//绑定数据 ！
  //     })

  const ProjectId: number = useRoute().query.id;
  if (ProjectId != null) {
    getData(ProjectId);
  } else {
    window.location.href = "";
    ElMessageBox.alert("未获取参数id", "提示", {})
      .then(() => {})
      .catch(() => {});
  }
});
onUnmounted(() => {
    window.location.reload();
});
const getData = (ProjectId: number) => {
  data.jiBen = MockJiBen[ProjectId];
  data.jiaFang = MockJiaFang[ProjectId];
  data.jiaoYuBu = MockJiaoYuBu[ProjectId];
};
</script>
<style scoped>
.my-label {
  width: "20px";
  background: blue;
}
.my-content {
  width: "100%";
}
</style>
<template>
  <el-descriptions title="基本信息" border column="3" direction="vertical">
    <el-descriptions-item
      :label="key"
      v-for="(value, key) in data.jiBen"
      :key="key"
      span="1"
      >{{ value }}</el-descriptions-item
    >
  </el-descriptions>
  <el-divider />

  <el-descriptions title="甲方信息" border column="3" direction="vertical">
    <el-descriptions-item
      :label="key"
      v-for="(value, key) in data.jiaFang"
      :key="key"
      span="1"
      >{{ value }}</el-descriptions-item
    >
  </el-descriptions>
  <el-divider />

  <el-descriptions title="教育部统计信息" border column="3" direction="vertical">
    <el-descriptions-item
      :label="key"
      v-for="(value, key) in data.jiaoYuBu"
      :key="key"
      span="1"
      >{{ value }}</el-descriptions-item
    >
  </el-descriptions>
  <el-divider />
  <el-button align="center" type="primary">Operation</el-button>
</template>
