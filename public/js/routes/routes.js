(function(){
	'use strict';

	function config ($routeProvider, $locationProvider) {
		$routeProvider
			.when('/', {
				templateUrl: 'views/dashboard.html',
				controller: 'DashboardCtrl',
				controllerAs: 'dashboard'
			})
			.otherwise({
				redirectTo: '/'
			});

			$locationProvider.html5Mode(true);
	}

	angular
		.module('armentum')
		.config(config);
})();
