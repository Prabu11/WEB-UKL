import session from "express-session";
import jwt from "jsonwebtoken";
import { db } from "../database.js";

const JWT_Secret = 'inikuncirahasia'

export const registrasiController = (req, res) => {
     res.render('registrasi')
}

export const dbRegistrasiController = (req, res) => {
    const nama = req.body.nama;
    const email = req.body.email;
    const password = req.body.password;

    db.query(`insert into user (nama, email, password) values ("${nama}","${email}","${password}")`)

    res.redirect('/login')
}

export const loginController = (req, res) => {
    res.render('login')

}

export const dbloginController = (req, res) => {
    const nama = req.body.email
    const password = req.body.password

    db.query(`select * from user where email = "${nama}" and password = "${password}"`, (err, result) => {
        if (err) {
            console.log(err)
            return res.redirect('/login')
        }

        const pengguna = result[0]
        if (!pengguna) return res.redirect('/login')

        const token = jwt.sign({
            email: pengguna.email,
            password: pengguna.password
        }, JWT_Secret, { expiresIn: '1h' })

        req.session.penggunaToken = token;
        return res.redirect('/about')
    })
}

export const logoutController = (req, res) => {
    req.session.penggunaToken = undefined
    return res.redirect("/login")
}

export const cekuserController = (req, res, next) => {
    if (!req.session.penggunaToken)
        return res.redirect("/login")

    Jwt.verify(req, session.penggunaToken, JWT_Secret, (err, pengguna) => {

        if (err) {
            console.log(err)
            return res.redirect("/login")
        }
        req.pengguna = pengguna
        next()
    })
}