const isLowerCase = (str) => str === str.toLowerCase() && str !== str.toUpperCase();

function alphaToDecimal(alphaNum) {
	const lowerBaseCode = "a".charCodeAt();
	const upperBaseCode = "A".charCodeAt();

	const charArr = alphaNum.split("");
	let value = 0;

	for(let i = 0; i < charArr.length; i++) {
		const thisDigitValue = charArr[i].charCodeAt() - (isLowerCase(charArr[i]) ? lowerBaseCode : upperBaseCode) + 1;
		value += thisDigitValue * 26 ** (charArr.length - i - 1);
	}

	return value;
}

function replaceAllCaseInsensitive(string, pattern, replacement) {
	if(pattern === "" || pattern === replacement) {
		return string;
	}

	if(typeof pattern === "object" && pattern instanceof RegExp) {
		replacement = replacement.replaceAll("\\n", "\n");
		return this.replaceAll(new RegExp(pattern, "gi"), replacement);
	}

	let ret = "";
	pattern = pattern.toLowerCase();

	while(true) {
		// console.log(ret);

		const index = string.toLowerCase().indexOf(pattern);
		if(index === -1) {
			ret += string;
			break;
		}

		ret += string.substring(0, index) + replacement;
		string = string.substring(index + pattern.length);
	}

	return ret;
}
