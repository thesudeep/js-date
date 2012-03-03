goog.provide("Errors");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @namespace
 *
 * @public
 */
var Errors = {
    MESSAGE_UNSUPPORTED_PERIOD_TYPE: "Given period type is unsupported",
    MESSAGE_INVALID_PERIOD_TYPES: "Inner period type bigger or equal to outer period type",
    MESSAGE_NEGATIVE_PERIOD_VALUE: "Period value cannot be negative",
    MESSAGE_ENUM_ALREADY_EXISTS: "New Enum cannot be created because such enum already exists",
    MESSAGE_INVALID_ENUM: "The method cannot be executed for non-initialized Enum classes (check lazy loading)",
    MESSAGE_CLASS_CAST: "Class cast exception",
    MESSAGE_NULL_POINTER: "Null pointer exception"
};

/**
 * @throws {Error}
 */
Errors.throwUnsupportedPeriodType = function () {
    throw new Error(Errors.MESSAGE_UNSUPPORTED_PERIOD_TYPE);
};

/**
 * @throws {Error}
 */
Errors.throwInvalidPeriodTypes = function () {
    throw new Error(Errors.MESSAGE_INVALID_PERIOD_TYPES);
};

/**
 * @throws {Error}
 */
Errors.throwNegaivePeriodValue = function () {
    throw new Error(Errors.MESSAGE_NEGATIVE_PERIOD_VALUE);
};

/**
 * @throws {Error}
 */
Errors.throwEnumAlreadyExists = function () {
    throw new Error(Errors.MESSAGE_ENUM_ALREADY_EXISTS);
};

/**
 * @throws {Error}
 */
Errors.throwInvalidEnum = function () {
    throw new Error(Errors.MESSAGE_INVALID_ENUM);
};

/**
 * @throws {Error}
 */
Errors.throwClassCast = function () {
    throw new Error(Errors.MESSAGE_CLASS_CAST);
};

/**
 * @throws {Error}
 */
Errors.throwNullPointer = function () {
    throw new Error(Errors.MESSAGE_NULL_POINTER);
};