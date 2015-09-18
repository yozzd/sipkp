'use strict';

angular.module('sipkpApp')
    .controller('AsideCtrl', function ($scope, Auth) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isUser = Auth.isUser;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.adminmenu = [{
            label: 'Admin',
            icon: 'ion ion-ios-home ion-w',
            state: 'admin'
        }, {
            label: 'Create User',
            icon: 'ion ion-person-add ion-w',
            state: 'admin.create'
        }, {
            label: 'Daftar User',
            icon: 'ion ion-clipboard ion-w',
            state: 'admin.daftar'
        }, {
            label: 'Laporan Bulanan Per Kabupaten / Kota',
            icon: 'ion ion-clipboard ion-w',
            state: 'admin.prbt'
        }, {
            label: 'Laporan Bulanan Per Komoditas',
            icon: 'ion ion-clipboard ion-w',
            state: 'admin.prbk'
        }, {
            label: 'Laporan Evaluasi Bulanan',
            icon: 'ion ion-clipboard ion-w',
            state: 'admin.evaluasi'
        }, {
            label: 'SMS Sender',
            icon: 'ion ion-android-textsms ion-w',
            state: 'admin.sender'
        }, {
            label: 'Ubah Password',
            icon: 'ion ion-lock-combination ion-w',
            state: 'settings'
        }];

        $scope.usermenu = [{
            label: $scope.getCurrentUser().name,
            icon: 'ion ion-ios-home ion-w',
            state: 'user'
        }, {
            label: 'Input Harga Harian Produsen',
            icon: 'ion ion-android-create ion-w',
            state: 'user.prcreate'
        }, {
            label: 'Input Harga Harian Grosir',
            icon: 'ion ion-android-create ion-w',
            state: 'user.grcreate'
        }, {
            label: 'Input Harga Harian Eceran',
            icon: 'ion ion-android-create ion-w',
            state: 'user.eccreate'
        }, {
            label: 'Laporan Harian',
            icon: 'ion ion-clipboard ion-w',
            state: 'user.prh'
        }, {
            label: 'Laporan Mingguan',
            icon: 'ion ion-clipboard ion-w',
            state: 'user.prm'
        }, {
            label: 'Laporan Bulanan',
            icon: 'ion ion-clipboard ion-w',
            state: 'user.prb'
        }, {
            label: 'Ubah Password',
            icon: 'ion ion-lock-combination ion-w',
            state: 'settings'
        }];

    });