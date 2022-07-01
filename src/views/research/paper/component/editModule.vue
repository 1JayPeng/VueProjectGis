<template>
  <div class="system-menu-container">
    <el-dialog v-model="isShowDialog" width="769px">
      <template #title>
        <div style="font-size: large" v-drag="['.system-menu-container .el-dialog', '.system-menu-container .el-dialog__header']">{{title}}</div>
      </template>
      <el-form
        :model="ruleForm"
        size="small"
        :rules="ruleRules"
        ref="ruleFormRef"
        label-width="80px"
      >
        <el-row :gutter="35">
          <el-col :span="24" class="mb20">
            <el-form-item label="论文种类" prop="PaperModel">
              <el-input
                v-model="ruleForm.PaperModel"
                placeholder="请输入论文种类"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mb20">
            <el-form-item label="论文编号" prop="PaperCode">
              <el-input
                v-model="ruleForm.PaperCode"
                placeholder="请输入论文编号"
              />
            </el-form-item>
          </el-col>
        
          <el-col :span="24" class="mb20">
            <el-form-item label="论文作者" prop="PaperAuthor">
              <el-input
                v-model="ruleForm.PaperCode"
                placeholder="请输入论文作者"
              />
            </el-form-item>
          </el-col>
          <el-col :span="24" class="mb20">
            <el-form-item label="备注" prop="Remark">
              <el-input
                v-model="ruleForm.Remark"
                type="textarea"
                placeholder="请输入内容"
              />
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="onCancel" size="small">取 消</el-button>
          <el-button type="primary" @click="onSubmit" size="small"
            >编 辑</el-button
          >
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { reactive, toRefs, ref, unref, getCurrentInstance } from "vue";
import { updatePaper, addPaper } from "/@/api/research/paper";
import { ElMessage } from "element-plus";

export default {
  name: "editMenu",
  props: {
    // 弹窗标题
    title: {
      type: String,
      default: () => "",
    },
  },
  setup() {
    const { proxy } = getCurrentInstance() as any;
    const ruleFormRef = ref<HTMLElement | null>(null);
    const state = reactive({
      // 是否显示弹出层
      isShowDialog: false,

      // 岗位对象
      ruleForm: {
        Id: 0, // ID
        PaperCode: "", // 论文编号
        PaperModel: "",// 论文种类
        // ContactPhones: 0, // 家属电话
        PaperAuthor: "", //论文作者
        Remark: "", // 备注       
      },
      // 岗位树选项
    //   deptOptions: [],
      // 表单校验
      ruleRules: {
        PaperCode: [
          { required: true, message: "论文编号不能为空", trigger: "blur" }
        ],
        PaperModel: [
          { required: true, message: "论文种类不能为空", trigger: "blur" }
        ],      
        PaperAuthor: [
          { required: true, message: "论文作者不能为空", trigger: "blur" }
        ],   
      },
    });
    // 打开弹窗
    const openDialog = (row: any) => {
      if (row.Id && row.Id != undefined && row.Id != "") {
        state.ruleForm = row;
        state.ruleForm.Id=row.Id; // ID
        state.ruleForm.PaperCode=row.PaperCode; // 设备编码
        state.ruleForm.PaperModel=row.PaperModel;// 设备型号
        // state.ruleForm.ContactPhones=row.ContactPhones;// 家属电话
        state.ruleForm.PaperAuthor=row.PaperAuthor; //设备状态
        state.ruleForm.Remark=row.Remark;// 备注     
      } else {
        initForm();       
      }
      state.isShowDialog = true;  
    };

    // 关闭弹窗
    const closeDialog = (row?: object) => {     
      proxy.mittBus.emit("onEditPostModule", row);
      state.isShowDialog = false;
    };
    // 取消
    const onCancel = () => {      
      closeDialog();       
    };
    
    // 保存
    const onSubmit = () => {
      const formWrap = unref(ruleFormRef) as any;
      if (!formWrap) return;
      formWrap.validate((valid: boolean) => {
        if (valid) {
          if (
            state.ruleForm.Id != undefined &&
            state.ruleForm.Id != 0
          ) {
            updatePaper(state.ruleForm).then(() => {
              ElMessage.success("修改成功");
              closeDialog(state.ruleForm); // 关闭弹窗
            });
          } else {
            addPaper(state.ruleForm).then(() => {
              ElMessage.success("新增成功");
              closeDialog(state.ruleForm); // 关闭弹窗
            });
          }
        }
      });
    };  
    // 表单初始化，方法：`resetFields()` 无法使用
    const initForm = () => { 
      state.ruleForm.Id = 0; // ID
      state.ruleForm.PaperCode = ""; // 设备编码
      state.ruleForm.PaperModel = ""; // 设备型号
    //   state.ruleForm.ContactPhones = 0 ; // 家属电话
      state.ruleForm.PaperAuthor =  "0"; //设备状态
      state.ruleForm.Remark = ""; // 备注
    };

    return {
      ruleFormRef,
      openDialog,
      closeDialog,
      onCancel,
      initForm,
      onSubmit,
      ...toRefs(state),
    };
  },
};
</script>
