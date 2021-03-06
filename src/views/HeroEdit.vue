<template>
  <div>
    <h1>{{ id ? "编辑" : "新建" }}英雄</h1>
    <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
        <el-input v-model="model.name"></el-input>
      </el-form-item>
      <el-form-item label="头像">
        <el-upload
          class="avatar-uploader"
          :action="$http.defaults.baseURL + '/upload'"
          :show-file-list="false"
          :on-success="afterUpload"
        >
          <img v-if="model.avatar" :src="model.avatar" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="称号">
        <el-input v-model="model.title"></el-input>
      </el-form-item>
      <el-form-item label="分类">
        <el-select v-model="model.categories" multiple>
          <el-option
            v-for="item in categories"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="难度">
        <el-rate
          :max="9"
          v-model="model.scores.difficult"
          style="margin-top: 0.6rem"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="技能">
        <el-rate
          :max="9"
          v-model="model.scores.skills"
          style="margin-top: 0.6rem"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="攻击">
        <el-rate
          :max="9"
          v-model="model.scores.attack"
          style="margin-top: 0.6rem"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="生存">
        <el-rate
          :max="9"
          v-model="model.scores.survive"
          style="margin-top: 0.6rem"
          show-score
        ></el-rate>
      </el-form-item>
      <el-form-item label="顺风出装">
        <el-select v-model="model.items1" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="逆风出装">
        <el-select v-model="model.items2" multiple>
          <el-option
            v-for="item in items"
            :key="item._id"
            :label="item.name"
            :value="item._id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="使用技巧">
        <el-input type="textarea" v-model="model.usageSkills"></el-input>
      </el-form-item>
      <el-form-item label="对抗技巧">
        <el-input type="textarea" v-model="model.battleSkills"></el-input>
      </el-form-item>
      <el-form-item label="团战思路">
        <el-input type="textarea" v-model="model.teamSkills"></el-input>
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
    id: {},
  },
  data() {
    return {
      categories:[],
      items: [],
      model: {
        name: "",
        avatar: "",
        scores: {
          difficult: 0
        },
        items1: [],
      },
    };
  },
  created() {
    this.id && this.fetch();
    this.fetchItems();
    this.fetchCategories();
  },
  methods: {
    // 接收参数res是后端返回的响应
    afterUpload(res) {
      this.model.avatar = res.url;
      // 赋值的数据主体 赋值的属性 赋值的内容
      // this.$set(this.model, res.url);
    },
    async fetch() {
      const res = await this.$http.get(`/rest/heroes/${this.id}`);
      this.model = Object.assign({}, this.model, res.data);
    },
    async fetchCategories() {
      const res = await this.$http.get(`/rest/categories`);
      this.categories = res.data;
    },
    async fetchItems() {
      const res = await this.$http.get(`/rest/items`);
      this.items = res.data;
    },
    async save() {
      let res;
      if (this.id) {
        res = await this.$http.put(`/rest/heroes/${this.id}`, this.model);
      } else {
        res = await this.$http.post("/rest/heroes", this.model);
      }
      this.$router.push("/heroes/list");
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

<style>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>
