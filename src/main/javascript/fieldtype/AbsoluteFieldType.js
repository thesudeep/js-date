/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {PeriodType} innerPeriodType
 * @constructor
 * @public
 */
function AbsoluteFieldType(periodType) {
    this.chain(periodType.name());

    /**
     * @type {PeriodType}
     * @private
     */
    this._absolute = periodType;
}

inherits(AbsoluteFieldType, FieldType);

/**
 *
 * @param {Number} fieldValue
 * @return {Field}
 * @public
 * @override
 */
AbsoluteFieldType.prototype.toField = function(fieldValue) {
    return new BasicField(this, fieldValue);
};

FieldType.YEARS = new AbsoluteFieldType(PeriodType.YEAR);
FieldType.MONTHS = new AbsoluteFieldType(PeriodType.MONTH);