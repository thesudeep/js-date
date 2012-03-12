goog.provide("jsd8");

/**
 * Undefined constant to avoid overriding <code>undefined</code> variable
 *
 * @const
 * @public
 */
var VOID = (function () {
})();

var CLASS = "CLASS";

/**
 * @param {!Object} object
 * @param {string} key
 * @return {!Object}
 */
function getOrCreateObject(object, key) {
    return object[key] || (object[key] = {});
}

/**
 * @param {Function} clazz
 * @return {string}
 */
function obtainClass(clazz) {
    return clazz[CLASS] || "UnDeFiNeD";
}

/**
 * @param {!Function} clazz
 * @param {string} className
 */
function registerClass(clazz, className) {
    clazz[CLASS] = className;
}

/**
 *
 * @param {(number|string|Date)} left
 * @param {(number|string|Date)} right
 * @return {number}
 */
function comparator(left, right) {
    return left === right ? 0 : (left < right ? -1 : 1);
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isUndefined(value) {
    return value === VOID;
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isDefined(value) {
    return value !== VOID;
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isNull(value) {
    return value === null;
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isNotNull(value) {
    return value !== null;
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isExist(value) {
    return isDefined(value) && isNotNull(value);
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isNotExist(value) {
    return isUndefined(value) || isNull(value);
}

/**
 *
 * @param {*} value
 * @return {boolean}
 */
function isNumeric(value) {
    return isExist(value) && /^[\-\+]?\d*\.?\d+$/.test(value) && !isNaN(value);
}

/**
 * Returns milliseconds of an argument value or current time if argument undefined or <code>null</code>. If
 * conversion is not possible exception will be thrown.
 *
 * @param {(number|string|Date|Instant)} instant milliseconds, {@link Instant} or {@link Date} object.
 * @return {number} milliseconds of passed given object
 * @throws {Error} if conversion to milliseconds is impossible.
 */
function getMillis(instant) {
    if (isNotExist(instant)) {
        return goog.now();
    }

    if (goog.isNumber(instant)) {
        return instant;
    }

    if (instant instanceof Date) {
        return instant.getTime();
    }

    if (instant instanceof Instant) {
        return instant.toMillis();
    }

    if (goog.isString(instant) && /^[\-\+]?\d*\.?\d+$/.test(instant)) {
        return parseInt(instant, 10);
    }

    throw new Error("Cannot be converted into number of milliseconds");
}

var jsd8 = getOrCreateObject(window, "jsd8");

var symbols = jsd8["symbols"] = {};
