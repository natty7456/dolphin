var db    = {};  
//连接数据库
var mysql = require('mysql');

var connectstring = {
    host: 'localhost',
    user: 'root',
    password: 'root',
    database:'dolphin'
};

var connection = mysql.createConnection(connectstring);

connection.connect();
  
db.query = function(sql, callback){
  
    if (!sql) {  
        callback();  
        return;  
    } 

    connection.query(sql, function(err, rows, fields) {  
      if (err) {  
        console.log(err);  
        callback(err, null);  
        return;  
      };  
  
      callback(null, rows, fields);  
    });

    //关掉连续查询会报错
	//关闭连接
	// connection.end();
}  
module.exports = db;