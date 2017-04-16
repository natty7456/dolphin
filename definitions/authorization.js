// ================================================
// AUTHORIZATION
// ================================================

F.onAuthorize = function(req, res, flags, callback) {

	var cookie = req.cookie('username');

	if(cookie)
	{
		callback(true);
		return;
	}

	 var querystring = require('querystring');
	 if(req.uri.query == null)
	 {
	 	callback(false);
	 	return;
	 }

	 var parm = querystring.parse(req.uri.query);

	//如果密码正确则登录成功
	isrightpassword(parm.username,parm.password,function(flag){
		if(flag == true)
		{
			//加入cookie
			res.cookie('username', parm.username, '5 minutes');
			callback(true);
		}
		else
		{
			callback(false);
		}

	})

};

function isrightpassword(username,password,callback){
	var db = require('./mysqlhelper.js'); 
	var sql = "SELECT * FROM `user` WHERE username = '"+ username +"'";
	db.query(sql, function(err, rows, fields){  
	    if (err) {  
	        console.log(err);  
	        return;  
	    }

	    var newpassword = encoderbymd5(password);
	    var oldpassword = rows[0].password;

	    if(oldpassword == newpassword)
	    {
			callback(true);
	    }
	    else
	    {
	    	callback(false);
	    }
	}); 
}

// md5方式加密
function encoderbymd5 (text) {
	var crypto = require('crypto');
	return crypto.createHash('md5').update(text).digest('base64');
};