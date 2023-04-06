import Dashboard from "../Dashboard";
import Demo from "../demo";
import { Route, Routes } from "react-router-dom";
import Sidebar from "./Sidebar";
import BangDiem from "../../BangDiem/BangDiem";
import Login from '../../pages/Login/Login'
import { UserManage } from "../../../container/UserManage";

const SideBarRoute=()=>{
  return (
    <div>
      <Sidebar>
      <Routes>     
          <Route  path='/dashboard' element={<Dashboard/>}/>  
          <Route  path='/bangdiem' element={<BangDiem/>}/>
          <Route  path='/user-manage' element={<UserManage/>}/>

        </Routes>  
      </Sidebar>
    </div>
  );
}

export default SideBarRoute;