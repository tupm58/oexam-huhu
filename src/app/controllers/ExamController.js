/**
 * Created by MinhTu on 3/22/2017.
 */
(function(){

    angular
        .module('app')
        .controller('ExamController', [
            'examService',
            '$scope',
            ExamController

        ]);

    function ExamController(examService , $scope) {
        var vm = this;

        vm.tableData = [];
        vm.totalItems = 0;

        $scope.selected = [];

        $scope.query = {
            order: 'name',
            limit: 10,
            page: 1
        };
        $scope.selected = [];

        $scope.render = function (T) {
            return T;
        }
        var lastQuery = null;
        vm.getItems = function () {
            var query = JSON.stringify($scope.query);
            if (query == lastQuery) return;
            lastQuery = query;
            GetItemsData($scope.query);

        }

        function GetItemsData(query) {
            examService
                .getListExams()
                .then(function(tableData) {
                    console.log(tableData.data);
                    vm.tableData =  tableData.data;
                    // // Represents the count of database count of records, not items array!
                    // vm.totalItems = tableData.count;

                });

        }
        GetItemsData($scope.query);
    }

})();
