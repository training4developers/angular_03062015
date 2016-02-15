module.exports = function(options) {

	"use strict";

	const
		DEFAULT_FILE = "index.html",
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
		HTTP_METHOD_DELETE = "DELETE",
		HTTP_HEADER_CONTENT_TYPE = "content-type";

	const
		path = require("path"),
		fs = require("fs"),
		url = require("url");

	options = Object.assign({ defaultFileName: DEFAULT_FILE }, options);

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
						contentType: httpRequest.headers[HTTP_HEADER_CONTENT_TYPE],
						url: url.parse(httpRequest.url, true),
						params: {}
					};

					req.query = req.url.query;
					req.path = req.url.pathname;
					req.pathParts = req.path.slice(1).split("/")

					req.routes = this._routes.filter((route) => {

						if ((req.method !== route.httpMethod) || (route.pathParts.length !== req.pathParts.length)) {
							return false;
						}

						for (let i=0; i<route.pathParts.length; i++) {

							if (route.pathParts[i].startsWith(":")) {
								req.params[route.pathParts[i].slice(1)] = req.pathParts[i];
							} else {
								if (route.pathParts[i].toUpperCase() !== req.pathParts[i].toUpperCase()) {
									return false;
								}
							}

						}

						return true;

					}).map((route) => route.handler);

					if (req.routes.length === 0) {
						if (req.isResource = this._isResource(req.path)) {
							req.fileName = path.join(options.folder, req.path.slice(1));
						} else {
							if (options.html5Mode) {
								req.fileName = path.join(options.folder, options.defaultFileName);
							} else {
								req.fileName = path.join(options.folder, req.path === "/" ? options.defaultFileName : req.path.slice(1));
							}
						}
					}

				  if ([HTTP_METHOD_POST,HTTP_METHOD_PUT].indexOf(req.method) === -1) {
						resolve(req);
						return;
					}

					let requestBodyBuffers = [];

			    httpRequest.on('data', (chunk) => requestBodyBuffers.push(new Buffer(chunk)));

					httpRequest.on('error', (err) => {
						req.err = err;
						reject(req);
			    });

			    httpRequest.on('end', () => {

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
			httpResponse.setHeader(HTTP_HEADER_CONTENT_TYPE, CONTENT_TYPES[path.extname(httpRequest.fileName)] || CONTENT_TYPES[".txt"]);
			fs.readFile(httpRequest.fileName, DEFAULT_ENCODING, (err, data) => {
				httpResponse.end(data, DEFAULT_ENCODING);
			});
		}

		_sendResponse(httpRequestPromise, httpResponse) {

			httpResponse.json = function(obj) {
				this.setHeader(HTTP_HEADER_CONTENT_TYPE, CONTENT_TYPES[".json"]);
				this.end(JSON.stringify(obj), DEFAULT_ENCODING);
			};

			httpResponse.error = function(statusMessage, statusCode) {
				this.writeHead(statusCode || 500, statusMessage);
				this.end();
			};

			httpRequestPromise.then((httpRequest) => {

				if (httpRequest.routes.length > 0) {
					httpRequest.routes[0](httpRequest, httpResponse);
				} else {
					this._staticFile(httpRequest, httpResponse);
				}

			}).catch(function(err) {
				httpResponse.writeHead(500, "Internal Server Error");
				httpResponse.end();
			});
		}

		registerRoute(httpMethod, path, handler) {
			this._routes.push({
				httpMethod: httpMethod,
				path: path,
				pathParts: path.slice(1).split("/"),
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

	requestListener.get = httpHelper.registerRoute.bind(httpHelper, HTTP_METHOD_GET);
	requestListener.post = httpHelper.registerRoute.bind(httpHelper, HTTP_METHOD_POST);
	requestListener.put = httpHelper.registerRoute.bind(httpHelper, HTTP_METHOD_PUT);
	requestListener.delete = httpHelper.registerRoute.bind(httpHelper, HTTP_METHOD_DELETE);

	return requestListener;
};
