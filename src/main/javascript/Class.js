goog.provide("Class");

goog.require("jsd8");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Base class
 *
 * @constructor
 * @public
 * @implements {_Class}
 */
var Class = function() {
    Errors.throwClassConstructorInvocation();

    /**
     * @type {?string}
     * @private
     */
    this._toString = null;
};

registerClass(Class, "Class");

/**
 * @return {string}
 * @public
 */
Class.prototype.getClass = function() {
    return obtainClass(this.constructor);
};

/**
 * @return {string}
 * @public
 */
Class.prototype.toString = function() {
    if (!this._toString) {
        var str = "";

        for (var i in this) {
            var value = this[i];

            if (value && !goog.isFunction(value)) {
                str += "," + i + ":" + this[i];
            }
        }

        this._toString = this.getClass() + "{" + str.substr(1) + "}";
    }

    return this._toString;
};