/**
 * Created by MinhTu on 4/10/2017.
 */

(function () {

    angular
        .module('app')
        .controller('PlayerController', [
            'examService', '$stateParams',
            '$scope', 'Socket',
            PlayerController

        ]);

    function PlayerController(examService, $stateParams, $scope, Socket) {
        var vm = this;
        vm.gameId = $stateParams.pin;
        vm.gameState = '';
        init();
        function init(){
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
        
        

    }

})();
