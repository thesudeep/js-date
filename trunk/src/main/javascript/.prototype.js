goog.provide("exportPrototype");

goog.require("jsd8");
goog.require("PeriodType");
goog.require("Chronology");
goog.require("Instant");
goog.require("Period");
goog.require("SinglePeriod");

var symbolCount = 0;
/**
 * @param {!(Function|Object)} symbol
 */
var exportPrototype = function(symbol) {
    symbol && symbolCount++;
};

exportPrototype(Class.prototype.getClass);

exportPrototype(PeriodType.prototype.toPeriod);
exportPrototype(PeriodType.prototype.zero);
exportPrototype(PeriodType.prototype.one);

exportPrototype(Chronology.prototype.computePeriod);
exportPrototype(Chronology.prototype.toPartialInstant);

exportPrototype(Period.prototype.get);
exportPrototype(Period.prototype.list);
exportPrototype(Period.prototype.negate);
exportPrototype(Period.prototype.toMillis);

exportPrototype(SinglePeriod.prototype.getType);

exportPrototype(Instant.prototype.compareTo);
exportPrototype(Instant.prototype.equals);
exportPrototype(Instant.prototype.toDate);
exportPrototype(Instant.prototype.toDateTime);
exportPrototype(Instant.prototype.toInstant);
exportPrototype(Instant.prototype.toMillis);

//AbsoluteFieldType.prototype["toField"] = AbsoluteFieldType.prototype.toField;

//DefaultPartialInstant.prototype["toInstant"] = DefaultPartialInstant.prototype.toInstant;

//Field.prototype["toMillis"] = Field.prototype.toMillis;

//FieldType.prototype["toField"] = FieldType.prototype.toField;

//PartialField.prototype["getField"] = PartialField.prototype.getField;
//PartialField.prototype["setField"] = PartialField.prototype.setField;
//PartialField.prototype["getMillis"] = PartialField.prototype.getMillis;
//PartialField.prototype["setMillis"] = PartialField.prototype.setMillis;
//PartialField.prototype["isLeap"] = PartialField.prototype.isLeap;
//PartialField.prototype["setLeap"] = PartialField.prototype.setLeap;

//PartialInstant.prototype["toInstant"] = PartialInstant.prototype.toInstant;

//RelativeFieldType.prototype["toField"] = RelativeFieldType.prototype.toField;

symbols["prototype"] = symbolCount;

