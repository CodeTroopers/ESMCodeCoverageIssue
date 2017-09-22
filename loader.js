global.intern.registerLoader(function (options) {
	const rollup = require("rollup");
	const inMemory = true;
	const sourceMapInLine = true;

	return function (modules) {
		const promises = [];
		for (const module of modules) {
			const config = {
				input: module
			};

			promises.push(
				rollup.rollup(config)
				.then((bundle) => {
					if(inMemory) {
						return bundle.generate({
							format: "cjs",
							file: "testSuite.js",
							sourcemap: sourceMapInLine ? "inline" : true
						});
					} else {
						return bundle.write({
							format: "cjs",
							file: "testSuite.js",
							sourcemap: sourceMapInLine ? "inline" : true
						});
					}
				})
				.then(({ code, map }) => {
					if (inMemory) {
						return requireFromString(`${code}\n//# sourceMappingURL=${map.toUrl()}`, "testSuite");
					} else {
						return require("./testSuite.js");
					}
				})
			);
		}
		return Promise.all(promises);
	};

	function requireFromString(code, filename) {
		const m = new module.constructor();
		m.paths = module.paths;
		console.log(code);
		m._compile(code, filename);
		return m.exports;
	}
});