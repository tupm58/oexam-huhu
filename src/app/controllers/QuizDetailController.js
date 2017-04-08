/**
 * Created by MinhTu on 4/8/2017.
 */
(function(){

    angular
        .module('app')
        .controller('QuizDetailController', [
            'quizService','$stateParams','initialData','Socket',
            QuizDetailController
        ]);

    function QuizDetailController(quizService,$stateParams,initialData,Socket) {
        var vm = this;

        vm.quizData = initialData;

        Socket.connect();
    }

})();
