"use strict";

let db = require("./db-interaction");

let movieHolder = [];

function grabId(obj) {
    let idArray = [];
    // db.getNewMoviesCredits(obj)
    // .then(function(data){
    //     console.log("getNewMoviesCredits inside grabID", data);
    // });
    function getCredits (data){
        // console.log("getNewMoviesCredits inside grabID", data);
        return data;
    }
    for(var key in obj.results) {
        console.log("key", key);
        idArray.push(obj.results[key].id);
        let x = {};
        x.title = obj.results[key].title;
        x.releaseDate = obj.results[key].release_date;
        x.img = obj.results[key].poster_path;
        x.id = obj.results[key].id;
        let actors = db.getNewMoviesCredits(obj.results[key].id)
        .then(getCredits);
        console.log("actors", actors);
        movieHolder.push(x);

    }
    // console.log("id", obj);
    // console.log('object at grab id', movieHolder);
    return idArray;
}

function concatMovie(actorsArray) {
    // console.log('movie Ob at concatmovie', castObj.cast);
    // console.log('movie holder length', movieHolder.length);

    // let j = 0;
    // for (let j = 0; j < movieHolder.length; j++) {
    // let castArray = [];
    //     for(let i = 0; i < 3; i++) {
    //         castArray.push(castObj.cast[i].character + " played by " + castObj.cast[i].name);
    //     }
    //     movieHolder[j].actors = castArray;
    // }
    console.log("movieHolder", movieHolder);
    // console.log('movieHolder', movieHolder);
    return movieHolder;
}

module.exports = {grabId, concatMovie};
