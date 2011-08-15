DateTime.Util = {};

DateTime.Util.exists = function(parameter, replacement) {
    var b = parameter !== undefined && parameter !== null;

    if (arguments.length === 2) {
        return b ? parameter : replacement;
    }

    return b;
};

DateTime.Util.quotRem = function(divisor, divider) {
    var rem = (divider + (divisor % divider)) % divider;

    return {
        quot: Math.floor((divisor - rem) / divider),
        rem: rem
    };
};

DateTime.Util.assertTrue = function(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
};

DateTime.Util.validateInt = function(value) {
    var i = parseInt(value, 10);

    DateTime.Util.assertTrue(!isNaN(i) && String(value).match(/^-?\d+$/) && String(i).match(/^-?\d+$/), "Expected integer but was: " + value);

    return i;
};
