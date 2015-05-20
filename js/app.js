angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider

    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('otp', {
        url: "/otp",
        abstract: true,
//        controller: 'AppCtrl',
        templateUrl: "templates/otp.html"
    })
        .state('otp.otp', {
            url: '/otp',
            views: {
                templateUrl: 'templates/otp.html',
                controller: 'RegisterCtrl'
            }
        }) 
        .state('otp.otps', {
            url: '/otp/otps',
            views: {
                templateUrl: 'templates/otps.html',
                controller: 'RegisterCtrl'
            }
        })
//Request Servies
    .state('tab.services', {
        url: '/home/services',
        views: {
            'tab-home': {
                templateUrl: 'templates/brand-callcenter.html',
                controller: 'HomeCtrl'
            }
        }
    })    
        

        
        .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
                controller: 'HomeCtrl'
            }
        }
    }) 
        .state('tab.service', {
        url: '/home/service',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-services.html',
                controller: 'HomeCtrl'
            }
        }
    })
        .state('tab.addappliance', {
            url: '/home/addappliance',
            views: {
                'tab-home': {
                    templateUrl: 'templates/addappliance.html',
                    controller: 'HomeCtrl'
                }
            }
        })
        .state('tab.edit', {
            url: '/home/edit',
            views: {
                'tab-home': {
                    templateUrl: 'templates/home-edit.html',
                    controller: 'HomeCtrl'
                }
            }
        })

    .state('tab.profile', {
        url: '/profile',
        views: {
            'tab-profile': {
                templateUrl: 'templates/tab-profile.html',
                controller: 'ProfileCtrl'
            }
        }
    })

    .state('tab.store', {
        url: '/store',
        views: {
            'tab-store': {
                templateUrl: 'templates/tab-store.html',
                controller: 'StoreCtrl'
            }
        }
    })

    .state('tab.about', {
        url: '/about',
        views: {
            'tab-about': {
                templateUrl: 'templates/tab-about.html',
                controller: 'AboutCtrl'
            }
        }
    });

    // if none of the above states are matched, use this as the fallback
    $urlRouterProvider.otherwise('/otp/otp');
});