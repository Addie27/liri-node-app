var liriRequest = require('./code.js');
var fs = require("fs");

var request = process.argv[2];
var input = process.argv[3];

var liri = new liriRequest();

if (request === "my-tweets") {
    liri.twitter();
}
else if (request === "spotify-this-song") {
    if (input === undefined) {
        liri.aceOfBase(); 
    }
    else {
        fs.writeFile("random.txt", request + " " + input, function (err) {
            if (err) {
                console.log(err);
            }

            liri.spotify();
        })
    }
}
else if (request ===  "movie-this") {
    if (input === undefined) {
        console.log("no movie");  
    }
    else {
        fs.writeFile("random.txt", request + " " + input, function (err) {
            if (err) {
                console.log(err);
            }
            
            liri.movie();
        })
    }
}

else if (request ===  "do-what-it-says") {
    fs.writeFile("random.txt", request + "I Want It That Way", function (err) {
        if (err) {
            console.log(err);
        }
        liri.spotify(); 
}); 
} 


