import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm'
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { uiStartLoadingAction } from '../../actions/ui';

export const LoginScreen = () => {

  const dispatch = useDispatch()

  const { loading } = useSelector(state => state.ui)

  const [ formValues, handleInputChange ] = useForm({
    email: 'carlos@gmail.com',
    password: 'password',
  })

  const { email, password } = formValues;

  const handleLogin =(e) => {
    e.preventDefault();
    dispatch( startLoginEmailPassword(email, password) )
    dispatch( uiStartLoadingAction() )
  }

  const handleGoogleLogin = () =>{
    dispatch(startGoogleLogin())
  }

  return (
    <div className="w-screen h-screen flex bg-indigo-500 justify-center items-center flex-col ">
     <form onSubmit={handleLogin} className=" pt-0 bg-white shadow-xl rounded-md overflow-hidden w-96 ">
       <h3 className="auth__title mb-4 p-2 text-lg text-center font-medium text-white tracking-wide bg-blueish-800 block">Login</h3> 
       <fieldset className="p-4">
        <input onChange={handleInputChange} className="auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" value={email} type="text" placeholder="Email" name="email" autoComplete="off"/>
        <input onChange={handleInputChange} className="auth__input text-blueish-600 block w-full border border-blueish-300 border-solid p-3 mb-3" value={password} type="text" placeholder="Password" name="password"/>
        <button disabled={loading} type="submit" className="block text-center w-full bg-indigo-500 text-md text-white py-2 hover:bg-indigo-800 transition-colors duration-200">Login</button>
        <hr className="my-4"/>
        <div className="auth__social-networks">
          <div className="google-btn" onClick={handleGoogleLogin}>
                <div className="google-icon-wrapper">
                    <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                </div>
                <p className="btn-text">
                    <b>Sign in with google</b>
                </p>
            </div>
        </div>
        <Link className="text-indigo-500 mt-4 block underline text-sm hover:text-blue-500" to="/auth/register">Create new account</Link>
       </fieldset>
     </form>
    </div>
  )
}
