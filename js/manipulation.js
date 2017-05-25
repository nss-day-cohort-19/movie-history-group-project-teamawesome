"use strict";

let movieHolder = [];

function grabId(obj) {
    let idArray = [];
    for(var key in obj.results) {
        idArray.push(obj.results[key].id);
        let x = {};
        x.title = obj.results[key].title;
        x.releaseDate = obj.results[key].release_date;
        x.img = obj.results[key].poster_path;
        x.id = obj.results[key].id;
        movieHolder.push(x);

    }
    // console.log('object at grab id', movieHolder);
    return idArray;
}

function concatMovie(castObj) {
    // console.log('movie Ob at concatmovie', castObj.cast);
    // console.log('movie holder length', movieHolder.length);

    let j = 0;
    for (let j = 0; j < movieHolder.length; j++) {
    let castArray = [];
        for(let i = 0; i < 3; i++) {
            castArray.push(castObj.cast[i].character + " played by " + castObj.cast[i].name);
        }
        movieHolder[j].actors = castArray;
    }
    // console.log('movieHolder', movieHolder);
    return movieHolder;
}

module.exports = {grabId, concatMovie};
