angular
  .module('tripBudget')
  .controller('HomepageController', HomepageController);

HomepageController.$inject = ['$http', '$scope'];
function HomepageController($http, $scope){
  console.log('homepage controller');
};
