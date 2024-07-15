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

function setItemCount(count) {
	const container = document.getElementById("find-replace__item-container");
	const items = container.querySelectorAll(".find-replace-item");
	const countDiff = count - items.length;

	if(countDiff > 0) {
		const lastItem = Array.prototype.at.call(items, -1);
		for(let i = 0; i < countDiff; i++) {
			addFindReplaceItem(getDataFromItem(lastItem), incrementCount = false);
		}
	}
	else {
		for(let i = items.length - 1; i >= count; i--) {
			removeFindReplaceItem(items[i], decrementCount = false);
		}
	}
}

function incrementItemCount() {
	document.getElementById("find-replace__item-count").stepUp();
}

function decrementItemCount() {
	document.getElementById("find-replace__item-count").stepDown();
}

function saveSequence() {
	localStorage.setItem("find-replace-sequence", JSON.stringify({
		originalText: document.getElementById("original-text").value,
		replacementText: document.getElementById("replacement-text").value,
		// copyOnRun: document.getElementById("copy-on-run-checkbox").checked,
		findReplaceItems: exportList()
	}));
}

function loadSequence() {
	const sequence = JSON.parse(localStorage.getItem("find-replace-sequence"));
	if(sequence) {
		document.getElementById("original-text").value = sequence.originalText;
		document.getElementById("replacement-text").value = sequence.replacementText;
		// document.getElementById("copy-on-run-checkbox").checked = sequence.copyOnRun;
		importList(sequence.findReplaceItems);
	}
	else {
		addFindReplaceItem();
	}
}

document.getElementById("find-replace__item-count").value = 0;
document.getElementById("find-replace__item-container").appendChild(createFindReplaceGap());
if(new URLSearchParams(window.location.search).has("clear-storage")) {
	localStorage.clear();
}
loadSequence();

document.getElementById("original-text").addEventListener("change", saveSequence);
document.getElementById("replacement-text").addEventListener("change", saveSequence);
// document.getElementById("copy-on-run-checkbox").addEventListener("change", saveSequence);

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

document.getElementById("find-replace__item-count").addEventListener("change", (evt) => setItemCount(evt.target.value));

document.getElementById("import-modal__textarea").addEventListener("input", (evt) => disableButtonIfEmpty(document.getElementById("import-modal__import-button"), evt.target));
document.getElementById("original-text").addEventListener("input", (evt) => disableButtonIfEmpty(document.getElementById("run-button"), evt.target));
