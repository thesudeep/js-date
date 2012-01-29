/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {FieldType} type
 * @param {Number} value
 * @constructor
 * @public
 */
function BasicField(type, value) {
    this.chain(type);

    /**
     * @type {Number}
     * @private
     */
    this._value = value;
}

inherits(BasicField, Field);
