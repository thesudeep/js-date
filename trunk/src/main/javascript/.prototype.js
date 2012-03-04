goog.require("PeriodType");
goog.require("Chronology");
goog.require("Instant");
goog.require("Period");
goog.require("SinglePeriod");

var symbolCount = 0;
/**
 * @param {!(Function|Object)} symbol
 */
var ensure = function(symbol) {
    symbol && symbolCount++;
};

ensure(PeriodType.prototype.toPeriod);
ensure(PeriodType.prototype.zero);
ensure(PeriodType.prototype.one);

ensure(Chronology.prototype.computePeriod);
ensure(Chronology.prototype.toPartialInstant);

ensure(Period.prototype.get);
ensure(Period.prototype.list);
ensure(Period.prototype.negate);
ensure(Period.prototype.toMillis);

ensure(SinglePeriod.prototype.getType);

ensure(Instant.prototype.compareTo);
ensure(Instant.prototype.equals);
ensure(Instant.prototype.toDate);
ensure(Instant.prototype.toDateTime);
ensure(Instant.prototype.toInstant);
ensure(Instant.prototype.toMillis);

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

jsd8["symbols"] = symbolCount;

