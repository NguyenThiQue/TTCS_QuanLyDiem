import db from '../models/index.js'
import { CreateNewUser, getAllUser, getUserInforId, updateUserData, deleteUserById } from '../services/CRUDService.js'

let getHomePage = async (req, res) => {
    try {
        let data = await db.Account.findAll()

        return res.render("homepage.ejs", {
            data:JSON.stringify(data)
        })
        // return res.send('homePage.ejs')
    }catch(e) {
        console.log(e);
    }
   
}

let getCRUD = (req, res) => {
    return res.render('CRUD.ejs')
}

let postCRUD = async(req, res) => {
    let message = await CreateNewUser(req, res)
    console.log(message);
    return res.send('post crud')
}

let displayGetCRUD = async(req, res) => {
    let data = await getAllUser()
    console.log('--------------------------------');
    console.log(data);
    console.log('--------------------------------');

    return res.render('displayCRUD.ejs', {
        dataUser: data
    })
}

let getEditCRUD = async(req, res) => {
    let userId = req.query.username
    if (userId) {
        let userData = await getUserInforId(userId)
        

        return res.render('editCRUD.ejs', {
            user:userData
        })
    }
    else {

        return res.send(' not found user')
    }
}

let putCRUD = async(req, res) => {
    let data = req.body
    let allUsers = await updateUserData(data)
    return res.render('displayCRUD.ejs', {
        dataUser:allUsers
    })
}

let deleteCRUD = async(req, res ) => {
    let id = req.query.username
    if(id) {
        await deleteUserById(id)
        return res.send('delete')
    }
    else {
        return res.send('not found')
    }
}



export {getHomePage, getCRUD, 
        postCRUD, displayGetCRUD, 
        getEditCRUD, putCRUD, 
        deleteCRUD} 