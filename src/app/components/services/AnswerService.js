/**
 * Created by MinhTu on 4/1/2017.
 */
(function () {
    angular.module('app')
        .service('answerService', [
            '$q', '$http',
            answerService
        ]);
    function answerService($q, $http) {
        return {
            getAnswerDetail: getAnswerDetail
        };

        function getAnswerDetail(id) {
            return $http({
                url: config.basicUrl + '/api/answerSheet/' + id,
                method: 'GET'
            })
        }
    }
})();