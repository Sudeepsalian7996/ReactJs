import React, { useState,useEffect,useReducer } from 'react';

import Card from '../UI/Card/Card';
import classes from './Login.module.css';
import Button from '../UI/Button/Button';

const emailReducer=(state,action)=>{
  if(action.type==="USER_INPUT"){
    return {value:action.val,isValid:action.val.includes("@")}
  }
  if(action.type==="INPUT_BLUR"){
    return {value:state.value,isValid:state.value.includes("@")}
  }
  return {value:'',isValid:false}
}

const Login = (props) => {
  // const [enteredEmail, setEnteredEmail] = useState('');
  // const [emailIsValid, setEmailIsValid] = useState();
  const [enteredPassword, setEnteredPassword] = useState('');
  const [passwordIsValid, setPasswordIsValid] = useState();
  const [enteredCollege,setEnteredCollege]=useState("")
  const [collegeIsValid,setCollegeIsValid]=useState()
  const [formIsValid, setFormIsValid] = useState(false);

    // useEffect(()=>{  
    //   const timerIdentifier=setTimeout(()=>{
    //     setFormIsValid(
    //       enteredPassword.length > 6 && enteredEmail.includes('@') && enteredCollege.length>4
    //     );
    //   },500)
    
    // return ()=>{
    //   clearTimeout(timerIdentifier)
    // }
    // },[enteredEmail,enteredPassword,enteredCollege])

 const[emailState,dispatchEmail]= useReducer(emailReducer,{value:"",isValid:null})
console.log("state-->",emailState)
  const emailChangeHandler = (event) => {
    // setEnteredEmail(event.target.value);
    dispatchEmail({type:"USER_INPUT",val:event.target.value})
    setFormIsValid(
          enteredPassword.trim().length > 6 && event.target.value.includes('@') && enteredCollege.length>4
        );
  };

  const passwordChangeHandler = (event) => {
    setEnteredPassword(event.target.value);
    setFormIsValid(
          event.target.value.trim().length > 6 && emailState.isValid && enteredCollege.length>4
        );
  };

const collegeChangeHandler=(event)=>{
  setEnteredCollege(event.target.value)
}

  const validateEmailHandler = () => {
    // setEmailIsValid(enteredEmail.includes('@'));
      dispatchEmail({type:"INPUT_BLUR"})
  };

  const validatePasswordHandler = () => {
    setPasswordIsValid(enteredPassword.trim().length > 6);
  };

  const validateCollegeHandler=()=>{
    setCollegeIsValid(enteredCollege.trim().length>3);
  }

  const submitHandler = (event) => {
    event.preventDefault();
    props.onLogin(emailState.value, enteredPassword);
  };

  return (
    <Card className={classes.login}>
      <form onSubmit={submitHandler}>
        <div
          className={`${classes.control} ${
            emailState.isValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            value={emailState.value }
            onChange={emailChangeHandler}
            onBlur={validateEmailHandler}
          />
        </div>
        <div
          className={`${classes.control} ${
            passwordIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={enteredPassword}
            onChange={passwordChangeHandler}
            onBlur={validatePasswordHandler}
          />
        </div>
        
        <div
          className={`${classes.control} ${
            collegeIsValid === false ? classes.invalid : ''
          }`}
        >
          <label htmlFor="college">College</label>
          <input
            type="text"
            id="college"
            value={enteredCollege}
            onChange={collegeChangeHandler}
            onBlur={validateCollegeHandler}
          />
        </div>
        <div className={classes.actions}>
          <Button type="submit" className={classes.btn} disabled={formIsValid}>
            Login
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default Login;
