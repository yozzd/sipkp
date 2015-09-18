'use strict';

angular.module('sipkpApp')
    .controller('AdminEcbtCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        Restangular.all('users').customGETLIST().then(function (datas) {
            var temp = [];
            _.each(datas, function (value) {
                temp.push(value.kabkota);
            });
            $scope.kabkotas = _.sortBy(temp);
        });
        $scope.kabkota = {};

        $scope.tanggal = Date.now();

        $scope.komoditas = ['Daging Sapi Has Dalam', 'Daging Sapi Bistik', 'Daging Sapi Murni', 'Daging Kerbau', 'Daging Kambing', 'Daging Domba', 'Karkas Ayam Broiler', 'Karkas Ayam Buras', 'DOC Broiler', 'DOC Layer', 'Telur Ayam Ras', 'Telur Ayam Buras', 'Telur Itik', 'Susu', 'Pakan Ternak Broiler', 'Pakan Ternak Konsentrat Layer'];
        $scope.komoditi = {
            selected: 'Daging Sapi Has Dalam'
        };

        function ecMonth(arrRange, arrData, tanggal, kabkota) {
            var temp = {
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
            };
            _.each(arrRange, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val.toString() && value.kabkota === kabkota.toString();
                });
                temp.sapihasdalam.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapihasdalam);
                temp.sapibistik.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapibistik);
                temp.sapimurni.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapimurni);
                temp.kerbau.push(_.isUndefined(filter[0]) ? 0 : filter[0].kerbau);
                temp.kambing.push(_.isUndefined(filter[0]) ? 0 : filter[0].kambing);
                temp.domba.push(_.isUndefined(filter[0]) ? 0 : filter[0].domba);
                temp.ayambroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayambroiler);
                temp.ayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayamburas);
                temp.docbroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].docbroiler);
                temp.doclayer.push(_.isUndefined(filter[0]) ? 0 : filter[0].doclayer);
                temp.telurayamras.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamras);
                temp.telurayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamburas);
                temp.teluritik.push(_.isUndefined(filter[0]) ? 0 : filter[0].teluritik);
                temp.susu.push(_.isUndefined(filter[0]) ? 0 : filter[0].susu);
                temp.pakanbroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].pakanbroiler);
                temp.pakanlayer.push(_.isUndefined(filter[0]) ? 0 : filter[0].pakanlayer);
            });
            if (_.compact(temp.sapihasdalam).length < 1 && _.compact(temp.sapibistik).length < 1 && _.compact(temp.sapimurni).length < 1 && _.compact(temp.kerbau).length < 1 && _.compact(temp.kambing).length < 1 && _.compact(temp.domba).length < 1 && _.compact(temp.ayambroiler).length < 1 && _.compact(temp.ayamburas).length < 1 && _.compact(temp.docbroiler).length < 1 && _.compact(temp.doclayer).length < 1 && _.compact(temp.telurayamras).length < 1 && _.compact(temp.telurayamburas).length < 1 && _.compact(temp.teluritik).length < 1 && _.compact(temp.susu).length < 1 && _.compact(temp.pakanbroiler).length < 1 && _.compact(temp.pakanlayer).length < 1) {
                return null;
            } else {
                return temp;
            }
        }

        function graph(arrMonth, arrData, tanggal, kabkota, komoditi) {
            var str1 = _.startsWith(komoditi, 'Daging') ? _.camelCase(_.trim(komoditi.replace('Daging', ''))).toLowerCase() : _.camelCase(komoditi).toLowerCase();
            var str2 = _.startsWith(str1, 'karkas') ? _.camelCase(_.trim(str1.replace('karkas', ''))).toLowerCase() : _.camelCase(str1).toLowerCase();
            var temp = [];
            _.each(arrMonth, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val.toString() && value.kabkota === kabkota.toString();
                });
                temp.push(_.isUndefined(filter[0]) || filter[0][str2] === 0 ? null : filter[0][str2]);
            });
            return temp;
        }

        $scope.options = {
            bezierCurve: false,
            datasetFill: false,
            scaleLabel: '<%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            tooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%if (value==null){%><%=parseInt(0)%><%}%><%if (value!=null){%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%><%}%>'
        };

        function getEceran(tanggal, kabkota, komoditi) {
            blockUI.start();
            var endDate = moment(new Date(tanggal)).endOf('month').format('D');
            var range = _.range(1, _.parseInt(endDate) + 1);
            Restangular.all('ecerans').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.range = range;
                    $scope.ecb = _.map(ecMonth(range, datas, tanggal, kabkota));
                    $scope.nodata = $scope.ecb.length < 1;
                    $scope.ecblabels = range;
                    $scope.ecbseries = [komoditi];
                    $scope.ecbdata = [graph(range, datas, tanggal, kabkota, komoditi)];

                    socket.syncUpdates('eceran', datas, function (event, item, array) {
                        $scope.range = range;
                        $scope.ecb = _.map(ecMonth(range, array, tanggal, kabkota));
                        $scope.ecblabels = range;
                        $scope.ecbseries = [komoditi];
                        $scope.ecbdata = [graph(range, array, tanggal, kabkota, komoditi)];
                    });
                    blockUI.stop();
                }, 1000);
            });
        }

        $scope.get = function (tanggal, kabkota, komoditi) {
            getEceran(tanggal, kabkota, komoditi);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('eceran');
        });
    });