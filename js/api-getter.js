"use strict";

function getKey() {
  return {
    apiKey: "AIzaSyCPKixA-kqlcaeT4eiKyqX2mcHpxvu95kM",
    authDomain: "movie-history-2057a.firebaseapp.com",
    databaseURL: "https://movie-history-2057a.firebaseio.com",
    creditURL: "https://api.themoviedb.org/3/movie/",
    endCreditURL: "/credits?api_key=AIzaSyCPKixA-kqlcaeT4eiKyqX2mcHpxvu95kM"
  };
}

function getmovieDBKey() {
  return {
    apiKey: "08c884af213d59e7fc0438a466fac5ab",
    databaseURL: ""
  };
}

module.exports = {getKey, getmovieDBKey};
