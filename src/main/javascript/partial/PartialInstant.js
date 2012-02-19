goog.provide("PartialInstant");

goog.require("PartialField");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @public
 */
var PartialInstant = function () {
    this._fields = {

    };
    /**
     * @type {PartialField}
     * @private
     */
    this._year = new PartialField();
    /**
     * @type {PartialField}
     * @private
     */
    this._month = new PartialField();
    /**
     * @type {PartialField}
     * @private
     */
    this._date = new PartialField();
    /**
     * @type {PartialField}
     * @private
     */
    this._hour = null;
    /**
     * @type {PartialField}
     * @private
     */
    this._minute = null;
    /**
     * @type {PartialField}
     * @private
     */
    this._second = null;
    /**
     * @type {PartialField}
     * @private
     */
    this._millis = null;
}

/**
 * @return {number}
 * @throws {Error}
 */
PartialInstant.prototype.toInstant = goog.abstractMethod;