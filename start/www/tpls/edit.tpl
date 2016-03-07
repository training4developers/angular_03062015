<form novalidate>

	<div>
		<label>
			Name: <input ng-model="widget.name">
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

</form>
