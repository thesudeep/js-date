Date.Util = {};

Date.Util.quotRem = function(divisor, divider) {
    var rem = (divider + (divisor % divider)) % divider;

    return {
        quot: Math.floor((divisor - rem) / divider),
        rem: rem
    };
};

Date.Util.assertTrue = function(condition, message) {
    if (!condition) {
        throw new Error(message);
    }
};

Date.Util.validateInt = function(value) {
    var i = parseInt(value, 10);

    Date.Util.assertTrue(!isNaN(i) && String(value).match(/^-?\d+$/), "Expected integer but was: " + value);

    return i;
};
