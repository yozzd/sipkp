'use strict';

angular.module('sipkpApp')
    .directive('footer', function () {
        return {
            templateUrl: 'components/footer/footer.html',
            restrict: 'E',
            controller: 'FooterCtrl'
        };
    });
