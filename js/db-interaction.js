"use strict";
// This module has no knowledge of the DOM, or where the data goes after it is fetched from Firebase.
// It is only concerned with getting and setting data in the db

let $ = require('jquery'),
    firebase = require("./api-config");

// ****************************************
// DB interaction using Firebase REST API
// ****************************************

//get new movies from movie db api
function getNewMovies(searchVal) {
	return new Promise(function(resolve,reject){
		
		$.ajax({
			url:`https://api.themoviedb.org/3/search/movie?api_key=08c884af213d59e7fc0438a466fac5ab&language=en-US&query=${searchVal}&page=1&include_adult=false`
		}).done(function(movieData){
			resolve(movieData);
		});
	});

}


//get new movie credits from movie db api
function getNewMoviesCredits(movieId) {
	return new Promise(function(resolve,reject){
		
		$.ajax({
			url:`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=08c884af213d59e7fc0438a466fac5ab&language=en-US&page=1&include_adult=false`
		}).done(function(movieData){
			resolve(movieData);
		});
	});

}

//get my movies from firebase
function getMyMovies(user, searchVal) {
	return new Promise(function(resolve,reject){
		$.ajax({
			url:`${firebase.getFBsettings().databaseURL}/songs.json?orderBy="uid"&equalTo="${user}"`
		}).done(function(movieData){
			resolve(movieData);
		});
	});

}

function addMovie(movieObj) {
	console.log("add song", movieObj);
	return new Promise(function(resolve, reject){
		$.ajax({
			url:`${firebase.getFBsettings().databaseURL}/movies.json`,
			type: 'POST',
			data: JSON.stringify(movieObj),//stringify prepares our object for json format
			dataType: 'json'
		}).done(function(movieId){
			resolve(movieId);
		});
	});

}
// POST - Submits data to be processed to a specified resource. Takes one parameter.

function deleteMovie(movieId) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url:`${firebase.getFBsettings().databaseURL}/songs/${movieId}.json`,
			method:'DELETE'
		}).done(function(){
			resolve();//resolve goes to delete when delete button is clicked
		});
	});

}

function getMovie(movieId) {
	return new Promise(function(resolve, reject){
		$.ajax({
			url:`${firebase.getFBsettings().databaseURL}/movies/${movieId}.json`
		}).done(function(movieData){
			resolve(movieData);
		}).fail(function(error){
			reject(error);
		});
	});
}

// GET - Requests/read data from a specified resource
// PUT - Update data to a specified resource. Takes two parameters.
//PATCH - update only the changes
function editMovie(movieObj, movieId) {
	return new Promise(function(resolve,reject){
		$.ajax({
			url:`${firebase.getFBsettings().databaseURL}/movies/${movieId}.json`,
			type:'PATCH',
			data:JSON.stringify(movieObj)
		}).done(function(data){
			resolve(data);
		});
	});
}

module.exports = {
  getNewMovies,//query movie db api
  getNewMoviesCredits, //query movie db for actors
  getMyMovies,//query firebase 
  addMovie,//add to watchlist
  deleteMovie, //delete from firebase
  editMovie //toggle boolean for watched
};
