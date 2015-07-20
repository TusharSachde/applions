// var adminurl = "http://localhost/syncbackend/index.php/welcome/";
var appliancestore = angular.module('appliancestore', []);

appliancestore.factory('applianceStore', function ($http) {

    var returnval = {};

    

     var db = openDatabase('books', '1.0', 'Books Database', 2 * 1024 * 1024);




    db.transaction(function (tx) {
        tx.executeSql('CREATE TABLE IF NOT EXISTS BOOKS (id INTEGER PRIMARY KEY, name,date)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS HORSES (id INTEGER PRIMARY KEY, name,book,total)');
        tx.executeSql('CREATE TABLE IF NOT EXISTS BETS (id  INTEGER PRIMARY KEY, book,favorite,backlay,stake,odds,timestamp)');
        
         

        
        //        tx.executeSql('INSERT INTO BETS (id, book,favorite,backlay,stake,odds) VALUES (1,1,2,2,0.3,100)');

        //            tx.executeSql('SELECT last_insert_rowid()',callback);
        //            getlast();
        //            tx.executeSql('SELECT last_insert_rowid()', [], function (tx, results) {
        //                console.log(results.rows.item(0));
        //                });
    });
    returnval.query = function (querystr, callback) {
        //        console.log(querystr);
        db.transaction(function (tx) {
            tx.executeSql(querystr, [], function (tx, results) {
                var len = results.rows.length;
                if (callback) {
                    callback(results.rows, len, results);
                }
            }, function (tx, error) {
                console.log(error);

            });
        });
    };

    return returnval;
});