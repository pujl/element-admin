<template>
  <el-form @submit.native.prevent="saveArticle" ref="form" :model="article" label-width="120px">
    <el-form-item label="文章标题">
      <el-input v-model="article.title"></el-input>
    </el-form-item>
    <el-form-item label="文章内容">
      <el-input type="textarea" v-model="article.body"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" native-type = "submit">保存</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      article: {
        title: "",
        body: "",
      },
    };
  },
  methods: {
    saveArticle() {
      console.log(this.article);
      this.$http.put(`articles/${this.$route.params.id}`,this.article).then(res => {
        //res.data表示res请求后返回的数据正文
        console.log(res.data);
        this.$message({
          message: '恭喜你，文章更新成功',
          type: 'success'
        });
        //注意这里是router
        this.$router.push('/articles/index');
      })
    },
    fetch() {
        //注意这里是route
        this.$http.get(`articles/${this.$route.params.id}`).then(res => {
            this.article = res.data;
        })
    }
  },
  created() {
      this.fetch();
  }
};
</script>