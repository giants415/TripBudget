angular
  .module('tripBudget')
  .controller('homepageController', homepageController);

homepageController.$inject = ['$http', '$scope'];
function homepageController($http, $scope){
  $scope.text = "Vinokur rules!";
};
