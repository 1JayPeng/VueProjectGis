<!--报警器设备管理 he -->
<template>
  <div class="app-container">
    <el-card shadow="always">
      <!-- 查询 -->
      <el-form
        :model="queryParams"
        ref="queryForm"
        :inline="true"
        label-width="68px"
      >
        <el-form-item label="项目名称" prop="ProjectName">
          <el-input
            placeholder="请输入项目名称模糊查询"
            clearable
            size="small"
            @keyup.enter="handleQuery"
            style="width: 240px"
            v-model="queryParams.ProjectName"
          />
        </el-form-item>
        <el-form-item label="项目编号" prop="ProjectCode">
          <el-input
            placeholder="请输入项目编号模糊查询"
            clearable
            size="small"
            @keyup.enter="handleQuery"
            style="width: 240px"
            v-model="queryParams.ProjectCode"
          />
        </el-form-item>
        <el-form-item label="负责人" prop="principal">
          <el-input
            placeholder="请输入负责人模糊查询"
            clearable
            size="small"
            @keyup.enter="handleQuery"
            style="width: 240px"
            v-model="queryParams.principal"
          />
        </el-form-item>
        <el-form-item label="签订日期" prop="ProjectCode">
          <el-date-picker
            type="daterange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
            prefix-icon="customPrefix"
            unlink-panels
            v-model="queryParams.ProjectCode"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            icon="el-icon-search"
            size="mini"
            @click="handleQuery"
            >搜索</el-button
          >
          <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
            >重置</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 操作按钮 -->
      <el-row :gutter="10" class="mb8">
        <el-col :span="1.5">
          <el-button
            type="primary"
            plain
            icon="el-icon-plus"
            size="mini"
            v-auth="'research:papers:add'"
            @click="onOpenAddModule"
            >新增</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="danger"
            plain
            icon="el-icon-delete"
            size="mini"
            v-auth="'research:papers:delete'"
            :disabled="multiple"
            @click="onTabelRowDel"
            >删除</el-button
          >
        </el-col>
        <el-col :span="1.5">
          <el-button
            type="warning"
            plain
            icon="el-icon-download"
            size="mini"
            v-auth="'research:papers:export'"
            @click="onTabelRowDel"
            >导出</el-button
          >
        </el-col>
      </el-row>

      <!--数据表格-->
      <el-table
        v-loading="loading"
        :data="tableData"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" align="center" />
        <!-- <el-table-column label="项目名称" align="center" prop="ProjectName" /> -->
        <el-table-column label="项目名称" align="center" prop="ProjectName">
          <template #default="scope" >
            <el-link type="primary" :href="scope.row.url">
              {{ scope.row.ProjectName }}<i class="el-icon-view el-icon--right"></i> 
            </el-link>
          </template> 
        </el-table-column>
        <el-table-column label="项目编号" align="center" prop="ProjectCode" />
        <el-table-column label="负责人" align="center" prop="principal" />
        <el-table-column label="项目经费" align="center" prop="ProjectMoney" />
        <el-table-column label="签订日期" align="center" prop="SignDate" />
        <el-table-column label="所属单位" align="center" prop="ProjectUnit" />
        
        <el-table-column label="审核状态" align="center" prop="State">
          <template #default="scope">
            <el-tag :type="whichState(scope.row.State)" disable-transitions>{{
              scope.row.State
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          class-name="small-padding fixed-width"
        >
          <template #default="scope">
            <el-button
              size="mini"
              type="text"
              icon="el-icon-edit"
              @click="onOpenEditModule(scope.row)"
              >办理业务</el-button
            >
            <el-button
              v-if="scope.row.parentId != 0"
              size="mini"
              type="text"
              icon="el-icon-delete"
              @click="onTabelRowDel(scope.row)"
              >审批表打印</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页设置-->
      <div v-show="total > 0">
        <el-divider></el-divider>
        <el-pagination
          background
          :total="total"
          :current-page="queryParams.pageNum"
          :page-size="queryParams.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
    <!-- 添加或修改岗位对话框 -->
    <EditModule ref="editModuleRef" :title="title" />
  </div>
</template>

<script lang="ts">
import {
  ref,
  toRefs,
  reactive,
  onMounted,
  getCurrentInstance,
  onUnmounted,
} from "vue";
import { ElMessageBox, ElMessage } from "element-plus";
import {  delPaper } from "/@/api/research/paper";
import { mockList } from "./mock/mock";
import EditModule from "./component/editModule.vue";

export default {
  name: "index",
  components: { EditModule },

  setup() {
    const { proxy } = getCurrentInstance() as any;
    const editModuleRef = ref();
    const state = reactive({
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 弹出层标题
      title: "",
      // 岗位表格数据
      tableData: [{}],
      // 总条数
      total: 0,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        // 页码
        pageNum: 1,
        // 每页大小
        pageSize: 10,
        ProjectName: undefined,
        ProjectCode: undefined,
        principal: undefined,
      },
    });
    function whichState(state: string) {
      if (state === "通过") {
        return "success";
      } else if (state === "审核中") {
        return "warning";
      } else {
        return "danger";
      }
    }
    /** 查询项目列表 */
    const handleQuery = () => {
      state.loading = true;
      state.tableData = mockList;
      state.loading = false;
    };
    /** 重置按钮操作 */
    const resetQuery = () => {
      state.queryParams.ProjectName = undefined;
      state.queryParams.ProjectCode = undefined;
      state.queryParams.principal = undefined;
      handleQuery();
    };

    const handleCurrentChange = (val: number) => {
      state.queryParams.pageNum = val;
      handleQuery();
    };
    const handleSizeChange = (val: number) => {
      state.queryParams.pageSize = val;
      handleQuery();
    };

    const statusFormat = (row: any) => {
      return proxy.selectDictLabel(state.statusOptions, row.principal);
    };

    // 打开新增报警器弹窗
    const onOpenAddModule = (row: object) => {
      row = [];
      state.title = "添加报警器";
      editModuleRef.value.openDialog(row);
    };
    // 打开编辑报警器弹窗
    const onOpenEditModule = (row: object) => {
      state.title = "修改报警器";
      editModuleRef.value.openDialog(row);
    };
    /** 删除按钮操作 */
    const onTabelRowDel = (row: any) => {
      const Ids = row.Id || state.ids;
      ElMessageBox({
        message: '是否确认删除报警器编号为"' + Ids + '"的数据项?',
        title: "警告",
        showCancelButton: true,
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        return delPaper(Ids).then(() => {
          handleQuery();
          ElMessage.success("删除成功");
        });
      });
    };
    // 多选框选中数据
    const handleSelectionChange = (selection: any) => {
      state.ids = selection.map((item: any) => item.Id);
      state.single = selection.length != 1;
      state.multiple = !selection.length;
    };
    // 页面加载时
    onMounted(() => {
      // 查询报警器信息
      handleQuery();
      // 查询报警器状态数据字典
      proxy.getDicts("sys_normal_disable").then((response: any) => {
        state.statusOptions = response.data;
      });
      proxy.mittBus.on("onEditPostModule", (res: any) => {
        handleQuery();
      });
    });
    // 页面卸载时
    onUnmounted(() => {
      proxy.mittBus.off("onEditPostModule");
    });
    return {
      whichState,
      editModuleRef,
      handleSelectionChange,
      handleQuery,
      handleCurrentChange,
      handleSizeChange,
      resetQuery,
      statusFormat,
      onOpenAddModule,
      onOpenEditModule,
      onTabelRowDel,
      ...toRefs(state),
    };
  },
};
</script>
