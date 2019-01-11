 // Initialize Firebase
 const config = {
     apiKey: "AIzaSyC34g0l23iUEybRC5QP-5wFBz4C16MNL9w",
     authDomain: "firstfbproj-bc0f1.firebaseapp.com",
     databaseURL: "https://firstfbproj-bc0f1.firebaseio.com",
     projectId: "firstfbproj-bc0f1",
     storageBucket: "firstfbproj-bc0f1.appspot.com",
     messagingSenderId: "789943866681"
 };
 firebase.initializeApp(config);
 
 // Reference Firebase DB
 const databaseRef = firebase.database();
 const favRef = databaseRef.ref('data/user1/favorites');