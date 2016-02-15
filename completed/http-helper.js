module.exports = function(options) {

	"use strict";

	const
		DEFAULT_ENCODING = "UTF-8",
		CONTENT_TYPES = {
			".txt": "text/plain",
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
		RESOURCE_PATHS = ["/css", "/js", "/tpls", "/fonts"],
		HTTP_METHOD_GET = "GET",
		HTTP_METHOD_POST = "POST",
		HTTP_METHOD_PUT = "PUT",
		HTTP_METHOD_DELETE = "DELETE";

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

			return new Promise((resolve, reject) => {

				try {

					let req = {
						method: httpRequest.method,
						contentType: httpRequest.headers["content-type"],
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

				  if ([HTTP_METHOD_POST,HTTP_METHOD_PUT].indexOf(req.method) === -1) {
						resolve(req);
						return;
					}

					let requestBodyBuffers = [];

			    httpRequest.on('data', function(chunk) {
						requestBodyBuffers.push(new Buffer(chunk));
			    });

					httpRequest.on('error', function(err) {
						req.err = err;
						reject(req);
			    });

			    httpRequest.on('end', function() {

						try {

							req.rawBody = Buffer.concat(requestBodyBuffers);

							if (req.contentType === CONTENT_TYPES[".json"]) {
								req.body = JSON.parse(req.rawBody.toString());
							}

							resolve(req);

						} catch(err) {
							req.err = err;
							reject(req);
						}

			    });

				} catch(err) {
					req.err = err;
					reject(req);
				}

			});

		}

		_staticFile(httpRequest, httpResponse) {
			httpResponse.setHeader("Content-Type", CONTENT_TYPES[path.extname(httpRequest.fileName)] || "text/plain");
			fs.readFile(httpRequest.fileName, DEFAULT_ENCODING, (err, data) => {
				httpResponse.end(data, DEFAULT_ENCODING);
			});
		}

		_sendResponse(httpRequestPromise, httpResponse) {

			httpResponse.json = function(obj) {
				this.setHeader("Content-Type", CONTENT_TYPES[".json"]);
				this.end(JSON.stringify(obj), DEFAULT_ENCODING);
			};

			httpResponse.error = function(statusMessage, statusCode) {
				this.writeHead(statusCode || 500, statusMessage);
				this.end();
			};

			httpRequestPromise.then(function(httpRequest) {

				if (httpRequest.routes.length > 0) {
					httpRequest.params = httpRequest.routes[0].params;
					httpRequest.routes[0].handler(httpRequest, httpResponse);
				} else {
					this._staticFile(httpRequest, httpResponse);
				}

			}).catch(function(httpRequest) {
				httpResponse.writeHead(500, "Internal Server Error");
				httpResponse.end();
			});
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
