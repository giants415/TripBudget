console.log('GA Sanity Check');
angular.module('tripBudget', ['ngRoute'])
  .config(config);

config.$inject = ['$routeProvider', '$locationProvider'];
function config($routeProvider, $locationProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'public/views/index.html',
      controller: 'homepageController'
    });

  $locationProvider.html5Mode({
    enabled: true,
    requireBase: false
  });

};
