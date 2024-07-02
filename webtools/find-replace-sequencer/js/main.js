function runFindReplace() {
	let text = document.getElementById("original-text").value;

	const findReplaceItems = document.querySelectorAll(".find-replace-item");
	for(const item of findReplaceItems) {
		if(!item.querySelector(".find-replace-item__toggle input").checked) {
			continue;
		}

		let findPattern = item.querySelector(".input__find input").value;
		let replaceString = item.querySelector(".input__replace input").value;

		const matchCase = item.querySelector(".option__match-case input").checked;
		// const preserveCase = item.querySelector(".option__preserve-case input").checked;
		const isRegex = item.querySelector(".option__regular-expression input").checked;

		if(isRegex) {
			const flags = matchCase ? "g" : "gi";
			findPattern = new RegExp(findPattern, flags);
			replaceString = replaceString.replaceAll("\\n", "\n");
		}

		text = isRegex || matchCase ? text.replaceAll(findPattern, replaceString) : replaceAllCaseInsensitive(text, findPattern, replaceString);
	}

	document.getElementById("replacement-text").value = text;
}

addFindReplaceItem();
document.getElementById("find-replace__new").addEventListener("click", addFindReplaceItem);

document.getElementById("run-button").addEventListener("click", runFindReplace);
