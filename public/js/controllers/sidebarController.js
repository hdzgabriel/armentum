(function() {
	'use strict';

	function SidebarCtrl ($scope, $parse) {
		var vm = this;
		vm.rhsmenu = false;
		vm.clicked = false;

		vm.showChilds = showChilds;
		vm.hideChilds = hideChilds;

		function showChilds (e) {
			var vm = this;
			vm.hideChilds();
			vm[e+'smenu'] = !vm[e+'smenu'];
			vm.clicked = !vm.clicked;
		};

		function hideChilds () {
			var vm = this;
			for(var element in vm) {
				if (element.indexOf('smenu') > -1) {element = false;}
			}
		};
        console.info('SidebarController loaded');
	}

	angular
		.module('armentum')
		.controller('SidebarCtrl', [
            '$scope', 
            '$parse',
            SidebarCtrl
        ]);
})();
