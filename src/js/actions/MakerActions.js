import dispatcher from "../dispatcher";

export function createMaker(maker) {
	const ID = Date.now();
	var nm = maker.name;
	var txt = maker.text;
	var eml = maker.email;
	var img = maker.image;
	var newMaker = {
		name: nm,
		ID,
		blurb: 'missing blurb',
		text: txt,
		projects: [],
		email: eml,
		image: img
	};

	//make call to server
	/*fetch('/api/makers', { method: 'POST', body: 'a=1' })
		    .then(function(response) {
		        return response.json();
		    }).then(function(json) {
		        console.log("json: ", json);
		        //component.makers = json;
		        //component.emit("change");
		    });*/

var request = new Request('/api/makers', {
	method: 'POST', 
	mode: 'cors', 
	redirect: 'follow',
	body: newMaker,
	headers: new Headers({
		'Content-Type': 'text/plain',
		'Cache-Control': 'no-cache', 
		'Access-Control-Allow-Origin': '*'
	})
});

// Now use it!
fetch(request).then(function(response) {
		        return response.json();
		    }).then(function(json) {
		        console.log("json: ", json);
		        //component.makers = json;
		        //component.emit("change");
		    });

	dispatcher.dispatch({
		type: "CREATE_MAKER",
		maker: newMaker
	});
}

export function deleteMaker(ID) {
	//TODO: MUST also delete projects BEFORE deleting maker
	//delete from server

	dispatcher.dispatch({
		type: "DELETE_MAKER",
		ID: ID
	});
}

export function editMaker(maker) {
		dispatcher.dispatch({
			type: "EDIT_MAKER",
			maker: maker
		});
}