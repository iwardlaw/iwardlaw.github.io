function addFindReplaceItem(data) {
	//:: <div class="find-replace-item">
	//::    <div class="find-replace-item__controls">...</div>
	//::    <div class="find-replace-item__input-area">...</div>
	//::    <div class="find-replace-item__options-area">...</div>
	//:: </div>

	const {
		isActive,
		findPattern,
		replaceString,
		matchCase,
		// preserveCase,
		isRegex
	} = data ?? {
		isActive: true,
		findPattern: "",
		replaceString: "",
		matchCase: false,
		//preserveCase: false,
		isRegex: false
	}

	// console.log(data);

	const item = document.createElement("div");
	item.classList.add("find-replace-item");

	item.appendChild(createFindReplaceControlArea(isActive));
	item.appendChild(createFindReplaceInputArea(findPattern, replaceString));
	item.appendChild(createFindReplaceOptionsArea(matchCase, isRegex));

	document.getElementById("find-replace__item-container")?.appendChild(item);
}

function createFindReplaceControlArea(isActive) {
	//:: <div class="find-replace-item__controls">
	//::   <label class="find-replace-item__toggle">
	//::     <input type="checkbox" checked />
	//::     <span class="find-replace-item__toggle-slider"></span>
	//::   </label>
	//::   <button class="find-replace-item__close">×</button>
	//:: </div>

	const controlArea = document.createElement("div");
	controlArea.classList.add("find-replace-item__controls");

	const toggle = document.createElement("label");
	toggle.classList.add("find-replace-item__toggle");
	controlArea.appendChild(toggle);

	const toggleCheckbox = document.createElement("input");
	toggleCheckbox.type = "checkbox";
	toggleCheckbox.checked = isActive;
	toggle.appendChild(toggleCheckbox);

	const sliderSpan = document.createElement("span");
	sliderSpan.classList.add("find-replace-item__toggle-slider");
	toggle.appendChild(sliderSpan);

	const closeButton = document.createElement("button");
	closeButton.classList.add("find-replace-item__close");
	closeButton.innerHTML = "&times;";
	closeButton.addEventListener("click", (evt) => {
		let parent = evt.target.parentElement;
		while(parent && !parent.classList.contains("find-replace-item")) {
			parent = parent.parentElement;
		}
		parent?.replaceWith();
	});
	controlArea.appendChild(closeButton);

	return controlArea;
}

function createFindReplaceInputArea(findPattern, replaceString) {
	//:: <div class="find-replace-item__input-area">
	//::   <label class="find-replace-item__input input__find">...</label>
	//::   <label class="find-replace-item__input input__replace">...</label>
	//:: </div>

	const inputArea = document.createElement("div");
	inputArea.classList.add("find-replace-item__input-area");

	inputArea.appendChild(createFindReplaceInput("Find", findPattern));
	inputArea.appendChild(createFindReplaceInput("Replace", replaceString));

	return inputArea;
}

function createFindReplaceInput(title, value) {
	//:: <label class="find-replace-item__input input__{inputClass}">
	//::   <span class="find-replace-item__input-label-text">{text}</span>
	//::   <input type="text" placeholder="[empty]" />
	//:: </label>

	const inputLabel = document.createElement("label");
	const inputClass = title.toLowerCase();
	inputLabel.classList.add("find-replace-item__input", `input__${inputClass}`);

	const inputText = document.createElement("span");
	inputText.classList.add("find-replace-item__input-label-text");
	inputText.textContent = title;
	inputLabel.appendChild(inputText);

	const input = document.createElement("input");
	input.type = "text";
	input.placeholder = "[empty]";
	if(value !== null && typeof value !== "undefined") {
		input.value = value;
	}
	inputLabel.appendChild(input);

	return inputLabel;
}

function createFindReplaceOptionsArea(matchCase, isRegex) {
	//:: <div class="find-replace-item__options-area">
	//::   <label class="find-replace-item__option option__match-case">...</label>
	//::   <label class="find-replace-item__option option__regular-expression">...</label>
  //:: </div>

	const optionsArea = document.createElement("div");
	optionsArea.classList.add("find-replace-item__options-area");

	optionsArea.appendChild(createFindReplaceOption("Match case", matchCase));
	// optionsArea.appendChild(createFindReplaceOption("Preserve case"));
	optionsArea.appendChild(createFindReplaceOption("Regular Expression", isRegex));

	return optionsArea;
}

function createFindReplaceOption(text, isSelected) {
	//:: <label class="find-replace-item__option option__{optionClass}">
	//::   <input type="checkbox" />
	//::   [space]
	//::   <span class="find-replace-item__option-label-text">{text}</span>
	//:: </label>
	
	const optionLabel = document.createElement("label");
	const optionClass = text.toLowerCase().replace(/\s+/g, "-");
	optionLabel.classList.add("find-replace-item__option", `option__${optionClass}`);

	const input = document.createElement("input");
	input.type = "checkbox";
	input.checked = isSelected;
	optionLabel.appendChild(input);

	const whitespace = document.createTextNode(" ");
	optionLabel.appendChild(whitespace);

	const optionText = document.createElement("span");
	optionText.classList.add("find-replace-item__option-label-text");
	optionText.textContent = text;
	optionLabel.appendChild(optionText);

	return optionLabel;
}
