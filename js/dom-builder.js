"use strict";
var $ = require('jquery'),
    Handlebars = require('hbsfy/runtime'),
    sort = require("./manipulation"),
    cardsTemplate = require('../templates/card.hbs');

function populateCards(movieInfo) {
	console.log("movieInfo", movieInfo);
  $('#movieDiv').html(cardsTemplate(movieInfo));
}

module.exports = {populateCards};
