function exportList() {
	const data = [];
	const findReplaceItems = document.getElementById("find-replace__item-container").children;

	for(const item of findReplaceItems) {
		data.push({
			isActive: item.querySelector(".find-replace-item__toggle input").checked,
			findPattern: item.querySelector(".input__find input").value,
			replaceString: item.querySelector(".input__replace input").value,
			matchCase: item.querySelector(".option__match-case input").checked,
			//preserveCase: item.querySelector(".option__preserve-case input").checked,
			isRegex: item.querySelector(".option__regular-expression input").checked
		});
	}

	return JSON.stringify(data, null, 2);
}

function importList(importText, modal) {
	let data;
	try {
		data = JSON.parse(importText);
	}
	catch {
		alert("Import text must be valid JSON.");
		return;
	}

	document.getElementById("find-replace__item-container").innerHTML = "";
	for(const itemData of data) {
		addFindReplaceItem(itemData);
	}

	modal.classList.add("hidden");
}
