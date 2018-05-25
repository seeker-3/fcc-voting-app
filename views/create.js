const items = document.getElementById('items');
var len = 2;
var titles;
ajax.request("GET", '/survey?survey=all', res => {
	titles = res;
});


document.getElementById('add').addEventListener('click', e => {
	const input = document.createElement('input');
	const label = document.createElement('label');
	const name = 'item:' + ++len;
	label.innerText = (label.for = (input.name = name));
	items.appendChild(label);
	items.appendChild(input);
});

function validate() {
	if (!titles){
		window.alert("page still loading");
		return false;
	}
	const inputs = document.getElementsByTagName('input');
	if (titles.includes(inputs[0].value)){
		window.alert("survey already exists");
		return false;
	}
	if (Array.from(inputs, i => i.value).includes("")) {
		window.alert("fields must be filled")
		return false;
	}
}
