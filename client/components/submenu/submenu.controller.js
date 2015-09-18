'use strict';

angular.module('sipkpApp')
    .controller('SubmenuCtrl', function ($scope, Auth, $state) {

        $scope.isLoggedIn = Auth.isLoggedIn;
        $scope.isAdmin = Auth.isAdmin;
        $scope.isUser = Auth.isUser;
        $scope.getCurrentUser = Auth.getCurrentUser;

        $scope.statepr = $state.current.name === 'main';
        $scope.stategr = $state.current.name === 'grosir';
        $scope.stateec = $state.current.name === 'eceran';

        $scope.guest = [{
            'label': 'Produsen',
            'state': 'main'
        }, {
            'label': 'Grosir',
            'state': 'grosir'
        }, {
            'label': 'Eceran',
            'state': 'eceran'
        }];

        $scope.stateprbt = $state.current.name === 'admin.prbt';
        $scope.stategrbt = $state.current.name === 'admin.grbt';
        $scope.stateecbt = $state.current.name === 'admin.ecbt';

        $scope.adminbt = [{
            'label': 'Produsen',
            'state': 'admin.prbt'
        }, {
            'label': 'Grosir',
            'state': 'admin.grbt'
        }, {
            'label': 'Eceran',
            'state': 'admin.ecbt'
        }];

        $scope.stateprbk = $state.current.name === 'admin.prbk';
        $scope.stategrbk = $state.current.name === 'admin.grbk';
        $scope.stateecbk = $state.current.name === 'admin.ecbk';

        $scope.adminbk = [{
            'label': 'Produsen',
            'state': 'admin.prbk'
        }, {
            'label': 'Grosir',
            'state': 'admin.grbk'
        }, {
            'label': 'Eceran',
            'state': 'admin.ecbk'
        }];

        $scope.stateuprh = $state.current.name === 'user.prh';
        $scope.stateugrh = $state.current.name === 'user.grh';
        $scope.stateuech = $state.current.name === 'user.ech';

        $scope.userh = [{
            'label': 'Produsen',
            'state': 'user.prh'
        }, {
            'label': 'Grosir',
            'state': 'user.grh'
        }, {
            'label': 'Eceran',
            'state': 'user.ech'
        }];

        $scope.stateuprm = $state.current.name === 'user.prm';
        $scope.stateugrm = $state.current.name === 'user.grm';
        $scope.stateuecm = $state.current.name === 'user.ecm';

        $scope.userm = [{
            'label': 'Produsen',
            'state': 'user.prm'
        }, {
            'label': 'Grosir',
            'state': 'user.grm'
        }, {
            'label': 'Eceran',
            'state': 'user.ecm'
        }];

        $scope.stateuprb = $state.current.name === 'user.prb';
        $scope.stateugrb = $state.current.name === 'user.grb';
        $scope.stateuecb = $state.current.name === 'user.ecb';

        $scope.userb = [{
            'label': 'Produsen',
            'state': 'user.prb'
        }, {
            'label': 'Grosir',
            'state': 'user.grb'
        }, {
            'label': 'Eceran',
            'state': 'user.ecb'
        }];

    });