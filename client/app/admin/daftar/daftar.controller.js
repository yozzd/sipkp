'use strict';

angular.module('sipkpApp')
    .controller('AdminDaftarCtrl', function ($scope, Restangular) {

        function getUsers() {
            Restangular.all('users').customGETLIST().then(function (datas) {
                $scope.datas = datas;
            });
        }
        getUsers();

        $scope.searchbys = ['Username', 'Kabupaten / Kota', 'No. Telp.'];
        $scope.searchby = {
            selected: 'Username'
        };

        $scope.predicate = 'kabkota';

    });