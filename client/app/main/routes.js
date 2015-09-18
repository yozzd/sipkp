'use strict';

angular.module('sipkpApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: 'app/main/harian/produsen/produsen.html',
                        controller: 'MainHarianProdusenCtrl'
                    }
                }
            })
            .state('grosir', {
                url: '/grosir',
                views: {
                    '@': {
                        templateUrl: 'app/main/harian/grosir/grosir.html',
                        controller: 'MainHarianGrosirCtrl'
                    }
                }
            })
            .state('eceran', {
                url: '/eceran',
                views: {
                    '@': {
                        templateUrl: 'app/main/harian/eceran/eceran.html',
                        controller: 'MainHarianEceranCtrl'
                    }
                }
            });
    });