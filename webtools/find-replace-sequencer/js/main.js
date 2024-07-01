function runFindReplace() {
	let text = document.getElementById("original-text").value;

	const findReplaceItems = document.querySelectorAll(".find-replace-item");
	for(const item of findReplaceItems) {
		if(!item.querySelector(".find-replace-item__toggle input").checked) {
			continue;
		}

		let findPattern = item.querySelector(".input__find input").value;
		const replaceText = item.querySelector(".input__replace input").value;

		const matchCase = item.querySelector(".option__match-case input").checked;
		// const preserveCase = item.querySelector(".option__preserve-case input").checked;
		const regularExpression = item.querySelector(".option__regular-expression input").checked;

		if(regularExpression) {
			const flags = matchCase ? "g" : "gi";
			findPattern = new RegExp(findPattern, flags);
		}

		text = regularExpression || matchCase ? text.replaceAll(findPattern, replaceText) : replaceAllCaseInsensitive(text, findPattern, replaceText);
	}

	document.getElementById("replacement-text").value = text;
}

addFindReplaceItem();
document.getElementById("find-replace__new").addEventListener("click", addFindReplaceItem);

document.getElementById("run-button").addEventListener("click", runFindReplace);
