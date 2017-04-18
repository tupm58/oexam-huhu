/**
 * Created by MinhTu on 4/17/2017.
 */
(function(){

    angular
        .module('app')
        .controller('ResultController', [
            'resultService','$stateParams','$window',
            ResultController
        ]);

    function ResultController(resultService,$stateParams,$window) {
        var vm = this;
        var examId = $stateParams.examId; 
        //my own result 
        vm.myResultList = [];

        resultService
            .getListResultByUser()
            .then(function(result) {
                vm.myResultList = result.data;
            }).catch(function(err){
            console.log(err);
        });
        
        //my student result 
        vm.studentResult = [];
        resultService
            .getListResultByExam(examId)
            .then(function(result) {
                vm.studentResult = result.data.result;
            }).catch(function(err) {
            console.log(err);
        });
        
        vm.export = function(){
            resultService
                .exportCsv(examId)
                .then(function(result) {
                    vm.file = config.basicUrl + result.data.path;
                    $window.location.href = config.basicUrl + '/api/download/'+examId+ '.csv';
                }).catch(function(err) {
                console.log(err);
            });       
        };

        vm.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
    }

})();
