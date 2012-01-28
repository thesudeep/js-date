/**
 * Utils helper specs.
 *
 * @author Victor Polischuk
 * @since 26.01.2012
 */

describe("Utils.inherits()...", function() {
    var Parent = function() {};
    var Child =  Utils.inherits(function() {}, Parent);

    Parent.prototype.parentMethod = function() {};
    Parent.parentFunction = function() {};

    Child.prototype.childMethod = function() {};
    Child.childFunction = function() {};

    it("should be positive result of (Child instanceof Parent) expression", function() {
        expect(new Child() instanceof Parent).toBeTruthy();
    });

    it("should be positive result of (Child instanceof Child) expression", function() {
        expect(new Child() instanceof Child).toBeTruthy();
    });

    it("should be negative result of (Parent instanceof Child) expression", function() {
        expect(new Parent() instanceof Child).toBeFalsy();
    });

    it("should be positive result of (Parent instanceof Parent) expression", function() {
        expect(new Parent() instanceof Parent).toBeTruthy();
    });

    it("should be defined a parent method in a child instance", function() {
        expect(new Child().parentMethod).toBeDefined();
    });

    it("should NOT be defined a parent function in a child namespace", function() {
        expect(Child.parentFunction).toBeUndefined();
    });

    it("should be defined a child method in a child instance", function() {
        expect(new Child().childMethod).toBeDefined();
    });

    it("should be defined a child function in a child namespace", function() {
        expect(Child.childFunction).toBeDefined();
    });

    it("should be defined a parent method in a parent instance", function() {
        expect(new Parent().parentMethod).toBeDefined();
    });

    it("should be defined a parent function in a parent namespace", function() {
        expect(Parent.parentFunction).toBeDefined();
    });

    it("should NOT be defined a child method in a parent instance", function() {
        expect(new Parent().childMethod).toBeUndefined();
    });
});

describe("Utils.isUndefined()...", function() {
    var f = Utils.isUndefined;
    var undef;

    it("should be negative in case of Number", function() {
        expect(f(1)).toBeFalsy();
    });

    it("should be negative in case of String", function() {
        expect(f("string")).toBeFalsy();
    });

    it("should be negative in case of Object", function() {
        expect(f({a:true, b:false})).toBeFalsy();
    });

    it("should be negative in case of Array", function() {
        expect(f([1,2,3])).toBeFalsy();
    });

    it("should be negative in case of function", function() {
        expect(f(function() {})).toBeFalsy();
    });

    it("should be negative in case of null", function() {
        expect(f(null)).toBeFalsy();
    });

    it("should be positive in case of undefined", function() {
        expect(f(undef)).toBeTruthy();
    });
});

describe("Utils.isDefined()...", function() {
    var f = Utils.isDefined;
    var undef;

    it("should be positive in case of Number", function() {
        expect(f(1)).toBeTruthy();
    });

    it("should be positive in case of String", function() {
        expect(f("string")).toBeTruthy();
    });

    it("should be positive in case of Object", function() {
        expect(f({a:true, b:false})).toBeTruthy();
    });

    it("should be positive in case of Array", function() {
        expect(f([1,2,3])).toBeTruthy();
    });

    it("should be positive in case of function", function() {
        expect(f(function() {})).toBeTruthy();
    });

    it("should be positive in case of null", function() {
        expect(f(null)).toBeTruthy();
    });

    it("should be negative in case of undefined", function() {
        expect(f(undef)).toBeFalsy();
    });
});

describe("Utils.isNull()...", function() {
    var f = Utils.isNull;
    var undef;

    it("should be negative in case of Number", function() {
        expect(f(1)).toBeFalsy();
    });

    it("should be negative in case of String", function() {
        expect(f("string")).toBeFalsy();
    });

    it("should be negative in case of Object", function() {
        expect(f({a:true, b:false})).toBeFalsy();
    });

    it("should be negative in case of Array", function() {
        expect(f([1,2,3])).toBeFalsy();
    });

    it("should be negative in case of function", function() {
        expect(f(function() {})).toBeFalsy();
    });

    it("should be positive in case of null", function() {
        expect(f(null)).toBeTruthy();
    });

    it("should be negative in case of undefined", function() {
        expect(f(undef)).toBeFalsy();
    });
});

describe("Utils.isNotNull()...", function() {
    var f = Utils.isNotNull;
    var undef;

    it("should be positive in case of Number", function() {
        expect(f(1)).toBeTruthy();
    });

    it("should be positive in case of String", function() {
        expect(f("string")).toBeTruthy();
    });

    it("should be positive in case of Object", function() {
        expect(f({a:true, b:false})).toBeTruthy();
    });

    it("should be positive in case of Array", function() {
        expect(f([1,2,3])).toBeTruthy();
    });

    it("should be positive in case of function", function() {
        expect(f(function() {})).toBeTruthy();
    });

    it("should be negative in case of null", function() {
        expect(f(null)).toBeFalsy();
    });

    it("should be positive in case of undefined", function() {
        expect(f(undef)).toBeTruthy();
    });
});

