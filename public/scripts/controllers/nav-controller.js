(function() {
   var app = angular.module('navController', []);
   
   app.controller('navController', function($http, $scope) {
      $scope.loggedIn = false; // TODO: set this to false after finished testing
      $scope.showingAccountWindow = false;
      $scope.creatingAccount = false;
      $scope.userCreated = false;
      $scope.currentUserName = "temp";
      $scope.managingUserBooks = false;
      $scope.tradeRequestsOutstanding = true; // TODO: set to false after finished testing
      $scope.bookArray = [1, 2];
      
      // Populate the book list on opening the page.
      $http.get('/getBooks').then(function(response) {
         var bookList = response.data.reverse();
         $scope.bookArray = bookList;
      });  
      
      function getUserBooks() {
         var requestObject = {
            "user_name": $scope.currentUserName
         };
         
         // Why can't we send data with a .get request? We're just getting info, not posting anything. I think I just don't understand the difference fully.
         $http.post('/getUserBooks', requestObject).then(function(response) {
            //console.log(response.data.book_list.reverse());
            console.log(requestObject);
            $scope.bookArray = response.data.book_list.reverse();
            console.log($scope.bookArray);
         });
      }
      
      this.centerBookSelection = function(event) {
         console.log(event.target.id);
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
            if (response.data === true) {
               $scope.loggedIn = true;
               $scope.showingAccountWindow = false;
               $scope.currentUserName = $('#login-username-input').val();
            }
            if (response.data === false) {
               $('#login-failed').text("Name or password is incorrect");
               console.log("wrong user name or password");
            }
         });
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
            } else if (response.data[1] === 1) {
               $('#account-creation-failed').text("That name is in use");
            }
         });
         
      };
      
      this.manageUserBooks = function() {
         getUserBooks();
         $scope.managingUserBooks = true;
      };
      
      this.submitBook = function() {
         var requestObject = {
            "user_name": $scope.currentUserName,
            "title": $('#submit-book-title-input').val(),
            "author": $('#submit-book-author-input').val(),
            "genre": $('#submit-book-genre-input').val()
         };

         $http.post('/postBook', requestObject).then(function(response) {
            console.log("attempted a post"); // TODO: We're posting successfully, but the .then stuff isn't happening.
            getUserBooks();
            $('#submit-book-title-input').val("");
            $('#submit-book-author-input').val("");
            $('#submit-book-genre-input').val("");
            $('#submit-book-success').text("Book posted!");
         });     
      };
      
   }); 
})();