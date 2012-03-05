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

//AbsoluteFieldType.prototype["toField"] = AbsoluteFieldType.prototype.toField;

//Instant.prototype["toDateTime"] = Instant.prototype.toDateTime;

Chronology["setDefault"] = Chronology.setDefault;
Chronology["getDefault"] = Chronology.getDefault;

//DefaultPartialInstant.prototype["toInstant"] = DefaultPartialInstant.prototype.toInstant;

//Field.prototype["toMillis"] = Field.prototype.toMillis;

//FieldType.prototype["toField"] = FieldType.prototype.toField;

Instant["to"] = Instant.to;
//Instant.prototype["compareTo"] = Instant.prototype.compareTo;
//Instant.prototype["equals"] = Instant.prototype.equals;
//Instant.prototype["toString"] = Instant.prototype.toString;
//Instant.prototype["toMillis"] = Instant.prototype.toMillis;
//Instant.prototype["toInstant"] = Instant.prototype.toInstant;
//Instant.prototype["toDate"] = Instant.prototype.toDate;

//PartialField.prototype["getField"] = PartialField.prototype.getField;
//PartialField.prototype["setField"] = PartialField.prototype.setField;
//PartialField.prototype["getMillis"] = PartialField.prototype.getMillis;
//PartialField.prototype["setMillis"] = PartialField.prototype.setMillis;
//PartialField.prototype["isLeap"] = PartialField.prototype.isLeap;
//PartialField.prototype["setLeap"] = PartialField.prototype.setLeap;

//PartialInstant.prototype["toInstant"] = PartialInstant.prototype.toInstant;

Enum["values"] = Enum.values;
Enum["valueOf"] = Enum.valueOf;

PeriodType["MILLENIUM"] = PeriodType.MILLENIUM;
PeriodType["CENTURY"] = PeriodType.CENTURY;
PeriodType["DECADE"] = PeriodType.DECADE;
PeriodType["YEAR"] = PeriodType.YEAR;
PeriodType["HALF_YEAR"] = PeriodType.HALF_YEAR;
PeriodType["QUARTER_YEAR"] = PeriodType.QUARTER_YEAR;
PeriodType["MONTH"] = PeriodType.MONTH;
PeriodType["WEEK"] = PeriodType.WEEK;
PeriodType["DAY"] = PeriodType.DAY;
PeriodType["HALF_DAY"] = PeriodType.HALF_DAY;
PeriodType["HOUR"] = PeriodType.HOUR;
PeriodType["HALF_HOUR"] = PeriodType.HALF_HOUR;
PeriodType["QUARTER_HOUR"] = PeriodType.QUARTER_HOUR;
PeriodType["MINUTE"] = PeriodType.MINUTE;
PeriodType["SECOND"] = PeriodType.SECOND;
PeriodType["MILLISECOND"] = PeriodType.MILLISECOND;

PeriodType["values"] = PeriodType.values;
PeriodType["valueOf"] = PeriodType.valueOf;

//RelativeFieldType.prototype["toField"] = RelativeFieldType.prototype.toField;

goog.mixin(jsd8, {
    "Instant":Instant,
    "DateTime":DateTime,
    "Chronology":Chronology,
    "Period":Period,
    "PeriodType":PeriodType,
    "version":{
        "api":2,
        "revision": ${project.build.revision},
        "full":"${project.version}.${project.build.revision}"
    }
});