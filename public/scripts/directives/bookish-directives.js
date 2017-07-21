(function() {
   var app = angular.module('bookishDirectives', []);
   
   app.directive('bookBrowserSplash', function() {
      return {
         restrict: 'E',
         templateUrl: '/views/book-browser-splash.html'
      };
   });
   
   app.directive('listNewBook', function() {
      return {
         restrict: 'E',
         templateUrl: 'views/list-new-book.html'
      };
   });
   
   app.directive('accountAccess', function() {
      return {
         restrict: 'E',
         templateUrl: 'views/account-access.html'
      };
   });
   
   app.directive('dashboard', function() {
      return {
         restrict: 'E',
         templateUrl: 'views/dashboard.html'
      };
   });
   
})();