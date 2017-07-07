  var app = angular.module("myApp", ["ngRoute"]);

  //routing 
  app.config(function($routeProvider) {
      
      $routeProvider
    .when("/main", {
        templateUrl : "main.html"
    })
    .when("/admin", {
        templateUrl : "adminView.html",
        controller : "adminCtrl"
    })
    .when("/menuItems", {
        templateUrl : "menuItemsListing.html",
        controller : "customersCtrl"
    });
  });