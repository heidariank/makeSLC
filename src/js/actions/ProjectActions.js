//ALERT!!! This entire file was written under the influence!
//Tagged with CUI (Coding under the influence)

import dispatcher from "../dispatcher";

export function createProject(project) {
	const ID = Date.now();
	var nm = project.name;
	var mID = project.makerID;
	var blrb = project.blurb;
	var imgLst = project.imageList;
	var newProject = {
		name: nm,
		ID,
		makerID: mID,
		blurb: blrb,
		imageList: imgLst
	};

	//make call to server

	dispatcher.dispatch({
		type: "CREATE_PROJECT",
		project: newProject
	});
}