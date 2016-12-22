var http = require("http");            //提供web服务  
var url = require("url");            //解析GET请求  
var query = require("querystring");    //解析POST请求

//服务
var server = function(request,response){
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.writeHead(200,{"Content-Type":"text/json"});
    var text = url.parse(request.url, true).query.text;
    console.log(text);
	var req = http.get("http://192.168.0.200:9001/?text="+encodeURI(text), function(resp){
		resp.setEncoding('utf8');
    	resp.on('data',function(chunk){
        	var returnData = JSON.parse(chunk);//如果服务器传来的是json字符串，可以将字符串转换成json
            response.write(chunk);
            response.end();
    	});
	});
}



//开启服务在127.0.0.1:8080
http.createServer(server).listen(8080);  
console.log("Server start!");  