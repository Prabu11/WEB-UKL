import { db } from "../database.js";


const JWT_Secret = 'inikuncirahasia'
    
export const submiteController = (req, res) => {
   
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into user ( email , password) values ('${email}','${password}')`)

    res.redirect('/datauser')
}

export const deleteController = (req , res)=> {
    const id = req.params.id;

    db.query(`delete from user where id = ${id}`)

    res.redirect('/datauser')
}
export const updateController = (req , res)=> {
    const id = req.params.id;

    db.query(`update user set email = "aktif" where id = ${id}`)

    res.redirect('/datauser')
}

export const edittController = (req , res)=>{
    const id = req.params.id;
    const data = req.body;
    console.log(data)

    db.query(`update user set email ="${data.email}" , password = "${data.password}"  where id = ${id}`)
    
    res.redirect('/datauser')
}