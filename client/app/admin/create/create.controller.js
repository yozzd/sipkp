'use strict';

angular.module('sipkpApp')
    .controller('AdminCreateCtrl', function ($scope, Restangular, $alert) {

        $scope.kabkotas = [{
            email: 'asahan',
            name: 'Asahan',
            fullname: 'Kabupaten Asahan'
        }, {
            email: 'batubara',
            name: 'Batubara',
            fullname: 'Kabupaten Batubara'
        }, {
            email: 'dairi',
            name: 'Dairi',
            fullname: 'Kabupaten Dairi'
        }, {
            email: 'deliserdang',
            name: 'Deli Serdang',
            fullname: 'Kabupaten Deli Serdang'
        }, {
            email: 'humbanghasundutan',
            name: 'Humbang Hasundutan',
            fullname: 'Kabupaten Humbang Hasundutan'
        }, {
            email: 'karo',
            name: 'Karo',
            fullname: 'Kabupaten Karo'
        }, {
            email: 'labuhanbatu',
            name: 'Labuhanbatu',
            fullname: 'Kabupaten Labuhanbatu'
        }, {
            email: 'labuhanbatuselatan',
            name: 'Labuhanbatu Selatan',
            fullname: 'Kabupaten Labuhanbatu Selatan'
        }, {
            email: 'labuhanbatuutara',
            name: 'Labuhanbatu Utara',
            fullname: 'Kabupaten Labuhanbatu Utara'
        }, {
            email: 'langkat',
            name: 'Langkat',
            fullname: 'Kabupaten Langkat'
        }, {
            email: 'mandailingnatal',
            name: 'Mandailing Natal',
            fullname: 'Kabupaten Mandailing Natal'
        }, {
            email: 'nias',
            name: 'Nias',
            fullname: 'Kabupaten Nias'
        }, {
            email: 'niasbarat',
            name: 'Nias Barat',
            fullname: 'Kabupaten Nias Barat'
        }, {
            email: 'niasselatan',
            name: 'Nias Selatan',
            fullname: 'Kabupaten Nias Selatan'
        }, {
            email: 'niasutara',
            name: 'Nias Utara',
            fullname: 'Kabupaten Nias Utara'
        }, {
            email: 'padanglawas',
            name: 'Padang Lawas',
            fullname: 'Kabupaten Padang Lawas'
        }, {
            email: 'padanglawasutara',
            name: 'Padang Lawas Utara',
            fullname: 'Kabupaten Padang Lawas Utara'
        }, {
            email: 'pakpakbharat',
            name: 'Pakpak Bharat',
            fullname: 'Kabupaten Pakpak Bharat'
        }, {
            email: 'samosir',
            name: 'Samosir',
            fullname: 'Kabupaten Samosir'
        }, {
            email: 'serdangbedagai',
            name: 'Serdang Bedagai',
            fullname: 'Kabupaten Serdang Bedagai'
        }, {
            email: 'simalungun',
            name: 'Simalungun',
            fullname: 'Kabupaten Simalungun'
        }, {
            email: 'tapanuliselatan',
            name: 'Tapanuli Selatan',
            fullname: 'Kabupaten Tapanuli Selatan'
        }, {
            email: 'tapanulitengah',
            name: 'Tapanuli Tengah',
            fullname: 'Kabupaten Tapanuli Tengah'
        }, {
            email: 'tapanuliutara',
            name: 'Tapanuli Utara',
            fullname: 'Kabupaten Tapanuli Utara'
        }, {
            email: 'tobasamosir',
            name: 'Toba Samosir',
            fullname: 'Kabupaten Toba Samosir'
        }, {
            email: 'binjai',
            name: 'Binjai',
            fullname: 'Kota Binjai'
        }, {
            email: 'gunungsitoli',
            name: 'Gunungsitoli',
            fullname: 'Kota Gunungsitoli'
        }, {
            email: 'medan',
            name: 'Medan',
            fullname: 'Kota Medan'
        }, {
            email: 'padangsidempuan',
            name: 'Padangsidempuan',
            fullname: 'Kota Padangsidempuan'
        }, {
            email: 'pematangsiantar',
            name: 'Pematangsiantar',
            fullname: 'Kota Pematangsiantar'
        }, {
            email: 'sibolga',
            name: 'Sibolga',
            fullname: 'Kota Sibolga'
        }, {
            email: 'tanjungbalai',
            name: 'Tanjungbalai',
            fullname: 'Kota Tanjungbalai'
        }, {
            email: 'tebingtinggi',
            name: 'Tebing Tinggi',
            fullname: 'Kota Tebing Tinggi'
        }];
        $scope.kabkota = {};

        $scope.submit = function (form) {
            $scope.submitted = true;
            if (form.$valid) {
                Restangular.all('users').customPOST({
                        selected: $scope.kabkota.selected,
                        telp: '+62' + $scope.data.telp.substring(1)
                    }).then(function () {
                        $alert({
                            content: 'Data sukses disimpan',
                            placement: 'top-right',
                            type: 'info',
                            duration: 5
                        });
                    })
                    .catch(function (err) {
                        $alert({
                            title: 'Error!',
                            content: err.data.message,
                            placement: 'top-right',
                            type: 'danger',
                            duration: 5
                        });
                    });
            }
        };

    });