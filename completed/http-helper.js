module.exports = function(options) {

	"use strict";

	const
		DEFAULT_ENCODING = "UTF-8",
		CONTENT_TYPES = {
			".css": "text/css",
			".js": "text/javascript",
			".html": "text/html",
			".eot": "application/vnd.ms-fontobject",
			".svg": "image/svg+xml",
			".ttf": "application/font-sfnt",
			".woff": "application/font-woff",
			".woff2": "application/font-woff2",
			".json": "application/json"
		},
		RESOURCE_PATHS = ["/css", "/js", "/tpls", "/fonts"];

	const
		path = require("path"),
		fs = require("fs"),
		url = require("url");

	options = Object.assign({
		defaultFileName: "index.html"
	}, options);

	class HttpHelper {

		constructor() {
			this._routes = [];
		}

		_isResource(urlPath) {
			for (let x=0; x<RESOURCE_PATHS.length; x++) {
				if (urlPath.startsWith(RESOURCE_PATHS[x])) {
					return true;
				}
			}
			return false;
		}

		_processRequest(httpRequest) {

			let req = {
				method: httpRequest.method,
				url: url.parse(httpRequest.url, true)
			};
			req.query = req.url.query;
			req.path = req.url.pathname;

			req.routes = this._routes.filter(function(route) {
				return (req.method === route.httpMethod) && (req.path.startsWith(route.urlPath));
			}).map(function(route) {
				return {
					params: {},
					handler: route.handler
				};
			});

			if (req.routes.length === 0) {
				if (req.isResource = this._isResource(req.path)) {
					req.fileName = path.join(options.folder, req.path === "/" ?
						options.defaultFileName : req.path.slice(1));
				} else {
					req.fileName = path.join(options.folder, options.defaultFileName);
				}
			}


		  if (req.method == 'POST') {
		    console.log("[200] " + req.method + " to " + req.path);

		    httpRequest.on('data', function(chunk) {
		      console.log("Received body data:");
		      console.log(chunk.toString());
		    });

		    httpRequest.on('end', function() {
		    });
			}

			return req;
		}

		_staticFile(httpRequest, httpResponse) {
			httpResponse.setHeader("Content-Type", CONTENT_TYPES[path.extname(httpRequest.fileName)] || "text/plain");
			fs.readFile(httpRequest.fileName, DEFAULT_ENCODING, (err, data) => {
				httpResponse.end(data, DEFAULT_ENCODING);
			});
		}

		_sendResponse(httpRequest, httpResponse) {

			httpResponse.json = function(obj) {
				this.setHeader("Content-Type", CONTENT_TYPES[".json"]);
				this.end(JSON.stringify(obj), DEFAULT_ENCODING);
			};

			if (httpRequest.routes.length > 0) {
				httpRequest.params = httpRequest.routes[0].params;
				httpRequest.routes[0].handler(httpRequest, httpResponse);
			} else {
				this._staticFile(httpRequest, httpResponse);
			}

		}

		registerRoute(httpMethod, urlPath, handler) {
			this._routes.push({
				httpMethod: httpMethod,
				urlPath: urlPath,
				handler: handler
			});
		}

		receiveRequest(httpRequest) {
			return {
				sendResponse: this._sendResponse.bind(this, this._processRequest(httpRequest))
			};
		}
	}

	let httpHelper = new HttpHelper();

	function requestListener(httpRequest, httpResponse) {
		httpHelper.receiveRequest(httpRequest).sendResponse(httpResponse);
	}

	requestListener.get = httpHelper.registerRoute.bind(httpHelper, "GET");
	requestListener.post = httpHelper.registerRoute.bind(httpHelper, "POST");
	requestListener.put = httpHelper.registerRoute.bind(httpHelper, "PUT");
	requestListener.delete = httpHelper.registerRoute.bind(httpHelper, "DELETE");

	return requestListener;
};
