
Hello! 

You've found an unfinished mess of a book trading app. But it's an important mess. 

It's a MEAN one with functional database construction, interaction, and retrieval. There's an original API in the router file (in /custom_modules) and it in turn consumes that API in its one bloated controller. This was its purpose - to allow me to really get a handle on creating a database from scratch and letting users *do* something with it.

It features:
   - Account creation with encrypted passwords
   - Storage of all account data - user names, password hashes, book listings - on a separate database
   - Item requesting and notification of pending requests, as well as controls for resolving these requests

What it doesn't do:
   - Actually facilitate users contacting eachother. Every user is me.
   - Present a nice book browsing experience
   - Validate forms
   - A bunch of other stuff




/////////////////////////////////////
Author's notes to himself



TODO: (some stuff under data-model.js)

   -accepting request: mongo cannot remove an item from an array by index. Send a replacement of the entire array with it cut out from the client side controller thing
   
   -Have the server not go down when a user cannot be found. Hee
   
EXPANSION NOTES:
   -Form validation would be nice.
   -People can write whatever they want in the genre field when submitting a book. Maybe have a dropdown of choices?
   -Store people's text for input fields if the close something before finishing. Not password?
   
LESSONS: 
   -Declaring the same ng-controller again from within the first declaration creates a new scope. Scope problems can be difficult to figure out. 
   
   -Think about how to separate things into their own controllers. Single global controller can get messy.
   
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
         repeat~
         
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
               repeat~
            ]
         }
         
         