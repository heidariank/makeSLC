import dispatcher from "../dispatcher";

export function createMaker(maker) {
	const ID = Date.now();
	var nm = maker.name;
	var txt = maker.text;
	var eml = maker.email;
	/*var img = "images/" + Date.now() + ".jpg";*/
	var img = maker.image;
	var file = maker.file;
	var newMaker = {
		name: nm,
		ID,
		blurb: 'missing blurb',
		text: txt,
		projects: [],
		email: eml,
		image: img,
/*		file: file*/
	};

	console.log(file);

	var data = new FormData();
	data.append( "json", JSON.stringify( newMaker ) );

	//make call to server
/*	fetch('/api/post_maker', { method: 'POST', body: data })
		    .then(function(response) {
		        return response.json();
		    }).then(function(json) {
		        console.log("json: ", json);
		        //component.makers = json;
		        //component.emit("change");
		    });*/

    fetch('/api/post_maker', {method: 'POST', body: data})
    .then(function(res) {
        return res.text();
    }).then(function(body) {

        console.log(body);
    });

/*	var request = new Request('/api/post_maker', {
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
			    });*/

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