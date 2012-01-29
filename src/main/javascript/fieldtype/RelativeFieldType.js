/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {PeriodType} innerPeriodType
 * @param {PeriodType} [outerPeriodType]
 * @constructor
 * @public
 */
function RelativeFieldType(innerPeriodType, outerPeriodType) {
    if (innerPeriodType.compareTo(outerPeriodType) < 0) {
        throwPeriodTypesInvalidError()
    }

    var name = innerPeriodType.name() + "S_IN_" + outerPeriodType.name();

    this.chain(name);

    /**
     * @type {PeriodType}
     * @private
     */
    this._inner = innerPeriodType;
    /**
     * @type {PeriodType}
     * @private
     */
    this._outer = outerPeriodType;
}

inherits(RelativeFieldType, FieldType);

/**
 *
 * @param {Number} fieldValue
 * @return {Field}
 * @public
 * @override
 */
RelativeFieldType.prototype.toField = function(fieldValue) {
    return new BasicField(this, fieldValue);
};

FieldType.YEARS_IN_MILLENIUM = new RelativeFieldType(PeriodType.YEAR, PeriodType.MILLENIUM);
FieldType.MONTHS_IN_YEAR = new RelativeFieldType(PeriodType.MONTH, PeriodType.YEAR);