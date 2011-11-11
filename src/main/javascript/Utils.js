
MAX_INTEGRAL = 9007199254740992;
MIN_INTEGRAL = - MAX_INTEGRAL;

/**
 * Validate given value as an undefined value.
 *
 * @param {*} value value to be validated.
 * @return {boolean} <code>true</code> if the value is undefined, <code>false</code> - otherwise.
 */
function isUndefined(value) {
    function ___check() {
    }

    return value === ___check();
}

/**
 * Checks is the value is defined and is not null.
 *
 * @param {*} value value to be validated.
 * @return {boolean} <code>true</code> if the value has value, <code>false</code> - otherwise.
 */
function hasValue(value) {
    return value !== null && !isUndefined(value);
}

/**
 * Asserts condition correctness. Throws an error with the given message if condition is incorrect.
 *
 * @param {boolean} condition assert condition, expected to be true.
 * @param {String} errorMessage error message in case negative condition state
 * @throws {Error} if condition is false
 */
function assertTrue(condition, errorMessage) {
    if (!condition) {
        throw new Error(errorMessage);
    }
}

/**
 * Asserts given parameter if it has a value (defined and not null). Throws an error with the given message if it does not.
 *
 * @param {boolean} value parameter, expected to has a value.
 * @param {String} errorMessage error message in case negative condition state
 * @throws {Error} if condition is false
 */
function assertHasValue(value, errorMessage) {
    if (!hasValue(value)) {
        throw new Error(errorMessage);
    }
}

/**
 * Converts value to integer number if possible, otherwise throws an error.
 *
 * @param {*} value initial value.
 * @return {number} converted number value.
 * @throws {Error} if given parameter cannot be converted to integer.
 */
function toInt(value) {
    var i = parseInt(value, 10);

    assertTrue(!isNaN(i) && String(value).match(/^-?\d+$/) && String(i).match(/^-?\d+$/), "Expected integer but was: " + value);

    return i;
}
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * @param {Function} child Child class.
 * @param {Function} parent Parent class.
 */
function inherits(child, parent) {
    /** @constructor */
    function F() {
    }

    F.prototype = parent.prototype;

    child._super = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
}

/**
 * Throws an unimplemented method exception.
 *
 * @throws {Error} exception
 */
function abstractMethod() {
    throw new AbstractMethodException("Unimplemented method exception.");
}