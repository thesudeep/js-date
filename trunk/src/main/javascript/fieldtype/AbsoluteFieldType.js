goog.provide("AbsoluteFieldType");

goog.require("PeriodType");
goog.require("FieldType");
goog.require("BasicField");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {PeriodType} periodType
 * @constructor
 * @public
 * @extends FieldType
 */
var AbsoluteFieldType = function (periodType) {
    AbsoluteFieldType.superClass_.constructor.call(this, periodType.name());

    /**
     * @type {PeriodType}
     * @private
     */
    this._absolute = periodType;
}

goog.inherits(AbsoluteFieldType, FieldType);

/**
 *
 * @param {number} fieldValue
 * @return {!Field}
 * @public
 * @override
 */
AbsoluteFieldType.prototype.toField = function(fieldValue) {
    return new BasicField(this, fieldValue);
};

/**
 * @const
 * @public
 */
FieldType.YEARS = new AbsoluteFieldType(PeriodType.YEAR);
/**
 * @const
 * @public
 */
FieldType.MONTHS = new AbsoluteFieldType(PeriodType.MONTH);