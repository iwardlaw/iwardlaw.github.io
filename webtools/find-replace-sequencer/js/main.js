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

function disableButtonIfEmpty(button, controllingInput) {
	button.disabled = controllingInput.value.length === 0;
}

document.getElementById("find-replace__item-container").appendChild(createFindReplaceGap());
addFindReplaceItem();

//:: Callback to addFindReplaceItem() w/o args to avoid passing the event as an arg.
document.getElementById("find-replace__new").addEventListener("click", () => addFindReplaceItem());

document.getElementById("run-button").addEventListener("click", runFindReplace);

for(const closeButton of document.querySelectorAll(".config-modal .modal-close-button")) {
	closeButton.addEventListener("click", (evt) => {
		let parent = evt.target.parentElement;
		while(parent && !parent.classList.contains("config-modal")) {
			parent = parent.parentElement;
		}
		parent?.classList.add("hidden");
	});
}

document.getElementById("find-replace__export-button").addEventListener("click", () => {
	const exportModal = document.getElementById("export-modal");
	exportModal.querySelector("textarea").value = exportList();
	exportModal.classList.remove("hidden");
});

document.getElementById("find-replace__import-button").addEventListener("click", () => document.getElementById("import-modal").classList.remove("hidden"));
document.getElementById("import-modal__import-button").addEventListener("click", (evt) => importList(evt.target.parentElement.querySelector("textarea")?.value, evt.target.parentElement.parentElement));

document.getElementById("import-modal__textarea").addEventListener("input", (evt) => disableButtonIfEmpty(document.getElementById("import-modal__import-button"), evt.target));
document.getElementById("original-text").addEventListener("input", (evt) => disableButtonIfEmpty(document.getElementById("run-button"), evt.target));
