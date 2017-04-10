/**
 * Created by MinhTu on 4/8/2017.
 */
(function(){
    'use strict';

    angular.module('app')
        .service('quizService', [
            '$q','$http',
            quizService
        ]);

    function quizService($q,$http){
        return {
            getListQuiz: getListQuiz,
            getQuizDetail: getQuizDetail
        };

        function getListQuiz() {
            return $http({
                url: config.basicUrl + '/api/quiz',
                method: 'GET'
            })
        }
        function getQuizDetail(id){
            return $http({
                url: config.basicUrl + '/api/quiz/' + id,
                method: 'GET'
            })
        }
        

       
    }
})();