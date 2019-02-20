import { Injectable } from '@angular/core';

//Firebase
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  // Login to an existing account
  loginUser (email:string, password:string): Promise<firebase.auth.UserCredential> {
    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

  //Create a new account.
  signupUser (email: string, password:string): Promise<any> {
    return firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)  //this function also logs the user in automatically so no need to call to loginUser
      .then((newUserCredential: firebase.auth.UserCredential) =>{
        firebase
          .firestore()
          .doc(`/userProfile/${newUserCredential.user.uid}`)
          .set({email});
      })
      .catch(error => {
        console.error(error);
        throw new Error(error);
      })
  }

  //Send a password reset email.
  resetPassword (email:string): Promise<void>{
    return firebase.auth().sendPasswordResetEmail(email);
  }

  // Logout
  logoutUser():Promise<void>{
    return firebase.auth().signOut();
  }
}
