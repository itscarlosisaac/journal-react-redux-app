import { types } from "../types/types"
import { firebase, googleAuthProvider } from '../firebase/firebaseConfig';
import { uiFinishLoadingAction } from "./ui";
import Swal from 'sweetalert2';
import { notesLogout } from "./notes";

export const startLoginEmailPassword = ( email, password ) => {
  return (dispatch) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
    .then(({user}) => {
      dispatch( login(user.uid, user.displayName, null, null ))
      dispatch( uiFinishLoadingAction(true) )
    })
    .catch(e => {
      Swal.fire("Error", e.message, 'error')
    })
  }
}

export const startGoogleLogin = () => {
  return (dispatch) => {
    firebase.auth().signInWithPopup( googleAuthProvider )
      .then( ({user}) => {
        console.log("FROM",user)
        dispatch(login(user.uid, user.displayName, user.photoURL, user.email))
      } )
  }
}

export const login = ( uid, displayName, photoURL, email ) => {
  return {
    type: types.login,
    payload: {
      uid,
      displayName,
      photoURL, 
      email
    }
  }
}

export const startLogout = () => {
  return async (dispatch) => {
    await firebase.auth().signOut()
      dispatch(logout());
      dispatch( notesLogout() )
  }
}

export const logout = () => {
  return {
    type: types.logout
  }
}

export const startRegister = ( email, password, username ) => {
  return ( dispatch ) => {
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then( async ({user}) => {
      await user.updateProfile({ displayName: username });
      dispatch(login(user.uid, user.displayName))
    } )
    .catch(e => {     
      Swal.fire("Error", e.message, 'error')
    })
  }
}