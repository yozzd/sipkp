'use strict';

angular.module('sipkpApp')
    .controller('UserBerandaCtrl', function ($scope, Auth) {

        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.menus = [{
            label: $scope.getCurrentUser().name,
            icon: 'ion ion-ios-home ion-48',
            state: 'user'
        }, {
            label: 'Input Harga Harian Produsen',
            icon: 'ion ion-android-create ion-48',
            state: 'user.prcreate'
        }, {
            label: 'Input Harga Harian Grosir',
            icon: 'ion ion-android-create ion-48',
            state: 'user.grcreate'
        }, {
            label: 'Input Harga Harian Eceran',
            icon: 'ion ion-android-create ion-48',
            state: 'user.eccreate'
        }, {
            label: 'Laporan Harian',
            icon: 'ion ion-clipboard ion-48',
            state: 'user.prh'
        }, {
            label: 'Laporan Mingguan',
            icon: 'ion ion-clipboard ion-48',
            state: 'user.prm'
        }, {
            label: 'Laporan Bulanan',
            icon: 'ion ion-clipboard ion-48',
            state: 'user.prb'
        }, {
            label: 'Ubah Password',
            icon: 'ion ion-lock-combination ion-48',
            state: 'settings'
        }];

    });