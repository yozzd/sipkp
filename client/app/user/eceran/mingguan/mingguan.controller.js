'use strict';

angular.module('sipkpApp')
    .controller('UserEceranMingguanCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        $scope.tanggal = Date.now();

        var m1 = ['1', '2', '3', '4', '5', '6', '7'];
        var m2 = ['8', '9', '10', '11', '12', '13', '14'];
        var m3 = ['15', '16', '17', '18', '19', '20', '21'];
        var m4 = ['22', '23', '24', '25', '26', '27', '28'];

        function grWeek(arrWeek, arrData, tanggal) {
            var temp = {
                komoditas: {
                    sapihasdalam: [],
                    sapibistik: [],
                    sapimurni: [],
                    kerbau: [],
                    kambing: [],
                    domba: [],
                    ayambroiler: [],
                    ayamburas: [],
                    docbroiler: [],
                    doclayer: [],
                    telurayamras: [],
                    telurayamburas: [],
                    teluritik: [],
                    susu: [],
                    pakanbroiler: [],
                    pakanlayer: []
                }
            };
            _.each(arrWeek, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val && value.kabkota === $scope.getCurrentUser().kabkota;
                });
                temp.komoditas.sapihasdalam.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapihasdalam);
                temp.komoditas.sapibistik.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapibistik);
                temp.komoditas.sapimurni.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapimurni);
                temp.komoditas.kerbau.push(_.isUndefined(filter[0]) ? 0 : filter[0].kerbau);
                temp.komoditas.kambing.push(_.isUndefined(filter[0]) ? 0 : filter[0].kambing);
                temp.komoditas.domba.push(_.isUndefined(filter[0]) ? 0 : filter[0].domba);
                temp.komoditas.ayambroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayambroiler);
                temp.komoditas.ayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayamburas);
                temp.komoditas.docbroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].docbroiler);
                temp.komoditas.doclayer.push(_.isUndefined(filter[0]) ? 0 : filter[0].doclayer);
                temp.komoditas.telurayamras.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamras);
                temp.komoditas.telurayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamburas);
                temp.komoditas.teluritik.push(_.isUndefined(filter[0]) ? 0 : filter[0].teluritik);
                temp.komoditas.susu.push(_.isUndefined(filter[0]) ? 0 : filter[0].susu);
                temp.komoditas.pakanbroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].pakanbroiler);
                temp.komoditas.pakanlayer.push(_.isUndefined(filter[0]) ? 0 : filter[0].pakanlayer);
            });
            _.map(temp, function (n) {
                return _.set(n, 'sapihasdalam', _.ceil(_.sum(n.sapihasdalam) / _.compact(n.sapihasdalam).length, -2)) && _.set(n, 'sapibistik', _.ceil(_.sum(n.sapibistik) / _.compact(n.sapibistik).length, -2)) && _.set(n, 'sapimurni', _.ceil(_.sum(n.sapimurni) / _.compact(n.sapimurni).length, -2)) && _.set(n, 'kerbau', _.ceil(_.sum(n.kerbau) / _.compact(n.kerbau).length, -2)) && _.set(n, 'kambing', _.ceil(_.sum(n.kambing) / _.compact(n.kambing).length, -2)) && _.set(n, 'domba', _.ceil(_.sum(n.domba) / _.compact(n.domba).length, -2)) && _.set(n, 'ayambroiler', _.ceil(_.sum(n.ayambroiler) / _.compact(n.ayambroiler).length, -2)) && _.set(n, 'ayamburas', _.ceil(_.sum(n.ayamburas) / _.compact(n.ayamburas).length, -2)) && _.set(n, 'docbroiler', _.ceil(_.sum(n.docbroiler) / _.compact(n.docbroiler).length, -2)) && _.set(n, 'doclayer', _.ceil(_.sum(n.doclayer) / _.compact(n.doclayer).length, -2)) && _.set(n, 'telurayamras', _.ceil(_.sum(n.telurayamras) / _.compact(n.telurayamras).length, -2)) && _.set(n, 'telurayamburas', _.ceil(_.sum(n.telurayamburas) / _.compact(n.telurayamburas).length, -2)) && _.set(n, 'teluritik', _.ceil(_.sum(n.teluritik) / _.compact(n.teluritik).length, -2)) && _.set(n, 'susu', _.ceil(_.sum(n.susu) / _.compact(n.susu).length, -2)) && _.set(n, 'pakanbroiler', _.ceil(_.sum(n.pakanbroiler) / _.compact(n.pakanbroiler).length, -2)) && _.set(n, 'pakanlayer', _.ceil(_.sum(n.pakanlayer) / _.compact(n.pakanlayer).length, -2));
            });
            if (_.isNaN(temp.komoditas.sapihasdalam) && _.isNaN(temp.komoditas.sapibistik) && _.isNaN(temp.komoditas.sapimurni) && _.isNaN(temp.komoditas.kerbau) && _.isNaN(temp.komoditas.kambing) && _.isNaN(temp.komoditas.domba) && _.isNaN(temp.komoditas.ayambroiler) && _.isNaN(temp.komoditas.ayamburas) && _.isNaN(temp.komoditas.docbroiler) && _.isNaN(temp.komoditas.doclayer) && _.isNaN(temp.komoditas.telurayamras) && _.isNaN(temp.komoditas.telurayamburas) && _.isNaN(temp.komoditas.teluritik) && _.isNaN(temp.komoditas.susu) && _.isNaN(temp.komoditas.pakanbroiler) && _.isNaN(temp.komoditas.pakanlayer)) {
                return false;
            } else {
                return temp;
            }
        }

        function graph(arrWeek, arrData, tanggal, komoditi) {
            var str1 = _.startsWith(komoditi, 'Daging') ? _.camelCase(_.trim(komoditi.replace('Daging', ''))).toLowerCase() : _.camelCase(komoditi).toLowerCase();
            var str2 = _.startsWith(str1, 'karkas') ? _.camelCase(_.trim(str1.replace('karkas', ''))).toLowerCase() : _.camelCase(str1).toLowerCase();
            var temp = [];
            _.each(arrWeek, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val && value.kabkota === $scope.getCurrentUser().kabkota;
                });
                temp.push(_.isUndefined(filter[0]) || filter[0][str2] === 0 ? null : filter[0][str2]);
            });
            return temp;
        }

        function check(arr) {
            _.map(arr, function (n) {
                return _.set(n, 'sapihasdalam', _.isNaN(n.sapihasdalam) ? 0 : n.sapihasdalam) && _.set(n, 'sapibistik', _.isNaN(n.sapibistik) ? 0 : n.sapibistik) && _.set(n, 'sapimurni', _.isNaN(n.sapimurni) ? 0 : n.sapimurni) && _.set(n, 'kerbau', _.isNaN(n.kerbau) ? 0 : n.kerbau) && _.set(n, 'kambing', _.isNaN(n.kambing) ? 0 : n.kambing) && _.set(n, 'domba', _.isNaN(n.domba) ? 0 : n.domba) && _.set(n, 'ayambroiler', _.isNaN(n.ayambroiler) ? 0 : n.ayambroiler) && _.set(n, 'ayamburas', _.isNaN(n.ayamburas) ? 0 : n.ayamburas) && _.set(n, 'docbroiler', _.isNaN(n.docbroiler) ? 0 : n.docbroiler) && _.set(n, 'doclayer', _.isNaN(n.doclayer) ? 0 : n.doclayer) && _.set(n, 'telurayamras', _.isNaN(n.telurayamras) ? 0 : n.telurayamras) && _.set(n, 'telurayamburas', _.isNaN(n.telurayamburas) ? 0 : n.telurayamburas) && _.set(n, 'teluritik', _.isNaN(n.teluritik) ? 0 : n.teluritik) && _.set(n, 'susu', _.isNaN(n.susu) ? 0 : n.susu) && _.set(n, 'pakanbroiler', _.isNaN(n.pakanbroiler) ? 0 : n.pakanbroiler) && _.set(n, 'pakanlayer', _.isNaN(n.pakanlayer) ? 0 : n.pakanlayer);
            });
        }

        $scope.options = {
            bezierCurve: false,
            datasetFill: false,
            scaleLabel: '<%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            tooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%if (value==null){%><%=parseInt(0)%><%}%><%if (value!=null){%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%><%}%>'
        };

        $scope.komoditas = ['Daging Sapi Has Dalam', 'Daging Sapi Bistik', 'Daging Sapi Murni', 'Daging Kerbau', 'Daging Kambing', 'Daging Domba', 'Karkas Ayam Broiler', 'Karkas Ayam Buras', 'DOC Broiler', 'DOC Layer', 'Telur Ayam Ras', 'Telur Ayam Buras', 'Telur Itik', 'Susu', 'Pakan Ternak Broiler', 'Pakan Ternak Konsentrat Layer'];
        $scope.komoditi = {
            selected: 'Daging Sapi Has Dalam'
        };

        function getEceran(tanggal, komoditi) {
            blockUI.start();
            Restangular.all('ecerans').customGETLIST()
                .then(function (datas) {
                    $scope.ecm1 = grWeek(m1, datas, tanggal);
                    $scope.ecm1labels = m1;
                    $scope.ecm1series = [komoditi];
                    $scope.ecm1data = [graph(m1, datas, tanggal, komoditi)];
                    check($scope.ecm1);

                    return datas;
                })
                .then(function (datas) {
                    $scope.ecm2 = grWeek(m2, datas, tanggal);
                    $scope.ecm2labels = m2;
                    $scope.ecm2series = [komoditi];
                    $scope.ecm2data = [graph(m2, datas, tanggal, komoditi)];
                    check($scope.ecm2);

                    return datas;
                })
                .then(function (datas) {
                    $scope.ecm3 = grWeek(m3, datas, tanggal);
                    $scope.ecm3labels = m3;
                    $scope.ecm3series = [komoditi];
                    $scope.ecm3data = [graph(m3, datas, tanggal, komoditi)];
                    check($scope.ecm3);

                    return datas;
                })
                .then(function (datas) {
                    $timeout(function () {
                        $scope.ecm4 = grWeek(m4, datas, tanggal);
                        $scope.ecm4labels = m4;
                        $scope.ecm4series = [komoditi];
                        $scope.ecm4data = [graph(m4, datas, tanggal, komoditi)];
                        check($scope.ecm4);

                        socket.syncUpdates('eceran', datas, function (event, item, array) {
                            $scope.ecm1 = grWeek(m1, array, tanggal);
                            $scope.ecm2 = grWeek(m2, array, tanggal);
                            $scope.ecm3 = grWeek(m3, array, tanggal);
                            $scope.ecm4 = grWeek(m4, array, tanggal);
                        });
                        blockUI.stop();
                    }, 1000);
                });
        }
        getEceran($scope.tanggal, $scope.komoditi.selected);

        $scope.get = function (tanggal, komoditi) {
            getEceran(tanggal, komoditi);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('eceran');
        });
    });