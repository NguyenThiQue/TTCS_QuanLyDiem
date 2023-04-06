import React, { useEffect, useState } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import styles from "../../../fontend/src/container/UserManage.module.scss";
import classNames from "classnames/bind";

const ModalUser = (props) => {
  const cx = classNames.bind(styles);

  const [modal, setModal] = useState(false);
  const [nestedModal, setNestedModal] = useState(false);
  const [closeAll, setCloseAll] = useState(false);

  // const [username, setUsername] = useState('')
  // const [password, setPassword] = useState('')
  // const [role, setRole] = useState('')
  // const [status, setStatus] = useState('')
  const init = {
    username: "",
    password: "",
    role: "",
    status: "",
  };

  const [valueForm, setValueForm] = useState(init);

  const toggle = () => setModal(props.togleFromParent);
  const toggleNested = () => {
    setNestedModal(!nestedModal);
    setCloseAll(false);
  };
  const toggleAll = () => {
    setNestedModal(!nestedModal);
    setCloseAll(true);
  };
  // console.log("modal", { props });
  // console.log("modall", props.isOpenn);

  let handleOnChangInput = (e) => {
    setValueForm({
      ...valueForm,
      [e.target.name]: e.target.value.trim(),
    });

    // console.log("state", valueForm);
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

  let handleAddNewUser = () => {
    let isValid = checkValidateInput()
    if(isValid === true) {
      props.createNewUser(valueForm)
      // console.log("submit", valueForm);
    }
  };

  return (
    <Modal
      isOpen={props.isOpenn}
      toggle={toggle}
      size="lg"
      centered
      className={cx("modal-user-container")}
    >
      <ModalHeader toggle={toggle}>Thêm tài khoản</ModalHeader>
      <ModalBody>
        <div className={cx("modal-user-body")}>
          <div className={cx("input-container")}>
            <label>Username</label>
            <input
              type="text"
              name="username"
              onChange={(e) => {
                handleOnChangInput(e);
              }}
            />
          </div>
          <div className={cx("input-container")}>
            <label>Password</label>
            <input
              type="password"
              name="password"
              onChange={(e) => {
                handleOnChangInput(e);
              }}
            />
          </div>
          <div className={cx("input-container")}>
            <label>Role</label>
            <input
              type="role"
              name="role"
              onChange={(e) => {
                handleOnChangInput(e);
              }}
            />
          </div>
          <div className={cx("input-container")}>
            <label>Status</label>
            <select
              name="status"
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
        <Button color="primary" className="px-3" onClick={handleAddNewUser}>
          Add user
        </Button>{" "}
        <Button color="secondary" className="px-3" onClick={toggle}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { ModalUser };
