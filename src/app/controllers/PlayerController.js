/**
 * Created by MinhTu on 4/10/2017.
 */

(function () {

    angular
        .module('app')
        .controller('PlayerController', [
            'examService', '$stateParams',
            '$scope', 'Socket','$interval',
            PlayerController

        ]);

    function PlayerController(examService, $stateParams, $scope, Socket,$interval) {
        var vm = this;
        vm.gameId = $stateParams.pin;
        vm.gameState = '';
        init();
        function init(){
            //if pin valid
            Socket.connect();
            //Phát sự kiện user vào game
            Socket.emit('playerJoinGame',{
                gameId: vm.gameId,
                username: localStorage.getItem('username'),
                avatar:  localStorage.getItem('avatar'),
                userId: localStorage.getItem('userId')
            });

        }
        //thông báo user đã vào
        Socket.on('playerJoinGame',function(data){
            console.log(data);
            vm.gameState = 'waitingRoom';
            vm.playJoinGameMessage = data.message;
        });
        //leave

        //see question
        Socket.on('showQuestion',function(data){
            vm.gameState = 'question';
            vm.currentQuestion = data.question;
            vm.countdown = config.countPlayer;
            $interval(function() {
                vm.countdown--;
            },100, vm.countdown)
                .then(function() {
                    vm.gameState = 'postQuestion';

                });
        });
        Socket.on('showLeaderBoard',function(data){
        });
        //answer question
        vm.saveAnswer = function (answer){
            console.log(vm.countdown);
            vm.gameState = 'loadingAnswer';
            var score = 0;
            if (answer.correct == true){
                console.log("true answer");
                score = 10;
                Socket.emit('sendAnswer',{
                    gameId: vm.gameId,
                    score: score * vm.countdown,
                    userId:  localStorage.getItem('userId'),
                    username:  localStorage.getItem('username'),
                    time: Date.now(),
                    correct : answer.correct
                });
            }
           
          
        }

    }

})();
