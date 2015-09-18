'use strict';

angular.module('sipkpApp')
    .controller('AdminSenderCtrl', function ($scope, Restangular, $alert) {

        function getUsers() {
            Restangular.all('users').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        }
        getUsers();

        $scope.user = {
            telp: []
        };


        $scope.checkAll = function () {
            if ($scope.check == true) {
                $scope.user.telp = _.map($scope.datas, function (n) {
                    return n.telp;
                })
            } else {
                $scope.user.telp = [];
            }
        };

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                if ($scope.user.telp.length < 1) {
                    $alert({
                        title: 'Error!',
                        content: 'Pilih User yang akan dikirimkan SMS',
                        placement: 'top-right',
                        type: 'danger',
                        duration: 5
                    });
                } else {
                    Restangular.all('outboxs').customPOST({
                            telp: $scope.user.telp,
                            sms: $scope.data.sms
                        }).then(function () {
                            $alert({
                                content: 'SMS berhasil dikirim',
                                placement: 'top-right',
                                type: 'info',
                                duration: 5
                            });
                        })
                        .catch(function (err) {
                            $alert({
                                title: 'Error!',
                                content: err.data.message,
                                placement: 'top-right',
                                type: 'danger',
                                duration: 5
                            });
                        });
                }
            }
        };

    });