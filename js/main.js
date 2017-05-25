"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    sort = require("./manipulation");

function loadMoviesToDOM (type) {
	let currentUser = user.getUser();
	db.getMovies(currentUser)
	.then( (data) => {
		var allMovies = Object.keys(data);  //give keys to data to id buttons
		allMovies.forEach( (key) => {
			data[key].id = key;
		});
		var movies = [];
		data.forEach((key) => {
			if(type === 1 && !data[key].watched) {  //filter data based on what kind button is pushed
				movies.push(data[key]);
			}else if(type === 2 && data[key].watched) {
				movies.push(data[key]);
			}else if(type === 3 && data[key].rating > 7) {
				movies.push(data[key]);
			} else {
				movies.push(data[key]);
			}
		});
		templates.movieList(movies);
	});
}

$("#showWatched").click( () => {
	//highlight button
	loadMoviesToDOM(2);
});

$("#showUnwatched").click( () => {
	//highlight button
	loadMoviesToDOM(1);
});

$("#unTracked").click( () => {
	//hightlight button
	let newMovies = sort($("#searchInput").value);
	templates.newMovieList(newMovies);
});

$("#searchInput").keyup( (keyin) => {
	if(keyin.keyCode == 13) {
		//highlight  "show untracked" button
		let newMovies = sort($("#searchInput").value);
		templates.newMovieList(newMovies);
	}
});

$("#showFavorites").click( () => {
	loadMoviesToDOM(3);
});

$("#logging").click( () => {
	if(user.getUser() === null) {  //if there is no user logIn, otherwise logout
		user.googleLogIn();
		$("#mainContainer").removeClass("hidden");
	}else {
		user.logOut();
		$("#mainContainer").addClass("hidden");
		$("#movieDiv").html("");
	}
});

function buildMovieObj(id) {
    let movieObj = {
    name: $(id).data("title"),
    actors: $(id).data("actors"),
    year: $(id).data("year"),
    picture: $(id).data("picture"),
    watched: false,
    rating: 0,
    uid: user.getUser(),
    movieId: $(id).data("id")
  };
  return movieObj;
}

$(document).on("click", ".addToWatchList", function() {
	let newMovie = buildMovieObj(this);
	db.addMovie(newMovie);
	$("#id${movieId}").addClass("addedToWatch");
});

$(document).on("click", ".rating", function() {
	let movieId = $(this).data("movie-id");
//need logic for rating, waiting for handlebars to create, so I know what to select
});

$(document).on("click", ".delete", function() {
	let movieId = $(this).data("movie-id");
	db.deleteMovie(movieId);
	//logic for reloading based on which button is selected already
});

db.getNewMovies('billy madison')  // sends Querry To Db getter -- returns raw movie object from movieDB
.then( function(data) {
	return sort.grabId(data);  // send movie object or objects to manipulation to filter out id's -- returns list of ids or id
}).then( function(bigObject) {
	return db.getNewMoviesCredits(bigObject); // sends id query to Db getter -- returns object of cast/crew for each movie
}).then ( function(movieActorObj) {
	return sort.concatMovie(movieActorObj); // sends cast/crew object to manipulator -- returns sweet filtered object data
});

// db.getNewMovies('monsters inc').then( function(data) {
// 	return sort.grabId(data);  // send movie object or objects to manipulation to filter out id's -- returns list of ids or id
// 	}
// ).then( function(idArray) {
// 	return db.getNewMoviesCredits(idArray); // sends id query to Db getter -- returns object of cast/crew for each movie
// }).then ( function(movieObj) {
// 	sort.concatMovie(movieObj); // sends cast/crew object to manipulator -- returns sweet filtered object data
// });
