var adminurl = "http://192.168.2.22:1337/";

angular.module('starter.services', [])

.factory('Chats', function($http) {
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
  },{
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

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    login: function(user, callback) {
        $http.get(adminurl + "user/login?email="+user.email+"&password="+user.password,{}).success(callback);
    },
    getOneAppliance: function(id, callback, callback2) {
        $http.get(adminurl + "appliance?id="+id,{}).success(callback);
        $http.get(adminurl + "appliancetype",{}).success(callback2);
    },
    getWholeUser: function(id, callback) {
        $http.get(adminurl + "user?id="+id,{}).success(callback);
    },
    updateAppliance: function(data, callback) {
        $http.put(adminurl + "appliance/"+data.id,data).success(callback);
    },
    searchProduct: function(data, callback) {
        $http.post(adminurl + "appliancetype/searchproduct",{params:data}).success(callback);
    },
    updateWarranty: function(data, callback) {
        $http.post(adminurl + "warranty/updatewarranty",{params:data}).success(callback);
    },
    addUserLocation: function(data, callback) {
        $http.get(adminurl + "userlocation/addlocation",{params:data}).success(callback);
    },
    updateUserLocation: function(data, callback) {
        $http.get(adminurl + "userlocation/updatelocation",{params:data}).success(callback);
    },
    getAppliance: function(callback) {
        $http.get(adminurl + "appliance",{}).success(callback);
    },
    jstorageUser: function(user) {
        $.jStorage.set("user",user);
    },
    getUser: function() {
        return $.jStorage.get("user");
    },
    authenticate: function() {
        if($.jStorage.get("user")!=null){
            return "true";
        }else{
            return "false";
        }
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});
