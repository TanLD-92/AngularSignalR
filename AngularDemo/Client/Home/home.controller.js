(function () {
    'use strict';

    angular
        .module('home.module')
        .controller('HomeController', HomeController);

    HomeController.$inject = ['$location', 'messageService', '$rootScope', '$scope'];

    function HomeController($location, messageService, $rootScope, $scope) {
        /* jshint validthis:true */
        var seft = this;
        seft.text = "";
        seft.updateMessage = updateMessage;
        activate();
        function activate() {
            messageService.connectHub();
        }
        function updateMessage(text) {
            seft.text = text;
        }
        $rootScope.$on("getMessageHub", function (e, message) {
            $scope.$apply(function () {
                updateMessage(message);
            });
        });
        $rootScope.$on("doneConnectServer", function () {
            messageService.getMessage();
        });
    }
})();
