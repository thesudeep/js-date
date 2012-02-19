/**
 * Undefined constant to avoid overriding <code>undefined</code> variable
 *
 * @const
 * @private
 */
var VOID = (function () {
})();

var inherits = goog.inherits;

///**
// *
// * @param {Function} child
// * @param {Function} parent
// */
//function inherits(child, parent) {
//    /**
//     * @constructor
//     */
//    function F() {
//    }
//
//    F.prototype = parent.prototype;
//
//    child.prototype = new F();
//    child.prototype.constructor = child;
//    child._super = parent.prototype;
//
//    /**
//     * @type {Function}
//     * @private
//     */
//    child.prototype.chain = function () {
//        return parent.prototype.constructor.apply(this, arguments)
//    };
//
//    /**
//     * @type {Function}
//     * @private
//     */
//    child.prototype.overridden = function () {
//        return parent.prototype;
//    };
//
//    return child;
//}

/**
 * @return {Function}
 */
function getClass() {
    return this.constructor;
}

/**
 *
 * @param {Object} cache
 * @param {*} key
 * @return {*}
 */
function getOrCreateCacheRecord(cache, key) {
    return cache[key] || (cache[key] = {});
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
 * @throws {Error}
 */
function throwPeriodTypesInvalidError() {
    throw new Error("Inner period type bigger or equal to outer period type");
}

/**
 * @throws {Error}
 */
function throwEnumCreationError() {
    throw new Error("New Enum cannot be created because such enum already exists");
}

/**
 * @throws {Error}
 */
function throwEnumInvalidError() {
    throw new Error("The method cannot be executed for non-initialized Enum classes (check lazy loading)");
}

/**
 * @throws {Error}
 */
function throwClassCastError() {
    throw new Error("Class cast exception");
}

/**
 * @throws {Error}
 */
function throwNullPointerError() {
    throw new Error("Null pointer exception");
}

/**
 * @throws {Error}
 */
function throwUnimplementedMethodError() {
    throw new Error("Unimplemented method exception");
}

function isUndefined(value) {
    return value === VOID;
}

function isDefined(value) {
    return value !== VOID;
}

function isNull(value) {
    return value === null;
}

function isNotNull(value) {
    return value !== null;
}

function isExist(value) {
    return isDefined(value) && isNotNull(value);
}

function isNotExist(value) {
    return isUndefined(value) || isNull(value);
}

function isNumeric(value) {
    return isExist(value) && /^[\-\+]?\d*\.?\d+$/.test(value) && !isNaN(value);
}

function currentTimeInMillis() {
    return new Date().getTime();
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
        return currentTimeInMillis();
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
