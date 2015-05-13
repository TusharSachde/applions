angular.module('starter.controllers', [])

.controller('AppCtrl', function ($scope, $ionicPopup, $location, MyServices) {
//    var readsmsCallback = function (otp) {
//        if (!otp) {
//            conole.log("No Otp");
//        } else {
//            $scope.otp = otp;
//            $scope.$apply();
//            $location.path("/profile");
//        }
//    };
//    MyServices.readsms(readsmsCallback);
})

.controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout) {
    $ionicModal.fromTemplateUrl('templates/location.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal1 = modal;
    });

    $scope.openedit = function () {
        $scope.oModal1.show();
    };

    $scope.closeModal = function () {
        $scope.oModal1.hide();
    };


    $ionicModal.fromTemplateUrl('templates/addwarranty.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal2 = modal;
    });

    $scope.openpswd = function () {
        $scope.oModal2.show();
    };

    $scope.closeModal = function () {
        $scope.oModal2.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-filter.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });

    $scope.openfilter = function () {
        $scope.oModal3.show();
    }
    $scope.closefilter = function () {
        $scope.oModal3.hide();
    };  
    
    $ionicModal.fromTemplateUrl('templates/modal-filter.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal4 = modal;
    });

    $scope.openfilter = function () {
        $scope.oModal4.show();
    }
    $scope.closefilter = function () {
        $scope.oModal4.hide();
    };  
    
//    $ionicModal.fromTemplateUrl('templates/modal-sortby.html', {
//        id: '4',
//        scope: $scope,
//        animation: 'slide-in-up'
//    }).then(function (modal) {
//        $scope.oModal4 = modal;
//    });
//
//    $scope.opensort = function () {
//        $scope.oModal4.show();
//    }
//    $scope.opensort = function () {
//        $scope.oModal4.hide();
//    };



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

    //    tab3   
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


    //    tab4  
    $scope.appstatus = "bold";
    $scope.apptype = "";
    $scope.location = "";
    $scope.coverstatus = "";
    $scope.covertype = "";
    $scope.user = [];

    //  DESIGN CODE
    $scope.changeappstatus = function () {
        $scope.appstatus = "bold";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changetype = function () {
        $scope.appstatus = "";
        $scope.apptype = "bold";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changelocation = function () {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "bold";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changecoverstatus = function () {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "bold";
        $scope.covertype = "";
    }

    $scope.changecovertype = function () {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "bold";
    }

    function purchaseoverlimit() {
        var myPopup = $ionicPopup.show({
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Appliance has been update successfully!!</p>',
            title: 'Alert!',
            scope: $scope,
        });
        $timeout(function () {
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

.controller('AboutCtrl', function ($scope) {})
    
.controller('RegisterCtrl', function ($scope) {});