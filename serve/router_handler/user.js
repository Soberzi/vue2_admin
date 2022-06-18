import { db } from '../db/index.js'
import jwt from 'jsonwebtoken'
import sercet from '../sercet.js'
//import bcrypt from 'bcryptjs'

/* 登录的处理函数 */
export function userLogin(req,res){
   /*  let user=req.body.user
    let pwd=req.body.pwd  */
    let {user,pwd} =req.body
    /* 连接数据库 查询语句 看数据是否存在*/
    const sql =  'select * from ev_users where username = ? and password'
    arr=[user,pwd]
    db.query(sql,arr,(err,results)=>{
      /* 如果对比的结果为false证明用户输入的密码错误 */
   //if(!compareResult){return res.send({ status: 1, message: err.message }) }   
       /* 生成token字段 */
      /* 剔除密码，只剩下用户id和用户名账号 */
        const user={id:123,username:'dilireba'}
        const tokenStr=jwt.sign(user
          ,sercet.key,{
              expiresIn: 2000//有效期，以秒为单位
            })
         res.send({
             status:0,
             success:true,   
             message:'登录成功',
             token:'Bearer '+tokenStr,
             user:userinfo.user
           })   
 })
}

/* 后端校验token是否过期 */
export function tokenList(req,res){
  let token =req.headers.authorization;
  console.log('token',token);
  if(token){
    jwt.verify(token,sercet.key,(err,decoded)=>{
      if(err){
        switch(err.name){
          case 'JsonWebTokenError':
            res.send({success:false,status:403,code:-1,msg:'无效的token'})
            break;
          case 'TokenExpiredError':
            res.send({success:false,status:403,code:-1,msg:'token过期'})
            break;  
        }
      }else{//token验证通过了
        res.send({
          status:200,
          success:true,
          info:"token验证成功---返回请求的数据",
          result:[1,2,3,4]
        })
      }
    })
  }else{
    res.send({
      success:false,
      info:"重新登录"
    })
  }
}
