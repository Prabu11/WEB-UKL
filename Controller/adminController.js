import jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'


export const loginAdminController = (req,res) =>{
    res.render('loginAdmin')
}

export const dbloginAdminController = (req,res)=>{
    // const username = req.body.username
    const gmail = req.body.gmail
    const password = req.body.password

    db.query(`select * from admin where gmail = "${gmail}" and password  = "${password}" `, (err,result)=>{
        if(err){
            console.log(err)
            return res.redirect('/loginAdmin')
        }

        const admin = result[0]
        if(!admin) return res.redirect('/loginAdmin')

        const token = jwt.sign({
            // username : pengguna.username,
            email : admin.email,
            password : admin.password
        }, JWT_Secret, {expiresIn: '6h'})
        req.session.adminToken = token;
        return res.redirect('/datauser')
    })
}

export const logoutAdminController = (req,res)=>{
    req.session.penggunaToken = undefined
    return res.redirect("/home")
}

export const cekAdminController = (req,res,next)=>{
    if(!req.session.penggunaToken) 
    return res.redirect("/loginAdmin")
    
    jwt.verify(req.session.penggunaToken, JWT_Secret, (err, pengguna)=>{
        if(err){
            console.log(err)
            return res.redirect('/loginAdmin')
        }

        req.pengguna = pengguna
        next()
    })
}