"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    themoviedb = require("./manipulation");

function loadMoviesToDOM (type) {
	let currentUser = user.getUser();
	db.getMovies(currentUser)
	.then( (data) => {
		var allMovies = Object.keys(data);
		allMovies.forEach( (key) => {
			data[key].id = key;
		});
		var movies = [];
		data.forEach((key) => {
			if(type === 1 &&!data[key].watched) {
				movies.push(data[key]);
			}else if(type === 2 && data[key].watched) {
				movies.push(data[key]);
			}else {
				movies.push(data[key]);
			}
		});
		templates.movieList(movies);
	});
}

$("#showWatched").click( () => {
	loadMoviesToDOM(2);
});

$("#showUnwatched").click( () => {
	loadMoviesToDOM(1);
});

$("#findNew").click( () => {
	let newMovies = themoviedb($("#searchInput").value);
});

$("#logging").click( () => {
	if(user.getUser() !== null) {
		user.googleLogIn();
		$("#mainContainer").removeClass("hidden");
	}else {
		user.logOut();
		$("#mainContainer").addClass("hidden");
	}
});

$("#trackedMovies").click( () => {
	if($("#searchInput") === "") {
		loadMoviesToDOM(0);
	} else {
		db.searchYourMovies($("#searchInput").value);
	}
});

$(document).on("click", ".addToWatchList", function() {

});

$(document).on("click", ".watched", function() {

});

$(document).on("click", ".rating", function() {

});