/**
 * Created by MinhTu on 4/8/2017.
 */
(function(){

    angular
        .module('app')
        .controller('QuizController', [
            'quizService','$rootScope',
            QuizController
        ]);

    function QuizController(quizService,$rootScope) {
        var vm = this;
        // $rootScope.color =  'red';

        vm.quizList = [];

        quizService
            .getListQuiz()
            .then(function(quiz) {
                vm.quizList = quiz.data;
                console.log(vm.quizList);
            }).catch(function(err){
                console.log(err);
            })
        
    }

})();
