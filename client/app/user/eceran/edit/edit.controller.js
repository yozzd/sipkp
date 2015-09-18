'use strict';

angular.module('sipkpApp')
    .controller('UserEceranEditCtrl', function ($scope, Restangular, socket, $stateParams, $alert) {

        function getEceran() {
            Restangular.one('ecerans').customGET($stateParams.id).then(function (data) {
                $scope.data = data;
                $scope.data.tanggal = new Date(data.receiveddate);

                socket.syncUpdates('eceran', [$scope.data], function (event, item, array) {
                    $scope.data = item;
                    $scope.data.tanggal = new Date(item.receiveddate);
                });
            });
        }
        getEceran();

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.one('ecerans').customPUT($scope.data, $stateParams.id).then(function () {
                    $alert({
                        content: 'Data berhasil diupdate',
                        placement: 'top-right',
                        type: 'info',
                        duration: 5
                    });
                });
            }
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('eceran');
        });

    });