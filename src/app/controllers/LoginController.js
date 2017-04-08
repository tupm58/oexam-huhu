/**
 * Created by MinhTu on 4/2/2017.
 */
(function(){
    angular
        .module('app')
        .controller('LoginController',[
            '$stateParams','$window','userService','$state',
            LoginController
        ]);
    function LoginController($stateParams,$window,userService,$state) {
        var vm = this;
        vm.login = function (){
            // $window.location.href = config.basicUrl + 'auth/facebook';
            var request = {
                username: vm.login.username,
                password: vm.login.password
            };
            console.log(request);
            userService.login(request)
                .then(function(res){
                    console.log(res.data);
                    localStorage.setItem('auth-token',res.data.token);
                    localStorage.setItem('username',res.data.profile.local.username);
                    localStorage.setItem('email',res.data.profile.local.email);
                    localStorage.setItem('avatar',res.data.profile.local.img);

                    $state.go('home.dashboard');
                }).catch(function(err){

            })
        }
    }
})();