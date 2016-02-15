module.exports = function(app) {

	"use strict";

	const widgets = JSON.parse(require("fs").readFileSync("widgets.json"));

	let lastWidgetId = widgets[widgets.length-1].id;

	function getWidgetIndex(widgetId) {
		return widgets.indexOf(widgets.filter((widget) => widget.id === req.params.widgetId)[0]);
	}

	app.get("/api/widgets", function(req, res) {
		try {
			res.json(widgets);
		} catch(err) {
			res.error(err.message);
		}
	});

	app.post("/api/widgets", function(req, res) {
		try {
			let widget = req.body;
			widget.id = ++lastWidgetId;
			widgets.push(widget)
			res.json({
				widgetId: widget.id
			});
		} catch(err) {
			res.error(err.message);
		}
	});

	app.get("/api/widgets/:widgetId", function(req, res) {
		try {
			res.json(widgets.filter(function(widget) {
				return widget.id === parseInt(req.params.widgetId, 10);
			})[0]);
		} catch(err) {
			res.error(err.message);
		}
	});

	app.put("/api/widgets/:widgetId", function(req, res) {
		try {
			widgets.splice(getWidgetIndex(parseInt(req.params.widgetId, 10)), 1, req.body);
		} catch(err) {
			res.error(err.message);
		}
	});

	app.delete("/api/widgets/:widgetId", function(req, res) {
		try {
			widgets.splice(getWidgetIndex(parseInt(req.params.widgetId, 10)), 1);
		} catch(err) {
			res.error(err.message);
		}
	});

	return app;
};
