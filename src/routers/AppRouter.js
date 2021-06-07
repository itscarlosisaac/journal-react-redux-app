import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Switch} from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { JournalScreen } from '../components/journal/JournalScreen'
import { AuthRouter } from './AuthRouter'
import { firebase } from '../firebase/firebaseConfig';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

export const AppRouter = () => {

  const dispatch = useDispatch();
  const [firebaseLoading, setFirebaseLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user => {

      if( user?.uid ) {
        dispatch(login(user.uid, user.displayName, user.photoURL, user.email))
        setIsLoggedIn(true)
        dispatch(startLoadingNotes(user.uid))
      }else {
        setIsLoggedIn(false)
      }

      setFirebaseLoading(false)

    }))
  }, [ dispatch, firebaseLoading, isLoggedIn ])

  if ( firebaseLoading ) {
    return ( 
      <h1>Loading....</h1>
    )
  }

  return (
    <>
      <Router>
        <>
          <Switch>
            <PublicRoute isAuthenticated={isLoggedIn} path="/auth" component={AuthRouter} />
            <PrivateRoute isAuthenticated={isLoggedIn} exact path="/" component={JournalScreen} />
          </Switch>
        </>
      </Router>
    </>
  )
}
