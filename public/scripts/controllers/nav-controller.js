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
      $scope.bookArray = [1,2,3,4,5];
      
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
            $scope.bookArray = response.data.book_list.reverse();
            console.log($scope.bookArray); //TODO: bookArray is what I want it to be, but the ng-repeat broke.
         });
      }
      
      this.showAccountWindow = function() {
         $scope.showingAccountWindow = true;
      };
      
      this.closeLoginWindow = function($event) {
         if ($event.target.id === "login") {
            $scope.showingAccountWindow = false;
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
         $http.post('/createUser', requestObject);
         console.log("You exist now!");
         $scope.loggedIn = true;
         $scope.userCreated = true;
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
         
         $http.post('/postBook', requestObject).then(function() {
            console.log("attempted a post");
            getUserBooks();
         });     
      };
      
   }); 
})();