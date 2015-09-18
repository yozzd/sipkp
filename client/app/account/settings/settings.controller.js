'use strict';

angular.module('sipkpApp')
    .controller('SettingsCtrl', function ($scope, User, Auth) {
        $scope.errors = {};

        $scope.changePassword = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Auth.changePassword($scope.user.oldPassword, $scope.user.newPassword)
                    .then(function () {
                        $scope.message = 'Password berhasil diubah! Silahkan "Logout" dan "Login" kembali dengan password baru Anda';
                    })
                    .catch(function () {
                        form.password.$setValidity('mongoose', false);
                        $scope.errors.other = 'Password salah';
                        $scope.message = '';
                    });
            }
        };
    });