const items = document.getElementById('items');
var len = 2;


document.getElementById('add').addEventListener('click', e => {
	const input = document.createElement('input');
	const label = document.createElement('label');
	const name = 'item:' + ++len;
	label.innerText = (label.for = (input.name = name));
	items.appendChild(label);
	items.appendChild(input);
});