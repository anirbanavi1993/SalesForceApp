var express = require('express');
var app = express();
var swig = require('swig');
var path = require('path');
var jsforce = require('jsforce');
var cors = require('cors');

app.use(express.static(__dirname + '/views'));

/*app.use(function(req, res, next) {
  //res.header("Access-Control-Allow-Origin", "*");
  res.setHeader('Access-Control-Allow-Origin', 'https://login.salesforce.com');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  //res.setHeader('Access-Control-Allow-Headers', 'x-requested-with,content-type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
}); */

app.use(cors({origin: 'https://login.salesforce.com'}));
/*app.engine('html', swig.renderFile);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');*/

/*var conn = new jsforce.Connection();
conn.login('anirbanavi1993@gmail.com','Password5$rSjyNc47CS5af0BaKSkmkdbdW',function(err,res){
	if(err) console.log('Error = '+err);
	conn.query('select id,name from account limit 4',function(err,res){
		if(err) console.log('Error = '+err);
		console.log('Response='+JSON.stringify(res));
	});
	console.log('successfully logged in to salesforce');
});*/

var oauth2 = new jsforce.OAuth2({
  // you can change loginUrl to connect to sandbox or prerelease env.
  loginUrl : 'https://login.salesforce.com',
  clientId : '3MVG9ZL0ppGP5UrBwja9dImN2UHHYxbYwea.bz5tqwP_hOKEpgfV2jKHYY9dYndvjHeCqy3bd5uNu28PknV9U',
  clientSecret : '8316103672113126056',
  redirectUri : 'http://localhost:3000/requestCallBack'
  //redirectUri : 'https://ap6.salesforce.com/services/oauth2/callback'
});

app.get('/contact',function(req,res){
	console.log("received request for contact data");
	person1={
		name : 'John' ,
		email : 'test@test.com',
		phone : '5465151'
	};
	person2={
		name: 'Cena',
		email: 'test1@test.com',
		phone: '45612894'
	};
	person3={
		name: 'Pony',
		email: 'test1@test.com',
		phone: '4546513'
	};
	var contactlist = [person1,person2,person3];
	res.json(contactlist);
});

/*app.get('/authRedirect',function(req,res){
	console.log('request for redirection=');
	//res.header('Access-Control-Allow-Origin', "*");
	//var redirUrl = oauth2.getAuthorizationUrl({});
	var redirUrl = 'authRedirect';
	//res.redirect(oauth2.getAuthorizationUrl({}));
	//res.redirect(301,oauth2.getAuthorizationUrl({}));
	res.json(redirUrl);
});*/

app.get('/authred',function(req,res){
	console.log('authred');
	//res.redirect(oauth2.getAuthorizationUrl({}));
	//var targeturl = 'https://stackoverflow.com/questions/33483675/getting-express-server-to-accept-cors-request';
	//res.redirect('/con');
	var redirUrl = oauth2.getAuthorizationUrl({});
	res.json(redirUrl);
});

app.get('/requestCallBack',function(req,res){
	console.log('inside /oauth2/callback');
	var conn = new jsforce.Connection({ oauth2 : oauth2 });
	var code = req.param('code');
	conn.authorize(code, function(err, userInfo) {
	    if (err) { return console.error(err); }
	    // Now you can get the access token, refresh token, and instance URL information.
	    // Save them to establish connection next time.
		console.log(conn.accessToken);
	    console.log(conn.refreshToken);
	    console.log(conn.instanceUrl);
	    console.log("User ID: " + userInfo.id);
	    console.log("Org ID: " + userInfo.organizationId);
	    
	});

});

app.listen(3000);
console.log("Server running successfully !");
