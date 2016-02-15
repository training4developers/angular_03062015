module.exports = function(app) {

	const
		fs = require("fs"),
		widgets = JSON.parse(fs.readFileSync("widgets.json"));

	app.get("/api/widgets", function(req, res) {
		res.json(widgets);
	});

	app.post("/api/widgets", function(req, res) {
		
		res.json(widgets);
	});

	app.get("/api/widgets/:widgetId", function(req, res) {
		res.json(widgets.filter(function(widget) {
			return widget.id === req.params.widgetId;
		})[0]);
	});

	app.put("/api/widgets/:widgetId", function(req, res) {

	});

	app.delete("/api/widgets/:widgetId", function(req, res) {

	});

	return app;

};
