/**
 * Instant class specs.
 *
 * @author Victor Polischuk
 * @since 26.01.2012
 */
(function () {
    var jsd8 = window["jsd8"];
    var PeriodType = jsd8.PeriodType;

    describe("PeriodType static API...", function () {
        it("must have field MILLENNIUM", function () {
            expect(PeriodType.MILLENNIUM).toBeDefined();
        });

        it("must have field CENTURY", function () {
            expect(PeriodType.CENTURY).toBeDefined();
        });

        it("must have field DECADE", function () {
            expect(PeriodType.DECADE).toBeDefined();
        });

        it("must have field YEAR", function () {
            expect(PeriodType.YEAR).toBeDefined();
        });

        it("must have field HALF_YEAR", function () {
            expect(PeriodType.HALF_YEAR).toBeDefined();
        });

        it("must have field QUARTER_YEAR", function () {
            expect(PeriodType.QUARTER_YEAR).toBeDefined();
        });

        it("must have field MONTH", function () {
            expect(PeriodType.MONTH).toBeDefined();
        });

        it("must have field WEEK", function () {
            expect(PeriodType.WEEK).toBeDefined();
        });

        it("must have field DAY", function () {
            expect(PeriodType.DAY).toBeDefined();
        });

        it("must have field HALF_DAY", function () {
            expect(PeriodType.HALF_DAY).toBeDefined();
        });

        it("must have field HOUR", function () {
            expect(PeriodType.HOUR).toBeDefined();
        });

        it("must have field HALF_HOUR", function () {
            expect(PeriodType.HALF_HOUR).toBeDefined();
        });

        it("must have field QUARTER_HOUR", function () {
            expect(PeriodType.QUARTER_HOUR).toBeDefined();
        });

        it("must have field MINUTE", function () {
            expect(PeriodType.MINUTE).toBeDefined();
        });

        it("must have field SECOND", function () {
            expect(PeriodType.SECOND).toBeDefined();
        });

        it("must have field MILLISECOND", function () {
            expect(PeriodType.MILLISECOND).toBeDefined();
        });

        it("must have method values", function () {
            expect(PeriodType.values).toBeDefined();
        });

        it("must have method valueOf", function () {
            expect(PeriodType.valueOf).toBeDefined();
        });
    });

    describe("PeriodType.prototype.toPeriod()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance for 0", function () {
            expect(type.toPeriod(0)).toBe(type.toPeriod(0));
        });

        it("should always return the same instance for 1", function () {
            expect(type.toPeriod(1)).toBe(type.toPeriod(1));
        });

        it("should not return the same instance for values higher than 1", function () {
            expect(type.toPeriod(2)).not.toBe(type.toPeriod(2));
        });

        it("should return negative period in case of negative value", function () {
            expect(type.toPeriod(-1)).toBe(type.one().negate());
        });
    });

    describe("PeriodType.prototype.zero()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.zero()).toBe(type.zero());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.zero()).toBe(type.toPeriod(0));
        });
    });

    describe("PeriodType.prototype.one()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.one()).toBe(type.one());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.one()).toBe(type.toPeriod(1));
        });
    });

})();
