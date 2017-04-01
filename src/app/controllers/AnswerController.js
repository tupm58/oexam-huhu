/**
 * Created by MinhTu on 4/1/2017.
 */
(function(){
    angular
        .module('app')
        .controller('AnswerController',[
            'answerService',
            '$stateParams',
            AnswerController
        ]);
    function AnswerController(answerService,$stateParams) {
        var vm = this;
        initData();
        function initData(){
            answerService.getAnswerDetail($stateParams.id)
                .then(function(res){
                    console.log(res);
                }).catch(function(err){
                console.log(err);
            })
        }

    }   
})();