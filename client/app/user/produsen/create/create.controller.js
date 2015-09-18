'use strict';

angular.module('sipkpApp')
    .controller('UserProdusenCreateCtrl', function ($scope, Restangular, $alert) {

        $scope.data = {};
        $scope.data.tanggal = Date.now();
        $scope.data.sapi = 0;
        $scope.data.kerbau = 0;
        $scope.data.kambing = 0;
        $scope.data.domba = 0;
        $scope.data.ayambroiler = 0;
        $scope.data.ayamburas = 0;
        $scope.data.itik = 0;
        $scope.data.telurayamras = 0;
        $scope.data.telurayamburas = 0;
        $scope.data.teluritik = 0;
        $scope.data.susu = 0;

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('produsens').customPOST({
                        tanggal: $scope.data.tanggal,
                        sender: $scope.getCurrentUser().telp,
                        kabkota: $scope.getCurrentUser().kabkota,
                        sapi: $scope.data.sapi,
                        kerbau: $scope.data.kerbau,
                        kambing: $scope.data.kambing,
                        domba: $scope.data.domba,
                        ayambroiler: $scope.data.ayambroiler,
                        ayamburas: $scope.data.ayamburas,
                        itik: $scope.data.itik,
                        telurayamras: $scope.data.telurayamras,
                        telurayamburas: $scope.data.telurayamburas,
                        teluritik: $scope.data.teluritik,
                        susu: $scope.data.susu
                    }).then(function () {
                        $alert({
                            content: 'Data berhasil disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    })
                    .catch(function (err) {
                        $alert({
                            title: 'Error!',
                            content: err.data,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    });
            }
        };

    });