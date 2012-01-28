/**
 * Instant class specs.
 *
 * @author Victor Polischuk
 * @since 26.01.2012
 */

describe("Instant.to()...", function() {
    var f = Instant.to;
    var t = function(val) { return function() { return f(val); };};
    var instant = new Instant(123123);

    it("should return the same Instant", function() {
        expect(f(instant)).toBe(instant);
    });

    it("should return valid Instant from number", function() {
        expect(f(123123)).toEqual(instant);
    });

    it("should return valid Instant from string", function() {
        expect(f("123123")).toEqual(instant);
    });

    it("should return valid Instant from Date", function() {
        expect(f(new Date(123123))).toEqual(instant);
    });

    it("should throw error in case of invalid input", function() {
        expect(t({})).toThrow("Cannot be converted into number of milliseconds");
    });
});
