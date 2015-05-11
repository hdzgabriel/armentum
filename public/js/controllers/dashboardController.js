(function(){
  'use strict';

  function DashboardCtrl ($scope) {
    var vm = this;

    vm.empleadosCount = 38;
    vm.jornadasCount = 527;
      
    console.info('DashboardController loaded');
  }

  angular
    .module('armentum.dashboard')
    .controller('DashboardCtrl', [
      '$scope', 
      DashboardCtrl
    ]);
})();
