"use strict";

let $ = require('jQuery');

function grabId(obj) {
    
    return new Promise(function (resolve, reject)  {
        console.log('my obj', obj);
    let movieHolder = [];  // Holds movie object or objects
    let idArray = [];  // Holds list of id's of object or objects


        for(var key in obj.results) { 
            idArray.push(obj.results[key].id);
            let x = {}; // Declare holder and build filtered movie object
            x.title = obj.results[key].title;
            x.releaseDate = obj.results[key].release_date;
            x.img = obj.results[key].poster_path;
            x.id = obj.results[key].id;
            movieHolder.push(x);  // push movie object to movie holder
        }
        let bigHolder = {holder: movieHolder, 
                        idArray : idArray};
        // console.log('object at grab id', bigHolder);
        resolve(bigHolder); //returns list of Ids or Id // bigHolder
    });
}

function concatMovie(movieActorObj) {
    console.log('movie Ob at concatmovie', movieActorObj);
    let movieHolder = movieActorObj.holder;
    let castObj = movieActorObj.actorArray;

    console.log('cast check', movieActorObj);
    debugger;
        for (let j in movieHolder) { //outer loop iterates over length of movie object holder
            let castArray = []; // creates a holder for top three actors in each movie if multiple
            for (let i = 0; i < 3; i++) { // inner loop iterates 3 times -- more times more actors added
                castArray.push(castObj[0][0].character + " played by " + castObj[0][0].name); // pushes edited string of character and name to castArray
            }
            movieHolder[j].actors = castArray; // appends the top three actor array to each object in the object holder
        }
        console.log('movieHolder', movieHolder);
        return(movieHolder);  // returns the array of movieobjects to main.js
}

module.exports = {grabId, concatMovie};