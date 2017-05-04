/**
 * Created by MinhTu on 4/2/2017.
 */
(function(){
    angular
        .module('app')
        .controller('LoginController',[
            '$stateParams','$window','userService','$state','$location',
            LoginController
        ]);
    function LoginController($stateParams,$window,userService,$state,$location) {
        var vm = this;
        
        if ($stateParams.token != undefined){
            var token = $stateParams.token;
            var request = {
                token: token
            };
            userService.getUser(request)
                .then(function(res){
                    console.log(res.data);
                    localStorage.setItem('auth-token',res.data.token);
                    localStorage.setItem('username',res.data.profile.local.username);
                    localStorage.setItem('email',res.data.profile.local.email);
                    localStorage.setItem('avatar',res.data.profile.local.img);
                    localStorage.setItem('userId',res.data.profile._id);

                    // $state.go('home.dashboard');
                }).catch(function(err){

            })
        }
        vm.loginFB = function(){
            $window.location.href = config.basicUrl + '/api/auth/facebook';
        };
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
                    localStorage.setItem('userId',res.data.profile._id);

                    $state.go('home.exam');
                }).catch(function(err){

            })
        }
    }
})();