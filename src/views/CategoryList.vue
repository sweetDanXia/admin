<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="name" label="分类名称"> </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
    };
  },
  created() {
    this.fetch();
  },
  methods: {
    async fetch() {
      const res = await this.$http.get("/categories");
      this.tableData = res.data;
    },
  },
};
</script>
