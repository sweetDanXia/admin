<template>
  <div class="categoryCreate">
    <h1>{{ id ? "编辑" : "新建" }}分类</h1>
    <!-- 想要横向排列的话，可以给el-form加label-width -->
    <!-- 点击保存时加上@submit.native.prevent="save"，native表示原生表单，prevent表示阻止默认提交，不要跳转页面 -->
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="上级分类">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>
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
  props: {
    // type:String可以不写
    id: {},
  },
  data() {
    return {
      model: {
        name: "",
        parent:""
      },
      parents:[]
    };
  },
  created() {
    this.fetchParentsOptions()
    this.id && this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`/categories/${this.id}`);
      this.model = res.data;
    },
    // 获取分类列表接口作为上级分类下拉框来源数据
    async fetchParentsOptions() {
      const res = await this.$http.get(`/categories`);
      this.parents = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/categories/${this.id}`, this.model);
      } else {
        // 平时可能会用.then()写回调函数，我们可以用async await将异步回调函数写法写成类似同步的写法
        res = await this.$http.post("categories", this.model);
      }
      this.$router.push("/categories/list");
      if (res && res.status == 200) {
        this.$message({
          type: "success",
          message: "保存成功",
        });
      }
    },
  },
};
</script>
