const surveys = document.getElementById('surveys');

function appendBox (title) {
	const a = document.createElement('a');
	a.classList.add('box');
	a.innerText = title;
	a.href = '/survey?survey=' + title;
	surveys.appendChild(a);
}

ajax.request('GET', appURL + '/survey?survey=all', res => {
	for (let title of JSON.parse(res)) appendBox(title);
});