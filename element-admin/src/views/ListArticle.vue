<template>
  <div>
    <el-table :data="articles">
      <el-table-column prop="title" label="标题" width="140"> </el-table-column>
      <el-table-column prop="body" label="内容" width="120"> </el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="edit(scope.row._id)" type="text" size="small">编辑</el-button>
          <el-button @click="remove(scope.row._id)" type="text" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articles: [],
    };
  },
  methods: {
    fetch() {
      this.$http.get("articles").then((res) => {
        this.articles = res.data;
      });
    },
    //path:'/articles/:id/edit',
    edit(id) {
      this.$router.push(`/articles/${id}/edit`);
    },
    //删除文章
    remove(id) {
      //使用变量时候用的是· 不是单引号
      this.$http.delete(`articles/${id}`).then(res => {
        //判断结果是否成功，弹出提示
        // console.log(res.data);
        if(res.status === "success")
        {
          this.$message({
            message: '恭喜你，文章删除成功',
            type: 'success'
          });
        }
      })
      this.fetch();
    },
  },
  created() {
    this.fetch();
  },
};
</script>