function createVoteElements(item) {
	const div = document.createElement('div');
	div.classList.add("item");
	const percentElm = document.createElement('span');
	percentElm.classList.add("precent");
	percentElm.innerText = item.percent;
	const span = document.createElement('span');
	span.innerText = "%";
	const voteElm = document.createElement('span');
	voteElm.classList.add("votes");
	voteElm.innerText = item.votes;
	const btn = document.createElement('button');
	btn.innerText = item.item;

	const br = () => document.createElement('br');
	div.appendChild(percentElm);
	div.appendChild(span);
	div.appendChild(br());
	div.appendChild(br());
	div.appendChild(voteElm);
	div.appendChild(br());
	div.appendChild(btn);

	addEvent(btn, voteElm);
	textElms.push({
		votes: voteElm,
		percent: percentElm,
	});
	return div;
}

function updatePercents() {
	const sum = textElms.reduce((acc, elm) => acc + +elm.votes.innerText, 0);
	textElms.forEach(obj => {
		obj.percent.innerText = sum
			? Math.round(obj.votes.innerText / sum * 100)
			: 0
	});
}

function updateDB(btn) {
	ajax.request('POST', `/survey?
		update=true
		&title=${document.title}
		&item=${btn.innerText}`,
		r => {});
}

function addEvent(btn, voteElm) {
	btn.addEventListener('click', function(e) {
		voteElm.innerText++;
		updatePercents();
		updateDB(this);
	});

}

var textElms = [];
const items = document.getElementById('items');
const url = new URL(window.location);
const req = url.pathname + '/?title=' + url.searchParams.get("survey");

ajax.request("GET", req, res => {
	res = JSON.parse(res);
	log(res.title);
	document.title = res.title;
	for (item of res.items) items.appendChild(createVoteElements(item));
});
