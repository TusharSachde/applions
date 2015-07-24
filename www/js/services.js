//var adminurl = "http://192.168.2.11:1337/";
var adminurl = "http://104.154.90.138/";
var imgpath = adminurl + "user/resize?file=";
angular.module('starter.services', [])

.factory('Chats', function ($http) {
    // Might use a resource here that returns a JSON array





    //     var db = openDatabase('books', '1.0', 'Books Database', 2 * 1024 * 1024);
    //
    //
    //
    //
    //    db.transaction(function (tx) {
    //        tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id INTEGER PRIMARY KEY, name,date)');
    //        tx.executeSql('CREATE TABLE IF NOT EXISTS HORSES (id INTEGER PRIMARY KEY, name,book,total)');
    //        tx.executeSql('CREATE TABLE IF NOT EXISTS BETS (id  INTEGER PRIMARY KEY, book,favorite,backlay,stake,odds,timestamp)');
    //        
    //         
    //
    //        
    //        //        tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds) VALUES (1,1,2,2,0.3,100)');
    //
    //        //            tx.executeSql('SELECT last_insert_rowid()',callback);
    //        //            getlast();
    //        //            tx.executeSql('SELECT last_insert_rowid()', [], function (tx, results) {
    //        //                console.log(results.rows.item(0));
    //        //                });
    //    });

    // Some fake testing data
    var chats = [{
        id: 0,
        name: 'Ben Sparrow',
        lastText: 'You on your way?',
        face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
    }, {
        id: 1,
        name: 'Max Lynx',
        lastText: 'Hey, it\'s me',
        face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
    }, {
        id: 2,
        name: 'Adam Bradleyson',
        lastText: 'I should buy a boat',
        face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
    }, {
        id: 3,
        name: 'Perry Governor',
        lastText: 'Look at my mukluks!',
        face: 'https://pbs.twimg.com/profile_images/491995398135767040/ie2Z_V6e.jpeg'
    }, {
        id: 4,
        name: 'Mike Harrington',
        lastText: 'This is wicked good ice cream.',
        face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
    }];

    var allapplion = [{
        appliance: "Mobile 2",
        brandname: "",
        covered: false
    }, {
        appliance: "Television",
        brandname: "",
        covered: false
    }, {
        appliance: "Music System",
        brandname: "",
        covered: false
    }, {
        appliance: "DVD Player",
        brandname: "",
        covered: false
    }, {
        appliance: "Camera",
        brandname: "",
        covered: false
    }, {
        appliance: "Laptop",
        brandname: "",
        covered: false
    }, {
        appliance: "Computer",
        brandname: "",
        covered: false
    }, {
        appliance: "AC",
        brandname: "",
        covered: false
    }, {
        appliance: "Refrigerator",
        brandname: "",
        covered: false
    }, {
        appliance: "Washing M/C",
        brandname: "",
        covered: false
    }, {
        appliance: "Microwave",
        brandname: "",
        covered: false
    }, {
        appliance: "Mixer Grinder",
        brandname: "",
        covered: false
    }, {
        appliance: "Gyser",
        brandname: "",
        covered: false
    }, {
        appliance: "Fan",
        brandname: "",
        covered: false
    }];

    return {
        all: function () {
            return chats;
        },
        allapplions: function (callback) {
            $http.get(adminurl + "appliancetype/findallproducts", {}).success(callback);
        },
        remove: function (chat) {
            chats.splice(chats.indexOf(chat), 1);
        },
        login: function (user, callback) {
            $http.post(adminurl + "user/login", user).success(callback);
        },
        getOneAppliance: function (id, callback) {
            $http.post(adminurl + "appliance/findbyid", {
                "id": id
            }).success(callback);
        },
        getProduct: function (callback2) {
            $http.get(adminurl + "appliancetype", {}).success(callback2);
        },
        getWholeUser: function (callback) {
            $http.get(adminurl + "user?id=" + $.jStorage.get("user").id, {}).success(callback);
        },
        createAppliance: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "appliance/createappliance", data).success(callback);
        },
        updateAppliance: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "appliance/updateappliance", {
                "id": data.id,
                "appliancetype": data.appliancetype.id,
                "brand": data.brand._id,
                "name": data.name,
                "modelnumber": data.modelnumber,
                "serialnumber": data.serialnumber,
                "userlocation": data.userlocation.id
            }).success(callback);
        },
        updateBill: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "appliance/updateappliance", {
                "id": data.appliance,
                "bill": data.bill
            }).success(callback);
        },
        updateWarrantycard: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "appliance/updateappliance", {
                "id": data.appliance,
                "warrantycard": data.warrantycard
            }).success(callback);
        },
        createUser: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "user/createuser", data).success(callback);
        },
        searchmail: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "user/searchmail", {"email":data}).success(callback);
        },
        deleteAppliance: function (data, callback) {
            $http.delete(adminurl + "appliance/" + data).success(callback);
        },
        searchProduct: function (data, callback) {
            $http.post(adminurl + "appliancetype/searchproduct", {
                params: data
            }).success(callback);
        },
        applianceStore: function (data, callback) {
            //            if(data.createdAt){
            //                delete data.createdAt;
            //                delete data.updatedAt;
            //                delete data.id;
            //            }
            $http.post(adminurl + "store/createstore", data).success(callback);
        },
        createWarranty: function (data, callback) {
            $http.post(adminurl + "warranty/createwarranty", {
                "appliance": data.appliance,
                "purchasedate": data.purchasedate,
                "billno": data.billno
            }).success(callback);
        },
        updateWarranty: function (data, callback) {
            if (data.id) {
                console.log("updated");
                $http.post(adminurl + "warranty/updatewarranty", {
                    "purchasedate": data.purchasedate,
                    "billno": data.billno,
                    "id": data.id
                }).success(callback);
            } else {
                console.log("created");
                $http.post(adminurl + "warranty/createwarranty", {
                    "purchasedate": data.purchasedate,
                    "billno": data.billno,
                    "appliance": $.jStorage.get("applianceid")
                }).success(callback);
            }
        },
        updateWarrantyWar: function (data, callback) {
            if (data.id) {
                console.log("updated");
                $http.post(adminurl + "warranty/updatewarranty", {
                    "period": data.period,
                    "type": data.type,
                    "id": data.id
                }).success(callback);
            } else {
                console.log("created");
                $http.post(adminurl + "warranty/createwarranty", {
                    "period": data.period,
                    "type": data.type,
                    "appliance": $.jStorage.get("applianceid")
                }).success(callback);
            }

        },
        updateComponentWarranty: function (data, callback) {
            delete data.$$hashKey;
            delete data.createdAt;
            delete data.updatedAt;
            console.log(data);
            $http.post(adminurl + "componentwarranty/updatecomponent", data).success(callback);
        },
        updateAddtionalWarranty: function (data, callback) {
            delete data.$$hashKey;
            delete data.createdAt;
            delete data.updatedAt;
            console.log(data);
            $http.post(adminurl + "warranty/updatewarranty", data).success(callback);
        },
        addUserLocation: function (data, callback) {
            $http.get(adminurl + "userlocation/addlocation", {
                params: data
            }).success(callback);
        },
        addComponentWarranty: function (data, callback) {
            $http({
                url: adminurl + "componentwarranty/createcw",
                method: "POST",
                data: {
                    "appliance": data.appliance,
                    "component": data.component,
                    "serial": data.serial,
                    "startdate": data.startdate,
                    "warrantyperiod": data.warrantyperiod
                }
            }).success(callback);

        },
        addAdditionalWarranty: function (data, callback) {
            $http({
                url: adminurl + "warranty/createwarranty",
                method: "POST",
                data: {
                    "appliance": data.appliance,
                    "billno": data.billno,
                    "contact": data.contact,
                    "period": data.period,
                    "purchasedate": data.purchasedate,
                    "purchasedfrom": data.purchasedfrom,
                    "purchaseprice": data.purchaseprice,
                    "includes": data.includes,
                    "iswarrantyoramc": data.covertype
                }
            }).success(callback);

        },
        sendFeedback: function (data, callback) {
            $http({
                url: adminurl + "feedback/createfeed",
                method: "POST",
                data: {
                    "id": data.id,
                    "name": data.name,
                    "email": data.email,
                    "feedback": data.feedback
                }
            }).success(callback);

        },
        updateUserLocation: function (data, callback) {
            $http.get(adminurl + "userlocation/updatelocation", {
                params: data
            }).success(callback);
        },
        getAppliance: function (callback) {
            $http.post(adminurl + "appliance/getappliance", {
                "user": $.jStorage.get("user").id
            }).success(callback);
        },
        jstorageUser: function (user) {
            $.jStorage.set("user", user);
        },
        getUser: function () {
            return $.jStorage.get("user");
        },
        authenticate: function () {
            if ($.jStorage.get("user") != null) {
                return "true";
            } else {
                return "false";
            }
        },
        get: function (chatId) {
            for (var i = 0; i < chats.length; i++) {
                if (chats[i].id === parseInt(chatId)) {
                    return chats[i];
                }
            }
            return null;
        },
        getmybrands: function (data, callback) {
            $http.post(adminurl + "brand/findname", {
                "name": data
            }).success(callback);
        },
        getProfileJson: function (callback) {
            //            $http.get("json/profile.json", data).success(callback);
            $http.get(adminurl + "user?id=" + $.jStorage.get('user').id, {}).success(callback);
        },
        updateUser: function (data, callback) {
            delete data.userlocation;
            delete data.password;
            data.country = data.country.id;
            console.log(data);
            $http.post(adminurl + "user/updateuser", data).success(callback);
        },
        changeArchive: function (data, callback) {
            console.log(data);
            //            $http.get(adminurl + "appliance/updateappliance", {params:data}).success(callback);
            $http({
                url: adminurl + "appliance/updateappliance",
                method: "POST",
                data: {
                    "id": data.id,
                    "status": data.status
                }
            }).success(callback);
        },
        getCountry: function (callback) {
            $http.post("json/country.json").success(callback);
        },
        changePassword: function (data, callback) {
            delete data.confpassword;
            $http.post(adminurl + "user/changepassword", {
                "id": $.jStorage.get("user").id,
                "password": data.password,
                "editpassword": data.editpassword
            }).success(callback);
        },
        searchProduct: function (data, callback) {
            $http({
                url: adminurl + "appliancetype/searchproduct",
                method: "POST",
                data: {
                    "name": data
                }
            }).success(callback);
        },
        findBrand: function (data, callback) {
            $http({
                url: adminurl + "brand/findbrand",
                method: "POST",
                data: {
                    "appliancetype": data
                }
            }).success(callback);
        },
        updatePurchasePrice: function (data, callback) {
            $http({
                url: adminurl + "appliance/updateappliance",
                method: "POST",
                data: {
                    "id": data.appliance,
                    "purchaseprice": data.purchaseprice
                }
            }).success(callback);
        },
        searchbrand: function (data, callback) {
            $http({
                url: adminurl + "brand/searchbrand",
                method: "POST",
                data: {
                    "name": data
                }
            }).success(callback);
        },
        firstAppliance: function (data, callback) {
            console.log(data);
            $http.post(adminurl + "appliance/firstappliance", data).success(callback);
        },
        searchbrandbyid: function (name, id, callback) {
            $http({
                url: adminurl + "brand/findlikebrand",
                method: "POST",
                data: {
                    "name": name,
                    "appliancetype": id
                }
            }).success(callback);
        },
        updateProductWarranty: function (data, callback) {
            $http.post(adminurl + "warranty/updatewarranty", data).success(callback);
        }
    };
});