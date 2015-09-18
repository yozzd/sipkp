'use strict';

angular.module('sipkpApp')
    .controller('NavbarCtrl', function ($scope, Auth) {
        $scope.menu = [{
            'title': 'Beranda',
            'state': 'main'
        }];

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isUser = Auth.isUser;
        $scope.getCurrentUser = Auth.getCurrentUser;

    });