var express = require('express');
var sql = require("mssql");
var bodyParser = require("body-parser");

var app = express();
app.use(bodyParser.json());

// CORS settings
var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

var config = {
        user: 'nodejs',
        password: 'nodejs',
        server: 'localhost',
        options: {database: 'MyReply'} 
};

//NEW GET
app.get('/mediatypes', function (req, res, next) {
    console.log("mediatypes is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select * from mediatype')
                .then (function (recordset) {
                    console.log("mediatypes = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect(
}); // end mediatypes      
            

app.get('/mediasources', function (req, res, next) {
    console.log("mediasources is calling"); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select * from mediasource')
                .then (function (recordset) {
                    console.log("mediasources = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect
}); // end mediasources    


// app.get('/mediasources', function (req, res, next) {
app.get('/mediasources/:mediaTypeId', function (req, res, next) {
    console.log("mediasources is calling for id = : ", req.params.mediaTypeId); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        var mysql = "select * from mediasource where mediaTypeId = " + req.params.mediaTypeId; 
        request.query(mysql)
                .then (function (recordset) {
                    console.log("mediasources = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect
}); // end mediasources    


app.get('/categories', function (req, res, next) {
    console.log("categories is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select * from category')
                .then (function (recordset) {
                    console.log("categories = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect(
}); // end categories      


// app.get('/replies', function (req, res, next) {
//     console.log("replies is calling");

//     var dbConn = new sql.Connection(config);

//     // connect to your database
//     dbConn.connect().then(function () {
//         // create Request object
//         var request = new sql.Request(dbConn);
        
//         // query to the database and get the records
//         request.query('select * from reply')
//                 .then (function (recordset) {
//                     console.log("replies = ", recordset);
//                     res.send(recordset);
//                     dbConn.close();
//                 })
//                 .catch(function (err) {
//                     console.log(err);
//                     dbConn.close();
//                 })
//         .catch(function (err) {
//             console.log(err);
//         });
//     }); // end dbConn.connect(
// }); // end replies      

app.get('/replies', function (req, res, next) {
    console.log("replies is calling");

    console.log("mediaTypeId =", req.query.mediaTypeId );
    console.log("mediaSourceId =", req.query.mediaSourceId );
    console.log("categoryId =", req.query.categoryId ); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);

         // if using SQL 2014 and regular individual inputs
        request.input('i_mediaTypeId', sql.NVarChar, req.query.mediaTypeId);
        request.input('i_mediaSourceId', sql.NVarChar, req.query.mediaSourceId);
        request.input('i_categoryId', sql.NVarChar, req.query.categoryId);
        
        // query to the database and get the records
        request.execute('pGetReplies')
                .then (function (recordsets, returnValue) {
                    console.log("reply all= ", recordsets);
                    console.log("reply 1= ", recordsets[0]);
                    // console.log("reply 2= ", recordsets[1]);
                    console.log("reply returnValue= ", recordsets.returnValue);
                    
                    // res.send(recordsets[0]);
                    res.send(recordsets[0]);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect    
}); // end replies      


app.post('/reply', function (req, res, next) {
    console.log("reply is calling");
    console.log("req body:", req.body);

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);

        // if using SQL 2016 and Json input
        //request.input('i_JSON', sql.NVarChar(4000), JSON.stringify(myJson));

        // if using SQL 2014 and regular individual inputs
        request.input('i_mediaTypeId', sql.Int, req.body.mediaTypeId);
        request.input('i_mediaSourceId', sql.Int, req.body.mediaSourceId);
        request.input('i_categoryId', sql.Int, req.body.categoryId);
        request.input('i_title', sql.NVarChar, req.body.title);
        request.input('i_reporter', sql.NVarChar, req.body.reporter);
        request.input('i_replyText', sql.NVarChar, req.body.replyText);
        
        // request.execute('pInsertReply', function (err, recordsets, returnValue) {
        // !!not sure about retunrvalue

        // query to the database and get the records
        request.execute('pInsertReply')
                .then (function (recordsets, returnValue) {
                    console.log("reply all= ", recordsets);
                    console.log("reply 1= ", recordsets[0]);
                    console.log("reply 2= ", recordsets[1]);
                    console.log("reply returnValue= ", recordsets.returnValue);
                    
                    // res.send(recordsets[0]);
                    res.send(recordsets[0]);
                    dbConn.close();
                })
                .catch(function (err) {
                    console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            console.log(err);
        });
    }); // end dbConn.connect(
}); // end reply   


/* LISTENING */
var server = app.listen(8081, function () {
    console.log('Server is running on port 8081..');
});
