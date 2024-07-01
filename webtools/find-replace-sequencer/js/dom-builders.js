function addFindReplaceItem() {
	const item = document.createElement("div");
	item.classList.add("find-replace-item");

	item.appendChild(createFindReplaceControlArea());
	item.appendChild(createFindReplaceInputArea());
	item.appendChild(createFindReplaceOptionsArea());

	document.getElementById("find-replace__item-container")?.appendChild(item);
}

function createFindReplaceControlArea() {
	const controlArea = document.createElement("div");
	controlArea.classList.add("find-replace-item__controls");

	const toggle = document.createElement("label");
	toggle.classList.add("find-replace-item__toggle");
	controlArea.appendChild(toggle);

	const toggleCheckbox = document.createElement("input");
	toggleCheckbox.type = "checkbox";
	toggleCheckbox.checked = true;
	toggle.appendChild(toggleCheckbox);

	const sliderSpan = document.createElement("span");
	sliderSpan.classList.add("find-replace-item__toggle-slider");
	toggle.appendChild(sliderSpan);

	const closeButton = document.createElement("button");
	closeButton.classList.add("find-replace-item__close");
	closeButton.innerHTML = "&times;";
	closeButton.addEventListener("click", (evt) => evt.target.parentElement.parentElement.replaceWith());
	controlArea.appendChild(closeButton);

	return controlArea;
}

function createFindReplaceInputArea() {
	const inputArea = document.createElement("div");
	inputArea.classList.add("find-replace-item__input-area");

	inputArea.appendChild(createFindReplaceInput("Find"));
	inputArea.appendChild(createFindReplaceInput("Replace"));

	return inputArea;
}

function createFindReplaceInput(text) {
	const inputLabel = document.createElement("label");
	const inputClass = text.toLowerCase();
	inputLabel.classList.add("find-replace-item__input", `input__${inputClass}`);

	const inputText = document.createElement("span");
	inputText.classList.add("find-replace-item__input-label-text");
	inputText.textContent = text;
	inputLabel.appendChild(inputText);

	const input = document.createElement("input");
	input.type = "text";
	inputLabel.appendChild(input);

	return inputLabel;
}

function createFindReplaceOptionsArea() {
	const optionsArea = document.createElement("div");
	optionsArea.classList.add("find-replace-item__options-area");

	optionsArea.appendChild(createFindReplaceOption("Match case"));
	// optionsArea.appendChild(createFindReplaceOption("Preserve case"));
	optionsArea.appendChild(createFindReplaceOption("Regular Expression"));

	return optionsArea;
}

function createFindReplaceOption(text) {
	const optionLabel = document.createElement("label");
	const optionClass = text.toLowerCase().replace(/\s+/g, "-");
	optionLabel.classList.add("find-replace-item__option", `option__${optionClass}`);

	const input = document.createElement("input");
	input.type = "checkbox";
	optionLabel.appendChild(input);

	const whitespace = document.createTextNode(" ");
	optionLabel.appendChild(whitespace);

	const optionText = document.createElement("span");
	optionText.classList.add("find-replace-item__option-label-text");
	optionText.textContent = text;
	optionLabel.appendChild(optionText);

	return optionLabel;
}
