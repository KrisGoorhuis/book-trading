(function() {
   var app = angular.module('navController', []);
   
   app.controller('navController', function($http, $scope) {
      $scope.loggedIn = false; // TODO: set this to false after finished testing
      $scope.showingAccountWindow = false;
      $scope.creatingAccount = false;
      $scope.userCreated = false;
      $scope.currentUserName = "temp";
      $scope.managingUserBooks = false;
      $scope.booksRequested = false; // TODO: set to false after finished testing
      $scope.requestsOutstanding = 0;
      $scope.bookArray = [];
      $scope.imageArray = [];
      $scope.individualListingShown = false;
      $scope.listingIndex = 0;
      $scope.addingBook = false;
      $scope.requestingUsersText ="placeholder";
      
      
      function populateImageArray() {
         
      }
      
      // Google limits the number of calls per day. This is uncalled for now
      function getGoogleImages(title, author) {
         // cx thing is a custom search engine thing - see https://cse.google.com/cse/all 
         // '014943931445005756115:sr7phxxawey'; 
         
         // API key: "AIzaSyCC2A0XV0Z0MYVhIumg23n-i06mIlNqxpY"
         // clicked a button here after setting up the custom search engine: https://developers.google.com/custom-search/json-api/v1/introduction#identify_your_application_to_google_with_api_key
         
         var searchTerms = title + author;
         var url = 'https://www.googleapis.com/customsearch/v1?key=AIzaSyCC2A0XV0Z0MYVhIumg23n-i06mIlNqxpY&cx=014943931445005756115:sr7phxxawey&q=' + searchTerms + '&searchType=image&imgSize=medium';

         $http.get(url).then(function(response) {
            $scope.imageArray.push(response.data.items[0].link);
         });
         populateImageArray();
      }
      
      function getUserBooks() {
         var requestObject = {
            "user_name": $scope.currentUserName
         };
         
         $http.post('/getUserBooks', requestObject).then(function(response) {
            $scope.bookArray = response.data.book_list; // We're responding with a database object, so this is not given its own name as in /getbooks above.
            $scope.requestsOutstanding = 0;
            for (i = 0; i < response.data.book_list.length; i++) {
               if (response.data.book_list[i].requested === true) {
                  $scope.booksRequested = true;
                  $scope.requestsOutstanding++;
                  console.log("A book is requested!");
               }
            }
         });
      }
      
      this.inspectBook = function(index, event) {    
         $scope.listingIndex = index;
         $scope.individualListingShown = true;
         console.log($scope.bookArray[index].requested_by_user);
         var text = "No requests for this book.";
         if ($scope.managingUserBooks) {
            for (i = 0; i < $scope.bookArray[index].requested_by_user.length; i++) {
               
               if ($scope.bookArray[index].requested_by_user.length > 0 && i === 0) {
                  text = "Requested by "; // Switch out the base if there's some requests. 
               }
               
               text += $scope.bookArray[index].requested_by_user[i];
               
               if (i < $scope.bookArray[index].requested_by_user.length-2) { // Did not just add  second to last name
                  text += ", ";
               }
               if (i === $scope.bookArray[index].requested_by_user.length-2) { // Just added second to last name
                  if ($scope.bookArray[index].requested_by_user.length === 2) {
                     // Don't add a comma if it's just two people
                     text += " and ";
                     console.log("should be no comma");
                  } else {
                    text += ", and "; 
                  }       
               } 
            }
            $('#individual-listing-requested-by-users').text("test");
            console.log($('#individual-listing-requested-by-users').text());
            console.log("setting text");
            $scope.requestingUsersText = text;
         }
         
      };
      
      this.closeIndividualListing = function(event) {
         console.log("click");
         if (event.target.id === "individual-book-listing") {
            $scope.individualListingShown = false;
            $('#request-book-button').text("Request this book");
         }
      };
      
      this.showAccountWindow = function() {
         $scope.showingAccountWindow = true;
      };
      
      this.closeAccountWindow = function(event) {
         if (event.target.id === "account-access") {
            $scope.showingAccountWindow = false;
            $scope.creatingAccount = false;
         }
      };

      this.attemptLogin = function() {
         var requestObject = {
            "user_name": $('#login-username-input').val(),
            "user_password": $('#login-password-input').val()
         };
         
         $http.post('/login', requestObject).then(function(response) {
            console.log(response.data);

            if (response.data.login_approved === true) {
               $scope.loggedIn = true;
               $scope.showingAccountWindow = false;
               $scope.currentUserName = $('#login-username-input').val();
               
            }
            if (response.data.login_approved === false) {
               $('#login-failed').text("Name or password is incorrect");
            }
            if (response.data.books_requested) {
               $scope.booksRequested = true;
            }
            console.log(" requests outstanding from login: " + response.data.requestsOutstanding);
            $scope.requestsOutstanding = response.data.requestsOutstanding;
         });
      };
      
      this.logOut = function() {
         
      };
      
      this.openCreateAccountWindow = function() {
         $scope.creatingAccount = true;
      };
      
      this.createUser = function() {
         var requestObject = {
            "user_name": $('#create-account-username-input').val(),
            "user_password": $('#create-account-password-input').val()
         };
         
         $scope.currentUserName = $('#create-account-username-input').val();
         $http.post('/createUser', requestObject).then(function(response) {
            if (response.data[0] === true) { 
               console.log("You exist now!");
               $scope.loggedIn = true;
               $scope.userCreated = true;
               console.log($scope.currentUserName);
            } else if (response.data[1] === 1) {
               $('#account-creation-failed').text("That name is in use");
            }
         });
         
      };
      
      
      function manageUserBooks() {
         getUserBooks();
         $('#all-books').css('background-color', '');
         $('#my-books').css('background-color', 'rgba(244, 244, 244, 1)');
         $('#browser-cap').text('My books');
         $scope.managingUserBooks = true;
      }
      
      this.manageUserBooks = function() {
         manageUserBooks();
      };
      
      this.showBookSubmission = function() {
         $scope.addingBook = true;
         console.log($scope.addingBook);
         $('#submit-book-success').text("");
      };
      
      this.submitBook = function() {
         var requestObject = {
            "user_name": $scope.currentUserName,
            "title": $('#submit-book-title-input').val(),
            "author": $('#submit-book-author-input').val(),
            "genre": $('#submit-book-genre-input').val()
         }; // '"requested": false' is added by the router

         $http.post('/postBook', requestObject).then(function(response) {
            console.log("attempted a post"); 
            getUserBooks();
            $('#submit-book-title-input').val("");
            $('#submit-book-author-input').val("");
            $('#submit-book-genre-input').val("");
            $('#submit-book-success').text("Book posted!");
         });     
         $scope.addingBook = false;
         manageUserBooks();
      };
      
      this.requestBook = function() {
         var requestObject = {
            "book_poster": $scope.bookArray[$scope.listingIndex].user_name,
            "title_index": $scope.listingIndex,
            "current_user": $scope.currentUserName
         };
         console.log(requestObject);
         if ($scope.managingUserBooks) { // remove after testing is done - users shouldn't be given the option to request their own books anyway
            requestObject.book_poster = $scope.currentUserName;
         }
         
         $http.post('/requestBook', requestObject).then(function(response) {
            if (response.data === true) {
               $('#request-book-button').text("Request sent!");
            } else if (response.data === false) {
               $('#request-book-button').text("You've already requested this book!");
            }
         });
      };
      
      // Populate the book list on opening the page.
      this.getBooks = function() {
         $scope.managingUserBooks = false;
         $http.get('/getBooks').then(function(response) {
            $('#all-books').css('background-color', 'rgba(244, 244, 244, 1)');
            $('#my-books').css('background-color', '');
            $('#browser-cap').text('Everything');
            var bookList = response.data.items; // named "items" as part of a custom response object
            $scope.bookArray = bookList;

            var searchTitle = $scope.bookArray[0].title;
            var searchAuthor = $scope.bookArray[0].author;
            // getGoogleImages(searchTitle, searchAuthor);
         });  
      };
      this.getBooks();
       
      this.denyRequests = function() {
         // remove all user requests, listing stays
         var requestObject = {
            "user_name": $scope.currentUserName,
            "title_index": $scope.listingIndex
         };
         console.log(requestObject);
         
         $http.post('/denyRequests', requestObject).then(function(error, response) {
            
         });
         getUserBooks();
      };
      
      // Currently identical to just removing the listing
      // This'd work into helping you set up a meet or mail the thing if this were more than a proof project
      this.acceptRequests = function() {
         // remove listing entirely
         var newBookArray = angular.copy($scope.bookArray);
         newBookArray.splice($scope.listingIndex, 1);
         var requestObject = {
            "user_name": $scope.currentUserName,
            "new_book_list": newBookArray,
            "specific_book": $scope.bookArray[$scope.listingIndex]
         };
         
         $http.post('/acceptRequests', requestObject).then(function(error, response) {
            console.log(response);
         });
         getUserBooks();
         
         // These two are from the closeIndividualListing function
         $scope.individualListingShown = false;
         $('#request-book-button').text("Request this book");
      };
      
      this.removeBook = function() {
         var newBookArray = angular.copy($scope.bookArray);
         newBookArray.splice($scope.listingIndex, 1);
         var requestObject = {
            "user_name": $scope.currentUserName,
            "new_book_list": newBookArray,
            "specific_book": $scope.bookArray[$scope.listingIndex]
         };

         $http.post('/removeBook', requestObject).then(function(error, response) {
            console.log(response);
         });
         getUserBooks();
         
         // These two are from the closeIndividualListing function
         $scope.individualListingShown = false;
         $('#request-book-button').text("Request this book");
      };

   }); 
})();