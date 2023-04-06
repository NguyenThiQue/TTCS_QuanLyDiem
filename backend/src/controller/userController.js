
import { handleUserLogin, getAllUser, 
        createNewUser, deleteUser,
        updateUserData } from "../services/userService"

let handleLogin = async(req, res) => {
    let username = req.body.username
    let password = req.body.password

    if(!username || !password) {
        return res.status(500).json({
            errCode:1,
            message: 'Không bỏ trống username hoặc mật khẩu'
        })
    }

    let userData = await handleUserLogin(username, password)

    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.message,
        user: userData.user ? userData.user : {}
    })
}

let handleGetAllUser = async(req, res) => {
    let id = req.query.id

    if(!id) {
        return res.status(200).json({
            errCode: 1,
            errMessage: 'Missing required parameter',
            user: []
        })
    }

    let user = await getAllUser(id)
    return res.status(200).json({
        errCode: 0,
        errMessage: 'OK',
        user
    })
}

let handleCreateNewUser = async(req, res) => {
    let message = await createNewUser(req.body)
    // console.log(message);
    return res.status(200).json(message)
}

let handleEditUser = async(req, res) => {
    let data = req.body
    let message = await updateUserData(data)
    return res.status(200).json(message)
}

let handleDeleteUser = async(req, res) => {
    if(!req.body.username) {
        return res.status(200).json({
            errCode:1,
            errMessage: "Missing"
        })
    }
    let message = await deleteUser(req.body.username)
    return res.status(200).json(message)
}

export {handleLogin, handleGetAllUser,
        handleCreateNewUser, handleEditUser,
        handleDeleteUser }