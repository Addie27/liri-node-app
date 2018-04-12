var liriRequest = require('./liri.js');
var fs = require("fs"); 

var request = process.argv[2];
var song = process.argv[3]; 

var liri = new liriRequest(); 

if (request === "my-tweets") {
    liri.twitter(); 
}
else if (request === "spotify-this-song") {
    fs.writeFile("random.txt", song, function(err) {
        if (err) {
            console.log(err); 
        }

        liri.spotify(); 
    })
    
}



 
