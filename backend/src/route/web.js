import express from "express";
import {getHomePage, getCRUD, postCRUD, 
    displayGetCRUD,getEditCRUD, putCRUD
    , deleteCRUD } from '../controller/homeController'
import { handleLogin, handleGetAllUser,
         handleCreateNewUser, handleEditUser,
         handleDeleteUser } from "../controller/userController";

let router = express.Router()

let initWebRouter = (app) => {

    router.get('/', getHomePage)
    router.get('/crud', getCRUD)
    router.post('/post-crud', postCRUD)
    router.get('/get-crud', displayGetCRUD)
    router.get('/edit-crud', getEditCRUD)
    router.post('/put-crud', putCRUD)
    router.get('/delete-crud', deleteCRUD)

    router.post('/api/login', handleLogin)
    router.get('/api/get-all-user', handleGetAllUser)

    /// api bên react
    router.post('/api/create-new-user', handleCreateNewUser)
    router.put('/api/edit-user', handleEditUser)
    router.delete('/api/delete-user', handleDeleteUser)

    
    return app.use("/", router)
}

export default initWebRouter