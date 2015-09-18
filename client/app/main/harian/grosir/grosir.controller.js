'use strict';

angular.module('sipkpApp')
    .controller('MainHarianGrosirCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {
        $scope.tanggal = Date.now();

        function getGrosir(tanggal) {
            blockUI.start();
            Restangular.all('grosirs').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.grdatas = _.filter(datas, function (value) {
                        return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD');
                    });
                    $scope.grnodata = $scope.grdatas.length < 1;

                    socket.syncUpdates('grosir', $scope.grdatas, function (event, item, array) {
                        $scope.grdatas = _.filter(array, function (value) {
                            return moment(new Date(value.receiveddate)).format('YYYY-MM-DD') === moment(new Date(tanggal)).format('YYYY-MM-DD');
                        });
                        if (array.length < 1) {
                            $scope.grnodata = true;
                        } else {
                            $scope.grnodata = false;
                        }
                    });
                    blockUI.stop();
                }, 1000);
            });
        }
        getGrosir($scope.tanggal);

        $scope.get = function (tanggal) {
            getGrosir(tanggal);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('grosir');
        });

    });