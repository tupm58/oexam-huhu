/**
 * Created by MinhTu on 4/17/2017.
 */

(function () {
    'use strict';

    angular.module('app')
        .service('resultService', [
            '$q', '$http',
            resultService
        ]);

    function resultService($q, $http) {
        return {
            getListResultByUser: getListResultByUser,
            getListResultByExam: getListResultByExam,
            exportCsv : exportCsv

        };

        function getListResultByUser() {
            return $http({
                url: config.basicUrl + '/api/answerSheet',
                method: 'GET'
            })
        }

        function getListResultByExam(examId) {
            return $http({
                url: config.basicUrl + '/api/answerSheet/exam/' + examId,
                method: 'GET'
            })
        }

        function exportCsv(examId){
            return $http({
                url: config.basicUrl + '/api/answerSheet/exam/'+ examId+ '/export-xls',
                method: 'GET'
            })
        }
    }
})();