describe("Utils.isExist()...", function() {
    var f = Utils.isExist;
    var undef;

    it("should be positive in case of Number", function() {
        expect(f(1)).toBeTruthy();
    });

    it("should be positive in case of String", function() {
        expect(f("string")).toBeTruthy();
    });

    it("should be positive in case of Object", function() {
        expect(f({a:true, b:false})).toBeTruthy();
    });

    it("should be positive in case of Array", function() {
        expect(f([1,2,3])).toBeTruthy();
    });

    it("should be positive in case of function", function() {
        expect(f(function() {})).toBeTruthy();
    });

    it("should be negative in case of null", function() {
        expect(f(null)).toBeFalsy();
    });

    it("should be negative in case of undefined", function() {
        expect(f(undef)).toBeFalsy();
    });
});

describe("Utils.isNotExist()...", function() {
    var f = Utils.isNotExist;
    var undef;

    it("should be negative in case of Number", function() {
        expect(f(1)).toBeFalsy();
    });

    it("should be negative in case of String", function() {
        expect(f("string")).toBeFalsy();
    });

    it("should be negative in case of Object", function() {
        expect(f({a:true, b:false})).toBeFalsy();
    });

    it("should be negative in case of Array", function() {
        expect(f([1,2,3])).toBeFalsy();
    });

    it("should be negative in case of function", function() {
        expect(f(function() {})).toBeFalsy();
    });

    it("should be positive in case of null", function() {
        expect(f(null)).toBeTruthy();
    });

    it("should be positive in case of undefined", function() {
        expect(f(undef)).toBeTruthy();
    });
});

describe("Utils.isNumeric()...", function() {
    var f = Utils.isNumeric;
    var undef;

    it("should be positive in case of positive integer", function() {
        expect(f(1)).toBeTruthy();
    });

    it("should be positive in case of negative integer", function() {
        expect(f(-1)).toBeTruthy();
    });

    it("should be positive in case of positive float", function() {
        expect(f(100.1)).toBeTruthy();
    });

    it("should be positive in case of negative float", function() {
        expect(f(-1.001)).toBeTruthy();
    });

    it("should be positive in case of positive integer as String", function() {
        expect(f("123")).toBeTruthy();
    });

    it("should be positive in case of negative integer as String", function() {
        expect(f("123")).toBeTruthy();
    });

    it("should be positive in case of positive float as String", function() {
        expect(f("+.123")).toBeTruthy();
    });

    it("should be positive in case of negative float as String", function() {
        expect(f("-.123")).toBeTruthy();
    });

    it("should be negative in case of empty String", function() {
        expect(f("")).toBeFalsy();
    });

    it("should be negative in case of String", function() {
        expect(f("1000 s")).toBeFalsy();
    });

    it("should be negative in case of Object", function() {
        expect(f({a:true, b:false})).toBeFalsy();
    });

    it("should be negative in case of Array", function() {
        expect(f([1,2,3])).toBeFalsy();
    });

    it("should be negative in case of function", function() {
        expect(f(function() {})).toBeFalsy();
    });

    it("should be negative in case of null", function() {
        expect(f(null)).toBeFalsy();
    });

    it("should be negative in case of undefined", function() {
        expect(f(undef)).toBeFalsy();
    });
});

describe("Utils.getMillis()...", function() {
    var f = Utils.getMillis;
    var t = function (val) {
        return function() {return f(val)}
    };
    var m = "Cannot be converted into number of milliseconds";
    var undef;

    it("should be equal to the positive integer passed in", function() {
        expect(f(123123)).toBe(123123);
    });

    it("should be equal to the negative integer passed in", function() {
        expect(f(-123123)).toBe(-123123);
    });

    it("should be equal to the positive integer part of float passed in", function() {
        expect(f(123123.123)).toBe(123123);
    });

    it("should be equal to the negative integer part of float passed in", function() {
        expect(f(-123123.123)).toBe(-123123);
    });

    it("should be equal to the positive integer from passed integer String", function() {
        expect(f("123")).toBe(123);
    });

    it("should be equal to the negative integer from passed integer String", function() {
        expect(f("-123")).toBe(-123);
    });

    it("should be equal to the positive integer from passed float String", function() {
        expect(f("+123.123")).toBe(123);
    });

    it("should be equal to the negative integer from passed float String", function() {
        expect(f("-123.123")).toBe(-123);
    });

    it("should throw an exception in case of empty String", function() {
        expect(t("")).toThrow(m);
    });

    it("should throw an exception in case of invalid String", function() {
        expect(t("1000 s")).toThrow(m);
    });

    it("should throw an exception in case of Object", function() {
        expect(t({a:true, b:false})).toThrow(m);
    });

    it("should throw an exception in case of Array", function() {
        expect(t([1,2,3])).toThrow(m);
    });

    it("should throw an exception in case of function", function() {
        expect(t(function() {})).toThrow(m);
    });

    it("should NOT be null in case of null", function() {
        expect(f(null)).not.toBeNull();
    });

    it("should NOT be null in case of undefined", function() {
        expect(f(undef)).not.toBeNull();
    });
});
