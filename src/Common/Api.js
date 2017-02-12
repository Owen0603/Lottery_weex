var stream = require('@weex-components');

var apiURL = {
	baseurl:'http:wwww.baidu.com',
	homePage:'/hp/bymonth/',
};

//基础方法
function getData(url, callback){
	stream.sendHttp({
		method:'GET',
		url:url
	},function(ret){
		var retdata = JSON.parse(ret);
		callback(retdata);
	});
}

//可供外部调用的方法
exports.getHomePage = function(data, callback){
	getData(apiURL.baseurl+apiURL.homePage+data, callback);
};