var express = require('express');
var router = express();
var path = require('path');
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var bcrypt = require('bcrypt');

var localdb = "mongodb://localhost:27017/localbooks";
// URI below goes in an environmental variable later. Check out your polling app!
var mLabUri = "mongodb://kris:password@ds153352.mlab.com:53352/books";



function createUser(name, password) {
   bcrypt.genSalt(10, function(error, salt) {
      bcrypt.hash(password, salt, function(error, hash) {
         
         // There is no salt variable below! 
         // bcrypt saves its salt as part of the hash line it produces. Neat.
         var databaseEntry = { 
            "user_name": name,
            "hash": hash,
            "book_list": []    
         };
         
         MongoClient.connect(localdb, function(error, database) {
            database.collection("users", function(error, collection) {
               collection.insert(databaseEntry);
            });
         });
            
      });
   });   
}

router.get('/', function(request, response) {
   response.sendFile(path.resolve(__dirname, 'index.html'));
   
});

router.post('/createUser', function(request, response) {
   createUser(request.body.user_name, request.body.user_password);
});

router.get('/getBooks', function(request, response) {
   MongoClient.connect(localdb, function(error, database) {
      database.collection("bookList", function(error, collection) {
         collection.find().toArray(function(error, items) {
            response.send(items);
         });
      });
   });
});

router.post('/login', function(request, response) {
    MongoClient.connect(localdb, function(error, database) {
       database.collection("users", function(error, collection) {
          
         collection.find({"user_name": request.body.user_name}).toArray(function(error, items) {
            var givenPassword = request.body.user_password;
            var hash = items[0].hash; 
            
            // bcrypt's salt is automatically mixed in with its hash line
            bcrypt.compare(givenPassword, hash, function(error, result) {
               response.send(result);     
            });    
         });
       });
    });
});


router.post('/getUserBooks', function(request, response) {
   console.log(request.body);
   MongoClient.connect(localdb, function(error, database) {
      database.collection("users", function(error, collection) {
         
         // find current user, toArray their books, pass back the array.
         collection.find({"user_name": request.body.user_name}).toArray(function(error, items) {
            response.send(items[0]);
         });
      });
   });
});

router.post('/postBook', function(request, response) {
   console.log("attempting to post a book");
   MongoClient.connect(localdb, function(error, database) {
      
      database.collection("users", function(error, collection) {
         collection.update(
            {"user_name": request.body.user_name},
            {
               $push: {"book_list": {
                     "title": request.body.title,
                     "author": request.body.author,
                     "genre": request.body.genre
                  }   
               }
               //$set or something - operation two
            } 
         ); 
      });
      
      database.collection("bookList", function(error, collection) {
         collection.insert(
            {
               "title": request.body.title,
               "author": request.body.author,
               "genre": request.body.genre 
            } 
         );
      });
      
   });
});

module.exports = router;