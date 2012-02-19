goog.provide("DateTime");

goog.require("Instant");

/**
 * JSDoc here
 *
 * @author Victor Polischuk
 * @constructor
 * @class Class description
 * @public
 * @extends Instant
 */
var DateTime = function () {
    //TODO<vpolischuk>: implement it
}

goog.inherits(DateTime, Instant);
//inherits(DateTime, Instant);




// Instant extends methods

/**
 * Returns {@link DateTime} instance using default {@link DateTimeZone} and {@link Chronology}.
 *
 * @return {DateTime} fully operational instance of {@link DateTime}.
 * @public
 * @see DateTime
 */
Instant.prototype.toDateTime = function() {
    return null; //TODO<vpolischuk>: use DateTime here.
};
