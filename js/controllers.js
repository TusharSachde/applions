angular.module('starter.controllers', ['ngAnimate', 'starter.services', 'ngCordova'])

.controller('AppCtrl', function($scope, $ionicPopup, $location, applianceStore) {
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

.controller('HomeCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams) {

    // TAB/HOME PAGE START

    $scope.appliance = [];

    console.log("in home ctrl");

    var applianceSuccess = function(data, status) {
        console.log(data);
        $scope.appliance = data;
    }
    Chats.getAppliance(applianceSuccess);

    // TAB/HOME PAGE END
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
    $ionicModal.fromTemplateUrl('templates/modal-callreport.html', {
        id: '18',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal18 = modal;
    });

    $scope.opencallreport = function() {
        $scope.oModal18.show();
    };

    $scope.closecallreport = function() {
        $scope.oModal18.hide();
    };

    var applianceDelete = function(data, status) {
        Chats.getAppliance(applianceSuccess);
        console.log(data);
    }
    $scope.deleteappliance = function(appid) {
        Chats.deleteAppliance(appid, applianceDelete);
    }

})
    .controller('HomeEditCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams, $cordovaImagePicker, $cordovaFileTransfer) {

        // TAB/HOME/EDIT PAGE STARt
        $scope.appliance = [];
        $scope.appliancetype = [];
        $scope.userlocation = [];
        $scope.location = [];
        $scope.warranty = [];
        $scope.store = [];
        $scope.componentobj = [];
        $scope.componentobj.startdate = new Date();
        $scope.compwarranty = [];
        $scope.warrantyobj = [];
        $scope.additionalwarranty = [];
        $scope.archive = [];
        $scope.locationtb = 0;
        $scope.locationtab = function(tb) {
            $scope.locationtb = tb;
        };

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

        // ONE USERa.userlocation;
        var userLocationSuccess = function(data, status) {
            console.log("before");
            console.log(data.userlocation);
            $scope.userlocation = data.userlocation;
            console.log("after");
            console.log($scope.appliance.userlocation);
        }
        Chats.getWholeUser(userLocationSuccess);

        // ONE APPLIANCE    

        var getProductSuccess = function(data, status) {
            console.log("product");
            console.log(data);
            $scope.appliancetype = data;
        }

        var getOneSuccess = function(data, status) {
            console.log("all appliance");
            console.log(data);
            $scope.appliance = data;
            $scope.warranty = data.warranty[data.warranty.length - 1];
            //            console.log($scope.warranty);
            $scope.warranty.purchasedate = new Date($scope.warranty.purchasedate);
            $scope.store.appliance = data.id;
            $scope.store = data.store;
            $scope.compwarranty.appliance = data.id;
            console.log($scope.compwarranty);
            $scope.store.purchaseprice = data.purchaseprice;
        }
        Chats.getOneAppliance($stateParams.id, getOneSuccess);

        function updateApp() {
            Chats.getOneAppliance($stateParams.id, getOneSuccess);
        }

        Chats.getProduct(getProductSuccess);

        //ON PRODUCT CLICK
        $scope.toProduct = function(product) {
            console.log(product);
            $scope.appliance.appliancetype = product;
            $scope.closeproductsearch();
        }

        //ON LOCATION CLICK
        $scope.selectLocation = function(location) {
            for (var i = 0; i < $scope.userlocation.length; i++) {
                $scope.userlocation[i].tabactive = "";
            }
            location.tabactive = "activetab";
            $scope.tabvalue = 1;
            $scope.appliance.userlocation = location;
        }

        var locationSuccess = function(data, status) {
            console.log(data);
            Chats.getWholeUser(userLocationSuccess);

            $scope.location = [];
        }
        $scope.addLocation = function() {
            $scope.location.user = $scope.user.id;
            Chats.addUserLocation($scope.location, locationSuccess);
        }

        var updateLocationSuccess = function(data, status) {
            console.log(data);
        }
        $scope.updateLocation = function() {
            delete $scope.appliance.userlocation["$$hashKey"];
            delete $scope.appliance.userlocation["tabactive"];
            console.log($scope.appliance.userlocation);

            Chats.updateUserLocation($scope.appliance.userlocation, updateLocationSuccess)
        }


        //UPDATE PURCHASE DETAILS
        var warrantySuccess = function(data, status) {
            console.log(data);
            $scope.changetab(3);
            updateApp();
        }

        var storeSuccess = function(data, status) {
            console.log(data);
        }

        $scope.purchaseprice = {};
        $scope.purchaseDetails = function() {
            $scope.purchaseprice.appliance = $stateParams.id;
            $scope.purchaseprice.purchaseprice = $scope.store.purchaseprice;
            Chats.updatePurchasePrice($scope.purchaseprice, function(data, status) {
                updateApp();
            });

            Chats.updateWarranty($scope.warranty, warrantySuccess);
            Chats.applianceStore($scope.store, storeSuccess);
        }


        $scope.saveComponentWarranty = function() {
            $scope.compwarranty.appliance = $stateParams.id;
            console.log($scope.compwarranty);
            Chats.addComponentWarranty($scope.compwarranty, function(data, status) {
                if (data) {
                    $scope.oModal21.hide();
                    $scope.closecomponent();
                    $scope.compwarranty = {};
                    updateApp();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

        $scope.saveAdditionalWarranty = function() {
            $scope.additionalwarranty.appliance = $stateParams.id;
            console.log($scope.additionalwarranty);
            Chats.addAdditionalWarranty($scope.additionalwarranty, function(data, status) {
                console.log(data);
                if (data) {
                    $scope.closeModal();
                    $scope.additionalwarranty = {};
                    updateApp();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }


        //EDIT COMPONENT WARRANTY
        $scope.editComponentWarranty = function() {
            $scope.componentobj.appliance = $scope.appliance.id;
            Chats.updateComponentWarranty($scope.componentobj, function(data, status) {
                if (data) {
                    updateApp();
                    $scope.oModal21.hide();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

        $scope.editAdditionalWarranty = function() {
            $scope.additionalwarranty.appliance = $scope.appliance.id;
            Chats.updateAddtionalWarranty($scope.additionalwarranty, function(data, status) {
                console.log(data);
                if (data) {
                    updateApp();
                    $scope.oModal20.hide();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

        $scope.additionalwarranty.includes = [];
        $scope.pushorpop = function(status, value) {
            console.log(status);
            console.log(value);
            if (status == true) {
                $scope.additionalwarranty.includes.push(value);
            } else if (status == false) {
                var popindex = $scope.additionalwarranty.includes.indexOf(value);
                $scope.additionalwarranty.includes.splice(popindex, 1);
            }
            console.log($scope.additionalwarranty.includes);
        }

        //ARCHIVE APPLIANCE
        $scope.applianceArchived = function(state) {
            $scope.archive.status = state;
            $scope.archive.id = $scope.appliance.id;
            Chats.changeArchive($scope.archive, function(data, status) {
                console.log(data);
                $scope.closearchive();
                updateApp();
            });
        }

        // TAB/HOME/EDIT PAGE END


        //toggle
        $scope.changetab = function(tab) {
            console.log(tab);
            $scope.tabvalue = tab;
        }
        var applianceUpdate = function(data, status) {
            console.log(data);
        }
        $scope.changetab2 = function(tab) {
            $scope.tabvalue = tab;
            console.log($scope.appliance);

            //            $scope.allvalidation = [{
            //                field: $scope.appliance.appliancetype.name,
            //                validation: ""
            //            }, {
            //                field: $scope.appliance.name,
            //                validation: ""
            //            }, {
            //                field: $scope.appliance.userlocation.name,
            //                validation: ""
            //            }];
            //            var check = formvalidation($scope.allvalidation);
            //            if (check) {
            //                console.log("validate");
            //                Chats.updateAppliance($scope.appliance, function(data, status) {
            //                    if (data) {
            //                        var myPopup = $ionicPopup.show({
            //                            title: "Appliance Updated",
            //                            scope: $scope,
            //                        });
            //                        $timeout(function() {
            //                            myPopup.close(); //close the popup after 3 seconds for some reason
            //                        }, 1500);
            ////                        $scope.tabvalue = tab;
            //                    } else {
            //                        var myPopup = $ionicPopup.show({
            //                            title: "Enable To Update",
            //                            scope: $scope,
            //                        });
            //                        $timeout(function() {
            //                            myPopup.close(); //close the popup after 3 seconds for some reason
            //                        }, 1500);
            //                    }
            //                });
            //
            //            }


            Chats.updateAppliance($scope.appliance, applianceUpdate);
        }

        $scope.custom = false;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true : false;
        };

        $scope.tabvalue = 1;
        $scope.showreport = 1;

        $scope.sendtowebsite = function(website) {
            console.log(website);
            window.open('http://applions.blogspot.in/?m=1', '_blank');
        }



        //UPLOAD DOCUMENTS
        var options = {
            maximumImagesCount: 1,
            width: 800,
            height: 800,
            quality: 80
        };

        var changeproflogo = function(result) {
            console.log(result);
            $scope.mycard.profilelogo = result.value;
        }
        $scope.uploadBill = function() {
            console.log("take picture");

            $cordovaImagePicker.getPictures(options).then(function(resultImage) {
                // Success! Image data is here
                console.log("here in upload image");

                console.log(resultImage);

                $scope.cameraimage = resultImage[0];
                $scope.uploadPhoto("http://wohlig.co.in/powerforone/index.php/json/imageuploadprofile", changeproflogo);

            }, function(err) {
                // An error occured. Show a message to the user
            });
        };

        $scope.uploadPhoto = function(serverpath, callback) {

            //        console.log("function called");
            $cordovaFileTransfer.upload(serverpath, $scope.cameraimage, options)
                .then(function(result) {
                    console.log(result);
                    var data = JSON.parse(result.response);
                    callback(data);
                    $ionicLoading.hide();
                    //$scope.addretailer.store_image = $scope.filename2;
                }, function(err) {
                    // Error
                    console.log(err);
                }, function(progress) {
                    // constant progress updates
                    $ionicLoading.show({
                        //        template: 'We are fetching the best rates for you.',

                        content: 'Uploading Image',
                        animation: 'fade-in',
                        showBackdrop: true,
                        maxWidth: 200,
                        showDelay: '0'
                    });
                });
        };

        var applianceDelete = function(data, status) {
            console.log(data);
            $scope.closedelete();
        }
        $scope.deleteappliance = function() {
            Chats.deleteAppliance($stateParams.id, applianceDelete);
        }

        //UPLOAD DOCUMENTS


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
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });
        //jagruti
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

        $ionicModal.fromTemplateUrl('templates/showwarranty.html', {
            id: '20',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal20 = modal;
        });

        $scope.openwarranty = function(warranty) {
            $scope.additionalwarranty = warranty;
            //            $scope.warrantyobj.end = moment('2014-11-30 ').subtract(1, 'months').endOf('month').format('YYYY-MM-DD');
            $scope.oModal20.show();
        };

        $scope.closewarranty = function() {
            $scope.oModal20.hide();
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

        $ionicModal.fromTemplateUrl('templates/modal-component.html', {
            id: '9',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal9 = modal;
        });

        $scope.opencomponent = function() {
            $scope.oModal9.show();
        }
        $scope.closecomponent = function() {
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


        $ionicModal.fromTemplateUrl('templates/modal-prevreports.html', {
            id: '12',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal12 = modal;
        });

        $scope.openprevreports = function() {
            $scope.oModal12.show();
        }
        $scope.closeprevreports = function() {
            $scope.oModal12.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-sortbyservice.html', {
            id: '13',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal13 = modal;
        });

        $scope.opensortservice = function() {
            $scope.oModal13.show();
        }
        $scope.closesortservice = function() {
            $scope.oModal13.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-filterservice.html', {
            id: '14',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal14 = modal;
        });

        $scope.openfilterservice = function() {
            $scope.oModal14.show();
        }
        $scope.closefilterservice = function() {
            $scope.oModal14.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
            id: '15',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal15 = modal;
        });

        $scope.openbrandsearch = function() {
            $scope.oModal15.show();
        }
        $scope.closebrandsearch = function() {
            $scope.oModal15.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-product.html', {
            id: '16',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal16 = modal;
        });

        $scope.openproductsearch = function() {
            $scope.oModal16.show();
        }
        $scope.closeproductsearch = function() {
            $scope.oModal16.hide();
        };
        $ionicModal.fromTemplateUrl('templates/notification.html', {
            id: '17',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal17 = modal;
        });

        $scope.opennotification = function() {
            $scope.oModal17.show();
        }
        $scope.closenotification = function() {
            $scope.oModal17.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-compntwarranty.html', {
            id: '21',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal21 = modal;
        });

        $scope.opencompntwarranty = function(component) {
            $scope.componentobj = component;
            $scope.oModal21.show();
        }
        $scope.closecompntwarranty = function() {
            $scope.oModal21.hide();
        };

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


.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $ionicPopup, $timeout, Chats, $location, $cordovaDevice) {


    $scope.user = [];

    document.addEventListener("deviceready", function() {

        var device = $cordovaDevice.getDevice();

        var cordova = $cordovaDevice.getCordova();

        var model = $cordovaDevice.getModel();

        var platform = $cordovaDevice.getPlatform();

        var uuid = $cordovaDevice.getUUID();

        var version = $cordovaDevice.getVersion();

        console.log(version);

    }, false);

    $scope.getdiv = function() {
        console.log($cordovaDevice.getDevice());
    }


    //        if(Chats.authenticate()=="true"){
    //            $location.url("tab/home");
    //        }

    var loginsuccess = function(data, status) {
        if (angular.isObject(data)) {
            Chats.jstorageUser(data);
            $location.url("tab/home");
        } else {
            var myPopup = $ionicPopup.show({
                title: data,
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
    }

    $scope.userLogin = function() {
        console.log($scope.user);
        Chats.login($scope.user, loginsuccess);

    }

})
    .controller('AddappCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams, $cordovaImagePicker, $cordovaFileTransfer) {

        $scope.appliance = {};
        $scope.appliancetype = {};
        $scope.userlocation = {};
        $scope.location = {};
        $scope.warranty = {};
        $scope.store = {};
        $scope.componentobj = {};
        $scope.componentobj.startdate = new Date();
        $scope.compwarranty = {};
        $scope.warrantyobj = {};
        $scope.additionalwarranty = {};
        $scope.archive = {};

        // TAB/HOME/EDIT PAGE STARt
        //        $scope.appliance = [];
        //        $scope.appliancetype = [];
        //        $scope.userlocation = [];
        //        $scope.location = [];
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
        var userCallback = function(data, status) {
            console.log("before");
            console.log(data.userlocation);
            $scope.userlocation = data.userlocation;
            console.log("after");
            console.log($scope.appliance.userlocation);
        }
        Chats.getWholeUser($scope.user.id, userCallback);

        // ONE APPLIANCE    

        var getProduct = function(data, status) {
            console.log("product");
            console.log(data);
            $scope.appliancetype = data;
        }

        var getOneSuccess = function(data, status) {
            console.log("all appliance");
            console.log(data);
            $scope.appliance = data;
        }
        Chats.getOneAppliance($stateParams.id, getOneSuccess, getProduct);

        //ON PRODUCT CLICK
        $scope.toProduct = function(product) {
            console.log(product);
            $scope.appliance.appliancetype = product;
        }

        //ON LOCATION CLICK
        $scope.selectLocation = function(location) {
            for (var i = 0; i < $scope.userlocation.length; i++) {
                $scope.userlocation[i].tabactive = "";
            }
            location.tabactive = "activetab";
            $scope.tabvalue = 1;
            $scope.appliance.userlocation = location;
        }

        var locationSuccess = function(data, status) {
            console.log(data);
            updateApp();
        }
        $scope.addLocation = function() {
            $scope.location.user = $scope.user.id;
            Chats.addUserLocation($scope.location, locationSuccess);
        }

        var updateLocationSuccess = function(data, status) {
            updateApp();
            console.log(data);
		   $scope.oModal1.hide();
        }
        $scope.updateLocation = function() {
            delete $scope.appliance.userlocation["$$hashKey"];
            delete $scope.appliance.userlocation["tabactive"];
            console.log($scope.appliance.userlocation);

            Chats.updateUserLocation($scope.appliance.userlocation, updateLocationSuccess)
        }

        // TAB/HOME/EDIT PAGE END
        //UPDATE PURCHASE DETAILS
        var warrantySuccess = function(data, status) {
            console.log(data);
        }

        var storeSuccess = function(data, status) {
            console.log(data);
        }
        var purchasePriceSuccess = function(data, status) {
            console.log(data);
            $scope.changetab(3);
            updateApp();
        }
        $scope.purchaseprice = {};
        $scope.purchaseDetails = function() {
            $scope.store.appliance = $.jStorage.get("applianceid");
            $scope.store.id = $.jStorage.get("storeid");
            console.log($scope.store);
            $scope.warranty.appliance = $.jStorage.get("applianceid");
            console.log($scope.warranty);
            $scope.purchaseprice.appliance = $.jStorage.get("applianceid");
            console.log($scope.purchaseprice);
            Chats.createWarranty($scope.warranty, warrantySuccess);
            Chats.applianceStore($scope.store, storeSuccess);
            Chats.updatePurchasePrice($scope.purchaseprice, purchasePriceSuccess)
        }

        //toggle
        $scope.changetab = function(tab) {
            $scope.tabvalue = tab;
            if (tab == 2) {
                $scope.appliance.appliancetype = $scope.appliance.appliancetype.id;
                $scope.appliance.brand = $scope.appliance.brandid;
                //            $scope.appliance.store = $scope.appliance.store.id;
                $scope.appliance.user = $.jStorage.get("user").id;
                //            $scope.appliance.userlocation = $scope.appliance.userlocation.id;
                //            $scope.appliance.warranty = $scope.appliance.warranty.id;
                delete $scope.appliance.brandid;
                delete $scope.appliance.length;
                console.log($scope.appliance);
                Chats.createAppliance($scope.appliance, applianceCreate);
            }
        }
        var applianceCreate = function(data, status) {
            console.log(data);
            $.jStorage.set("applianceid", data[0]._id);
            $.jStorage.set("storeid", data[0].store);
        }
        $scope.changetab2 = function(tab) {
            $scope.tabvalue = tab;
            $scope.appliance.appliancetype = $scope.appliance.appliancetype.id;
            $scope.appliance.brand = $scope.appliance.brand.id;
            //            $scope.appliance.store = $scope.appliance.store.id;
            $scope.appliance.user = $scope.appliance.user.id;
            $scope.appliance.userlocation = $scope.appliance.userlocation.id;
            $scope.appliance.warranty = $scope.appliance.warranty.id;
            console.log($scope.appliance);
            //            Chats.createAppliance($scope.appliance, applianceCreate);
        }

        $scope.custom = false;
        $scope.toggleCustom = function() {
            $scope.custom = $scope.custom === false ? true : false;
        };

        $scope.tabvalue = 1;
        $scope.showreport = 1;

        $scope.sendtowebsite = function(website) {
            console.log(website);
            window.open('http://applions.blogspot.in/?m=1', '_blank');
        }

        $scope.compwarranty = {};
        //EDIT COMPONENT WARRANTY
        $scope.saveComponentWarranty = function() {
            $scope.compwarranty.appliance = $.jStorage.get("applianceid");
            console.log($scope.compwarranty);
            Chats.addComponentWarranty($scope.compwarranty, function(data, status) {
                if (data) {
                    $scope.oModal21.hide();
                    $scope.closecomponent();
                    $scope.compwarranty = {};
                    updateApp();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

        $scope.additionalwarranty = {};
        $scope.saveAdditionalWarranty = function() {
            $scope.additionalwarranty.appliance = $.jStorage.get("applianceid");
            console.log($scope.additionalwarranty);
            Chats.addAdditionalWarranty($scope.additionalwarranty, function(data, status) {
                console.log(data);
                if (data) {
                    $scope.closeModal();
                    $scope.additionalwarranty = {};
                    updateApp();
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Fail to Update Component Warranty",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

        function updateApp() {
            Chats.getOneAppliance($.jStorage.get("applianceid"), getOneSuccess);
        }

        $scope.additionalwarranty.includes = [];
        $scope.pushorpop = function(status, value) {
            console.log(status);
            console.log(value);
            if (status == true) {
                $scope.additionalwarranty.includes.push(value);
            } else if (status == false) {
                var popindex = $scope.additionalwarranty.includes.indexOf(value);
                $scope.additionalwarranty.includes.splice(popindex, 1);
            }
            console.log($scope.additionalwarranty.includes);
        }

        $ionicModal.fromTemplateUrl('templates/location.html', {
            id: '1',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal1 = modal;
        });
        //jagruti
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

        $ionicModal.fromTemplateUrl('templates/modal-component.html', {
            id: '9',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal9 = modal;
        });

        $scope.opencomponent = function() {
            $scope.oModal9.show();
        }
        $scope.closecomponent = function() {
            $scope.oModal9.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-compntwarranty.html', {
            id: '21',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal21 = modal;
        });

        $scope.opencompntwarranty = function() {
            $scope.oModal21.show();
        }
        $scope.closecompntwarranty = function() {
            $scope.oModal21.hide();
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


        $ionicModal.fromTemplateUrl('templates/modal-prevreports.html', {
            id: '12',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal12 = modal;
        });

        $scope.openprevreports = function() {
            $scope.oModal12.show();
        }
        $scope.closeprevreports = function() {
            $scope.oModal12.hide();
        };

        $ionicModal.fromTemplateUrl('templates/modal-sortbyservice.html', {
            id: '13',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal13 = modal;
        });

        $scope.opensortservice = function() {
            $scope.oModal13.show();
        }
        $scope.closesortservice = function() {
            $scope.oModal13.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-filterservice.html', {
            id: '14',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal14 = modal;
        });

        $scope.openfilterservice = function() {
            $scope.oModal14.show();
        }
        $scope.closefilterservice = function() {
            $scope.oModal14.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
            id: '15',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal15 = modal;
        });

        $scope.openbrandsearch = function() {
            $scope.oModal15.show();
        }
        $scope.closebrandsearch = function() {
            $scope.oModal15.hide();
        };
        $ionicModal.fromTemplateUrl('templates/modal-product.html', {
            id: '16',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal16 = modal;
        });

        $scope.openproductsearch = function() {
            $scope.oModal16.show();
        }
        $scope.closeproductsearch = function() {
            $scope.oModal16.hide();
        };
        $ionicModal.fromTemplateUrl('templates/notification.html', {
            id: '17',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal17 = modal;
        });

        $scope.opennotification = function() {
            $scope.oModal17.show();
        }
        $scope.closenotification = function() {
            $scope.oModal17.hide();
        };

        $ionicModal.fromTemplateUrl('templates/showwarranty.html', {
            id: '20',
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function(modal) {
            $scope.oModal20 = modal;
        });

        $scope.openwarranty = function() {
            $scope.oModal20.show();
        };

        $scope.closewarranty = function() {
            $scope.oModal20.hide();
        };

        $scope.searchproduct = function(productkeyword) {
            console.log(productkeyword);
            Chats.searchProduct(productkeyword, function(data, status) {
                console.log(data);
                if (data.value != "false") {
                    $scope.appliancetype = data;
                } else
                    $scope.appliancetype = {};
            });
        }
        //ON PRODUCT CLICK
        $scope.brands = {};
        $scope.toProduct = function(product) {
            console.log(product);
            $scope.appliance.appliancetype = product;
            $scope.appliance.appliancetype.id = product.id;
            $scope.closeproductsearch();
            Chats.findBrand(product.id, function(data, status) {
                console.log(data);
                if (data.value != "false")
                    $scope.brands = data;
                else
                    $scope.brands = {};
            });
        }

        $scope.toBrand = function(brand) {
            console.log(brand);
            $scope.appliance.brand = brand.name;
            $scope.appliance.brandid = brand._id;
            $scope.closebrandsearch();
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


.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $ionicPopup, $timeout, Chats, $location, $cordovaDevice) {


    $scope.user = [];

    document.addEventListener("deviceready", function() {

        var device = $cordovaDevice.getDevice();

        var cordova = $cordovaDevice.getCordova();

        var model = $cordovaDevice.getModel();

        var platform = $cordovaDevice.getPlatform();

        var uuid = $cordovaDevice.getUUID();

        var version = $cordovaDevice.getVersion();

        console.log(version);

    }, false);

    $scope.getdiv = function() {
        console.log($cordovaDevice.getDevice());
    }


    //        if(Chats.authenticate()=="true"){
    //            $location.url("tab/home");
    //        }

    var loginsuccess = function(data, status) {
        if (angular.isObject(data)) {
            Chats.jstorageUser(data);
            $location.url("tab/home");
        } else {
            var myPopup = $ionicPopup.show({
                title: data,
                scope: $scope,
            });
            $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 1500);
        }
    }

    $scope.userLogin = function() {
        console.log($scope.user);
        Chats.login($scope.user, loginsuccess);

    }
})

.controller('ProfileCtrl', function($scope, $ionicPopover, $ionicModal, Chats, $ionicPopup, $timeout) {

    //DEVELOPMENT STARTS

    $scope.profile = [];
    $scope.password = [];
    $scope.country = [];
    $scope.feedback = [];

    //GETCOUNTRY-------------------------

    Chats.getCountry(function(data, status) {
        $scope.country = data;
    });

    //GET USER DATA-----------------------);

    Chats.getProfileJson(function(data, status) {
        console.log(data);
        $scope.profile = data;
        $scope.feedback.email = data.email;
        $scope.feedback.name = data.name;
        $scope.feedback.id = data.id;
        $scope.profile.dob = new Date($scope.profile.dob);
    });

    //UPDATE PROFILE-----------------------

    $scope.updateProfile = function() {
        $scope.allvalidation = [{
            field: $scope.profile.email,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            console.log("validate");
            Chats.updateUser($scope.profile, function(data, status) {
                if (data) {
                    var myPopup = $ionicPopup.show({
                        title: "Profile Updated",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Enable To Update",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });

        }
    }

    //CHANGE PASSWORD--------------------

    $scope.changePassword = function() {
        $scope.allvalidation = [{
            field: $scope.password.password,
            validation: ""
        }, {
            field: $scope.password.editpassword,
            validation: ""
        }, {
            field: $scope.password.confpassword,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            if ($scope.password.editpassword === $scope.password.confpassword) {
                $scope.password.id = Chats.getUser().id;
                Chats.changePassword($scope.password, function(data, status) {
                    if (data) {
                        var myPopup = $ionicPopup.show({
                            title: "Feedback send Successfully",
                            scope: $scope,
                        });
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: "Enable to Send",
                            scope: $scope,
                        });
                    }
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                });
            } else {
                var myPopup = $ionicPopup.show({
                    title: "New password And Retype Password Should Be same",
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            }
        }
    }

    //SEND FEED BACK----------------------
    $scope.sendFeedback = function() {

        $scope.allvalidation = [{
            field: $scope.feedback.name,
            validation: ""
        }, {
            field: $scope.feedback.feedback,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            Chats.sendFeedback($scope.feedback, function(data, status) {
                if (data) {
                    var myPopup = $ionicPopup.show({
                        title: "Feedback send Successfully",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                } else {
                    var myPopup = $ionicPopup.show({
                        title: "Enable to Send",
                        scope: $scope,
                    });
                    $timeout(function() {
                        myPopup.close(); //close the popup after 3 seconds for some reason
                    }, 1500);
                }
            });
        }

    }

    //DEVELOPMENT ENDS


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

    $ionicModal.fromTemplateUrl('templates/modal-existing.html', {
        id: '5',
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.oModal5 = modal;
    });

    $scope.openexisting = function() {
        $scope.oModal5.show();
    }
    $scope.closeexisting = function() {
        $scope.oModal5.hide();
    };
})

.controller('StoreCtrl', function($scope) {})

.controller('AboutCtrl', function($scope) {})

.controller('RegisterCtrl', function($scope, $ionicSlideBoxDelegate, $ionicPopup) {

    $scope.user = [];

    console.log("login ctrl");
    $scope.userLogin = function() {
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


.controller('AppwizardCtrl', function($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.Modal = modal;
    });

    $scope.openbrandsearch = function() {
        console.log("in ctrl");
        $scope.Modal.show();
    }
    $scope.closebrandsearch = function() {
        $scope.Modal.hide();
    };

});