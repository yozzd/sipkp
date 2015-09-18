'use strict';

angular.module('sipkpApp')
    .controller('UserProdusenMingguanCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        $scope.tanggal = Date.now();

        var m1 = ['1', '2', '3', '4', '5', '6', '7'];
        var m2 = ['8', '9', '10', '11', '12', '13', '14'];
        var m3 = ['15', '16', '17', '18', '19', '20', '21'];
        var m4 = ['22', '23', '24', '25', '26', '27', '28'];

        function prWeek(arrWeek, arrData, tanggal) {
            var temp = {
                komoditas: {
                    sapi: [],
                    kerbau: [],
                    kambing: [],
                    domba: [],
                    ayambroiler: [],
                    ayamburas: [],
                    itik: [],
                    telurayamras: [],
                    telurayamburas: [],
                    teluritik: [],
                    susu: []
                }
            };
            _.each(arrWeek, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val && value.kabkota === $scope.getCurrentUser().kabkota;
                });
                temp.komoditas.sapi.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapi);
                temp.komoditas.kerbau.push(_.isUndefined(filter[0]) ? 0 : filter[0].kerbau);
                temp.komoditas.kambing.push(_.isUndefined(filter[0]) ? 0 : filter[0].kambing);
                temp.komoditas.domba.push(_.isUndefined(filter[0]) ? 0 : filter[0].domba);
                temp.komoditas.ayambroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayambroiler);
                temp.komoditas.ayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayamburas);
                temp.komoditas.itik.push(_.isUndefined(filter[0]) ? 0 : filter[0].itik);
                temp.komoditas.telurayamras.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamras);
                temp.komoditas.telurayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamburas);
                temp.komoditas.teluritik.push(_.isUndefined(filter[0]) ? 0 : filter[0].teluritik);
                temp.komoditas.susu.push(_.isUndefined(filter[0]) ? 0 : filter[0].susu);
            });
            _.map(temp, function (n) {
                return _.set(n, 'sapi', _.ceil(_.sum(n.sapi) / _.compact(n.sapi).length, -2)) && _.set(n, 'kerbau', _.ceil(_.sum(n.kerbau) / _.compact(n.kerbau).length, -2)) && _.set(n, 'kambing', _.ceil(_.sum(n.kambing) / _.compact(n.kambing).length, -2)) && _.set(n, 'domba', _.ceil(_.sum(n.domba) / _.compact(n.domba).length, -2)) && _.set(n, 'ayambroiler', _.ceil(_.sum(n.ayambroiler) / _.compact(n.ayambroiler).length, -2)) && _.set(n, 'ayamburas', _.ceil(_.sum(n.ayamburas) / _.compact(n.ayamburas).length, -2)) && _.set(n, 'itik', _.ceil(_.sum(n.itik) / _.compact(n.itik).length, -2)) && _.set(n, 'telurayamras', _.ceil(_.sum(n.telurayamras) / _.compact(n.telurayamras).length, -2)) && _.set(n, 'telurayamburas', _.ceil(_.sum(n.telurayamburas) / _.compact(n.telurayamburas).length, -2)) && _.set(n, 'teluritik', _.ceil(_.sum(n.teluritik) / _.compact(n.teluritik).length, -2)) && _.set(n, 'susu', _.ceil(_.sum(n.susu) / _.compact(n.susu).length, -2));
            });
            if (_.isNaN(temp.komoditas.sapi) && _.isNaN(temp.komoditas.kerbau) && _.isNaN(temp.komoditas.kambing) && _.isNaN(temp.komoditas.domba) && _.isNaN(temp.komoditas.ayambroiler) && _.isNaN(temp.komoditas.ayamburas) && _.isNaN(temp.komoditas.itik) && _.isNaN(temp.komoditas.telurayamras) && _.isNaN(temp.komoditas.telurayamburas) && _.isNaN(temp.komoditas.teluritik) && _.isNaN(temp.komoditas.susu)) {
                return false;
            } else {
                return temp;
            }
        }

        function graph(arrWeek, arrData, tanggal, komoditi) {
            var str = _.camelCase(komoditi).toLowerCase();
            var temp = [];
            _.each(arrWeek, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val && value.kabkota === $scope.getCurrentUser().kabkota;
                });
                temp.push(_.isUndefined(filter[0]) || filter[0][str] === 0 ? null : filter[0][str]);
            });
            return temp;
        }

        function check(arr) {
            _.map(arr, function (n) {
                return _.set(n, 'sapi', _.isNaN(n.sapi) ? 0 : n.sapi) && _.set(n, 'kerbau', _.isNaN(n.kerbau) ? 0 : n.kerbau) && _.set(n, 'kambing', _.isNaN(n.kambing) ? 0 : n.kambing) && _.set(n, 'domba', _.isNaN(n.domba) ? 0 : n.domba) && _.set(n, 'ayambroiler', _.isNaN(n.ayambroiler) ? 0 : n.ayambroiler) && _.set(n, 'ayamburas', _.isNaN(n.ayamburas) ? 0 : n.ayamburas) && _.set(n, 'itik', _.isNaN(n.itik) ? 0 : n.itik) && _.set(n, 'telurayamras', _.isNaN(n.telurayamras) ? 0 : n.telurayamras) && _.set(n, 'telurayamburas', _.isNaN(n.telurayamburas) ? 0 : n.telurayamburas) && _.set(n, 'teluritik', _.isNaN(n.teluritik) ? 0 : n.teluritik) && _.set(n, 'susu', _.isNaN(n.susu) ? 0 : n.susu);
            });
        }

        $scope.options = {
            bezierCurve: false,
            datasetFill: false,
            scaleLabel: '<%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            tooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%if (value==null){%><%=parseInt(0)%><%}%><%if (value!=null){%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%><%}%>'
        };

        $scope.komoditas = ['Sapi', 'Kerbau', 'Kambing', 'Domba', 'Ayam Broiler', 'Ayam Buras', 'Itik', 'Telur Ayam Ras', 'Telur Ayam Buras', 'Telur Itik', 'Susu'];
        $scope.komoditi = {
            selected: 'Sapi'
        };

        function getProdusen(tanggal, komoditi) {
            blockUI.start();
            Restangular.all('produsens').customGETLIST()
                .then(function (datas) {
                    $scope.prm1 = prWeek(m1, datas, tanggal);
                    $scope.prm1labels = m1;
                    $scope.prm1series = [komoditi];
                    $scope.prm1data = [graph(m1, datas, tanggal, komoditi)];
                    check($scope.prm1);

                    return datas;
                })
                .then(function (datas) {
                    $scope.prm2 = prWeek(m2, datas, tanggal);
                    $scope.prm2labels = m2;
                    $scope.prm2series = [komoditi];
                    $scope.prm2data = [graph(m2, datas, tanggal, komoditi)];
                    check($scope.prm2);

                    return datas;
                })
                .then(function (datas) {
                    $scope.prm3 = prWeek(m3, datas, tanggal);
                    $scope.prm3labels = m3;
                    $scope.prm3series = [komoditi];
                    $scope.prm3data = [graph(m3, datas, tanggal, komoditi)];
                    check($scope.prm3);

                    return datas;
                })
                .then(function (datas) {
                    $timeout(function () {
                        $scope.prm4 = prWeek(m4, datas, tanggal);
                        $scope.prm4labels = m4;
                        $scope.prm4series = [komoditi];
                        $scope.prm4data = [graph(m4, datas, tanggal, komoditi)];
                        check($scope.prm4);

                        socket.syncUpdates('produsen', datas, function (event, item, array) {
                            $scope.prm1 = prWeek(m1, array, tanggal);
                            $scope.prm2 = prWeek(m2, array, tanggal);
                            $scope.prm3 = prWeek(m3, array, tanggal);
                            $scope.prm4 = prWeek(m4, array, tanggal);
                        });
                        blockUI.stop();
                    }, 1000);
                });
        }
        getProdusen($scope.tanggal, $scope.komoditi.selected);

        $scope.get = function (tanggal, komoditi) {
            getProdusen(tanggal, komoditi);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('produsen');
        });
    });