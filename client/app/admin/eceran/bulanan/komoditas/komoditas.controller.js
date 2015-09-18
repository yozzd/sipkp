'use strict';

angular.module('sipkpApp')
    .controller('AdminEcbkCtrl', function ($scope, Restangular, socket, blockUI, $timeout) {

        $scope.tanggal = Date.now();
        $scope.komoditas = ['Daging Sapi Has Dalam', 'Daging Sapi Bistik', 'Daging Sapi Murni', 'Daging Kerbau', 'Daging Kambing', 'Daging Domba', 'Karkas Ayam Broiler', 'Karkas Ayam Buras', 'DOC Broiler', 'DOC Layer', 'Telur Ayam Ras', 'Telur Ayam Buras', 'Telur Itik', 'Susu', 'Pakan Ternak Broiler', 'Pakan Ternak Konsentrat Layer'];
        $scope.komoditi = {};

        $scope.options = {
            bezierCurve: false,
            datasetFill: false,
            scaleLabel: '<%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            multiTooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%>',
            tooltipTemplate: '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%if (value==null){%><%=parseInt(0)%><%}%><%if (value!=null){%><%=parseInt(value).toLocaleString().replace(\',\',\'.\')%><%}%>'
        };

        function getKabKota() {
            return Restangular.all('users').customGETLIST().then(function (user) {
                var temp = [];
                _.each(user, function (value) {
                    temp.push(value.kabkota);
                });
                return temp;
            });
        }

        function ecmonth(arrRange, arrData, tanggal, komoditi) {
            var str1 = _.startsWith(komoditi, 'Daging') ? _.camelCase(_.trim(komoditi.replace('Daging', ''))).toLowerCase() : _.camelCase(komoditi).toLowerCase();
            var str2 = _.startsWith(str1, 'karkas') ? _.camelCase(_.trim(str1.replace('karkas', ''))).toLowerCase() : _.camelCase(str1).toLowerCase();
            return getKabKota().then(function (kabkotas) {
                var temp2 = [];
                _.each(_.sortBy(kabkotas), function (kabkota) {
                    var temp1 = {
                        komoditi: []
                    };
                    _.each(arrRange, function (val) {
                        var filter = _.filter(arrData, function (value) {
                            return moment(new Date(value.receiveddate)).format('YYYY-MM') === moment(new Date(tanggal)).format('YYYY-MM') && moment(new Date(value.receiveddate)).format('D') === val.toString() && value.kabkota === kabkota.toString();
                        });
                        _.set(temp1, 'kabkota', _.isUndefined(filter[0]) ? kabkota : kabkota);
                        temp1.komoditi.push(_.isUndefined(filter[0]) ? 0 : filter[0][str2]);
                    });
                    temp2.push(temp1);
                });
                return temp2;
            });
        }

        function chart(arrData) {
            var komoditas = [];
            _.each(arrData, function (value) {
                var map = _.map(value.komoditi, function (n) {
                    return n === 0 ? null : n;
                });
                komoditas.push(map);
            });
            return komoditas;
        }

        function getEceran(tanggal, komoditi) {
            blockUI.start();
            var endDate = moment(new Date(tanggal)).endOf('month').format('D');
            var range = _.range(1, _.parseInt(endDate) + 1);
            Restangular.all('ecerans').customGETLIST().then(function (datas) {
                $timeout(function () {
                    $scope.range = range;
                    ecmonth(range, datas, tanggal, komoditi).then(function (result) {
                        $scope.ecb = result;
                        $scope.labels = range;
                        getKabKota().then(function (kabkotas) {
                            $scope.series = _.sortBy(kabkotas);
                        });
                        $scope.data = chart(result);
                    });

                    socket.syncUpdates('eceran', datas, function (event, item, array) {
                        $scope.range = range;
                        ecmonth(range, array, tanggal, komoditi).then(function (result) {
                            $scope.ecb = result;
                            $scope.labels = range;
                            getKabKota().then(function (kabkotas) {
                                $scope.series = _.sortBy(kabkotas);
                            });
                            $scope.data = chart(result);
                        });
                    });
                    blockUI.stop();
                }, 1000);
            });
        }

        $scope.get = function (tanggal, komoditi) {
            getEceran(tanggal, komoditi);
        };

        $scope.$on('$destroy', function () {
            socket.unsyncUpdates('eceran');
        });
    });