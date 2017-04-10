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
            '$scope','Socket','$stateParams',
            HostController

        ]);

    function HostController(quizService , $scope,Socket,$stateParams) {
        var vm = this;
        vm.gameId = $stateParams.pin;
        var quizId = $stateParams.id;

        vm.gameState = 'waitingRoom';

        vm.listUserInGame = [];


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
            
        }
        
    }

})();
