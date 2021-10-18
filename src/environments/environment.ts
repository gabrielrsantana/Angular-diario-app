// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { initializeApp } from "firebase/app";

export const environment = {
  production: false,
  //adicionado
  firebaseConfig : {
    apiKey: "AIzaSyDiNgKs5kvSz9SOGgcsYKJMgIkfPyKg6p0",
    authDomain: "diario-angular-53499.firebaseapp.com",
    projectId: "diario-angular-53499",
    storageBucket: "diario-angular-53499.appspot.com",
    messagingSenderId: "46527441198",
    appId: "1:46527441198:web:b78b48c09befb08d9372bf"
  }

};


/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
