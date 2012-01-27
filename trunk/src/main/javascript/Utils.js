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
    inherits:function (child, parent) {
        function F() {}

        F.prototype = parent.prototype;

        child.prototype = new F();
        child.prototype.constructor = child;
        child._super = parent.prototype;

        return child;
    },
    isUndefined:function (value) {
        return value === _void;
    },
    isDefined:function (value) {
        return value !== _void;
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

/**
 * Undefined constant to avoid overriding <code>undefined</code> variable
 *
 * @constant
 * @private
 * @author Victor Polischuk
 * @since 26.01.2012
 */
const _void = (function () {})();
