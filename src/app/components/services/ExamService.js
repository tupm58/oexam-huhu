/**
 * Created by MinhTu on 3/22/2017.
 */
(function(){
    'use strict';

    angular.module('app')
        .service('examService', [
            '$q','$http',
            examService
        ]);

    function examService($q,$http){
        return {
            getListExams: getListExams,
            getExamDetail: getExamDetail,
            postExamResult : postExamResult
        };

        function getListExams() {
            return $http({
                url: config.basicUrl + 'exam',
                method: 'GET'
            })
        }

        function getExamDetail(id){
            return $http({
                url: config.basicUrl + 'exam/' + id,
                method: 'GET'
            })
        }
        
        function postExamResult(opts) {
            return $http({
                url: config.basicUrl + 'answerSheet',
                method: 'POST',
                data: opts
            })
        }
    }
})();
