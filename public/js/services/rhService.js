(function() {
	'use estrict';
	
	function RecursosHumanosService ($resource) {
		var vm = this;
		
		vm.getEmpleadosList = getEmpleadosList;
		
		console.info ('RecursosHumanosService loaded');
		
		function getEmpleadosList ($resource) {
			log.debug('RecursosHumanosService - getEmpleadosList');
			return $resource (
				'/api/empleados/'
			);
		};
		
		return $resource (
			'/api/empleados/:id', 
			{id: '@id'}
		);	
	};
	
	angular
		.module('armentum.rh')
		.factory('RHService', [
			'$resource',
			RecursosHumanosService
		]);
})();