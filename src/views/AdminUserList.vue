<template>
  <div>
    <el-table :data="tableData">
      <el-table-column prop="_id" label="ID" width="240"> </el-table-column>
      <el-table-column prop="username" label="用户名"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button
            type="text"
            @click="$router.push(`/admin_user/edit/${scope.row._id}`)"
            >编辑</el-button
          >
          <el-button type="text" @click="remove(scope.row)">删除</el-button>
        </template>
      </el-table-column>
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
      const res = await this.$http.get("/rest/admin_users");
      this.tableData = res.data;
    },
    async remove(row) {
      this.$confirm(`是否确定删除管理员 ${row.username}?`, "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async () => {
        const res = await this.$http.delete(`/rest/admin_users/${row._id}`);
        if (res && res.status == 200) {
          this.$message({
            type: "success",
            message: "删除",
          });
        }
        this.fetch();
      });
    },
  },
};
</script>
