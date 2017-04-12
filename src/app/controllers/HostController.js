/**
 * Created by MinhTu on 4/10/2017.
 */
/**
 * Created by MinhTu on 3/22/2017.
 */
(function(){

    angular
        .module('app')
        .controller('HostController', [
            'quizService',
            '$scope','Socket','$stateParams','$interval',
            HostController

        ]);

    function HostController(quizService , $scope,Socket,$stateParams,$interval) {
        var vm = this;
        vm.gameId = $stateParams.pin;
        var quizId = $stateParams.id;

        vm.gameState = 'waitingRoom';

        vm.listUserInGame = [];

        //get question list
        var listQuestion = [];
        init();
        function init (){
            quizService.getQuizDetail(quizId)
                .then(function(res){
                    listQuestion = res.data.questions;
                    console.log(listQuestion);
                }).catch(function(err){
                console.log(err);
            });
        }



        Socket.connect();

        //Phát sự kiện tạo game
        Socket.emit('newGameCreated', {
            gameId: vm.gameId,
            quizId: quizId
        });
        //Thông báo user đã vào
        Socket.on('playerJoinGame',function(data){
            console.log(data);
            
        });
        //Thông báo CÁC user đã vào room
        Socket.on('connectToRoom',function(data){
            console.log(data);
            vm.listUserInGame.push({
                username: data.username
            })
        });
        //leave

        vm.startGame = function(){
            vm.gameState = 'question';
            vm.currentQuestion  = listQuestion[0];
            vm.countdown = 5;
            Socket.emit('showQuestion',{
                question : vm.currentQuestion,
                gameId : vm.gameId
            });
            $interval(function() {
                vm.countdown--;
            },1000, vm.countdown)
                .then(function() {
                    vm.gameState = 'postQuestion';
                    Socket.emit('showCorrectAnswer',{
                        gameId : vm.gameId,
                        correctAnswer : "aaaaaaaaaaaaaaaaaaaaaaa"
                    })
                    vm.correctAnswer = vm.currentQuestion.answers.filter(function(answer){
                        return answer.correct == true;
                    });
                    console.log(vm.correctAnswer);
                });
        };

        vm.nextQuestion = function(currentQuestion){
            vm.gameState = 'question';
            var index = listQuestion.indexOf(currentQuestion);
            index ++;
            vm.currentQuestion = listQuestion[index];
            vm.countdown = 5;
            $interval(function() {
                vm.countdown--;
            },1000, vm.countdown)
                .then(function() {
                    vm.gameState = 'postQuestion';
                    Socket.emit('showLeaderBoard',{
                        gameId : vm.gameId
                    });
                    vm.correctAnswer = vm.currentQuestion.answers.filter(function(answer){
                            return answer.correct == true;
                    });
                    console.log(vm.correctAnswer);
                });
            Socket.emit('showQuestion',{
                question : vm.currentQuestion,
                gameId : vm.gameId
            });

        };
        
    }

})();
