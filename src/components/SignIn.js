import React, { useState } from "react";
import { auth } from "./../firebase.js";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";


function SignIn() {

  const [signUpSucess, setSignUpSuccess] = useState(null);
  
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


  return (
    <React.Fragment>
      <h1>Create Your Account</h1>
      {signUpSucess}
      <form onSubmit={doSignUp}>
        <input type="text" name="email" placeholder="Email address" required />
        <input type="password" name="password" placeholder="Password" required  />
        <input type="text" name="usersname" placeholder="Desired user name" required  />
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  );
}

export default SignIn;