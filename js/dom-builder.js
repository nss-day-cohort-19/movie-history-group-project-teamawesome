"use strict";
var $ = require('jquery'),
    Handlebars = require('hbsfy/runtime'),
    sort = require("./manipulation"),
    cardsTemplate = require('../templates/card.hbs');

function populateCards(movieInfo) {
	console.log("movieInfo", movieInfo);
  $('#movieDiv').html(cardsTemplate(movieInfo));
}

//user clicks unwatched search filter and breadcrumbs appear
$("#unTracked").click(function() {
    $("#breadcrumb").html(`<a href="#!" class="breadcrumb black-text">Search Results</a>`);
});

//user clicks unwatched search filter and breadcrumbs appear
$("#showUnwatched").click(function() {
    $("#breadcrumb").html(`<a href="#!" class="breadcrumb black-text">Search Results</a>`);
    $("#breadcrumb").append(`<a href="#!" class="breadcrumb black-text">Show Untracked</a>`);
});

//user clicks watched search filter and breadcrumbs appear
$("#showWatched").click(function() {
    $("#breadcrumb").html(`<a href="#!" class="breadcrumb black-text">Search Results</a>`);
    $("#breadcrumb").append(`<a href="#!" class="breadcrumb black-text">Show Unwatched</a>`);
});

module.exports = {populateCards};
