var sys = require('sys');
var express = require('express');
var app = require('express').createServer();

app.use(express.methodOverride());
app.use(express.bodyDecoder());
app.use(express.staticProvider(__dirname + '/public'));

var geoip = require('./lib/node-geoip/lib/geoip');
var dbpath = '/usr/local/share/GeoIP/GeoLiteCity.dat';
var ip = '216.236.135.152';


RoseBushProvider = require('./lib/rosebushprovider').RoseBushProvider;
var roseBushProvider = new RoseBushProvider();

app.post('/', function(req,res){
    console.log(req.body.title);
    console.log(req.body.isbnNumber);
    console.log(req.body.author);
    console.log(req.body.publisher);
    roseBushProvider.db.saveDoc({author: req.body.author,
            bids: 10,
            condition: 'new',
            created_on: new Date(),
            expected_price: req.body.expected_price,
            image: 'image_path',
            isbn: req.body.isbnNumber,
            location: req.body.location,
            message: req.body.message,
            op: 'buy',
            openbid: '1' ,
            product: 'book',
            publisher: req.body.publisher,
            status: 'open',
            title: req.body.title,
            updated_on: new Date(),
            user_id: 'shreekavi@gmail.com',
            views: 25

  }, function(er, ok) {
    if (er) throw new Error(JSON.stringify(er));
    require('sys').puts('Saved Document to DB < ROSEBUSH >!');
  });

    res.redirect('back');
});

app.get('/', function(req,res){
    var con = new geoip.Connection(dbpath, function(con) {
            con.query(ip, function(result) {
            sys.puts(result['city']);
            con.close();
            });
        });
       sys.puts(req.connection.remoteAddress);
       sys.puts(req.headers['x-forwarded-for']);
       var self = this;
       roseBushProvider.getSelectedViews(function(error, docs){
       res.render('index.html.haml', {
       layout: true,
       locals: {
           title: 'ROSEBUSH HOME',
           tweets: docs,
           tweet: new Tweet()
           }
       });
   });
});


app.get('/*.css', function(req,res){
  res.render('style.css.sass', { layout: false });

});

app.get('/profile', function(req,res){
  res.render('profile.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH Profile'
    }
  });
});

app.get('/account', function(req,res){
  res.render('account.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH account'
    }
  });
});

app.get('/help', function(req,res){
  res.render('help.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH Help'
    }
  });
});

app.get('/mybooks', function(req,res){
  res.render('mybooks.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH MyBooks'
    }
  });
});

app.get('/friends', function(req,res){
  res.render('friends.html.haml', {
    layout: true,
    locals: {
      title: 'ROSEBUSH Friends'
    }
  });
});



app.listen(21000);

