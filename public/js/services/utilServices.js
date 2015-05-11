(function(){
    'use strict';
    
    function UtilService () {
        var vm = this;
        
        vm.getCurrentDate = getCurrentDate;
        
        function getCurrentDate() {
            return new Date();
        };
    };
    
    angular
        .module('armentum')
        .factory('UtilService', [
            UtilService
    ]);
    
})();