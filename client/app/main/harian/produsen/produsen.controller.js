'use strict';

angular.module('sipkpApp')
    .controller('MainHarianProdusenCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        $scope.tanggal = Date.now();

        function getProdusen(tanggal) {
            blockUI.start();
            Restangular.all('produsens').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.prdatas = _.filter(datas, function (value) {
                        return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD');
                    });
                    $scope.prnodata = $scope.prdatas.length < 1;

                    socket.syncUpdates('produsen', $scope.prdatas, function (event, item, array) {
                        $scope.prdatas = _.filter(array, function (value) {
                            return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD');
                        });
                        if (array.length < 1) {
                            $scope.prnodata = true;
                        } else {
                            $scope.prnodata = false;
                        }
                    });
                    blockUI.stop();
                }, 1000);
            });
        }
        getProdusen($scope.tanggal);

        $scope.get = function (tanggal) {
            getProdusen(tanggal);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('produsen');
        });

    });