"use strict";

 let firebase = require("firebase/app"),
     dbs = require("./api-getter"),
     fbData = dbs.getKey(),
     movieData = dbs.getmovieDBKey();

 require("firebase/auth");
 require("firebase/database");

 var config = {
   apiKey: fbData.apiKey,
   authDomain: fbData.authDomain,
   databaseURL: fbData.databaseURL
 };

 firebase.getFBsettings = function(){
 // 	console.log("getFBsettings", config);
 	return config;
 };

firebase.initializeApp(config);

 module.exports = firebase;
