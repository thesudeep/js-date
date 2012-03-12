goog.provide("exportStatic");

goog.require("jsd8");
goog.require("PartialField");
goog.require("PartialInstant");
goog.require("FieldType");
goog.require("Enum");
goog.require("PeriodType");
goog.require("Field");
goog.require("BasicField");
goog.require("AbsoluteFieldType");
goog.require("RelativeFieldType");
goog.require("Chronology");
goog.require("DefaultPartialInstant");
goog.require("Period");
goog.require("SinglePeriod");
goog.require("Instant");
goog.require("DateTime");
goog.require("Errors");

goog.require("SystemChronology");

var staticCount = 0;

var exportStatic = function (symbol, exports) {
    goog.mixin(symbol, exports) || staticCount++;
};

//AbsoluteFieldType.prototype["toField"] = AbsoluteFieldType.prototype.toField;

//Instant.prototype["toDateTime"] = Instant.prototype.toDateTime;

exportStatic(Chronology, {
    "setDefault": Chronology.setDefault,
    "getDefault": Chronology.getDefault
});


//DefaultPartialInstant.prototype["toInstant"] = DefaultPartialInstant.prototype.toInstant;

//Field.prototype["toMillis"] = Field.prototype.toMillis;

//FieldType.prototype["toField"] = FieldType.prototype.toField;

exportStatic(Instant, {
    "to": Instant.to
});

//PartialField.prototype["getField"] = PartialField.prototype.getField;
//PartialField.prototype["setField"] = PartialField.prototype.setField;
//PartialField.prototype["getMillis"] = PartialField.prototype.getMillis;
//PartialField.prototype["setMillis"] = PartialField.prototype.setMillis;
//PartialField.prototype["isLeap"] = PartialField.prototype.isLeap;
//PartialField.prototype["setLeap"] = PartialField.prototype.setLeap;

//PartialInstant.prototype["toInstant"] = PartialInstant.prototype.toInstant;

exportStatic(Enum, {
    "values": Enum.values,
    "valueOf": Enum.valueOf
});

//RelativeFieldType.prototype["toField"] = RelativeFieldType.prototype.toField;

exportStatic(PeriodType, {
    "MILLENNIUM": PeriodType.MILLENNIUM,
    "CENTURY": PeriodType.CENTURY,
    "DECADE": PeriodType.DECADE,
    "YEAR": PeriodType.YEAR,
    "HALF_YEAR": PeriodType.HALF_YEAR,
    "QUARTER_YEAR": PeriodType.QUARTER_YEAR,
    "MONTH": PeriodType.MONTH,
    "WEEK": PeriodType.WEEK,
    "DAY": PeriodType.DAY,
    "HALF_DAY": PeriodType.HALF_DAY,
    "HOUR": PeriodType.HOUR,
    "HALF_HOUR": PeriodType.HALF_HOUR,
    "QUARTER_HOUR": PeriodType.QUARTER_HOUR,
    "MINUTE": PeriodType.MINUTE,
    "SECOND": PeriodType.SECOND,
    "MILLISECOND": PeriodType.MILLISECOND,
    
    "values": PeriodType.values,
    "valueOf": PeriodType.valueOf
});

symbols["static"] = staticCount;