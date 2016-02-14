module.exports = function(options) {

	"use strict";

	const
		DEFAULT_ENCODING = "UTF-8";

	const
		path = require("path"),
		fs = require("fs"),
		url = require("url");

	options = Object.assign({
		defaultFileName: "index.html"
	}, options);

	return class HttpHelper {

		constructor(httpRequest, httpResponse) {
			this._httpRequest = httpRequest;
			this._httpResponse = httpResponse;
			this._processRequest()
		}

		_processRequest() {

			this._url = url.parse(this._httpRequest.url);
			this.req = {};

			this.req.fileName = path.join(options.folder, this._url.path === "/" ?
				options.defaultFileName : this._url.path.slice(1));

			switch (path.extname(this.req.fileName)) {
				case ".css":
					this.req.contentType = "text/css";
					break;
				case ".js":
					this.req.contentType = "text/javascript";
					break;
				case ".html":
					this.req.contentType = "text/html";
					break;
				default:
					this.req.contentType = "text/plain";
					break;
			}
			
		}

		sendFile() {
			this._httpResponse.setHeader("Content-Type", this.req.contentType);
			fs.readFile(this.req.fileName, DEFAULT_ENCODING, (err, data) => {
				this._httpResponse.end(data, DEFAULT_ENCODING);
			});
		}

	};

};
