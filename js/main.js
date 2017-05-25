"use strict";

let $ = require('jquery'),
    db = require("./db-interaction"),
    templates = require("./dom-builder"),
    user = require("./user"),
    sort = require("./manipulation"),
    populate = require("./dom-builder"),
    rater = require('./rating');

function loadMoviesToDOM (type) {
	let currentUser = user.getUser();
	db.getMyMovies(currentUser)
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

function getNewMovies (search) {
 	let newMovieList = [];
	templates.newMovieList(newMovieList);
}

$("#showWatched").click( () => {
	//highlight button
	loadMoviesToDOM(2);
});

$("#showUnwatched").click( () => {
	
});

$("#unTracked").click( () => {
	let input = $("#searchInput").val();
		// console.log("input", input);
		db.getNewMovies(input)
		.then(function(moviesArray){
			moviesArray.forEach(function(element){
				// console.log("element", element);
				db.getNewMoviesCredits(element.id)
				.then(function(actorsArray){
					element.actors = actorsArray;
					populate.populateCards(moviesArray);
				});
			});
		});
});

$("#searchInput").keyup( (keyin) => {
	if(keyin.keyCode == 13) {
		//highlight  "show untracked" button
		let input = $("#searchInput").val();
		// console.log("input", input);
		db.getNewMovies(input)
		.then(function(moviesArray){
			moviesArray.forEach(function(element){
				// console.log("element", element);
				db.getNewMoviesCredits(element.id)
				.then(function(actorsArray){
					element.actors = actorsArray;
					populate.populateCards(moviesArray);
				});
			});
		});
	}
});

$("#showFavorites").click( () => {
	loadMoviesToDOM(3);
});


$("#auth-btn").click( () => {
	if(user.getUser() === null) {  //if there is no user logIn, otherwise logout
		user.logInGoogle().
		then( () => {
			$("#mainContainer").removeClass("hidden");
			$("#welcome").addClass("hidden");
			},
			() => { window.alert("Failed to log in");}
		);
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

// $(document).on("click", ".addToWatchList", function() {
// 	let newMovie = buildMovieObj(this);
// 	db.addMovie(newMovie);
// 	$("#id${movieId}").addClass("addedToWatch"); //maybe make this class grey out
// });

$(document).on('click', ".addtowatch", function(event){
    let watchAdd= event.target.parentElement;
    let title= watchAdd.querySelector(".cardTitle").innerText;
    let date= watchAdd.querySelector(".cardDate").innerText;
    let actors= watchAdd.querySelector(".cardActors").innerText;
    let card= watchAdd.closest(".card");
    let poster= card.querySelector('.cardImages').src;

    //console.log("poster shit", poster);
    let userName= user.getUser();
    var addToWatchlistObj = {
        title: title,
        actors: actors,
        date: date,
        poster: poster,
        stars: null,
        boolean: false,
        fb: "fb",
        user: userName
    };
    console.log(addToWatchlistObj);
    return addToWatchlistObj;
});

$(document).on("click", ".rating", function() {
	let movieId = $(this).data("movie-id");
	let rater = $(this).rater();
	let rating = rater.rater("rating");
	db.setRating(movieId, rating);
});

$(document).on("click", ".delete", function() {
	let movieId = $(this).data("movie-id");
	db.deleteMovie(movieId);
	//logic for reloading based on which button is selected already
});



// db.addMovie('Billy Madison');
