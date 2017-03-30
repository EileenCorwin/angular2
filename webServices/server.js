var express = require('express');
var sql = require("mssql");
var app = express();

// CORS settings
var cors = require('cors');
app.use(cors());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/mediatypes', function (req, res, next) {
console.log("mediatypes is calling");   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'nodejs',
        password: 'nodejs',
        server: 'localhost',
        options: {database: 'MyReply'} 
        };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
        request.query('select * from mediatype', function (err, recordset) {
            
			if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        }); //end of request.query
		
		// sql.close();
		
    }); //end of sql.connect

    // sql.close();

}); //end of sql.connect


app.get('/mediasources/:mediaTypeId', function (req, res, next) {

console.log("mediasources is calling"); 
console.log("id = : ", req.params.mediaTypeId);  
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'nodejs',
        password: 'nodejs',
        server: 'localhost',
        options: {database: 'MyReply'} 
        };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
       var mysql = "select * from mediasource where mediaTypeId = " + req.params.mediaTypeId;
        request.query(mysql, function (err, recordset) {
        // request.query('select * from mediasource', function (err, recordset) {
            
			if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        }); //end of request.query
		
		// sql.close();
		
    }); //end of sql.connect

    // sql.close();


}); // end app.get


app.get('/categories', function (req, res, next) {
console.log("categories is calling");   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'nodejs',
        password: 'nodejs',
        server: 'localhost',
        options: {database: 'MyReply'} 
        };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
        request.query('select * from category', function (err, recordset) {
            
			if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        }); //end of request.query
        
    }); //end of sql.connect

    // sql.close();

}); //end of sql.connect

app.get('/replies', function (req, res, next) {
console.log("replies is calling");   
    var sql = require("mssql");

    // config for your database
    var config = {
        user: 'nodejs',
        password: 'nodejs',
        server: 'localhost',
        options: {database: 'MyReply'} 
        };

    // connect to your database
    sql.connect(config, function (err) {
        if (err) console.log(err);

        // create Request object
        var request = new sql.Request();
        
        // query to the database and get the records
        request.query('select * from reply', function (err, recordset) {
            
			if (err) console.log(err);

            // send records as a response
            res.send(recordset);
            
        }); //end of request.query
        
    }); //end of sql.connect

    // sql.close();

}); //end of sql.connect


/* Error message processing */
var server = app.listen(8081, function () {
    console.log('Server is running on port 8081..');
}); //end of listening
