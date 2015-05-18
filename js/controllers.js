angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicPopup, $location) {
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

.controller('HomeCtrl', function($scope, $ionicModal, $ionicPopup, $timeout) {
    $ionicModal.fromTemplateUrl('templates/location.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    $scope.openedit = function() {
        $scope.oModal1.show();
    };

    $scope.closeModalss = function() {
        $scope.oModal1.hide();
    };


    $ionicModal.fromTemplateUrl('templates/addwarranty.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    $scope.openpswd = function() {
        $scope.oModal2.show();
    };

    $scope.closeModal = function() {
        $scope.oModal2.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-filter.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });

    $scope.openfilter = function() {
        $scope.oModal3.show();
    }
    $scope.closefilter = function() {
        $scope.oModal3.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-sortby.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });

    $scope.opensort = function() {
        $scope.oModal4.show();
    }
    $scope.closesort = function() {
        $scope.oModal4.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-conformarchive.html', {
        id: '5',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal5 = modal;
    });

    $scope.openarchive = function() {
        $scope.oModal5.show();
    }
    $scope.closearchive = function() {
        $scope.oModal5.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-transfer.html', {
        id: '6',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal6 = modal;
    });

    $scope.opentransfer = function() {
        $scope.oModal6.show();
    }
    $scope.closetransfer = function() {
        $scope.oModal6.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-delete.html', {
        id: '7',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal7 = modal;
    });

    $scope.opendelete = function() {
        $scope.oModal7.show();
    }
    $scope.closedelete = function() {
        $scope.oModal7.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-report.html', {
        id: '8',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal8 = modal;
    });

    $scope.openreport = function() {
        $scope.oModal8.show();
    }
    $scope.closereport = function() {
        $scope.oModal8.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-services.html', {
        id: '9',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal9 = modal;
    });

    $scope.openservice = function() {
        $scope.oModal9.show();
    }
    $scope.closeservice = function() {
        $scope.oModal9.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-prevreports.html', {
        id: '10',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal10 = modal;
    });

    $scope.openprevreports = function() {
        $scope.oModal10.show();
    }
    $scope.closeprevreports = function() {
        $scope.oModal10.hide();
    };  
    
    $ionicModal.fromTemplateUrl('templates/modal-addservice.html', {
        id: '11',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal11 = modal;
    });

    $scope.openaddservice = function() {
        $scope.oModal11.show();
    }
    $scope.closeaddservice = function() {
        $scope.oModal11.hide();
    };  
    
    $ionicModal.fromTemplateUrl('templates/modal-viewdetail.html', {
        id: '12',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal12 = modal;
    });

    $scope.openviewdetails = function() {
        $scope.oModal12.show();
    }
    $scope.closeviewdetails = function() {
        $scope.oModal12.hide();
    };


    //    $scope.appliance = "active";   
    $scope.appliance = "bold";
    $scope.profile = "";
    $scope.warranty = "";
    $scope.documents = "";
    $scope.user = [];

    //  DESIGN CODE
    $scope.changeapp = function() {
        $scope.appliance = "bold";
        $scope.purchase = "";
        $scope.warranty = "";
        $scope.documents = "";

    }

    $scope.changepurchase = function() {
        $scope.appliance = "";
        $scope.purchase = "bold";
        $scope.warranty = "";
        $scope.documents = "";
    }

    $scope.changewarranty = function() {
        $scope.appliance = "";
        $scope.purchase = "";
        $scope.warranty = "bold";
        $scope.documents = "";
    }
    $scope.changedocuments = function() {
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
    $scope.changemyhome = function() {
        $scope.myhome = "bold";
        $scope.myoffice = "";
        $scope.addnew = "";

    }

    $scope.changemyoffice = function() {
        $scope.myhome = "";
        $scope.myoffice = "bold";
        $scope.addnew = "";
    }
    $scope.changeaddnew = function() {
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
    $scope.changemyhome = function() {
        $scope.myhome = "bold";
        $scope.myoffice = "";
        $scope.addnew = "";

    }

    $scope.changemyoffice = function() {
        $scope.myhome = "";
        $scope.myoffice = "bold";
        $scope.addnew = "";
    }
    $scope.changeaddnew = function() {
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
    $scope.changeappstatus = function() {
        $scope.appstatus = "bold";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changetype = function() {
        $scope.appstatus = "";
        $scope.apptype = "bold";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changelocation = function() {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "bold";
        $scope.coverstatus = "";
        $scope.covertype = "";
    }

    $scope.changecoverstatus = function() {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "bold";
        $scope.covertype = "";
    }

    $scope.changecovertype = function() {
        $scope.appstatus = "";
        $scope.apptype = "";
        $scope.location = "";
        $scope.coverstatus = "";
        $scope.covertype = "bold";
    }


    //    tab5   
    $scope.showreport = 1;

    //    tab6
    $scope.brandcall = "bold";
    $scope.myservice = "";
    $scope.seller = "";
    $scope.details = "";
    $scope.user = [];

    //  DESIGN CODE
    $scope.changebrandcall = function() {
        $scope.brandcall = "bold";
        $scope.myservice = "";
        $scope.seller = "";
        $scope.details = "";
    }
    $scope.changemyservice = function() {
        $scope.brandcall = "";
        $scope.myservice = "bold";
        $scope.seller = "";
        $scope.details = "";
    }  
    $scope.changeseller = function() {
        $scope.brandcall = "";
        $scope.myservice = "";
        $scope.seller = "bold";
         $scope.details = "";
    }   
    
    $scope.changedetails = function() {
        $scope.brandcall = "";
        $scope.myservice = "";
        $scope.seller = "";
        $scope.details = "bold";
    }
   
    
    function save() {
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

.controller('ProfileCtrl', function($scope, $ionicPopover,$ionicModal) {
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
    
    
       $ionicModal.fromTemplateUrl('templates/modal-chngpswd.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal1 = modal;
    });

    $scope.openchngpswd = function() {
        $scope.oModal1.show();
    }
    $scope.closechngpswd = function() {
        $scope.oModal1.hide();
    };
    
    $ionicModal.fromTemplateUrl('templates/modal-chngno.html', {
        id: '2',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal2 = modal;
    });

    $scope.openchngno = function() {
        $scope.oModal2.show();
    }
    $scope.closechngno = function() {
        $scope.oModal2.hide();
    };   
    
    $ionicModal.fromTemplateUrl('templates/modal-stat.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal3 = modal;
    });

    $scope.openstat = function() {
        $scope.oModal3.show();
    }
    $scope.closestat = function() {
        $scope.oModal3.hide();
    };   
    
    $ionicModal.fromTemplateUrl('templates/modal-feedback.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal4 = modal;
    });

    $scope.openfeedback = function() {
        $scope.oModal4.show();
    }
    $scope.closefeedback = function() {
        $scope.oModal4.hide();
    };
})

.controller('StoreCtrl', function($scope) {})

.controller('AboutCtrl', function($scope) {})

.controller('RegisterCtrl', function($scope) {});