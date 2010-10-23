var
  sys = require('util'),
  couchdb = require('couchdb'),
  client = couchdb.createClient(5984, 'localhost'),
  db = client.db('my-db');

db
  .saveDoc('my-doc', {awesome: 'couch fun'}, function(er, ok) {
    if (er) throw new Error(JSON.stringify(er));
    sys.puts('Saved my first doc to the couch!');
  });

db
  .getDoc('my-doc', function(er, doc) {
    if (er) throw new Error(JSON.stringify(er));
    sys.puts('Fetched my new doc from couch:');
    sys.p(doc);
  });

