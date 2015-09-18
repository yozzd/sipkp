'use strict';

angular.module('sipkpApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('user', {
                url: '/user',
                views: {
                    '@': {
                        templateUrl: 'app/user/beranda/beranda.html',
                        controller: 'UserBerandaCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: '{{getCurrentUser().name}}'
                }
            })
            .state('user.prcreate', {
                url: '/prcreate',
                views: {
                    '@': {
                        templateUrl: 'app/user/produsen/create/create.html',
                        controller: 'UserProdusenCreateCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Input Harga Harian Produsen'
                }
            })
            .state('user.grcreate', {
                url: '/grcreate',
                views: {
                    '@': {
                        templateUrl: 'app/user/grosir/create/create.html',
                        controller: 'UserGrosirCreateCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Input Harga Harian Grosir'
                }
            })
            .state('user.eccreate', {
                url: '/eccreate',
                views: {
                    '@': {
                        templateUrl: 'app/user/eceran/create/create.html',
                        controller: 'UserEceranCreateCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Input Harga Harian Eceran'
                }
            })
            .state('user.prh', {
                url: '/prh',
                views: {
                    '@': {
                        templateUrl: 'app/user/produsen/harian/harian.html',
                        controller: 'UserProdusenHarianCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Harian Harga Produsen'
                }
            })
            .state('user.grh', {
                url: '/grh',
                views: {
                    '@': {
                        templateUrl: 'app/user/grosir/harian/harian.html',
                        controller: 'UserGrosirHarianCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Harian Harga Grosir'
                }
            })
            .state('user.ech', {
                url: '/ech',
                views: {
                    '@': {
                        templateUrl: 'app/user/eceran/harian/harian.html',
                        controller: 'UserEceranHarianCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Harian Harga Eceran'
                }
            })
            .state('user.prh.predit', {
                url: '/predit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/user/produsen/edit/edit.html',
                        controller: 'UserProdusenEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Laporan Harian Produsen'
                }
            })
            .state('user.grh.gredit', {
                url: '/gredit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/user/grosir/edit/edit.html',
                        controller: 'UserGrosirEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Laporan Harian Grosir'
                }
            })
            .state('user.ech.ecedit', {
                url: '/ecedit/{id}',
                views: {
                    '@': {
                        templateUrl: 'app/user/eceran/edit/edit.html',
                        controller: 'UserEceranEditCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Edit Laporan Harian Eceran'
                }
            })
            .state('user.prm', {
                url: '/prm',
                views: {
                    '@': {
                        templateUrl: 'app/user/produsen/mingguan/mingguan.html',
                        controller: 'UserProdusenMingguanCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Mingguan Harga Produsen'
                }
            })
            .state('user.grm', {
                url: '/grm',
                views: {
                    '@': {
                        templateUrl: 'app/user/grosir/mingguan/mingguan.html',
                        controller: 'UserGrosirMingguanCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Mingguan Harga Grosir'
                }
            })
            .state('user.ecm', {
                url: '/ecm',
                views: {
                    '@': {
                        templateUrl: 'app/user/eceran/mingguan/mingguan.html',
                        controller: 'UserEceranMingguanCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Mingguan Harga Eceran'
                }
            })
            .state('user.prb', {
                url: '/prb',
                views: {
                    '@': {
                        templateUrl: 'app/user/produsen/bulanan/bulanan.html',
                        controller: 'UserProdusenBulananCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Harga Produsen'
                }
            })
            .state('user.grb', {
                url: '/grb',
                views: {
                    '@': {
                        templateUrl: 'app/user/grosir/bulanan/bulanan.html',
                        controller: 'UserGrosirBulananCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Harga Grosir'
                }
            })
            .state('user.ecb', {
                url: '/ecb',
                views: {
                    '@': {
                        templateUrl: 'app/user/eceran/bulanan/bulanan.html',
                        controller: 'UserEceranBulananCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['user', 'admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Harga Eceran'
                }
            });
    });