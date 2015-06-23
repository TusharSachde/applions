angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        if (device.platform == 'iOS') {
            navigator.splashscreen.hide();
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.overlaysWebView(true);
            StatusBar.styleLightContent();
        }
    });
})

.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    //    $ionicConfigProvider.scrolling.jsScrolling(false);

    $stateProvider

        .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('login', {
        url: "/login",
        templateUrl: "templates/login.html",
        controller: 'LoginCtrl'
    })

    .state('appwizards', {
        url: "/appwizards",
        templateUrl: "templates/appwizard.html",
        controller: 'AppwizardCtrl'
    })

    .state('registration', {
        url: '/registration',
        templateUrl: 'templates/registration.html',
        controller: 'RegisterCtrl'
    })

    .state('forgot', {
        url: '/forgot',
        templateUrl: 'templates/forgot.html',
        controller: 'RegisterCtrl'
    })

    .state('oldreg', {
        url: '/oldreg',
        templateUrl: 'templates/old-reg.html',
        controller: 'RegisterCtrl'
    })
    .state('old-registration', {
        url: '/old-registration',
        templateUrl: 'templates/old-registration.html',
        controller: 'RegisterCtrl'
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
                controller: 'HomeEditCtrl'
            }
        }
    })

    .state('tab.addappliance', {
        url: '/home/addappliance',
        views: {
            'tab-home': {
                templateUrl: 'templates/addappliance.html',
                controller: 'HomeEditCtrl'
            }
        }
    })

    .state('tab.edit', {
        url: '/home/edit',
        views: {
            'tab-home': {
                templateUrl: 'templates/home-edit.html',
                controller: 'HomeEditCtrl'
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
    $urlRouterProvider.otherwise('/login');
});