/**
 * Created by MinhTu on 3/23/2017.
 */
(function () {

    angular
        .module('app')
        .controller('ExamDetailController', ['examService', '$stateParams', '$timeout', 'initialData','$mdToast',
            ExamDetailController
        ]);

    function ExamDetailController(examService,$stateParams,$timeout,initialData,$mdToast) {
        console.log("detail");
        var vm = this;
        vm.examId = $stateParams.id;

        vm.examData = initialData;
        vm.timeTotal = initialData.timeTotal;
        vm.show = true;
        vm.sections = initialData.exam.sections;

        //click showExam button to show content of sections
        vm.showExam = function () {
             vm.answerSheet = [];
            //list output (section detail)
            vm.listCustom = [];
            vm.listCustom.push(vm.sections[0]);
            //count show section one by one
            vm.countArray = [];
            vm.sections.forEach(function (section) {
                vm.countArray.push(section.timeInMinute * 60);
            });
            vm.counter = vm.countArray[0];
            vm.index = 0;

            vm.show = !vm.show;

            //show template time countdown
            $mdToast.show({
                hideDelay: vm.timeTotal * 60 * 1000,
                position: 'top right',
                locals: {parm: vm.timeTotal},
                // // controller: function ($scope, parm) {
                // //     $scope.countDown = parm * 60;
                // // },
                controller: function (parm) {
                    var hu = this;
                    hu.countDown = parm * 60;
                    console.log(hu.countDown);
                },
                bindToController : true,
                controllerAs : 'hu',
                templateUrl: 'app/views/partials/toast-template.html'
            }).then(function () {
                console.log("doneeeeeeeeeeeeeee");
                console.log(vm.answerSheet);
                vm.show = !vm.show;
                var request = {
                    sheet : vm.answerSheet,
                    exam:  $stateParams.id
                };
                examService.postExamResult(request)
                    .then(function(response){
                        console.log(response);
                    },function(err){
                        console.log(err);
                    });
            });
            //next button to next section
            vm.nextSection = function (section) {
                vm.listCustom[0].questions.forEach(function(question){
                    vm.answerSheet.push({
                       question: question._id,
                       answer: question.selectedAnswer
                   }) 
                });
                console.log(vm.answerSheet);

                vm.listCustom.splice(0, 1, vm.sections[vm.sections.indexOf(section)+1]);
                vm.counter = vm.countArray[vm.sections.indexOf(section)+1];
                vm.countArray.splice(0,1,vm.countArray[vm.sections.indexOf(section)+1]);

                if (!vm.listCustom[0]){
                    console.log("done");
                    $mdToast
                        .hide()
                        .then(function() {
                        });
                }

            };

            vm.onTimeout = function () {
                if (!isNaN(vm.counter)) {
                    vm.counter = --vm.countArray[vm.index];
                    if (vm.countArray[vm.index] === 0 && vm.index < vm.countArray.length) {
                        vm.index++;
                        if (vm.counter == 0) {
                            vm.listCustom[0].questions.forEach(function(question){
                                vm.answerSheet.push({
                                    question: question._id,
                                    answer: question.selectedAnswer
                                })
                            });
                            console.log(vm.answerSheet);
                            console.log("hide");
                            //hide and show another section
                            vm.listCustom.splice(0, 1, vm.sections[vm.index]);
                            if (!vm.listCustom[0]) {
                                //OUT
                                console.log("done");
                            }
                        }
                    }
                    $timeout(vm.onTimeout, 1000);
                }
            };
            $timeout(vm.onTimeout, 1000);

        }
    };

    

})();
