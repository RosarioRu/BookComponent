import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword, signOut } from "firebase/auth";


function SignIn() {

  const signInStyles = {
    marginTop: "2%"
  }

  const [signUpSuccess, setSignUpSuccess] = useState(null);
  const [signInSuccess, setSignInSuccess] = useState(null);
  const [signOutSuccess, setSignOutSuccess] = useState(null);

  function doSignUp(event) {
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const userEnteredName = event.target.usersname.value;
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        //user sucessfully registered 
      })
      .catch((error) => {
        setSignUpSuccess(`There was an error signing up: ${error.message}!`)
      });
      updateProfile(auth.currentUser, {
        displayName: userEnteredName
      }).then(() => {
        //profile updated
        setSignUpSuccess(`Welcome, ${auth.currentUser.displayName}, you are now a curator for Little Readers!`)
      });
  }

  function doSignIn(event) {
    event.preventDefault();
    const email = event.target.signinEmail.value;
    const password = event.target.signinPassword.value;
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        setSignInSuccess(`Welcome, ${auth.currentUser.displayName}`)
      })
      .catch((error) => {
        setSignInSuccess(`There was an error signing in: ${error.message}`)
      });
    setSignOutSuccess(null);
    }

  function doSignOut() {
    signOut(auth)
      .then(function() {
        setSignOutSuccess("Signed out!");
      }).catch(function(error) {
        setSignOutSuccess(`There was an error signing out: ${error.message}!`);
      });
  }

  return (
    <React.Fragment>
    <div style={signInStyles}>
      <p>Create An Account</p>
      {signUpSuccess}
      <form onSubmit={doSignUp}>
        <input type="text" name="email" placeholder="Email address" required />
        <input type="password" name="password" placeholder="Password" required  />
        <input type="text" name="usersname" placeholder="Desired user name" required  />
        <button type="submit">Register</button>
      </form>

      <p>Sign In</p>
      {signInSuccess}
      <form onSubmit={doSignIn}>
        <input type="text" name="signinEmail" placeholder="Email" />
        <input type="password" name="signinPassword" placeholder="Password" />
        <button type="submit">Log In</button>
      </form>

      
      {/* {signOutSuccess ? !null : (<div><h1>Sign Out</h1> <button onClick={doSignOut}>Log Out</button></div>)} */}

      <br/>
      <button onClick={doSignOut}>Log Out</button>
      {signOutSuccess}
    </div>
    </React.Fragment>
  );
}

export default SignIn;