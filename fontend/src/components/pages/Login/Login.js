import styles from "../Login/Login.module.scss";
import classNames from "classnames/bind";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import images from "../../../assets/images";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from "react-router-dom";
import Header from "../../Header";
import { useState } from "react";
import { HandleLoginAPI } from "../../../service/UserService";
import SideBarRoute from "../Sidebar/SideBarRoute";
import Dashboard from "../Dashboard";
import { useDispatch } from "react-redux";
import { login } from "../../../redux/useSlices";
import { GetAllUsers } from "../../../service/UserService";
import { useEffect } from "react";


const cx = classNames.bind(styles);
function Login() {
  const [tenDangNhap, setTenDangNhap] = useState('')
  const [password, setPassWord] = useState('')
  const [errMessage, setErrMessage] = useState('')

  const dispatch = useDispatch()
  
  const handleSubmit = async(eve) => {
   
    setErrMessage('')
    eve.preventDefault()
    try{
      let data = await HandleLoginAPI(tenDangNhap, password)
      console.log(data);
      if(data && data.data.errCode !== 0) {
        setErrMessage(data.data.message)
      }
      if(data && data.data.errCode === 0) {
        console.log('login success');
        dispatch(login({
          name:tenDangNhap,
          password:password,
          loggedIn: true
        }))
      }
    }catch(e) {
      if(e.response) {
        if(e.response.data) {
          setErrMessage(e.response.data.message) 
          // console.log(e.response.data.message);
        }
      }
      console.log(e);
    }
  }

 
  
  return (
    <>
      <Header/>
      <div className={cx("wrapper")}>
        <Container>
          <Row>
            <Col sm={5} className={cx("image-login")}>
              <img src={images.background} alt="" />
            </Col>
            <Col sm={7} className={cx("login")}>
              <div className={cx("login-wrapper")}>
                <Form className={cx("login-form")} onSubmit ={(e) => handleSubmit(e)}>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalEmail"
                  >
                    <Form.Label column sm={2}>
                      Tên đăng nhập
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={tenDangNhap}
                        onChange = {e => setTenDangNhap(e.target.value)}
                        placeholder="Tên đăng nhập"
                        className={cx("placehoder-name")
                      }
                      />
                    </Col>
                  </Form.Group>
                      
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalPassword"
                  >
                    <Form.Label column sm={2}>
                      Mật khẩu
                    </Form.Label>
                    <Col sm={10}>
                      <Form.Control
                        value={password}
                        onChange = {e => setPassWord(e.target.value)}
                        type="password"
                        placeholder="Mật khẩu"
                        className={cx("placehoder-name")}
                      />
                    </Col>
                  </Form.Group>
  
                  {/* <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalCheck"
                  > */}
                    {/* <Col sm={{ span: 10, offset: 2 }}>
                      <Form.Check
                        label="Nhớ mật khẩu"
                        className={cx("form-remember-pass")}
                      />
                    </Col>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Form.Check
                        label="Nhớ mật khẩu"
                        className={cx("form-remember-pass")}
                      />
                    </Col> */}
                    {/* <Col sm={{ span: 10, offset: 2 }}>
                      <Form.Check
                        label="Nhớ mật khẩu"
                        className={cx("form-remember-pass")}
                      />
                    </Col>
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Form.Check
                        label="Nhớ mật khẩu"
                        className={cx("form-remember-pass")}
                      />
                    </Col>
                  </Form.Group> */}
  
                  <Form.Group as={Row} className="mb-3">
                    <Col sm={{ span: 10, offset: 2 }}>
                      <Nav className="me-auto x" >
                        {/* <Nav.Link as={Link} to="/bangdiem" className={cx('login-btn')} >
                          Đăng nhập
                        </Nav.Link> */}



                        {/* <Nav.Link as={Link} to="/sidebar" className={cx('login-btn')} 
                          onClick = {handleSubmit}
                        >
                          Đăng nhập
                        </Nav.Link> */}
                        <div style={{color:'red'}}>
                          {errMessage}
                        </div>
                        <Nav.Link className={cx('login-btn')} 
                          onClick = {handleSubmit}
                        >
                          Đăng nhập
                        </Nav.Link>


                      </Nav>
                    </Col>
                  </Form.Group>
                  <Form.Group
                    as={Row}
                    className="mb-3"
                    controlId="formHorizontalCheck"
                  >
                    
                    <Col sm={{  offset: 2 }}>
                      <Form.Check
                        label="Nhớ mật khẩu"
                        className={cx("form-remember-pass")}
                      />
                    </Col>
                    <Col sm={{ offset: 2 }}>
                      Quên mật khẩu
                    </Col>
                  </Form.Group>
                </Form>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}



export default Login;
