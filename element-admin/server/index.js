const express = require('express')
const app = express();

//跨域问题
app.use(require('cors')())
app.use(express.json())
// //打开数据库,定义要给模型
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/element-admin',{
    useNewUrlParser:true,
    // useFindAndModify:true,
    // useCreateIndex:true,
}) 

//定义数据模型,可以在模型定义中添加数据验证，后续可以自己加
const Article = mongoose.model('Article',new mongoose.Schema({
    title: {type : String },
    body: {type : String },
}))


//后端主页
app.get('/',async(req,res)=>{
    res.send('index')
})
//新增文章  +api代表接口
app.post('/api/articles',async (req,res) => {
    //这个req.body中如果有上面数据模型未定义的字段，不会被传入，只接受定义的字段
    const article = await Article.create(req.body)
    //发送给前端，让前端知道创建完后的东西是什么样的
    res.send(article)
})
//文章列表接口
app.get('/api/articles',async (req,res) => {
    const articles = await Article.find()
    res.send(articles)
})
//文章删除接口
app.delete('/api/articles/:id',async(req,res) => {
    await Article.findByIdAndDelete(req.params.id)
    res.send({
        status:true
    })
})
//文章详情
app.get('/api/articles/:id',async(req,res) => {
    const article = await Article.findById(req.params.id)
    res.send(article)
})
//修改文章
app.put('/api/articles/:id',async(req,res) => {
    const article = await Article.findByIdAndUpdate(req.params.id,req.body)
    console.log(req.body)
    // await article.save()
    res.send(article)
})

app.listen(3001,()=>{
    console.log('http://localhost:3001/')
})