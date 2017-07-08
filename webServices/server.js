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
        options: {database: 'Reply'} 
};

app.get('/mediatypes', function (req, res, next) {
    // console.log("mediatypes is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, mediaTypeName from fGetMediaTypes(1) order by sortSeq')
                .then (function (recordset) {
                    // console.log("mediatypes = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect(
}); // end mediatypes      
            

app.get('/mediasources', function (req, res, next) {
    // console.log("mediasources is calling"); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, mediaSourceName, mediaTypeId from fGetMediaSources(1, 0) order by sortSeq')
                .then (function (recordset) {
                    // console.log("mediasources = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect
}); // end mediasources    


app.get('/mediasources/:mediaTypeId', function (req, res, next) {
    // console.log("mediasources is calling for id = : ", req.params.mediaTypeId); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        var mysql = "select id, mediaSourceName from fGetMediaSources(1, " + req.params.mediaTypeId + ") order by sortSeq"; 
        request.query(mysql)
                .then (function (recordset) {
                    // console.log("mediasources = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect
}); // end mediasources

app.get('/othermediasources', function (req, res, next) {
    // console.log("othermediasources is calling"); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, mediaSourceName, mediaTypeId from fGetOtherMediaSources(1, 0) order by mediaSourceName')
                .then (function (recordset) {
                    // console.log("othermediasources = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect
}); // end othermediasources    
    


app.get('/categories', function (req, res, next) {
    // console.log("categories is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, categoryName from fGetCategories(1) order by sortSeq')
                .then (function (recordset) {
                    // console.log("categories = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect(
}); // end categories      

app.get('/reporters', function (req, res, next) {
    // console.log("reporters is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, reporterName from fGetReporters(1) order by sortSeq')
                .then (function (recordset) {
                    // console.log("reporters = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect(
}); // end reporters

app.get('/otherreporters', function (req, res, next) {
    // console.log("otherreporters is calling"); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, reporterName from fGetOtherReporters(1) order by reporterName')
                .then (function (recordset) {
                    // console.log("otherreporters = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect
}); // end otherreporters      

//!!MAY NOT NEED
app.get('/subscribers', function (req, res, next) {
    // console.log("subscribers is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select id, subscriberName from fGetSubscribers(1) order by sortSeq')
                .then (function (recordset) {
                    // console.log("subscribers = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect(
}); // end subscribers      

app.get('/repliers', function (req, res, next) {
    // console.log("repliers is calling");

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);
        
        // query to the database and get the records
        request.query('select * from fGetRepliers(1) order by replierName')
                .then (function (recordset) {
                    // console.log("repliers = ", recordset);
                    res.send(recordset);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect(
}); // end repliers      

app.get('/replies', function (req, res, next) {
    // console.log("replies is calling");

    // console.log("mediaTypeId =", req.query.mediaTypeId );
    // console.log("mediaSourceId =", req.query.mediaSourceId );
    // console.log("otherMediaSourceId =", req.query.otherMediaSourceId );
    // console.log("reporterId =", req.query.reporterId );
    // console.log("otherReporterId =", req.query.otherReporterId );
    // console.log("title =", req.query.title );
    // console.log("articleDateFrom =", req.query.articleDateFrom );
    // console.log("articleDateTo =", req.query.articleDateTo );


    // console.log("categoryId =", req.query.categoryId );
    // console.log("replierId =", req.query.replierId );
    // console.log("subject =", req.query.subject ); 

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);

        var articleDateFrom = null;
        var articleDateTo = null;
        if (req.query.articleDateFrom) {articleDateFrom = new Date(req.query.articleDateFrom.substr(0, 15));}
        if (req.query.articleDateTo) {articleDateTo = new Date(req.query.articleDateTo.substr(0, 15));} 

        // if using SQL 2014 and regular individual inputs
        request.input('i_mediaTypeId', sql.NVarChar, req.query.mediaTypeId);
        request.input('i_mediaSourceId', sql.NVarChar, req.query.mediaSourceId);
        request.input('i_otherMediaSourceId', sql.NVarChar, req.query.otherMediaSourceId);
        request.input('i_reporterId', sql.NVarChar, req.query.reporterId);
        request.input('i_otherReporterId', sql.NVarChar, req.query.otherReporterId);
        request.input('i_title', sql.NVarChar, req.query.title);
        request.input('i_articleDateFrom', sql.DateTime, articleDateFrom);
        request.input('i_articleDateTo', sql.DateTime, articleDateTo);

        request.input('i_categoryId', sql.NVarChar, req.query.categoryId);
        request.input('i_replierId', sql.NVarChar, req.query.replierId);
        request.input('i_subject', sql.NVarChar, req.query.subject);
        
        // query to the database and get the records
        request.execute('pGetReplies')
                .then (function (recordsets, returnValue) {
                    // console.log("reply all= ", recordsets);
                    // console.log("reply 1= ", recordsets[0]);
                    // console.log("reply returnValue= ", recordsets.returnValue);
                    
                    res.send(recordsets[0]);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect    
}); // end replies

app.get('/reply/:replyId', function (req, res, next) {
    // console.log("reply/replyId is calling for id = : ", req.params.replyId);

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);

        // if using SQL 2014 and regular individual inputs
        request.input('i_replyId', sql.NVarChar, req.params.replyId);
        
        // query to the database and get the records
        request.execute('pGetReplyById')
                .then (function (recordsets, returnValue) {
                    // console.log("reply all= ", recordsets);
                    // console.log("reply 1= ", recordsets[0]);
                    // console.log("reply returnValue= ", recordsets.returnValue);
                    
                    // send first recordset and only one record in that recordset
                    res.send(recordsets[0][0]);
                    dbConn.close();
                })
                .catch(function (err) {
                    // console.log(err);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log(err);
        });
    }); // end dbConn.connect
}); // end reply/replyId      


app.post('/reply', function (req, res, next) {
    // console.log("reply is calling");
    console.log("req body:", req.body);

    var dbConn = new sql.Connection(config);

    // connect to your database
    dbConn.connect().then(function () {
        // create Request object
        var request = new sql.Request(dbConn);

        // if using SQL 2016 and Json input
        //request.input('i_JSON', sql.NVarChar(4000), JSON.stringify(myJson));

        var articleDate = new Date(req.body.articleDate);
        
        // if using SQL 2014 and regular individual inputs
        request.input('i_mediaTypeId', sql.Int, req.body.mediaTypeId);
        request.input('i_mediaSourceId', sql.Int, req.body.mediaSourceId);
        request.input('i_otherMediaSourceName', sql.NVarChar, req.body.otherMediaSourceName);
        request.input('i_title', sql.NVarChar, req.body.title);
        request.input('i_reporterId', sql.Int, req.body.reporterId);
        request.input('i_otherReporterName', sql.NVarChar, req.body.otherReporterName);
        request.input('i_articleDate', sql.DateTime, articleDate);
        request.input('i_articleURL', sql.NVarChar, req.body.articleURL);
        request.input('i_subscriberId', sql.Int, req.body.subscriberId);

        request.input('i_categoryId', sql.Int, req.body.categoryId);
        request.input('i_subject', sql.NVarChar, req.body.subject);
        request.input('i_replyText', sql.NVarChar, req.body.replyText);
        request.input('i_articleThumbsUpDown', sql.Int, req.body.articleThumbsUpDown);
        
        // !!not sure about retunrvalue

        // query to the database and get the records
        request.execute('pInsertReply')
                .then (function (recordsets, returnValue) {
                    // console.log("reply all= ", recordsets);
                    // console.log("reply 1= ", recordsets[0]);
                    // console.log("reply 2= ", recordsets[1]);
                    // console.log("reply returnValue= ", recordsets.returnValue);
                    
                    res.send(recordsets[0]);
                    dbConn.close();
                })
                .catch(function (err) {
                    var rs = {ReturnVal: -1, ReturnMsg: err}
                    // console.log("rs", rs);
                    res.send(rs);
                    dbConn.close();
                })
        .catch(function (err) {
            // console.log("catch2", err);
        });
    }); // end dbConn.connect(
}); // end reply   


/* LISTENING */
var server = app.listen(8081, function () {
    console.log('Server is running on port 8081..');
});
