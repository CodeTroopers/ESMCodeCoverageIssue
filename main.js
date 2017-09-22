String.prototype.format = function (...args) {
	return this.replace(/{(\d+)}/g, (match, number) => typeof args[number] != 'undefined' ? args[number] : "");
};