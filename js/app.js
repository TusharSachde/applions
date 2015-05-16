// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
        }
        if (window.StatusBar) {
            // org.apache.cordova.statusbar required
            StatusBar.styleLightContent();
        }
    });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
    $ionicConfigProvider.scrolling.jsScrolling(false);
    $stateProvider

    // setup an abstract state for the tabs directive
    .state('tab', {
        url: "/tab",
        abstract: true,
        templateUrl: "templates/tabs.html"
    })

    .state('otp', {
        url: "/otp",
        abstract: true,
        controller: 'AppCtrl',
        templateUrl: "templates/otp.html"
    })
        .state('otp.otp', {
            url: '/otp',
            views: {
                templateUrl: 'templates/otp.html',
                controller: 'RegisterCtrl'
            }
        })
    // Each tab has its own nav history stack:

    .state('tab.home', {
        url: '/home',
        views: {
            'tab-home': {
                templateUrl: 'templates/tab-home.html',
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
    $urlRouterProvider.otherwise('/tab/home');

});