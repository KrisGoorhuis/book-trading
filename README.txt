TODO: (some stuff under data-model.js)

   -Decide on a way to let the user add books once logged in. Bring back the "my-stuff" page?
   -Have the server not go down when a user cannot be found. Hee
   
NOTES:
   -People can write whatever they want in the genre field when submitting a book. Maybe have a dropdown of choices if this were ever developed further?
   
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
                  "genre": "Children's"     
               },
               {
                  "title": "Hammers",
                  "author": "Cass",
                  "genre": "Children's"
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