/**
 * Created by MinhTu on 3/22/2017.
 */
(function(){

    angular
        .module('app')
        .controller('ExamController', [
            'examService','resultService',
            '$scope','$mdExpansionPanelGroup',
            ExamController

        ]);

    function ExamController(examService ,resultService, $scope,$mdExpansionPanelGroup) {
        // $mdExpansionPanelGroup().waitFor('panelGroup').then(function (instance) {
        //     instance.register('panelOne', {
        //         templateUrl: 'templateOne.html',
        //         controller: 'TemplateOneController',
        //         controllerAs: 'vm'
        //     });
        //
        //     instance.register('panelTwo', {
        //         templateUrl: 'templateTwo.html',
        //         controller: 'TemplateTwoController',
        //         controllerAs: 'vm'
        //     });
        // });


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
        };
        var lastQuery = null;
        vm.getItems = function () {
            var query = JSON.stringify($scope.query);
            if (query == lastQuery) return;
            lastQuery = query;
            GetItemsData($scope.query);

        };

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


        //my exam
        vm.myExam = [];
        examService.listExamByMe()
            .then(function(tableData) {
                console.log(tableData.data);
                vm.myExam =  tableData.data;
                // // Represents the count of database count of records, not items array!
                // vm.totalItems = tableData.count;

            });


        vm.studentResult = [];

        vm.showResultDetail = function(exam){
            resultService
                .getListResultByExam(exam._id)
                .then(function(result) {
                    console.log(result.data);
                    vm.studentResult = result.data.result;
                    var mark1 = result.data.mark.mark1;
                    var mark2 = result.data.mark.mark2;
                    var mark3 = result.data.mark.mark3;
                    var doTime =  result.data.doTime;
                    exam.ramChartData = [{key: 'above 80', y: mark1}, { key: 'between 50 and 80', y: mark2}, {key: 'Under 50', y: mark3 }];

                    exam.chartOptions = {
                        chart: {
                            type: 'pieChart',
                            height: 130,
                            donut: true,
                            x: function (d) { return d.key; },
                            y: function (d) { return d.y; },
                            valueFormat: (d3.format(".0f")),
                            color: ['rgb(0, 150, 136)', '#E75753', 'rgb(235, 235, 235)'],
                            showLabels: false,
                            showLegend: false,
                            title: doTime,
                            margin: { top: -10, left: -20, right: -20 }
                        }
                    };


                }).catch(function(err) {
                console.log(err);
            });
        }



    }
})();
