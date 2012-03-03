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
        it("must have field MILLENIUM", function () {
            expect(PeriodType.MILLENIUM).toBeDefined();
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

        for (var i = 0; i < 13; i++) {
            (function (n, inst) {
                it("should always return the same instance for " + n, function () {
                    expect(inst.toPeriod(n)).toBe(inst.toPeriod(n));
                });
            })(i, type);
        }

        it("should not return the same instance for values higher than 12", function () {
            expect(type.toPeriod(13)).not.toBe(type.toPeriod(13));
        });

        it("should throw an error in case of negative value", function () {
            expect(function () {
                return type.toPeriod(-1);
            }).toThrow();
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

    describe("PeriodType.prototype.two()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.two()).toBe(type.two());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.two()).toBe(type.toPeriod(2));
        });
    });

    describe("PeriodType.prototype.three()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.three()).toBe(type.three());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.three()).toBe(type.toPeriod(3));
        });
    });

    describe("PeriodType.prototype.four()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.four()).toBe(type.four());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.four()).toBe(type.toPeriod(4));
        });
    });

    describe("PeriodType.prototype.five()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.five()).toBe(type.five());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.five()).toBe(type.toPeriod(5));
        });
    });

    describe("PeriodType.prototype.six()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.six()).toBe(type.six());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.six()).toBe(type.toPeriod(6));
        });
    });

    describe("PeriodType.prototype.seven()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.seven()).toBe(type.seven());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.seven()).toBe(type.toPeriod(7));
        });
    });

    describe("PeriodType.prototype.eight()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.eight()).toBe(type.eight());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.eight()).toBe(type.toPeriod(8));
        });
    });

    describe("PeriodType.prototype.nine()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.nine()).toBe(type.nine());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.nine()).toBe(type.toPeriod(9));
        });
    });

    describe("PeriodType.prototype.ten()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.ten()).toBe(type.ten());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.ten()).toBe(type.toPeriod(10));
        });
    });

    describe("PeriodType.prototype.eleven()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.eleven()).toBe(type.eleven());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.eleven()).toBe(type.toPeriod(11));
        });
    });

    describe("PeriodType.prototype.twelve()...", function () {
        var type = PeriodType.MONTH;

        it("should always return the same instance", function () {
            expect(type.twelve()).toBe(type.twelve());
        });

        it("should return the same instance as toPeriod method", function () {
            expect(type.twelve()).toBe(type.toPeriod(12));
        });
    });
})();
