import Table from "react-bootstrap/Table";
import { GetAllUsers, createNewUserService,
          deleteUserService, editUserService   
      } from "../service/UserService";
import { useEffect, useState } from "react";
import {AiFillEdit, AiFillDelete,AiOutlinePlus} from 'react-icons/ai'
import styles from '../../../fontend/src/container/UserManage.module.scss'
import classNames from "classnames/bind";
import { ModalUser } from "./ModalUser";
import { ModalEditUser } from "./ModalEditUser";

const cx = classNames.bind(styles);

const UserManage = () => {
  const [user, setUser] = useState([]);
  const [isOpenMadalUser, setIsOpenMadalUser] = useState(false)
  const [isOpenEditModalUser, setIsOpenEditModalUser] = useState(false)
  const [isUserEdit, setIsUserEdit] = useState({})

  useEffect(() => {
    async function get() {
      // let response = await GetAllUsers("ALL");
      // if (response && response.data.errCode === 0) {
      //   setUser(response.data.user);
      //   console.log("check state", response);
      // }
      // console.log("data node.js", response);
      getAllUserFromReact()
    }
    get()
  }, []);

  let arrayUser = user
  console.log('array', arrayUser);

  let handleAddNewUser = () => {
    setIsOpenMadalUser(true)
  }

  let togleUserModal = () => {
    setIsOpenMadalUser(!isOpenMadalUser)
  }

  let togleUserEditModal = () => {
    setIsOpenEditModalUser(!isOpenEditModalUser)
  }

  let getAllUserFromReact = async() => {
    let response = await GetAllUsers("ALL");
      if (response && response.data.errCode === 0) {
        setUser(response.data.user);
        console.log("check state", response);
      }
      console.log("data node.js", response);
  }

  const createNewUser = async(data) => {
    try{
      let response = await createNewUserService(data)
      if(response && response.data.errCode !== 0) {
        alert(response.data.errMessage)
      }
      else {
        await getAllUserFromReact()
        setIsOpenMadalUser(false)
      }
      console.log('create user',response);
    }catch(e){
      console.log(e);
    }
    // console.log("data", data);
  }

  const handleDeleteUser = async(user) => {
    console.log('delete', user);
    try{
      let response = await deleteUserService(user.username)
      if(response && response.data.errCode === 0) {
        await getAllUserFromReact()
        
      }
      else {
        alert(response.data.errMessage)
      }
      console.log("delete user",response);
    }catch(e) {
      console.log(e);
    }
  }

  const handleEditUser = (user) => {
    console.log("check edit user", user);
    setIsOpenEditModalUser(true)
    setIsUserEdit(user)
  }

  const doEditUser = async(user) => {
    console.log('click save user', user);
    try{
      let response = await editUserService(user)
      console.log('click save user response', response);
      if(response && response.data.errCode === 0) {
        setIsOpenEditModalUser(false)
        await getAllUserFromReact()
      }
      else {
        alert(response.data.errCode)
      }
    }catch(e) {
      console.log(e);
    }

  }


  return (
    <div className="users-container">
      {/* {console.log('check state', setUser)} */}
      <ModalUser
          isOpenn = {isOpenMadalUser}
          togleFromParent = {togleUserModal}
          createNewUser = {createNewUser}
      />
      {isOpenEditModalUser && 
      
      <ModalEditUser
          isOpenn = {isOpenEditModalUser}
          togleFromParent = {togleUserEditModal}
          currentUser = {isUserEdit}
          editUser = {doEditUser}
      /> 
      }
      <div className="title text-center mt-3">Manage Quế Quế</div>
      <div className="mx-1">
        <button
           className="btn btn-primary px-3"
           onClick={handleAddNewUser}
        >
          <AiOutlinePlus/>
          Add new user
        </button>
      </div>
      <div className="users-table mt-3">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th></th>
              <th>Username</th>
              <th>Role</th>
              <th>Status</th>
              
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
              {arrayUser.map((item, index) => {
                return(
                  <tr key={index}>
                 <>
                  <td>{index}</td>
                  <td>{item.username}</td>
                  <td>{item.role}</td>
                  <td>{item.status === 0 ? "Đã nghĩ" : "Đang học"}</td>
                  <td>
                    <button className={cx("btn-edit")} onClick={() => handleEditUser(item)}><AiFillEdit/></button>
                    <button className={cx("btn-delete")} onClick={() =>handleDeleteUser(item)}><AiFillDelete /></button>
                    

                  </td>
                 </>
            </tr>
                )
              })}
              
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export { UserManage };
