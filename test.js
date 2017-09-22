import "./main"
import chai from "chai"

const bdd = global.intern.getInterface("bdd");

// add should on prototype
chai.should();

bdd.describe("Test suite", () => {
	bdd.it("should format string", () => {
		"Hello {0}!".format("guys").should.be.equal("Hello guys!");
	});
});