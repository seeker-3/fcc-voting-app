const btns = document.getElementsByTagName('button');
const votes = document.getElementsByClassName('votes');

for (var i = 0; i < btns.length; i++) {
	addEvent(btns[i], votes[i]);
}

function addEvent(btn, voteElm) {
	btn.addEventListener('click', function(e) {
		checkUser(this);
	});
}

function checkUser(btn) {
	ajax.request("GET", "/api/:id", res => {
		if (JSON.parse(res).votes.includes(document.title)){
			window.alert("you have already voted");
		}
		else updateDB(btn);
	});

}

function updateDB(btn) {
	ajax.request('POST', `/survey?
		update=true
		&title=${document.title}
		&item=${btn.innerText}`,
		r => {}
	);
	ajax.request('POST',
	`/api/:id?post=votes&title=${document.title}`,
	r => {})
	location.reload();
}
