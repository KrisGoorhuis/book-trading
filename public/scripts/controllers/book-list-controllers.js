
/*
(function() {
   var app = angular.module('bookListControllers', []);
   
   app.controller('bookListSplashController', function($http, $scope) {
      $scope.bookArray = [1, 2];      
      
      $http.get('/getBooks').then(function(data) {
         data = data.data.reverse();
         $scope.bookArray = data;
      });      
      
   });
})();
*/