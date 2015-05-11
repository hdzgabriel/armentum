(function() {
    'use strict';
    
    function RecursosHumanosCtrl ($scope, RHService) {
        var vm = this;
        
        vm.empleados_count = 0;
		vm.consultoras_count = 0;
		
        console.info('RecursosHumanosController loaded');
    };
    
    angular
        .module('armentum.rh')
        .controller ('RecursosHumanosCtrl', [
            '$scope',
			'RHService',
            RecursosHumanosCtrl
        ]);
		
})();