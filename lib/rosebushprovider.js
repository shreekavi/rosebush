var couchdb = require('couchdb');
Tweet = function(){};
RoseBushProvider = function(host, port) {
  this.client = couchdb.createClient(port, host),
  this.db = this.client.db('rosebush');
};

//getCollection

RoseBushProvider.prototype.getCollection= function(callback) {
this.db.allDocs(descending='true', function(er, ok){
    if (er) throw new Error(JSON.stringify(er));
    require('sys').puts('Fetched my new doc from couch:');
 });
};

RoseBushProvider.prototype.getSelectedViews = function(callback){
    var posts=[];
    this.db.view('show', 'bookinfo', {}, function(err, res) {
        if(!err) {
               res.rows.forEach(function(row) {
               tweet = new Tweet();
               tweet.user_id =(row.value.user_id);
               tweet.author = (row.value.author);
               tweet.message = (row.value.message);
               posts.push(tweet);
            });
            callback(null, posts);
        }

     });
};

RoseBushProvider.prototype.save = function(tweets, callback){
    var tweet = null;
    if( typeof(tweets.length)=="undefined")
    tweets = [tweets];

};


//findAll
RoseBushProvider.prototype.findAll = function(callback) {
    this.getCollection(function(error, tweet_collection) {
      if( error ) callback(error)
      else {
        tweet_collection.find(function(error, cursor) {
          if( error ) callback(error)
          else {
            cursor.toArray(function(error, results) {
              if( error ) callback(error)
              else callback(null, results)
            });
          }
        });
      }
    });
};


exports.RoseBushProvider = RoseBushProvider;

var roseBushProvider = new RoseBushProvider('localhost', 5984);

