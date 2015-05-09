angular.module('starter.controllers', [])

.controller('HomeCtrl', function($scope) {})

.controller('ProfileCtrl', function($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/profile-popover.html', {
        scope: $scope
    }).then(function(popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function() {
        $scope.popover.hide();
    };
})

.controller('StoreCtrl', function($scope) {})

.controller('AboutCtrl', function($scope) {});