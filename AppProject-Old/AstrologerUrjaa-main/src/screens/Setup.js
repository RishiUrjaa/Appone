import React, { useState, useEffect } from "react";
import App from './App';
import { Linking, StyleSheet, Text, View } from "react-native";
import * as actions from './src/redux/actions';
import store from './src/redux/store';
import firebase from '@react-native-firebase/app';
import dynamicLinks from '@react-native-firebase/dynamic-links';
import * as RootNavigation from './RootNavigation.js';
const firebaseConfig = {
  apiKey: "AIzaSyBNpJvvJ8Qo_a0Uig1yTBOww9OIq-cCOK0",
 authDomain: "meritbox-993cf.firebaseapp.com",
   databaseURL: 'https://meritbox-993cf-default-rtdb.firebaseio.com',
 projectId: "meritbox-993cf",
 storageBucket: "meritbox-993cf.appspot.com",
 messagingSenderId: "636416764665",
 appId: "1:636416764665:web:6a6b7cb6a7bc1f9bd35028",
 measurementId: "G-0X09YB11P5"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
export {
  firebase,
  dynamicLinks,
};

const managedynamiclink = (link)=>{
  console.log(link)
  if (link.includes('book_id')){
    var geturl = link.split("=")
    if (geturl.length > 0){
      RootNavigation.navigate('BookDetails',{id: geturl[1]});
    }
  }
  if (link.includes('code_type=studymatrials')){
     var geturl = link.split("=")
    if (geturl.length > 0){
      var url = geturl[1]
      url = url.replace("&linksid",'')
      RootNavigation.navigate('AccountTopicq',{id: url});
    }
  }
}

const Setup = () => {
  const handleDynamicLink = link => {
    if (link.url != "") {
    managedynamiclink(link.url)
    //   RootNavigation.navigate('ExploreBooks', { userName: 'Lucy' });
    }
   };
   React.useEffect(async () => {
//     await inAppMessaging().setMessagesDisplaySuppressed(true);
     const unsubscribe = dynamicLinks().onLink(handleDynamicLink);
     dynamicLinks()
       .getInitialLink()
       .then(link => {
         if (link.url != "") {
           managedynamiclink(link.url)
            //RootNavigation.navigate('ActiveBooks', { userName: 'Lucy' });
         }

        // alert(link.url);
       });



     // It will trigger when app was in background


     // It will trigger when app was in quit mode

     return () => {

       unsubscribe();
     };
   }, []);

  return <App />;
};

export default Setup;
