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
}

{
   "identity_anchor": "book_list_anchor",
   "book_list": [
      {
         "user_name": "kris",
         "title": "Hammers",
         "author": "Cass"
      },
      {
         "user_name": "kris",
         "title": "Hammers 2",
         "author": "Cass"
      },
      {
         "user_name": "kris",
         "title": "Hammers 3",
         "author": "Cass"
      }
   ]
}

/* 
   Separate collection for all books ever listed.
      Include the name of the person who listed that book.
   
   Someone clicks on a book, hits "request"
      .find() for user name as given by book listing, in the other book listing collection
      Place listing in "trade_requests" array with requester's user name and the book requested
*/