import { Component, Element, Prop, State, Method, Event, EventEmitter } from '@stencil/core';
// import * as firebase from 'firebase';

@Component({
  tag: 'firebase-stencil'
})
export class FirebaseStencil {
  @Element() firebaseStencil: HTMLElement;
  @State() firebase: any;
  @Prop() config: Object;
  @State() ref: any;
  
  @Event() response: EventEmitter;
  @Event() loginSuccess: EventEmitter;
  
  componentWillLoad() {
    this.firebase = window['firebase'];
    this.firebase.initializeApp(this.config)
    this.ref = this.firebase.database().ref();
  }
  @Method()
  setItem(id, value) {
      this.ref.child(id).set(value, response => response)
  }
  @Method()
  getItem(id) {
    this.ref.child(id).on('value', snapshot => {  
        const store = snapshot.val();
        this.response.emit(store);
    });
  }
  @Method()
  setFirebase(firebase) {
    this.firebase = firebase;
  }
  @Method()
  removeItem(id) {
    this.ref.child(id).remove();
  }
  @Method()
  googleLogin() {
    var provider = new this.firebase.auth.GoogleAuthProvider();
    this.firebase.auth().signInWithPopup(provider).then( (result) => {
      this.loginSuccess.emit(result);
      console.log('login', result)
    }).catch(function(error) {
      console.log('error', error)
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
    });
  }
  render() {
      return null;
  }
}
