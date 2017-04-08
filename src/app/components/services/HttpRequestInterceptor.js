/**
 * Created by MinhTu on 4/7/2017.
 */
(function(){
    angular.module('app')
        .factory('httpRequestInterceptor', [
            '$q','$rootScope',
            httpRequestInterceptor
        ]);

    function httpRequestInterceptor($q,$rootScope){
        return {
            request: function (requestConfig) {
                //default show toaster for all xhr, if some error doesn't need to show then set this var to false when handle failure
                $rootScope.showToaster = true;
                if (localStorage['auth-token']) {
                    requestConfig.headers['Authorization'] = 'JWT ' + localStorage['auth-token'];
                }
                requestConfig.headers['Content-Type'] = 'application/json';
                //$rootScope.isShowOverlay = true;
                return requestConfig;
            },
            response: function (response) {
                // Do nothing on success response
                return response;
            },
            responseError: function (response) {
                return $q.reject(response);
            }
        }
    }
})();
