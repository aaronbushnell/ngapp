eventsApp = angular.module('eventsApp', [
  'ngRoute'
]);

eventsApp.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: '/pages/home.html',
      controller: 'HomePageController'
    })
    .when('/:month', {
      templateUrl: '/pages/about.html',
      controller: 'AboutPageController'
    });
});

eventsApp.controller('HomePageController', function($scope, eventData) {
  $scope.pageName = 'Home';

  eventData.getEvents().success(getAllEvents);
  $scope.loading = true;
  $scope.noResults = false;

  function getAllEvents (data) {
    $scope.loading = false;

    if (data.length > 0) {
      $scope.events = data;
    } else {
      $scope.noResults = true;
    }
  }
});

eventsApp.controller('AboutPageController', function($scope) {
  $scope.pageName = 'About';
});

eventsApp.factory("eventData", function ($http) {
  return {
    getEvents: function () {
      return $http.get('/events.json', {
        cache: true
      });
    }
  };
});
