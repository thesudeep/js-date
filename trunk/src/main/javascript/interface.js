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
goog.require("Instant");
goog.require("DateTime");
goog.require("Errors");

goog.require("ZeroPeriod");
goog.require("SinglePeriod");

AbsoluteFieldType.prototype["toField"] = AbsoluteFieldType.prototype.toField;

Instant.prototype["toDateTime"] = Instant.prototype.toDateTime;

DefaultPartialInstant.prototype["toInstant"] = DefaultPartialInstant.prototype.toInstant;

Enum.prototype["name"] = Enum.prototype.name;
Enum.prototype["toString"] = Enum.prototype.toString;
Enum.prototype["equals"] = Enum.prototype.equals;
Enum.prototype["compareTo"] = Enum.prototype.compareTo;

Field.prototype["toMillis"] = Field.prototype.toMillis;

FieldType.prototype["toField"] = FieldType.prototype.toField;

Instant["to"] = Instant.to;
Instant.prototype["compareTo"] = Instant.prototype.compareTo;
Instant.prototype["equals"] = Instant.prototype.equals;
Instant.prototype["toString"] = Instant.prototype.toString;
Instant.prototype["toMillis"] = Instant.prototype.toMillis;
Instant.prototype["toInstant"] = Instant.prototype.toInstant;
Instant.prototype["toDate"] = Instant.prototype.toDate;

PartialField.prototype["getField"] = PartialField.prototype.getField;
PartialField.prototype["setField"] = PartialField.prototype.setField;
PartialField.prototype["getMillis"] = PartialField.prototype.getMillis;
PartialField.prototype["setMillis"] = PartialField.prototype.setMillis;
PartialField.prototype["isLeap"] = PartialField.prototype.isLeap;
PartialField.prototype["setLeap"] = PartialField.prototype.setLeap;

PartialInstant.prototype["toInstant"] = PartialInstant.prototype.toInstant;

Period.prototype["get"] = Period.prototype.get;
Period.prototype["toMillis"] = Period.prototype.toMillis;

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

PeriodType.prototype["toPeriod"] = PeriodType.prototype.toPeriod;
PeriodType.prototype["zero"] = PeriodType.prototype.zero;
PeriodType.prototype["one"] = PeriodType.prototype.one;
PeriodType.prototype["two"] = PeriodType.prototype.two;
PeriodType.prototype["three"] = PeriodType.prototype.three;
PeriodType.prototype["four"] = PeriodType.prototype.four;
PeriodType.prototype["five"] = PeriodType.prototype.five;
PeriodType.prototype["six"] = PeriodType.prototype.six;
PeriodType.prototype["seven"] = PeriodType.prototype.seven;
PeriodType.prototype["eight"] = PeriodType.prototype.eight;
PeriodType.prototype["nine"] = PeriodType.prototype.nine;
PeriodType.prototype["ten"] = PeriodType.prototype.ten;
PeriodType.prototype["eleven"] = PeriodType.prototype.eleven;
PeriodType.prototype["twelve"] = PeriodType.prototype.twelve;
PeriodType.prototype["compareTo"] = PeriodType.prototype.compareTo;

RelativeFieldType.prototype["toField"] = RelativeFieldType.prototype.toField;

window["jsd8"] = {
    "Instant": Instant,
    "DateTime": DateTime,
    "Chronology": Chronology,
    "Period": Period,
    "PeriodType": PeriodType,
    "version": {
        "api": 2,
        "revision": ${project.build.revision},
        "full": "${project.version}.${project.build.revision}"
    }
};