<table>
	<thead>
		<tr>
			<th>Name</th>
			<th>Color</th>
			<th>Size</th>
			<th>Quantity</th>
		</tr>
	</thead>
	<tbody>
		<tr ng-repeat="widget in widgets">
			<td>{{widget.name}}</td>
			<td>{{widget.color}}</td>
			<td>{{widget.size}}</td>
			<td>{{widget.quantity}}</td>
		</tr>
	</tbody>
</table>
<button ng-click="createWidget()">Create New Widget</button>
