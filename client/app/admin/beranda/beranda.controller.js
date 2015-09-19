'use strict';

angular.module('sipkpApp')
    .controller('AdminBerandaCtrl', function ($scope) {

        $scope.menus = [{
            label: 'Admin',
            icon: 'ion ion-ios-home ion-48',
            state: 'admin'
        }, {
            label: 'Create User',
            icon: 'ion ion-person-add ion-48',
            state: 'admin.create'
        }, {
            label: 'Daftar User',
            icon: 'ion ion-clipboard ion-48',
            state: 'admin.daftar'
        }, {
            label: 'Laporan Bulanan Per Kabupaten / Kota',
            icon: 'ion ion-clipboard ion-48',
            state: 'admin.prbt'
        }, {
            label: 'Laporan Bulanan Per Komoditas',
            icon: 'ion ion-clipboard ion-48',
            state: 'admin.prbk'
        }, {
            label: 'Laporan Evaluasi Bulanan',
            icon: 'ion ion-clipboard ion-48',
            state: 'admin.evaluasi'
        }, {
            label: 'SMS Sender',
            icon: 'ion ion-android-textsms ion-48',
            state: 'admin.sender'
        }, {
            label: 'Ubah Password',
            icon: 'ion ion-lock-combination ion-48',
            state: 'settings'
        }];

    });