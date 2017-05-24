"use strict";
 let firebase = require("./api-config"),
 	 provider = new firebase.auth.GoogleAuthProvider(),
 	 currentUser = null;

 

//moment you log in, means state change in app

firebase.auth().onAuthStateChanged(function(user){
	console.log("onAuthStateChanged", user);
	if(user){
		currentUser = user.uid;
	}else{
		currentUser = null;
		console.log("no user logged in");
	}
});

function logInGoogle() {
 	return firebase.auth().signInWithPopup(provider);
}

function logOut(){
	return firebase.auth().signOut();
}

function setUser(val){
	currentUser = val;
}

function getUser(){
	return currentUser;
}


 module.exports = {logInGoogle, logOut, setUser, getUser};

