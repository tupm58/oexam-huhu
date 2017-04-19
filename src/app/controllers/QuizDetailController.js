/**
 * Created by MinhTu on 4/8/2017.
 */
(function(){

    angular
        .module('app')
        .controller('QuizDetailController', [
            'quizService','$state','$stateParams','initialData',
            QuizDetailController
        ]);

    function QuizDetailController(quizService,$state,$stateParams,initialData) {
        var vm = this;

        vm.quizData = initialData;
        console.log(vm.quizData);
        var quizId = $stateParams.id; 
        vm.createNewRoom = function(){
            var gameId = (Math.random()*100000) | 0;
            $state.go('home.host',({id: quizId ,pin : gameId}));
           
        }
    }

})();
