'use strict';

angular.module('sipkpApp')
    .directive('header', function () {
        return {
            templateUrl: 'components/header/header.html',
            restrict: 'E'
        };
    });