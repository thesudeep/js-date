/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description

 * @param {FieldType} type
 * @constructor
 * @public
 */
function Field(type) {
    /**
     * @type {FieldType}
     * @private
     */
    this._type = type;
}

/**
 *
 * @param {Number} instant
 * @param {Chronology} [chronology]
 * @return {Number}
 * @public
 */
Field.prototype.toMillis = function(instant, chronology) {
    throwUnimplementedMethodError();
};