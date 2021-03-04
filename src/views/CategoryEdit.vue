<template>
  <div class="categoryCreate">
    <h1>新建分类</h1>
    <!-- 想要横向排列的话，可以给el-form加label-width -->
    <!-- 点击保存时加上@submit.native.prevent="save"，native表示原生表单，prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {
        name: "",
      },
    };
  },
  methods: {
    async save() {
      // 平时可能会用.then()写回调函数，我们可以用async await将异步回调函数写法写成类似同步的写法
      await this.$http.post("categories", this.model);
      this.$router.push("/categories/list");
      this.$message({
        type: "success",
        message: "保存成功",
      });
    },
  },
};
</script>
