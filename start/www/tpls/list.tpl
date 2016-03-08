<table class="table table-striped">
	<thead>
		<tr>
			<th>Name</th>
			<th>Color</th>
			<th>Size</th>
			<th>Quantity</th>
			<th>Action</th>
		</tr>
	</thead>
	<tbody>
		<tr ng-repeat="widget in widgets">
			<td>{{widget.name}}</td>
			<td>{{widget.color}}</td>
			<td>{{widget.size}}</td>
			<td>{{widget.quantity}}</td>
			<td>
				<a ui-sref="view({ widgetId: widget.id })">View</a>
				|
				<a ui-sref="edit({ widgetId: widget.id })">Edit</a>
			</td>
		</tr>
	</tbody>
</table>
<button ng-click="createWidget()">Create New Widget</button>
