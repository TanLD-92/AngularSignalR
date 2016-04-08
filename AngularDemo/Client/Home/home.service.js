(function () {
    'use strict';

    angular
        .module('home.module')
        .factory('messageService', MessageService);

    MessageService.$inject = ['$http','$rootScope'];

    function MessageService($http, $rootScope) {
        var seft = this;
        seft.messageHub = null;
        seft.proxyHub = null;
        seft.connectHub = connectHub;
        seft.getMessageHub = getMessageHub;

        //connectHub 
        function connectHub() {
            seft.messageHub = $.hubConnection();
            seft.proxyHub = seft.messageHub.createHubProxy('contosoChatHub');
            //public an event server
            seft.proxyHub.on('getMessageHub', function (message) {
                $rootScope.$emit("getMessageHub", message);
            });
            seft.messageHub.start().done(function () {
            });
        }
        //get message hub
        function getMessageHub() {
            seft.proxyHub.invoke('getAllMessageHub');
        }
        return {
            connectHub: connectHub,
            getMessageHub: getMessageHub
        }
    }
})();