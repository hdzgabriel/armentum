(function(){
	'use strict';
	
	function config ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/rh', {
                templateUrl: 'views/rh.html',
                controller: 'RecursosHumanosCtrl',
                controllerAs: 'rh'
            })
			.when('/rh/empleados', {
				templateUrl: 'views/rh/empleados.html',
				controller: 'RecursosHumanosEmpleadosCtrl',
				controllerAs: 'rhe'
			})
            .when('/rh/empleados/:id',{
                templateUrl: 'views/rh/empleados_detail.html',
                controller: 'RecursosHumanosEmpleadosCtrl',
                controllerAs: 'rhe'
            })
			.otherwise({
				redirectTo: '/rh'
			});
		$locationProvider.html5Mode(true);
	}
	
	angular
		.module('armentum.rh')
		.config(config);
})();