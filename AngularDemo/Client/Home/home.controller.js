(function () {
    'use strict';

    angular
        .module('home.module')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'messageService','$rootScope'];

    function HomeController($location, messageService, $rootScope) {
        /* jshint validthis:true */
        var seft = this;
        seft.text = "";
        seft.updateMessage = updateMessage;
        seft.getMessageHub = getMessageHub;
        activate();
        getMessageHub();
        function activate() {
            messageService.connectHub();
        }
        function getMessageHub() {
            messageService.getMessageHub();
        }
        function updateMessage(text) {
            seft.text = text;
        }
        $rootScope.$on("getMessageHub", function (e, message) {
            seft.$apply(function () {
                updateMessage(message);
            });
        });
    }
})();
