goog.provide("RelativeFieldType");

goog.require("PeriodType");
goog.require("FieldType");
goog.require("BasicField");
goog.require("Errors");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @class Class description
 *
 * @param {!PeriodType} innerPeriodType
 * @param {!PeriodType} outerPeriodType
 * @constructor
 * @public
 * @extends FieldType
 */
var RelativeFieldType = function (innerPeriodType, outerPeriodType) {
    if (innerPeriodType.compareTo(outerPeriodType) < 0) {
        Errors.throwInvalidPeriodTypes();
    }

    var name = innerPeriodType.name() + "S_IN_" + outerPeriodType.name();

    RelativeFieldType.superClass_.constructor.call(this, name);

    /**
     * @type {!PeriodType}
     * @private
     */
    this._inner = innerPeriodType;
    /**
     * @type {!PeriodType}
     * @private
     */
    this._outer = outerPeriodType;
}

goog.inherits(RelativeFieldType, FieldType);

/**
 *
 * @param {number} fieldValue
 * @return {!Field}
 * @public
 * @override
 */
RelativeFieldType.prototype.toField = function(fieldValue) {
    return new BasicField(this, fieldValue);
};

/**
 * @type {!RelativeFieldType}
 */
FieldType.YEARS_IN_MILLENIUM = new RelativeFieldType(PeriodType.YEAR, PeriodType.MILLENIUM);

/**
 * @type {!RelativeFieldType}
 */
FieldType.MONTHS_IN_YEAR = new RelativeFieldType(PeriodType.MONTH, PeriodType.YEAR);