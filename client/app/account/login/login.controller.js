'use strict';

angular.module('sipkpApp')
    .controller('LoginCtrl', function ($scope, Auth, $state) {
        $scope.user = {};
        $scope.errors = {};

        $scope.login = function (form) {
            $scope.submitted = true;

            if (form.$valid) {
                Auth.login({
                        email: $scope.user.email,
                        password: $scope.user.password
                    })
                    .then(function (data) {
                        $state.go(data.role);
                    })
                    .catch(function (err) {
                        $scope.errors.other = err.message;
                    });
            }
        };

    });