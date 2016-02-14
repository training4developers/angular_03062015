"use strict";

const
	path = require("path"),
	fs = require("fs"),
	url = require("url"),
	http = require("http"),
	options = JSON.parse(fs.readFileSync("config.json")),
	HttpHelper = require("./http-helper")(options.webServer);

http.createServer(function(req, res) {

	const
		httpHelper = new HttpHelper(req, res);

	httpHelper.sendFile();

}).listen(options.webServer.port, function(err) {

	if (err) {
		console.dir(err);
		return;
	}

	console.log("web server started on port " + options.webServer.port);

});
