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
function DefaultPartialInstant() {
    this.chain();

    this._fields = {
        //ToDO
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

inherits(DefaultPartialInstant, PartialInstant);

/**
 * @return {Number}
 */
PartialInstant.prototype.toInstant = throwUnimplementedMethodError;