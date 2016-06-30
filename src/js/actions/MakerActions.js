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