/**
 * Created by MinhTu on 4/20/2017.
 */

(function() {

    angular
        .module('app')
        .controller('StudentController', [
            '$scope','Socket','$stateParams',
            StudentController

        ]);

    function StudentController($scope,Socket,$stateParams) {
        var vm = this;
        vm.examId = $stateParams.examId;
        vm.listOnline = [];
        vm.listOffline = [];
        Socket.connect();
        Socket.emit('room',{
            username: localStorage.getItem('username'),
            examId : vm.examId
        });
        Socket.on('connectToStudentRoom',function(data){
            vm.listOnline.push(data);
            vm.listOffline = vm.listOffline.filter(function(val){
                if (val.username != data.username){
                    return val;
                }
            })
        });
        Socket.on('disconnect',function(data){
            // var index = vm.listOnline.indexOf(data);
            // vm.listOnline.splice(index,1);
            //
            vm.listOffline.push(data);
            vm.listOnline = vm.listOnline.filter(function(val){
                if (val.username != data.username){
                    return val;
                }
            })
        })
    }
})();