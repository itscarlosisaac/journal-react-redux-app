import React from 'react'
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { uiRemoveErrorAction, uiSetErrorAction } from '../../actions/ui';
import { startRegister } from '../../actions/auth';

export const RegisterScreen = () => {

  const dispatch = useDispatch();
  const { msgError } = useSelector(state => state.ui)
  

  const [ formValues, handleInputChange ] = useForm({
    username: 'itscarlosisaac',
    email: 'carlos@gmail.com',
    password: 'password',
    confirmPassword: 'password'
  })

  const { username, email, password, confirmPassword } = formValues;

  const handleRegister = (e) => {
    e.preventDefault();
    if( isFormValid()){
      dispatch(startRegister(email, password, username))
    }
  }

  const isFormValid = () => {
    if( username.trim().length === 0 ) {
      dispatch(uiSetErrorAction( "Name can't be empty" ));
      return false;
    }else if ( !validator.isEmail(email) ) {
      dispatch(uiSetErrorAction( "Email is not valid" ));
      return false
    }else if( password !== confirmPassword || password.length < 5) {
      dispatch(uiSetErrorAction( "Password should be valid" ));
      return false;
    }
    dispatch(uiRemoveErrorAction());
    return true
  }

  return (
    <div className="w-screen h-screen flex bg-indigo-500 justify-center items-center flex-col ">
     <form onSubmit={handleRegister} className=" pt-0 bg-white shadow-xl rounded-md overflow-hidden w-96 ">
       <h3 className="auth__title mb-4 p-2 text-lg text-center font-medium text-white tracking-wide bg-blueish-800 block">Register</h3> 
       <fieldset className="p-4">
        { msgError &&  <div className="auth__alert-error">{msgError}</div> }
        <input onChange={handleInputChange} value={username} className="auth__input auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" type="text" placeholder="Username" name="username" autoComplete="off"/>
        <input onChange={handleInputChange} value={email} className="auth__input auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" type="text" placeholder="Email" name="email" autoComplete="off"/>
        <input onChange={handleInputChange} value={password} className="auth__input auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" type="password" placeholder="Password" name="password"/>
        <input onChange={handleInputChange} value={confirmPassword} className="auth__input auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" type="password" placeholder="Confirm Password" name="confirmPassword"/>
        <button type="submit" className="block text-center w-full bg-indigo-500 text-md text-white py-2 hover:bg-indigo-800 transition-colors duration-200">Register</button>
        <Link className="text-indigo-500 mt-4 block underline text-sm hover:text-blue-500" to="/auth/login">Already registered?</Link>
       </fieldset>
     </form>
    </div>
  )
}
