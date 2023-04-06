import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../../fontend/src/container/UserManage.module.scss";
import classNames from "classnames/bind";
import 'lodash'
import { isEmpty } from "lodash";

const ModalEditUser = (props) => {
  const cx = classNames.bind(styles);

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  

  const init = {
    username: "",
    password: "",
    role: "",
    status: "",
  };

  const [valueForm, setValueForm] = useState(init || props.value);

  
 

  let user = props.currentUser
  useEffect(() => {
    async function get() {

        if(user && !isEmpty(user)) {
           
            setValueForm(user)
        }
    }
    get()
  }, [])


  const toggle = () => setModal(props.togleFromParent);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  

  let handleOnChangInput = (e, id) => {
    setValueForm({
      ...valueForm,
      [e.target.name] : e.target.value,
    });
  };

  let checkValidateInput = () => {
    let arrayInput = [
      "username",
      "password",
      "role",
      "status",
    ];
    let isValid = true
    for(let i = 0; i< arrayInput.length; i++) {
      if(!valueForm[arrayInput[i]]){
        isValid = false
        alert("Missing parameter", arrayInput[i])
        break
      }
    }
    return isValid
  };

  let handleSaveUser = () => {
    let isValid = checkValidateInput()
    if(isValid === true) {
      props.editUser(valueForm)
    }
  };
  // console.log("check from parent",props);

  return (
    <Modal
      isOpen={props.isOpenn}
      toggle={toggle}
      size="lg"
      centered
      className={cx("modal-user-container")}
    >
      <ModalHeader toggle={toggle}>Sửa thông tin tài khoản</ModalHeader>
      <ModalBody>
        <div className={cx("modal-user-body")}>
          <div className={cx("input-container")}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              value={valueForm.username}
              onChange={(e) => {
                handleOnChangInput(e);
              }}
              disabled
            />
          </div>
          <div className={cx("input-container")}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={valueForm.password = "123"}
              onChange={(e) => {
                handleOnChangInput(e);
              }}
              disabled
            />
          </div>
          <div className={cx("input-container")}>
            <label>Role</label>
            <input
              type="role"
              name="role"
              // defaultValue = {valueForm.role }
              value={valueForm.role}
              onChange={(e) => {
                handleOnChangInput(e);
              }}
            />
          </div>
          <div className={cx("input-container")}>
            <label>Status</label>
            <select
            name="status"
            value={valueForm.status}
              className={cx("select-form")}
              onChange={(e) => {
                handleOnChangInput(e);
              }}
            >
              <option value="1">Đang học</option>
              <option value="0">Đã nghỉ</option>
            </select>
          </div>
        </div>
        <br />
      </ModalBody>
      <ModalFooter>
        <Button color="primary" className="px-3" onClick={handleSaveUser}>
          Save changes
        </Button>{" "}
        <Button color="secondary" className="px-3" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { ModalEditUser };
