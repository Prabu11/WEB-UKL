import { db } from "../database.js"

export const profileController = (req,res)=>{
    // return res.json({Message: 'berhasil'})
    res.render("profile")
}

export const aboutController = (req,res)=>{
    res.render("about")
}
export const transaksiController = (req,res)=>{
    res.render("transaksi")
}

export const datauserController = (req,res)=>{
    return db.query(`select * from user`, (err, result)=>{
        if(err) throw err
        return res.render('datauser', {user : result})
    })
}

export const homeController = (req,res)=>{
    res.render("home")
}

export const schoolController = (req,res)=>{
    res.render("school")
}

export const contactusController = (req,res)=>{
    res.render("contactus")
}
export const editController = (req,res)=>{
    const id = req.params.id
    return db.query(`select * from user where id =${id}`, (err,result)=>{
        if(err) throw err
        return res.render('edit',{user : result[0]})
    })
}
