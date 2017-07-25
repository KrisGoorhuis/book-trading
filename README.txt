TODO: (some stuff under data-model.js)

   -requesting a book
      .find() for user name as given by book listing, in the other book listing collection
         Place listing in "trade_requests" array with requester's user name and the book requested
   -Have the server not go down when a user cannot be found. Hee
   
EXPANSION NOTES:
   -People can write whatever they want in the genre field when submitting a book. Maybe have a dropdown of choices?
   -Store people's text for input fields if the close something before finishing. Not password?
   
LESSONS: 
   -Declaring the same ng-controller again from within the first declaration creates a new scope. Scope problems can be difficult to figure out. 
   
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