import db from '../models/index.js'
import bcrypt from 'bcryptjs'
const salt = bcrypt.genSaltSync(10);


let handleUserLogin = (username, password) => {
    return new Promise(async(resolve, reject) => {
        try{
            let userData = {}
            let isExist = await checkUserName(username)
            if(isExist) {
                let user = await db.Account.findOne({
                    attributes: ['username', 'role', 'password'],
                    where: {username: username},
                    raw: true
                    
                })
                if(user) {
                    let check = await bcrypt.compareSync(password, user.password)
                    if(check) {
                        userData.errCode = 0
                        userData.message = 'ok'
                        delete user.password //k cho password hiện thị trong api
                        userData.user = user
                    }
                    else {
                        userData.errCode = 3
                        userData.message = 'Sai mật khẩu'
                    }
                }else {
                    userData.errCode = 2
                    userData.message = 'Không tìm thấy địa chỉ username'
                }
            }
            else {
                userData.errCode = 1
                userData.message = 'Username không hợp lệ!'
            }
            resolve(userData)
        }catch(e) {
            reject(e)
        }
    })
}



let checkUserName = (userNmae) => {
   return new Promise(async(resolve, reject) => {
        try{
            let user = await db.Account.findOne({
                where: {username: userNmae}
            })
            if(user) {
                resolve(true)
            }
            else {
                resolve(false)
            }
        }catch(e) {
            reject(e)
        }
   })
}

let getAllUser = (userId) => {
    return new Promise(async(resolve, reject) => {
        try{
            let users = ''
            if(userId === 'ALL') {
                users = await db.Account.findAll({
                    attributes: {
                        exclude:['password']
                    }
                })
            }
            if(userId && userId !== 'ALL') {
                users = await db.Account.findOne({
                    where: {id: userId},
                    attributes: {
                        exclude:['password']
                    }
                })
            }
            resolve(users)
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

let createNewUser = (data) => {
    return new Promise(async(resolve, reject) => {
        try{

            let check = await checkUserName(data.username)
            if(check === true) {
                resolve({
                    errCode:1,
                    errMessage:"Tên username đã được sử dụng,"
                })
            }
            else {
                let hashPasswordFromBcrypt = await hashUserPassword(data.password)
                
                await db.Account.create({
                    username: data.username,
                    password: hashPasswordFromBcrypt,
                    role: data.role,
                    status: data.status === '1' ? true : false,
                    
                })
                resolve({
                    errCode:0,
                    message:"OKK"
                })
            }
        }catch(e) {
            reject(e)
        }
    })
}

let deleteUser = (userid) => {
    return new Promise(async(resolve, reject) => {
        let user = await db.Account.findOne({
            where: {username: userid}
        })
        if(!user) {
            resolve({
                errCode: 2,
                errMessage: "Người dùng không tồn tại"
            })
        }
        // if(user) {

        //     await user.destroy()
        // }

        await db.Account.destroy({
            where: {username: userid}
        })

        resolve({
            errCode: 0,
            message: "Xoá người dùng thành công"
        })
    })
}

let updateUserData = (data) => {
    return new Promise(async(resolve, reject) => {
        try{
            if(!data.username) {
                resolve({
                    errCode: 2,
                    errMessage: "Yêu cầu cập nhật người dùng không thành công"
                })
            }
            let user = await db.Account.findOne({
                where: {username: data.username},
                raw: false
            })
            if(user) {
                let hashPasswordFromBcrypt = await hashUserPassword(user.password)
                user.password = hashPasswordFromBcrypt
                user.password = data.password,
                user.role = data.role,
                user.status = data.status
                await user.save()
                // await db.Account.save({
                    
                // })
                resolve({
                    errCode: 0,
                    message: "Update người dùng thành công"
                })
            }
            else {
                resolve({
                    errCode: 1,
                    message: "Không tìm thấy người dùng"
                })
            }
        }catch(e){
            reject(e)
        }
    })
}




export {handleUserLogin, getAllUser,
        createNewUser, deleteUser, 
        updateUserData}