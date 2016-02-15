"use strict";

const
	path = require("path"),
	fs = require("fs"),
	url = require("url"),
	http = require("http"),
	options = JSON.parse(fs.readFileSync("config.json")),
	app = require("./widget-routes")(require("./http-helper")(options.webServer));

process.on("uncaughtException", function(err) {
	console.log(`Caught exception: ${err}`);
});

http.createServer(app).listen(options.webServer.port, function(err) {

	if (err) {
		console.dir(err);
		return;
	}

	console.log(`web server started on port ${options.webServer.port}`);

});
