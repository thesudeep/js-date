/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {String}
 * @constructor
 * @public
 */
function FieldType(name) {
    /**
     * @type {String}
     * @private
     */
    this._name = name;
}

/**
 *
 * @param {Number} fieldValue
 * @return {Field}
 * @public
 */
FieldType.prototype.toField = function(fieldValue) {
    throwUnimplementedMethodError();
};

/**
 *
 * @param {Number} instant
 * @param {PartialInstant} context
 * @return {Field}
 * @private
 */
FieldType.prototype.withMillis = function(instant, context) {
    throwUnimplementedMethodError();
};