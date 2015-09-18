'use strict';

angular.module('sipkpApp')
    .directive('submenu', function () {
        return {
            templateUrl: 'components/submenu/submenu.html',
            restrict: 'E',
            controller: 'SubmenuCtrl'
        };
    });