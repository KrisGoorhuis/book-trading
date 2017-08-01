TODO: (some stuff under data-model.js)

   -Have the server not go down when a user cannot be found. Hee
   
EXPANSION NOTES:
   -Form validation would be nice.
   -People can write whatever they want in the genre field when submitting a book. Maybe have a dropdown of choices?
   -Store people's text for input fields if the close something before finishing. Not password?
   
LESSONS: 
   -Declaring the same ng-controller again from within the first declaration creates a new scope. Scope problems can be difficult to figure out. 
   
PITCH DETAILS: 
   -Knows how many people have requested something, constructs grammatically correct sentence
   
Data structure:
      database: mongodb://localhost:27017/localbooks
      Two collections:
         users: 
         { 
            "user_name": "Kris",
            "hash": "",
            "book_list": [
               {
                  "title": "Hammers",
                  "author": "Cass",
                  "genre": "Children's",
                  "requested": false
               },
               {
                  "title": "Hammers",
                  "author": "Cass",
                  "genre": "Children's",
                  "requested": false
               }
            ],
            "trade_requests": [
               {
                  "requester": "person!",
                  "book_requested": "Hammers"
               },
               {
                  "requester": "Otherperson",
                  "book_requested": "also hammers"
               }
            ]
         }, 
         repeat
         
      books:
         {
            [
               {
                  "poster": "kris",
                  "title": "Hammers",
                  "author": "Cass"
               },
               {
                  "poster": "kris",
                  "title": "Hammers 2",
                  "author": "Cass"
               },
               repeat
            ]
         }
         
         