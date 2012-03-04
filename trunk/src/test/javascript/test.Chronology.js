/**
 * Instant class specs.
 *
 * @author Victor Polischuk
 * @since 26.01.2012
 */
(function () {
    var jsd8 = window["jsd8"];
    var Chronology = jsd8.Chronology;
    var PeriodType = jsd8.PeriodType;

    describe("Chronology static API...", function () {
        it("must have method getDefault", function () {
            expect(Chronology.getDefault).toBeDefined();
        });

        it("must have method setDefault", function () {
            expect(Chronology.setDefault).toBeDefined();
        });
    });

    describe("SystemChronology period milliseconds computation...", function () {
        Chronology.setDefault();

        var f = Chronology.getDefault();

        it("should convert 'PT5M' into '5 * 60 * 1000' ms", function () {
            expect(PeriodType.MINUTE.toPeriod(5).toMillis(0, f)).toBe(5 * 60 * 1000);
        });

        it("should convert 'P10D' into '10 * 24 * 60 * 60 * 1000' ms", function () {
            expect(PeriodType.DAY.toPeriod(10).toMillis(0, f)).toBe(10 * 24 * 60 * 60 * 1000);
        });

        it("should convert 'P1Y' into '365 * 24 * 60 * 60 * 1000' ms", function () {
            expect(PeriodType.YEAR.one().toMillis(0, f)).toBe(365 * 24 * 60 * 60 * 1000);
        });

        it("should convert 'PT-1H' into '-1 * 60 * 60 * 1000' ms", function () {
            expect(PeriodType.HOUR.one().negate().toMillis(0, f)).toBe(-60 * 60 * 1000);
        });

        it("should convert 'P-4D' into '-4 * 24 * 60 * 60 * 1000' ms", function () {
            expect(PeriodType.DAY.toPeriod(4).negate().toMillis(0, f)).toBe(-4 * 24 * 60 * 60 * 1000);
        });

        it("should convert 'P-2M' into '-(31 + 30) * 24 * 60 * 60 * 1000' ms", function () {
            expect(PeriodType.MONTH.toPeriod(2).negate().toMillis(0, f)).toBe(-(31 + 30) * 24 * 60 * 60 * 1000);
        });
    });
})();
