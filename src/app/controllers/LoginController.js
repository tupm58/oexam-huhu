/**
 * Created by MinhTu on 4/2/2017.
 */
(function(){
    angular
        .module('app')
        .controller('LoginController',[
            '$stateParams','$window',
            LoginController
        ]);
    function LoginController($stateParams,$window) {
        var vm = this;
        vm.login = function (){
            $window.location.href = config.basicUrl + 'auth/facebook';

        }
    }
})();