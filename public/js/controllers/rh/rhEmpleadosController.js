(function() {
	'use strict';
	
	function RecursosHumanosEmpleadosCtrl ($scope, $modal, $filter, $routeParams, RHService) {
		var vm = this;

		vm.listEmpleados = null;
		vm.showListEmpleados = null;
		vm.empToolsIsOpen = false;
        vm.empleado = null;
        vm.empleadoEdit = null;
        vm.empEditable = false;

		vm.getEmpleadosList = getEmpleadosList;
		vm.showDeleteDialog = showDeleteDialog;
		vm.getEmpleado = getEmpleado;
        vm.allowEditEmpleado = allowEditEmpleado;
        vm.cancelEditEmpleado = cancelEditEmpleado;
        vm.getCurrentDate = getCurrentDate;
        
		var modalInstance = null;
        
        function getCurrentDate() {
            return new Date ();
        }
        
        function cancelEditEmpleado() {
            console.info('cancelEditEmpleado');
            vm.empleadoEdit = angular.copy(vm.empleado);
            vm.empEditable = !vm.empEditable;
            console.log('empEditable: '+vm.empEditable);
        }
        
        function allowEditEmpleado() {
            vm.empEditable = !vm.empEditable;
            console.log('empEditable: '+vm.empEditable);
        }
		
        function getEmpleado() {
            var id = $routeParams.id;
            console.log('Empleado id: '+id);
            return RHService.get({id: id}, function(data){
                console.log('Query Executed');
                vm.empleado = data;
                console.log('Empleado: ');
                console.log(vm.empleado);
                vm.empleadoEdit = angular.copy(vm.empleado);
                console.log('EmpleadoEdit: ');
                console.log(vm.empleadoEdit);
            });
        };
        
		function getEmpleadosList () {
			console.log('rhController - listEmpleados');
			return RHService.query(function (data) {
				vm.listEmpleados = data;
				vm.showListEmpleados = [].concat(vm.listEmpleados);
				console.log('Query Executed');
			});
			
		};

		function showDeleteDialog(selectedEmp) {
			modalInstance = $modal.open({
				animation: false,
				templateUrl: 'modalDelete.html',
				controller: 'RecursosHumanosDeleteCtrl',
				controllerAs: 'rhemd',
				size: 'sm',
				resolve: {
					empleado: function(){return selectedEmp;}
				}
			});
			console.log(modalInstance);
			modalInstance.result
				.then (
					function(choise){
						console.log("Choise: " + choise);
						vm.confirmDelete = choise;
					}, 
					function () {
						console.log('Cancel');
					}
			);
		};
	};
	
	angular
		.module('armentum.rh')
		.controller('RecursosHumanosEmpleadosCtrl', [
			'$scope', 
			'$modal', 
			'$filter', 
            '$routeParams',
			'RHService',
			RecursosHumanosEmpleadosCtrl
	]);
	
})();

// Controlador para el panel modal.
(function(){
	'use strict';
	
	function RecursosHumanosEmpleadosDeleteCtrl ($scope, $modalInstance, empleado) {
		var vm = this;
		console.log(empleado);
		
		vm.empleado = empleado;
		vm.closeDeleteDialog = function(c) {		
			c ? $modalInstance.close(c) : $modalInstance.dismiss('cancelled');
		};
	};
	
	angular
		.module('armentum.rh')
		.controller('RecursosHumanosEmpleadosDeleteCtrl',[
			'$scope',
			'$modalInstance',
			'empleado',
			RecursosHumanosEmpleadosDeleteCtrl
	]);
})();