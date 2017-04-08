/**
 * Created by MinhTu on 4/7/2017.
 */

(function(){
    'use strict';

    angular.module('app')
        .service('userService', [
            '$q','$http',
            userService
        ]);

    function userService($q,$http){
        return {
            login: login,
        
        };

        function login(opts) {
            return $http({
                url: config.basicUrl + "/api/auth/login",
                method: 'POST',
                data: opts

            })
        }


    }
})();
