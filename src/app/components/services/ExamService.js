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
            postExamResult : postExamResult,
            listExamByMe: listExamByMe
        };

        function getListExams() {
            return $http({
                url: config.basicUrl + '/api/exam',
                method: 'GET'
            })
        }

        function getExamDetail(id){
            return $http({
                url: config.basicUrl + '/api/exam/' + id,
                method: 'GET'
            })
        }
        
        function postExamResult(opts) {
            return $http({
                url: config.basicUrl + '/api/answerSheet',
                method: 'POST',
                data: opts
            })
        }

        function listExamByMe(){
            return $http({
                url: config.basicUrl + '/api/exam/me',
                method: 'GET'
            })
        }
    }
})();
