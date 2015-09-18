'use strict';

angular.module('sipkpApp')
    .config(function ($stateProvider) {
        $stateProvider
            .state('admin', {
                url: '/admin',
                views: {
                    '@': {
                        templateUrl: 'app/admin/beranda/beranda.html',
                        controller: 'AdminBerandaCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Admin'
                }
            })
            .state('admin.create', {
                url: '/create',
                views: {
                    '@': {
                        templateUrl: 'app/admin/create/create.html',
                        controller: 'AdminCreateCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Create User'
                }
            })
            .state('admin.daftar', {
                url: '/daftar',
                views: {
                    '@': {
                        templateUrl: 'app/admin/daftar/daftar.html',
                        controller: 'AdminDaftarCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Daftar User'
                }
            })
            .state('admin.prbt', {
                url: '/prbt',
                views: {
                    '@': {
                        templateUrl: 'app/admin/produsen/bulanan/kabkota/kabkota.html',
                        controller: 'AdminPrbtCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Produsen Per Kabupaten / Kota'
                }
            })
            .state('admin.grbt', {
                url: '/grbt',
                views: {
                    '@': {
                        templateUrl: 'app/admin/grosir/bulanan/kabkota/kabkota.html',
                        controller: 'AdminGrbtCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Grosir Per Kabupaten / Kota'
                }
            })
            .state('admin.ecbt', {
                url: '/ecbt',
                views: {
                    '@': {
                        templateUrl: 'app/admin/eceran/bulanan/kabkota/kabkota.html',
                        controller: 'AdminEcbtCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Eceran Per Kabupaten / Kota'
                }
            })
            .state('admin.prbk', {
                url: '/prbk',
                views: {
                    '@': {
                        templateUrl: 'app/admin/produsen/bulanan/komoditas/komoditas.html',
                        controller: 'AdminPrbkCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Produsen Per Komoditas'
                }
            })
            .state('admin.grbk', {
                url: '/grbk',
                views: {
                    '@': {
                        templateUrl: 'app/admin/grosir/bulanan/komoditas/komoditas.html',
                        controller: 'AdminGrbkCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Grosir Per Komoditas'
                }
            })
            .state('admin.ecbk', {
                url: '/ecbk',
                views: {
                    '@': {
                        templateUrl: 'app/admin/eceran/bulanan/komoditas/komoditas.html',
                        controller: 'AdminEcbkCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Bulanan Eceran Per Komoditas'
                }
            })
            .state('admin.evaluasi', {
                url: '/evaluasi',
                views: {
                    '@': {
                        templateUrl: 'app/admin/evaluasi/evaluasi.html',
                        controller: 'AdminEvaluasiCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'Laporan Evaluasi Bulanan'
                }
            })
            .state('admin.sender', {
                url: '/sender',
                views: {
                    '@': {
                        templateUrl: 'app/admin/sender/sender.html',
                        controller: 'AdminSenderCtrl'
                    }
                },
                data: {
                    permissions: {
                        only: ['admin'],
                        redirectTo: 'login'
                    }
                },
                ncyBreadcrumb: {
                    label: 'SMS Sender'
                }
            });
    });