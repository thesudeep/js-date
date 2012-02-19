goog.provide("DefaultPartialInstant");

goog.require("PartialInstant");
goog.require("PartialField");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @public
 * @extends PartialInstant
 */
var DefaultPartialInstant = function () {
    DefaultPartialInstant.superClass_.constructor.call(this);

    this._fields = {
        //ToDO
    };
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._year = new PartialField();
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._month = new PartialField();
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._date = new PartialField();
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._hour = null;
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._minute = null;
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._second = null;
//    /**
//     * @type {PartialField}
//     * @private
//     */
//    this._millis = null;
}

goog.inherits(DefaultPartialInstant, PartialInstant);

/**
 * @return {number}
 */
DefaultPartialInstant.prototype.toInstant = goog.abstractMethod;