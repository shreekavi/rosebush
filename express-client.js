var app = require('express').createServer();

app.get('/', function(req,res){
   res.render('index.html.haml', {
       layout: true,
       locals: {
           title: 'ROSEBUSH HOME'
       }
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

