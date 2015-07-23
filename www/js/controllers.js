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

.controller('HomeCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams, $location, $ionicLoading) {

    // TAB/HOME PAGE START
    if (!$.jStorage.get("user")) {
        $location.url("/login");
    }

    $scope.appliance = [];
    $scope.newappliance = [];

    console.log("in home ctrl");

    var applianceSuccess = function(data, status) {
        console.log(data);
        $scope.appliance = data;
        _.forEach($scope.appliance, function(n, key) {
            Chats.getOneAppliance(n._id, function(data, status) {
                console.log(data);
                if (data.days) {
                    if (data.days <= 0) {
                        data.appliancecolor = "assertive-bg";
                    } else if (data.days <= 300) {
                        data.appliancecolor = "yellow-bg";
                    } else {
                        data.appliancecolor = "balanced-bg";
                    }
                } else {
                    data.appliancecolor = "assertive-bg";
                }
                $scope.newappliance.push(data);
                console.log($scope.newappliance);
            });
        });
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
        $ionicLoading.hide();
    }
    $scope.deleteappliance = function(appid) {
        Chats.deleteAppliance(appid, applianceDelete);
        $ionicLoading.show({
            content: 'Deleting Applions',
            animation: 'fade-in',
            showBackdrop: true,
            maxWidth: 200,
            showDelay: '0'
        });
    }

})
    .controller('HomeEditCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams, $cordovaImagePicker, $cordovaFileTransfer, $ionicLoading) {

        // TAB/HOME/EDIT PAGE STARt
        $scope.appliance = [];
        $scope.appliancetype = [];
        $scope.userlocation = [];
        $scope.location = [];
        $scope.warranty = [];
        $scope.warranty.purchasedate = new Date();
        $scope.store = [];
        $scope.store.purchasedate = new Date();
        $scope.componentobj = [];
        $scope.componentobj.startdate = new Date();
        $scope.compwarranty = [];
        $scope.warrantyobj = [];
        $scope.additionalwarranty = {};
        $scope.additionalwarranty.includes = [];
        $scope.archive = [];
        $scope.documents = {};
        $scope.locationtb = 0;
        $scope.cover = [];
        $scope.readonly = true;
        $scope.locationtab = function(tb) {
            $scope.locationtb = tb;
        };

        $.jStorage.set("applianceid", $stateParams.id);

        var startLoading = function() {
            $ionicLoading.show({
                content: 'Deleting Applions',
                animation: 'fade-in',
                showBackdrop: true,
                maxWidth: 200,
                showDelay: '0'
            });
        }

        var stopLoading = function() {
            $ionicLoading.hide();
        }

        // SAVE ALL
        $scope.saveAll = function() {
            if ($scope.tabvalue == 1) {
                $scope.changetab2(2);
            }
        }

        startLoading();


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
            stopLoading();
            $scope.store.appliance = data.id;
            $scope.store = data.store;
            $scope.compwarranty.appliance = data.id;
            console.log($scope.compwarranty);
            if (data.store) {
                $scope.store.purchaseprice = data.store.purchaseprice;
            }
            if (!$scope.appliance.userlocation) {
                $scope.appliance.userlocation = [];
                $scope.appliance.userlocation.name = '';
            }
            if (!$scope.appliance.appliancetype) {
                $scope.appliance.appliancetype.name = '';
            }

            if ($scope.appliance.days) {
                if ($scope.appliance.days <= 0) {
                    $scope.appliancecolor = "assertive-bg";
                } else if ($scope.appliance.days <= 300) {
                    $scope.appliancecolor = "yellow-bg";
                } else {
                    $scope.appliancecolor = "balanced-bg";
                }
            } else {
                $scope.appliancecolor = "assertive-bg";
            }

            if (data.store) {
                $scope.store.purchasedate = new Date($scope.store.purchasedate);
            }
            //            console.log($scope.warranty);
            if (data.warranty.length != 0) {
                $scope.readonly = false;
                $scope.warranty = data.warranty[data.warranty.length - 1];
                //                $scope.warranty.purchasedate = new Date($scope.warranty.purchasedate);
                if ($scope.warranty.expiry) {
                    $scope.warranty.expiry = new Date($scope.warranty.expiry);
                }
                console.log($scope.warranty);
            }

            $scope.toProduct($scope.appliance.appliancetype);
        }
        Chats.getOneAppliance($stateParams.id, getOneSuccess);

        function updateApp() {
            Chats.getOneAppliance($stateParams.id, getOneSuccess);
            startLoading();
        }

        Chats.allapplions(getProductSuccess);

        //ON PRODUCT CLICK
        $scope.brands = [];
        $scope.toProduct = function(product) {
            console.log(product);
            $scope.appliance.appliancetype = product;
            $scope.appliance.appliancetype.id = product.id;
            $scope.closeproductsearch();
            Chats.findBrand(product.appliancetypeid, function(data, status) {
                console.log(data);
                if (data.value != "false")
                    $scope.brands = data;
                else
                    $scope.brands = {};
            });
        }

        //ON LOCATION CLICK
        $scope.selectLocation = function(location) {
            $scope.locationtb = 0;
            for (var i = 0; i < $scope.userlocation.length; i++) {
                $scope.userlocation[i].tabactive = "";
            }
            location.tabactive = "activetab";
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
            $scope.oModal1.hide();
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
            console.log($scope.warranty);
            $scope.allvalidation = [{
                field: $scope.store.purchasedate,
                validation: ""
            }, {
                field: $scope.store.billno,
                validation: ""
            }, {
                field: $scope.store.name,
                validation: ""
            }, {
                field: $scope.store.purchaseprice,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.purchaseprice.appliance = $stateParams.id;
                $scope.purchaseprice.purchaseprice = $scope.store.purchaseprice;
                Chats.updatePurchasePrice($scope.purchaseprice, function(data, status) {
                    updateApp();
                    $scope.changetab(3);
                });

                //                Chats.updateWarranty($scope.warranty, warrantySuccess);
                Chats.applianceStore($scope.store, storeSuccess);
            }
        }


        $scope.updateWarrantytab = function(tab) {
            console.log($scope.warranty);
            $scope.allvalidation = [{
                field: $scope.warranty.period,
                validation: ""
            }, {
                field: $scope.warranty.type,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                Chats.updateWarrantyWar($scope.warranty, function(data, status) {
                    console.log(data);
                });
                $scope.changetab(4);
            }

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
        $scope.additionalwarrantyadd = {};
        $scope.additionalwarrantyadd.includes = [];

        $scope.saveAdditionalWarranty = function() {
            $scope.additionalwarrantyadd.appliance = $stateParams.id;
            console.log($scope.additionalwarrantyadd);
            Chats.addAdditionalWarranty($scope.additionalwarrantyadd, function(data, status) {
                console.log(data);
                if (data) {
                    $scope.closeModal();
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
            $scope.cover = [];
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

        //        
        $scope.pushorpop = function(status, value) {
            console.log(status);
            console.log(value);
            console.log($scope.cover);
            if (status == true) {
                //			  if(!$scope.additionalwarranty.includes){
                //				  $scope.additionalwarranty.includes=[];
                $scope.additionalwarranty.includes.push(value);
                //			  }else{
                //                $scope.additionalwarranty.includes.push(value);
                //			  }
            } else if (status == false) {
                var popindex = $scope.additionalwarranty.includes.indexOf(value);
                $scope.additionalwarranty.includes.splice(popindex, 1);
            }
            console.log($scope.additionalwarranty.includes);
        }
        $scope.pushorpopadd = function(status, value) {
            console.log(status);
            console.log(value);
            console.log($scope.cover);
            if (status == true) {
                $scope.additionalwarrantyadd.includes.push(value);
            } else if (status == false) {
                var popindex = $scope.additionalwarrantyadd.includes.indexOf(value);
                $scope.additionalwarrantyadd.includes.splice(popindex, 1);
            }
            console.log($scope.additionalwarrantyadd.includes);
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
        $scope.getproductbrands = function(brandname) {
            console.log(brandname);
            Chats.searchbrandbyid(brandname, $scope.appliance.appliancetype.appliancetypeid, function(data, status) {
                console.log(data);
                $scope.brands = data;
            })
        }


        //toggle
        $scope.changetab = function(tab) {
            console.log(tab);
            $scope.tabvalue = tab;
        }
        var applianceUpdate = function(data, status) {
            console.log(data);
        }
        $scope.changetab2 = function(tab) {

            $scope.allvalidation = [{
                field: $scope.appliance.appliancetype.name,
                validation: ""
            }, {
                field: $scope.appliance.name,
                validation: ""
            }, {
                field: $scope.appliance.userlocation.name,
                validation: ""
            }];
            var check = formvalidation($scope.allvalidation);
            if (check) {
                console.log("validate");
                Chats.updateAppliance($scope.appliance, function(data, status) {
                    if (data) {
                        var myPopup = $ionicPopup.show({
                            title: "Appliance Updated",
                            scope: $scope,
                        });
                        $timeout(function() {
                            myPopup.close(); //close the popup after 3 seconds for some reason
                        }, 1500);
                        $scope.tabvalue = tab;
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

        $scope.compwarid = '';
        $scope.cameraimage = '';
        var uploadBillSuccess = function(result) {
            console.log(result);
            console.log($scope.compwarid);
            $scope.documents.appliance = $.jStorage.get("applianceid");
            $scope.documents.id = $.jStorage.get("compwarid");
            $scope.documents.bill = result.files[0].fd;
            console.log($scope.documents);
            Chats.updateComponentWarranty($scope.documents, function(data, status) {
                console.log(data);
            })
        }
        $scope.uploadBill = function() {
            console.log("take picture");
            $cordovaImagePicker.getPictures(options).then(function(resultImage) {
                // Success! Image data is here
                console.log("here in upload image");
                console.log(resultImage);
                $scope.cameraimage = resultImage[0];
                $scope.uploadPhoto(adminurl + "user/uploadfile", uploadBillSuccess);

            }, function(err) {
                // An error occured. Show a message to the user
            });
        };
        var uploadWarrantySuccess = function(result) {
            console.log(result);
            $scope.documents.appliance = $.jStorage.get("applianceid");
            $scope.documents.id = $.jStorage.get("compwarid");
            $scope.documents.warrantycard = result.files[0].fd;
            console.log($scope.documents);
            Chats.updateComponentWarranty($scope.documents, function(data, status) {
                console.log(data);
            })
        }
        $scope.uploadwarrantycard = function() {
            console.log("take picture");
            $cordovaImagePicker.getPictures(options).then(function(resultImage) {
                // Success! Image data is here
                console.log("here in upload image");
                console.log(resultImage);
                $scope.cameraimage = resultImage[0];
                $scope.uploadPhoto(adminurl + "user/uploadfile", uploadWarrantySuccess);

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

        $scope.storewarid = function(warid) {
            console.log(JSON.parse(warid));
            warid = JSON.parse(warid);
            $scope.documents.bill = warid.bill;
            $scope.documents.warrantycard = warid.warrantycard;
            console.log($scope.documents);
            $.jStorage.set("compwarid", warid.id);
            $scope.showimages = 1;
        }

        var applianceDelete = function(data, status) {
            console.log(data);
            $scope.closedelete();
        }
        $scope.deleteappliance = function() {
            Chats.deleteAppliance($stateParams.id, applianceDelete);
        }


        $scope.toBrand = function(brand) {
            console.log(brand);
            $scope.appliance.brand = brand;
            $scope.closebrandsearch();
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
            $scope.additionalwarranty = {};
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
            console.log($scope.cover);
            console.log(warranty.includes);
            _.forEach(warranty.includes, function(n, key) {
                switch (n) {
                    case "services":
                        $scope.cover.service = true;
                        break;
                    case "others":
                        $scope.cover.others = true;
                        break;
                    case "parts":
                        $scope.cover.parts = true;
                        break;
                    case "visit free":
                        $scope.cover.free = true;
                        break;
                    default:
                }
            });
            $scope.additionalwarranty = warranty;
            if (!$scope.additionalwarranty.includes) {
                $scope.additionalwarranty.includes = [];
            }
            $scope.additionalwarranty.purchasedate = new Date($scope.additionalwarranty.purchasedate);
            $scope.oModal20.show();
        };

        $scope.closewarranty = function() {
            $scope.cover = [];
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

        $scope.getproductbrands = function(brandname) {
            console.log(brandname);
            Chats.searchbrandbyid(brandname, $scope.appliance.appliancetype.appliancetypeid, function(data, status) {
                console.log(data);
                $scope.brands = data;
            })
        }


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

        $scope.searchproduct("");


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

.controller('AddappCtrl', function($scope, $ionicModal, $ionicPopup, $timeout, Chats, $stateParams, $cordovaImagePicker,

    $cordovaFileTransfer, $ionicLoading) {

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
    $scope.documents = {};

    $scope.locationtab = function(tb) {
        $scope.locationtb = tb;
    };

    //validate user
    $scope.user = Chats.getUser();

    // ONE USER
    var userCallback = function(data, status) {
        $scope.userlocation = data.userlocation;
    }
    Chats.getWholeUser(userCallback);

    $scope.getproductbrands = function(brandname) {
        console.log(brandname);
        Chats.searchbrandbyid(brandname, $scope.appliance.appliancetype.appliancetypeid, function(data, status) {
            console.log(data);
            $scope.brands = data;
        })
    }

    //ON PRODUCT CLICK
    $scope.toProduct = function(product) {
        console.log(product);
        $scope.appliance.appliancetype = product;
    }

    //ON LOCATION CLICK
    $scope.selectLocation = function(location) {

        $scope.locationtb = 0;
        for (var i = 0; i < $scope.userlocation.length; i++) {
            $scope.userlocation[i].tabactive = "";
        }
        location.tabactive = "activetab";
        $scope.appliance.userlocation = location;
    }

    var locationSuccess = function(data, status) {
        console.log(data);
        Chats.getWholeUser(userCallback);
    }
    $scope.addLocation = function() {
        $scope.location.user = $scope.user.id;
        Chats.addUserLocation($scope.location, locationSuccess);
    }

    var updateLocationSuccess = function(data, status) {
        //        updateApp();
        console.log(data);
        $scope.oModal1.hide();
    }
    $scope.updateLocation = function() {
        delete $scope.appliance.userlocation["$$hashKey"];
        delete $scope.appliance.userlocation["tabactive"];
        console.log($scope.appliance);

        Chats.updateUserLocation($scope.appliance.userlocation, updateLocationSuccess)
    }

    // TAB/HOME/EDIT PAGE END
    //UPDATE PURCHASE DETAILS
    var warrantySuccess = function(data, status) {
        console.log(data);
        $.jStorage.set("productwarranty", data.id);
        updateApp();
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
        var check = false;
        $scope.allvalidation = [{
            field: $scope.store.purchasedate,
            validation: ""
        }, {
            field: $scope.store.billno,
            validation: ""
        }, {
            field: $scope.store.name,
            validation: ""
        }, {
            field: $scope.purchaseprice.purchaseprice,
            validation: ""
        }];

        var check = formvalidation($scope.allvalidation);

        if (check) {
            $scope.store.appliance = $.jStorage.get("applianceid");
            $scope.store.id = $.jStorage.get("storeid");
            $scope.warranty.appliance = $.jStorage.get("applianceid");
            $scope.purchaseprice.appliance = $.jStorage.get("applianceid");
            //            Chats.createWarranty($scope.warranty, warrantySuccess);
            Chats.applianceStore($scope.store, storeSuccess);
            Chats.updatePurchasePrice($scope.purchaseprice, purchasePriceSuccess)
        }
    }

    //toggle
    $scope.appliance.appliancetype = [];
    $scope.appliance.appliancetype.name = '';
    $scope.appliance.userlocation = [];
    $scope.appliance.userlocation.name = '';
    $scope.changetab = function(tab) {
        if (tab == 2) {
            var check = false;
            $scope.allvalidation = [{
                field: $scope.appliance.appliancetype.name,
                validation: ""
            }, {
                field: $scope.appliance.brand,
                validation: ""
            }, {
                field: $scope.appliance.name,
                validation: ""
            }, {
                field: $scope.appliance.userlocation.name,
                validation: ""
            }];

            var check = formvalidation($scope.allvalidation);
            if (check) {
                $scope.appliance.appliancetype = $scope.appliance.appliancetype.id;
                $scope.appliance.brand = $scope.appliance.brandid;
                $scope.appliance.user = $.jStorage.get("user").id;
                $scope.appliance.userlocation = $scope.appliance.userlocation.id;
                console.log($scope.appliance);
                Chats.createAppliance($scope.appliance, applianceCreate);
                $scope.tabvalue = tab;
            }
        } else if (tab == 4) {
            updateApp();
            $scope.tabvalue = tab;
        } else {
            $scope.tabvalue = tab;
        }
    }
    $scope.productwarranty = {};
    $scope.updateProductWarranty = function(productwarranty) {
        var check = false;
        $scope.allvalidation = [{
            field: $scope.productwarranty.period,
            validation: ""
        }, {
            field: $scope.productwarranty.type,
            validation: ""
        }];

        var check = formvalidation($scope.allvalidation);

        if (check) {
            console.log(productwarranty);
            $scope.productwarranty.id = $.jStorage.get("productwarranty");
            $scope.productwarranty.appliance = $.jStorage.get("applianceid");
            Chats.updateProductWarranty($scope.productwarranty, function(data, status) {
                console.log(data);
                $scope.changetab(4);
            })
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
    $scope.additionalwarranty.includes = [];
    $scope.saveAdditionalWarranty = function() {
        $scope.additionalwarranty.appliance = $.jStorage.get("applianceid");
        console.log($scope.additionalwarranty);
        Chats.addAdditionalWarranty($scope.additionalwarranty, function(data, status) {
            if (data) {
                $scope.closeModal();
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
    $scope.editAdditionalWarranty = function() {
        $scope.additionalwarranty.appliance = $scope.appliance.id;
        Chats.updateAddtionalWarranty($scope.additionalwarranty, function(data, status) {
            console.log(data);
            if (data) {
                updateApp();
                $scope.closewarranty();
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

    var getOneSuccess = function(data, status) {
        console.log(data);
        $scope.appliance = data;
        $scope.warranty = data.warranty[data.warranty.length - 1];
        $scope.store.appliance = data.id;
        $scope.store = data.store;
        $scope.compwarranty.appliance = data.id;
        $scope.store.purchaseprice = data.purchaseprice;
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


    //UPLOAD DOCUMENTS
    var options = {
        maximumImagesCount: 1,
        width: 800,
        height: 800,
        quality: 80
    };

    $scope.compwarid = '';


    $scope.cameraimage = '';
    var uploadBillSuccess = function(result) {
        console.log(result);
        console.log($scope.compwarid);
        $scope.documents.appliance = $.jStorage.get("applianceid");
        $scope.documents.id = $.jStorage.get("compwarid");
        $scope.documents.bill = result.files[0].fd;
        console.log($scope.documents);
        Chats.updateComponentWarranty($scope.documents, function(data, status) {
            console.log(data);
        })
    }
    $scope.uploadBill = function() {
        console.log("take picture");
        $cordovaImagePicker.getPictures(options).then(function(resultImage) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(resultImage);
            $scope.cameraimage = resultImage[0];
            $scope.uploadPhoto(adminurl + "user/uploadfile", uploadBillSuccess);

        }, function(err) {
            // An error occured. Show a message to the user
        });
    };

    var uploadWarrantySuccess = function(result) {
        console.log(result);
        $scope.documents.appliance = $.jStorage.get("applianceid");
        $scope.documents.id = $.jStorage.get("compwarid");
        $scope.documents.warrantycard = result.files[0].fd;
        console.log($scope.documents);
        Chats.updateComponentWarranty($scope.documents, function(data, status) {
            console.log(data);
        })
    }
    $scope.uploadwarrantycard = function() {
        console.log("take picture");
        $cordovaImagePicker.getPictures(options).then(function(resultImage) {
            // Success! Image data is here
            console.log("here in upload image");
            console.log(resultImage);
            $scope.cameraimage = resultImage[0];
            $scope.uploadPhoto(adminurl + "user/uploadfile", uploadWarrantySuccess);

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
    $scope.showimages = 0;
    $scope.storewarid = function(warid) {
        console.log(warid);
        $.jStorage.set("compwarid", warid);
        $scope.showimages = 1;
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

    $scope.openwarranty = function(warranty) {
        $scope.additionalwarranty = warranty;
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

    $scope.searchproduct("");

    //ON PRODUCT CLICK
    $scope.brands = {};
    $scope.toProduct = function(product) {
        console.log(product);
        $scope.appliance.appliancetype = product;
        $scope.appliance.appliancetype.id = product.id;
        $scope.closeproductsearch();
        Chats.findBrand(product.appliancetypeid, function(data, status) {
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
            template: '<div class="text-center"><h2 class="ion-checkmark-round balanced round-circle"></h2><p>Appliance has been update successfully!! < /p>',
            title: 'Alert!',
            scope: $scope,
        });
        $timeout(function() {
            myPopup.close(); //close the popup after 3 seconds for some reason
        }, 2000);
    }
})


.controller('LoginCtrl', function($scope, $ionicModal, $ionicPopup, $ionicPopup, $timeout, Chats, $location, $cordovaDevice) {


    $scope.user = {};

    //    document.addEventListener("deviceready", function() {
    //
    //        var device = $cordovaDevice.getDevice();
    //
    //        var cordova = $cordovaDevice.getCordova();
    //
    //        var model = $cordovaDevice.getModel();
    //
    //        var platform = $cordovaDevice.getPlatform();
    //
    //        var uuid = $cordovaDevice.getUUID();
    //
    //        var version = $cordovaDevice.getVersion();
    //
    //        console.log(version);
    //
    //    }, false);
    //
    //    $scope.getdiv = function() {
    //        console.log($cordovaDevice.getDevice());
    //    }

    document.addEventListener("deviceready", onDeviceReady, false);

    function onDeviceReady() {
        console.log(device);
        $.jStorage.set("deviceinfo", device);
    }

    //        if(Chats.authenticate()=="true"){
    //            $location.url("tab/home");
    //        }

    var loginsuccess = function(data, status) {
        if (angular.isObject(data)) {
            console.log(data);
            Chats.jstorageUser(data);
            $location.url("/appwizards");
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

.controller('RegisterCtrl', function($scope, $ionicSlideBoxDelegate, $ionicPopup, Chats, $timeout, $location) {

    $scope.user = {};

    console.log("login ctrl");
    $scope.register = function() {
        $scope.allvalidation = [{
            field: $scope.user.email,
            validation: ""
        }, {
            field: $scope.user.password,
            validation: ""
        }, {
            field: $scope.user.cpassword,
            validation: ""
        }];
        var check = formvalidation($scope.allvalidation);
        if (check) {
            if ($scope.user.password != $scope.user.cpassword) {
                var myPopup = $ionicPopup.show({
                    title: "Password Didn't Match",
                    scope: $scope,
                });
                $timeout(function() {
                    myPopup.close(); //close the popup after 3 seconds for some reason
                }, 1500);
            } else {
                Chats.searchmail($scope.user.email, function(data, status) {
                    console.log(data);
                    if (data.value == false) {
                        delete $scope.user.cpassword;
                        Chats.createUser($scope.user, function(data, status) {
                            if (data.id) {
                                Chats.jstorageUser(data);
                                $location.url("/appwizards");
                            } else {
                                var myPopup = $ionicPopup.show({
                                    title: "User Was Not Created",
                                    scope: $scope,
                                });
                                $timeout(function() {
                                    myPopup.close(); //close the popup after 3 seconds for some reason
                                }, 1500);
                            }
                        });
                    } else {
                        var myPopup = $ionicPopup.show({
                            title: "User With Same Email Already Exist",
                            scope: $scope,
                        });
                        $timeout(function() {
                            myPopup.close(); //close the popup after 3 seconds for some reason
                        }, 1500);
                    }
                });

            }
        }
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


.controller('AppwizardCtrl', function($scope, $ionicModal, Chats, $location) {
    $ionicModal.fromTemplateUrl('templates/modal-brand.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function(modal) {
        $scope.Modal = modal;
    });

    $scope.brandindex = '';
    $scope.openbrandsearch = function(appname, index) {
        $.jStorage.set("prodid", appname);
        $scope.brandindex = index;
        Chats.getmybrands(appname, function(data, status) {
            console.log(data);
            $scope.brands = data;
        })
        console.log("in ctrl");
        $scope.Modal.show();
    }
    $scope.closebrandsearch = function() {
        $scope.Modal.hide();
    };

    $scope.getproductbrands = function(brandname) {
        console.log(brandname);
        Chats.searchbrandbyid(brandname, $.jStorage.get("prodid"), function(data, status) {
            console.log(data);
            $scope.brands = data;
        })
    }

    $scope.deviceinfo = $.jStorage.get("deviceinfo");
    $scope.deviceinfo.covered = false;
    console.log($scope.deviceinfo);

    if ($scope.deviceinfo && $scope.deviceinfo.manufacturer) {
        Chats.searchbrand($scope.deviceinfo.manufacturer, function(data, status) {
            console.log(data);
            $scope.deviceinfo.brandid = data[0].id;
        });
    }


    Chats.allapplions(function(data, status) {
        console.log(data);
        $scope.allapplions = data;
        for (var i = 0; i < $scope.allapplions.length; i++) {
            if ($scope.allapplions[i].name == "Mobile Phones") {
                $scope.deviceinfo.appliancetype = $scope.allapplions[i].id;
            }
            $scope.allapplions[i].covered = false;
        }
    });

    $scope.iscreated = 0;
    $scope.tobecreated = 1;

    var applianceCreate = function(data, status) {
        console.log(data);
        if (data.value == "true")
            $scope.iscreated++;
        console.log($scope.iscreated);
        if ($scope.tobecreated == $scope.iscreated) {
            $location.url("/tab/home");
        }
    }
    $scope.makeappliances = function() {
        for (var i = 0; i < $scope.allapplions.length; i++) {
            if ($scope.allapplions[i].brandname) {
                $scope.tobecreated++;
            }
        }
        console.log($scope.tobecreated);

        console.log($scope.allapplions);
        for (var i = 0; i < $scope.allapplions.length; i++) {
            if ($scope.allapplions[i].brandname) {
                $scope.makeappliances = {
                    "user": $.jStorage.get("user").id,
                    "name": $scope.allapplions[i].name,
                    "appliancetype": $scope.allapplions[i].id,
                    "brand": $scope.allapplions[i].brandid,
                    "iscovered": $scope.allapplions[i].covered
                };
                Chats.firstAppliance($scope.makeappliances, applianceCreate);
            }
        }

        console.log($scope.deviceinfo);
        if ($scope.deviceinfo) {
            $scope.makeappliances = {
                "user": $.jStorage.get("user").id,
                "name": "This Mobile",
                "appliancetype": $scope.deviceinfo.appliancetype,
                "brand": $scope.deviceinfo.brandid,
                "iscovered": $scope.deviceinfo.covered
            };
            console.log($scope.makeappliances);
            Chats.firstAppliance($scope.makeappliances, applianceCreate);
        }
    };

    $scope.toBrand = function(brand) {
        console.log(brand);
        $scope.allapplions[$scope.brandindex].brandname = brand.name;
        $scope.allapplions[$scope.brandindex].brandid = brand._id;
        $scope.closebrandsearch();
    }
});