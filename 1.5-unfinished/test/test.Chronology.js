describe("Chronology: leap year checks", function() {
    var f = Chronology.isLeapYear;

    it("Year -2000", function() {
        expect(f(-2000)).toBeFalsy();
    });

    it("Year -2001", function() {
        expect(f(-2001)).toBeTruthy();
    });

    it("Year 1970", function() {
        expect(f(1970)).toBeFalsy();
    });

    it("Year 1900", function() {
        expect(f(1900)).toBeFalsy();
    });

    it("Year 2000", function() {
        expect(f(2000)).toBeTruthy();
    });

    it("Year 2001", function() {
        expect(f(2001)).toBeFalsy();
    });
});

describe("Chronology: convert instant to years of era", function() {
    var f = Chronology.getYearsOfEra;

    it("1970 Jan 01", function() {
        expect(f(time(1970, 1, 1))).toBe(1970);
    });

    it("2000 Jan 02", function() {
        expect(f(time(2000, 1, 2))).toBe(2000);
    });

    it("2000 Dec 30", function() {
        expect(f(time(2000, 12, 30))).toBe(2000);
    });

    it("2000 Dec 31", function() {
        expect(f(time(2000, 12, 31))).toBe(2000);
    });

    it("-2000 Jan 02", function() {
        expect(f(time(-2000, 1, 2))).toBe(-2000);
    });

    it("-2000 Dec 30", function() {
        expect(f(time(-2000, 12, 30))).toBe(-2000);
    });

    it("-2000 Dec 31", function() {
        expect(f(time(-2000, 12, 31))).toBe(-2000);
    });
});

describe("Chronology: convert instant to months of year", function() {
    var f = Chronology.getMonthsOfYear;

    it("1970 Jan 01", function() {
        expect(f(time(1970, 1, 1))).toBe(1);
    });

    it("1970 Feb 28", function() {
        expect(f(time(1970, 2, 28))).toBe(2);
    });

    it("1970 Mar 1", function() {
        expect(f(time(1970, 3, 1))).toBe(3);
    });

    it("1970 Jul 21", function() {
        expect(f(time(1970, 7, 21))).toBe(7);
    });

    it("1970 Dec 01", function() {
        expect(f(time(1970, 12, 1))).toBe(12);
    });

    it("1970 Dec 31", function() {
        expect(f(time(1970, 12, 31))).toBe(12);
    });

    it("2000 Jan 01", function() {
        expect(f(time(2000, 1, 1))).toBe(1);
    });

    it("2000 Feb 28", function() {
        expect(f(time(2000, 2, 28))).toBe(2);
    });

    it("2000 Feb 29", function() {
        expect(f(time(2000, 2, 29))).toBe(2);
    });

    it("2000 Mar 1", function() {
        expect(f(time(2000, 3, 1))).toBe(3);
    });

    it("2000 Jul 21", function() {
        expect(f(time(2000, 7, 21))).toBe(7);
    });

    it("2000 Dec 01", function() {
        expect(f(time(2000, 12, 1))).toBe(12);
    });

    it("2000 Dec 31", function() {
        expect(f(time(2000, 12, 31))).toBe(12);
    });


});