exports.install = function() {
    // define routes with actions

 	//未认证跳转login页面
    F.route('/', '/pages/login',['unauthorize']);
    //退出登录
 	F.route('/logout/', logout, ['authorize']);   
    //已认证跳转首页页面
    F.route('/', 'index',['authorize']);

    F.route('/example', '/pages/example',['authorize']);
    F.route('/codestyle', '/pages/codestyle',['authorize']);
    F.route('/commonjs', '/pages/commonjs',['authorize']);      

}

function logout() {
	var self = this;
    self.res.cookie('username', '', '-1 year');
	self.redirect('/');
}