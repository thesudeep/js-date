/**
 * Undefined constant to avoid overriding <code>undefined</code> variable
 *
 * @constant
 * @private
 * @author Victor Polischuk
 * @since 26.01.2012
 */
var _VOID = (function () {})();

/**
 * Namespace for most widely used utility functions. Generally, should not be published "as is" in order to keep
 * master code clean and to avoid name clashing.
 *
 * @namespace
 * @constant
 * @author Victor Polischuk
 * @since 26.01.2012
 */
Utils = {
    /**
     *
     * @param {Function} child
     * @param {Function} parent
     */
    inherits:function (child, parent) {
        function F() {}

        F.prototype = parent.prototype;

        child.prototype = new F();
        child.prototype.constructor = child;
        child._super = parent.prototype;

        return child;
    },
    isUndefined:function (value) {
        return value === _VOID;
    },
    isDefined:function (value) {
        return value !== _VOID;
    },
    isNull:function (value) {
        return value === null;
    },
    isNotNull:function (value) {
        return value !== null;
    },
    isExist:function (value) {
        return Utils.isDefined(value) && Utils.isNotNull(value);
    },
    isNotExist:function (value) {
        return Utils.isUndefined(value) || Utils.isNull(value);
    },
    isNumeric:function (value) {
        return Utils.isExist(value) && /^[\-\+]?\d*\.?\d+$/.test(value) && !isNaN(value);
    },
    currentTimeInMillis: function() {
        return new Date().getTime();
    },
    /**
     * Returns milliseconds of an argument value or current time if argument undefined or <code>null</code>. If
     * conversion is not possible exception will be thrown.
     *
     * @param {Number|String|Date|Instant|DateTime} instant milliseconds, {@link Instant}, {@link Date} or {@link DateTime} object.
     * @return {Number} milliseconds of passed given object
     * @throws {Error} if conversion to milliseconds is impossible.
     */
    getMillis: function(instant) {
        if (Utils.isNotExist(instant)) {
            return Utils.currentTimeInMillis();
        }

        if (Utils.isNumeric(instant)) {
            return parseInt(instant, 10);
        }

        if (instant instanceof Date) {
            return instant.getTime();
        }

        if (instant instanceof Instant) {
            return instant.getTime();
        }

        throw new Error("Cannot be converted into number of milliseconds");
    }
};