goog.provide("Chronology");

goog.require("Class");
goog.require("FieldType");
goog.require("PartialInstant");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @public
 * @extends {Class}
 */
var Chronology = function () {
};

goog.inherits(Chronology, Class);
registerClass(Chronology, "Chronology");

/**
 * @param {?Chronology} chronology
 * @static
 * @public
 */
Chronology.setDefault = function (chronology) {
    /**
     * @type {!Chronology}
     * @private
     */
    Chronology.DEFAULT = chronology || Chronology.getSystemDefault && Chronology.getSystemDefault() || new Chronology();
};

/**
 * @return {!Chronology}
 * @static
 * @public
 */
Chronology.getDefault = function () {
    if (!Chronology.DEFAULT) {
        Chronology.setDefault(null);
    }

    return Chronology.DEFAULT;
};

/**
 *
 * @param {number} instant
 * @param {!Period} periodType
 * @return {number}
 * @public
 */
Chronology.prototype.computePeriod = goog.abstractMethod;

/**
 *
 * @param {number} instant
 * @param {!FieldType} fieldType
 * @param {?PartialInstant} context
 * @return {!PartialInstant}
 * @public
 */
Chronology.prototype.toPartialInstant = goog.abstractMethod;
