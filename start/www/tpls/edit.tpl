<form name="widgetForm" novalidate>
	<div>
		<label>
			Name: <input name="widgetName" ng-model="widget.name" required>
			<span ng-show="widgetForm.widgetName.$invalid &&
				widgetForm.widgetName.$touched">
				Name is required.
			</span>
		</label>
	</div>
	<div>
		<label>
			Description: <input ng-model="widget.description">
		</label>
	</div>
	<div>
		<label>
			Color: <input ng-model="widget.color">
		</label>
	</div>
	<div>
		<label>
			Size: <input ng-model="widget.size">
		</label>
	</div>
	<div>
		<label>
			Quantity: <input ng-model="widget.quantity">
		</label>
	</div>
	<button ng-click="saveWidget()">Save Widget</button>
	<button ng-click="deleteWidget()" ng-if="widget.id">Delete Widget</button>
	<button ng-click="returnToList()">Return to List</button>
</form>
