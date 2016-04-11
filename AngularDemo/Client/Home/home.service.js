(function () {
    'use strict';

    angular
        .module('home.module')
        .factory('messageService', MessageService);

    MessageService.$inject = ['$http', '$rootScope'];

    function MessageService( $http, $rootScope) {
        var seft = this;
        seft.messageHub = null;
        seft.proxyHub = null;
        seft.connectHub = connectHub;
        seft.getMessage = getMessage;

        //connectHub 
        function connectHub() {
            seft.messageHub = $.hubConnection();
            seft.proxyHub = seft.messageHub.createHubProxy('messageHub');
            //public an event server
            seft.proxyHub.on('getMessageHub', function (message) {
                $rootScope.$emit("getMessageHub", message);
            });
            seft.messageHub.start().done(function () {
                $rootScope.$emit("doneConnectServer");
            });
        }
        //emit event get message hub from client
        //function getMessageHubClient() {
        //    $rootScope.$emit("getMessageHubClient");
        //}
        //get message hub
        function getMessage() {
            seft.proxyHub.invoke('getAllMessageHub');
        }
        return {
            connectHub: connectHub,
            getMessage: getMessage
        }
    }
})();