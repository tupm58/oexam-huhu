/**
 * Created by MinhTu on 4/1/2017.
 */
(function(){
    angular
        .module('app')
        .controller('AnswerController',[
            'answerService',
            '$stateParams',
            'initialData',
            AnswerController
        ]);
    function AnswerController(answerService,$stateParams,initialData) {
        var vm = this;

        vm.answer = initialData;
        var right = vm.answer.markByPercent;
        var wrong = 100 - vm.answer.markByPercent;
        vm.memoryChartData = [ {key: 'mark', y: right}, { key: 'total', y: wrong}];
        vm.chartOptions = {
            chart: {
                type: 'pieChart',
                height: 210,
                donut: true,
                pie: {
                    startAngle: function (d) { return d.startAngle/2 -Math.PI/2 },
                    endAngle: function (d) { return d.endAngle/2 -Math.PI/2 }
                },
                x: function (d) { return d.key; },
                y: function (d) { return d.y; },
                valueFormat: (d3.format(".0f")),
                color: ['rgb(0, 150, 136)', 'rgb(191, 191, 191)'],
                showLabels: false,
                showLegend: false,
                tooltips: false,
                title: Math.ceil(right),
                titleOffset: -10,
                margin: { bottom: -80, left: -20, right: -20 }
            }
        };






    }   
})();