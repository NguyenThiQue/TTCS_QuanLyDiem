
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "./components/Header";
import Home from "./components/Home/Home";
import Sidebar from "./components/pages/Sidebar/Sidebar";
// import Login from "./components/pages/Login/Login";
import BangDiem from "./components/BangDiem/BangDiem";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Demo from "./components/pages/demo";
import Dashboard from "./components/pages/Dashboard";
import ProtectedRouter from "./components/pages/router/ProtectedRouter";
import SideBarRoute from "./components/pages/Sidebar/SideBarRoute";
import { useSelector } from "react-redux";
import { selectUser } from "./redux/useSlices";
import Login from "./components/pages/Login/Login";

function App({auth}) {
  const user = useSelector(selectUser)
  
  return (
    <div className="App">
      <Router >
      {user ? <SideBarRoute/> : <Login/> }
        {/* <div>
            
            <Routes> 
            
             {/* <Route path="/login" element={<Login />} />  */}
             {/* <Route path="/*" element={<SideBarRoute />} /> */}
           
       {/* </Routes> 

        </div> */} 
      </Router>
    </div>
  );
}



export default App;
