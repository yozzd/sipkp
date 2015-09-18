'use strict';

angular.module('sipkpApp')
    .controller('UserEceranHarianCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        $scope.tanggal = Date.now();

        function getEceran(tanggal) {
            blockUI.start();
            Restangular.all('ecerans').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.ecdatas = _.filter(datas, function (value) {
                        return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD') && value.kabkota === $scope.getCurrentUser().kabkota;
                    });
                    $scope.ecnodata = $scope.ecdatas.length < 1;

                    socket.syncUpdates('eceran', $scope.ecdatas, function (event, item, array) {
                        $scope.ecdatas = _.filter(datas, function (value) {
                            return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD') && value.kabkota === $scope.getCurrentUser().kabkota;
                        });
                        if (array.length < 1) {
                            $scope.ecnodata = true;
                        } else {
                            $scope.ecnodata = false;
                        }
                    });
                    blockUI.stop();
                }, 1000);
            });
        }
        getEceran($scope.tanggal);

        $scope.get = function (tanggal) {
            getEceran(tanggal);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('eceran');
        });
    });