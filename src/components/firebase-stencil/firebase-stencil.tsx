import { Component, Element, Prop, State, Method, Event, EventEmitter } from '@stencil/core';
// import * as firebase from 'firebase';

@Component({
  tag: 'firebase-stencil'
})
export class FirebaseStencil {
  @Element() firebaseStencil: HTMLElement;
  @State() firebase: any;
  @Prop() config: Object = {
    apiKey: "AIzaSyBC8Yk2kJEKZwSEAVyE-y6ZjhZFE8bNs4A",
    authDomain: "caceresrealbus.firebaseapp.com",
    databaseURL: "https://caceresrealbus.firebaseio.com",
    projectId: "caceresrealbus",
    storageBucket: "caceresrealbus.appspot.com",
    messagingSenderId: "481793810270"
  };
  @State() ref: any;
  
  @Event() response: EventEmitter;
  
  componentDidLoad() {
    console.log('The component has been rendered');
      // console.log(window.firebase);

  }
  componentWillLoad() {
    console.log('The component is about to be rendered');
    this.firebase = window['firebase'];
    console.log(this.firebase);
    this.firebase.initializeApp(this.config)
    this.ref = this.firebase.database().ref();
    console.log(this.ref)
  }
  @Method()
  setItem(id, value) {
      this.ref.child(id).set(value, response => response)
  }
  @Method()
  getItem(id) {
    this.ref.child(id).on('value', snapshot => {  
        const store = snapshot.val();
        console.log(store);
        this.response.emit(store);
    });
  }
  @Method()
  setFirebase(firebase) {
    this.firebase = firebase;
    }
  render() {
      return[]
  }
}
