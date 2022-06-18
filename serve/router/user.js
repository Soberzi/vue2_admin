import express from 'express'
import { tokenList } from '../router_handler/user.js'
import { sqlFn } from "../db/index.js";
import  Mock  from "mockjs";
import sercet from '../sercet.js'
import jwt from 'jsonwebtoken'
const Random = Mock.Random
const router =new express.Router()
// 图片需要的模块
import fs from 'fs'
import path from 'path'


/* 配置路由 */

/* 登录接口： */
router.post('/login',(req,res)=>{
  let { username,password }=req.body
  // console.log(username,password);
  //请求数据库
  let sql ="select * from ev_user where username=? and password=?";
  let arr =[username,password]
  sqlFn(sql,arr,result=>{
    if(result.length>0){
      let token =jwt.sign({
        username:result[0].username,
        id:result[0].id
      },sercet.key,{
        expiresIn:20*1
      })
      res.send({
        status:200,
        success:true,
        message:'登录成功',
        token:'Bearer '+token, 
        data:token 
     })
    }else{
      res.send({ status: 404, message: '信息错误' })
    }
  })
})

// 注册接口
router.post('/register',(req,res)=>{
  const{
    username,
    password
  }=req.body
  const sql='insert in ev_users values(null,?,?)'
  const arr=[username,password]
  sqlFn(sql,arr,(result)=>{
    if(result.attectedRows>0){
      res.send({
        msg:'注册成功'
      })
    }else{
      res.status(401).json({
        error:'用户名密码错误'
      })
    }
  })
})

//测试token接口
router.post('/getUser',tokenList)


// 商品列表
router.get('/pojectList', (req, res) => {
  const page = parseInt(req.query.pagesize || 1)
  const sqlLen = 'select * from sp_goods where goods_id'
  sqlFn(sqlLen, null, data => {
    const len = data.length
    const sql = 'select * from sp_goods order by goods_id desc limit 8 offset ' + (page - 1) * 8
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pagesize: 8,
          total: len
        })
      } else {
        res.send({
          status: 500,
          msg: '暂无数据'
        })
      }
    })
  })
})

// 商品规格列表
router.get('/specificationsList', (req, res) => {
  const page = parseInt(req.query.pagesize || 1)
  const sqlLen = 'select * from sp_goods where goods_id'
  sqlFn(sqlLen, null, data => {
    const len = data.length
    const sql = 'select * from sp_attribute order by attr_id desc limit 8 offset ' + (page - 1) * 8
    sqlFn(sql, null, result => {
      if (result.length > 0) {
        res.send({
          status: 200,
          data: result,
          pagesize: 8,
          total: len
        })
      } else {
        res.send({
          status: 500,
          msg: '暂无数据'
        })
      }
    })
  })
})

// 类目选择接口，参数cid：id
router.get('/category',(req,res)=>{
  const data = Mock.mock({
    status: 200,
    // 生成list字段：数组类型，内容是6个数据
    'result|4': [
      {
        'id|+1': 1, // id自增
        'name|+1': [//一次获取一个数值，累次向下推
        "电视",
        "大屏",
        "OLED",
        '空调',
        '冷风'
      ],
        'cid|+1':10001
      }
    ]
  })
  console.log(req.query);
  if(req.query.cid==4){
    res.send({
      status:500
    })
  }else{
    res.send(data)
  }
})

/* 上传图片接口 post请求 
说明：
  1.后台安装multer模块，同时引入fs模块
  在app.js进行导入注册
    import multer from 'multer'
    let objMulter = multer({ dest: "./public/upload/" }); 
    //实例化multer，传递的参数对象，dest表示上传文件的存储路径
    app.use(objMulter.any())//any表示任意类型的文件
    // app.use(objMulter.image())//仅允许上传图片类型
    // 静态资源托管
    app.use(express.static("./public"));

  2.router.js入口文件导入模块
    import fs from 'fs'
    import path from 'path'

  3.上传图片
*/ 
router.post('/upload',(req,res)=>{
  let oldName = req.files[0].path//获取名字
  //给新名字加上原来的后缀
  let newName = req.files[0].path + path.parse(req.files[0].originalname).ext
  fs.renameSync(oldName, newName)//改图片的名字
  res.send({
    err: 0,
    url:
      "http://localhost:1314/upload/" +
      req.files[0].filename +
      path.parse(req.files[0].originalname).ext//该图片的预览路径
  })
})


// 测试mockjs数据
router.get('/test', (req, res) => {
  // 使用mock生成数据
  const data = Mock.mock({
    info: '我是一个单纯的对象',
    status: 200,
    // 生成list字段：数组类型，内容是6个数据
    'list|6': [
      {
        'id|+1': 1, // id自增
        'flag|1-2': true,
        'city|1':{//获取城市数据
          "310000": "上海市",
          "320000": "江苏省",
          "330000": "浙江省",
          "340000": "安徽省",
          "110000": "北京市",
          "130000": "河北省"
        },
        "arr|+1":[//一次获取一个数值，累次向下推
          "AMD",
          "CMD",
          "UMD",
          'BMD',
          'aaa',
          'ccc'
        ],
        'desc':'@cword(20,80)',//随机汉字
        'imgUrl':'@image'
      }
    ]
  })
  res.send(data)
})

//module.exports=router
export default router