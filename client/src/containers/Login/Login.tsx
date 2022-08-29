import React, { FC, useEffect, useState } from "react";
import logo from "../../assets/ciana-lighting-logo.png";
import "./style/login.scss";
import { AppProps } from "../../App";
import axios from "../../api/axios"
// import { error } from "console";

const Login: FC<AppProps> = (props) => {
  let newUser: any = {}
  const [emailField, setEmailField] = useState('')
  const [passwordField, setPasswordField] = useState('')
  const [curUser, setCurUser] = useState<any>({})
  function setInputs(email: string, password: string):void{
    console.log(emailField, email, 'Email')
    console.log(passwordField, password, 'pass')
    if(email.length){
      setEmailField(email)
    }else{
      setPasswordField(password)
    }


  }
 const check=(e:any)=>{
  e.preventDefault();
  console.log(props.user,"UseR?")

 }
  
  const handleLogin =async(e:any)=>{
    e.preventDefault();
    console.log(emailField, passwordField, '??????')
    
    try{
      // e.preventDefault()
    const response = await axios.post('/users/login/user', {"email": emailField, "password": passwordField})
    
    props.setUser(response.data.User)
    // console.log(response?.data.User, 'response')
    // await user
    
    setEmailField('');
    setPasswordField('');
  }catch(err){
    console.log(err, 'ERRORRRRR')
  }
  console.log(curUser, 'current')
  // if(curUser){
  //   setUser(curUser)
  // }
  console.log(props.user, "USER")
  }
  // axios.get('/users/get/users').then(res=> console.log(res))
 


  return (
    <>
      <div className="login-container">
        <div className="login-bg-dark">
          <img src={logo} alt="ciana lighting logo" />
        </div>
        <div className="login-gold-accent" />

        <div className="login-form-container">
          <form>
            <header>Log in</header>
            <p>Welcome! Please enter your email and password.</p>

            <label>Email</label>
            <br />
            <input id="email" type="email" placeholder="Email address" onChange={(e)=> setInputs(e.target.value, '')}/>
            <br />
            <label>Password</label>
            <br />
            <input id="password" type="password" placeholder="Password" onChange={(e)=> setInputs('', e.target.value)}/>
            <a href="/forgot-password">Forgot Password?</a>
            <br />
            <div>
              <button onClick={(e)=> handleLogin(e)}>Sign In</button>
              <button onClick={(e)=> 
              check(e)}></button>
            </div>
          </form>
          <p className="login-sub-text">
            Trouble logging in?
            <br />
            Please contact your system administrator.
          </p>
        </div>
      </div>
    </>
  );
};

export default Login;
