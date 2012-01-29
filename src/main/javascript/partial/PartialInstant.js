/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @constructor
 * @interface
 * @private
 */
function PartialInstant() {
    this._fields = {

    };
    /**
     * @type {Field}
     * @private
     */
    this._year = new PartialField();
    /**
     * @type {Field}
     * @private
     */
    this._month = new PartialField();
    /**
     * @type {Field}
     * @private
     */
    this._date = new PartialField();
    /**
     * @type {Field}
     * @private
     */
    this._hour = null;
    /**
     * @type {Field}
     * @private
     */
    this._minute = null;
    /**
     * @type {Field}
     * @private
     */
    this._second = null;
    /**
     * @type {Field}
     * @private
     */
    this._millis = null;
}

/**
 * @return {Number}
 * @throws {Error}
 */
PartialInstant.prototype.toInstant = function() {
    throwUnimplementedMethodError();
};