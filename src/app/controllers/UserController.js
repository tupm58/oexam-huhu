/**
 * Created by MinhTu on 5/2/2017.
 */
(function(){
    angular
        .module('app')
        .controller('UserController',[
            '$stateParams','$window','userService','$state','$location',
            UserController
        ]);
    function UserController($stateParams,$window,userService,$state,$location) {
        var vm = this;

            var token = $stateParams.token;
        console.log(token);
        var request = {
                token: token
            };
            userService.getUser(request)
                .then(function(res){
                    console.log(res.data);
                    localStorage.setItem('auth-token',res.data.token);
                    localStorage.setItem('username',res.data.profile.facebook.name);
                    localStorage.setItem('email',res.data.profile.facebook.email);
                    localStorage.setItem('avatar',res.data.profile.facebook.img);
                    localStorage.setItem('userId',res.data.profile._id);

                    $state.go('home.dashboard');
                }).catch(function(err){

            })


    }
})();