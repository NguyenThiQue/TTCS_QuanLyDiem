import bcrypt from 'bcryptjs'
import db from '../models/index.js'

const salt = bcrypt.genSaltSync(10);
let CreateNewUser = async(data) => {
    // console.log('dữ liệu');
    // console.log(data);

    return new Promise(async(resolve, reject) => {
        try{
            let hashPasswordFromBcrypt = await hashUserPassword(data.body.password)
            await db.Account.create({
                username: data.body.username,
                password: hashPasswordFromBcrypt,
                role: data.body.role,
                status: data.body.status === '1' ? true : false,
                
            })
            resolve('ok')
        }catch(e) {
            reject(e)
        }
    })
   
}

let hashUserPassword = (password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let hashPassword = await bcrypt.hashSync(password, salt);
            resolve(hashPassword)
        }catch(e){
            reject(e)
        }
    })
}

let getAllUser = () => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = db.Account.findAll({
                raw:true//chỉ in ra dữ liệu có trong databse
            })
            resolve(users)
        }catch(e) {
            reject(e)
        }
    })
}

let getUserInforId = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.Account.findOne({
                where:{id: userId},
                raw:true
            })

            if(user) {
                resolve(user)
            }
            else {
                resolve({})
            }
        }catch(e){
            reject(e)
        }
    })
}

let updateUserData = (data) => {
   return new Promise(async(resolve, reject) => {
    try{
        let user = await db.Account.findOne({
            where: {id: data.username}
        })
        if(user) {
            user.password = data.password
            user.role = data.role
            user.status = data.status
            await user.save()
            let allUsers = await db.Account.findAll()
            resolve(allUsers)
        }
        else {
            resolve()
        }
    }catch(e) {
        reject(e)
    }
   })
}

let deleteUserById = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let user = await db.Account.findOne({
                where: {id:userId}
            })
            if(user) {
                await user.destroy()
            }
            resolve()
        }catch(e) {
            reject(e)
        }
    })
}

export {CreateNewUser, getAllUser, getUserInforId, updateUserData, deleteUserById}