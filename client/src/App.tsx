import React, { FC, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Catalog from "./containers/Catalog/Catalog";
import Dashboard from "./containers/Dashboard/Dashboard";
import Login from "./containers/Login/Login";
import Projects from "./containers/Projects/Projects";
import axios from "./api/axios";
import "./index.scss";


export interface AppProps {
  user: any;
  setUser: React.Dispatch<React.SetStateAction<any>>;
  handleLogout: any;
}

const App: FC<any> = (props) => {
  const [user, setUser] = useState<any>({})
  
  const handleLogout =async(e:any)=>{
    console.log(user, "USER")
    try{
    e.preventDefault()
    const response = await axios.post('/api/users/log_out/user', {email:  user.email})
    
    console.log(response?.data, 'response')
    console.log(user, "POST=>post")
  }catch(err){
    console.log(err, 'ERRORRRRR')
  }
  }
  const check=(e:any)=>{
    e.preventDefault();
    console.log(user,"UseR?")
  
   }
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login"  element={<Login user={user} handleLogout={handleLogout}setUser={setUser} />} />
          <Route path="/dashboard" element={<Navigate to="/login" />} />
          <Route path="/catalog" element={<Navigate to="/login" />} />
          <Route path="/projects" element={<Navigate to="/login" />} />
          <Route path="/dashboard/:user" element={<Dashboard user={user} handleLogout={handleLogout} setUser={setUser}/>} />
          <Route path="/projects/:user" element={<Projects />} />
          <Route path="/catalog/:user" element={<Catalog />} />
        </Routes>
      </BrowserRouter>
      <button onClick={(e)=> check(e)}>check</button>
    </>
  );
};

export default App;
