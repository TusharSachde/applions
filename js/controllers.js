angular.module('starter.controllers', [])

.controller('HomeCtrl', function ($scope, $ionicModal,$ionicPopup,$timeout) {
    $ionicModal.fromTemplateUrl('templates/location.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modals = modal;
    });

    $scope.openedit = function () {
        $scope.modals.show();
    };

    $scope.closeModal = function () {
        $scope.modals.hide();
    };

    
     $ionicModal.fromTemplateUrl('templates/addwarranty.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.modals = modal;
    });

    $scope.openpswd = function() {
        $scope.modals.show();
    };

    $scope.closeModal = function() {
        $scope.modals.hide();
    };
    

//    $scope.appliance = "active";   
    $scope.appliance = "bold";   
    $scope.profile = "";  
    $scope.warranty = "";  
    $scope.documents = "";  
    $scope.user = [];

    //  DESIGN CODE
    $scope.changeapp = function () {
        $scope.appliance = "bold";
        $scope.purchase = "";
        $scope.warranty = "";
        $scope.documents = "";

    }

    $scope.changepurchase = function () {
        $scope.appliance = "";
        $scope.purchase = "bold";
        $scope.warranty = "";
        $scope.documents = "";
    }  
    
    $scope.changewarranty = function () {
        $scope.appliance = "";
        $scope.purchase = "";
        $scope.warranty = "bold";
        $scope.documents = "";
    }   
    $scope.changedocuments = function () {
        $scope.appliance = "";
        $scope.purchase = "";
        $scope.warranty = "";
        $scope.documents = "bold";
    }
    
    
    
    //    $scope.appliance = "active";   
    $scope.myhome = "bold";   
    $scope.myoffice = "";  
    $scope.addnew = "";  
    $scope.user = [];

    //  DESIGN CODE
    $scope.changemyhome = function () {
     $scope.myhome = "bold";   
    $scope.myoffice = "";  
    $scope.addnew = "";

    }

    $scope.changemyoffice = function () {
     $scope.myhome = "";   
    $scope.myoffice = "bold";  
    $scope.addnew = "";
    }  
    $scope.changeaddnew = function () {
     $scope.myhome = "";   
    $scope.myoffice = "";  
    $scope.addnew = "bold";
    }  
    
    
    
      function purchaseoverlimit() {
            var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Appliance has been update successfully!!</p>',
            title: 'Alert!',
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
      }


})

.controller('ProfileCtrl', function ($scope, $ionicPopover) {
    $ionicPopover.fromTemplateUrl('templates/profile-popover.html', {
        scope: $scope
    }).then(function (popover) {
        $scope.popover = popover;
    });

    $scope.openPopover = function ($event) {
        $scope.popover.show($event);
    };
    $scope.closePopover = function () {
        $scope.popover.hide();
    };
})

.controller('StoreCtrl', function ($scope) {})

.controller('AboutCtrl', function ($scope) {});