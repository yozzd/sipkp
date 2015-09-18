'use strict';

angular.module('sipkpApp')
    .controller('AdminPrbtCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        Restangular.all('users').customGETLIST().then(function (datas) {
            var temp = [];
            _.each(datas, function (value) {
                temp.push(value.kabkota);
            });
            $scope.kabkotas = _.sortBy(temp);
        });
        $scope.kabkota = {};

        $scope.tanggal = Date.now();

        $scope.komoditas = ['Sapi', 'Kerbau', 'Kambing', 'Domba', 'Ayam Broiler', 'Ayam Buras', 'Itik', 'Telur Ayam Ras', 'Telur Ayam Buras', 'Telur Itik', 'Susu'];
        $scope.komoditi = {
            selected: 'Sapi'
        };

        function prMonth(arrRange, arrData, tanggal, kabkota) {
            var temp = {
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
            };
            _.each(arrRange, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val.toString() && value.kabkota === kabkota.toString();
                });
                temp.sapi.push(_.isUndefined(filter[0]) ? 0 : filter[0].sapi);
                temp.kerbau.push(_.isUndefined(filter[0]) ? 0 : filter[0].kerbau);
                temp.kambing.push(_.isUndefined(filter[0]) ? 0 : filter[0].kambing);
                temp.domba.push(_.isUndefined(filter[0]) ? 0 : filter[0].domba);
                temp.ayambroiler.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayambroiler);
                temp.ayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].ayamburas);
                temp.itik.push(_.isUndefined(filter[0]) ? 0 : filter[0].itik);
                temp.telurayamras.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamras);
                temp.telurayamburas.push(_.isUndefined(filter[0]) ? 0 : filter[0].telurayamburas);
                temp.teluritik.push(_.isUndefined(filter[0]) ? 0 : filter[0].teluritik);
                temp.susu.push(_.isUndefined(filter[0]) ? 0 : filter[0].susu);
            });
            if (_.compact(temp.sapi).length < 1 && _.compact(temp.kerbau).length < 1 && _.compact(temp.kambing).length < 1 && _.compact(temp.domba).length < 1 && _.compact(temp.ayambroiler).length < 1 && _.compact(temp.ayamburas).length < 1 && _.compact(temp.itik).length < 1 && _.compact(temp.telurayamras).length < 1 && _.compact(temp.telurayamburas).length < 1 && _.compact(temp.teluritik).length < 1 && _.compact(temp.susu).length < 1) {
                return null;
            } else {
                return temp;
            }
        }

        function graph(arrMonth, arrData, tanggal, kabkota, komoditi) {
            var str = _.camelCase(komoditi).toLowerCase();
            var temp = [];
            _.each(arrMonth, function (val) {
                var filter = _.filter(arrData, function (value) {
                    return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val.toString() && value.kabkota === kabkota.toString();
                });
                temp.push(_.isUndefined(filter[0]) || filter[0][str] === 0 ? null : filter[0][str]);
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

        function getProdusen(tanggal, kabkota, komoditi) {
            blockUI.start();
            var endDate = moment(new Date(tanggal)).endOf('month').format('D');
            var range = _.range(1, _.parseInt(endDate) + 1);
            Restangular.all('produsens').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.range = range;
                    $scope.prb = _.map(prMonth(range, datas, tanggal, kabkota));
                    $scope.nodata = $scope.prb.length < 1;
                    $scope.prblabels = range;
                    $scope.prbseries = [komoditi];
                    $scope.prbdata = [graph(range, datas, tanggal, kabkota, komoditi)];

                    socket.syncUpdates('produsen', datas, function (event, item, array) {
                        $scope.range = range;
                        $scope.prb = _.map(prMonth(range, array, tanggal, kabkota));
                        $scope.prblabels = range;
                        $scope.prbseries = [komoditi];
                        $scope.prbdata = [graph(range, array, tanggal, kabkota, komoditi)];
                    });
                    blockUI.stop();
                }, 1000);
            });
        }

        $scope.get = function (tanggal, kabkota, komoditi) {
            getProdusen(tanggal, kabkota, komoditi);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('produsen');
        });
    });