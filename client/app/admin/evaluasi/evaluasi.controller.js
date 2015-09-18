'use strict';

angular.module('sipkpApp')
    .controller('AdminEvaluasiCtrl', function ($scope, Restangular, blockUI, $timeout) {

        $scope.tanggal = Date.now();

        function getKabKota() {
            return Restangular.all('users').customGETLIST().then(function (user) {
                var temp = [];
                _.each(user, function (value) {
                    temp.push(value.kabkota);
                });
                return temp;
            });
        }

        function evaluasi(arrData, tanggal, end) {
            return getKabKota().then(function (kabkotas) {
                var temp = [];
                _.each(_.sortBy(kabkotas), function (kabkota) {
                    var filter = _.filter(arrData, function (value) {
                        return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && value.kabkota === kabkota.toString();
                    });
                    temp.push({
                        kabkota: filter[0].kabkota,
                        evaluasi: filter.length / _.parseInt(end) * 100
                    });
                });
                return temp;
            });
        }

        function getAll(tanggal) {
            blockUI.start();
            var endDate = moment(new Date(tanggal)).endOf('month').format('D');
            Restangular.all('produsens').customGETLIST()
                .then(function (datas) {
                    var filter = _.filter(datas, function (value) {
                        return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM');
                    });
                    if (filter.length > 0) {
                        $scope.nodata = false;
                        return evaluasi(datas, tanggal, endDate).then(function (produsen) {
                            return produsen;
                        });
                    } else {
                        $scope.nodata = true;
                        $scope.evaluasi = false;
                        throw new Error('Tidak ada data');
                    }
                })
                .then(function (produsen) {
                    return Restangular.all('grosirs').customGETLIST()
                        .then(function (datas) {
                            return evaluasi(datas, tanggal, endDate).then(function (grosir) {
                                return {
                                    produsen: produsen,
                                    grosir: grosir
                                };
                            });
                        });
                })
                .then(function (arr) {
                    return Restangular.all('ecerans').customGETLIST()
                        .then(function (datas) {
                            return evaluasi(datas, tanggal, endDate).then(function (eceran) {
                                return [arr.produsen, arr.grosir, eceran];
                            });
                        });
                })
                .then(function (arr) {
                    $timeout(function () {
                        var group = _.values(_.groupBy(_.flatten(arr), 'kabkota'));

                        $scope.evaluasi = [];
                        var t = [];
                        _.each(group, function (value1) {
                            var temp = {
                                evaluasi: []
                            };
                            var sum = 0;
                            _.each(value1, function (value2) {
                                _.set(temp, 'kabkota', value2.kabkota);
                                temp.evaluasi.push(value2.evaluasi);
                                _.set(temp, 'total', sum += value2.evaluasi);
                            });
                            $scope.evaluasi.push(temp);
                            t.push(temp);
                        });
                        _.map($scope.evaluasi, function (n) {
                            return _.set(n, 'total', n.total / 3);
                        });
                        $scope.predicate = 'kabkota';
                        blockUI.stop();
                    }, 1000);
                });
        }
        getAll($scope.tanggal);

        $scope.get = function (tanggal) {
            getAll(tanggal);
        };

    });