import express from 'express'
import userRouter from './router/user.js'
// 图片需要的模块
import multer from 'multer'
const app =express() 


/* post接受参数配置 配置解析表单数据的中间件 */
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded


/* 设置跨域 */
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length,Authorization,Accept,X-Requested-with,yourHeaderFeild')
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
  next()
})

let objMulter = multer({ dest: "./public/upload/" }); 
//实例化multer，传递的参数对象，dest表示上传文件的存储路径
app.use(objMulter.any())//any表示任意类型的文件
// app.use(objMulter.image())//仅允许上传图片类型

app.use(express.static("./public"));

app.use('/api',userRouter)

/* 配置错误级别中间件，捕获并处理Token认证失败的结果 */
app.use(function(err,req,res,next){
  if(err.name==='UnauthorizedError') return res.send({ status: 1, message: err.message })
})


app.listen(1314,()=>{
  console.log('Express serve running at http://localhost:1314')
})