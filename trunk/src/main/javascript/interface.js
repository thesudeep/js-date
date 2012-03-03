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

Period.prototype["toMillis"] = Period.prototype.toMillis;

PeriodType.prototype["compareTo"] = PeriodType.prototype.compareTo;

RelativeFieldType.prototype["toField"] = RelativeFieldType.prototype.toField;

goog.global["jsd8"] = {
    "Instant": Instant,
    "DateTime": DateTime,
    "Chronology": Chronology,
    "version": {
        "api": 2,
        "full": "${project.version}"
    }
};