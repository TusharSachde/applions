angular.module('starter.controllers', ['ngAnimate', 'starter.services', 'ngCordova'])

.controller('AppCtrl', function ($scope, $ionicPopup, $location, applianceStore) {
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

.controller('HomeCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams) {

        // TAB/HOME PAGE START

        $scope.appliance = [];

        console.log("in home ctrl");

        var applianceSuccess = function (data, status) {
            console.log(data);
            $scope.appliance = data;
        }
        Chats.getAppliance(applianceSuccess);

        // TAB/HOME PAGE END
        $ionicModal.fromTemplateUrl('templates/modal-callreport.html', {
            id: '18',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal18 = modal;
        });

        $scope.opencallreport = function () {
            $scope.oModal18.show();
        };

        $scope.closecallreport = function () {
            $scope.oModal18.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-sortby.html', {
            id: '4',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal4 = modal;
        });

        $scope.opensort = function () {
            $scope.oModal4.show();
        }
        $scope.closesort = function () {
            $scope.oModal4.hide();
            opennotification();
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

        $ionicModal.fromTemplateUrl('templates/notification.html', {
            id: '17',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal17 = modal;
        });

        $scope.opennotification = function () {
            $scope.oModal17.show();
        }
        $scope.closenotification = function () {
            $scope.oModal17.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-viewdetail.html', {
            id: '12',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal12 = modal;
        });

        $scope.openviewdetails = function () {
            $scope.oModal12.show();
        }
        $scope.closeviewdetails = function () {
            $scope.oModal12.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-sortbyservice.html', {
            id: '13',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal13 = modal;
        });

        $scope.opensortservice = function () {
            $scope.oModal13.show();
        }
        $scope.closesortservice = function () {
            $scope.oModal13.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-addservice.html', {
            id: '11',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal11 = modal;
        });

        $scope.openaddservice = function () {
            $scope.oModal11.show();
        }
        $scope.closeaddservice = function () {
            $scope.oModal11.hide();
        };
    })
    .controller('HomeEditCtrl', function ($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams) {

        // TAB/HOME/EDIT PAGE STARt
        $scope.appliance = [];
        $scope.appliancetype = [];
        $scope.userlocation = [];
        $scope.location = [];
        //        $scope.appliance.userlocation = [
        //            {
        //                address: ";MKGLNDG",
        //                country: "5572b34c9c0d63cc03245a7a",
        //                createdAt: "2015-06-22T06:08:02.102Z",
        //                district: ";mfknjk",
        //                id: "5587a642fecc3ff81bd1a435",
        //                name: "aksljdbhk;NKDNLK FSM",
        //                pincode: "45742",
        //                state: "ak;dnlfdng",
        //                updatedAt: "2015-06-22T06:08:02.102Z",
        //                user: "55752e5dfda25b7c09de7c14"    
        //            },{
        //                address: ";MKGLNDG",
        //                country: "5572b34c9c0d63cc03245a7a",
        //                createdAt: "2015-06-22T06:08:02.102Z",
        //                district: ";mfknjk",
        //                id: "5587a642fecc3ff81bd1a435",
        //                name: "Thakurli",
        //                pincode: "45742",
        //                state: "ak;dnlfdng",
        //                updatedAt: "2015-06-22T06:08:02.102Z",
        //                user: "55752e5dfda25b7c09de7c14"    
        //            }
        //        ];

        //validate user
        $scope.user = Chats.getUser();

        // ONE USER
        var userCallback = function (data, status) {
                console.log("before");
                console.log(data.userlocation);
                $scope.userlocation = data.userlocation;
                console.log("after");
                console.log($scope.appliance.userlocation);
            }
            //        Chats.getWholeUser($scope.user.id, userCallback);

        // ONE APPLIANCE    

        var getProduct = function (data, status) {
            console.log("product");
            console.log(data);
            $scope.appliancetype = data;
        }

        var getOneSuccess = function (data, status) {
                console.log("all appliance");
                console.log(data);
                $scope.appliance = data;
            }
            //        Chats.getOneAppliance($stateParams.id, getOneSuccess, getProduct);

        //ON PRODUCT CLICK
        $scope.toProduct = function (product) {
            console.log(product);
            $scope.appliance.appliancetype = product;
        }

        //ON LOCATION CLICK
        $scope.selectLocation = function (location) {
            for (var i = 0; i < $scope.userlocation.length; i++) {
                $scope.userlocation[i].tabactive = "";
            }
            location.tabactive = "activetab";
            $scope.tabvalue = 1;
            $scope.appliance.userlocation = location;
        }

        var locationSuccess = function (data, status) {
            console.log(data);
        }
        $scope.addLocation = function () {
            $scope.location.user = $scope.user.id;
            Chats.addUserLocation($scope.location, locationSuccess);
        }

        var updateLocationSuccess = function (data, status) {
            console.log(data);
        }
        $scope.updateLocation = function () {
            delete $scope.appliance.userlocation["$$hashKey"];
            delete $scope.appliance.userlocation["tabactive"];
            console.log($scope.appliance.userlocation);

            Chats.updateUserLocation($scope.appliance.userlocation, updateLocationSuccess)
        }

        // TAB/HOME/EDIT PAGE END


        //toggle
        $scope.changetab = function (tab) {
            $scope.tabvalue = tab;
        }
        var applianceUpdate = function (data, status) {
            console.log(data);
        }
        $scope.changetab2 = function (tab) {
            $scope.tabvalue = tab;
            $scope.appliance.appliancetype = $scope.appliance.appliancetype.id;
            $scope.appliance.brand = $scope.appliance.brand.id;
            $scope.appliance.store = $scope.appliance.store.id;
            $scope.appliance.user = $scope.appliance.user.id;
            $scope.appliance.userlocation = $scope.appliance.userlocation.id;
            $scope.appliance.warranty = $scope.appliance.warranty.id;
            console.log($scope.appliance);
            Chats.updateAppliance($scope.appliance, applianceUpdate);
        }

        $scope.custom = false;
        $scope.toggleCustom = function () {
            $scope.custom = $scope.custom === false ? true : false;
        };

        $scope.tabvalue = 1;
        $scope.showreport = 1;

        $scope.sendtowebsite = function (website) {
            console.log(website);
            window.open('http://applions.blogspot.in/?m=1', '_blank');
        }


        //    $scope.next1 = function(){
        //        console.log("next1  clicked");
        //        console.log($scope.tabvalue);
        //        $scope.tabvalue = 1; 
        //    } 
        //    
        //    $scope.next2 = function(){
        //        console.log("next2 clicked");
        //        console.log($scope.tabvalue)
        //        $scope.tabvalue = 2; 
        //    }
        //    $scope.next3 = function(){
        //        console.log("next clicked");
        //        $scope.tabvalue = 3; 
        //    }
        // $scope.next4 = function(){
        //        console.log("next clicked");
        //        $scope.tabvalue = 4; 
        //    }

        $ionicModal.fromTemplateUrl('templates/location.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal1 = modal;
        });
        //jagruti
        $scope.openedit = function () {
            $scope.oModal1.show();
        };

        $scope.closeModalss = function () {
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

        $ionicModal.fromTemplateUrl('templates/modal-sortby.html', {
            id: '4',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal4 = modal;
        });

        $scope.opensort = function () {
            $scope.oModal4.show();
        }
        $scope.closesort = function () {
            $scope.oModal4.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-conformarchive.html', {
            id: '5',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal5 = modal;
        });

        $scope.openarchive = function () {
            $scope.oModal5.show();
        }
        $scope.closearchive = function () {
            $scope.oModal5.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-transfer.html', {
            id: '6',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal6 = modal;
        });

        $scope.opentransfer = function () {
            $scope.oModal6.show();
        }
        $scope.closetransfer = function () {
            $scope.oModal6.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-delete.html', {
            id: '7',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal7 = modal;
        });

        $scope.opendelete = function () {
            $scope.oModal7.show();
        }
        $scope.closedelete = function () {
            $scope.oModal7.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-report.html', {
            id: '8',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal8 = modal;
        });

        $scope.openreport = function () {
            $scope.oModal8.show();
        }
        $scope.closereport = function () {
            $scope.oModal8.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-component.html', {
            id: '9',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal9 = modal;
        });

        $scope.opencomponent = function () {
            $scope.oModal9.show();
        }
        $scope.closecomponent = function () {
            $scope.oModal9.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-prevreports.html', {
            id: '10',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal10 = modal;
        });

        $scope.openprevreports = function () {
            $scope.oModal10.show();
        }
        $scope.closeprevreports = function () {
            $scope.oModal10.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-addservice.html', {
            id: '11',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal11 = modal;
        });

        $scope.openaddservice = function () {
            $scope.oModal11.show();
        }
        $scope.closeaddservice = function () {
            $scope.oModal11.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-viewdetail.html', {
            id: '12',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal12 = modal;
        });

        $scope.openviewdetails = function () {
            $scope.oModal12.show();
        }
        $scope.closeviewdetails = function () {
            $scope.oModal12.hide();
        };


        $ionicModal.fromTemplateUrl('templates/modal-prevreports.html', {
            id: '12',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal12 = modal;
        });

        $scope.openprevreports = function () {
            $scope.oModal12.show();
        }
        $scope.closeprevreports = function () {
            $scope.oModal12.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-sortbyservice.html', {
            id: '13',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal13 = modal;
        });

        $scope.opensortservice = function () {
            $scope.oModal13.show();
        }
        $scope.closesortservice = function () {
            $scope.oModal13.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-filterservice.html', {
            id: '14',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal14 = modal;
        });

        $scope.openfilterservice = function () {
            $scope.oModal14.show();
        }
        $scope.closefilterservice = function () {
            $scope.oModal14.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
            id: '15',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal15 = modal;
        });

        $scope.openbrandsearch = function () {
            $scope.oModal15.show();
        }
        $scope.closebrandsearch = function () {
            $scope.oModal15.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-product.html', {
            id: '16',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal16 = modal;
        });

        $scope.openproductsearch = function () {
            $scope.oModal16.show();
        }
        $scope.closeproductsearch = function () {
            $scope.oModal16.hide();
        };
        $ionicModal.fromTemplateUrl('templates/notification.html', {
            id: '17',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal17 = modal;
        });

        $scope.opennotification = function () {
            $scope.oModal17.show();
        }
        $scope.closenotification = function () {
            $scope.oModal17.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-callreport.html', {
            id: '18',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.oModal18 = modal;
        });

        $scope.opencallreport = function () {
            $scope.oModal18.show();
        };

        $scope.closecallreport = function () {
            $scope.oModal18.hide();
        };


        function save() {
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


.controller('LoginCtrl', function ($scope, $ionicModal, $ionicPopup, $ionicPopup, $timeout, Chats, $location, $cordovaDevice) {


    $scope.user = [];

    document.addEventListener("deviceready", function () {

        var device = $cordovaDevice.getDevice();

        var cordova = $cordovaDevice.getCordova();

        var model = $cordovaDevice.getModel();

        var platform = $cordovaDevice.getPlatform();

        var uuid = $cordovaDevice.getUUID();

        var version = $cordovaDevice.getVersion();

        console.log(version);

    }, false);

    $scope.getdiv = function () {
        console.log($cordovaDevice.getDevice());
    }


    //        if(Chats.authenticate()=="true"){
    //            $location.url("tab/home");
    //        }

    var loginsuccess = function (data, status) {
        if (angular.isObject(data)) {
            Chats.jstorageUser(data);
            $location.url("tab/home");
        } else {
            var myPopup = $ionicPopup.show({
                title: data,
                scope: $scope,
            });
            $timeout(function () {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
    }

    $scope.userLogin = function () {
        console.log($scope.user);
        Chats.login($scope.user, loginsuccess);

    }
})

.controller('ProfileCtrl', function ($scope, $ionicPopover, $ionicModal) {
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


    $ionicModal.fromTemplateUrl('templates/modal-chngpswd.html', {
        id: '1',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal1 = modal;
    });

    $scope.openchngpswd = function () {
        $scope.oModal1.show();
    }
    $scope.closechngpswd = function () {
        $scope.oModal1.hide();
    };

    //    $ionicModal.fromTemplateUrl('templates/modal-chngno.html', {
    //        id: '2',
    //        scope: $scope,
    //        animation: 'slide-in-up'
    //    }).then(function(modal) {
    //        $scope.oModal2 = modal;
    //    });
    //
    //    $scope.openchngno = function() {
    //        $scope.oModal2.show();
    //    }
    //    $scope.closechngno = function() {
    //        $scope.oModal2.hide();
    //    };

    $ionicModal.fromTemplateUrl('templates/modal-stat.html', {
        id: '3',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal3 = modal;
    });

    $scope.openstat = function () {
        $scope.oModal3.show();
    }
    $scope.closestat = function () {
        $scope.oModal3.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-feedback.html', {
        id: '4',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal4 = modal;
    });

    $scope.openfeedback = function () {
        $scope.oModal4.show();
    }
    $scope.closefeedback = function () {
        $scope.oModal4.hide();
    };

    $ionicModal.fromTemplateUrl('templates/modal-existing.html', {
        id: '5',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.oModal5 = modal;
    });

    $scope.openexisting = function () {
        $scope.oModal5.show();
    }
    $scope.closeexisting = function () {
        $scope.oModal5.hide();
    };
})

.controller('StoreCtrl', function ($scope) {})

.controller('AboutCtrl', function ($scope) {})

.controller('RegisterCtrl', function ($scope, $ionicSlideBoxDelegate, $ionicPopup) {

    $scope.user = [];

    console.log("login ctrl");
    $scope.userLogin = function () {
        console.log($scope.user);
        console.log("login ctrl");
    }


    //    $scope.next = function() {
    //        $ionicSlideBoxDelegate.next();
    //    };
    //    var logload = function(data, length) {
    //        for (var i = 0; i < length; i++) {
    //            console.log(data.item(i));
    //        }
    //    };
    //
    //    MyServices.query("SELECT * FROM LOGS", logload);
    //
    //    $scope.previous = function() {
    //        $ionicSlideBoxDelegate.previous();
    //    };
    //
    //    // Called each time the slide changes
    //    $scope.slideChanged = function(index) {
    //        $scope.slideIndex = index;
    //    };


})


.controller('AppwizardCtrl', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.Modal = modal;
    });

    $scope.openbrandsearch = function () {
        console.log("in ctrl");
        $scope.Modal.show();
    }
    $scope.closebrandsearch = function () {
        $scope.Modal.hide();
    };

});